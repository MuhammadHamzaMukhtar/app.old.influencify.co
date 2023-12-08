import { Component, Fragment } from "react";
import { FiX } from "react-icons/fi";
import { Dialog, Transition } from "@headlessui/react";
import Button from "@components/global/Button";
import voucher from "@assets/voucher.png";
import { connect } from "react-redux";
import CarouselImagesComponent from "@components/CarouselImagesComponent";
import * as influencersBookingIDActions from "@store/actions/InfluencersBookingIDActions";
import DOMPurify from "dompurify";
// import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaSpinner } from "react-icons/fa";
// import Select from "react-select";
import Loader from "@components/global/Loader";
import DownloadImage from "./DownloadImage";
import { BsClipboardCheck } from "react-icons/bs";
import { HANDEL_REJECT_MESSAGE_OPTIONAL } from "@store/constants/action-types";
import moment from "moment";
import { toast } from "react-toastify";

// const capitalize = (s) => {
// 	if (typeof s !== "string") return "";
// 	let str = s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
// 	return str.replace(/_/g, " ");
// };

class InfluencerBookingOverviewTab extends Component {

	constructor(props) {
		super(props);
		this.state = {
			// lightboxIsOpen: false,
			downalodModalOpen: false,
			// currentIndex: 0,
			// post_fee: 0,
			influencer_price: this.props.campaignInfluencer?.price,
			// story_fee: 0,
			// post_fee_validate: "",
			// story_fee_validate: "",
			influencer_price_validate: false,
			selected_products_validate: false,
			influencer_email_validate: false,
			influencer_email: this.props.campaignInfluencer?.paypal_email ?? "",
			error: "",
			pastDate: false,
			submitModal: false,
			rejectModal: false,
			confirmModal: false,
			acceptModal: false,
			active: null,
			selected_products: this.props.campaign_payment?.campaign_products ?? []
		};
	}

	componentDidMount(prevProps) {
		// const { campaignInfluencer } = this.props;
		// let post_fee = parseInt(campaignInfluencer.post_fee) || 0;
		// let story_fee = parseInt(campaignInfluencer.story_fee) || 0;
		// if (campaignInfluencer.revision === 0) {
		// 	//post_fee = (parseInt(campaignInfluencer.no_of_post) || 0) * post_fee;
		// 	//story_fee = (parseInt(campaignInfluencer.no_of_story) || 0) * story_fee;
		// }
		let date1 = new Date(this.props.postingTo);
		let date2 = new Date();
		this.setState({ pastDate: date1 >= date2 ? false : true });
		if (this.props.campaign_payment?.campaign_products?.length > 0 && !this.state.selected_products.length && !this.props.campaign_payment?.has_fixed_price) {
			this.setState({ selected_products_validate: true })
		}
		if (this.props.campaign_payment?.has_influencer_email && !this.state.influencer_email) {
			this.setState({ influencer_email_validate: true })
		}
		if (this.props.campaign_payment?.is_influencer_propose && !this.state.influencer_price) {
			this.setState({ influencer_price_validate: true })
		}
		// this.setState({
		// 	post_fee,
		// 	story_fee,
		// });


	}

	handleModalReject = (e) => {
		this.setState({
			rejectModal: true,
		});
	};

	handleClose = () => {
		this.setState({
			downalodModalOpen: false,
			rejectModal: false,
			submitModal: false,
			acceptModal: false,
			confirmModal: false,
		});
	};

	handleModalSubmit = (e) => {
		this.setState({
			submitModal: true,
		});
	};

	handleModalAccept = (e) => {
		this.setState({
			acceptModal: true,
		});
	};

	handleModalConfirm = (e) => {
		this.setState({
			confirmModal: true,
		});
	};

	handleOpenDownloadModal = () => {
		this.setState({
			downalodModalOpen: true,
		});
	};

	createMarkup = (html) => {
		return {
			__html: DOMPurify.sanitize(html),
		};
	};

	// onCopyCode = () => {
	// 	toast.success("Copied to clipboard");
	// };

	influencerBookingCampaignReject = () => {
		let query = {
			campaignId: this.props.campaignID,
			rejectOptionalMessage: this.props.rejectOptionalMessage,
		};
		this.props.handleInfluencerRejectRequest(query);
		this.setState({
			rejectModal: false,
		});
	};

	handleChange = (key, value, validate) => {
		(key === 'influencer_email' ? value.length > 0 : value > 9)
			? this.setState({ [validate]: false })
			: this.setState({ [validate]: true });
		this.setState({ [key]: value });
		// if (key === 'influencer_email' && this.props.campaign_payment?.has_influencer_email && !value) {
		// 	this.setState({ influencer_email_validate: true })
		// } else {
		// 	this.setState({ influencer_email_validate: false })
		// }
	};

	acceptQuotePrice = async () => {
		// const form = Object.assign({}, this.props.form);
		const query = {
			status: "inprogress",
			flag: 2,
			campaign_id: this.props.campaignID,
			influencer_email: this.state.influencer_email
			// influencers: [{ id: this.props.campaignInfluencer?.user_id }],
			// budget: this.props.campaign_payment?.price,
		}
		const json = await this.props.acceptQuotePrice(query);
		if (json.success) {
			this.props.influencerBookingCampaignOverview(this.props.campaignID);
			toast.success("Quote accepted! Start working on campaign")
		} else {
			this.setState({
				acceptModal: false,
			});
		}
	};

	confirmPayment = async () => {
		const query = {
			campaign_id: this.props.campaignID,
		}

		const json = await this.props.confirmPayment(query);
		if (json.success) {
			this.props.influencerBookingCampaignOverview(this.props.campaignID);
			toast.success("Payment accepted")
		} else {
			this.setState({
				confirmModal: false,
			});
		}
	};

	submitQuotePrice = async () => {
		let data = { campaign_id: this.props.campaignID };
		this.setState({ error: "" });
		const { campaign_payment } = this.props;
		const { story_fee, influencer_price, selected_products, influencer_email } = this.state;
		// if (campaignInfluencer.fee_type !== "product") {
		// 	if (campaignInfluencer.no_of_post > 0 && post_fee < 10) {
		// 		this.setState({
		// 			error: "Please set post fee greater or equal to $10",
		// 		});
		// 		return;
		// 	}
		// 	if (campaignInfluencer.no_of_story > 0 && story_fee < 10) {
		// 		this.setState({
		// 			error: "Please set story fee greater or equal to $10",
		// 		});
		// 		return;
		// 	}
		// } else 
		// if (
		// 	campaignInfluencer.fee_type === "product" ||
		// 	campaignInfluencer.fee_type === "productcash"
		// ) {
		// 	if (influencerProduct && influencerProduct.id) {
		// 	} else {
		// 		this.setState({ error: "Please select product" });
		// 		return;
		// 	}
		// }

		// data["post_fee"] = post_fee;
		// data["story_fee"] = story_fee;
		data["price"] = story_fee;
		if (campaign_payment?.campaign_products?.length > 0 && !selected_products.length && !campaign_payment?.has_fixed_price) {
			this.setState({ selected_products_validate: true })
		}
		if (campaign_payment?.has_fixed_price) {
			data['price'] = campaign_payment.price;
		}
		if (campaign_payment?.has_influencer_email) {
			data['influencer_email'] = influencer_email;
		}
		if (campaign_payment?.is_influencer_propose) {
			data['influencer_price'] = influencer_price;
		}
		if (campaign_payment?.campaign_products?.length > 0) {
			data['selected_products'] = selected_products;
		}
		// if (influencerProduct && influencerProduct.id) {
		// 	data["product_id"] = influencerProduct.id;
		// }
		const res = await this.props.submitRequestQuotePayment(data);
		if (res) {
			this.setState({ submitModal: false })
		}
	};

	// onChangeQuoteType = (type) => {
	// 	let { campaignInfluencer } = this.props;
	// 	campaignInfluencer.fee_type = type;
	// 	this.setState({ post_fee: 0, story_fee: 0 });
	// 	this.forceUpdate();
	// };

