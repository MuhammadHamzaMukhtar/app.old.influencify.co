import { Component } from "react";
import Button from "@components/global/Button";
import avatar from "@assets/avatar.png";
import { connect } from "react-redux";
import * as influencersBookingIDActions from "@store/actions/InfluencersBookingIDActions";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Loader from "@components/global/Loader";

class InfluencerBookingPaymentTab extends Component {
	switchFastPayment = (id) => {
		let query = {
			campaignId: this.props.campaignID,
			payoutId: id,
		};
		this.props.fastPaymentSwitch(query);
	};

	onCopyCode = () => {
		toast.success("Copied to clipboard");
	};

	render() {
		const { is_appsumo } = this.props;
		if (this.props.isLoading) {
			return (
				<Loader
					className="h-[46vh] w-full flex justify-center items-center"
					size="67"
				/>
			);
		}

		var campaign_name = this.props.campaignTitle;
		var influencer_name = this.props.currentLoggedUser.name;

		return (
			<div className="grid grid-cols-12 gap-5 mb-12">
				<div className="lg:col-span-6 col-span-12">
					<h5 className="mb-2 text-[18px]">Cash</h5>
					{is_appsumo === 1 && (
						<div className="alert">
							<div className="alert alert-warning">
								Influencify doesn't handle payment on behalf of the client, use
								the messaging section to agree with them on how you will be
								compensated
							</div>
						</div>
					)}
					<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-12">
						<div className="flex flex-col">
							<div className="flex justify-between px-[16px] py-[8px]">
								<p>Fixed Fee</p>
								<h4 className=" text-[20px]">
									{this.props.fixedFee}{" "}
									{this.props.currentLoggedUser.currency_code}{" "}
									{this.props.products && (this.props.products || []).length
										? "+ Product"
										: ""}
								</h4>
							</div>
						</div>
						<div className="grid grid-cols-12 gap-5 p-3">
							<div className="sm:col-span-3 col-span-12">
								<b className="">Payout</b>
							</div>
							<div className="sm:col-span-3 col-span-12 text-center">
								<span>Payment method</span>
							</div>
							<div className="sm:col-span-3 col-span-12 text-center">
								<span>Money arrives</span>
							</div>
							<div className="sm:col-span-3 col-span-12 text-center">
								<span>Charge</span>
							</div>
						</div>
						<div className="bg-[#0000001f] h-[1px] w-full" />
						<div className="grid grid-cols-12 gap-5 pt-3">
							<div className="sm:col-span-3 col-span-12"></div>
							<div className="sm:col-span-3 col-span-12 text-center">
								<div className="my-5 space-x-4  flex justify-center">
									<label
										htmlFor="gender1"
										className="flex items-center cursor-pointer relative text-black text-[14px]"
									>
										<input
											id="gender1"
											type="radio"
											checked={
												this.props.campaignPayout.payment_method ===
													"BankAccount"
													? true
													: false
											}
											value="BankAccount"
											className="absolute opacity-0 z-[0] peer"
										/>
										<span className="peer-checked:bg-[#7c3292] shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
										Bank account
									</label>
								</div>
							</div>
							<div className="sm:col-span-3 col-span-12 text-center">
								<h6 className=" text-[16px]">
									in {this.props.campaignPayout.money_arrives} days
								</h6>
							</div>
							<div className="sm:col-span-3 col-span-12 text-center">
								<h6 className=" text-[16px]">
									{this.props.campaignPayout.charge}%
								</h6>
							</div>
						</div>
						<div className="grid grid-cols-12 gap-5 p-3">
							<div className="sm:col-span-4 col-span-12"></div>
							<div className="sm:col-span-8 col-span-12 text-right">
								<div className="bg-[#0000001f] h-[1px] w-full" />
								<p>
									The paid amount could differ from the agreed amount due to
									foreign currency exchange rates
								</p>
								{this.props.campaignPayout.is_fast_payment === 0 ? (
									<Button
										className="mt-6 px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
										onClick={() =>
											this.switchFastPayment(this.props.campaignPayout.id)
										}
										text="Switch to Fast payment"
									/>
								) : (
									""
								)}
							</div>
						</div>
					</div>
				</div>
				<div className="lg:col-span-6 col-span-12">
					<h5 className="mb-2 text-[18px]">Products</h5>
					<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3">
						{(this.props.products || []).length ? (
							(this.props.products || []).map((product, index) => (
								<div key={index}>
									{product.offer_type === "Product" ? (
										<div className="grid grid-cols-12 gap-5">
											<div className="sm:col-span-4 col-span-12">
												<a
													href={product.url}
													target="_blank"
													rel="noreferrer noopener"
												>
													<img
														src={
															product.images.length ? product.images[0] : avatar
														}
														alt={product.name}
														className="w-[100px] rounded-[8px]"
													/>
												</a>
											</div>
											<div className="sm:col-span-8 col-span-12">
												<div className="table w-full h-full">
													<h4 className=" text-[20px]">{product.name}</h4>
													<h4 className="table-cell align-bottom text-right text-[20px]">
														{product.value}
													</h4>
												</div>
											</div>
										</div>
									) : (
										""
									)}
									{product.offer_type === "Voucher" &&
										product.voucher_type === "mandatory" ? (
										<>
											<div className="grid grid-cols-12 gap-5 pt-4">
												<div className="sm:col-span-4 col-span-12">
													{product.url ? (
														<a
															href={
																product.url +
																"?utm_source=Influencify&utm_font-medium=" +
																campaign_name +
																"&utm_campaign=" +
																influencer_name
															}
															target="_blank"
															rel="noreferrer noopener"
														>
															<img
																src={
																	product.images.length
																		? product.images[0]
																		: avatar
																}
																alt={product.name}
																rounded
																width={90}
																className="ml-5"
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
															rounded
															width={90}
															className="ml-5"
														/>
													)}
												</div>
												<div className="sm:col-span-8 col-span-12">
													<div className="table w-full h-full">
														{product.url ? (
															<a
																href={
																	product.url +
																	"?utm_source=Influencify&utm_font-medium=" +
																	campaign_name +
																	"&utm_campaign=" +
																	influencer_name
																}
																target="_blank"
																rel="noreferrer noopener"
															>
																<h4 className=" text-[20px]">{product.name}</h4>
															</a>
														) : (
															<h4 className=" text-[20px]">{product.name}</h4>
														)}
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
															<div className="mt-4">
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
																	You get {product.affiliate_commission_value}%
																	commission on total sales when someone makes a
																	purchase through your affilate link or coupon
																	code.
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
																						"?utm_source=Influencify&utm_font-medium=" +
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
																						"?utm_source=Influencify&utm_font-medium=" +
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
																"?utm_source=Influencify&utm_font-medium=" +
																campaign_name +
																"&utm_campaign=" +
																influencer_name
															}
															target="_blank"
															rel="noreferrer noopener"
														>
															<img
																src={
																	product.images.length
																		? product.images[0]
																		: avatar
																}
																alt={product.name}
																rounded
																width={90}
																className="ml-5"
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
															rounded
															width={90}
															className="ml-5"
														/>
													)}
												</div>
												<div className="sm:col-span-8 col-span-12">
													<div className="table w-full h-full">
														{product.url ? (
															<a
																href={
																	product.url +
																	"?utm_source=Influencify&utm_font-medium=" +
																	campaign_name +
																	"&utm_campaign=" +
																	influencer_name
																}
																target="_blank"
																rel="noreferrer noopener"
															>
																<h4 className=" text-[20px]">{product.name}</h4>
															</a>
														) : (
															<h4 className=" text-[20px]">{product.name}</h4>
														)}
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
																	You get {product.affiliate_commission_value}%
																	commission on total sales when someone makes a
																	purchase through your affilate link or coupon
																	code.
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
																						? product.url +
																						"?utm_source=Influencify&utm_font-medium=" +
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
																						"?utm_source=Influencify&utm_font-medium=" +
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
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currentLoggedUser: state.HeaderReducer.currentLoggedUser,
		isLoading: state.InfluencersBookingIDReducer.isLoading,
		campaignTitle: state.InfluencersBookingIDReducer.campaignTitle,
		campaignPayout: state.InfluencersBookingIDReducer.campaignPayout,
		products: state.InfluencersBookingIDReducer.products,
		fixedFee: state.InfluencersBookingIDReducer.fixedFee,
		FlowStatus: state.InfluencersBookingIDReducer.FlowStatus,
		is_appsumo: state.InfluencersBookingIDReducer.is_appsumo,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		fastPaymentSwitch: (query) =>
			dispatch(influencersBookingIDActions.fastPaymentSwitch(query)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InfluencerBookingPaymentTab);
