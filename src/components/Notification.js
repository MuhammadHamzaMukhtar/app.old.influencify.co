import { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Transition, Popover } from "@headlessui/react";
import avatar from "@assets/avatar.png";
import { connect } from "react-redux";
import Bell from "@assets/bell.png";
import {
  HANDLE_CHECK_NOTIFICATION_SUCCESS,
  BRAND_CHANGE_CAMPAING_DROPDOWN_SUCCESS,
  HANDLE_CHANGE_CAMPAIGN_ID,
} from "@store/constants/action-types";
import * as headerActions from "@store/actions/HeaderActions";
import { FaSpinner } from "react-icons/fa";

class Notification extends Component {
  _handleNotificationSelection = (e, notification) => {
    let status = e.target.checked;
    this.props.handleChange(status, notification);
  };

  readAsMarkNotifications = () => {
    let query = {
      readNotifications: this.props.checkedNotifications,
    };
    if (this.props.currentLoggedUser.role === "influencer") {
      this.props.markAsReadInfluencerNotifications(query);
    } else {
      this.props.markAsReadNotifications(query);
    }
  };

  readAsMarkAllNotifications = () => {
    let query = {
      readNotifications: this.props.notifications,
    };
    if (this.props.currentLoggedUser.role === "influencer") {
      this.props.markAsReadInfluencerNotifications(query);
    } else {
      this.props.markAsReadNotifications(query);
    }
  };

  handleBrandClick = (id) => {
    // if (id) {
    // 	this.props.handleChangeDropdown(id);
    // 	let query = {
    // 		id: id,
    // 		type: type,
    // 	};
    // 	this.props.brandNotifyPush(query, this.props.navigate);
    // }
    let query = {
      readNotifications: [{ id: id }],
      flag: "brand",
    };
    this.props.markAsReadNotifications(query);
  };

  handleInfluencerClick = (id) => {
    // this.props.handleChangeNotify(id);
    // let query = {
    // 	id: id,
    // 	type: type,
    // };
    // this.props.influencerNotifyPush(query, this.props.navigate);
    let query = {
      readNotifications: [{ id: id }],
      flag: "influencer",
    };
    this.props.markAsReadInfluencerNotifications(query);
  };

