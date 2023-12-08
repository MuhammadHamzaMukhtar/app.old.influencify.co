import { Component, Fragment } from "react";
import Button from "@components/global/Button";
import "./styles.css";
import MarketingCarousel from "@components/MarketingCarousel";
import InfluencerProfileModal from "@components/BrandInfluencerDiscover/Profile/InfluencerProfileModal";
import InstagramLogo from "@assets/svgs/instagram_logo.svg";
import Lock from "@assets/svgs/lock.svg";
import helper from "../../../constants/helper";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import Item from "./Item";
import LinkTo from "@components/global/LinkTo";
import Anchor from "@components/global/Anchor";
import { Combobox, Transition } from "@headlessui/react";
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

class InstaLocation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showSection: false,
			data: "",
			country: "",
			profileModal: false
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
				geo: [{ id: this.props.form.searchInstagramLocationId }],
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
		const platform = "instagram";
		const data = { payload, platform };
		if (this.props.form.searchInstagramLocationId) {
			if (this.props.count <= process.env.REACT_APP_MARKETING_TOOL_LOCK) {
				this.props.search(data);
				this.addForm("searchInstagramLocationText", this.state.country);
			}
		}
	};

	searchLocation = (e) => {
		const s = e.target.value;
		this.setState({ country: s })
		const platform = "tiktok";
		clearTimeout(this.clearTimer);
		this.clearTimer = setTimeout(() => {
			this.props.searchIqGeoData(s, platform);
		}, 500);
	};

	viewInfluencerProfile = async (id) => {
		const token = localStorage.getItem("access-token");
		if (token) {
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
		const title = helper.instagram_location_title;
		const description = helper.instagram_location_description;
		const { data, loader, total, form, count, countries, isProfileLoading } = this.props;
		const { country } = this.state;
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
								src={InstagramLogo}
								alt="instagram"
								width="55"
								height="55"
								className="mt-12 mx-auto"
							/>
							<h1 className="black sm:text-[35px] text-[30px] text-center mt-6 mb-6 font-semibold">
								<span className="success sm:text-[35px] text-[30px] font-semibold">
									Free{" "}
								</span>
								Find Instagram Influencers by Location
							</h1>
							<p className="text-[16px] black">
								Search for niche Instagram creators by keywords used either in
								their location.
							</p>
							<div className="flex items-center justify-center space-x-5">
								<div className="lg:w-6/12 sm:w-full my-4">
									<div className="w-full flex">
										<Combobox
											value={country}
											disabled={
												count > process.env.REACT_APP_MARKETING_TOOL_LOCK
											}
											onChange={(data) => {
												let form_data = form;
												form_data = {
													...form_data,
													searchInstagramLocationId: data.value,
												};

												this.props.addForm(form_data);
												this.setState({
													country: data.text,
												});
											}}
										>
											<div className="relative z-10 w-full">
												<div className="relative h-14 w-full cursor-default flex items-center overflow-hidden border border-[#22242626] rounded-l-lg bg-white text-left focus-visible:outline-0 sm:text-sm">
													<Combobox.Button className="w-full h-full">
														<Combobox.Input
															className="w-full border-none xs:text-[14px] text-[10px] h-full xs:px-4 px-2 text-sm text-gray-900 focus:outline-0"
															displayValue={country}
															placeholder="Search Country"
															onChange={(e) => this.searchLocation(e)}
														/>
													</Combobox.Button>
												</div>
												<Transition
													as={Fragment}
													leave="transition ease-in duration-100"
													leaveFrom="opacity-100"
													leaveTo="opacity-0"
												>
													<Combobox.Options className="absolute -mt-1 max-h-60 w-full overflow-y-auto rounded-md bg-white py-1 text-[14px] shadow-lg">
														{countries === undefined ||
															countries.length === 0 ? (
															<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
																No results found.
															</div>
														) : (
															countries.map((countri, key) => (
																<Combobox.Option
																	key={key}
																	className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${countri.text === country
																			? "bg-[#00000008] text-black font-semibold"
																			: "text-gray-900 font-medium"
																		}`}
																	value={countri}
																>
																	<div className="flex items-center">
																		<span className={`block truncate `}>
																			{countri.text}
																		</span>
																	</div>
																</Combobox.Option>
															))
														)}
													</Combobox.Options>
												</Transition>
											</div>
										</Combobox>
										<Button
											disabled={
												count > process.env.REACT_APP_MARKETING_TOOL_LOCK || !country
											}
											onClick={this.search}
											className="xs:px-12 px-3 text-white h-14 bg--purple rounded-r-[8px] inline-flex items-center text-[14px] font-semibold"
											text="Check"
										/>
									</div>
									<div className="flex flex-wrap items-center gap-4 mt-3">
										<p className="darkGray !mt-2">Key word e.g. </p>
										<p className="success bg--lightSuccess rounded-[8px] py-[0.5rem] px-4">
											United Kingdom{" "}
										</p>
										<p className="success bg--lightSuccess rounded-[8px] py-[0.5rem] px-4">
											Ukraine{" "}
										</p>
										<p className="success bg--lightSuccess rounded-[8px] py-[0.5rem] px-4">
											India{" "}
										</p>
										<p className="success bg--lightSuccess rounded-[8px] py-[0.5rem] px-4">
											Poland{" "}
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
							<div className="mt-12 flex flex-wrap">
								<div className="w-full">
									<div className="rounded-[8px] shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] transition-all  duration-300 bg-white border-[#dedede] p-12">
										<h5 className="text-[18px] black font-medium text-center mb-12">
											{formatedNumber(total)} Influencers{" "}
											<span className="font-normal inline-block black">
												were found in {form.searchInstagramLocationText}
											</span>
										</h5>
										<div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
											{data.map((item, key) => (
												<Item index={key} key={key} item={item} viewInfluencerProfile={this.viewInfluencerProfile} />
											))}
										</div>
										{!token &&
											<div className="text-center">
												<img
													src={Lock}
													alt="Lock"
													className="mb-2 mt-12 mx-auto"
												/>
												<h4 className="my-6 text-[20px] black font-medium">
													Sign Up To See Other {formatedNumber(total)} Influencers
												</h4>
												<LinkTo
													to="/brand/register"
													text="Get Started"
													className="text-white bg--purple rounded-[8px] px-12 h-[40px] text-[14px] inline-flex items-center justify-center hover:opacity-80"
												/>
											</div>
										}
									</div>
								</div>
							</div>
						) : null}
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
		data: marketingTool.searchInstagramLocation,
		total: marketingTool.searchInstagramTotalLocation,
		count: marketingTool.searchInstagramCountLocation,
		loader: marketingTool.searchInstagramLocationLoader,
		form: marketingTool.form,
		countries: influencerSearch.countries,
		isProfileLoading: influencerSearch.isProfileLoading,
	};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const { dispatch } = dispatchProps;
	const { actions } = require("@store/redux/MarketingToolRedux");
	const {
		actions: actionSearch,
	} = require("@store/redux/InfluencerSearchRedux");
	return {
		...ownProps,
		...stateProps,
		viewInfluencerProfile: (data) => {
			actionSearch.viewInfluencerProfile(dispatch, data);
		},
		search: (data) => {
			return actions.fetchSearchInstagramLocation(dispatch, data);
		},
		addForm: (data) => {
			return actions.addForm(dispatch, data);
		},
		searchIqGeoData: (s, platform) => {
			actionSearch.searchIqGeoData(dispatch, s, platform);
		},
	};
};

export default connect(mapStateToProps, undefined, mergeProps)(InstaLocation);
