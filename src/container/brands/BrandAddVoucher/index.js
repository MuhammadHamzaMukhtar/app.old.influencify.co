import { Component } from "react";
import { Tab, Switch } from "@headlessui/react";
import Tooltip from "@components/global/Tooltip";
import { BsQuestionCircle } from "react-icons/bs";
import { MdCardGiftcard, MdVerifiedUser } from "react-icons/md";
import { connect } from "react-redux";
import ImageUploader from "react-images-upload";
import { FaSpinner } from "react-icons/fa";
import LinkTo from "@components/global/LinkTo";
import Button from "@components/global/Button";
import "./styles.css";

import * as addVoucherActionCreator from "@store/actions/AddVoucherActions";
import {
	HANDLE_CHANGE_CODE_VOUCHER_VALUE,
	HANDLE_CHANGE_NUMBER_VOUCHER_SUCCESS,
	HANDLE_CHANGE_SUCCESS,
	HANDLE_SELECT_OFFER_CATEGORY_SUCCESS,
	HANDLE_SELECT_VOUCHER_FORMATE,
	HANDLE_SELECT_VOUCHER_TYPE,
	REST_RESPONSE_STATUS,
	HANDLE_CHANGE_LINK_VOUCHER_VALUE,
	HANDLE_CHANGE_NUMBER_VOUCHER_LINK_SUCCESS,
	HANDLE_INFLUENCER_DISCOUNT_VALUE,
	HANDLE_INFLUENCER_TAB_VALUE,
	HANDLE_FOLLOWER_DISCOUNT_VALUE,
	HANDLE_CREDITS_ERRORS,
	HANDLE_SAVE_NAME_VALUE,
	HANDLE_AFFILIATE_COMMISSION_VALUE,
} from "@store/constants/action-types";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

