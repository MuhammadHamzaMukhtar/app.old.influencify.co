import { Component } from "react";
import Tooltip from "@components/global/Tooltip";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import avatar from "@assets/avatar.png";
import DOMPurify from "dompurify";
import LinkTo from "@components/global/LinkTo";

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

class OverviewTab extends Component {
	createMarkup = (html) => {
		return {
			__html: DOMPurify.sanitize(html),
		};
	};

	render() {
		return (
			<div>
				{this.props.creditCardErrors ? (
					<div className="bg-[#f8d7da] border-[1px] border-[#f5c2c7] text-[#842029] p-[.75rem_1.25rem] rounded-[8px] mb-[1rem]">
						<p className="text-white">{this.props.creditCardErrors}</p>
						<LinkTo
							to="/brand/setting-brand-payment"
							className="pl-12 pr-12 text-white float-right"
							text="Add Credit Card"
						/>
					</div>
				) : (
					""
				)}
				{this.props.notActivePyamentGateway ? (
					<div className="bg-[#f8d7da] border-[1px] border-[#f5c2c7] text-[#842029] p-[.75rem_1.25rem] rounded-[8px] mb-[1rem]">
						<p className="text-white">{this.props.notActivePyamentGateway}</p>
					</div>
				) : (
					""
				)}
				{this.props.messages.length ? (
					<div className="bg-[#f8d7da] border-[1px] border-[#f5c2c7] text-[#842029] p-[.75rem_1.25rem] rounded-[8px] mb-[1rem]">
						<ul className="m-0">
							{this.props.messages.map((message, index) => (
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
							<h5 className="mb-2 text-[18px]">Instructions</h5>
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-4">
								<div
									dangerouslySetInnerHTML={this.createMarkup(
										this.props.campaignInstruction
									)}
								></div>
							</div>
						</div>
						<div className="mb-6">
							<h5 className="mb-2 text-[18px]">Wording of the posts</h5>
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-4">
								<div
									dangerouslySetInnerHTML={this.createMarkup(
										this.props.postWording
									)}
								></div>
							</div>
						</div>
						<div className="mb-6">
							<h5 className="mb-2 text-[18px]">Link to share in the Post</h5>
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-4">
								<p>{this.props.linkToShare}</p>
							</div>
						</div>
						<div className="mb-6">
							<h5 className="mb-2 text-[18px]">Posts Types</h5>
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-4">
								<p>
									{this.props.selectedGoal
										? this.props.selectedGoal
										: this.props.selectedGoal}
								</p>
							</div>
						</div>
						<div className="mb-6">
							<h5 className="mb-2 text-[18px]">Photos to share</h5>
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-4">
								{this.props.campaignAttachments &&
								this.props.campaignAttachments.length
									? this.props.campaignAttachments.map((image, index) => (
											<img
												src={image}
												thumbnail
												alt="thumbnail"
												width="100"
												key={index}
											/>
									  ))
									: ""}
							</div>
						</div>
					</div>
					<div className="lg:col-span-4 col-span-12">
						<h5 className="mb-2  text-[18px]">Campaign Summary</h5>
						<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-12">
							<div className="flex flex-col">
								<div className="flex justify-between px-[16px] py-[8px]">
									<p>Title</p>
									<b>{this.props.campaignTitle}</b>
								</div>
								<div className="flex justify-between px-[16px] py-[8px]">
									<p>Country</p>
									<ul className="list-unstyled">
										{this.props.selectedCountries &&
										this.props.selectedCountries.length > 0
											? this.props.selectedCountries.map((country, index) => (
													<li key={index}>
														<b>{country.label}</b>
													</li>
											  ))
											: ""}
									</ul>
								</div>
								<div className="flex justify-between px-[16px] py-[8px]">
									<p>Channel</p>
									<b>{this.props.selectedPlatform}</b>
								</div>
								<div className="flex justify-between px-[16px] py-[8px]">
									<p>Type</p>
									<b>{this.props.typeName}</b>
								</div>
								<div className="flex justify-between px-[16px] py-[8px]">
									<p>Category</p>
									<ul className="list-unstyled">
										{this.props.selectedCategories &&
										this.props.selectedCategories.length > 0
											? this.props.selectedCategories.map((category, index) => (
													<li key={index}>
														<b>{category.name}</b>
													</li>
											  ))
											: ""}
									</ul>
								</div>
								<div className="flex justify-between px-[16px] py-[8px]">
									<p>Posting period</p>
									<b>{this.props.postingFrom + " - " + this.props.postingTo}</b>
								</div>
								<div className="flex justify-between px-[16px] py-[8px]"></div>
							</div>
						</div>
						<h5 className="mb-2  text-[18px]">Selected influencers</h5>
						<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-4">
							<div>
								{this.props.selectedInfluencers &&
								this.props.selectedInfluencers.length ? (
									this.props.selectedInfluencers.map((influencer, index) => (
										<div key={index}>
											<div className="flex items-center">
												<div className="shrink-0">
													<img
														src={
															influencer.user_profile &&
															influencer.user_profile.picture
																? influencer.user_profile.picture
																: avatar
														}
														alt={influencer.user_profile.username}
														className="w-[52px] h-[52px] rounded-full"
													/>
												</div>
												<div className="ml-[10px] grow my-[4px]">
													<Link to="#">
														<Tooltip
															trigger={
																<h6 className=" text-[16px]">
																	{" "}
																	{influencer.user_profile.username}
																</h6>
															}
															tooltipText={influencer.user_profile.username}
															placement="top-left"
														/>
													</Link>
													<span className="Notification-user-brand">
														Followers :
														<FormatedNumber
															num={influencer.user_profile.followers}
														/>
													</span>
												</div>
											</div>
											<div className="bg-[#0000001f] h-[1px] w-full" />
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

const mapStateToProps = (state) => {
	return {
		campaignTitle: state.SetUpNewCampaignReducer.campaignTitle,
		selectedCountries: state.SetUpNewCampaignReducer.selectedCountries,
		typeName: state.SetUpNewCampaignReducer.typeName,
		campaignInstruction: state.SetUpNewCampaignReducer.campaignInstruction,
		postWording: state.SetUpNewCampaignReducer.postWording,
		linkToShare: state.SetUpNewCampaignReducer.linkToShare,
		selectedInfluencers: state.SetUpNewCampaignReducer.selectedInfluencers,
		postingFrom: state.SetUpNewCampaignReducer.postingFrom,
		postingTo: state.SetUpNewCampaignReducer.postingTo,
		selectedPlatform: state.SetUpNewCampaignReducer.selectedPlatform,
		campaignAttachments: state.SetUpNewCampaignReducer.campaignAttachments,
		creditCardErrors: state.SetUpNewCampaignReducer.creditCardErrors,
		notActivePyamentGateway:
			state.SetUpNewCampaignReducer.notActivePyamentGateway,
		messages: state.SetUpNewCampaignReducer.messages,
		selectedCategories: state.SetUpNewCampaignReducer.selectedCategories,
		selectedGoal: state.SetUpNewCampaignReducer.selectedGoal,
		contentPostType: state.SetUpNewCampaignReducer.contentPostType,
	};
};

export default connect(mapStateToProps, null)(OverviewTab);
