import { Component } from "react";
import { Tab, Switch } from "@headlessui/react";
import {
	MdCardGiftcard,
	MdEdit,
	MdExitToApp,
	MdVerifiedUser,
} from "react-icons/md";
import { BsQuestionCircle } from "react-icons/bs";
import Tooltip from "@components/global/Tooltip";
import squareimage from "@assets/avatar.png";
import Select from "react-select";
import ImageUploader from "react-images-upload";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import * as editProductActionCreator from "@store/actions/EditProductActions";

import { HANDLE_CHANGE_SUCCESS } from "@store/constants/action-types";
import { HANDLE_SELECT_VOUCHER_TYPE } from "@store/constants/action-types";
import { HANDLE_SELECT_CHANGE_SUCCESS } from "@store/constants/action-types";
import { HANDLE_SELECT_VOUCHER_FORMATE } from "@store/constants/action-types";
import { REST_RESPONSE_STATUS } from "@store/constants/action-types";
import { HANDLE_CHANGE_NUMBER_VOUCHER_LINK_SUCCESS } from "@store/constants/action-types";
import { HANDLE_CHANGE_NUMBER_VOUCHER_SUCCESS } from "@store/constants/action-types";
import { HANDLE_CHANGE_CODE_VOUCHER_VALUE } from "@store/constants/action-types";
import {
	HANDLE_CHANGE_LINK_VOUCHER_VALUE,
	HANDLE_CREDITS_ERRORS,
	HANDLE_FOLLOWER_DISCOUNT_VALUE,
	HANDLE_INFLUENCER_DISCOUNT_VALUE,
	HANDLE_INFLUENCER_TAB_VALUE,
	HANDLE_SAVE_NAME_VALUE,
	HANDLE_AFFILIATE_COMMISSION_VALUE,
} from "@store/constants/action-types";
import { FaSpinner } from "react-icons/fa";
import ReactQuill from "react-quill";
import Button from "@components/global/Button";
import LinkTo from "@components/global/LinkTo";
import "./styles.css";
import Api from "@services/axios";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}
const colourStyles = {
	option: (styles, { data, isDisabled, isFocused, isSelected }) => {
		return {
			...styles,
			color: isSelected ? "#7d2d94" : null,
			fontWeight: isSelected ? "700" : null,
			backgroundColor: isSelected ? "#00000008" : null,
		};
	},
};