	onChangeProduct = (name, checked) => {
		// if (e.offer_images.length > 0) {
		// 	for (let i = 0; i <= e.offer_images.length; i++) {
		// 		images.push({ path: e.offer_images[i] });
		// 	}
		// }
		// let { influencerProduct } = this.props;
		// influencerProduct.name = e.label;
		// influencerProduct.id = e.value;
		// influencerProduct.value = e.price;
		// influencerProduct.offer_images = images;
		// this.forceUpdate();
		// if (value === true) {
		// 	this.setState({ campaign_products: [...this.state.campaign_products, {id: key}] })
		// } else {
		// 	this.state
		// }
		const currentProducts = this.state.selected_products;

		if (checked) {
			currentProducts?.push(name);
		} else {
			const index = currentProducts.indexOf(name);
			if (index > -1) {
				currentProducts.splice(index, 1);
			}
		}

		if (currentProducts.length > 0) {
			this.setState({ selected_products_validate: false });
		} else {
			this.setState({ selected_products_validate: true });
		}

		this.setState({
			selected_products: currentProducts,
		});
	};

	download(image) {
		var a = document.createElement("a");
		document.body.appendChild(a);
		const url = window.URL.createObjectURL(new Blob([image.src]));
		a.href = url;
		a.download = image.name;
		a.click();
		window.URL.revokeObjectURL(url);
	}

	handleToggle = (index) => {
		if (this.state.active === index) {
			this.setState({ active: null });
		} else {
			this.setState({ active: index });
		}
	};

	handleCopyVoucher = (textToCopy) => {
		if (textToCopy) {
			navigator.clipboard.writeText(textToCopy)
				.then(() => {
					toast.success(`${textToCopy} Copied to clipboard`);
				})
				.catch((error) => {
					toast.error("Error while Copied to clipboard");
				});
		}

	}