  render() {
    const {
      currentLoggedUser,
      fetchInfluencerNotifications,
      fetchNotifications,
      isLoading,
      campaign,
    } = this.props;
    return (
      <Popover as="div" className="bg-white flex items-center relative">
        <Popover.Button className="bg-whte rounded-md inline-flex items-center justify-center focus-visible:outline-0 relative">
          <img
            src={Bell}
            alt="notification"
            className=" w-[20px] h-[20px]"
            onClick={
              currentLoggedUser.role === "influencer"
                ? fetchInfluencerNotifications
                : fetchNotifications
            }
          />
          {currentLoggedUser && currentLoggedUser.notificationCount ? (
            <span
              className="h-[20px] w-[20px] flex items-center justify-center text-white bg-[#fd2965] rounded-full absolute top-[-10px] right-[-10px] text-[9px]"
              onClick={
                currentLoggedUser.role === "influencer"
                  ? fetchInfluencerNotifications
                  : fetchNotifications
              }
            >
              {this.props.currentLoggedUser.notificationCount}
            </span>
          ) : (
            ""
          )}
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel className="absolute top-full right-0 bg-white z-10 mt-4 w-screen transform lg:translate-x-0 xs:translate-x-[100px] translate-x-[130px] lg:max-w-[47rem] md:max-w-[560px] sm:max-w-[450px] max-w-[320px] p-0 overflow-x-auto">
            {({ close }) => (
              <>
                <div className="rounded-[8px] bg-white divide-y-2 divide-gray-50 border h-[55vh] overflow-y-auto">
                  <div className="py-[8px] relative">
                    <div className="sticky top-0 py-[8px] px-[16px] flex w-full items-center flex-start bg-white z-50">
                      <div className="shrink-0 mr-4">
                        <h6 className="font-medium text-[16px]">
                          Notifications
                        </h6>
                      </div>
                      {this.props.checkedNotifications &&
                      this.props.checkedNotifications.length > 0 ? (
                        <div className="flex shrink-0 cursor-pointer">
                          <div
                            onClick={() => this.readAsMarkNotifications()}
                            className="success"
                          >
                            <u>Mark as Read</u>
                          </div>
                          <span className="mx-3">|</span>
                        </div>
                      ) : (
                        ""
                      )}
                      {this.props.notifications &&
                      this.props.notifications.length > 0 ? (
                        <div className="shrink-0 cursor-pointer">
                          <div
                            className="success"
                            onClick={() => this.readAsMarkAllNotifications()}
                          >
                            <u>Mark all as read</u>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {/* {this.props.role === "influencer" ? (
												<button
													className="bg-transparent p-0 inline-block ml-auto"
													onClick={close}
												>
													<div className="grow text-right">
														<NavLink
															to="/influencer/setting-influencer-notifications"
															className="success"
														>
															<u>Settings</u>
														</NavLink>
													</div>
												</button>
											) : (
												""
											)} */}
                      {this.props.role === "brand" ? (
                        <button
                          className="bg-transparent p-0 inline-block ml-auto"
                          onClick={close}
                        >
                          <div className="grow text-right">
                            <NavLink to="/account" className="success">
                              <u>Account</u>
                            </NavLink>
                          </div>
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="bg-[#0000001f] h-[1px] w-full" />
                    {isLoading ? (
                      <div className="w-full flex justify-center items-center h-[40vh] overflow-hidden">
                        <FaSpinner
                          className="animate-[spin_2s_linear_infinite] w-full flex justify-center items-center pink"
                          size="57"
                        />
                      </div>
                    ) : this.props.notifications &&
                      this.props.notifications.length ? (
                      this.props.notifications.map((notification, index) => (
                        <div key={index}>
                          {notification.receiverRole === "influencer" ? (
                            <div className="py-[8px] px-[16px] flex relative w-full items-center flex-start ">
                              <label
                                htmlFor={`notification` + notification.id}
                                className="cursor-pointer flex items-center text-[15px] font-normal"
                              >
                                <input
                                  id={`notification-` + notification.id}
                                  type="checkbox"
                                  name={notification.id}
                                  onChange={(e) =>
                                    this._handleNotificationSelection(
                                      e,
                                      notification
                                    )
                                  }
                                  // value={}
                                  className="mr-3 bg-white cursor-pointer checked:accent-[#7c3292] h-[16px] w-[16px] inline-block !border-2 !border-[#7c3292] rounded-sm"
                                />
                                {/* <span className="mr-3 peer-checked:bg-[#7c3292] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292] rounded-sm"></span> */}
                              </label>
                              <div className="min-w-[56px] shrink-0">
                                <img
                                  src={
                                    notification.receiverAvatar
                                      ? notification.receiverAvatar
                                      : avatar
                                  }
                                  alt={notification.brandName}
                                  className="rounded-full w-[52px]"
                                />
                              </div>
                              <div className="grow max-w-[300px] ml-[10px]">
                                <h6 className="font-medium text-[16px]">
                                  {notification.brandName}
                                </h6>
                                <span className="gray mt-[5px] leading-[15px] inline-block font-light break-all">
                                  {notification.InfluencerName} -{" "}
                                  {notification.CampaignName}
                                </span>
                              </div>
                              <Link
                                onClick={() => {
                                  this.handleInfluencerClick(notification.id);
                                  close();
                                }}
                                to={
                                  notification.notifyType === "task" ||
                                  notification.notifyType === "bookingAccepted"
                                    ? `influencer/influencer-booking/${notification.CampaignId}?tab=task`
                                    : notification.notifyType === "chatMessage"
                                    ? `influencer/influencer-booking/${notification.CampaignId}?tab=message`
                                    : `influencer/influencer-booking/${notification.CampaignId}`
                                }
                                className="grow max-w-[200px] ml-[10px] cursor-pointer"
                                // onClick={() =>
                                // 	this.handleInfluencerClick(
                                // 		notification.CampaignId,
                                // 		notification.notifyType
                                // 	)
                                // }
                              >
                                <h6 className="font-medium text-[16px]">
                                  {notification.data}
                                </h6>
                                <span className="gray mt-[5px] leading-[15px] inline-block font-light">
                                  {notification.createdAt}
                                </span>
                              </Link>
                            </div>
                          ) : (
                            ""
                          )}

                          {notification.receiverRole === "brand" ? (
                            <div className="py-[8px] px-[16px] flex relative w-full items-center flex-start ">
                              <label
                                htmlFor={`notification` + notification.id}
                                className="cursor-pointer flex items-center text-[15px] font-normal"
                              >
                                <input
                                  id={`notification-` + notification.id}
                                  type="checkbox"
                                  name={notification.id}
                                  onChange={(e) =>
                                    this._handleNotificationSelection(
                                      e,
                                      notification
                                    )
                                  }
                                  className="mr-3 bg-white cursor-pointer checked:accent-[#7c3292] h-[16px] w-[16px] inline-block !border-2 !border-[#7c3292] rounded-sm"
                                />
                                {/* <span className="mr-3 peer-checked:bg-[#7c3292] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292] rounded-sm"></span> */}
                              </label>
                              <div className="min-w-[56px] shrink-0">
                                <img
                                  src={
                                    notification.receiverAvatar
                                      ? notification.receiverAvatar
                                      : avatar
                                  }
                                  alt={notification.InfluencerName}
                                  className="rounded-full w-[52px]"
                                />
                              </div>

                              <div className="grow max-w-[300px] ml-[10px]">
                                <h6 className="font-medium text-[16px]">
                                  {notification.InfluencerName}
                                </h6>
                                <span className="gray mt-[5px] leading-[15px] inline-block font-light break-all">
                                  {notification.brandName} -{" "}
                                  {notification.CampaignName}
                                </span>
                              </div>
                              <Link
                                onClick={() => {
                                  this.handleBrandClick(notification.id);
                                  close();
                                }}
                                to={
                                  notification.notifyType === "taskSubmitted"
                                    ? `brand/brand-booking/${notification.CampaignId}?tab=content&subTab=pending`
                                    : notification.notifyType ===
                                      "bookingAccepted"
                                    ? `brand/brand-booking/${notification.CampaignId}?tab=influencers&subTab=inprogress`
                                    : notification.notifyType === "chatMessage"
                                    ? `brand/brand-booking/${notification.CampaignId}?tab=message`
                                    : notification.notifyType ===
                                      "quoteSubmited"
                                    ? `brand/brand-booking/${notification.CampaignId}?tab=influencers&subTab=waiting`
                                    : notification.notifyType ===
                                      "bookingRejected"
                                    ? `brand/brand-booking/${notification.CampaignId}?tab=influencers&subTab=rejected`
                                    : notification.notifyType ===
                                      "paymentAccepted"
                                    ? `brand/brand-booking/${notification.CampaignId}?tab=influencers&subTab=closed`
                                    : notification.notifyType ===
                                      "shopifyProducts"
                                    ? "/products"
                                    : `brand/brand-booking/${notification.CampaignId}`
                                }
                                className="grow max-w-[200px] ml-[10px] cursor-pointer"
                                // onClick={() =>
                                // 	this.handleBrandClick(
                                // 		notification.CampaignId,
                                // 		notification.notifyType
                                // 	)
                                // }
                              >
                                <h6 className="font-medium text-[16px]">
                                  {notification.data}
                                </h6>
                                <span className="gray text-[13px]">
                                  {notification.createdAt}
                                </span>
                              </Link>
                            </div>
                          ) : (
                            ""
                          )}
                          <div className="bg-[#0000001f] h-[1px] w-[91%] ml-auto" />
                        </div>
                      ))
                    ) : (
                      <div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px] lh-54">
                        We have nothing to show you here.
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.HeaderReducer.isLoadingNotification,
    notifications: state.HeaderReducer.notifications,
    checkedNotifications: state.HeaderReducer.checkedNotifications,
    role: localStorage.role,
    campaign: state.BrandBookingCampaignReducer.campaign,
    currentLoggedUser: state.HeaderReducer.currentLoggedUser,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchNotifications: () => dispatch(headerActions.fetchNotifications()),
    fetchInfluencerNotifications: () =>
      dispatch(headerActions.fetchInfluencerNotifications()),
    handleChange: (status, notification) =>
      dispatch({
        type: HANDLE_CHECK_NOTIFICATION_SUCCESS,
        payload: { notification: notification, status: status },
      }),
    markAsReadNotifications: (query) =>
      dispatch(headerActions.markAsReadNotifications(query)),
    markAsReadInfluencerNotifications: (query) =>
      dispatch(headerActions.markAsReadInfluencerNotifications(query)),
    brandNotifyPush: (query, navigate) =>
      dispatch(headerActions.brandNotifyPush(query, navigate, ownProps)),
    influencerNotifyPush: (query, navigate) =>
      dispatch(headerActions.influencerNotifyPush(query, navigate, ownProps)),
    handleChangeDropdown: (id) =>
      dispatch({
        type: BRAND_CHANGE_CAMPAING_DROPDOWN_SUCCESS,
        payload: id,
      }),
    handleChangeNotify: (id) =>
      dispatch({ type: HANDLE_CHANGE_CAMPAIGN_ID, payload: id }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
