import { Component } from "react";
import avatar from "@assets/male_avatar.png";
import { IoLockClosedOutline } from "react-icons/io5";
import "./styles.css";
import MarketingCarousel from "@components/MarketingCarousel";
import InfluencerProfileModal from "@components/BrandInfluencerDiscover/Profile/InfluencerProfileModal";
import TiktokLogo from "@assets/svgs/tiktok_logo.svg";
import Users from "@assets/svgs/user_group_alt.svg";
import Heart from "@assets/svgs/heart.svg";
import helper from "../../../constants/helper";
import Button from "@components/global/Button";
import Anchor from "@components/global/Anchor";
import LinkTo from "@components/global/LinkTo";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import Loader from "@components/global/Loader";
const formatedNumber = (num) => {
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

class TiktokEngagementCalculator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			profileModal:false
		};
	}
	componentDidMount() {
		window.scrollTo(0, 0);
	}

	addForm = (key, value) => {
		const form = this.props.form;
		form[key] = value;
		this.props.addForm(form);
	};

	search = () => {
		const payload = {
			audience_source: "any",
			filter: {
				username: {
					value: this.props.form.tiktokEngagementText,
					operator: "exact",
				},
			},
			paging: {
				skip: 0,
				limit: 1,
			},
			sort: {
				field: "followers",
				direction: "desc",
			},
		};
		const platform = "tiktok";
		const data = { payload, platform };

		 if ((this.props.form.tiktokEngagementText || "").length > 1) {
		     if (this.props.count <= process.env.REACT_APP_MARKETING_TOOL_LOCK) {
		this.props.search(data);
		     }
		 }
	};

	viewInfluencerProfile = async (id) => {
		const token = localStorage.getItem("access-token");
		if(token){
			await this.props.viewInfluencerProfile(id);
			this.setState({
				profileModal: true,
			});
		}
		
		
	};

	handleClose = () => {
		this.setState({
			profileModal: false,
		});
	};

	render() {
		const url = window.location.href;
		const title = helper.tiktok_engagement_calculator_title;
		const description = helper.tiktok_engagement_calculator_description;
		const { data, loader, count, isProfileLoading } = this.props;
		const token = localStorage.getItem("access-token");
		return (
			<>
				<Helmet>
					<title>{title}</title>
					<meta charSet="utf-8" />
					<meta name="description" content={description} />
					<link rel="canonical" href={url} />
				</Helmet>
				<div>
					<div className="containers">
						<div className="mt-12 text-center">
							<img
								src={TiktokLogo}
								alt="instagram"
								className="mt-12 mx-auto w-[110px] h-[110px]"
							/>
							<h1 className="black sm:text-[35px] text-[30px] text-center mt-6 mb-6 font-semibold">
								<span className="success sm:text-[35px] text-[30px] font-semibold">
									Free{" "}
								</span>
								Tiktok Engagement Rate Calculator
							</h1>
							<p className="text-[16px] black">
								Find out how many of Influencer's followers are engaged with
								their content.
							</p>
							<div className="flex items-center justify-center space-x-5">
								<div className="lg:w-6/12 w-full my-4">
									<div className="w-full flex">
										<input
											placeholder="Type your account name..."
											className="border-[1px] xs:text-[14px] text-[10px] min-w-unset w-full border-[#ced4da] focus:border-[#7c3292] h-14 px-[1rem] focus-visible:outline-0 rounded-l-[8px]"
											type="text"
											onChange={(e) => {
												if (
													count <= process.env.REACT_APP_MARKETING_TOOL_LOCK
												) {
													this.addForm("tiktokEngagementText", e.target.value);
												}
											}}
											readOnly={
												count > process.env.REACT_APP_MARKETING_TOOL_LOCK
											}
											disabled={
												count > process.env.REACT_APP_MARKETING_TOOL_LOCK
											}
										/>
										<Button
											disabled={
												count > process.env.REACT_APP_MARKETING_TOOL_LOCK
											}
											onClick={this.search}
											className="xs:px-12 px-3 text-white h-14 bg--purple rounded-r-[8px] inline-flex items-center text-[14px] font-semibold"
											text="Check"
										/>
									</div>
								</div>
							</div>
						</div>
						{loader && (
							<div className="relative">
								<Loader
									className="h-full w-full flex justify-center items-center"
									size="67"
								/>
							</div>
						)}
						{data && data.length > 0 && (
							<div className="mt-12 flex flex-wrap w-full pt-12">
								<div className="md:w-6/12 w-full mb-12">
									<div className="rounded-[8px] relative shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] transition-all bg-white p-12">
										<div className="flex justify-center">
											<div className="w-24 h-24 rounded-full absolute -top-10 bg--lightGray">
												<img
													src={data[0].picture ? data[0].picture : avatar}
													onError={({ currentTarget }) => {
														currentTarget.onerror = null;
														currentTarget.src = `${process.env.REACT_APP_BASE_URL}/images/male_avatar.png`;
													}}
													className="w-24 h-24 rounded-full object-cover"
													alt="avatar"
												/>
											</div>
										</div>
										<div className="text-center pt-12">
											<h4 className="text-[18px] black font-normal mt-12">
												{data[0].fullname}
											</h4>
											<p className="text-center w-full border-b-2 leading-[0.1em] my-12">
												<span className="darkGray font-normal px-[30px] text-[12px]">
													Powered by influencify
												</span>
											</p>
											<h4 className="text-[18px] black font-normal mb-4">
												Engagement rate
											</h4>
											<h4 className="sm:text-[35px] text-[30px] success font-semibold">
												{data[0].engagement_rate
													? (data[0].engagement_rate * 100).toFixed(2)
													: 0}
												%
											</h4>
											<div className="h-px w-full  bg-[#eeecec] my-12" />
										</div>
										<div className="lg:px-12">
											<div className="flex justify-between mb-4">
												<div className="flex items-center">
													<img
														src={Users}
														width="18"
														height="18"
														alt="followers"
													/>
													<p className="darkGray text-[14px] font-normal ml-2">
														Followers count
													</p>
												</div>
												<div>
													<p className="text-[18px] font-medium black">
														{formatedNumber(data[0].followers)}
													</p>
												</div>
											</div>
											<div className="flex justify-between mb-4">
												<div className="flex items-center">
													<img
														src={Heart}
														width="18"
														height="18"
														alt="engagement"
													/>
													<p className="darkGray text-[14px] font-normal ml-2">
														Avg. engagement count
													</p>
												</div>
												<div>
													<p className="text-[18px] font-medium black">
														{formatedNumber(data[0].engagements || 0)}
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="md:w-6/12 w-full mb-12 my-auto">
									<div className="md:pl-[4rem]">
										<h5 className="font-medium text-[20px] black">
											More Info in full report:
										</h5>
										<div className="mt-6">
											<div className="flex items-center mb-4">
												<IoLockClosedOutline className="success" size={18} />
												<p className="ml-4 black text-[16px] font-normal">
													Followers count
												</p>
											</div>
											<div className="flex items-center mb-4">
												<IoLockClosedOutline className="success" size={18} />
												<p className="ml-4 black text-[16px] font-normal">
													Fake followers check
												</p>
											</div>
											<div className="flex items-center mb-4">
												<IoLockClosedOutline className="success" size={18} />
												<p className="ml-4 black text-[16px] font-normal">
													Audience demographics
												</p>
											</div>
											<div className="flex items-center mb-4">
												<IoLockClosedOutline className="success" size={18} />
												<p className="ml-4 black text-[16px] font-normal">
													Followers growth
												</p>
											</div>
											<div className="flex items-center">
												<IoLockClosedOutline className="success" size={18} />
												<p className="ml-4 black text-[16px] font-normal">
													Brand mentions & #ad performance
												</p>
											</div>
										</div>
										{!token?
										<>
										<LinkTo
											to="/brand/register"
											text="View full report"
											className="mt-12 rounded-[8px] text-[14px] inline-flex items-center justify-center h-[40px] bg--purple text-white px-12 hover:opacity-80"
										/>
										<p className="darkGray font-normal text-[14px] mt-4">
											Unlock full report, to see channels audience
											<br /> demographics and in-depth content analytics.
										</p>
										</>:
										<button
										onClick={()=>this.viewInfluencerProfile(data?.[0]?.user_id)}
										className="mt-12 rounded-[8px] text-[14px] inline-flex items-center justify-center h-[40px] bg--purple text-white px-12 hover:opacity-80"
									>View full report</button>
										}
									</div>
								</div>
							</div>
						)}
					</div>

					<div className="bg--lightGray py-12 mt-12">
						<h2 className="lg:pt-12 black sm:text-[40px] text-[30px] font-semibold text-center px-4">
							<span className="block black sm:text-[40px] text-[30px] font-semibold">
								Try Other{" "}
							</span>
							Influencer{" "}
							<span className="success font-semibold sm:text-[40px] text-[30px]">
								Marketing Tools
							</span>
						</h2>
						<div className="containers mt-12 mb-12">
							<MarketingCarousel />
						</div>
					</div>

					{!token &&
					<div className="containers pt-12 pb-12 mt-12">
						<div className="bg-[url('@assets/decor_action_button_anim.gif')] sm:bg-contain bg-no-repeat sm:bg-right bg-[67%_76px] sm:h-[140px] xs:h-unset h-[270px] sm:p-0 bg-[length:231px] pb-[76px]">
							<div className="grid sm:grid-cols-12 grid-cols-1 gap-12">
								<div className="my-auto sm:col-span-6">
									<h2 className="xs:text-[26px] text-[23px] black font-bold text-center sm:text-left">
										You know what to do!
									</h2>
								</div>
								<div className="sm:col-span-6 my-12 xs:pt-0 pt-1 text-center sm:text-right">
									{localStorage.getItem("isLogin") ? (
										<Anchor
											href={localStorage.role + "/dashboard"}
											text="Sign Up Now"
											className="mr-0 sm:!mr-6 shadow-[0px_2px_18px_0px_rgba(0_0_0_/_30%)] mt-[18px] pink min-w-[240px] rounded-[8px] py-[10px] text-[16px] inline-block text-center"
										/>
									) : (
										<LinkTo
											to="/brand/register"
											text="Sign Up Now"
											className="mr-0 sm:!mr-6 shadow-[0px_2px_18px_0px_rgba(0_0_0_/_30%)] mt-[18px] pink min-w-[240px] rounded-[8px] py-[10px] text-[16px] inline-block text-center"
										/>
									)}
								</div>
							</div>
						</div>
					</div>
					}
				</div>
				<InfluencerProfileModal
					isProfileLoading={isProfileLoading}
					platform={"tiktok"}
					open={this.state.profileModal}
					onClose={() => this.handleClose()}
				/>
			</>
		);
	}
}
const mapStateToProps = ({ marketingTool, influencerSearch }) => {
	return {
		data: marketingTool.tiktokEngagementData,
		count: marketingTool.tiktokEngagementCount,
		loader: marketingTool.tiktokEngagementLoader,
		form: marketingTool.form,
		isProfileLoading: influencerSearch.isProfileLoading,
	};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const { dispatch } = dispatchProps;
	const { actions } = require("@store/redux/MarketingToolRedux");
	const { actions:actionSearch } = require("@store/redux/InfluencerSearchRedux");
	return {
		...ownProps,
		...stateProps,
		viewInfluencerProfile: (data) => {
			actionSearch.viewInfluencerProfile(dispatch, data);
		},
		search: (data) => {
			return actions.fetchTiktokEngagementCalculator(dispatch, data);
		},
		addForm: (data) => {
			return actions.addForm(dispatch, data);
		},
	};
};

export default connect(
	mapStateToProps,
	undefined,
	mergeProps
)(TiktokEngagementCalculator);
