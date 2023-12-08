import React, { Component, Fragment } from "react";
import Tooltip from "@components/global/Tooltip";
import tooltip from "../../../constants/tooltip";
import { AiFillQuestionCircle } from "react-icons/ai";
import { Combobox, Transition } from "@headlessui/react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { connect } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { RiFileExcel2Fill } from "react-icons/ri";
import * as settingShopifyActions from "@store/actions/SettingShopifyActions";
import "./styles.css";
import Swal from "sweetalert2";
import moment from "moment";
import Influencify from "../../../constants/Influencify";
import Button from "@components/global/Button";
import LinkTo from "@components/global/LinkTo";
import Anchor from "@components/global/Anchor";
import { toast } from "react-toastify";
import exampleMatchEmail from "../../../assets/csv/example-match-email.csv"

class BrandInfluentialEmailMatch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list_name: "",
			error_list_name: "",
			file: null,
			is_all_customer: false,
			is_shopify: false,
			created_at_min: moment().startOf("month").format("YYYY-MM-DD"),
			created_at_max: moment().endOf("month").format("YYYY-MM-DD"),
			updated_at_min: null,
			updated_at_max: null,
			lists: {},
			instagram: "",
			youtube: "",
			tiktok: "",
			new_list: "yes",
			selected_instagrm: "",
			query_insta: "",
			selected_youtube: "",
			query_ytube: "",
			selected_tiktok: "",
			query_tktok: "",
		};
		this.inputRef = React.createRef();
		this.errorToast = React.createRef();
	}

	async componentDidMount() {
		const json = await Influencify.fetchAllBrandList();
		if (json !== undefined) {
			if (json.data) {
				this.setState({ lists: json.data });
			}
		}

		setTimeout(() => {
			if (this.props.refreshData.planName === "Free") {
				//window.location.href = "/dashboard";
			}
		}, 200);
	}

	uploadFile = (e) => {
		if (e.target.files.length > 0) {
			this.setState({ file: e.target.files[0] });
		}
	};

	submitFile = async () => {
		if (this.state.file) {
			const formData = new FormData();
			formData.append("list_name", this.state.list_name);
			formData.append("file", this.state.file);
			formData.append("new_list", this.state.new_list);
			formData.append("instagram", this.state.instagram);
			formData.append("youtube", this.state.youtube);
			formData.append("tiktok", this.state.tiktok);
			const json = await this.props.submitEmailMatchFile(formData);
			if (json !== undefined) {
				if (json.status) {
					if (json.data.success) {
						Swal.fire({
							title: "Please confirm",
							html: json.data.message,
							showCancelButton: true,
							showCloseButton: true,
							confirmButtonText: "Confirm",
							cancelButtonText: "Cancel",
							confirmButtonColor: "#7c3292",
							cancelButtonColor: "#f4f4f5",
							customClass: {
								actions: "flex-row-reverse",
								closeButton: "hover:text-[#7c3292]",
								confirmButton:
									"hover:!shadow-none focus:!shadow-none min-w-[100px]",
								cancelButton:
									"hover:!shadow-none focus:!shadow-none min-w-[100px] !text-[#202020]",
							},
							allowOutsideClick: () => !Swal.isLoading(),
						}).then(async (result) => {
							if (result.value) {
								const results = await this.props.submitEmailMatchData({
									list_name: this.state.list_name,
									data: this.props.data.data,
									instagram: this.state.instagram,
									youtube: this.state.youtube,
									tiktok: this.state.tiktok,
									new_list: this.state.new_list,
								});
								if (results !== undefined) {
									if (results.status) {
										if (results.data.success) {
											Swal.fire({
												title: "List finished",
												html: results.data.message,
												showCancelButton: false,
												showCloseButton: true,
												confirmButtonText: "Ok",
												confirmButtonColor: "#7c3292",
												cancelButtonColor: "#f4f4f5",
												customClass: {
													actions: "flex-row-reverse",
													closeButton: "hover:text-[#7c3292]",
													confirmButton:
														"hover:!shadow-none focus:!shadow-none min-w-[100px]",
													cancelButton:
														"hover:!shadow-none focus:!shadow-none min-w-[100px] !text-[#202020]",
												},
												allowOutsideClick: () => !Swal.isLoading(),
											}).then(async (result) => {});

											this.setState(
												{ file: null, list_name: "" },
												() => (this.inputRef.current.value = "")
											);
										}
									}
								}
							}
						});
					} else {
						if (!toast.isActive(this.errorToast.current)) {
							this.errorToast.current = toast.error(json.data.message);
						}
					}
				}
			}
		}
	};

	importShopifyCustomer = () => {
		this.setState({ error_list_name: "" });
		const {
			list_name,
			is_all_customer,
			created_at_min,
			created_at_max,
			updated_at_min,
			updated_at_max,
		} = this.state;
		const data = {
			list_name,
			is_all_customer,
			created_at_min,
			created_at_max,
			updated_at_min,
			updated_at_max,
		};
		if (list_name === "" || list_name.length < 3) {
			this.setState({ error_list_name: "Please enter list name" });
			return;
		}
		Swal.fire({
			title: "Please confirm",
			html: "Costs 0.5 credit for every matched email. If we couldn’t match it, it’s free",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: "Confirm",
			cancelButtonText: "Cancel",
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
		}).then(async (result) => {
			if (result.value) {
				this.props.startImportCustomer(data);
				this.setState({ list_name: "", is_shopify: false });
			}
		});
	};

	removeFile = () => {
		this.setState({ file: null }, () => (this.inputRef.current.value = ""));
	};

	onChangeDate = (key, value) => {
		this.setState({ [key]: value });
	};

	selectListFilter = (key, data) => {
		this.setState({ [key]: data.value });
		if (key === "instagram") {
			this.setState({ selected_instagrm: data.text });
		} else if (key === "youtube") {
			this.setState({ selected_youtube: data.text });
		} else if (key === "tiktok") {
			this.setState({ selected_tiktok: data.text });
		}
	};

	render() {
		const { isProcessing, currentLoggedUser } = this.props;
		const {
			created_at_min,
			created_at_max,
			updated_at_min,
			updated_at_max,
			lists,
			new_list,
			query_insta,
			query_ytube,
			query_tktok,
		} = this.state;
		if (lists.instagram === undefined) {
			lists.instagram = [];
		}
		if (lists.youtube === undefined) {
			lists.youtube = [];
		}
		if (lists.tiktok === undefined) {
			lists.tiktok = [];
		}
		let filteredInstagram =
			query_insta === ""
				? lists.instagram
				: lists.instagram.filter((person) =>
						person.text
							.toLowerCase()
							.replace(/\s+/g, "")
							.includes(query_insta.toLowerCase().replace(/\s+/g, ""))
				  );
		let filteredYoutube =
			query_ytube === ""
				? lists.youtube
				: lists.youtube.filter((person) =>
						person.text
							.toLowerCase()
							.replace(/\s+/g, "")
							.includes(query_ytube.toLowerCase().replace(/\s+/g, ""))
				  );
		let filteredTiktok =
			query_tktok === ""
				? lists.tiktok
				: lists.tiktok.filter((person) =>
						person.text
							.toLowerCase()
							.replace(/\s+/g, "")
							.includes(query_tktok.toLowerCase().replace(/\s+/g, ""))
				  );
		// if (
		//     !this.props.refreshData.is_admin ||
		//     this.props.refreshData.planName === "Free"
		// ) {
		//     return null;
		// }
		return (
			<div className="mb-12">
				<div className="bg-white shadow-[0px_4px_5px_#96969640]">
					<div className="containers py-10">
						<div className="flex items-center mb-6 black text-[18px] font-medium">
							Email Match
							<Tooltip
								trigger={
									<div className="ml-2">
										<AiFillQuestionCircle color="#9ea1b2" size={18} />
									</div>
								}
								tooltipText={tooltip.email_tooltip}
								placement="bottom-left"
							/>
						</div>
						<p className="md:w-7/12 black font-normal">
							For each email provided, find one or multiple social media
							accounts on Instagram, Youtube, and Tiktok who mentioned this
							email in their bio as their contact email.
						</p>
					</div>
				</div>
				<div className="containers">
					<div className="shadow-[0px_4px_5px_#96969640] bg-white rounded-[8px] p-4 mt-12 relative">
						<div
							className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80 right-0 cursor-pointer absolute mr-6"
							onClick={() =>
								this.setState({ new_list: new_list === "yes" ? "no" : "yes" })
							}
						>
							{new_list === "yes" ? "Existing list" : "New list"}
						</div>
						<div>
							{new_list === "yes" ? (
								<>
									<h4 className="font-medium black mb-4 text-[17px] ">
										List Name
									</h4>
									<input
										type="text"
										value={this.state.list_name}
										placeholder="Popup Subscribers"
										className="rounded-[8px] border-[1px] border-[#dee2e6] !text-[12px] !font-normal placeholder:text-[#343a40] px-[1rem] h-[40px] outline-0 md:w-5/12"
										onChange={(e) =>
											this.setState({ list_name: e.target.value })
										}
									/>
								</>
							) : (
								<div className="flex flex-wrap gap-4 mt-2">
									<div>
										<label>Instagram</label>
										<Combobox
											value={this.state.selected_instagrm}
											onChange={(data) =>
												this.selectListFilter("instagram", data)
											}
										>
											<div className="relative mt-1 z-50 w-[15rem]">
												<div className="relative w-full cursor-default overflow-hidden border border-[#22242626] rounded-lg bg-white text-left focus-visible:outline-0 sm:text-sm">
													<Combobox.Button className="w-full">
														<Combobox.Input
															className="w-full border-none h-[35px] px-4 text-sm text-gray-900 focus:outline-0"
															displayValue={this.state.selected_instagrm}
															placeholder="Select List"
															onChange={(event) =>
																this.setState({
																	query_insta: event.target.value,
																})
															}
														/>
													</Combobox.Button>
												</div>
												<Transition
													as={Fragment}
													leave="transition ease-in duration-100"
													leaveFrom="opacity-100"
													leaveTo="opacity-0"
													afterLeave={() => this.setState({ query_insta: "" })}
												>
													<Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-[14px] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
														{filteredInstagram.length === 0 &&
														query_insta !== "" ? (
															<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
																No results found.
															</div>
														) : (
															filteredInstagram.map((platform, key) => (
																<Combobox.Option
																	key={key}
																	className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
																		platform.text ===
																		this.state.selected_instagrm
																			? "bg-[#00000008] text-black font-semibold"
																			: "text-gray-900 font-medium"
																	}`}
																	value={platform}
																>
																	<span className={`block truncate `}>
																		{platform.text}
																	</span>
																</Combobox.Option>
															))
														)}
													</Combobox.Options>
												</Transition>
											</div>
										</Combobox>
									</div>
									<div>
										<label>Youtube</label>
										<Combobox
											value={this.state.selected_youtube}
											onChange={(data) =>
												this.selectListFilter("youtube", data)
											}
										>
											<div className="relative mt-1 z-50 w-[15rem]">
												<div className="relative w-full cursor-default overflow-hidden border border-[#22242626] rounded-lg bg-white text-left focus-visible:outline-0 sm:text-sm">
													<Combobox.Button className="w-full">
														<Combobox.Input
															className="w-full border-none h-[35px] px-4 text-sm text-gray-900 focus:outline-0"
															displayValue={this.state.selected_youtube}
															placeholder="Select List"
															onChange={(event) =>
																this.setState({
																	query_ytube: event.target.value,
																})
															}
														/>
													</Combobox.Button>
												</div>
												<Transition
													as={Fragment}
													leave="transition ease-in duration-100"
													leaveFrom="opacity-100"
													leaveTo="opacity-0"
													afterLeave={() => this.setState({ query_ytube: "" })}
												>
													<Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-[14px] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
														{filteredYoutube.length === 0 &&
														query_ytube !== "" ? (
															<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
																No results found.
															</div>
														) : (
															filteredYoutube.map((platform, key) => (
																<Combobox.Option
																	key={key}
																	className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
																		platform.text ===
																		this.state.selected_youtube
																			? "bg-[#00000008] text-black font-semibold"
																			: "text-gray-900 font-medium"
																	}`}
																	value={platform}
																>
																	<span className={`block truncate `}>
																		{platform.text}
																	</span>
																</Combobox.Option>
															))
														)}
													</Combobox.Options>
												</Transition>
											</div>
										</Combobox>
									</div>
									<div>
										<label>Tiktok</label>
										<Combobox
											value={this.state.selected_tiktok}
											onChange={(data) => this.selectListFilter("tiktok", data)}
										>
											<div className="relative mt-1 z-50 w-[15rem]">
												<div className="relative w-full cursor-default overflow-hidden border border-[#22242626] rounded-lg bg-white text-left focus-visible:outline-0 sm:text-sm">
													<Combobox.Button className="w-full">
														<Combobox.Input
															className="w-full border-none h-[35px] px-4 text-sm text-gray-900 focus:outline-0"
															displayValue={this.state.selected_tiktok}
															placeholder="Select List"
															onChange={(event) =>
																this.setState({
																	query_tktok: event.target.value,
																})
															}
														/>
													</Combobox.Button>
												</div>
												<Transition
													as={Fragment}
													leave="transition ease-in duration-100"
													leaveFrom="opacity-100"
													leaveTo="opacity-0"
													afterLeave={() => this.setState({ query_tktok: "" })}
												>
													<Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-[14px] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
														{filteredTiktok.length === 0 &&
														query_tktok !== "" ? (
															<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
																No results found.
															</div>
														) : (
															filteredTiktok.map((platform, key) => (
																<Combobox.Option
																	key={key}
																	className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
																		platform.text === this.state.selected_tiktok
																			? "bg-[#00000008] text-black font-semibold"
																			: "text-gray-900 font-medium"
																	}`}
																	value={platform}
																>
																	<span className={`block truncate `}>
																		{platform.text}
																	</span>
																</Combobox.Option>
															))
														)}
													</Combobox.Options>
												</Transition>
											</div>
										</Combobox>
									</div>
								</div>
							)}

							{this.state.error_list_name !== "" && (
								<p className="red">{this.state.error_list_name}</p>
							)}
							{!this.state.is_shopify && (
								<div className="flex mt-4 flex-wrap">
									<span className="black h-[40px] text-[15px] flex items-center pr-3 mr-2 font-normal">
										Upload CSV File |
									</span>
									<Anchor
										href={exampleMatchEmail}
										download="example-match-email.csv"
										text="Get Sample CSV File"
										className="black h-[40px] text-[15px] flex items-center px-[1rem] rounded-[8px] border-[1px] !border-[#dee2e6]"
									/>
									
								</div>
							)}
						</div>
						{/* {currentLoggedUser.is_test === 1 && ( */}
							<div className="mb-4 sm:!mb-0 mt-6">
								{currentLoggedUser.isShopifyLinked ? (
									<label
										htmlFor="emailmatch"
										className="cursor-pointer flex items-center text-[15px] font-normal"
									>
										<input
											id="emailmatch"
											type="checkbox"
											checked={this.state.is_shopify}
											onChange={() =>
												this.setState({
													is_shopify: !this.state.is_shopify,
												})
											}
											className="hidden peer"
										/>
										<span className="mr-3 peer-checked:bg-[#7c3292] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292] rounded-sm"></span>
										Email match from Shopify customers
									</label>
								) : (
									<LinkTo
										to="/integration/shopify"
										text="Connect Shopify to match email from shopify customers"
									/>
								)}
							</div>
						
						{this.state.is_shopify && (
							<div className="mt-6 mb-4">
								<div className="sm:flex items-center space-x-5 justify-center">
									<div className="mb-4 sm:!mb-0 mt-6">
										<label
											htmlFor="allcustomer"
											className="cursor-pointer flex items-center text-[15px] font-normal"
										>
											<input
												id="allcustomer"
												type="checkbox"
												checked={this.state.is_all_customer}
												onChange={() =>
													this.setState({
														is_all_customer: !this.state.is_all_customer,
													})
												}
												className="hidden peer"
											/>
											<span className="mr-3 peer-checked:bg-[#7c3292] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292] rounded-sm"></span>
											All Customer
										</label>
									</div>
									<div className="mb-4 sm:!mb-0 mr-2">
										<label className="text-[10px] darkGray">
											Created at min
										</label>
										<input
											disabled={this.state.is_all_customer}
											type="date"
											value={created_at_min}
											className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
											onChange={(e) =>
												this.onChangeDate("created_at_min", e.target.value)
											}
										/>
									</div>
									<div className="ml-0 sm:!ml-4 mr-2">
										<label className="text-[10px] darkGray">
											Created at max
										</label>
										<input
											disabled={this.state.is_all_customer}
											type="date"
											value={created_at_max}
											className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
											onChange={(e) =>
												this.onChangeDate("created_at_max", e.target.value)
											}
										/>
									</div>
									<div className="mb-4 sm:!mb-0 mr-2">
										<label className="text-[10px] darkGray">
											Updated at min
										</label>
										<input
											disabled={this.state.is_all_customer}
											type="date"
											value={updated_at_min}
											className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
											onChange={(e) =>
												this.onChangeDate("updated_at_min", e.target.value)
											}
										/>
									</div>
									<div className="ml-0 sm:!ml-4">
										<label className="text-[10px] darkGray">
											Updated at max
										</label>
										<input
											disabled={this.state.is_all_customer}
											type="date"
											value={updated_at_max}
											className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
											onChange={(e) =>
												this.onChangeDate("updated_at_max", e.target.value)
											}
										/>
									</div>
								</div>
							</div>
						)}
						{!this.state.is_shopify && (
							<div>
								{this.state.file ? (
									<div className="flex items-center justify-center flex-col">
										<div className="text-center">
											<RiFileExcel2Fill className="gray" size={50} />
										</div>
										<div className="text-center">
											<p className="gray">
												{this.state.file ? this.state.file.name : "unknown"}
											</p>
										</div>
										<div className="text-center">
											<button
												onClick={this.removeFile}
												className="px-6 rounded-[8px] h-[30px] text-[14px] inline-flex items-center bg-[#dc3545] text-white hover:opacity-80"
											>
												Remove file
											</button>
										</div>
									</div>
								) : (
									<div className="bg-[url('@assets/uploader_bg.jpg')] bg-center bg-[length:100%_100%] bg-no-repeat mt-12 mb-6">
										<label
											htmlFor="icon-button-file"
											className="w-full relative"
										>
											<input
												ref={this.inputRef}
												accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
												id="icon-button-file"
												type="file"
												onChange={this.uploadFile}
												className="absolute h-full w-full z-1 opacity-0 block cursor-pointer"
											/>
											<div className="bg-transparent h-[14rem] w-full flex items-center justify-center">
												<>
													<div className="flex flex-col justify-center items-center">
														<IoCloudUploadOutline className="gray" size={50} />
														<p className="gray">
															Drag and drop a file here or click
														</p>
													</div>
												</>
											</div>
										</label>
									</div>
								)}
							</div>
						)}
					</div>
					<div className="mt-12 flex justify-center">
						{isProcessing ? (
							<FaSpinner className="animate-[spin_2s_linear_infinite] pink text-[19px]" />
						) : !this.state.is_shopify ? (
							<Button
								onClick={this.submitFile}
								type="button"
								text="Upload List"
								className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
							/>
						) : (
							<Button
								onClick={this.importShopifyCustomer}
								type="button"
								text="Start Import"
								className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
							/>
						)}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ listEmailMatch, HeaderReducer }) => {
	return {
		isProcessing: listEmailMatch.isProcessing,
		data: listEmailMatch.data,
		refreshData: HeaderReducer.refreshData,
		currentLoggedUser: HeaderReducer.currentLoggedUser,
	};
};
const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/EmailMatchRedux");
	return {
		submitEmailMatchFile: (data) => {
			return actions.submitEmailMatchFile(dispatch, data);
		},
		submitEmailMatchData: (data) => {
			return actions.submitEmailMatchData(dispatch, data);
		},
		startImportCustomer: (data) =>
			dispatch(settingShopifyActions.startImportCustomer(data)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BrandInfluentialEmailMatch);
