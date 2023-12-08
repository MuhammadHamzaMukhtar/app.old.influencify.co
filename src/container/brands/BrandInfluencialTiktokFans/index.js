import { Component } from "react";
import { connect } from "react-redux";
import { Tab } from "@headlessui/react";
import { FaTiktok } from "react-icons/fa";
import TiktokLogo from "@assets/tiktok_logo.png";
import * as brandAmbassadorsActions from "@store/actions/BrandAmbassadorsActions";
import * as settingPlatformActions from "@store/actions/SettingPlatformActions";
import {
	HANDLE_SELECT_PAGE,
	HANDLE_CANCEL_CONNECT_INSTAGRAM,
	HANDLE_CLOSE_ERROR_MODAL,
} from "@store/constants/action-types";
import Loader from "@components/global/Loader";
import InfluencialFollowers from "@components/BrandInfluentialInstagram/InfluencialFollowers";
import InfluencialLikers from "@components/BrandInfluentialInstagram/InfluencialLikers";
import Swal from "sweetalert2";
import ErrorHandlerModal from "@components/ErrorHandlerModal";
import TikTokOauthPopup from "@components/TikTokOauthPopup";
import { Helmet } from "react-helmet";
import Emitter from "../../../constants/Emitter";
import Api from "@services/axios";
import Button from "@components/global/Button";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}
class BrandInfluencialTiktokFans extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 0,
		};
		this.page = 1;
		this.likerPage = 1;
	}

	componentDidMount() {
		const { sortQuery } = this.props;
		let query = {
			sortQuery: sortQuery,
			platform: "tiktok",
		};
		this.props.fetchBrandNotableUsers(query);
		this.props.fetchInfluentialFollowers(this.page, query);
		this.props.fetchInfluentialLikers(this.likerPage, query);
		this.props.fetchCampaginTypes();
	}

	fetchInfluentialFollowers = () => {
		const { sortQuery } = this.props;
		let query = {
			sortQuery: sortQuery,
			platform: "tiktok",
		};
		this.page++;
		this.props.fetchInfluentialFollowers(this.page, query);
	};

	fetchInfluentialLikers = () => {
		const { sortQuery } = this.props;
		let query = {
			sortQuery: sortQuery,
			platform: "tiktok",
		};
		this.likerPage++;
		this.props.fetchInfluentialLikers(this.likerPage, query);
	};

	handleChangeFollowerFilter = (value) => {
		let query = {
			sortQuery: value,
			platform: "tiktok",
		};
		this.page = 1;
		this.props.fetchInfluentialFollowers(this.page, query);
	};

	handleChangeLikerFilter = (value) => {
		let query = {
			sortQuery: value,
			platform: "tiktok",
		};
		this.likerPage = 1;
		this.props.fetchInfluentialLikers(this.likerPage, query);
	};

	handleChange = (event) => {
		if (event === 0) {
			this.setState({
				activeTab: event,
			});
		}
		if (event === 1) {
			this.setState({
				activeTab: event,
			});
		}
	};

	disconnectPlatform = () => {
		let query = {
			platform: "tiktok",
		};
		Swal.fire({
			title: "Are you sure?",
			text: "Do you want to disconnect tiktok?",
			icon: "question",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: "Yes",
			cancelButtonText: "No!",
			confirmButtonColor: "#7c3292",
			cancelButtonColor: "#f4f4f5",
			customClass: {
				actions: "flex-row-reverse",
				closeButton: "hover:text-[#7c3292]",
				confirmButton: "hover:!shadow-none focus:!shadow-none min-w-[100px]",
				cancelButton:
					"hover:!shadow-none focus:!shadow-none min-w-[100px] !text-[#202020]",
			},
			allowOutsideClick: () => !Swal.isLoading(),
		}).then((result) => {
			if (result.value) {
				this.props.disconnectPlatform(query);
			}
		});
	};

	onHide = () => {
		this.props.handleCloseErrorModal();
	};

	onTiktokConnect = async (code) => {
		if (code) {
			const data = {
				code: code,
			};
			const response = await Api.PlatformDisconnect(data);
			//   await axios.post(
			//   helper.url + "/api/v2/tiktok/connect",
			//   data
			// );
			if (response.data.data.message === "success") {
				const { sortQuery } = this.props;
				let query = {
					sortQuery: sortQuery,
					platform: "tiktok",
				};
				this.props.fetchBrandNotableUsers(query);
				this.props.fetchInfluentialFollowers(this.page, query);
				this.props.fetchInfluentialLikers(this.likerPage, query);
			}
		}
	};

	permissionDenied = () => {
		Emitter.emit("PERMISSION_POPUP");
	};

	render() {
		const { isLoading, refreshData, isInstagramConnected, brandInfo, openId } =
			this.props;

		if (isLoading) {
			return (
				<Loader
					className="h-[87vh] w-full flex justify-center items-center"
					size="67"
				/>
			);
		}
		return (
			<div>
				<Helmet>
					<meta charSet="utf-8" />
					<title>Tiktok Followers | {process.env.REACT_APP_NAME}</title>
				</Helmet>

				{openId ? (
					<div>
						{/* {brandInfo.is_influencial_not_found_tiktok === 1 ? (
							<div className="h-screen">
								<div className="h-full flex items-center justify-center -mt-12">
									<div className="containers">
										<div className="flex items-center">
											<p className="text-[20px]">
												Analyzing account, will notify you as soon as we find
												influencers
											</p>
										</div>
									</div>
								</div>
							</div>
						) : ( */}
						<Tab.Group
							defaultIndex={this.state.activeTab}
							onChange={(index) => {
								this.handleChange(index);
							}}
						>
							<div className="bg-gradient-to-b from-[#f2f2f2] to-[#fff] border-b-[3px] border-[#ccc] min-h-[50px] mb-[42px]">
								<div className="containers">
									<div className="flex flex-wrap items-center mb-4 md:!mb-0">
										<p className="font-medium flex items-center justify-center mr-4 sm:!mr-12 whitespace-nowrap space-x-2">
											<span className="bg-[#43e0b7] rounded-[20px] h-[10px] w-[10px] inline-block mr-2"></span>
											Connected:
											<span>{this.props.userName ? this.props.userName : ""}</span>
										</p>
										<Tab.List className="flex mb-0">
											<Tab
												className={({ selected }) =>
													classNames(
														"mr-[20px] min-w-[80px] text-center relative leading-[33px] text-black  before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] py-[0.5rem] px-[1rem] block before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0",
														selected
															? "font-semibold before:w-full"
															: "font-normal before:w-0"
													)
												}
											>
												Influential Followers
											</Tab>
											<Tab
												className={({ selected }) =>
													classNames(
														"mr-[20px] min-w-[80px] text-center relative leading-[33px] text-black  before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] py-[0.5rem] px-[1rem] block before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0",
														selected
															? "font-semibold before:w-full"
															: "font-normal before:w-0"
													)
												}
											>
												Influential Likers
											</Tab>
										</Tab.List>
										{refreshData.is_admin && (
											<p className="font-medium flex items-center ml-auto">
												<Button
													type="button"
													className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
													onClick={this.disconnectPlatform}
													text="Disconnect"
												/>
											</p>
										)}
									</div>
								</div>
							</div>
							<div className="containers">
								<Tab.Panels className="bg-transparent">
									<Tab.Panel>
										<InfluencialFollowers
											platform="tiktok"
											handleChangeFollowerFilter={
												this.handleChangeFollowerFilter
											}
											fetchInfluentialFollowers={
												this.fetchInfluentialFollowers
											}
										/>
									</Tab.Panel>
									<Tab.Panel>
										<InfluencialLikers
											platform="tiktok"
											handleChangeLikerFilter={this.handleChangeLikerFilter}
											fetchInfluentialLikers={this.fetchInfluentialLikers}
										/>
									</Tab.Panel>
								</Tab.Panels>
							</div>
						</Tab.Group>
						{/* )} */}
					</div>
				) : (
					<div className="containers h-[90vh]">
						<div className="h-full flex items-center justify-center -mt-12 text-center">
							{/* {isInstagramConnected === false ? ( */}
							<div className="sm:w-8/12 mx-auto">
								<img
									src={TiktokLogo}
									alt="tiktok"
									className="rounded-full h-[60px] mx-auto"
								/>
								<h2 className="my-4 text-[40px]">
									Reveal all influencers that are already fans of your brand
									on Tiktok
								</h2>
								{refreshData.is_admin ? (
									<TikTokOauthPopup
										onCode={this.onTiktokConnect}
										onClose={() => { }}
										brandType='brand'
									>
										<Button
											className="px-12 rounded-[8px] h-[45px] text-[14px] inline-flex items-center bg-[#010101] text-white hover:opacity-80"
											prefix={<FaTiktok size={16} />}
											text={
												<span className="ml-2 inline-block text-white">
													Connect Tiktok
												</span>
											}
										/>
									</TikTokOauthPopup>
								) : (
									<Button
										onClick={this.permissionDenied}
										className="px-12 rounded-[8px] h-[45px] text-[14px] inline-flex items-center bg-[#010101] text-white hover:opacity-80"
										prefix={<FaTiktok size={16} />}
										text={
											<span className="ml-2 inline-block text-white">
												Connect Tiktok
											</span>
										}
									/>
								)}

								<p className="mt-6">
									Please Note: your will be redirected to Tiktok where you can
									select the Tiktok Profile
								</p>
							</div>
							{/* ) : (
								<div></div>
							)} */}
						</div>
					</div>
				)}
				{/* <ErrorHandlerModal
					show={this.props.is_show_modal}
					error_obj={this.props.error_obj}
					onHide={this.onHide}
				/> */}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		influencialFollowerLoading:
			state.BrandAmbassadorsReducer.influencialFollowerLoading,
		sortQuery: state.BrandAmbassadorsReducer.sortQuery,
		isLoading: state.SettingPlatformReducer.isLoading,
		fbPages: state.SettingPlatformReducer.fbPages,
		isInstagramConnected: state.SettingPlatformReducer.isInstagramConnected,
		errorsObj: state.SettingPlatformReducer.errorsObj,
		selectedPage: state.SettingPlatformReducer.selectedPage,
		brandInfo: state.BrandAmbassadorsReducer.brandInfo,
		userName: state.BrandAmbassadorsReducer.userName,
		openId: state.BrandAmbassadorsReducer.openId,
		is_show_modal: state.errorHandler.is_show_modal,
		error_obj: state.errorHandler.error_obj,
		refreshData: state.HeaderReducer.refreshData,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/InfluencialFollowersRedux");
	const { actions: campaignactions } = require("@store/redux/CampaignRedux");
	return {
		instagramConnect: (query) =>
			dispatch(settingPlatformActions.instagramConnect(query)),
		brandConnectInstagramSubmit: (query) =>
			dispatch(settingPlatformActions.brandConnectInstagramSubmit(query)),
		handleSelectPage: (event) =>
			dispatch({ type: HANDLE_SELECT_PAGE, payload: event }),
		handleCancelConnectInstagram: () =>
			dispatch({ type: HANDLE_CANCEL_CONNECT_INSTAGRAM }),
		fetchBrandNotableUsers: (query) =>
			dispatch(brandAmbassadorsActions.fetchBrandNotableUsers(query)),
		disconnectPlatform: (data) => {
			actions.disconnectPlatform(dispatch, data);
		},
		handleCloseErrorModal: () => dispatch({ type: HANDLE_CLOSE_ERROR_MODAL }),
		fetchInfluentialFollowers: (page, query) =>
			dispatch(brandAmbassadorsActions.fetchInfluentialFollowers(page, query)),
		fetchInfluentialLikers: (page, query) =>
			dispatch(brandAmbassadorsActions.fetchInfluentialLikers(page, query)),
		fetchCampaginTypes: () => {
			campaignactions.fetchCampaginTypes(dispatch);
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BrandInfluencialTiktokFans);
