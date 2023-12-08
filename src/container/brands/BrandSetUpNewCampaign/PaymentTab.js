import { Component } from "react";
import { FormControl, InputGroup, Nav, Tab, Form } from "react-bootstrap";
import Tooltip from "@components/global/Tooltip";
import { BsQuestionCircle } from "react-icons/bs";
import avatar from "@assets/avatar.png";
import Select from "react-select";
import { FaPlus } from "react-icons/fa";
import { connect } from "react-redux";
import {
	BUDGET_SERVICE_FEE_CHANGE,
	HANDLE_PAY_PER_CLICK,
	HANDLE_PRICE_PER_INFLUENCER,
	HANDLE_PRODUCT_PER_INFLUENCER,
	HANDLE_SELECT_INFLUENCER_PAYMENT_TYPE_SUCCESS,
	HANDLE_SELECT_CONTENT_PAYMENT_TYPE_SUCCESS,
	HANDLE_PRICE_PER_CONTENT_SUCCESS,
	HANDLE_FOLLOWER_RANGE_SUCCESS,
	HANDLE_SELECT_RANGE_PRODUCT_SUCCESS,
	HANDLE_SELECT_PRODUCT_CHANGE_SUCCESS,
	HANDLE_SELECT_PRICING_PER_CONTENT_TYPE_SUCCESS,
	HANDLE_FILL_SUGGESTED_FEE,
	HANDLE_SUGGESTED_FEE_FLAG,
} from "@store/constants/action-types";
import LinkTo from "@components/global/LinkTo";
import { MdPeopleAlt, MdTouchApp } from "react-icons/md";

const FormatedNumber = ({ num }) => {
	if (num >= 1000000000) {
		return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
	}
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
	}
	return num;
};

class PaymentTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			contentCampaignDefaultKey: "pricingPerContent",
			influencerCampaignDefaultKey: "pricingByFollowerRange",
			contentType: "",
			influencerBudget: 0,
			influencerServiceFee: 0,
			influencerSpendable: 0,
		};
	}

	componentDidMount() {
		this.props.handleSelectContentPaymentType(this.props.paymentType);
		this.props.handleSelectInfluencerPaymentType(this.props.paymentType);
	}

	onServiceFeeChange = (event) => {
		let budget = 0;
		let serviceFee = 0;
		let handlingFee = 0;
		let spendable = 0;
		let campaignCommission = this.props.campaignCommisonFee;
		budget = parseInt(event.target.value);
		if (budget > 0) {
			serviceFee = (budget * campaignCommission) / 100;
		}
		if (budget > 0) {
			handlingFee = (budget + 0.3) / (1 - 0.029) - budget;
		}
		let totalFee = serviceFee + handlingFee;
		spendable = budget - totalFee;
		let query = {
			budget: budget,
			serviceFee: serviceFee,
			spendable: spendable,
			handlingFee: handlingFee,
		};
		this.props.handleServiceFeeChange(query);
	};

	handleChange = (e) => {};

	onChange = (event) => {
		this.props.onChange(event.target.name, event.target.value);
	};

	onChangeContentType = (e) => {
		this.setState({
			contentType: e.target.value,
		});
		this.props.handleSelectPricingPerContentType(e.target.value);
	};

	pricePerInfluencerChange = (e, id) => {
		this.props.handleSuggestedFeeFlag(false);
		const value = e.target.value;
		let handlingFee = 0;
		let serviceFee = 0;
		let totalSpendable = 0;
		let budget = 0;
		let updateInfluencersArray = this.props.selectedInfluencers.map((el) =>
			el.id === id ? { ...el, price: value } : el
		);
		for (var i = 0; i < updateInfluencersArray.length; i++) {
			let price = parseInt(updateInfluencersArray[i].price);
			if (price > 0) {
				totalSpendable += parseInt(updateInfluencersArray[i].price);
			}
		}
		const campaignCommission = this.props.campaignCommisonFee;
		if (totalSpendable > 0) {
			handlingFee = (totalSpendable + 0.3) / (1 - 0.029) - totalSpendable;
		}
		if (totalSpendable > 0) {
			serviceFee = (totalSpendable * campaignCommission) / 100;
		}
		if (totalSpendable > 0) {
			budget = totalSpendable + serviceFee + handlingFee;
		}
		this.props.onChangePricePerInfluencer(e, id);
		let query = {
			budget: budget,
			serviceFee: serviceFee,
			spendable: totalSpendable,
			handlingFee: handlingFee,
		};
		this.props.handleServiceFeeChange(query);
	};

	setInfluencerKey = (key) => {
		this.setState({
			contentCampaignDefaultKey: key,
		});
		this.props.handleSelectInfluencerPaymentType(key);
	};
	setContentKey = (key) => {
		this.setState({
			influencerCampaignDefaultKey: key,
		});
		this.props.handleSelectContentPaymentType(key);
	};

	handleFollowerRangeChange = (key, value) => {
		this.props.handleChangeFollowerRange(key, value);
	};

	fillSuggestedFee = () => {
		this.props.handleSuggestedFeeFlag(true);
		let handlingFee = 0;
		let serviceFee = 0;
		let totalSpendable = 0;
		let budget = 0;
		for (var i = 0; i < this.props.selectedInfluencers.length; i++) {
			totalSpendable += parseFloat(
				this.props.selectedInfluencers[i].suggestedFee.replace(/,/g, "")
			);
		}
		const campaignCommission = this.props.campaignCommisonFee;
		if (totalSpendable > 0) {
			handlingFee = (totalSpendable + 0.3) / (1 - 0.029) - totalSpendable;
		}
		if (totalSpendable > 0) {
			serviceFee = (totalSpendable * campaignCommission) / 100;
		}
		if (totalSpendable > 0) {
			budget = totalSpendable + serviceFee + handlingFee;
		}
		for (var j = 0; j < this.props.selectedInfluencers.length; j++) {
			this.props.onFillInfluencerSuggestedFee(
				parseFloat(
					this.props.selectedInfluencers[j].suggestedFee.replace(/,/g, "")
				),
				this.props.selectedInfluencers[j].id
			);
		}

		let query = {
			budget: budget,
			serviceFee: serviceFee,
			spendable: totalSpendable,
			handlingFee: handlingFee,
		};
		this.props.handleServiceFeeChange(query);
	};

	render() {
		const products = this.props.products.length
			? this.props.products.map((data) => ({
					label: data.name,
					value: data.id,
			  }))
			: [];
		let activeKey = "pricingPerInfluencer";
		if (this.props.typeName === "PUBLIC") {
			activeKey = "pricingByFollowerRange";
		}
		if (this.props.typeName === "DIRECT") {
			activeKey = "pricingPerInfluencer";
		}
		return (
			<div className="Payment-Tab">
				<div className="mb-12 Post-type">
					{this.props.campaignType === "influencerCampaign" ? (
						<Tab.Container
							defaultActiveKey={activeKey}
							onSelect={(k) => this.setInfluencerKey(k)}
						>
							<div className="grid grid-cols-12 gap-5">
								<div className="md:col-span-3 sm:col-span-4 col-span-12">
									<Nav variant="pills" className="flex-row">
										<div className="grid grid-cols-12 gap-5 w-full">
											<div className="col-span-12">
												<Nav.Item>
													<Nav.Link
														disabled={
															this.props.typeName === "DIRECT" &&
															this.props.campaignStatus === "active"
														}
														eventKey="pricingByFollowerRange"
													>
														<MdPeopleAlt className="mr-4" />
														Pricing by Follower Range
													</Nav.Link>
												</Nav.Item>
											</div>
											{this.props.selectedInfluencers.length ? (
												<div className="col-span-12">
													<Nav.Item>
														<Nav.Link
															disabled={
																this.props.typeName === "PUBLIC" &&
																this.props.campaignStatus === "active"
															}
															eventKey="pricingPerInfluencer"
														>
															<MdTouchApp className="mr-4" />
															Pricing per Influencer
														</Nav.Link>
													</Nav.Item>
												</div>
											) : (
												""
											)}
										</div>
									</Nav>
								</div>
								<div className="md:col-span-9 sm:col-span-4 col-span-12">
									<Tab.Content className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] ml-0 p-3 sm:!p-12 w-full">
										<Tab.Pane eventKey="pricingByFollowerRange">
											<div className="grid grid-cols-12 gap-5">
												<div className="md:col-span-6 col-span-12">
													<h3 className="mb-4">Budget</h3>
													<InputGroup size="lg">
														<FormControl
															aria-label="Large"
															className="text-right"
															placeholder="0"
															name="budget"
															aria-describedby="inputGroup-sizing-sm"
															onChange={(e) => this.onServiceFeeChange(e)}
															value={this.props.campaignBudget || 0}
														/>
														<InputGroup.Prepend>
															<InputGroup.Text id="inputGroup-sizing-lg">
																{this.props.currency_code
																	? this.props.currency_code
																	: this.props.currentLoggedUser.currency_code}
															</InputGroup.Text>
														</InputGroup.Prepend>
													</InputGroup>
													{this.props.budgetError ? (
														<span className="red">
															{this.props.budgetError}
														</span>
													) : (
														""
													)}
													<div className="flex flex-col">
														<div className="flex justify-between px-[16px] py-[8px]">
															<p>
																Service fee
																<Tooltip
																	trigger={
																		<div className="ml-2">
																			<BsQuestionCircle
																				className="dark"
																				size={20}
																			/>
																		</div>
																	}
																	tooltipText="This helps us operate our platform and offer
																	24/7 customer support for your orders"
																	placement="top-left"
																/>
															</p>
															<b>
																{this.props.serviceFee
																	? this.props.serviceFee.toFixed(2)
																	: 0}{" "}
																{this.props.currency_code
																	? this.props.currency_code
																	: this.props.currentLoggedUser.currency_code}
															</b>
														</div>
														<div className="flex justify-between px-[16px] py-[8px]">
															<p>Payment Processing Fee</p>
															<b>
																{this.props.handlingFee
																	? this.props.handlingFee.toFixed(2)
																	: 0}{" "}
																{this.props.currency_code
																	? this.props.currency_code
																	: this.props.currentLoggedUser.currency_code}
															</b>
														</div>
														<div className="flex justify-between px-[16px] py-[8px]">
															<p>Spendable</p>
															<b>
																{" "}
																{this.props.spendable
																	? this.props.spendable.toFixed(2)
																	: 0}{" "}
																{this.props.currency_code
																	? this.props.currency_code
																	: this.props.currentLoggedUser.currency_code}
															</b>
														</div>
														<div className="flex justify-between px-[16px] py-[8px]"></div>
													</div>
												</div>
											</div>
											<div className="grid grid-cols-12 gap-5 mt-6 payment-follower-range">
												<div className="flex justify-between col-span-12 items-center">
													<h3>Follower ranges</h3>
													{this.props.products && this.props.products.length ? (
														""
													) : (
														<LinkTo
															to="/products"
															prefix={<FaPlus className="text-white mr-2" />}
															text="Add Product"
															className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
														/>
													)}
												</div>
												{this.props.campaignRanges.map((range, index) => (
													<div key={range.id} className="col-span-12">
														<div className="grid grid-cols-12 gap-5 mt-6">
															<div className="md:col-span-4 sm:col-span-6 col-span-12">
																<div className="flex">
																	<p className="mt-2" style={{ width: 120 }}>
																		{range.range_name}
																	</p>
																	<InputGroup className="mb-4">
																		<FormControl
																			aria-label="Default"
																			className="text-right"
																			value={range.price}
																			aria-describedby="inputGroup-sizing-default"
																			onChange={(e) =>
																				this.handleFollowerRangeChange(
																					index,
																					e.target.value
																				)
																			}
																			type="number"
																		/>
																		<InputGroup.Prepend>
																			<InputGroup.Text id="inputGroup-sizing-default">
																				{this.props.currency_code
																					? this.props.currency_code
																					: this.props.currentLoggedUser
																							.currency_code}
																			</InputGroup.Text>
																		</InputGroup.Prepend>
																	</InputGroup>
																</div>
															</div>
															{this.props.currentLoggedUser.offer &&
															this.props.currentLoggedUser.offer
																.payPerProduct === "Y" ? (
																<div className="md:col-span-4 md:col-start-5 sm:col-span-6 col-span-12">
																	<Select
																		value={range.offer}
																		options={products}
																		isClearable={true}
																		isSearchable={true}
																		placeholder={"Product Payment"}
																		onChange={(e) =>
																			this.props.handleFollowerRangeProduct(
																				index,
																				e
																			)
																		}
																	/>
																</div>
															) : (
																""
															)}
														</div>
														<div className="h-[1px] w-full bg-[#0000001f] mt-4 sm:!mt-0" />
													</div>
												))}
											</div>
										</Tab.Pane>
										<Tab.Pane eventKey="pricingPerInfluencer">
											<div className="grid grid-cols-12 gap-5">
												<div className="md:col-span-6 col-span-12">
													<div className="flex flex-col">
														<div className="flex justify-between px-[16px] py-[8px]">
															<p>Budget</p>
															<b>
																{this.props.campaignBudget
																	? this.props.campaignBudget.toFixed(2)
																	: 0}{" "}
																{this.props.currency_code
																	? this.props.currency_code
																	: this.props.currentLoggedUser.currency_code}
															</b>
														</div>
														<div className="flex justify-between px-[16px] py-[8px]">
															<p>
																Service fee
																<Tooltip
																	trigger={
																		<div className="ml-2">
																			<BsQuestionCircle
																				className="dark"
																				size={20}
																			/>
																		</div>
																	}
																	tooltipText="This helps us operate our platform and offer
																	24/7 customer support for your orders"
																	placement="top-left"
																/>
															</p>
															<b>
																{this.props.serviceFee
																	? this.props.serviceFee.toFixed(2)
																	: 0}{" "}
																{this.props.currency_code
																	? this.props.currency_code
																	: this.props.currentLoggedUser.currency_code}
															</b>
														</div>
														<div className="flex justify-between px-[16px] py-[8px]">
															<p>Payment Processing Fee</p>
															<b>
																{this.props.handlingFee
																	? this.props.handlingFee.toFixed(2)
																	: 0}{" "}
																{this.props.currency_code
																	? this.props.currency_code
																	: this.props.currentLoggedUser.currency_code}
															</b>
														</div>
														<div className="flex justify-between px-[16px] py-[8px]">
															<p>Spendable</p>
															<b>
																{this.props.spendable
																	? this.props.spendable.toFixed(2)
																	: 0}{" "}
																{this.props.currency_code
																	? this.props.currency_code
																	: this.props.currentLoggedUser.currency_code}
															</b>
														</div>
														<div className="flex justify-between px-[16px] py-[8px]"></div>
													</div>
												</div>
											</div>
											<div className="grid grid-cols-12 gap-5">
												<div className="col-span-12">
													<div className="block justify-between w-full items-center">
														{this.props.products &&
														this.props.products.length ? (
															""
														) : (
															<LinkTo
																to="/products"
																text="Add Product"
																prefix={<FaPlus className="text-white mr-2" />}
																className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 float-right"
															/>
														)}
														<LinkTo
															to="#"
															text="Fill with suggested fee"
															prefix={<FaPlus className="text-white mr-2" />}
															onClick={() => this.fillSuggestedFee()}
															className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 float-right"
														/>
													</div>
												</div>
											</div>
											{this.props.errorMessages.length ? (
												<div className="bg-[#f8d7da] border-[1px] border-[#f5c2c7] text-[#842029] p-[.75rem_1.25rem] rounded-[8px] mb-[1rem] mt-12  block">
													You can't decrease influencer price OR price should be
													greater than $10 of the below given influencers
													becasue of these influencers are active OR price is
													less than $10 in that campaign
													<br />
													<ul className="m-0">
														{this.props.errorMessages.map((message, index) => (
															<li key={index} className="text-white">
																<b>{message}</b>
															</li>
														))}
													</ul>
												</div>
											) : (
												""
											)}
											{this.props.budgetError ? (
												<span className="red">{this.props.budgetError}</span>
											) : (
												""
											)}
											<div className="flex flex-col ">
												{this.props.selectedInfluencers &&
												this.props.selectedInfluencers.length
													? this.props.selectedInfluencers.map(
															(influencer, index) => (
																<div key={index}>
																	<div className="flex items-center">
																		<div className="shrink-0">
																			<img
																				src={
																					influencer.user_profile.picture
																						? influencer.user_profile.picture
																						: avatar
																				}
																				alt={influencer.user_profile.fullname}
																				className="w-[52px] rounded-full"
																			/>
																		</div>
																		<div className="grow max-w-[200px] ml-[10px]">
																			<h6 className=" text-[16px]">
																				{influencer.user_profile.fullname}
																			</h6>
																			<span className="text-[#9ea1b2] inline-block leading-[15px] mt-[5px]">
																				Followers :{" "}
																				<FormatedNumber
																					num={
																						influencer.user_profile.followers
																					}
																				/>
																			</span>
																		</div>
																		<div className="mr-5 max-w-[300px]">
																			<InputGroup className="text-right">
																				<FormControl
																					disabled={
																						this.props.campaignStatus ===
																							"active" &&
																						this.props.selectedInfluencers.some(
																							(selectedInfluencer) =>
																								selectedInfluencer.id ===
																									influencer.id &&
																								selectedInfluencer.isActive
																						)
																					}
																					aria-label="Default"
																					value={
																						this.props.suggestedFeeFlag &&
																						influencer.suggestedFee
																							? parseFloat(
																									influencer.suggestedFee.replace(
																										/,/g,
																										""
																									)
																							  )
																							: influencer.price
																					}
																					onChange={(e) =>
																						this.pricePerInfluencerChange(
																							e,
																							influencer.id
																						)
																					}
																					aria-describedby="inputGroup-sizing-default"
																					type="number"
																					className="text-right"
																				/>
																				<InputGroup.Prepend>
																					<InputGroup.Text id="inputGroup-sizing-default">
																						{this.props.currency_code
																							? this.props.currency_code
																							: this.props.currentLoggedUser
																									.currency_code}
																					</InputGroup.Text>
																				</InputGroup.Prepend>
																			</InputGroup>
																		</div>
																		<div>
																			<Select
																				value={influencer.product}
																				options={products}
																				isClearable={true}
																				isSearchable={true}
																				placeholder={"Product Payment"}
																				onChange={(e) =>
																					this.props.onChangeProductPerInfluencer(
																						e,
																						influencer.id
																					)
																				}
																			/>
																		</div>
																	</div>

																	<div className="h-[1px] w-full bg-[#0000001f]" />
																</div>
															)
													  )
													: ""}
											</div>
										</Tab.Pane>
									</Tab.Content>
								</div>
							</div>
						</Tab.Container>
					) : (
						""
					)}
					{this.props.campaignType === "contentCampaign" ? (
						<Tab.Container
							defaultActiveKey={
								this.props.paymentType ? this.props.paymentType : ""
							}
							onSelect={(k) => this.setContentKey(k)}
						>
							<div className="grid grid-cols-12 gap-5">
								<div className="md:col-span-3 sm:col-span-4 col-span-12">
									<Nav variant="pills" className="flex-row">
										<div className="w-full">
											<Nav.Item>
												<Nav.Link eventKey="pricingPerContent">
													<MdPeopleAlt className="mr-4" />
													Pricing Per Content
												</Nav.Link>
											</Nav.Item>
											{this.props.selectedInfluencers.length ? (
												<Nav.Item>
													<Nav.Link eventKey="pricingPerInfluencer">
														<MdTouchApp className="mr-4" />
														Pricing per Influencer
													</Nav.Link>
												</Nav.Item>
											) : (
												""
											)}
										</div>
									</Nav>
								</div>
								<div className="md:col-span-9 sm:col-span-4 col-span-12">
									<Tab.Content className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] ml-0 p-3 sm:!p-12 w-full">
										<Tab.Pane eventKey="pricingPerContent">
											<div className="w-full">
												<Form.Group controlId="exampleForm.ControlSelect1">
													<Form.Label>
														Select Pricing Per Content Type
													</Form.Label>
													<Form.Control
														as="select"
														onChange={(e) => this.onChangeContentType(e)}
													>
														<option value="">Select Type</option>
														<option value="pricePerImage">
															Price Per Image
														</option>
														<option value="pricePerVideo">
															Price Per Video
														</option>
														<option value="pricePerStory">
															Price Per Story
														</option>
														<option value="payPerProduct">
															Pay Per Product
														</option>
													</Form.Control>
												</Form.Group>
											</div>
											<div className="w-full">
												{this.state.contentType === "pricePerImage" && (
													<div>
														<h5 className="mb-4 mt-4  text-[18px]">
															Price Per Image
														</h5>
														<InputGroup size="lg">
															<FormControl
																aria-label="Large"
																type="number"
																className="text-right"
																placeholder="0"
																name="pricePerImage"
																aria-describedby="inputGroup-sizing-sm"
																onChange={(e) =>
																	this.props.handlePricePerContentChange(e)
																}
																value={this.props.pricePerImage}
															/>
															<InputGroup.Prepend>
																<InputGroup.Text id="inputGroup-sizing-lg">
																	{this.props.currency_code
																		? this.props.currency_code
																		: this.props.currentLoggedUser
																				.currency_code}
																</InputGroup.Text>
															</InputGroup.Prepend>
														</InputGroup>
													</div>
												)}
												{this.state.contentType === "pricePerVideo" && (
													<div>
														<h5 className="mb-4 mt-4  text-[18px]">
															Price Per Video
														</h5>
														<InputGroup size="lg">
															<FormControl
																aria-label="Large"
																type="number"
																className="text-right"
																placeholder="0"
																name="pricePerVideo"
																aria-describedby="inputGroup-sizing-sm"
																onChange={(e) =>
																	this.props.handlePricePerContentChange(e)
																}
																value={this.props.pricePerVideo}
															/>
															<InputGroup.Prepend>
																<InputGroup.Text id="inputGroup-sizing-lg">
																	{this.props.currency_code
																		? this.props.currency_code
																		: this.props.currentLoggedUser
																				.currency_code}
																</InputGroup.Text>
															</InputGroup.Prepend>
														</InputGroup>
													</div>
												)}
												{this.state.contentType === "pricePerStory" && (
													<div>
														<h5 className="mb-4 mt-4  text-[18px]">
															Price Per Story
														</h5>
														<InputGroup size="lg">
															<FormControl
																aria-label="Large"
																type="number"
																className="text-right"
																placeholder="0"
																name="pricePerStory"
																aria-describedby="inputGroup-sizing-sm"
																onChange={(e) =>
																	this.props.handlePricePerContentChange(e)
																}
																value={this.props.pricePerStory}
															/>
															<InputGroup.Prepend>
																<InputGroup.Text id="inputGroup-sizing-lg">
																	{this.props.currency_code
																		? this.props.currency_code
																		: this.props.currentLoggedUser
																				.currency_code}
																</InputGroup.Text>
															</InputGroup.Prepend>
														</InputGroup>
													</div>
												)}
												{this.state.contentType === "payPerProduct" && (
													<div>
														<h5 className="mb-4 mt-4  text-[18px]">
															Pay Per Product
														</h5>
														<InputGroup size="lg">
															<div className="w-full">
																<Select
																	value={this.props.contentProduct}
																	options={products}
																	isClearable={true}
																	isSearchable={true}
																	placeholder={"Product Payment"}
																	onChange={this.props.handleSelectChange}
																/>
															</div>
														</InputGroup>
													</div>
												)}
											</div>
										</Tab.Pane>
										<Tab.Pane eventKey="pricingPerInfluencer">
											<div className="relative">
												{this.props.selectedInfluencers.map((influencer) => (
													<div key={influencer.id}>
														<div className="flex items-center">
															<div className="shrink-0">
																<img
																	src={avatar}
																	className="w-[52px] rounded-full"
																	alt="avatar"
																/>
															</div>
															<div className="max-w-[200px] ml-[10px]">
																<h6 className=" text-[16px]">
																	{influencer.displayname}
																</h6>
															</div>
															<div>
																{/* <Dropdown
                                                                    searchInput={{ type: 'number' }}
                                                                    selection
                                                                    options={options}
                                                                    placeholder='Select amount...'
                                                                /> */}
															</div>
															<div className="mr-5 max-w-[300px]">
																<InputGroup className="text-right">
																	<FormControl
																		aria-label="Default"
																		value={influencer.price}
																		onChange={(e) =>
																			this.props.onChangePricePerInfluencer(
																				e,
																				influencer.id
																			)
																		}
																		aria-describedby="inputGroup-sizing-default"
																		className="text-right"
																	/>
																	<InputGroup.Prepend>
																		<InputGroup.Text id="inputGroup-sizing-default">
																			{this.props.currency_code
																				? this.props.currency_code
																				: this.props.currentLoggedUser
																						.currency_code}
																		</InputGroup.Text>
																	</InputGroup.Prepend>
																</InputGroup>
															</div>
															<div>
																<Select
																	options={products}
																	isClearable={true}
																	isSearchable={true}
																	placeholder={"Product Payment"}
																	onChange={(e) =>
																		this.props.onChangeProductPerInfluencer(
																			e,
																			influencer.id
																		)
																	}
																/>
															</div>
														</div>
														<div className="h-[1px] w-full bg-[#0000001f]" />
													</div>
												))}
											</div>
										</Tab.Pane>
									</Tab.Content>
								</div>
							</div>
						</Tab.Container>
					) : (
						""
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		errorMessages: state.SetUpNewCampaignReducer.errorMessages,
		budgetError: state.SetUpNewCampaignReducer.budgetError,
		selectedInfluencers: state.SetUpNewCampaignReducer.selectedInfluencers,
		campaignBudget: state.SetUpNewCampaignReducer.campaignBudget,
		serviceFee: state.SetUpNewCampaignReducer.serviceFee,
		handlingFee: state.SetUpNewCampaignReducer.handlingFee,
		spendable: state.SetUpNewCampaignReducer.spendable,
		campaignRanges: state.SetUpNewCampaignReducer.campaignRanges,
		products: state.SetUpNewCampaignReducer.products,
		campaignType: state.SetUpNewCampaignReducer.campaignType,
		typeName: state.SetUpNewCampaignReducer.typeName,
		paymentType: state.SetUpNewCampaignReducer.paymentType,
		pricePerImage: state.SetUpNewCampaignReducer.pricePerImage,
		pricePerVideo: state.SetUpNewCampaignReducer.pricePerVideo,
		pricePerStory: state.SetUpNewCampaignReducer.pricePerStory,
		contentProduct: state.SetUpNewCampaignReducer.contentProduct,
		currentLoggedUser: state.HeaderReducer.currentLoggedUser,
		campaignCommisonFee: state.HeaderReducer.campaignCommisonFee,
		currency_code: state.SetUpNewCampaignReducer.currency_code,
		campaignStatus: state.SetUpNewCampaignReducer.campaignStatus,
		suggestedFeeFlag: state.SetUpNewCampaignReducer.suggestedFeeFlag,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleSelectContentPaymentType: (event) =>
			dispatch({
				type: HANDLE_SELECT_CONTENT_PAYMENT_TYPE_SUCCESS,
				payload: event,
			}),
		handleSelectInfluencerPaymentType: (event) =>
			dispatch({
				type: HANDLE_SELECT_INFLUENCER_PAYMENT_TYPE_SUCCESS,
				payload: event,
			}),
		handleSelectPricingPerContentType: (event) =>
			dispatch({
				type: HANDLE_SELECT_PRICING_PER_CONTENT_TYPE_SUCCESS,
				payload: event,
			}),
		handlePricePerContentChange: (event) =>
			dispatch({ type: HANDLE_PRICE_PER_CONTENT_SUCCESS, payload: event }),
		handleServiceFeeChange: (query) =>
			dispatch({ type: BUDGET_SERVICE_FEE_CHANGE, payload: query }),
		onChangePayPerClick: (event) =>
			dispatch({ type: HANDLE_PAY_PER_CLICK, payload: event }),
		handleSuggestedFeeFlag: (event) =>
			dispatch({ type: HANDLE_SUGGESTED_FEE_FLAG, payload: event }),
		onChangePricePerInfluencer: (event, influencerId) =>
			dispatch({
				type: HANDLE_PRICE_PER_INFLUENCER,
				payload: event,
				influencerId: influencerId,
			}),
		onFillInfluencerSuggestedFee: (value, influencerId) =>
			dispatch({
				type: HANDLE_FILL_SUGGESTED_FEE,
				payload: value,
				influencerId: influencerId,
			}),
		handleChangeFollowerRange: (key, value) =>
			dispatch({ type: HANDLE_FOLLOWER_RANGE_SUCCESS, key: key, value: value }),
		handleFollowerRangeProduct: (key, value) =>
			dispatch({
				type: HANDLE_SELECT_RANGE_PRODUCT_SUCCESS,
				key: key,
				value: value,
			}),
		onChangeProductPerInfluencer: (event, influencerId) =>
			dispatch({
				type: HANDLE_PRODUCT_PER_INFLUENCER,
				payload: event,
				influencerId: influencerId,
			}),
		handleSelectChange: (event) =>
			dispatch({ type: HANDLE_SELECT_PRODUCT_CHANGE_SUCCESS, payload: event }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentTab);
