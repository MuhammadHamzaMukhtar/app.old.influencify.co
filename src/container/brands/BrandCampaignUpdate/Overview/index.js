import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import avatar from "@assets/avatar.png";
import DOMPurify from "dompurify";
import Tooltip from "@components/global/Tooltip";
import LinkTo from "@components/global/LinkTo";
import { BsQuestionCircle } from "react-icons/bs";

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

class Overview extends Component {
	createMarkup = (html) => {
		return {
			__html: DOMPurify.sanitize(html),
		};
	};

	handleChange = (key, value) => {
		const { addForm } = this.props;
		const form = Object.assign({}, this.props.form);

		addForm(form);
	};

	render() {
		const { form, transaction_errors, currentLoggedUser } = this.props;
		return (
			<div>
				{transaction_errors && transaction_errors.length ? (
					<div className="alert alert-danger" role="alert">
						<ul className="m-0">
							{transaction_errors.map((message, index) => (
								<li key={index} className="text-white">
									{message.description}
								</li>
							))}
						</ul>
					</div>
				) : (
					""
				)}
				<div className="grid grid-cols-12 gap-5 mb-12">
					<div className="lg:col-span-8 col-span-12">
						<div className="mb-6">
							<h5 className="mb-2  text-[18px]">Instructions</h5>
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-4">
								<div
									dangerouslySetInnerHTML={this.createMarkup(form.instruction)}
								></div>
							</div>
						</div>
						{(form.post_wording || "").replace(/(<([^>]+)>)/gi, "").length >
							2 && (
								<div className="mb-6">
									<h5 className="mb-2  text-[18px]">Wording of the posts</h5>
									<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-4 break-all">
										<div
											dangerouslySetInnerHTML={this.createMarkup(
												form.post_wording
											)}
										></div>
									</div>
								</div>
							)}
						<div className="mb-6">
							<h5 className="mb-2  text-[18px]">Link to share in the Post</h5>
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-4">
								<p className="break-words"> {form.link_to_share}</p>
							</div>
						</div>
						{(form.goal_name || "").length > 0 && (
							<div className="mb-6">
								<h5 className="mb-2  text-[18px]">Posts Types</h5>
								<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-4">
									<p>{form.goal_name}</p>
								</div>
							</div>
						)}
						{form.attachments && form.attachments.length > 0 && (
							<div className="mb-6">
								<h5 className="mb-2  text-[18px]">Photos to share</h5>
								<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-4 grid xl:grid-cols-2 grid-cols-1 gap-16">
									{form.attachments && form.attachments.length
										? form.attachments.map((image, index) => (
											<img
												src={image}
												alt="Avatar"
												className="w-full h-[25vh]"
												key={index}
											/>
										))
										: ""}
								</div>
							</div>
						)}
					</div>
					<div className="lg:col-span-4 col-span-12">
						{form.campaign_payment &&
							form.campaign_payment.follower_range_budget > 0 && (
								<>
									<h5 className="mb-2 text-[18px]">Payment Summary</h5>
									<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-12">
										<div className="flex flex-col">
											<div className="border-b border-[#00000020] flex items-center justify-between pb-[0.75rem]">
												<p>Budget</p>
												<strong>
													{form.campaign_payment &&
														form.campaign_payment.follower_range_budget
														? form.campaign_payment.follower_range_budget.toFixed(
															2
														)
														: 0}{" "}
													{form.currency_code
														? form.currency_code
														: currentLoggedUser.currency_code}
												</strong>
											</div>
											<div className="border-b border-[#00000020] flex items-center justify-between py-[0.75rem]">
												<p className="flex items-center">
													Service fee
													<Tooltip
														trigger={
															<div className="ml-2">
																<BsQuestionCircle className="dark" size={18} />
															</div>
														}
														tooltipText="This helps us operate our platform and offer 24/7
														customer support for your orders"
														placement="top-left"
													/>
												</p>
												<strong>
													{form.campaign_payment &&
														form.campaign_payment.service_fee
														? (
															Number(form.campaign_payment.service_fee || 0) +
															Number(form.campaign_payment.handlingFee || 0)
														).toFixed(2)
														: 0}{" "}
													{form.currency_code
														? form.currency_code
														: currentLoggedUser.currency_code}
												</strong>
											</div>
											<div className="flex items-center justify-between pt-[0.75rem]">
												<p>Spendable</p>
												<strong>
													{form.campaign_payment &&
														form.campaign_payment.spenable_fee
														? form.campaign_payment.spenable_fee.toFixed(2)
														: 0}{" "}
													{form.currency_code
														? form.currency_code
														: currentLoggedUser.currency_code}
												</strong>
											</div>
										</div>
									</div>
								</>
							)}
						<h5 className="mb-2  text-[18px]">Campaign Summary</h5>
						<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-12">
							<div className="flex flex-col">
								<div className="border-b border-[#00000020] flex items-center justify-between pb-[0.75rem]">
									<p>Title</p>
									<strong className="break-all">{form.title}</strong>
								</div>
								{form.formated_locations &&
									form.formated_locations.length > 0 && (
										<div className="border-b border-[#00000020] flex items-center justify-between py-[0.75rem]">
											<p>Country</p>
											<ul className="list-unstyled">
												{form.formated_locations &&
													form.formated_locations.length > 0
													? form.formated_locations.map((country, index) => (
														<li key={index}>
															<strong>{country.name}</strong>,
														</li>
													))
													: ""}
											</ul>
										</div>
									)}
								<div className="border-b border-[#00000020] flex items-center justify-between py-[0.75rem]">
									<p>Channel</p>
									<strong>{form.platform_name}</strong>
								</div>
								<div className="border-b border-[#00000020] flex items-center justify-between py-[0.75rem]">
									<p>Type</p>
									<strong>{form.type_name}</strong>
								</div>
								{form.campaign_categories &&
									form.campaign_categories.length > 0 && (
										<div className="border-b border-[#00000020] flex items-center justify-between py-[0.75rem]">
											<p>Category</p>
											<ul className="list-unstyled">
												{form.campaign_categories &&
													form.campaign_categories.length > 0
													? form.campaign_categories.map((category, index) => (
														<li key={index}>
															<strong>{category.name}</strong>,
														</li>
													))
													: ""}
											</ul>
										</div>
									)}
								{this.props.contentPostType &&
									this.props.contentPostType.Post ? (
									<div className="border-b border-[#00000020] flex items-center justify-between py-[0.75rem]">
										<p>Feed posts</p>
										<strong>{this.props.contentPostType.Post}</strong>
									</div>
								) : (
									""
								)}
								{this.props.contentPostType &&
									this.props.contentPostType.Story ? (
									<div className="border-b border-[#00000020] flex items-center justify-between py-[0.75rem]">
										<p>Story posts</p>
										<strong>{this.props.contentPostType.Story}</strong>
									</div>
								) : (
									""
								)}
								<div className="flex items-center justify-between pt-[0.75rem]">
									<p>Posting period</p>
									<strong>
										{form && form.campaign_date
											? form.campaign_date.postingFrom +
											" - " +
											form.campaign_date.postingTo
											: ""}
									</strong>
								</div>
							</div>
						</div>
						<h5 className="mb-2 text-[18px]">Selected influencers</h5>
						<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-1 mb-4">
							<div>
								{form.selected_influencers &&
									form.selected_influencers.length ? (
									form.selected_influencers.map((influencer, index) => (
										<div key={index}>
											<div className="p-3 w-full flex relative text-left items-center justify-start">
												<div className="min-w-[56px] shrink-0">
													{/* <LinkTo
														to="#"
														prefix={ */}
													<img
														src={
															influencer.user_profile &&
																influencer.user_profile.picture
																? influencer.user_profile.picture
																: avatar
														}
														alt={influencer.user_profile.username}
														className="w-[52px] rounded-full overflow-hidden h-[52px]"
													/>
													{/* }
													/> */}
												</div>
												<div className="ml-[10px] grow ">
													{/* <Link to="#"> */}
													<Tooltip
														trigger={
															<h6 className="dark text-[16px]">
																{influencer.user_profile.username}
															</h6>
														}
														tooltipText={influencer.user_profile.username}
														placement="top-left"
													/>
													{/* </Link> */}
													<span className="text-[#9ea1b2] inline-block leading-[15px] mt-[5px]">
														Followers :
														<FormatedNumber
															num={influencer.user_profile.followers}
														/>
													</span>
												</div>
											</div>
											<div className="bg-[#0000001f] h-[1px] block ml-[72px]" />
										</div>
									))
								) : (
									<h3
										className="text-center mt-12"
										style={{ color: "gray", marginTop: "90px" }}
									>
										Nothing to show
									</h3>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ campaign, HeaderReducer }) => {
	return {
		form: campaign.form,
		transaction_errors: campaign.transaction_errors,
		currentLoggedUser: HeaderReducer.currentLoggedUser,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/CampaignRedux");
	return {
		addForm: (form) => {
			actions.addForm(dispatch, form);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