class AddVoucher extends Component {
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
			followerValue: 10,
			affilateValue: 10,
		};
		this.onDrop = this.onDrop.bind(this);
	}

	componentDidMount() {
		this.props.fetchCategories();
		this.props.clearVoucher();
	}

	componentDidUpdate(pP, pS) {
		if (this.props.response_status === "success") {
			this.props.navigate("/products");
		}
	}
	
	handleAddVocher = () => {
		if (!this.props.influencer_discount_code) {
			this.setState({
				influencer_discount_code: "influencer discount code field is required",
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

		let query = {
			name: this.props.name,
			voucher_type: this.props.voucher_type,
			influencer_tab_value: this.props.influencer_tab_value,
			influencer_discount_value: this.props.influencer_discount_value,
			influencer_discount_code: this.props.influencer_discount_code,
			is_affiliate_commission: this.props.is_affiliate_commission,
			affiliate_commission_value: this.props.affiliate_commission_value,
			url: this.props.url,
			is_discount_for_follower: this.props.is_discount_for_follower,
			follower_discount_value: this.props.follower_discount_value,
			follower_discount_code: this.props.follower_discount_code,
			voucher_images: this.props.voucher_images,
		};
		this.props.handleVoucherAdd(query);
	};

	onDrop(pictureFiles, pictureDataURLs) {
		this.props.handleOnDrop(pictureDataURLs);
	}

	pdfChangedHandler = (event) => {
		const file = event.target.files[0];
		this.setState({
			fileName: file.name,
			pdfFile: file,
		});
	};

	cancelPdf = () => {
		this.setState({
			fileName: "",
			pdfFile: "",
		});
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

	render() {
		const { influencer_discount_code, url } = this.props;
		return (
			<div className="mb-12">
				<div className="py-[20px] border-b-[1px] border-[#ddd] bg-white">
					<div className="containers">
						<h2 className="dark text-[23px] font-italic font-bold">
							Add Discount/Voucher
						</h2>
					</div>
				</div>
				<div className="containers mt-12">
					<div className="grid grid-cols-12 gap-5">
						<div className="sm:col-span-8 col-span-12">
							<div className="mb-6 shadow-[0px_4px_5px_#96969640]">
								<input
									type="text"
									name="name"
									value={this.props.name}
									className="rounded-[8px] h-[50px] xs:text-[14px] text-[10px] inline-flex w-full items-center px-3 border-0 focus-visible:outline-0"
									onChange={(e) => this.props.handleChange(e)}
									placeholder="Voucher Name"
								/>
								{this.props.errorsObj?.name ? (
									<span className="red">{this.props.errorsObj?.name[0]}</span>
								) : (
									""
								)}
							</div>
						</div>
					</div>
					<div className="grid grid-cols-12 gap-5">
						<div className="sm:col-span-8 col-span-12">
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 add-voucher">
								<Tab.Group
									defaultIndex={0}
									onChange={(index) => {
										this.handleSelect(index);
									}}
								>
									<Tab.List className="grid lg:grid-cols-2 grid-cols-1 gap-5 items-center grow mb-[30px]">
										<Tab
											className={({ selected }) =>
												classNames(
													"flex px-3 grow items-center justify-start font-medium hover:opacity-80 xs:text-[11pt] text-[10px] shadow-[0px_4px_5px_#96969640] h-[60px] leading-[60px] !rounded-[8px] border-0",
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
													"flex px-3 items-center  grow justify-start font-medium hover:opacity-80 xs:text-[11pt] text-[10px] shadow-[0px_4px_5px_#96969640] h-[60px] leading-[60px] !rounded-[8px] border-0",
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
										<div className="xl:col-span-6 col-span-12">
											<Tab.Group
												defaultIndex={3}
												onChange={(index) => {
													this.props.handleInfluencerTabValue(index);
												}}
											>
												<Tab.List className="flex flex-wrap justify-between items-center grow">
													<Tab
														className={({ selected }) =>
															classNames(
																"flex items-center justify-center font-medium text-[18px] h-[75px] w-[75px] !rounded-full mb-6 border-[1px] border-[#e2e5ec]",
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
																"flex items-center justify-center font-medium text-[18px] h-[75px] w-[75px] !rounded-full mb-6 border-[1px] border-[#e2e5ec]",
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
																"flex items-center justify-center font-medium text-[16px] h-[75px] w-[75px] !rounded-full mb-6 border-[1px] border-[#e2e5ec]",
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
																"flex items-center justify-center font-medium text-[16px] h-[75px] w-[75px] !rounded-full mb-6 border-[1px] border-[#e2e5ec]",
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
														<div className="pt-6">
															<div className="mt-12 relative after:content-[''] before:w-full before:h-[3px] before:rounded-[10px] before:bg-[#b7bde3] before:block">
																<span
																	className="absolute inline-block top-0 left-0 h-[3px] bg-[#7c3292] transition duration-200 rounded-[20px]"
																	style={{ width: this.state.otherSlide + "%" }}
																/>
																<span
																	className="absolute top-[-5px] w-[12px] h-[12px] rounded-full inline-block bg-[#7c3292] shadow-[0px_10px_30px_#96969640] transition transform -translate-[12px] duration-200"
																	style={{ left: this.state.otherSlide + "%" }}
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
										<div className="xl:col-span-6 col-span-12 mt-6">
											<div className="m-0">
												<input
													name="influencer_discount_code"
													className="rounded-[8px] h-[40px] xs:text-[14px] text-[10px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
													onChange={(e) => this.props.handleChange(e)}
													type="text"
													placeholder="Enter Discount Code - Influencer"
													value={influencer_discount_code}
												/>
												{this.state.influencer_discount_code ? (
													<span className="red">
														{this.state.influencer_discount_code}
													</span>
												) : (
													""
												)}
												{this.props.errorsObj?.influencer_discount_code ? (
													<span className="red">
														{this.props.errorsObj.influencer_discount_code[0]}
													</span>
												) : (
													""
												)}
											</div>
											<div className="mt-4">
												<input
													name="url"
													className="rounded-[8px] h-[40px] xs:text-[14px] text-[10px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
													onChange={(e) => this.props.handleChange(e)}
													value={url}
													type="text"
													placeholder="URL"
												/>
												<small className="text-[#6c757d]">
													(i.e https://example.com)
												</small>
												{this.props.errorsObj?.url ? (
													<span className="red">
														{this.props.errorsObj.url[0]}
													</span>
												) : (
													""
												)}
											</div>
										</div>
									</div>
									<div>
										<div className="grid grid-cols-12 gap-5 pt-12">
											<div className="md:col-span-6 col-span-12 my-auto">
												<div className="flex flex-wrap gap-5 items-center justify-between">
													<p className="font-medium">Discount for followers</p>
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
															className={`${
																this.props.is_discount_for_follower
																	? "bg-[#7c3292]"
																	: "bg-[#00000061]"
															} relative inline-flex h-[16px] w-[38px] shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out mx-3`}
														>
															<span
																aria-hidden="true"
																className={`${
																	this.props.is_discount_for_follower
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
															additional discount for all followers who will see
															the published post. Each Influencer taking part in
															this campaign will have to share the additional
															discount code by posting it below the photo/video.
															This should increase the sales of your product(s)
															or service(s)."
															placement="top-left"
														/>
													</div>
												</div>
											</div>
										</div>
										{this.props.is_discount_for_follower === true ? (
											<div className="grid grid-cols-12 gap-5 mt-12">
												<div className="md:col-span-6 col-span-12 my-auto">
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
												<div className="md:col-span-6 col-span-12 mt-auto">
													<input
														name="follower_discount_code"
														className="rounded-[8px] h-[40px] xs:text-[14px] text-[10px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
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
										) : (
											""
										)}
									</div>
									<div>
										<div className="grid grid-cols-12 gap-5 pt-12">
											<div className="md:col-span-6 col-span-12 my-auto">
												<div className="flex flex-wrap gap-5 items-center justify-between">
													<p className="font-medium">Affiliate Commission</p>
													<div className="flex ml-auto items-center">
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
															className={`${
																this.props.is_affiliate_commission
																	? "bg-[#7c3292]"
																	: "bg-[#00000061]"
															} relative inline-flex h-[16px] w-[38px] shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out mx-3`}
														>
															<span
																aria-hidden="true"
																className={`${
																	this.props.is_affiliate_commission
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
															tooltipText="By switching this option ON, you are offering the
															influencer an affiliate commission on total sales
															when a customer makes a purchase through the
															influencer affiliate link or use their coupon
															code."
															placement="top-left"
														/>
													</div>
												</div>
											</div>
										</div>
										{this.props.is_affiliate_commission === true ? (
											<div className="grid grid-cols-12 gap-5 mt-12">
												<div className="md:col-span-6 col-span-12 my-auto">
													<p className="font-medium mb-12">
														Affiliate Commission Value
													</p>
													<div className="mt-12 relative after:content-[''] before:w-full before:h-[3px] before:rounded-[10px] before:bg-[#b7bde3] before:block">
														<span
															className="absolute inline-block top-0 left-0 h-[3px] bg-[#7c3292] transition duration-200 rounded-[20px]"
															style={{ width: this.state.affilateValue + "%" }}
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
						<div className="sm:col-span-4 col-span-12">
							<h5 className="mb-2 text-[18px]">
								Images{" "}
								<span className="ml-1 text-[12px] darkGray font-normal">
									(optional)
								</span>
							</h5>
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-12 sm:!p-4 mb-2 text-center">
								<h4 className="text-[20px]">ADD IMAGE</h4>
								<ImageUploader
									defaultImages={this.props.voucher_images}
									withPreview={true}
									buttonText="Add Image"
									onChange={this.onDrop}
									label="Max file size: 1mb, max images:5, accepted: jpg, gif, png"
									imgExtension={[".jpg", ".gif", ".png"]}
									maxFileSize={1048576}
								/>
								{this.props.errorsObj &&
									this.props.errorsObj?.voucher_images && (
										<span className="red">
											{this.props.errorsObj.voucher_images[0]}
										</span>
									)}
							</div>
							<div className="pt-12">
								<Button
									disabled={this.props.isLoading}
									onClick={this.handleAddVocher}
									text={
										this.props.isLoading ? (
											<FaSpinner className="animate-[spin_2s_linear_infinite] pink" />
										) : (
											"Save"
										)
									}
									className="px-12 rounded-[8px] h-[40px] w-full text-[14px] inline-flex items-center justify-center bg--purple text-white hover:opacity-80"
								/>
								<LinkTo
									to="/products"
									text="Cancel"
									className="px-12 rounded-[8px] h-[40px] w-full text-[14px] inline-flex items-center justify-center mt-6 bg-[#8d8d8d] text-white hover:opacity-80"
								/>
							</div>
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
		remainingPayPerProducts: state.HeaderReducer.remainingPayPerProducts,
		isLoading: state.AddVoucherReducer.isLoading,
		errorsObj: state.AddVoucherReducer.errorsObj,
		voucher_type: state.AddVoucherReducer.voucher_type,
		name: state.AddVoucherReducer.name,
		original_name: state.AddVoucherReducer.original_name,
		format_of_voucher: state.AddVoucherReducer.format_of_voucher,
		code_num_of_vouchers: state.AddVoucherReducer.code_num_of_vouchers,
		code_vouchers: state.AddVoucherReducer.code_vouchers,
		link_num_of_vouchers: state.AddVoucherReducer.link_num_of_vouchers,
		link_vouchers: state.AddVoucherReducer.link_vouchers,
		voucher_pdf: state.AddVoucherReducer.voucher_pdf,
		selectedCategory: state.AddVoucherReducer.selectedCategory,
		value: state.AddVoucherReducer.value,
		description: state.AddVoucherReducer.description,
		voucher_images: state.AddVoucherReducer.voucher_images,
		response_status: state.AddVoucherReducer.response_status,
		code_voucher_dummy: state.AddVoucherReducer.code_voucher_dummy,
		influencer_tab_value: state.AddVoucherReducer.influencer_tab_value,
		influencer_discount_value:
			state.AddVoucherReducer.influencer_discount_value,
		influencer_discount_code: state.AddVoucherReducer.influencer_discount_code,
		url: state.AddVoucherReducer.url,
		is_discount_for_follower: state.AddVoucherReducer.is_discount_for_follower,
		follower_discount_value: state.AddVoucherReducer.follower_discount_value,
		follower_discount_code: state.AddVoucherReducer.follower_discount_code,
		is_affiliate_commission: state.AddVoucherReducer.is_affiliate_commission,
		affiliate_commission_value:
			state.AddVoucherReducer.affiliate_commission_value,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		fetchCategories: () => dispatch(addVoucherActionCreator.fetchCategories()),
		handleSelect: (event) =>
			dispatch({ type: HANDLE_SELECT_VOUCHER_TYPE, payload: event }),
		handleInfluencerTabValue: (event) =>
			dispatch({ type: HANDLE_INFLUENCER_TAB_VALUE, payload: event }),
		handleInfluencerDiscountValue: (value) =>
			dispatch({
				type: HANDLE_INFLUENCER_DISCOUNT_VALUE,
				payload: value,
			}),
		handleFollowerDiscountValue: (value) =>
			dispatch({ type: HANDLE_FOLLOWER_DISCOUNT_VALUE, payload: value }),
		handleAffiliateCommissionValue: (value) =>
			dispatch({
				type: HANDLE_AFFILIATE_COMMISSION_VALUE,
				payload: value,
			}),
		handleChange: (event) =>
			dispatch({ type: HANDLE_CHANGE_SUCCESS, payload: event }),
		handleSelectChange: (event) =>
			dispatch({
				type: HANDLE_SELECT_OFFER_CATEGORY_SUCCESS,
				payload: event,
			}),
		handleSelectVocherFormate: (event) =>
			dispatch({ type: HANDLE_SELECT_VOUCHER_FORMATE, payload: event }),
		handleOnDrop: (event) =>
			dispatch({ type: "ADD_VOUCHER_ON_DROP_FILE", payload: event }),
		handleVoucherAdd: (query) =>
			dispatch(addVoucherActionCreator.handleVoucherAdd(query, ownProps)),
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
		saveNameValue: (value) =>
			dispatch({ type: HANDLE_SAVE_NAME_VALUE, payload: value }),
		clearVoucher: () => dispatch({ type: "HANDLE_CLEAR_VOUCHER" }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddVoucher);
