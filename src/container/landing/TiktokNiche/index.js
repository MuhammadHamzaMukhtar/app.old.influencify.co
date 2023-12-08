import { Component } from "react";
import "./styles.css";
import MarketingCarousel from "@components/MarketingCarousel";
import InfluencerProfileModal from "@components/BrandInfluencerDiscover/Profile/InfluencerProfileModal";
import TiktokLogo from "@assets/svgs/tiktok_logo.svg";
import Lock from "@assets/svgs/lock.svg";
import helper from "../../../constants/helper";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import Item from "./Item";
import Anchor from "@components/global/Anchor";
import LinkTo from "@components/global/LinkTo";
import Button from "@components/global/Button";
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

class TiktokNiche extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showSection: false,
			data: "",
			profileModal:false
		};
	}
	componentDidMount() {
		window.scrollTo(0, 0);
	}
	handleChange = (e) => {
		this.setState({ data: e.target.value });
		if (this.state.data !== "") {
			this.setState({ showSection: true });
		}
	};
	addForm = (key, value) => {
		const form = this.props.form;
		form[key] = value;
		this.props.addForm(form);
	};

	search = () => {
		const payload = {
			audience_source: "any",
			filter: {
				with_contact: [
					{
						type: "email",
						action: "should",
					},
				],
				has_audience_data: true,
				text: this.props.form.searchTiktokInfluencersText,
			},
			paging: {
				skip: 0,
				limit: 5,
			},
			sort: {
				field: "followers",
				direction: "desc",
			},
		};
		const platform = "tiktok";
		const data = { payload, platform };
		 if ((this.props.form.searchTiktokInfluencersText || "").length > 1) {
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
		const title = helper.tiktok_niche_title;
		const description = helper.tiktok_niche_description;
		const { data, loader, total, form, count, isProfileLoading } = this.props;
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
						<div className="pt-12 text-center">
							<div className="mt-12 text-center">
								<img
									src={TiktokLogo}
									alt="tiktok"
									width="110"
									height="110"
									className="mt-12 mx-auto"
								/>
								<h1 className="black sm:text-[35px] text-[30px] text-center mt-6 mb-6 font-semibold">
									<span className="success sm:text-[35px] text-[30px] font-semibold">
										Free{" "}
									</span>
									Find Tiktok Influencers in Your Niche
								</h1>
								<p className="text-[16px] black">
									Search for niche Tiktok creators by keywords used either in
									their content or bio.
								</p>
								<div className="flex items-center justify-center space-x-5">
									<div className="lg:w-6/12 sm:w-full my-4">
										<div className="w-full flex">
											<input
												placeholder="Enter Keyword..."
												className="border-[1px] xs:text-[14px] text-[10px] min-w-unset w-full border-[#ced4da] focus:border-[#7c3292] h-14 px-[1rem] focus-visible:outline-0 rounded-l-[8px]"
												type="text"
												onChange={(e) => {
													if (
														count <= process.env.REACT_APP_MARKETING_TOOL_LOCK
													) {
														this.addForm(
															"searchTiktokInfluencersText",
															e.target.value
														);
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

										<div className="flex flex-wrap items-center gap-4 mt-4">
											<p className="darkGray py-[0.5rem]">Key word e.g. </p>
											<p className="success bg--lightSuccess rounded-[8px] py-[0.5rem]px-4">
												Crypto{" "}
											</p>
											<p className="success bg--lightSuccess rounded-[8px] py-[0.5rem]px-4">
												Fashion{" "}
											</p>
											<p className="success bg--lightSuccess rounded-[8px] py-[0.5rem]px-4">
												Sports{" "}
											</p>
											<p className="success bg--lightSuccess rounded-[8px] py-[0.5rem]px-4">
												Lifestyle{" "}
											</p>
										</div>
									</div>
								</div>
							</div>
							{loader ? (
								<div className="relative">
									<Loader
										className="h-full w-full flex justify-center items-center"
										size="67"
									/>
								</div>
							) : data.length > 0 ? (
								<div className="flex flex-wrap space-x-5 mt-12">
									<div className="w-full">
										<div className="rounded-[8px] shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] transition-all duration-300 bg-white border-[#dedede] p-12">
											<h5 className="text-[18px] black font-medium text-center mb-12">
												{formatedNumber(total)} Influencers{" "}
												<span className="font-normal inline-block black">
													were found in {form.searchTiktokInfluencersText}
												</span>
											</h5>
											<div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
												{data.map((item, key) => (
													<Item index={key} key={key} item={item} viewInfluencerProfile={this.viewInfluencerProfile}  />
												))}
											</div>
											{!token &&
											<div className="text-center">
												<img
													src={Lock}
													alt="Lock"
													className="mb-2 mt-12 mx-auto"
												/>
												<h4 className="my-6 text-20 black font-medium">
												Sign Up To See Other {formatedNumber(total)}{" "}
													Influencers
												</h4>
												<LinkTo
													to="/brand/register"
													className="px-12 text-white h-14 bg--purple rounded-[8px] inline-flex items-center text-[14px] font-semibold hover:opacity-80"
													text="Get Started"
												/>
											</div>}
										</div>
									</div>
								</div>
							) : null}
						</div>
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
					platform={"instagram"}
					open={this.state.profileModal}
					onClose={() => this.handleClose()}
				/>
			</>
		);
	}
}
const mapStateToProps = ({ marketingTool, influencerSearch }) => {
	return {
		data: marketingTool.searchTiktokInfluencers,
		total: marketingTool.searchTiktokTotalInfluencers,
		count: marketingTool.searchTiktokCountInfluencers,
		loader: marketingTool.searchTiktokInfluencerLoader,
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
			return actions.fetchSearchTiktokInfluencers(dispatch, data);
		},
		addForm: (data) => {
			return actions.addForm(dispatch, data);
		},
	};
};

export default connect(mapStateToProps, undefined, mergeProps)(TiktokNiche);
