import { Component } from "react";
import { connect } from "react-redux";
import { Tab } from "@headlessui/react";
import YoutubeLogo from "@assets/youtube_logo.png";
import InfluencialFollowers from "@components/BrandInfluentialInstagram/InfluencialFollowers";
import InfluencialLikers from "@components/BrandInfluentialInstagram/InfluencialLikers";
import * as brandAmbassadorsActions from "@store/actions/BrandAmbassadorsActions";
import Loader from "@components/global/Loader";
import Swal from "sweetalert2";
import GoogleOauthPopup from "@components/GoogleOauthPopup";
import { Helmet } from "react-helmet";
import Emitter from "../../../constants/Emitter";
import Google_Signin_Button from "@assets/btn_google_signin.png";
import Button from "@components/global/Button";
import ErrorHandlerModal from "@components/ErrorHandlerModal";
import { HANDLE_CLOSE_ERROR_MODAL } from "@store/constants/action-types";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

class BrandInfluencialYoutubeFans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "InfluencialFollowers",
    };
    this.page = 1;
    this.likerPage = 1;
  }

  componentDidMount() {
    const { sortQuery } = this.props;
    let query = {
      sortQuery: sortQuery,
      platform: "youtube",
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
      platform: "youtube",
    };
    this.page++;
    this.props.fetchInfluentialFollowers(this.page, query);
  };

  fetchInfluentialLikers = () => {
    const { sortQuery } = this.props;
    let query = {
      sortQuery: sortQuery,
      platform: "youtube",
    };
    this.likerPage++;
    this.props.fetchInfluentialLikers(this.likerPage, query);
  };

  handleChangeFollowerFilter = (value) => {
    let query = {
      sortQuery: value,
      platform: "youtube",
    };
    this.page = 1;
    this.props.fetchInfluentialFollowers(this.page, query);
  };

  handleChangeLikerFilter = (value) => {
    let query = {
      sortQuery: value,
      platform: "youtube",
    };
    this.likerPage = 1;
    this.props.fetchInfluentialLikers(this.likerPage, query);
  };

  onGoogleConnect = async (code) => {
    const { sortQuery } = this.props;
    if (code) {
      let query = {
        sortQuery: sortQuery,
        platform: "youtube",
      };
      this.props.fetchBrandNotableUsers(query);
      this.props.fetchInfluentialFollowers(this.page, query);
      this.props.fetchInfluentialLikers(this.likerPage, query);
    }
  };

  disconnectPlatform = () => {
    let query = {
      platform: "youtube",
    };
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to disconnect youtube?",
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

  permissionDenied = () => {
    Emitter.emit("PERMISSION_POPUP");
  };

  onHide = () => {
    this.props.handleCloseErrorModal();
  };

  render() {
    const { brandInfo, isLoading, refreshData, channelId } = this.props;
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
          <title>Youtube Followers | {process.env.REACT_APP_NAME}</title>
        </Helmet>
        {channelId ? (
          <div>
            <Tab.Group defaultIndex={this.state.activeTab}>
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
                      platform="youtube"
                      handleChangeFollowerFilter={
                        this.handleChangeFollowerFilter
                      }
                      fetchInfluentialFollowers={this.fetchInfluentialFollowers}
                    />
                  </Tab.Panel>
                  <Tab.Panel>
                    <InfluencialLikers
                      platform="youtube"
                      handleChangeLikerFilter={this.handleChangeLikerFilter}
                      fetchInfluentialLikers={this.fetchInfluentialLikers}
                    />
                  </Tab.Panel>
                </Tab.Panels>
              </div>
            </Tab.Group>
          </div>
        ) : (
          <div className="containers h-[90vh]">
            <div className="h-full flex items-center justify-center -mt-12 text-center">
              <div className="sm:w-8/12 mx-auto">
                <img
                  src={YoutubeLogo}
                  alt="youtube"
                  className="rounded-full mx-auto w-[60px]"
                />
                <h2 className="my-4 text-[40px]">
                  Reveal all influencers that are already fans of your brand on
                  Youtube
                </h2>
                {refreshData.is_admin ? (
                  <GoogleOauthPopup
                    scope={process.env.REACT_APP_GOOGLE_YOUTUBE_SCOPE}
                    redirect_uri={
                      process.env.REACT_APP_GOOGLE_YOUTUBE_REDIRECT_URI
                    }
                    onCode={this.onGoogleConnect}
                    onClose={(e) => console.log("")}
                    brandType='brand'
                  >
                    <img
                      className="cursor-pointer w-[30%] mx-auto"
                      src={Google_Signin_Button}
                      alt="Google Signin Button"
                    />
                  </GoogleOauthPopup>
                ) : (
                  <img
                    className="cursor-pointer w-[30%] mx-auto"
                    src={Google_Signin_Button}
                    onClick={this.permissionDenied}
                    alt="Google Signin Button"
                  />
                )}

                <p className="mt-6">
                  Please Note: your will be redirected to Google login.
                </p>
              </div>
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

const mapStateToProps = ({
  BrandAmbassadorsReducer,
  SettingPlatformReducer,
  HeaderReducer,
  errorHandler
}) => {
  return {
    influencialFollowerLoading:
      BrandAmbassadorsReducer.influencialFollowerLoading,
    sortQuery: BrandAmbassadorsReducer.sortQuery,
    brandInfo: BrandAmbassadorsReducer.brandInfo,
    userName: BrandAmbassadorsReducer.userName,
    channelId: BrandAmbassadorsReducer.channelId,
    isLoading: SettingPlatformReducer.isLoading,
    refreshData: HeaderReducer.refreshData,
    error_obj: errorHandler.error_obj,
    is_show_modal: errorHandler.is_show_modal,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { actions } = require("@store/redux/YoutubeAuthRedux");
  const { actions: campaignactions } = require("@store/redux/CampaignRedux");
  const {
    actions: influencialactions,
  } = require("@store/redux/InfluencialFollowersRedux");
  return {
    fetchBrandNotableUsers: (query) => {
      dispatch(brandAmbassadorsActions.fetchBrandNotableUsers(query));
    },
    connectYoutube: () => {
      actions.connectYoutube(dispatch);
    },
    disconnectPlatform: (data) => {
      influencialactions.disconnectPlatform(dispatch, data);
    },
    fetchInfluentialFollowers: (page, query) =>
      dispatch(brandAmbassadorsActions.fetchInfluentialFollowers(page, query)),
    fetchInfluentialLikers: (page, query) =>
      dispatch(brandAmbassadorsActions.fetchInfluentialLikers(page, query)),
    fetchCampaginTypes: () => {
      campaignactions.fetchCampaginTypes(dispatch);
    },
    handleCloseErrorModal: () => dispatch({ type: HANDLE_CLOSE_ERROR_MODAL }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BrandInfluencialYoutubeFans);