class BrandEditProduct extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fileName: "",
			pdfFile: "",
			editNameFlag: false,
			cancelFlag: false,
			influencer_discount_code: "",
			follower_discount_code: "",
			otherSlide: 0,
			otherValue: 70,
			followerValue: parseInt(this.props.follower_discount_value),
			affilateValue: parseInt(this.props.affiliate_commission_value),
		};
		this.onDrop = this.onDrop.bind(this);
	}

	componentDidMount() {
		// if (this.props.response_status === "success") {
		//   this.props.Navigate("/products");
		// }

		const id = this.props.id;
		this.props.fetchOffer(id);
		this.props.fetchCategories();
	}

	onDrop(pictureFiles, pictureDataURLs) {
		let query = {
			images: pictureDataURLs,
			product_id: this.props.id
		}
		this.props.handleOnDrop(query);
	}

	handleUpdateProduct = () => {
		if (this.props.offer_type !== "Product") {
			if (!this.props.influencer_discount_code) {
				this.setState({
					influencer_discount_code:
						"influencer discount code field is required",
				});
				return;
			} else {
				this.setState({
					influencer_discount_code: "",
				});
			}

			if (
				this.props.is_discount_for_follower &&
				!this.props.follower_discount_code
			) {
				this.setState({
					follower_discount_code: "follower discount code field is required",
				});
				return;
			} else {
				this.setState({
					follower_discount_code: "",
				});
			}
		}

		// const id = this.props.match.params.id;
		const id = this.props.id;
		const query = {
			unique_id: id,
			voucher_type: this.props.voucher_type,
			influencer_tab_value: this.props.influencer_tab_value,
			influencer_discount_value: this.props.influencer_discount_value,
			influencer_discount_code: this.props.influencer_discount_code,
			is_discount_for_follower: this.props.is_discount_for_follower,
			follower_discount_value: this.props.follower_discount_value,
			follower_discount_code: this.props.follower_discount_code,
			is_affiliate_commission: this.props.is_affiliate_commission,
			affiliate_commission_value: this.props.affiliate_commission_value,
			name: this.state.cancelFlag ? this.props.original_name : this.props.name,
			category: this.props.category.value,
			value: this.props.value,
			url: this.props.url,
			description: this.props.description,
			images: this.props.images,
		};

		this.props.handleProductUpdate(query);
	};

	handleRemoveProduct = () => {
		Swal.fire({
			title: "Are you sure?",
			text: `Do you want to remove this ${this.props.offer_type}?`,
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonColor: "#7c3292",
			cancelButtonColor: "#f4f4f5",
			confirmButtonText: "Yes, do it",
			cancelButtonText: "No!",
			customClass: {
				actions: "flex-row-reverse",
				closeButton: "hover:text-[#7c3292]",
				confirmButton: "hover:!shadow-none focus:!shadow-none min-w-[100px]",
				cancelButton:
					"hover:!shadow-none focus:!shadow-none min-w-[100px] !text-[#202020]",
			},
			allowOutsideClick: () => !Swal.isLoading(),
		}).then((result) => {
			if (result.value) {
				// const id = this.props.match.params.id;
				const id = this.props.id;
				const query = {
					unique_id: id,
				};
				// this.props.handleProductRemove(query);
				// Api.ProductRemoveHandle(query);
				Api.ProductRemoveHandle(query)
					.then((res) => {
						if (res.data === "success") {
							this.props.Navigate("/products");
						}
					})
					.catch((error) => {
						console.log(error);
					});
			}
		});
	};

	deleteVocherPdf = () => {
		// const id = this.props.match.params.id;
		const id = this.props.id;
		const query = {
			unique_id: id,
		};
		this.props.removeVoucherPdf(query);
	};

	handleRetireProduct = () => {
		Swal.fire({
			title: "Are you sure?",
			text: "Do you want to retire this product?",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: "Yes, do it",
			cancelButtonText: "No!",
			confirmButtonColor: "#7c3292",
			cancelButtonColor: "#f4f4f5",
			customClass: {
				actions: "flex-row-reverse",
				closeButton: "hover:text-[#7c3292]",
				confirmButton: "hover:!shadow-none focus:!shadow-none min-w-[100px]",
				cancelButton:
					"hover:!shadow-none focus:!shadow-none min-w-[100px] !text-[#202020]",
			},
			allowOutsideClick: () => !Swal.isLoading(),
		}).then((result) => {
			if (result.value) {
				// const id = this.props.match.params.id;
				const id = this.props.id;
				const query = {
					unique_id: id,
				};
				this.props.handleProductRetire(query);
			}
		});
	};

	handleRemoveRetireProduct = () => {
		Swal.fire({
			title: "Are you sure?",
			text: "Do you want to remove from retire this product?",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: "Yes, do it",
			cancelButtonText: "No!",
			confirmButtonColor: "#7c3292",
			cancelButtonColor: "#f4f4f5",
			customClass: {
				actions: "flex-row-reverse",
				closeButton: "hover:text-[#7c3292]",
				confirmButton: "hover:!shadow-none focus:!shadow-none min-w-[100px]",
				cancelButton:
					"hover:!shadow-none focus:!shadow-none min-w-[100px] !text-[#202020]",
			},
			allowOutsideClick: () => !Swal.isLoading(),
		}).then((result) => {
			if (result.value) {
				// const id = this.props.match.params.id;
				const id = this.props.id;
				const query = {
					unique_id: id,
				};
				this.props.handleRemoveProductRetire(query);
			}
		});
	};

	pdfChangedHandler = (event) => {
		const file = event.target.files[0];
		this.setState({
			fileName: file.name,
			pdfFile: file,
		});

		// const id = this.props.match.params.id;
		const id = this.props.id;
		const formData = new FormData();
		formData.append("unique_id", id);
		formData.append("pdfFile", file);
		this.props.handleUploadProductPdf(formData);
	};

	cancelPdf = () => {
		this.setState({
			fileName: "",
			pdfFile: "",
		});
	};

	showEditInput = () => {
		this.setState({
			editNameFlag: true,
			cancelFlag: false,
		});
	};

	hideEditInput = () => {
		this.setState({
			editNameFlag: false,
			cancelFlag: true,
		});
		this.props.handleClearErrors();
	};

	saveInput = () => {
		this.setState({
			editNameFlag: false,
			cancelFlag: false,
		});
		this.props.saveNameValue(this.props.name);
		this.props.handleClearErrors();
	};

	handleInfluencerValue = (event) => {
		this.setState({ otherSlide: (event.target.value - 70) * 3.333 });
		this.setState({ otherValue: event.target.value });
		this.props.handleInfluencerDiscountValue(event.target.value);
	};

	handleFollowerValue = (event) => {
		this.setState({ followerValue: event.target.value });
		this.props.handleFollowerDiscountValue(event.target.value);
	};

	handleAffiliateValue = (event) => {
		this.setState({ affilateValue: event.target.value });
		this.props.handleAffiliateCommissionValue(event.target.value);
	};

	handleSelect = (event) => {
		let type;
		if (event === 0) {
			type = "gift";
		} else if (event === 1) {
			type = "mandatory";
		}
		this.props.handleSelect(type);
	};

	handleChange = (check, name, type) => {
		let event = {
			target: {
				name: name,
				checked: check,
				type: type,
			},
		};
		this.props.handleChange(event);
	};

	onDeleteImage = (img, product_id) => {
		let query = {
			img: img,
			product_id: product_id
		}
		this.props.handleImageDelete(query);
	}

	render() {
		const categories = (this.props.categories || []).map((data) => ({
			label: data.name,
			value: data.id,
		}));
		const { refreshData } = this.props;
		return (
			<div className="mb-12 edit-product-screen">
				<div className="py-[20px] border-b-[1px] border-[#ddd] bg-white">
					<div className="containers">
						{this.props.offer_type === "Voucher" ? (
							<h2 className="dark text-[23px] font-italic font-bold">
								Edit Voucher
							</h2>
						) : (
							<h2 className="dark text-[23px] font-italic font-bold">
								Edit Product
							</h2>
						)}
					</div>
				</div>
				<div className="containers mt-12">
					{refreshData.is_admin && (
						<div className="flex xxs:flex-nowrap flex-wrap gap-4 justify-end mb-6">
							{this.props.retire ? (
								<Button
									onClick={this.handleRemoveRetireProduct}
									className="px-12 rounded-[8px] h-[40px] text-[14px] flex items-center justify-center bg--purple text-white xxs:w-auto w-full text-center hover:opacity-80"
									text="Remove Retire"
								/>
							) : (
								<Button
									onClick={this.handleRetireProduct}
									className="px-12 rounded-[8px] h-[40px] text-[14px] flex items-center justify-center bg--purple text-white xxs:w-auto w-full text-center hover:opacity-80"
									text="Retire"
								/>
							)}
							<Button
								onClick={this.handleRemoveProduct}
								className="px-12 rounded-[8px] h-[40px] text-[14px] flex items-center justify-center bg--purple text-white xxs:w-auto w-full text-center hover:opacity-80"
								text="Remove"
							/>
						</div>
					)}
					<div className="grid grid-cols-12 gap-5 mb-12">
						<div className="md:col-span-8 col-span-12">
							{this.props.offer_type === "Voucher" ? (
								<h4 className="mb-4 text-[20px]">Voucher Summary</h4>
							) : (
								<h4 className="mb-4 text-[20px]">Product Summary</h4>
							)}
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4">
								<div className="grid grid-cols-12 gap-5">
									<div className="lg:col-span-3 col-span-12">
										<img
											src={
												this.props.images && this.props.images.length
													? this.props.images[0]
													: squareimage
											}
											alt={this.props.original_name}
											className="w-[180px]"
										/>
									</div>
									<div className="lg:col-span-9 col-span-12 flex flex-col justify-center">
										<div className="ml-4">
											{this.state.cancelFlag ? (
												<h4 className="mt-4 font-semibold sm:!mt-0 text-[20px]">
													{this.props.original_name}
												</h4>
											) : (
												<h4 className="mt-4 font-semibold sm:!mt-0 text-[20px]">
													{this.props.name}
												</h4>
											)}
											<span className="w-[8px] h-[8px] rounded-full bg-[#f50057] inline-block"></span>
											<span className="ml-4 inline-block">
												{this.props.status}
											</span>
										</div>
										<div className="mt-6 bg-transparent">
											{this.props.offer_type === "Voucher" ? (
												<div className="bg-transparent p-[0.75rem_1.25rem] flex justify-between items-center">
													<span>Total value of deemed Vouchers</span>
													<h4 className="font-semibold text-[20px]">
														{this.props.influencer_discount_value}%
													</h4>
												</div>
											) : (
												<div className="bg-transparent p-[0.75rem_1.25rem] flex flex-wrap justify-between items-center">
													<span>Total value of deemed Product</span>
													<h4 className="font-semibold text-[20px]">
														{this.props.value}{" "}
														{this.props.currentLoggedUser.currency_code}
													</h4>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="md:col-span-4 col-span-12"></div>
					</div>
					<div className="grid grid-cols-12 gap-5 mb-12">
						{this.props.offer_type === "Voucher" ? (
							<div className="md:col-span-8 col-span-12">
								<div className="mb-4 text-[20px] min-h-[40px]">
									{this.state.editNameFlag === true ? (
										<div className="flex justify-between items-center w-full">
											<div className="w-full ">
												<input
													type="text"
													name="name"
													value={this.props.name}
													className="rounded-[8px] !text-[14px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-white focus-visible:outline-0 focus:border-[#7c3292]"
													onChange={(e) => this.props.handleChange(e)}
													placeholder="Voucher Name"
												/>
											</div>
											<div className="text-right ml-4 flex">
												<Button
													className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center justify-center bg-[#8d8d8d] text-white hover:opacity-80"
													onClick={() => this.hideEditInput()}
													text="Cancel"
												/>
												<Button
													className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80 ml-2"
													onClick={() => this.saveInput()}
													text="Save"
												/>
											</div>
										</div>
									) : (
										<>
											{this.state.cancelFlag ? (
												<>{this.props.original_name}</>
											) : (
												<>{this.props.name}</>
											)}
										</>
									)}
									{this.state.editNameFlag === false ? (
										<MdEdit
											onClick={() => this.showEditInput()}
											className="ml-2 cursor-pointer inline-block"
										/>
									) : (
										""
									)}

									{this.props.errorsObj?.name ? (
										<span className="red">{this.props.errorsObj.name[0]}</span>
									) : (
										""
									)}
								</div>
								<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 add-voucher">
									<Tab.Group
										selectedIndex={
											this.props.voucher_type === "gift"
												? 0
												: (this.props.voucher_type === "mandatory"
													? 1
													: null)
										}
										onChange={(index) => {
											this.handleSelect(index);
										}}
									>
										<Tab.List className="flex flex-wrap gap-5 items-center grow mb-[30px]">
											<Tab
												className={({ selected }) =>
													classNames(
														"flex px-3 grow items-center justify-start font-medium hover:opacity-80 xxs:text-[11pt] text-[12px] shadow-[0px_4px_5px_#96969640] h-[60px] leading-[60px] !rounded-[8px] border-0",
														selected
															? "bg-[#7c3292] text-white"
															: "bg-white text-[#343749]"
													)
												}
											>
												<MdCardGiftcard size={20} className="mr-4" />
												After Posting Discount
											</Tab>
											<Tab
												className={({ selected }) =>
													classNames(
														"flex px-3 items-center  grow justify-start font-medium hover:opacity-80 xxs:text-[11pt] text-[12px] shadow-[0px_4px_5px_#96969640] h-[60px] leading-[60px] !rounded-[8px] border-0",
														selected
															? "bg-[#7c3292] text-white"
															: "bg-white text-[#343749]"
													)
												}
											>
												<MdVerifiedUser size={20} className="mr-4" />
												Before Posting Discount
											</Tab>
										</Tab.List>
									</Tab.Group>
									<div className="mt-2">
										<p className="font-medium">Discount value for influencer</p>
										<div className="my-4 grid grid-cols-12 gap-5">
											<div className="md:col-span-6 col-span-12">
												<Tab.Group
													selectedIndex={
														this.props.influencer_tab_value === 70
															? 0
															: this.props.influencer_tab_value === 85
																? 1
																: this.props.influencer_tab_value === "free"
																	? 2
																	: this.props.influencer_tab_value === "other"
																		? 3
																		: null
													}
													onChange={(index) => {
														this.props.handleInfluencerTabValue(index);
													}}
												>
													<Tab.List className="flex flex-wrap gap-5 justify-between items-center grow">
														<Tab
															className={({ selected }) =>
																classNames(
																	"flex items-center justify-center font-medium text-[18px] h-[75px] w-[75px] !rounded-full border-[1px] border-[#e2e5ec]",
																	selected
																		? "bg-[#7c3292] text-white"
																		: "bg-white text-[#343749]"
																)
															}
														>
															70%
														</Tab>
														<Tab
															className={({ selected }) =>
																classNames(
																	"flex items-center justify-center font-medium text-[18px] h-[75px] w-[75px] !rounded-full border-[1px] border-[#e2e5ec]",
																	selected
																		? "bg-[#7c3292] text-white"
																		: "bg-white text-[#343749]"
																)
															}
														>
															85%
														</Tab>
														<Tab
															className={({ selected }) =>
																classNames(
																	"flex items-center justify-center font-medium text-[16px] h-[75px] w-[75px] !rounded-full border-[1px] border-[#e2e5ec]",
																	selected
																		? "bg-[#7c3292] text-white"
																		: "bg-white text-[#343749]"
																)
															}
														>
															For Free
														</Tab>
														<Tab
															className={({ selected }) =>
																classNames(
																	"flex items-center justify-center font-medium text-[16px] h-[75px] w-[75px] !rounded-full border-[1px] border-[#e2e5ec]",
																	selected
																		? "bg-[#7c3292] text-white"
																		: "bg-white text-[#343749]"
																)
															}
														>
															Other
														</Tab>
													</Tab.List>
													<Tab.Panels className="bg-transparent">
														<Tab.Panel></Tab.Panel>
														<Tab.Panel></Tab.Panel>
														<Tab.Panel></Tab.Panel>
														<Tab.Panel>
															<div className="pt-12">
																<div className="mt-12 relative after:content-[''] before:w-full before:h-[3px] before:rounded-[10px] before:bg-[#b7bde3] before:block">
																	<span
																		className="absolute inline-block top-0 left-0 h-[3px] bg-[#7c3292] transition duration-200 rounded-[20px]"
																		style={{
																			width: this.state.otherSlide + "%",
																		}}
																	/>
																	<span
																		className="absolute top-[-5px] w-[12px] h-[12px] rounded-full inline-block bg-[#7c3292] shadow-[0px_10px_30px_#96969640] transition transform -translate-[12px] duration-200"
																		style={{
																			left: this.state.otherSlide + "%",
																		}}
																	>
																		<div className="relative cursor-pointer">
																			<span className="absolute h-[32px] w-[32px] -ml-[11px] left-0 bottom-[11px] flex items-center bg-[#7c3292] transform -rotate-[45deg] rounded-[50%_50%_50%_0] justify-center">
																				<span className="transform text-white text-[10px] rotate-[45deg]">
																					{this.state.otherValue}
																				</span>
																			</span>
																		</div>
																	</span>
																	<input
																		className="absolute w-full bg-transparent appearance-none left-0 bottom-0 z-[9] h-[51px] outline-[0px] opacity-0 cursor-pointer"
																		name="range"
																		type="range"
																		value={this.state.otherValue}
																		min="70"
																		max="100"
																		onChange={(e) =>
																			this.handleInfluencerValue(e)
																		}
																	/>
																</div>
															</div>
														</Tab.Panel>
													</Tab.Panels>
												</Tab.Group>
											</div>
											<div className="md:col-span-6 col-span-12 mt-6">
												<div className="m-0">
													<input
														name="influencer_discount_code"
														className="rounded-[8px] h-[40px] xxs:text-[14px] text-[12px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
														value={this.props.influencer_discount_code}
														onChange={(e) => this.props.handleChange(e)}
														type="text"
														placeholder="Enter Discount Code - Influencer"
													/>
													{this.state.influencer_discount_code ? (
														<span className="red">
															{this.state.influencer_discount_code}
														</span>
													) : (
														""
													)}
												</div>
												<div className="mt-4">
													<input
														name="url"
														value={this.props.url}
														className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
														onChange={(e) => this.props.handleChange(e)}
														type="text"
														placeholder="URL"
													/>
													<small className="text-[#6c757d]">
														(i.e https://example.com)
													</small>
												</div>
											</div>
										</div>
										<div>
											<div className="grid grid-cols-12 gap-5 pt-12">
												<div className="lg:col-span-6 col-span-12 my-auto">
													<div className="flex flex-wrap gap-5 items-center justify-between">
														<p className="font-medium">
															Discount for followers
														</p>
														<div className="flex items-center ml-auto">
															<p
																style={{
																	color: this.props.is_discount_for_follower
																		? "#ccc"
																		: "#7d2d94",
																}}
																className="font-medium"
															>
																OFF
															</p>
															<Switch
																checked={this.props.is_discount_for_follower}
																onChange={(e) =>
																	this.handleChange(
																		e,
																		"is_discount_for_follower",
																		"checkbox"
																	)
																}
																className={`${this.props.is_discount_for_follower
																	? "bg-[#7c3292]"
																	: "bg-[#00000061]"
																	} relative inline-flex h-[16px] w-[38px] shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out mx-3`}
															>
																<span
																	aria-hidden="true"
																	className={`${this.props.is_discount_for_follower
																		? "translate-x-[19px]"
																		: "-translate-x-[2px]"
																		} pointer-events-none relative bg-white shadow-[0px_1px_3px_0px_#96969657] -top-[2px] inline-block h-[20px] w-[20px] transform rounded-full ring-0 transition duration-200 ease-in-out`}
																/>
															</Switch>
															<p
																style={{
																	color: this.props.is_discount_for_follower
																		? "#7d2d94"
																		: "#ccc",
																}}
																className="font-medium"
															>
																ON
															</p>
															<Tooltip
																trigger={
																	<div className="ml-2">
																		<BsQuestionCircle
																			className="dark"
																			size={18}
																		/>
																	</div>
																}
																tooltipText="By switching this option ON you will grant an
																additional discount for all followers who will
																see the published post. Each Influencer taking
																part in this campaign will have to share the
																additional discount code by posting it below the
																photo/video. This should increase the sales of
																your product(s) or service(s)."
																placement="top-left"
															/>
														</div>
													</div>
												</div>
											</div>
											{this.props.is_discount_for_follower === true ? (
												<div className="grid grid-cols-12 gap-5 mt-12">
													<div className="lg:col-span-6 col-span-12 my-auto">
														<p className="font-medium mb-12">
															Discount value for followers
														</p>
														<div className="mt-12 relative after:content-[''] before:w-full before:h-[3px] before:rounded-[10px] before:bg-[#b7bde3] before:block">
															<span
																className="absolute inline-block top-0 left-0 h-[3px] bg-[#7c3292] transition duration-200 rounded-[20px]"
																style={{
																	width: this.state.followerValue + "%",
																}}
															/>
															<span
																className="absolute top-[-5px] w-[12px] h-[12px] rounded-full inline-block bg-[#7c3292] shadow-[0px_10px_30px_#96969640] transition transform -translate-[12px] duration-200"
																style={{ left: this.state.followerValue + "%" }}
															>
																<div className="relative cursor-pointer">
																	<span className="absolute h-[32px] w-[32px] -ml-[11px] left-0 bottom-[11px] flex items-center bg-[#7c3292] transform -rotate-[45deg] rounded-[50%_50%_50%_0] justify-center">
																		<span className="transform text-white text-[10px] rotate-[45deg]">
																			{this.state.followerValue}
																		</span>
																	</span>
																</div>
															</span>
															<input
																className="absolute w-full bg-transparent appearance-none left-0 bottom-0 z-[9] h-[51px] outline-[0px] opacity-0 cursor-pointer"
																name="range"
																type="range"
																value={this.state.followerValue}
																min="0"
																onChange={(e) => this.handleFollowerValue(e)}
															/>
														</div>
													</div>
													<div className="lg:col-span-6 col-span-12 my-auto">
														<div className="m-0">
															<input
																className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
																name="follower_discount_code"
																value={this.props.follower_discount_code}
																onChange={(e) => this.props.handleChange(e)}
																type="text"
																placeholder="Enter Discount Code - Followers"
															/>
															{this.state.follower_discount_code ? (
																<span className="red">
																	{this.state.follower_discount_code}
																</span>
															) : (
																""
															)}
														</div>
													</div>
												</div>
											) : (
												""
											)}
										</div>
										<div>
											<div className="grid grid-cols-12 gap-5 pt-12">
												<div className="lg:col-span-6 col-span-12 my-auto">
													<div className="flex flex-wrap gap-5  items-center justify-between">
														<p className="font-medium">Affiliate Commission</p>
														<div className="flex items-center ml-auto">
															<p
																style={{
																	color: this.props.is_affiliate_commission
																		? "#ccc"
																		: "#7d2d94",
																}}
																className="font-medium"
															>
																OFF
															</p>
															<Switch
																checked={this.props.is_affiliate_commission}
																onChange={(e) =>
																	this.handleChange(
																		e,
																		"is_affiliate_commission",
																		"checkbox"
																	)
																}
																className={`${this.props.is_affiliate_commission
																	? "bg-[#7c3292]"
																	: "bg-[#00000061]"
																	} relative inline-flex h-[16px] w-[38px] shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out mx-3`}
															>
																<span
																	aria-hidden="true"
																	className={`${this.props.is_affiliate_commission
																		? "translate-x-[19px]"
																		: "-translate-x-[2px]"
																		} pointer-events-none relative bg-white shadow-[0px_1px_3px_0px_#96969657] -top-[2px] inline-block h-[20px] w-[20px] transform rounded-full ring-0 transition duration-200 ease-in-out`}
																/>
															</Switch>
															<p
																style={{
																	color: this.props.is_affiliate_commission
																		? "#7d2d94"
																		: "#ccc",
																}}
																className="font-medium"
															>
																ON
															</p>
															<Tooltip
																trigger={
																	<div className="ml-2">
																		<BsQuestionCircle
																			className="dark"
																			size={18}
																		/>
																	</div>
																}
																tooltipText="By switching this option ON, you are offering
																the influencer an affiliate commission on total
																sales when a customer makes a purchase through
																the influencer affiliate link or use their
																coupon code."
																placement="top-left"
															/>
														</div>
													</div>
												</div>
											</div>
											{this.props.is_affiliate_commission === true ? (
												<div className="grid grid-cols-12 gap-5 mt-12">
													<div className="lg:col-span-6 col-span-12 my-auto">
														<p className="font-medium mb-12">
															Affiliate Commission Value
														</p>
														<div className="mt-12 relative after:content-[''] before:w-full before:h-[3px] before:rounded-[10px] before:bg-[#b7bde3] before:block">
															<span
																className="absolute inline-block top-0 left-0 h-[3px] bg-[#7c3292] transition duration-200 rounded-[20px]"
																style={{
																	width: this.state.affilateValue + "%",
																}}
															/>
															<span
																className="absolute top-[-5px] w-[12px] h-[12px] rounded-full inline-block bg-[#7c3292] shadow-[0px_10px_30px_#96969640] transition transform -translate-[12px] duration-200"
																style={{ left: this.state.affilateValue + "%" }}
															>
																<div className="relative cursor-pointer">
																	<span className="absolute h-[32px] w-[32px] -ml-[11px] left-0 bottom-[11px] flex items-center bg-[#7c3292] transform -rotate-[45deg] rounded-[50%_50%_50%_0] justify-center">
																		<span className="transform text-white text-[10px] rotate-[45deg]">
																			{this.state.affilateValue}
																		</span>
																	</span>
																</div>
															</span>
															<input
																className="absolute w-full bg-transparent appearance-none left-0 bottom-0 z-[9] h-[51px] outline-[0px] opacity-0 cursor-pointer"
																name="range"
																type="range"
																value={this.state.affilateValue}
																min="0"
																onChange={(e) => this.handleAffiliateValue(e)}
															/>
														</div>
													</div>
												</div>
											) : (
												""
											)}
										</div>
									</div>
								</div>
							</div>
						) : (
							<div className="sm:col-span-8 col-span-12">
								<h4 className="mb-4 text-[20px]">Product Details</h4>
								<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4">
									<form>
										<div className="grid grid-cols-12 gap-5 mt-12">
											<div className="md:col-span-6 col-span-12">
												<label>Product category</label>
												<Select
													value={this.props.category}
													styles={colourStyles}
													options={categories}
													isSearchable={true}
													placeholder={"Select Category"}
													onChange={this.props.handleSelectChange}
												/>
												{this.props.errorsObj?.category ? (
													<span className="red">
														{this.props.errorsObj.category[0]}
													</span>
												) : (
													""
												)}
											</div>
											<div className="col-span-6"></div>
											<div className="md:col-span-6 col-span-12">
												<label>Product name</label>
												<input
													type="text"
													name="name"
													className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
													value={this.props.name ? this.props.name : ""}
													onChange={(e) => this.props.handleChange(e)}
													placeholder="Enter Name"
												/>
												{this.props.errorsObj?.name ? (
													<span className="red">
														{this.props.errorsObj.name[0]}
													</span>
												) : (
													""
												)}
											</div>
											<div className="md:col-span-6 col-span-12">
												<label>Value</label>
												<div className="flex items-center">
													<input
														aria-label="Large"
														className="rounded-l-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292] text-right"
														aria-describedby="inputGroup-sizing-sm"
														type="number"
														name="value"
														value={this.props.value ? this.props.value : ""}
														onChange={(e) => this.props.handleChange(e)}
													/>
													<div className="bg-[#e9ecef] h-[40px] px-[0.75rem] text-[#495057] rounded-r-[8px] border-l-0 text-[14px] border-[1px] border-[#ced4da] flex items-center justify-center">
														{this.props.currentLoggedUser.currency_code}
													</div>
												</div>
												{this.props.errorsObj?.value ? (
													<span className="red">
														{this.props.errorsObj.value[0]}
													</span>
												) : (
													""
												)}
											</div>
											<div className="col-span-12">
												<label>URL</label>
												<div className="flex items-center">
													<input
														aria-label="Large"
														type="text"
														className="rounded-l-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
														name="url"
														aria-describedby="inputGroup-sizing-md"
														value={this.props.url ? this.props.url : ""}
														onChange={(e) => this.props.handleChange(e)}
													/>
													<div className="bg-[#e9ecef] w-[52px] h-[40px] px-[0.75rem] text-[#495057] rounded-r-[8px] border-l-0 text-[14px] border-[1px] border-[#ced4da] flex items-center justify-center">
														<MdExitToApp size={22} className="text-[#FD2965]" />
													</div>
												</div>
												{this.props.errorsObj?.url ? (
													<span className="red">{this.props.errorsObj.url[0]}</span>
												) : (
													""
												)}
											</div>
											<div className="col-span-12">
												<label>Description</label>
												<ReactQuill
													value={
														this.props.description ? this.props.description : ""
													}
													className="editor-class add-product"
													onChange={(editor) =>
														this.props.handleChange({
															target: {
																name: "description",
																value: editor,
															},
														})
													}
													theme="snow"
												/>
												{this.props.errorsObj?.description ? (
													<span className="red">
														{this.props.errorsObj.description[0]}
													</span>
												) : (
													""
												)}
											</div>
										</div>
									</form>
								</div>
							</div>
						)}
						<div className="md:col-span-4 col-span-12 mt-12 md:!mt-0">
							<h4 className="mb-4 text-[20px]">
								Images
								<span className="ml-1 text-[12px] darkGray font-normal">
									(optional)
								</span>
							</h4>
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-12 sm:!p-4 mb-2 text-center">
								<ImageUploader
									// defaultImages={''}
									// withPreview={true}

									buttonText="Add Image"
									onChange={this.onDrop}
									label="Max file size: 1mb, max images:5, accepted: jpg, gif, png"
									imgExtension={[".jpg", ".gif", ".png"]}
									maxFileSize={1048576}
								/>
								{this.props.errorsObj && this.props.errorsObj?.images && (
									<span className="red">{this.props.errorsObj.images[0]}</span>
								)}
								{this.props.imgLoading ? <div className="flex justify-center"><FaSpinner className="animate-[spin_2s_linear_infinite] text-4xl text-[#FD2965]" /></div> : <div className="grid grid-cols-3 gap-x-3 gap-y-5">
									{this.props.images && this.props.images.map(img => (
										<div className="w-18 h-18 relative">
											<img src={img} alt="pic" className="object-cover w-full h-full rounded-md"></img>
											<div className='absolute bg-red-500 px-2 -right-2 -top-3 rounded-xl cursor-pointer' onClick={() => this.onDeleteImage(img, this.props.id)}>
												<span className="text-white">
													x
												</span>
											</div>
										</div>
									))}
								</div>
								}
							</div>

							{refreshData.is_admin && (
								<div className="py-12">
									<Button
										disabled={this.props.isLoading}
										onClick={this.handleUpdateProduct}
										className="px-12 rounded-[8px] h-[40px] w-full text-[14px] inline-flex items-center justify-center bg--purple text-white hover:opacity-80"
										text={
											this.props.isLoading ? (
												<FaSpinner className="animate-[spin_2s_linear_infinite] text-white" />
											) : (
												"Save"
											)
										}
									/>
									<LinkTo
										to="/products"
										text="Cancel"
										className="px-12 rounded-[8px] h-[40px] w-full text-[14px] inline-flex items-center justify-center mt-6 bg-[#8d8d8d] text-white hover:opacity-80"
									/>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currentLoggedUser: state.HeaderReducer.currentLoggedUser,
		isLoading: state.EditProductReducer.isLoading,
		imgLoading: state.EditProductReducer.imgLoading,
		errorsObj: state.EditProductReducer.errorsObj,
		name: state.EditProductReducer.name,
		original_name: state.EditProductReducer.original_name,
		status: state.EditProductReducer.status,
		value: state.EditProductReducer.value,
		url: state.EditProductReducer.url,
		offer_type: state.EditProductReducer.offer_type,
		voucher_type: state.EditProductReducer.voucher_type,
		retire: state.EditProductReducer.retire,
		code_num_of_vouchers: state.EditProductReducer.code_num_of_vouchers,
		code_vouchers: state.EditProductReducer.code_vouchers,
		link_num_of_vouchers: state.EditProductReducer.link_num_of_vouchers,
		link_vouchers: state.EditProductReducer.link_vouchers,
		format_of_voucher: state.EditProductReducer.format_of_voucher,
		description: state.EditProductReducer.description,
		category: state.EditProductReducer.category,
		images: state.EditProductReducer.images,
		categories: state.EditProductReducer.categories,
		response_status: state.EditProductReducer.response_status,
		voucher_pdf_path: state.EditProductReducer.voucher_pdf_path,
		voucher_pdf_name: state.EditProductReducer.voucher_pdf_name,
		influencer_tab_value: state.EditProductReducer.influencer_tab_value,
		influencer_discount_value:
			state.EditProductReducer.influencer_discount_value,
		influencer_discount_code: state.EditProductReducer.influencer_discount_code,
		is_discount_for_follower: state.EditProductReducer.is_discount_for_follower,
		follower_discount_value: state.EditProductReducer.follower_discount_value,
		follower_discount_code: state.EditProductReducer.follower_discount_code,
		is_affiliate_commission: state.EditProductReducer.is_affiliate_commission,
		affiliate_commission_value:
			state.EditProductReducer.affiliate_commission_value,
		refreshData: state.HeaderReducer.refreshData,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		fetchOffer: (id) => dispatch(editProductActionCreator.fetchOffer(id)),
		fetchCategories: () => dispatch(editProductActionCreator.fetchCategories()),
		handleSelect: (event) =>
			dispatch({
				type: HANDLE_SELECT_VOUCHER_TYPE,
				payload: event,
			}),
		handleChange: (event) =>
			dispatch({ type: HANDLE_CHANGE_SUCCESS, payload: event }),
		handleSelectChange: (event) =>
			dispatch({ type: HANDLE_SELECT_CHANGE_SUCCESS, payload: event }),
		handleSelectVocherFormate: (event) =>
			dispatch({ type: HANDLE_SELECT_VOUCHER_FORMATE, payload: event }),
		handleOnDrop: (query) =>
			dispatch(editProductActionCreator.handleImageAdd(query, ownProps)),
		handleProductUpdate: (query) =>
			dispatch(editProductActionCreator.handleProductUpdate(query, ownProps)),
		handleImageDelete: (query) =>
			dispatch(editProductActionCreator.handleImageDelete(query, ownProps)),
		handleProductRemove: (query) =>
			dispatch(editProductActionCreator.handleProductRemove(query, ownProps)),
		removeVoucherPdf: (query) =>
			dispatch(editProductActionCreator.removeVoucherPdf(query)),
		handleProductRetire: (query) =>
			dispatch(editProductActionCreator.handleProductRetire(query)),
		handleRemoveProductRetire: (query) =>
			dispatch(editProductActionCreator.handleRemoveProductRetire(query)),
		handleUploadProductPdf: (query) =>
			dispatch(editProductActionCreator.handleUploadProductPdf(query)),
		resetResponseStatus: () => dispatch({ type: REST_RESPONSE_STATUS }),
		handleCodeNumberVoucherChange: (event) =>
			dispatch({
				type: HANDLE_CHANGE_NUMBER_VOUCHER_SUCCESS,
				payload: event,
			}),
		handleLinkNumberVoucherChange: (event) =>
			dispatch({
				type: HANDLE_CHANGE_NUMBER_VOUCHER_LINK_SUCCESS,
				payload: event,
			}),
		handleCodeVoucherValue: (e, index) =>
			dispatch({
				type: HANDLE_CHANGE_CODE_VOUCHER_VALUE,
				payload: e,
				index: index,
			}),
		handleLinkVoucherValue: (e, index) =>
			dispatch({
				type: HANDLE_CHANGE_LINK_VOUCHER_VALUE,
				payload: e,
				index: index,
			}),
		handleClearErrors: () => dispatch({ type: HANDLE_CREDITS_ERRORS }),
		handleFollowerDiscountValue: (value) =>
			dispatch({ type: HANDLE_FOLLOWER_DISCOUNT_VALUE, payload: value }),
		handleInfluencerDiscountValue: (value) =>
			dispatch({
				type: HANDLE_INFLUENCER_DISCOUNT_VALUE,
				payload: value,
			}),
		handleInfluencerTabValue: (event) =>
			dispatch({ type: HANDLE_INFLUENCER_TAB_VALUE, payload: event }),
		saveNameValue: (value) =>
			dispatch({ type: HANDLE_SAVE_NAME_VALUE, payload: value }),
		handleAffiliateCommissionValue: (value) =>
			dispatch({
				type: HANDLE_AFFILIATE_COMMISSION_VALUE,
				payload: value,
			}),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandEditProduct);
