import { Component } from "react";
import Button from "@components/global/Button";
import SettingHeader from "@components/InfluencerSettings/SettingHeader";
import SettingInfluencerTopTab from "@components/SettingInfluencerTopTab";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import {
	HANDLE_CHANGE_PUSH_NOTIFY_SUCCESS,
	HANDLE_CHANGE_EMAIL_NOTIFY_SUCCESS,
} from "@store/constants/action-types";
import * as settingNotificationActions from "@store/actions/SettingNotificationActions";
import { FaSpinner } from "react-icons/fa";

class SettingInfluencerNotifications extends Component {

	componentDidMount() {
		this.props.userGeneralNotifications();
	}

	saveChanges = () => {
		let query = {
			userNotifications: this.props.userNotifications,
		};

		this.props.saveChangesNotifications(query);
	};

	render() {
		const url = window.location.href;
		if (localStorage.getItem("role") !== "influencer") {
			window.location.href = "/";
		}
		return (
			<div>
				<Helmet>
					<meta charSet="utf-8" />
					<title>Notifications | Influencify</title>
					<link rel="canonical" href={url} />
				</Helmet>
				<SettingHeader />
				<SettingInfluencerTopTab />
				<div className="containers mb-12">
					<div className="grid grid-cols-12 gap-5">
						<div className="md:col-span-3 sm:col-span-6 lg:col-start-1 sm:col-start-4 col-span-12">
							<Button
								className="w-full mt-12 px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 justify-center"
								onClick={() => this.saveChanges()}
								text={
									this.props.isLoading ? (
										<FaSpinner className="animate-[spin_2s_linear_infinite]" />
									) : (
										"Save Changes"
									)
								}

							/>
						</div>
						<div className="md:col-span-9 col-span-12 mt-12 md:!mt-0">
							<h4 className="mb-4 text-[20px]">Notification Settings</h4>
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3 sm:!p-12 mb-12">
								<div className="flex items-center flex-wrap">
									{this.props.userNotifications &&
									this.props.userNotifications.length
										? this.props.userNotifications.map((notify, index) => (
												<div
													className="flex items-center flex-wrap justify-end w-full mb-[1rem] last:mb-0"
													key={index}
												>
													<div className="md:w-6/12 w-full">
														<p>{notify.notifyTitle}</p>
													</div>
													<div className="w-3/12">
														<label
															htmlFor={"push" + notify.id}
															className="cursor-pointer flex items-center text-[15px] font-normal"
														>
															<input
																id={"push" + notify.id}
																type="checkbox"
																onChange={(e) =>
																	this.props.handlePushChange(e, notify.id)
																}
																checked={notify.isActivePush ? true : false}
																className="hidden peer"
															/>
															<span className="mr-3 peer-checked:bg-[#7c3292] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292] rounded-sm"></span>
															Push
														</label>
													</div>
													<div className="w-3/12">
														<label
															htmlFor={"email" + notify.id}
															className="cursor-pointer flex items-center text-[15px] font-normal"
														>
															<input
																id={"email" + notify.id}
																type="checkbox"
																onChange={(e) =>
																	this.props.handleEmailChange(e, notify.id)
																}
																checked={notify.isActiveEmail ? true : false}
																className="hidden peer"
															/>
															<span className="mr-3 peer-checked:bg-[#7c3292] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292] rounded-sm"></span>
															Email
														</label>
													</div>
												</div>
										  ))
										: ""}
								</div>
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
		isLoading: state.SettingNotificationReducer.isLoading,
		userNotifications: state.SettingNotificationReducer.userNotifications,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		userGeneralNotifications: () =>
			dispatch(settingNotificationActions.userGeneralNotifications()),
		userCampaignNotification: () =>
			dispatch(settingNotificationActions.userCampaignNotification()),
		saveChangesNotifications: (query) =>
			dispatch(settingNotificationActions.saveChangesNotifications(query)),
		handlePushChange: (e, notifyId) =>
			dispatch({
				type: HANDLE_CHANGE_PUSH_NOTIFY_SUCCESS,
				payload: e,
				notifyId: notifyId,
			}),
		handleEmailChange: (e, notifyId) =>
			dispatch({
				type: HANDLE_CHANGE_EMAIL_NOTIFY_SUCCESS,
				payload: e,
				notifyId: notifyId,
			}),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SettingInfluencerNotifications);
