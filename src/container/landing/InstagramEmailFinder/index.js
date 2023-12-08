import { Component } from "react";
import avatar from "@assets/male_avatar.png";
import { IoLockClosedOutline } from "react-icons/io5";
import "./styles.css";
import MarketingCarousel from "@components/MarketingCarousel";
import TiktokLogo from "@assets/svgs/instagram_logo.svg";
import Mail from "@assets/svgs/mail.svg";
import helper from "../../../constants/helper";
import { Helmet } from "react-helmet";
import { FaHeart } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";
import { connect } from "react-redux";
import Anchor from "@components/global/Anchor";
import Button from "@components/global/Button";
import LinkTo from "@components/global/LinkTo";
import Loader from "@components/global/Loader";

class InstagramEmailFinder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			copied: false,
		};
	}
	componentDidMount() {
		window.scrollTo(0, 0);
		this.props.resetEmailFinder();
	}

	addForm = (key, value) => {
		const form = this.props.form;
		form[key] = value;
		this.props.addForm(form);
	};

	search = () => {
		const platform = "instagram";
		const data = {
			platform: platform,
			url: this.props.form.instagramEmailText,
		};

		if ((this.props.form.instagramEmailText || "").length > 1) {
		     if (this.props.count <= process.env.REACT_APP_MARKETING_TOOL_LOCK) {
			this.props.search(data);
		     }
		}
	};

	copyTextToClipboard = async (text) => {
		if ("clipboard" in navigator) {
			return await navigator.clipboard.writeText(text);
		} else {
			return document.execCommand("copy", true, text);
		}
	};

	handleCopyClick = (copyText) => {
		this.copyTextToClipboard(copyText)
			.then(() => {
				this.setState({ copied: true });
				setTimeout(() => {
					this.setState({ copied: false });
				}, 1500);
			})
			.catch((err) => {});
	};

	render() {
		const url = window.location.href;
		const title = helper.instagram_email_finder_title;
		const description = helper.instagram_email_finder_description;
		const { data, loader, count, message } = this.props;
		const { copied } = this.state;
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
						<div className="mt-12 text-center pt-12">
							<img
								src={TiktokLogo}
								alt="tiktok"
								width="55"
								height="55"
								className="mx-auto"
							/>
							<h1 className="black sm:text-[35px] text-[30px] text-center mt-6 mb-6 font-semibold">
								Instagram
								<span className="success sm:text-[35px] text-[30px] font-semibold">
									{" "}
									Email{" "}
								</span>
								Finder
							</h1>
							<p className="text-[16px] black">
								Find emails for Instagram influencer today with Influencify.
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
													this.addForm("instagramEmailText", e.target.value);
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
									{!!message && <p className="red mt-4">{message}</p>}
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
							{data && data.user_id && (
								<div className="mt-12 pt-12 items-stretch flex flex-wrap">
									<div className="md:w-6/12 w-full mb-12">
										<div className="rounded-[8px] relative shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] transition-all bg-white p-12 h-full">
											<div className="flex justify-center">
												<div className="w-24 h-24 rounded-full absolute -top-10 bg--lightGray">
													<img
														src={data.picture ? data.picture : avatar}
														onError={({ currentTarget }) => {
															currentTarget.onerror = null;
															currentTarget.src = `${process.env.REACT_APP_BASE_URL}/images/male_avatar.png`;
														}}
														className="w-24 h-24 rounded-full object-cover"
														alt="avatar"
													/>
												</div>
											</div>
											<div className="text-center mt-12">
												<h4 className="text-[18px] black font-normal mt-12">
													{data.fullname}
												</h4>
												<p className="text-center w-full border-b-2 leading-[0.1em] my-12">
													<span className="darkGray font-normal px-[30px] text-[12px]">
														Powered by influencify
													</span>
												</p>
												{data.contacts &&
													data.contacts.length > 0 &&
													data.contacts.filter((i) =>
														["email"].includes(i.type)
													).length > 0 && (
														<>
															<img
																src={Mail}
																alt="mail"
																width="36"
																height="36"
																className="mb-4"
															/>
															<br />
															{data.contacts &&
																data.contacts.length > 0 &&
																data.contacts
																	.filter((i) => ["email"].includes(i.type))
																	.map((contact, key) => (
																		<>
																			<Button
																				onClick={() =>
																					this.handleCopyClick(
																						contact.formatted_value
																					)
																				}
																				key={key}
																				className="px-12 text-white h-14 bg-white border--purple rounded-[8px] inline-flex items-center text-[14px] font-semibold hover:opacity-80"
																				text={
																					copied
																						? "Copied"
																						: "Copy email to clipboard"
																				}
																			/>
																		</>
																	))}
														</>
													)}
											</div>
											<div className="bg-[#0000001f] h-[1px] w-full my-12" />
											<div className="lg:px-12">
												{data.contacts &&
													data.contacts.length > 0 &&
													data.contacts.filter((i) =>
														["phone"].includes(i.type)
													).length > 0 && (
														<div className="flex justify-between mb-4">
															<div className="flex items-center">
																<BsTelephone className="darkGray" />
																<p className="darkGray text-[14px] font-normal ml-2">
																	Phone Number:
																</p>
															</div>
															<div>
																{data.contacts &&
																	data.contacts.length > 0 &&
																	data.contacts
																		.filter((i) => ["phone"].includes(i.type))
																		.map((contact, key) => (
																			<>
																				<Anchor
																					key={key}
																					text={contact.formatted_value}
																					className="text-[15px] font-medium success"
																					href={contact.formatted_value}
																				/>{" "}
																			</>
																		))}
															</div>
														</div>
													)}
												<div className="flex justify-between mb-4">
													<div className="flex items-center">
														<FaHeart className="darkGray" />
														<p className="darkGray text-[14px] font-normal ml-2">
															Connected networks
														</p>
													</div>
													<div>
														<p className="text-[15px] font-medium success">
															{data.contacts &&
																data.contacts.length > 0 &&
																data.contacts
																	.filter((i) =>
																		[
																			"facebook",
																			"instagram",
																			"itunes",
																			"pinterest",
																			"tiktok",
																			"twitter",
																			"youtube",
																			"snapchat",
																			"sayat",
																		].includes(i.type)
																	)
																	.map((contact, key) => (
																		<>
																			<Anchor
																				key={key}
																				target={"_blank"}
																				text={contact.type}
																				rel="noreferrer"
																				className="text-[15px] font-medium success"
																				href={contact.formatted_value}
																			/>{" "}
																		</>
																	))}
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="md:w-6/12 w-full mb-12">
										<div className="md:pl-[4rem] text-left">
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
														Follower growth
													</p>
												</div>
												<div className="flex items-center">
													<IoLockClosedOutline className="success" size={18} />
													<p className="ml-4 black text-[16px] font-normal">
														Brand mentions & #ad performance
													</p>
												</div>
											</div>
											{!token &&
											<>
											<Button
												className="px-12 text-white h-[40px] bg--purple rounded-[8px] inline-flex items-center text-[14px] font-semibold hover:opacity-80  mt-12 mb-4"
												text="View full report"
											/>
											<p className="darkGray font-normal text-[14px]">
												Unlock full report, to see channels audience
												<br /> demographics and in-depth content analytics.
											</p>
											</>
											}
										</div>
									</div>
								</div>
							)}
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
			</>
		);
	}
}
const mapStateToProps = ({ marketingTool }) => {
	return {
		data: marketingTool.instagramEmailData,
		count: marketingTool.instagramEmailCount,
		message: marketingTool.instagramEmailMessage,
		loader: marketingTool.instagramEmailLoader,
		form: marketingTool.form,
	};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const { dispatch } = dispatchProps;
	const { actions } = require("@store/redux/MarketingToolRedux");
	return {
		...ownProps,
		...stateProps,
		search: (data) => {
			return actions.fetchInstagramEmailFinder(dispatch, data);
		},
		addForm: (data) => {
			return actions.addForm(dispatch, data);
		},
		resetEmailFinder: () => {
			dispatch(actions.resetEmailFinder());
		},
	};
};

export default connect(
	mapStateToProps,
	undefined,
	mergeProps
)(InstagramEmailFinder);
