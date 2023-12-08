import React from "react";
import Button from "@components/global/Button";
import { connect } from "react-redux";
import * as registerAction from "@store/actions/RegisterActions";
import * as settingPlatformActionCreator from "@store/actions/SettingPlatformActions";
import {
	HANDLE_CHANGE_SUCCESS,
	HANDLE_RESET_TOKEN_SUCCESS,
} from "@store/constants/action-types";
import Loader from "@components/global/Loader";
import zxcvbn from "zxcvbn";
// import SocialConnect from "@components/SocialConnect";
import Influencify from "../../constants/Influencify";
import moment from "moment";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
// import InfluencerLoginComponent from "@components/InfluencerLoginComponent";
import avatar from "@assets/avatar.png";
// import { FiArrowLeft } from "react-icons/fi";
// import Select from "react-select";
import DOMPurify from "dompurify";

const path = window.location.pathname;
const setInvite = path.split("/");
const capitalize = (s) => {
	if (typeof s !== "string") return "";
	let str = s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
	return str.replace(/_/g, " ");
};

class RegisterInvitedInfluencer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			campaign: {},
			product: {},
			products: [],
			selected_product: {},
			login: false,
			fee_type: "cash",
			post_fee: 0,
			story_fee: 0,
			termOfUse: false,
			privacypolicy: false,
		};
	}

	componentDidMount() {
		this.props.handleResetToken();
		this.props.handleGetPlatforms();
		this.fetchBookingCampaign();
	}

	fetchBookingCampaign = async () => {
		const data = {
			email: setInvite[4],
			id: setInvite[2],
		};
		const json = await Influencify.influencerBookingCampaignByEmail(data);
		if (json !== undefined) {
			if (json.data) {
				if (json.data.success) {
					this.setState({
						campaign: json.data.data,
						product: json.data.product,
						products: json.data.products,
					});
				}
			}
		}
	};

	_handleChange(event) {
		this.props.handleInputChange(event);
	}

	handleSubmitRegister = () => {
		if (this.props.selected_platform === "instagram") {
			if (this.props.selectedPage === "") {
				return;
			}
		}
		let query = {
			selected_platform: this.props.selected_platform,
			Page: this.props.selectedPage,
			youtube_connect_res: this.props.youtube_connect_res,
			tiktok_connect_res: this.props.tiktok_connect_res,
			displayName: this.props.displayName,
			email: setInvite[4],
			password: this.props.password,
			passwordStrength: zxcvbn(this.props.password).score,
			termOfUse: this.props.termOfUse,
			privacyPolicy: this.props.privacyPolicy,
			campaignId: setInvite[2],
			brandId: setInvite[3],
			fee_type: this.props.fee_type,
			product_value: this.props.product_value,
			story_fee: this.state.story_fee,
			post_fee: this.state.post_fee,
			product_id: this.state.selected_product?.id,
		};
		this.props.handleRegisterInvitedInfluencer(query);
	};

	createPasswordLabel = (result) => {
		switch (result.score) {
			case 0:
				return "Weak";
			case 1:
				return "Weak";
			case 2:
				return "Fair";
			case 3:
				return "Good";
			case 4:
				return "Strong";
			default:
				return "Weak";
		}
	};

	createPasswordLength = (result) => {
		switch (result.score) {
			case 0:
				return 0;
			case 1:
				return 25;
			case 2:
				return 50;
			case 3:
				return 75;
			case 4:
				return 100;
			default:
				return 0;
		}
	};

	createPasswordVariant = (result) => {
		switch (result.score) {
			case 0:
				return "#dc3545";
			case 1:
				return "#dc3545";
			case 2:
				return "#ffc107";
			case 3:
				return "#17a2b8";
			case 4:
				return "#28a745";
			default:
				return "#dc3545";
		}
	};

	onChangeProduct = (e) => {
		let images = [];
		if ((e.offer_images && e.offer_images.length) > 0) {
			for (let i = 0; i < e.offer_images.length; i++) {
				if (e.offer_images[i]) {
					images.push({ path: e.offer_images[i].path });
				}
			}
		}
		let { selected_product } = this.state;
		selected_product.name = e.label;
		selected_product.id = e.value;
		selected_product.value = e.price;
		selected_product.offer_images = images;
		this.setState({ selected_product });
	};

	createMarkup = (html) => {
		return {
			__html: DOMPurify.sanitize(html),
		};
	};

	render() {
		const {
			campaign,
			// product,
			login,
			// fee_type,
			// selected_product,
			// post_fee,
			// story_fee, 
			termOfUse,
			privacypolicy
		} = this.state;
		if (this.props.isLoading) {
			return <Loader />;
		}
		const givenPassword = zxcvbn(this.props.password);
		// const products = this.state.products.length
		// 	? this.state.products.map((data) => ({
		// 			label: data.name,
		// 			value: data.id,
		// 			price: data.value,
		// 			offer_images: data.offer_images,
		// 	  }))
		// 	: [];

		return (
			<div>
				{/* <div className="mt-12 text-center">
                    <h2>{!login?"Register Here":"Welcome Back"}</h2>
                </div> */}
				<div className="influencer-header">
					<div className="containers">
						{campaign && campaign.id && (
							<div className="grid grid-cols-12 gap-5">
								<div className="md:col-span-7 sm:col-span-6 col-span-12">
									<div className="table">
										<div className="table-cell pr-3">
											<img
												src={
													campaign.user.profile_pic
														? process.env.REACT_APP_AWS_URl +
														"/" +
														campaign.user.profile_pic
														: avatar
												}
												alt={campaign?.user?.name}
												className="rounded-full w-[102px]"
												onError={({ currentTarget }) => {
													currentTarget.onerror = null;
													currentTarget.src = avatar;
												}}
											/>
										</div>
										<div className="table-cell align-middle">
											<h3 className="text-[22px]">{campaign?.user?.name}</h3>
											<p className="mt-1 flex items-center text-[13px]">
												{(campaign?.platform?.name || "") === "instagram" && (
													<FaInstagram className="mr-2" />
												)}
												{(campaign?.platform?.name || "") === "tiktok" && (
													<FaTiktok className="mr-2" />
												)}
												{(campaign?.platform?.name || "") === "youtube" && (
													<FaYoutube className="mr-2" />
												)}
												{campaign.campaign_type === "quoteCampaign" &&
													"Request a Quote"}
												{campaign.campaign_type === "influencerCampaign" &&
													"Influencer Campaign"}
												{campaign.campaign_type === "contentCampaign" &&
													"Affiliate Campaign"}
											</p>

											<span className="text-[13px] text-[#9EA1B2]">
												{moment(campaign.campaign_date?.posting_from).format(
													"MMM Do, YYYY"
												)}{" "}
												-{" "}
												{moment(campaign.campaign_date?.posting_to).format(
													"MMM Do, YYYY"
												)}
											</span>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>

				<div className="page-content">
					<div className="containers mt-12 mb-12">
						<div className="grid grid-cols-12 gap-5 mt-6">
							{/* <div className="sm:col-span-6 col-span-12">
								{campaign && campaign.id && (
									<>
										<h6 className="text-[16px] py-[0.5rem]">Brief</h6>
										<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 rounded-[8px]">
											<div className="flex flex-col rounded-[8px]">
												<div className="flex justify-between py-[8px]">
													<h6 className="text-[20px]">{campaign.title}</h6>
												</div>
												<div className="flex justify-between py-[8px]">
													<p>
														{" "}
														{campaign.campaign_type === "quoteCampaign"
															? "Requesting a quote"
															: "Fixed Fee"}
													</p>
													{campaign.campaign_type === "quoteCampaign" ? (
														<p className="darkGray"></p>
													) : (
														<p className="font-medium">
															${campaign.pivot?.price}{" "}
															{campaign.pivot?.product_id !== "" &&
															campaign.pivot?.product_id !== null
																? "+ Product"
																: ""}
														</p>
													)}
												</div>

												{campaign.campaign_date && (
													<>
														<div className="bg-[#0000001f] h-[1px] w-full" />
														<div className="flex justify-between py-[8px]">
															<p>Timing</p>
															<p className="font-medium">
																{moment(
																	campaign.campaign_date?.posting_from
																).format("MMM Do, YYYY")}{" "}
																-{" "}
																{moment(
																	campaign.campaign_date?.posting_to
																).format("MMM Do, YYYY")}{" "}
															</p>
														</div>
													</>
												)}
												{campaign.link_to_share && (
													<>
														<div className="bg-[#0000001f] h-[1px] w-full" />
														<div className="flex justify-between py-[8px]">
															<p>Website</p>
															<p className="red font-medium">
																<b>
																	<a
																		target={"_blank"}
																		rel="noopener noreferrer"
																		href={`${campaign.link_to_share}`}
																	>
																		{campaign.link_to_share}
																	</a>
																</b>
															</p>
														</div>
													</>
												)}
												{campaign.pivot && (
													<>
														<div className="bg-[#0000001f] h-[1px] w-full" />
														<div className="flex justify-between py-[8px]">
															<p>Post type</p>
															<p
																className="font-medium"
																style={{
																	textTransform: "capitalize",
																}}
															>
																{campaign.platform?.name || ""}:{" "}
																{campaign.pivot?.no_of_story > 0
																	? " " +
																	  campaign.pivot?.no_of_story +
																	  " Stories "
																	: ""}{" "}
																{campaign.pivot?.no_of_post > 0 &&
																	campaign.pivot?.no_of_post > 0 &&
																	" + "}{" "}
																{campaign.pivot?.no_of_post > 0
																	? campaign.pivot?.no_of_post + " Posts"
																	: ""}
															</p>
														</div>
													</>
												)}
												<div className="bg-[#0000001f] h-[1px] w-full" />
												<div className="flex justify-between py-[8px]">
													<p>Wording</p>
													<p className="font-medium">
														{campaign.post_wording_type}
													</p>
												</div>
												<div className="bg-[#0000001f] h-[1px] w-full" />
												<div className="border-0 flex-col px-0">
													<p className="mb-1 font-medium">Instructions:</p>
													<div
														className="font-normal"
														dangerouslySetInnerHTML={{
															__html: campaign.instruction,
														}}
													></div>
												</div>
											</div>
										</div>
									</>
								)}
							</div> */}
							<div className="lg:col-span-6 col-span-12">
								<h5 className="mb-2 text-[18px]">Brief</h5>
								<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-12">
									<div className="flex flex-col divide-y divide-[#00000020]">
										<div className="flex justify-between px-[16px] py-[8px]">
											<p>
												{" "}
												{campaign.campaign_type === "quoteCampaign"
													? "Requesting a quote"
													: "Fixed Fee"}{" "}
											</p>
											<h4 className=" text-[20px]">
												{campaign.campaign_payment?.has_fixed_price && `${campaign.campaign_payment?.price} ${campaign.currency_code}`}
												{campaign.campaign_payment?.has_fixed_price && campaign.campaign_payment?.campaign_products?.length > 0 && " + "}
												{campaign.campaign_payment?.campaign_products && campaign.campaign_payment?.campaign_products?.length
													? "Voucher"
													: ""}
											</h4>
										</div>
										<div className="flex justify-between px-[16px] py-[8px]">
											<p>Timing</p>
											<strong className="font-medium">
												{campaign.campaign_date?.posting_from} - {campaign.campaign_date?.posting_to}
											</strong>
										</div>
										<div className="flex justify-between px-[16px] py-[8px]">
											<p>Post type</p>
											<strong className="font-medium">
												{capitalize(campaign.platform?.name)}
											</strong>
										</div>
										<div className="flex justify-between px-[16px] py-[8px]">
											<p>Wording</p>
											<strong className="font-medium">
												{campaign.post_wording_type}
											</strong>
										</div>
										<div className="flex justify-between px-[16px] py-[8px]">
											<p>Sample Wording</p>
											<div
												dangerouslySetInnerHTML={this.createMarkup(
													campaign.post_wording_type
												)}
											></div>
										</div>
										<div className="flex justify-between px-[16px] py-[8px]">
											<p className="mr-4 sm:mr-12">Instructions</p>
											<div>
												<div
													dangerouslySetInnerHTML={this.createMarkup(
														campaign.instruction
													)}
												></div>
											</div>
										</div>
										<div className="flex justify-between px-[16px] py-[8px]">
											<p className="w-28">Links to share</p>
											<a
												className="break-words success font-normal text-[16px]"
												target={"_blank"}
												rel="noreferrer noopener"
												href={`${campaign.link_to_share
													}?utm_source=Influencify&utm_medium=${(
														campaign.title || ""
													).replace(/\s/g, "+")}`}
											>
												{campaign.link_to_share}
											</a>
										</div>
										<div className="flex justify-between px-[16px] py-[8px]"></div>
									</div>
								</div>
							</div>
							{/* {product && product.id && (
								<div className="sm:col-span-6 col-span-12">
									<h6 className="text-[16px] py-[0.5rem]">Products</h6>
									<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 rounded-[8px]">
										<div className="grid grid-cols-12 gap-5">
											<div className="sm:col-span-3 col-span-12">
												<div className="justify-center h-full flex">
													{product.offer_type === "product" && product.url ? (
														<a
															href={product.url}
															target="_blank"
															rel="noopener noreferrer"
														>
															<img
																src={
																	product.offer_images.length > 0
																		? product.offer_images[0].path
																		: avatar
																}
																alt={product?.name}
																className="rounded-[8px] w-[92px]"
																onError={({ currentTarget }) => {
																	currentTarget.onerror = null;
																	currentTarget.src = avatar;
																}}
															/>
														</a>
													) : (
														<img
															src={
																product.offer_images.length > 0
																	? product.offer_images[0].path
																	: avatar
															}
															alt={product?.name}
															className="rounded-[8px] w-[92px]"
															onError={({ currentTarget }) => {
																currentTarget.onerror = null;
																currentTarget.src = avatar;
															}}
														/>
													)}
												</div>
											</div>
											<div className="sm:col-span-9 col-span-12">
												<h4 className="font-medium text-[16px]">
													{product.offer_type === "product" && product.url ? (
														<a
															href={product.url}
															target="_blank"
															rel="noopener noreferrer"
														>
															{product?.name}
														</a>
													) : (
														product?.name
													)}
												</h4>
												<div className="flex items-center gap-x-1 mt-2">
													<p className="text-[14px] darkGray">
														{product.offer_type === "product"
															? "Price:"
															: "Discount Value:"}
													</p>
													<p className="font-medium">
														{product.offer_type !== "product"
															? product.influencer_discount_value
															: product.value}
														{product.offer_type !== "product" ? "%" : "USD"}
													</p>
												</div>
											</div>
										</div>

										{product.offer_type === "voucher" &&
											product.is_discount_for_follower === 1 && (
												<>
													<div className="bg-[#0000001f] h-[1px] w-full my-4" />
													<div className="grid grid-cols-12 gap-5">
														<div className="sm:col-span-3 col-span-12">
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
														<div className="sm:col-span-9 col-span-12">
															<div className="table w-full h-full">
																<h4 className=" text-[18px]">
																	Special offer for your friends and followers
																</h4>
																<p className="mr-2">
																	They get{" "}
																	<span className="font-medium">
																		{product.follower_discount_value}%
																	</span>{" "}
																	discount code when they purchase with the
																	promo code
																</p>
															</div>
														</div>
													</div>
												</>
											)}
										{product.offer_type === "voucher" &&
											product.is_affiliate_commission === 1 && (
												<>
													<div className="bg-[#0000001f] h-[1px] w-full my-4" />
													<div className="grid grid-cols-12 gap-5">
														<div className="sm:col-span-3 col-span-12">
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

														<div className="sm:col-span-9 col-span-12">
															<div className="table w-full h-full">
																<h4 className=" text-[18px]">
																	Your reward for refering new customers
																</h4>
																<p className="mr-2">
																	You get{" "}
																	<span className="font-medium">
																		{product.affiliate_commission_value}%
																	</span>{" "}
																	commission on total sales when someone makes a
																	purchase through your affilate link or coupon
																	code.
																</p>
															</div>
														</div>
													</div>
												</>
											)}
									</div>
								</div>
							)} */}
							{campaign.campaign_type === "quoteCampaign" && (
								<div className="lg:col-span-6 col-span-12">
									<h5 className="mb-2 text-[18px]">
										How would you like to be compensated?
									</h5>
									<div className="shadow-[0px_4px_5px_#96969640] text-[16px] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-12">
										{campaign.campaign_payment?.has_fixed_price &&
											<div className="grid grid-cols-12 gap-5">
												<div className={`col-span-12 ${campaign.campaign_payment?.is_influencer_propose && 'lg:col-span-6'} space-y-3`}>
													<p>Quoted Price</p>
													<input
														type="text"
														value={campaign.campaign_payment?.price}
														className="rounded-[8px] border border-black pink !text-[12px] !font-normal dark-placeholder px-[1rem] h-11 outline-0 w-full"
														disabled
													/>
												</div>
											</div>
										}
										{campaign.products && campaign.products.length > 0 &&
											<div className="space-y-6 mt-5">
												<p>Gift Products</p>
												{campaign.products.map((product, index) => (
													<>
														<div className="grid grid-cols-12 gap-5">
															<div className="col-span-2">
																<a
																	href={product.url}
																	target="_blank"
																	rel="noopener noreferrer"
																>
																	<img
																		src={
																			product.images.length
																				? product.images[0]
																				: avatar
																		}
																		alt={product.label}
																		className="w-[70px] rounded-md"
																	/>
																</a>
															</div>
															<div className="col-span-7 pt-2">
																<h6>{product.label}</h6>
															</div>
															<div className="col-span-2 pt-2">
																<h6>
																	{product.price}{" "}
																	{campaign.currency_code}
																</h6>
															</div>
														</div>
													</>
												))}
											</div>
										}
										<div className="mt-6">
											<div className="bg-[#fff3cd] border-[1px] border-[#ffecb5] text-[#664d03] p-[.75rem_1.25rem] rounded-[8px] mb-[1rem]">
												Influencify doesn't handle payment on behalf of the
												client, we will only notify them of your quote and
												you should agree with them on how you will be
												compensated
											</div>
										</div>
									</div>
								</div>
							)}
							<div className="lg:col-span-6 col-span-12">
								<h6 className="text-[16px] py-[0.5rem]">
									{"Your Info"}
								</h6>
								<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 rounded-[8px]">
									{this.props.sentVerifyEmail ? (
										<div className="bg-[#d4edda] border-[1px] border-[#c3e6cb] text-[#155724] p-[.75rem_1.25rem] rounded-[8px] mb-[1rem]">
											<p className="text-white">
												Your account has been made, <br /> Please verify it by
												clicking the verification link that has been send to
												your email.
											</p>
										</div>
									) : (
										""
									)}
									{!login ? (
										<form>
											<div className="mb-[1rem]">
												<input
													type="text"
													name="displayName"
													className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
													value={this.props.displayName || ""}
													onChange={(e) => this._handleChange(e)}
													placeholder="Display Name"
													autoComplete="off"
												/>
												{this.props.errorsObj?.displayName ? (
													<span className="red">
														{this.props.errorsObj.displayName[0]}
													</span>
												) : (
													""
												)}
											</div>
											<div className="mb-[1rem]">
												<input
													type="email"
													name="email"
													className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
													disabled
													value={setInvite[4] || ""}
													onChange={(e) => this._handleChange(e)}
													placeholder="Email"
													autoComplete="off"
												/>
												{this.props.errorsObj?.email ? (
													<span className="red">
														{this.props.errorsObj.email[0]}
													</span>
												) : (
													""
												)}
											</div>

											<div className="mb-[1rem]">
												<input
													type="password"
													name="password"
													className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
													value={this.props.password || ""}
													onChange={(e) => this._handleChange(e)}
													placeholder="Password"
													autoComplete="off"
												/>
												{this.props.errorsObj?.password ? (
													<span className="red">
														{this.props.errorsObj.password[0]}
													</span>
												) : (
													""
												)}
											</div>
											<div className="mb-[1rem]">
												{/* <ProgressBar
													style={{ height: 20 }}
													now={givenPassword.score}
													max={4}
													variant={`${this.createPasswordVariant(
														givenPassword
													)}`}
													label={`${this.createPasswordLabel(givenPassword)}`}
												/> */}
												<div className="bg-[#e9ecef] h-[20px] rounded-[8px] overflow-hidden leading-[0px]">
													<div
														className={`flex flex-col justify-center overflow-hidden text-white text-center whitespace-nowrap transition-all duration-[600ms] h-full text-[0.75rem]`}
														style={{
															backgroundColor:
																this.createPasswordVariant(givenPassword),
															width: `${this.createPasswordLength(
																givenPassword
															)}%`,
														}}
													>
														{this.createPasswordLabel(givenPassword)}
													</div>
												</div>
											</div>
											<div className="mb-0">
												<label
													htmlFor="termOfUse"
													className="cursor-pointer flex items-center text-[15px] font-normal"
												>
													<input
														id="termOfUse"
														type="checkbox"
														checked={termOfUse}
														name="termOfUse"
														onChange={(event) =>
															this.setState({
																termOfUse: !termOfUse,
															})
														}
														className="hidden peer"
													/>
													<span className="mr-3 peer-checked:bg-[#7c3292] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292] rounded-sm"></span>
													{`I accept Terms of Policy`}
												</label>
												{this.props.errorsObj?.termOfUse ? (
													<span className="red">
														{this.props.errorsObj.termOfUse[0]}
													</span>
												) : (
													""
												)}
											</div>
											<div className="mb-0">
												<label
													htmlFor="privacypolicy"
													className="cursor-pointer flex items-center text-[15px] font-normal"
												>
													<input
														id="privacypolicy"
														type="checkbox"
														checked={privacypolicy}
														name="privacypolicy"
														onChange={(event) =>
															this.setState({
																privacypolicy: !privacypolicy,
															})
														}
														className="hidden peer"
													/>
													<span className="mr-3 peer-checked:bg-[#7c3292] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292] rounded-sm"></span>
													{`I accept Privacy Policy`}
												</label>
												{this.props.errorsObj?.privacypolicy ? (
													<span className="red">
														{this.props.errorsObj.privacypolicy[0]}
													</span>
												) : (
													""
												)}
											</div>
											<div className="mb-0 mt-2">
												<Button
													disabled={!termOfUse || !privacypolicy}
													className="w-full rounded-[8px] px-12 bg--purple text-center h-[40px] hover:opacity-80 text-white justify-center inline-flex items-center disabled:opacity-80"
													type="button"
													onClick={() => this.handleSubmitRegister()}
													text="Register"
												/>
											</div>
										</form>
									) : (
										<>
											{/* <InfluencerLoginComponent />
											<p
												className="mt-2 block text-[15px] text-center"
												onClick={() =>
													this.setState({
														login: !login,
													})
												}
											>
												<FiArrowLeft className="mr-2" />
												Back to register
											</p> */}
										</>
									)}
								</div>
							</div>
							{/* {!login && (
								<div className="sm:col-span-6 col-span-12">
									<h6 className="text-[16px] py-[0.5rem]">
										Your Social Network
									</h6>
									<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 rounded-[8px]">
										<form>
											<SocialConnect
												platform_name={campaign?.platform?.name || ""}
											/>

											<div className="mt-2">
												<label
													htmlFor="privacypolicy"
													className="cursor-pointer flex items-center text-[15px] font-normal"
												>
													<input
														id="privacypolicy"
														type="checkbox"
														checked={this.props.termOfUse}
														name="termOfUse"
														onChange={(event) => this._handleChange(event)}
														className="hidden peer"
													/>
													<span className="mr-3 peer-checked:bg-[#7c3292] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292] rounded-sm"></span>
													I agree to Influencify Terms of Service
												</label>
												{this.props.errorsObj.termOfUse ? (
													<span className="red">
														{this.props.errorsObj.termOfUse[0]}
													</span>
												) : (
													""
												)}
											</div>
											<div className="mb-[1rem]">
												<label
													htmlFor="privacypolicy"
													className="cursor-pointer flex items-center text-[15px] font-normal"
												>
													<input
														id="privacypolicy"
														type="checkbox"
														checked={this.props.privacyPolicy}
														name="privacyPolicy"
														onChange={(event) => this._handleChange(event)}
														className="hidden peer"
													/>
													<span className="mr-3 peer-checked:bg-[#7c3292] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292] rounded-sm"></span>
													I agree to Influencify Privacy Policy
												</label>
												{this.props.errorsObj.privacyPolicy ? (
													<span className="red">
														{this.props.errorsObj.privacyPolicy[0]}
													</span>
												) : (
													""
												)}
											</div>
											{this.props.errorsObj.error_info ? (
												<span className="red">
													{this.props.errorsObj.error_info[0]}
												</span>
											) : (
												""
											)}
											<div className="mb-0">
												<Button
													disabled={
														this.props.selected_platform === "" ? true : false
													}
													className="w-full"
													type="button"
													onClick={() => this.handleSubmitRegister()}
													text="Register"
												/>
											</div>
										</form>
									</div>
								</div>
							)} */}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoading: state.RegisterReducer.isLoading,
		errorsObj: state.RegisterReducer.errorsObj,
		sentVerifyEmail: state.RegisterReducer.sentVerifyEmail,
		displayName: state.RegisterReducer.displayName,
		email: state.RegisterReducer.email,
		password: state.RegisterReducer.password,
		termOfUse: state.RegisterReducer.termOfUse,
		privacyPolicy: state.RegisterReducer.privacyPolicy,
		fee_type: state.RegisterReducer.fee_type,
		product_value: state.RegisterReducer.product_value,
		story_fee: state.RegisterReducer.story_fee,
		post_fee: state.RegisterReducer.post_fee,
		selected_platform: state.SettingPlatformReducer.selected_platform,
		youtube_connect_res: state.SettingPlatformReducer.youtube_connect_res,
		tiktok_connect_res: state.SettingPlatformReducer.tiktok_connect_res,
		selectedPage: state.SettingPlatformReducer.selectedPage,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleInputChange: (event) =>
			dispatch({ type: HANDLE_CHANGE_SUCCESS, payload: event }),
		handleResetToken: () => dispatch({ type: HANDLE_RESET_TOKEN_SUCCESS }),
		handleRegisterInvitedInfluencer: (query) =>
			dispatch(registerAction.handleRegisterInvitedInfluencer(query)),
		handleGetPlatforms: () =>
			dispatch(settingPlatformActionCreator.handleGetPlatforms()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RegisterInvitedInfluencer);