	render() {
		if (this.props.isLoader) {
			return (
				<Loader
					className="h-[46vh] w-full flex justify-center items-center"
					size="67"
				/>
			);
		}
		// let description = "";
		// var campaign_name = this.props.campaignTitle;
		var influencer_name = this.props.currentLoggedUser.name;
		const {
			campaignType,
			campaignInfluencer,
			// payment_processing,
			quotePaymentIsProcessing,
			// brandProducts,
			// influencerProduct,
			acceptQuotePriceLoading,
			campaign_payment,
			campaignTasks,
			FlowStatus,
			errors
		} = this.props;
		const { active, selected_products, influencer_price, influencer_email, selected_products_validate, influencer_email_validate, influencer_price_validate } = this.state;
		// const products = brandProducts.length
		// 	? brandProducts.map((data) => ({
		// 		label: data.name,
		// 		value: data.id,
		// 		price: data.value,
		// 		offer_images: data.images,
		// 		offer_type: data.offer_type,
		// 		influencer_discount_value: data.influencer_discount_value,
		// 		description: data.description,
		// 	}))
		// 	: [];
		return (
			<>
				<div className="grid grid-cols-12 gap-5 mb-12">
					<div className="lg:col-span-6 col-span-12">
						<h5 className="mb-2 text-[18px]">Brief</h5>
						<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-12">
							<div className="flex flex-col divide-y divide-[#00000020]">
								<div className="flex justify-between px-[16px] py-[8px]">
									<p>
										{this.props.FlowStatus === "requested" ?
											"Price" : "Final Price"
										}
									</p>
									<h4 className=" text-[20px]">
										{this.props.FlowStatus === "requested" ?
											(campaign_payment?.has_fixed_price && campaign_payment?.price ? `${campaign_payment?.price} ${this.props.currentLoggedUser.currency_code}` : "") : (campaignInfluencer?.price ? `${campaign_payment?.influencer_price} ${this.props.currentLoggedUser.currency_code}` : "")
										}
										{campaign_payment?.has_fixed_price && campaign_payment?.campaign_products?.length > 0 && " + "}
										{campaign_payment?.campaign_products && campaign_payment?.campaign_products?.length
											? "Voucher"
											: ""}
									</h4>
								</div>
								<div className="flex justify-between px-[16px] py-[8px]">
									<p>Posting period</p>
									<strong className="font-medium">
										{moment(this.props.postingFrom).format("DD-MM-YYYY")} -{" "}
										{moment(this.props.postingTo).format("DD-MM-YYYY")}
									</strong>
								</div>
								<div className="flex justify-between px-[16px] py-[8px]">
									<p>Post type</p>
									<strong className="font-medium">
										{this.props.goalName}
										{/* {this.props.contentPostType.Story > 0
											? ": " + this.props.contentPostType.Story + " Stories "
											: ""}{" "}
										{this.props.contentPostType.Story > 0 &&
											this.props.contentPostType.Post > 0 &&
											" + "}{" "}
										{this.props.contentPostType.Post > 0
											? this.props.contentPostType.Post + " Posts"
											: ""} */}
									</strong>
								</div>
								<div className="flex justify-between px-[16px] py-[8px]">
									<p>Wording</p>
									<strong className="font-medium">
										{this.props.postWordingType}
									</strong>
								</div>
								<div className="flex justify-between gap-x-16 px-[16px] py-[8px]">
									<p>Sample Wording</p>
									<div className="break-all"
										dangerouslySetInnerHTML={this.createMarkup(
											this.props.postWording
										)}
									></div>
								</div>
								<div className="flex justify-between px-[16px] py-[8px]">
									<p className="mr-4 sm:mr-12">Instructions</p>
									<div>
										<div
											dangerouslySetInnerHTML={this.createMarkup(
												this.props.campaignInstruction
											)}
										></div>
									</div>
								</div>
								<div className="flex justify-between px-[16px] py-[8px]">
									<p className="w-28">Links to share</p>
									<a
										className="break-words break-all success font-normal text-[16px]"
										target={"_blank"}
										rel="noreferrer noopener"
										href={`${this.props.linkToShare
											}?utm_source=Influencify&utm_medium=${(
												this.props.campaignTitle || ""
											).replace(/\s/g, "+")}&utm_campaign=${(
												influencer_name || ""
											).replace(/\s/g, "+")}`}
									>
										{this.props.linkToShare}
									</a>
								</div>
								{/* {this.props.campaignPreview ?
                                        <div className="flex justify-between px-[16px] py-[8px]">
                                            <p className="mr-4 sm:mr-12">Preview need</p>
                                            <div>
                                                  <p>
                                                    The brand wants to preview your content first, so
                                                    you will have to create it in advance. Once
                                                    approved, publish it and you'll get paid.
                                                  </p>
                                            </div>
                                        </div>
                                        : ''
                                        } */}
								<div className="flex justify-between px-[16px] py-[8px]"></div>
							</div>
						</div>
					</div>
					{campaignType === "quoteCampaign" && (
						<div className="lg:col-span-6 col-span-12">
							<h5 className="mb-2 text-[18px]">
								How would you like to be compensated?
							</h5>
							{/* <div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-12">
								{campaignInfluencer && (
									<>
										<div className="flex flex-row justify-around mb-4">
											<div>
												<label
													htmlFor="radio1"
													className="flex items-center cursor-pointer relative text-[#6c757d] text-[14px] font-semibold"
												>
													<input
														id="radio1"
														type="radio"
														name="products"
														checked={
															campaignInfluencer.fee_type === "product"
																? true
																: false
														}
														onChange={() => this.onChangeQuoteType("product")}
														disabled={
															campaignInfluencer.is_lock === 1 ? true : false
														}
														className="absolute peer opacity-0 z-[0]"
													/>
													<span className="peer-checked:bg-[#d1d1d1] peer-checked:border-[#d1d1d1] peer-checked:shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#0000008a] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
													Free Product Only
												</label>
											</div>
											<div>
												<label
													htmlFor="radio2"
													className="flex items-center cursor-pointer relative text-[#6c757d] text-[14px] font-semibold"
												>
													<input
														id="radio2"
														type="radio"
														name="products"
														checked={
															campaignInfluencer.fee_type === "cash"
																? true
																: false
														}
														onChange={() => this.onChangeQuoteType("cash")}
														disabled={
															campaignInfluencer.is_lock === 1 ? true : false
														}
														className="absolute peer opacity-0 z-[0]"
													/>
													<span className="peer-checked:bg-[#d1d1d1] peer-checked:border-[#d1d1d1] peer-checked:shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#0000008a] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
													Cash Only
												</label>
											</div>
											<div>
												<label
													htmlFor="radio3"
													className="flex items-center cursor-pointer relative text-[#6c757d] text-[14px] font-semibold"
												>
													<input
														id="radio3"
														type="radio"
														name="products"
														checked={
															campaignInfluencer.fee_type === "productcash"
																? true
																: false
														}
														onChange={() =>
															this.onChangeQuoteType("productcash")
														}
														disabled={
															campaignInfluencer.is_lock === 1 ? true : false
														}
														className="absolute peer opacity-0 z-[0]"
													/>
													<span className="peer-checked:bg-[#d1d1d1] peer-checked:border-[#d1d1d1] peer-checked:shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#0000008a] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
													Free Product and Cash
												</label>
											</div>
										</div>

										<div className="grid grid-cols-12 gap-5">
											{campaignInfluencer.fee_type !== "product" && (
												<div className="col-span-6">
													{!!campaignInfluencer.no_of_story &&
														campaignInfluencer.no_of_story > 0 && (
															<>
																<div className="mb-4">
																	<p className="mr-6 whitespace-nowrap font-bold">
																		Price per story
																	</p>
																</div>
																<div className="mb-4">
																	<input
																		readOnly={
																			campaignInfluencer.is_lock === 1
																				? true
																				: false
																		}
																		disabled={this.state.pastDate}
																		value={story_fee}
																		onChange={(e) =>
																			this.handleChange(
																				"story_fee",
																				e.target.value,
																				"story_fee_validate"
																			)
																		}
																		name="story_fee"
																		placeholder="Enter your story fee..."
																		className="rounded-[8px] border border-black pink !text-[12px] !font-normal dark-placeholder px-[1rem] h-11 outline-0 w-full"
																		type="number"
																		min={1}
																		max={1000000}
																	/>
																	{this.state.story_fee_validate && (
																		<p className="red">
																			Price must be greater or equal to 10
																		</p>
																	)}
																</div>
															</>
														)}
													{!!campaignInfluencer.no_of_post &&
														campaignInfluencer.no_of_post > 0 && (
															<>
																<p className="mr-6 whitespace-nowrap font-bold">
																	Price per post
																</p>
																<input
																	readOnly={
																		campaignInfluencer.is_lock === 1
																			? true
																			: false
																	}
																	disabled={this.state.pastDate}
																	value={post_fee}
																	onChange={(e) =>
																		this.handleChange(
																			"post_fee",
																			e.target.value,
																			"post_fee_validate"
																		)
																	}
																	name="post_fee"
																	placeholder="Enter your post fee..."
																	className="rounded-[8px] border border-black pink !text-[12px] !font-normal dark-placeholder px-[1rem] h-11 outline-0 w-full"
																	type="number"
																	min={1}
																	max={1000000}
																/>
																{this.state.post_fee_validate && (
																	<p className="red">
																		Price must be greater or equal to 10
																	</p>
																)}
															</>
														)}
													{this.state.pastDate && (
														<p className="red">Campaign date expired</p>
													)}
												</div>
											)}
											{(campaignInfluencer.fee_type === "product" ||
												campaignInfluencer.fee_type === "productcash") && (
													<div className="col-span-6">
														<div className="mb-4">
															<p className="mr-6 whitespace-nowrap font-bold">
																Select Product
															</p>
														</div>
														<div className="mb-4">
															<Select
																value={0}
																options={products}
																isClearable={true}
																isSearchable={true}
																placeholder={"Product"}
																onChange={this.onChangeProduct}
																isDisabled={
																	campaignInfluencer.is_lock === 1 ? true : false
																}
																formatOptionLabel={(product) => {
																	description = (
																		product.description || ""
																	).replace(/<[^>]+>/g, "");
																	return (
																		<div className="flex items-center">
																			<div className="shrink-0">
																				<img
																					src={
																						product.offer_images.length > 0
																							? product.offer_images[0]
																							: avatar
																					}
																					className="w-[40px] h-[40px] object-cover rounded-full"
																					alt={product.label}
																				/>
																			</div>
																			<div className="pl-2">
																				<h4 className="text-[16px] font-medium ">
																					{product.label}
																				</h4>
																				{product.offer_type === "Product" ? (
																				<p>Price: ${product.price}</p>
																			) : (
																				<p>
																					Discount Value :
																					{product.influencer_discount_value}%
																				</p>
																			)}
																			{!!description && (
																				<p>Description: {description}</p>
																			)}
																			</div>
																		</div>
																	);
																}}
															/>
														</div>
														<div className="col-span-12">
															{influencerProduct && influencerProduct.id && (
																<div className="flex justify-between flex-row">
																	<p className="mr-6 text-wrap font-bold">
																		{influencerProduct.name}
																		<br />
																		{influencerProduct.offer_images &&
																			influencerProduct.offer_images.length >
																			0 && (
																				<img
																					src={
																						influencerProduct.offer_images[0].path
																					}
																					className="w-[90px]"
																					alt={influencerProduct.value}
																				/>
																			)}
																	</p>
																	<p className="mr-6 whitespace-nowrap font-bold">
																		${influencerProduct.value}
																	</p>
																</div>
															)}
														</div>
													</div>
												)}
										</div>
										<div className="grid grid-cols-12 gap-5 mt-4">
											{!!error && <p className="red">{error}</p>}
											<div className="col-span-12">
												<p>
													Total: ({story_fee} USD x{" "}
													{campaignInfluencer.no_of_story}
													)+({post_fee} USD * {campaignInfluencer.no_of_post}) ={" "}
													{(
														((parseFloat(story_fee) || 0) *
															parseFloat(campaignInfluencer.no_of_story) || 0) +
														(parseFloat(post_fee) || 0) *
														(parseFloat(campaignInfluencer.no_of_post) || 0)
													).toFixed(2)}{" "}
													USD
												</p>
											</div>
											{payment_processing !== 1 && (
												<div className="mt-6 col-span-12">
													<div className="bg-[#fff3cd] border-[1px] border-[#ffecb5] text-[#664d03] p-[.75rem_1.25rem] rounded-[8px] mb-[1rem]">
														Influencify doesn't handle payment on behalf of the
														client, we will only notify them of your quote and
														you should agree with them on how you will be
														compensated
													</div>
												</div>
											)}
											<div className="col-span-12">
												<div className="flex flex-row-reverse">
													{quotePaymentIsProcessing ? (
														<FaSpinner className="animate-[spin_2s_linear_infinite] pink mr-2" />
													) : (
														<Button
															disabled={this.state.pastDate}
															className="px-4 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
															onClick={() => this.submitQuotePrice()}
															text="Submit quote"
														/>
													)}
												</div>
											</div>
										</div>
									</>
								)}
							</div> */}
							<div className="shadow-[0px_4px_5px_#96969640] text-[16px] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-12">
								{campaign_payment?.has_fixed_price &&
									<>
										{campaignInfluencer?.message && (FlowStatus === "requested" || FlowStatus === "rejected") &&
											(FlowStatus === "rejected" ?
												<div className={`bg-[#dc3545] px-6 py-3 rounded-[8px] mb-4`}>
													<p className="text-white break-all">Your quotation has been rejected due to following reason: {campaignInfluencer?.message}</p>
												</div> :
												<div className={`bg-[#ff9f00] px-6 py-3 rounded-[8px] mb-4`}>
													<p className="text-white break-all">Brand has send revision due to following reason: {campaignInfluencer?.message}</p>
												</div>)
										}
										<div className="grid grid-cols-12 gap-5 mb-3">
											<div className={`col-span-12 ${campaign_payment?.is_influencer_propose && 'lg:col-span-6'} space-y-3`}>
												<p>Price</p>
												<input
													type="text"
													value={campaign_payment?.price}
													className="rounded-[8px] border border-black pink !text-[12px] !font-normal dark-placeholder px-[1rem] h-11 outline-0 w-full"
													disabled
												/>
											</div>
											{campaign_payment?.is_influencer_propose &&
												<div className="col-span-12 lg:col-span-6 space-y-3">
													<p>{FlowStatus !== 'requested' ? 'Your quoted price' : 'Quote your own price'}</p>
													<input
														className="rounded-[8px] border border-black pink !text-[12px] !font-normal dark-placeholder px-[1rem] h-11 outline-0 w-full"
														type="number"
														value={influencer_price}
														disabled={FlowStatus !== 'requested' || campaignInfluencer?.is_lock}
														onChange={(e) => this.handleChange('influencer_price', e.target.value, 'influencer_price_validate')}
													/>
													{errors?.influencer_price && (
														<p className="red">
															{errors.influencer_price[0]}
														</p>
													)}
												</div>
											}
										</div>
									</>
								}
								{campaign_payment?.campaign_products && campaign_payment?.campaign_products.length > 0 &&
									<div className="space-y-6 mb-7">
										<p>Gift Vouchers</p>
										{campaign_payment?.campaign_products.map((product, index) => (
											<div className="grid grid-cols-12 gap-x-16 items-center" key={index}>
												<div className="col-span-8">
													<a
														href={product.voucher_type == 'mandatory' ? product.url : (product.voucher_type == 'gift' && FlowStatus === "closed" && product.url)}
														target="_blank"
														rel="noopener noreferrer"
													>
														<div className="grid grid-cols-12 gap-3 items-center">
															<div className="col-span-2">
																<img
																	src={
																		product.images.length
																			? product.images[0]
																			: voucher
																	}
																	alt={product.label}
																	className="w-[70px] rounded-md"
																/>
															</div>
															<div className="col-span-8">
																<h6>{product.label}</h6>
															</div>
															<div className="col-span-2">
																<h6>
																	{product.discountPercentage}{" %"}
																	{/* {this.props.currentLoggedUser.currency_code} */}
																</h6>
															</div>
														</div>
													</a>
												</div>
												{product.voucher_type == 'gift' && FlowStatus === "closed" &&
													<div className="col-span-4">
														<div className="flex">
															<span class="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-900 dark:text-gray-300 break-all">{product.discountCode}</span>
															<span onClick={() => this.handleCopyVoucher(product.discountCode)} className="cursor-pointer"><BsClipboardCheck /></span>
														</div>
													</div>
												}
												{product.voucher_type == 'mandatory' &&
													<div className="col-span-4">
														<div className="flex">
															<span class="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-900 dark:text-gray-300 break-all">{product.discountCode}</span>
															<span onClick={() => this.handleCopyVoucher(product.discountCode)} className="cursor-pointer"><BsClipboardCheck /></span>
														</div>
													</div>
												}
												{/* <div className="col-span-1 pt-3">
														<label
															htmlFor={index}
															className="cursor-pointer flex items-center text-[15px] font-normal"
														>
															<input
																id={index}
																type="checkbox"
																name={product.value}
																checked={selected_products?.find((i) => (i === product.value))?.length > 0}
																onChange={(e) => this.onChangeProduct(e.target.name, e.target.checked)}
																className="hidden peer"
																disabled={FlowStatus !== 'requested'}
															/>
															<span className={`mr-3 peer-checked:bg-[#7c3292] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292]`}></span>
														</label>
													</div> */}
											</div>
										))}
										{/* {selected_products_validate && (
											<p className="red">
												Choose at least one product
											</p>
										)}
										{errors?.selected_products && (
											<p className="red">
												{errors.selected_products[0]}
											</p>
										)} */}
									</div>
								}
								{campaign_payment?.has_influencer_email &&
									<div className="my-7">
										<div className={`my-3 space-y-3`}>
											<p>Your Papypal Email</p>
											<input
												type="text"
												value={influencer_email}
												disabled={FlowStatus !== 'requested'}
												className="rounded-[8px] border border-black pink !text-[12px] !font-normal dark-placeholder px-[1rem] h-11 outline-0 w-full"
												onChange={(e) => this.handleChange('influencer_email', e.target.value, 'influencer_email_validate')}
											/>
											{errors?.influencer_email ? (
												<p className="red">
													{errors.influencer_email[0]}
												</p>
											) :
												(influencer_email_validate && (
													<p className="red">
														Paypal email is required
													</p>
												))
											}
										</div>
										<div className="mt-6">
											<div className="bg-[#fff3cd] border-[1px] border-[#ffecb5] text-[#664d03] p-[.75rem_1.25rem] rounded-[8px] mb-[1rem]">
												Influencify doesn't handle payment on behalf of the
												client, we will only notify them of your quote and
												you should agree with them on how you will be
												compensated
											</div>
										</div>
									</div>
								}
								{FlowStatus === 'requested' &&
									<div className="flex flex-row-reverse gap-3 mt-3">
										{/* {quotePaymentIsProcessing ? (
											<FaSpinner className="animate-[spin_2s_linear_infinite] pink mr-2" />
										) : ( */}
										{campaign_payment?.is_influencer_propose ?
											<Button
												disabled={campaignInfluencer?.is_lock || influencer_email_validate || influencer_price_validate}
												className="px-4 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
												onClick={() => this.handleModalSubmit()}
												text="Submit quote"
											/> :
											<Button
												disabled={campaignInfluencer?.is_lock || influencer_email_validate}
												className="px-10 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
												onClick={() => this.handleModalAccept()}
												text="Accept"
											/>
										}
										{!campaignInfluencer?.is_lock &&
											<Button
												type="button"
												text="Reject"
												onClick={() => this.handleModalReject()}
												className="px-10 rounded-[8px] h-[40px] inline-flex items-center bg--purple text-white hover:opacity-80 text-[14px] mr-2"
											/>
										}
										{/* )} */}
									</div>
								}
								{FlowStatus === 'closed' && campaignInfluencer?.is_paid == 1 &&
									<div className="flex flex-row-reverse gap-3 mt-3">
										<Button
											className="px-10 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
											onClick={() => this.handleModalConfirm()}
											text="Confirm Payment"
										/>
									</div>
								}
							</div>
						</div>
					)}
				</div>

				{/* <div className="grid grid-cols-12 mb-12">
					<div className="col-span-12 text-[18px]">
						<h5 className="mb-2">Tasks</h5>
						<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-12">
							{campaignTasks && campaignTasks.length > 0 ? (
								campaignTasks.map((task, index) => {
									return (
										<div
											key={index}
											className="border-[1px] my-5 border-[#00000020] bg-[#49749a08] flex flex-col relative rounded-[8px] p-5">
											<div className="flex justify-between cursor-pointer items-center md:divide-y-0 divide-y divide-[#0000001f]"
												onClick={() => this.handleToggle(index)}
											>
												<h6 className="text-[20px] font-medium">
													{task.title}
												</h6>
												<div className="flex justify-between gap-7">
													{!task.is_mandatory && <p className=" text-green-900 text-[15px] font-semibold">(Optional)</p>}
													{active === index ?
														<BsChevronDown
															className="mt-2 sm:!mt-0"
															size={20}
														/> :
														<BsChevronUp
															className="mt-2 sm:!mt-0"
															size={20}
														/>
													}
												</div>
											</div>
											{active === index &&
												<div className="relative top-0 overflow-hidden">
													<div className="transition-[height] overflow-auto ease-in-out duration-[0.35s]">
														<div className="min-w-[550px] overflow-x-auto">
															<div className="my-4 px-[20px] space-y-10">
																{/* <div className="space-y-5">
																	<label className="text-[15px]">Title</label>
																	<input
																		type="text"
																		disabled={true}
																		value={task.title}
																		className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
																	/>
																</div> */}
				{/* {task.description && */}
				{/* <div className="space-y-5"> */}
				{/* <label className="text-[15px]">Description</label> 	
																<input
																	type="text"
																	className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
																	value={task.description}
																	placeholder="Nothing to show"
																	disabled={true}
																/>
																</div>
																 }
															</div>
														</div>
													</div>
												</div>
											}
										</div>
									)
								})
							) : (
								<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
									We have nothing to show you here.
								</div>
							)}
						</div>
					</div>
				</div> */}

				{/* <div className="grid grid-cols-12 gap-5 mb-12"> */}
				{/* <div className="lg:col-span-4 col-span-12">
						<h5 className="mb-2 text-[18px]">Products</h5>
						<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3">
							{this.props.products && this.props.products?.length ? (
								this.props.products.map((product, index) => (
									<div key={index}>
										{product.offer_type === "Product" ? (
										<div className="grid grid-cols-12 gap-5 pt-4">
											<div className="sm:col-span-4 col-span-12">
												<a
													href={product.url}
													target="_blank"
													rel="noopener noreferrer"
												>
													<img
														src={
															product.images.length
																? product.images[0].image_base_64
																: avatar
														}
														alt={product.label}
														className="w-[90px] rounded-full"
													/>
												</a>
											</div>
											<div className="sm:col-span-8 col-span-12 pt-4">
												<div className="table w-full h-full">
													<h6 className="text-[16px]">{product.label}</h6>
													{product.description &&
														<div
															dangerouslySetInnerHTML={{
																__html: product.description,
															}}
														/>
													}
													<h6 className="table-cell text-right text-[16px]">
														{product.price}{" "}
														{this.props.currentLoggedUser.currency_code}
													</h6>
												</div>
											</div>
										</div>
										) : (
											""
										)}
										{product.offer_type === "Voucher" &&
											(product.voucher_type === null ||
												product.voucher_type === "mandatory") ? (
											<>
												<div className="grid grid-cols-12 gap-5 pt-4">
													<div className="sm:col-span-4 col-span-12">
														{product.url ? (
															<a
																href={
																	product.url +
																	"?utm_source=Influencify&utm_medium=" +
																	campaign_name +
																	"&utm_campaign=" +
																	influencer_name
																}
																target="_blank"
																rel="noopener noreferrer"
															>
																<img
																	src={
																		product.images.length
																			? product.images[0]
																			: avatar
																	}
																	alt={product.name}
																	className="w-[90px] rounded-full ml-2"
																/>
															</a>
														) : (
															<img
																src={
																	product.images.length
																		? product.images[0]
																		: avatar
																}
																alt={product.name}
																className="w-[90px] rounded-full ml-2"
															/>
														)}
													</div>
													<div className="sm:col-span-8 col-span-12">
														<div className="table w-full h-full">
															{product.url ? (
																<a
																	href={
																		product.url +
																		"?utm_source=Influencify&utm_medium=" +
																		campaign_name +
																		"&utm_campaign=" +
																		influencer_name
																	}
																	target="_blank"
																	rel="noopener noreferrer"
																>
																	<h4 className=" text-[20px]">
																		{product.name}
																	</h4>
																</a>
															) : (
																<h4 className=" text-[20px]">{product.name}</h4>
															)}
															<div
																dangerouslySetInnerHTML={{
																	__html: product.description,
																}}
															/>
															<div className="flex flex-col">
																<div className="px-0 justify-start items-center p-0">
																	<p className="mr-2">Discount Value: </p>
																	<h4 className=" text-[20px]">
																		{product.influencer_discount_value} %
																	</h4>
																</div>
															</div>
															{this.props.FlowStatus !== "N/A" &&
																this.props.FlowStatus !== "requested" ? (
																<div className="mt-4 flex flex-wrap items-stretch">
																	<input
																		placeholder="Influencer.Code"
																		aria-label="Influencer.Code"
																		aria-describedby="basic-addon2"
																		className="border-[1px] flex-1 border--purple h-[40px] px-[1rem] focus-visible:outline-0 rounded-l-[8px]"
																		defaultValue={
																			product.influencer_discount_code
																		}
																	/>
																	<CopyToClipboard
																		text={product.influencer_discount_code}
																		onCopy={() => this.onCopyCode()}
																	>
																		<span
																			className="text-white h-[40px] border-[1px] border--purple bg--purple rounded-r-[8px] inline-flex items-center justify-center px-4"
																			id="basic-addon2"
																		>
																			Copy
																		</span>
																	</CopyToClipboard>
																</div>
															) : (
																""
															)}
														</div>
													</div>
												</div>
												{product.is_discount_for_follower === true ? (
													<>
														<div className="bg-[#0000001f] h-[1px] w-full my-4" />
														<div className="grid grid-cols-12 gap-5 pt-4">
															<div className="sm:col-span-4 col-span-12">
																<div className="justify-center h-full flex">
																	<svg
																		xmlns="http://www.w3.org/2000/svg"
																		width="80"
																		height="80"
																		viewBox="0 0 24 24"
																		fill="none"
																		stroke="#7d2d94"
																		strokeWidth="1"
																		strokeLinecap="round"
																		strokeLinejoin="round"
																		className="feather feather-gift"
																	>
																		<polyline points="20 12 20 22 4 22 4 12"></polyline>
																		<rect
																			x="2"
																			y="7"
																			width="20"
																			height="5"
																		></rect>
																		<line x1="12" y1="22" x2="12" y2="7"></line>
																		<path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
																		<path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
																	</svg>
																</div>
															</div>
															<div className="sm:col-span-8 col-span-12">
																<div className="table w-full h-full">
																	<h4 className=" text-[18px]">
																		Special offer for your friends and followers
																	</h4>
																	<p className="mr-2">
																		They get {product.follower_discount_value}%
																		discount code when they purchase with the
																		promo code below
																	</p>
																	{this.props.FlowStatus !== "N/A" &&
																		this.props.FlowStatus !== "requested" ? (
																		<div className="mt-4 flex flex-wrap items-stretch">
																			<input
																				placeholder="Influencer.Code"
																				aria-label="Influencer.Code"
																				aria-describedby="basic-addon2"
																				className="border-[1px] flex-1 border--purple h-[40px] px-[1rem] focus-visible:outline-0 rounded-l-[8px]"
																				defaultValue={
																					product.follower_discount_code
																				}
																			/>
																			<CopyToClipboard
																				text={product.follower_discount_code}
																				onCopy={() => this.onCopyCode()}
																			>
																				<span
																					className="text-white h-[40px] border-[1px] border--purple bg--purple rounded-r-[8px] inline-flex items-center justify-center px-4"
																					id="basic-addon2"
																				>
																					Copy
																				</span>
																			</CopyToClipboard>
																		</div>
																	) : (
																		""
																	)}
																</div>
															</div>
														</div>
													</>
												) : (
													""
												)}
												{product.is_affiliate_commission === true ? (
													<>
														<div className="bg-[#0000001f] h-[1px] w-full my-4" />
														<div className="grid grid-cols-12 gap-5 pt-4">
															<div className="sm:col-span-4 col-span-12">
																<div className="justify-center h-full flex">
																	<svg
																		id="Capa_1"
																		enableBackground="new 0 0 512 512"
																		fill="#7d2d94"
																		height="80"
																		viewBox="0 0 512 512"
																		width="80"
																		xmlns="http://www.w3.org/2000/svg"
																	>
																		<g id="XMLID_367_">
																			<path
																				id="XMLID_392_"
																				d="m505.644 294.955c-11.382-18.096-34.402-24.568-53.542-15.06l-111.226 55.194h-17.938c1.993-5.188 3.086-10.819 3.086-16.7 0-25.751-20.95-46.701-46.7-46.701h-147.9l-131.424 79.98v159.341l162.18-59.162h153.371c28.563 0 55.945-8.778 79.185-25.383l100.105-75.829c17.679-12.781 22.433-37.191 10.803-55.68zm-28.434 31.406-100.082 75.81c-18.084 12.871-39.374 19.675-61.578 19.675h-158.671l-126.878 46.284v-99.6l109.834-66.842h139.489c9.208 0 16.7 7.492 16.7 16.7 0 9.209-7.491 16.7-16.7 16.7h-67.739v30.001h136.325l117.535-58.324c5.29-2.627 11.658-.841 14.805 4.164 3.227 5.13 1.892 11.909-3.04 15.432z"
																			/>
																			<path
																				id="XMLID_406_"
																				d="m251.384 249.292c68.457 0 124.151-55.694 124.151-124.151s-55.694-124.15-124.151-124.15-124.15 55.693-124.15 124.15 55.693 124.151 124.15 124.151zm94.15-124.151c0 46.73-34.224 85.611-78.922 92.912v-24.946c17.878-4.848 31.07-21.207 31.07-40.598 0-23.195-18.871-42.066-42.066-42.066h-11.278c-6.611 0-11.991-5.379-11.991-11.991s5.379-11.992 11.991-11.992h49.339v-30.001h-27.066v-24.23c44.699 7.301 78.923 46.182 78.923 92.912zm-108.923-92.987v25.03c-19.474 3.639-34.264 20.754-34.264 41.267 0 23.154 18.837 41.992 41.991 41.992h11.278c6.653 0 12.065 5.413 12.065 12.066s-5.412 12.065-12.065 12.065h-43.259v30.001h24.254v23.554c-44.921-7.11-79.377-46.098-79.377-92.988s34.456-85.878 79.377-92.987z"
																			/>
																		</g>
																	</svg>
																</div>
															</div>
															<div className="sm:col-span-8 col-span-12">
																<div className="table w-full h-full">
																	<h4 className=" text-[18px]">
																		Your reward for refering new customers
																	</h4>
																	<p className="mr-2">
																		You get {product.affiliate_commission_value}
																		% commission on total sales when someone
																		makes a purchase through your affilate link
																		or coupon code.
																	</p>
																	{this.props.FlowStatus !== "N/A" &&
																		this.props.FlowStatus !== "requested" ? (
																		<div className="mt-4">
																			<div className="mb-4 flex flex-wrap items-stretch">
																				<input
																					placeholder="Influencer.Code"
																					aria-label="Influencer.Code"
																					aria-describedby="basic-addon2"
																					className="border-[1px] flex-1 border--purple h-[40px] px-[1rem] focus-visible:outline-0 rounded-l-[8px]"
																					defaultValue={
																						product.url
																							? product.url +
																							"?utm_source=Influencify&utm_medium=" +
																							campaign_name +
																							"&utm_campaign=" +
																							influencer_name
																							: ""
																					}
																				/>
																				<CopyToClipboard
																					text={
																						product.url
																							? product.url +
																							"?utm_source=Influencify&utm_medium=" +
																							campaign_name +
																							"&utm_campaign=" +
																							influencer_name
																							: ""
																					}
																					onCopy={() => this.onCopyCode()}
																				>
																					<span
																						className="text-white h-[40px] border-[1px] border--purple bg--purple rounded-r-[8px] inline-flex items-center justify-center px-4"
																						id="basic-addon2"
																					>
																						Copy
																					</span>
																				</CopyToClipboard>
																			</div>
																		</div>
																	) : (
																		""
																	)}
																</div>
															</div>
														</div>
													</>
												) : (
													""
												)}
											</>
										) : (
											""
										)}
										{product.offer_type === "Voucher" &&
											product.voucher_type === "gift" ? (
											<>
												<div className="grid grid-cols-12 gap-5 pt-4">
													<div className="sm:col-span-4 col-span-12">
														{product.url ? (
															<a
																href={
																	product.url +
																	"?utm_source=Influencify&utm_medium=" +
																	campaign_name +
																	"&utm_campaign=" +
																	influencer_name
																}
																target="_blank"
																rel="noopener noreferrer"
															>
																<img
																	src={
																		product.images.length
																			? product.images[0]
																			: avatar
																	}
																	alt={product.name}
																	className="w-[90px] rounded-full ml-2"
																/>
															</a>
														) : (
															<img
																src={
																	product.images.length
																		? product.images[0]
																		: avatar
																}
																alt={product.name}
																className="w-[90px] rounded-full ml-2"
															/>
														)}
													</div>
													<div className="sm:col-span-8 col-span-12">
														<div className="table w-full h-full">
															{product.url ? (
																<a
																	href={
																		process.env.REACT_APP_URL +
																		"/influencer/redirect/" +
																		encodeURIComponent(product.url) +
																		"?utm_source=Influencify&utm_medium=" +
																		campaign_name +
																		"&utm_campaign=" +
																		influencer_name
																	}
																	target="_blank"
																	rel="noopener noreferrer"
																>
																	<h4 className=" text-[20px]">
																		{product.name}
																	</h4>
																</a>
															) : (
																<h4 className=" text-[20px]">{product.name}</h4>
															)}
															<div
																dangerouslySetInnerHTML={{
																	__html: product.description,
																}}
															/>
															<div className="flex flex-col">
																<div className="px-0 justify-start items-center p-0">
																	<p className="mr-2">Discount Value: </p>
																	<h4 className=" text-[20px]">
																		{product.influencer_discount_value} %
																	</h4>
																</div>
															</div>
															{this.props.FlowStatus === "closed" ? (
																<div className="">
																	<div className="flex flex-wrap items-stretch">
																		<input
																			placeholder="Influencer.Code"
																			aria-label="Influencer.Code"
																			aria-describedby="basic-addon2"
																			className="border-[1px] flex-1 border--purple h-[40px] px-[1rem] focus-visible:outline-0 rounded-l-[8px]"
																			defaultValue={
																				product.influencer_discount_code
																			}
																		/>
																		<CopyToClipboard
																			text={product.influencer_discount_code}
																			onCopy={() => this.onCopyCode()}
																		>
																			<span
																				className="text-white h-[40px] border-[1px] border--purple bg--purple rounded-r-[8px] inline-flex items-center justify-center px-4"
																				id="basic-addon2"
																			>
																				Copy
																			</span>
																		</CopyToClipboard>
																	</div>
																</div>
															) : (
																""
															)}
														</div>
													</div>
												</div>
												{product.is_discount_for_follower === true ? (
													<>
														<div className="bg-[#0000001f] h-[1px] w-full my-4" />
														<div className="grid grid-cols-12 gap-5">
															<div className="sm:col-span-4 col-span-12">
																<div className="justify-center h-full flex">
																	<svg
																		xmlns="http://www.w3.org/2000/svg"
																		width="80"
																		height="80"
																		viewBox="0 0 24 24"
																		fill="none"
																		stroke="#7d2d94"
																		strokeWidth="1"
																		strokeLinecap="round"
																		strokeLinejoin="round"
																		className="feather feather-gift"
																	>
																		<polyline points="20 12 20 22 4 22 4 12"></polyline>
																		<rect
																			x="2"
																			y="7"
																			width="20"
																			height="5"
																		></rect>
																		<line x1="12" y1="22" x2="12" y2="7"></line>
																		<path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
																		<path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
																	</svg>
																</div>
															</div>
															<div className="sm:col-span-8 col-span-12">
																<div className="table w-full h-full">
																	<h4 className=" text-[18px]">
																		Special offer for your friends and followers
																	</h4>
																	<p className="mr-2">
																		They get {product.follower_discount_value}%
																		discount code when they purchase with the
																		promo code below
																	</p>
																	{this.props.FlowStatus === "closed" ? (
																		<div className="mt-4 flex flex-wrap items-stretch">
																			<input
																				placeholder="Influencer.Code"
																				aria-label="Influencer.Code"
																				aria-describedby="basic-addon2"
																				className="border-[1px] flex-1 border--purple h-[40px] px-[1rem] focus-visible:outline-0 rounded-l-[8px]"
																				defaultValue={
																					product.follower_discount_code
																				}
																			/>
																			<CopyToClipboard
																				text={product.follower_discount_code}
																				onCopy={() => this.onCopyCode()}
																			>
																				<span
																					className="text-white h-[40px] border-[1px] border--purple bg--purple rounded-r-[8px] inline-flex items-center justify-center px-4"
																					id="basic-addon2"
																				>
																					Copy
																				</span>
																			</CopyToClipboard>
																		</div>
																	) : (
																		""
																	)}
																</div>
															</div>
														</div>
													</>
												) : (
													""
												)}

												{product.is_affiliate_commission === true ? (
													<>
														<div className="bg-[#0000001f] h-[1px] w-full my-4" />
														<div className="grid grid-cols-12 gap-5">
															<div className="sm:col-span-4 col-span-12">
																<div className="justify-center h-full flex">
																	<svg
																		id="Capa_1"
																		enableBackground="new 0 0 512 512"
																		fill="#7d2d94"
																		height="80"
																		viewBox="0 0 512 512"
																		width="80"
																		xmlns="http://www.w3.org/2000/svg"
																	>
																		<g id="XMLID_367_">
																			<path
																				id="XMLID_392_"
																				d="m505.644 294.955c-11.382-18.096-34.402-24.568-53.542-15.06l-111.226 55.194h-17.938c1.993-5.188 3.086-10.819 3.086-16.7 0-25.751-20.95-46.701-46.7-46.701h-147.9l-131.424 79.98v159.341l162.18-59.162h153.371c28.563 0 55.945-8.778 79.185-25.383l100.105-75.829c17.679-12.781 22.433-37.191 10.803-55.68zm-28.434 31.406-100.082 75.81c-18.084 12.871-39.374 19.675-61.578 19.675h-158.671l-126.878 46.284v-99.6l109.834-66.842h139.489c9.208 0 16.7 7.492 16.7 16.7 0 9.209-7.491 16.7-16.7 16.7h-67.739v30.001h136.325l117.535-58.324c5.29-2.627 11.658-.841 14.805 4.164 3.227 5.13 1.892 11.909-3.04 15.432z"
																			/>
																			<path
																				id="XMLID_406_"
																				d="m251.384 249.292c68.457 0 124.151-55.694 124.151-124.151s-55.694-124.15-124.151-124.15-124.15 55.693-124.15 124.15 55.693 124.151 124.15 124.151zm94.15-124.151c0 46.73-34.224 85.611-78.922 92.912v-24.946c17.878-4.848 31.07-21.207 31.07-40.598 0-23.195-18.871-42.066-42.066-42.066h-11.278c-6.611 0-11.991-5.379-11.991-11.991s5.379-11.992 11.991-11.992h49.339v-30.001h-27.066v-24.23c44.699 7.301 78.923 46.182 78.923 92.912zm-108.923-92.987v25.03c-19.474 3.639-34.264 20.754-34.264 41.267 0 23.154 18.837 41.992 41.991 41.992h11.278c6.653 0 12.065 5.413 12.065 12.066s-5.412 12.065-12.065 12.065h-43.259v30.001h24.254v23.554c-44.921-7.11-79.377-46.098-79.377-92.988s34.456-85.878 79.377-92.987z"
																			/>
																		</g>
																	</svg>
																</div>
															</div>

															<div className="sm:col-span-8 col-span-12">
																<div className="table w-full h-full">
																	<h4 className=" text-[18px]">
																		Your reward for refering new customers
																	</h4>
																	<p className="mr-2">
																		You get {product.affiliate_commission_value}
																		% commission on total sales when someone
																		makes a purchase through your affilate link
																		or coupon code.
																	</p>
																	{this.props.FlowStatus === "closed" ? (
																		<div className="">
																			<div className="mb-4 flex flex-wrap items-stretch">
																				<input
																					placeholder="Influencer.Code"
																					aria-label="Influencer.Code"
																					aria-describedby="basic-addon2"
																					className="border-[1px] flex-1 border--purple h-[40px] px-[1rem] focus-visible:outline-0 rounded-l-[8px]"
																					defaultValue={
																						product.url
																							? process.env.REACT_APP_URL +
																							"/influencer/redirect/" +
																							encodeURIComponent(
																								product.url
																							) +
																							"?utm_source=Influencify&utm_medium=" +
																							campaign_name +
																							"&utm_campaign=" +
																							influencer_name
																							: ""
																					}
																				/>
																				<CopyToClipboard
																					text={
																						product.url
																							? process.env.REACT_APP_URL +
																							"/influencer/redirect/" +
																							encodeURIComponent(
																								product.url
																							) +
																							"?utm_source=Influencify&utm_medium=" +
																							campaign_name +
																							"&utm_campaign=" +
																							influencer_name
																							: ""
																					}
																					onCopy={() => this.onCopyCode()}
																				>
																					<span
																						className="text-white h-[40px] border-[1px] border--purple bg--purple rounded-r-[8px] inline-flex items-center justify-center px-4"
																						id="basic-addon2"
																					>
																						Copy
																					</span>
																				</CopyToClipboard>
																			</div>
																		</div>
																	) : (
																		""
																	)}
																</div>
															</div>
														</div>
													</>
												) : (
													""
												)}
											</>
										) : (
											""
										)}
									</div>
								))
							) : (
								<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
									We have nothing to show you here.
								</div>
							)}
						</div>
					</div> */}
				<div className=" mb-12">
					<div className="flex items-center justify-between">
						<h5 className="mb-2 text-[18px]">Use photos like this</h5>
						{this.props.lightBoxImages?.length > 0 && (
							<h5
								className="mb-2 text-right text-[18px] success cursor-pointer"
								onClick={() => this.handleOpenDownloadModal()}
							>
								Download
							</h5>
						)}
					</div>

					<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-12">
						{this.props.lightBoxImages?.length ? (
							<CarouselImagesComponent
								isLoading={this.props.isLoading}
								images={this.props.lightBoxImages}
							/>
						) : (
							<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
								We have nothing to show you here.
							</div>
						)}
					</div>
				</div>
				{/* </div> */}

				<Transition appear show={this.state.downalodModalOpen} as={Fragment}>
					<Dialog onClose={this.handleClose} className="relative z-[9999]">
						<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
						<div className="fixed inset-0 flex items-center justify-center p-4">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="mx-auto max-w-2xl w-full rounded-[8px] bg-white overflow-y-scroll h-[70%] overflow-x-hidden">
									<Dialog.Title className="text-center grow flex justify-between border-b border-[#dee2e6] p-3 sticky top-0 bg-white z-50">
										<h2 className="text-[23px]">Downloads</h2>
										<div
											className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
											onClick={this.handleClose}
										>
											<FiX size={24} className="text-white stroke-white" />
										</div>
									</Dialog.Title>
									<div className="p-3 overflow-y-auto">
										{this.props.lightBoxImages?.length &&
											this.props.lightBoxImages?.map((file, index) => (
												<div key={index}>
													<DownloadImage
														url={file.src}
														alt="Download"
														className="w-1/2 mx-auto my-4"
														addCancelToken={() => { }}
													/>
												</div>
											))}
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition>
				<Transition appear show={this.state.submitModal} as={Fragment}>
					<Dialog onClose={this.handleClose} className="relative z-[9999]">
						<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
						<div className="fixed inset-0 flex items-center justify-center p-4">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="mx-auto sm:min-w-[36rem] min-w-full rounded-[8px] bg-white">
									<Dialog.Title className="text-center grow flex justify-between border-b border-[#dee2e6] p-3">
										<h2 className="text-[23px]">Are you sure?</h2>
										<div
											className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
											onClick={this.handleClose}
										>
											<FiX size={24} className="text-white stroke-white" />
										</div>
									</Dialog.Title>
									<div className="p-3">
										<p className="mt-6">
											This will submit your quote for approval and will not be reverted
										</p>
										<div className="flex justify-end pt-2 border-t border-[#dee2e6] mt-4">
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mt-2"
												onClick={this.handleClose}
												text="Cancel"
											/>
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80 mt-2 ml-4"
												onClick={this.submitQuotePrice}
												disabled={quotePaymentIsProcessing}
												text={quotePaymentIsProcessing ? (
													<FaSpinner className="animate-[spin_2s_linear_infinite] mr-2" />
												) : "Submit"}
											/>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition>
				<Transition appear show={this.state.acceptModal} as={Fragment}>
					<Dialog onClose={this.handleClose} className="relative z-[9999]">
						<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
						<div className="fixed inset-0 flex items-center justify-center p-4">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="mx-auto sm:min-w-[36rem] min-w-full rounded-[8px] bg-white">
									<Dialog.Title className="text-center grow flex justify-between border-b border-[#dee2e6] p-3">
										<h2 className="text-[23px]">Are you sure?</h2>
										<div
											className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
											onClick={this.handleClose}
										>
											<FiX size={24} className="text-white stroke-white" />
										</div>
									</Dialog.Title>
									<div className="p-3">
										<p className="mt-6">
											This will accept your quote and will allow submit tasks
										</p>
										<div className="flex justify-end pt-2 border-t border-[#dee2e6] mt-4">
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mt-2"
												onClick={this.handleClose}
												text="Cancel"
											/>
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mt-2 ml-4"
												onClick={this.acceptQuotePrice}
												disabled={acceptQuotePriceLoading}
												text={acceptQuotePriceLoading ? (
													<FaSpinner className="animate-[spin_2s_linear_infinite] mr-2" />
												) : "Submit"}
											/>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition>
				<Transition appear show={this.state.rejectModal} as={Fragment}>
					<Dialog onClose={this.handleClose} className="relative z-[9999]">
						<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
						<div className="fixed inset-0 flex items-center justify-center p-4">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="mx-auto sm:min-w-[36rem] min-w-full rounded-[8px] bg-white">
									<Dialog.Title className="text-center grow flex justify-between border-b border-[#dee2e6] p-3">
										<h2 className="text-[24px]">Are you sure?</h2>
										<div
											className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
											onClick={this.handleClose}
										>
											<FiX size={24} className="text-white stroke-white" />
										</div>
									</Dialog.Title>
									<div className="p-3">
										<div className="mb-[1rem]">
											<label className="text-[14px] font-medium">
												Send message (optional)
											</label>
											<textarea
												rows="8"
												className="rounded-[8px] py-2 inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
												name="rejectOptionalMessage"
												value={this.props.rejectOptionalMessage}
												onChange={(event) =>
													this.props.handleRejectChange(event)
												}
											></textarea>
										</div>
										<div className="flex justify-end pt-2 border-t border-[#dee2e6] mt-4">
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mt-2"
												onClick={this.handleClose}
												text="Cancel"
											/>
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mt-2 ml-4"
												onClick={this.influencerBookingCampaignReject}
												text="Reject"
											/>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition>
				<Transition appear show={this.state.confirmModal} as={Fragment}>
					<Dialog onClose={this.handleClose} className="relative z-[9999]">
						<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
						<div className="fixed inset-0 flex items-center justify-center p-4">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="mx-auto sm:min-w-[36rem] min-w-full rounded-[8px] bg-white">
									<Dialog.Title className="text-center grow flex justify-between border-b border-[#dee2e6] p-3">
										<h2 className="text-[24px]">Are you sure?</h2>
										<div
											className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
											onClick={this.handleClose}
										>
											<FiX size={24} className="text-white stroke-white" />
										</div>
									</Dialog.Title>
									<div className="p-3">
										<p className="mt-6">
											This will accept proposal and you will be paid
										</p>
										<div className="flex justify-end pt-2 border-t border-[#dee2e6] mt-4">
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mt-2"
												onClick={this.handleClose}
												text="Cancel"
											/>
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mt-2 ml-4"
												onClick={this.confirmPayment}
												text={acceptQuotePriceLoading ? (
													<FaSpinner className="animate-[spin_2s_linear_infinite] mr-2" />
												) : "Submit"}
											/>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition>
			</>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		currentLoggedUser: state.HeaderReducer.currentLoggedUser,
		isLoading: state.InfluencersBookingIDReducer.isLoading,
		campaignCountry: state.InfluencersBookingIDReducer.campaignCountry,
		postingFrom: state.InfluencersBookingIDReducer.postingFrom,
		postingTo: state.InfluencersBookingIDReducer.postingTo,
		goalName: state.InfluencersBookingIDReducer.goalName,
		postWordingType: state.InfluencersBookingIDReducer.postWordingType,
		postWording: state.InfluencersBookingIDReducer.postWording,
		campaignTitle: state.InfluencersBookingIDReducer.campaignTitle,
		campaignInstruction: state.InfluencersBookingIDReducer.campaignInstruction,
		linkToShare: state.InfluencersBookingIDReducer.linkToShare,
		campaignPreview: state.InfluencersBookingIDReducer.campaignPreview,
		platformName: state.InfluencersBookingIDReducer.platformName,
		lightBoxImages: state.InfluencersBookingIDReducer.lightBoxImages,
		completeInDays: state.InfluencersBookingIDReducer.completeInDays,
		contentPostType: state.InfluencersBookingIDReducer.contentPostType,
		campaign_payment: state.InfluencersBookingIDReducer.campaignPayment,
		FlowStatus: state.InfluencersBookingIDReducer.FlowStatus,
		campaignType: state.InfluencersBookingIDReducer.campaignType,
		campaignInfluencer: state.InfluencersBookingIDReducer.campaignInfluencer,
		selectedProducts: state.InfluencersBookingIDReducer.selectedProducts,
		payment_processing: state.InfluencersBookingIDReducer.payment_processing,
		quotePaymentIsProcessing: state.InfluencersBookingIDReducer.quotePaymentIsProcessing,
		brandProducts: state.InfluencersBookingIDReducer.brandProducts,
		influencerProduct: state.InfluencersBookingIDReducer.influencerProduct,
		campaignTasks: state.InfluencersBookingIDReducer.campaignTasks,
		errors: state.InfluencersBookingIDReducer.quoteErrors,
		rejectOptionalMessage: state.InfluencersBookingIDReducer.rejectOptionalMessage,
		acceptQuotePriceLoading: state.influencerSearch.acceptQuotePriceLoading,
		isLoader: state.InfluencersBookingIDReducer.isLoader,

	};
};

const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/InfluencerSearchRedux");
	return {
		fileDownload: (query) =>
			dispatch(influencersBookingIDActions.fileDownload(query)),
		submitRequestQuotePayment: (data) => { return dispatch(influencersBookingIDActions.submitRequestQuotePayment(data)) },
		influencerBookingCampaignOverview: (data) =>
			dispatch(influencersBookingIDActions.influencerBookingCampaignOverview(data)),
		handleRejectChange: (event) =>
			dispatch({ type: HANDEL_REJECT_MESSAGE_OPTIONAL, payload: event }),
		handleInfluencerRejectRequest: (query) =>
			dispatch(
				influencersBookingIDActions.handleInfluencerRejectRequest(query)
			),
		acceptQuotePrice: (data) => {
			return actions.acceptBrandQuotePrice(dispatch, data);
		},
		confirmPayment: (data) => {
			return actions.confirmInfluencerPayment(dispatch, data);
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InfluencerBookingOverviewTab);
