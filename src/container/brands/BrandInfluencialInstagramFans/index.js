import { Component } from "react";
import { connect } from "react-redux";
import { Tab } from "@headlessui/react";
import { AiOutlineInstagram } from "react-icons/ai";
import InstagramLogo from "@assets/instagram_logo.png";
import * as brandAmbassadorsActions from "@store/actions/BrandAmbassadorsActions";
import * as settingInstagramActions from "@store/actions/SettingInstagramActions";
import * as settingPlatformActions from "@store/actions/SettingPlatformActions";
import {
  HANDLE_SELECT_PAGE,
  HANDLE_CANCEL_CONNECT_INSTAGRAM,
  HANDLE_CLOSE_ERROR_MODAL,
} from "@store/constants/action-types";
import Loader from "@components/global/Loader";
import SelectPage from "react-select";
import InfluencialFollowers from "@components/BrandInfluentialInstagram/InfluencialFollowers";
import InfluencialLikers from "@components/BrandInfluentialInstagram/InfluencialLikers";
import InfluencialMentions from "@components/BrandInfluentialInstagram/InfluencialMentions";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import Emitter from "../../../constants/Emitter";
import Button from "@components/global/Button";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
class OldBrandInfluencialInstagramFans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
    this.page = 1;
    this.likerPage = 1;
  }

  componentDidMount() {
    //this line is commented beacuse no props are pass through url
    // const { type } = this.props.match.params;
    const { sortQuery } = this.props;
    let query = {
      sortQuery: sortQuery,
      platform: "instagram",
    };
    this.props.fetchBrandNotableUsers(query);
    this.props.fetchInfluentialFollowers(this.page, query);
    this.props.fetchInfluentialLikers(this.likerPage, query);
    this.props.fetchCampaginTypes();
    //Influencify.exportsNotableUsers({});
  }

  fetchInfluentialFollowers = () => {
    const { sortQuery } = this.props;
    let query = {
      sortQuery: sortQuery,
      platform: "instagram",
    };
    this.page++;
    this.props.fetchInfluentialFollowers(this.page, query);
  };

  fetchInfluentialLikers = () => {
    const { sortQuery } = this.props;
    let query = {
      sortQuery: sortQuery,
      platform: "instagram",
    };
    this.likerPage++;
    this.props.fetchInfluentialLikers(this.likerPage, query);
  };

  handleChangeFollowerFilter = (value) => {
    let query = {
      sortQuery: value,
      platform: "instagram",
    };
    this.page = 1;
    this.props.fetchInfluentialFollowers(this.page, query);
  };

  handleChangeLikerFilter = (value) => {
    let query = {
      sortQuery: value,
      platform: "instagram",
    };
    this.likerPage = 1;
    this.props.fetchInfluentialLikers(this.likerPage, query);
  };

  connectInstagramAccount = () => {
    let query = {
      platform: "instagram",
    };
    this.props.instagramConnect(query);
  };

  connectInstagramCancel = () => {
    this.props.handleCancelConnectInstagram();
  };

  connectInstagramSubmit = (info) => {
    let query = {
      Page: this.props.selectedPage,
    };
    this.props.brandConnectInstagramSubmit(query);
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
    this.props.addSelectedInfluencers([]);
  };

  disconnectPlatform = () => {
    let query = {
      platform: "instagram",
    };
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to disconnect instagram?",
      icon: "question",
      showCancelButton: true,
      showCloseButton: true,
      cancelButtonText: "No!",
      confirmButtonText: "Yes",
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

  onHideModal = () => {
    this.props.handleCloseErrorModal();
  };

  onChangeTab = () => {
    alert("HH");
  };

  onCodeReceive = async (code) => {
    this.props.instagramOathCode(code);
  };

  permissionDenied = () => {
    Emitter.emit("PERMISSION_POPUP");
  };

  render() {
    var fb_pages = [];
    const { isLoading, refreshData, fbPages, isInstagramConnected, brandInfo, instaUserName } =
      this.props;

    if (isLoading) {
      return (
        <Loader
          className="h-[87vh] w-full flex justify-center items-center"
          size="67"
        />
      );
    }
    if (this.props.fbPages) {
      fb_pages = fbPages.map((data) => ({
        label: data.name,
        value: data.id,
        accessToken: data.access_token
      }));
    }
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Instagram Followers | {process.env.REACT_APP_NAME}</title>
        </Helmet>
        {instaUserName ? (
          <div>
            {/* {brandInfo.is_influencial_not_found_instagram === 1 ? (
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
              <div>
                <Tab.Group
                  defaultIndex={this.state.activeTab}
                  onChange={(index) => {
                    this.handleChange(index);
                  }}
                >
                  <div className="bg-gradient-to-b from-[#f2f2f2] to-[#fff] border-b-[3px] border-[#ccc] min-h-[50px] mb-[42px]">
                    <div className="containers">
                      <div className="flex flex-wrap items-center gap-4">
                          <p className="font-medium flex flex-wrap items-center justify-center mr-4 sm:!mr-12 whitespace-nowrap py-[0.5rem] space-x-2">
                          <span className="bg-[#43e0b7] rounded-[20px] h-[10px] w-[10px] inline-block mr-2"></span>
                          Connected:
                          <span className="ml-1">
                            @{brandInfo?.brand_username}
                          </span>
                        </p>
                        <Tab.List className="flex flex-wrap mb-0">
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
                            Influential Mentions
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
                          platform="instagram"
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
                          platform="instagram"
                          handleChangeLikerFilter={this.handleChangeLikerFilter}
                          fetchInfluentialLikers={this.fetchInfluentialLikers}
                        />
                      </Tab.Panel>
                      <Tab.Panel>
                        <InfluencialMentions platform="instagram" />
                      </Tab.Panel>
                    </Tab.Panels>
                  </div>
                </Tab.Group>
              </div>
            {/* )} */}
          </div>
        ) : (
          <div className="containers h-[90vh] overflow-y-auto">
            <div className="h-full flex items-center justify-center xs:-mt-12 text-center">
              {isInstagramConnected === false ? (
                <div className="sm:w-8/12 mx-auto">
                  <div className="mb-6 ">
                    {this.props.errorsObj.Page ? (
                      <span className="font-bold red">
                        {this.props.errorsObj.Page[0]}
                      </span>
                    ) : (
                      ""
                    )}
                    {this.props.errorsObj.BusinessAccountError ? (
                      <span className="font-bold red">
                        {this.props.errorsObj.BusinessAccountError[0]}
                      </span>
                    ) : (
                      ""
                    )}
                    {this.props.errorsObj.followerLimitError ? (
                      <span className="font-bold red">
                        {this.props.errorsObj.followerLimitError[0]}
                      </span>
                    ) : (
                      ""
                    )}
                    {this.props.errorsObj.something_went_wrong ? (
                      <span className="font-bold red">
                        {this.props.errorsObj.something_went_wrong[0]}
                      </span>
                    ) : (
                      ""
                    )}
                    {this.props.errorsObj.PageNotFound ? (
                      <span className="font-bold red">
                        {this.props.errorsObj.PageNotFound[0]}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <img
                    src={InstagramLogo}
                    alt="instagram"
                    className="rounded-full w-[60px] mx-auto"
                  />
                  <h2 className="my-4 sm:text-[40px] text-[30px]">
                    Reveal all influencers that are already fans of your brand
                    on instagram
                  </h2>
                  <div className="flex justify-center items-center">
                
                  </div>

                  <p className="mt-6">
                    Please Note: you will be redirected to facebook where you
                    can select the instagram business profile
                  </p>
                </div>
              ) : (
                <div>
                  {!fbPages && (<span className="font-bold red">
                    You must have a Facebook page that links with your business Instagram account
                  </span>)}
                  <h4 className="mt-4 text-[20px]">
                    Select the facebook page that is associated with your
                    instagram bussiness account.
                  </h4>
                  <div className="flex flex-wrap">
                    <div className="sm:w-8/12 w-full mt-12 mx-auto">
                      <SelectPage
                        value={this.props.selectedPage}
                        options={fb_pages}
                        isClearable={true}
                        isSearchable={true}
                        className="h-[40px] focus:outline-[#7c3292]"
                        placeholder={"Select Page"}
                        onChange={this.props.handleSelectPage}
                      />
                      {this.props.errorsObj.Page ? (
                        <span className="font-bold red">
                          {this.props.errorsObj.Page[0]}
                        </span>
                      ) : (
                        ""
                      )}
                      {this.props.errorsObj.BusinessAccountError ? (
                        <span className="font-bold red">
                          {this.props.errorsObj.BusinessAccountError[0]}
                        </span>
                      ) : (
                        ""
                      )}
                      {this.props.errorsObj.followerLimitError ? (
                        <span className="font-bold red">
                          {this.props.errorsObj.followerLimitError[0]}
                        </span>
                      ) : (
                        ""
                      )}
                      {this.props.errorsObj.something_went_wrong ? (
                        <span className="font-bold red">
                          {this.props.errorsObj.something_went_wrong[0]}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="text-center">
                    <Button
                      className="mt-6 px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg-[#8d8d8d] text-white hover:opacity-80"
                      onClick={() => this.connectInstagramCancel()}
                      text="Cancel"
                    />
                    <Button
                      className="mt-6 ml-4 px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
                          onClick={() => this.connectInstagramSubmit(brandInfo)}
                      text="Submit"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {/* <ErrorHandlerModal
          show={this.props.is_show_modal}
          error_obj={this.props.error_obj}
          onHide={() => this.onHideModal()}
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
    instaUserName: state.BrandAmbassadorsReducer.instaUserName,
    is_show_modal: state.errorHandler.is_show_modal,
    error_obj: state.errorHandler.error_obj,
    refreshData: state.HeaderReducer.refreshData,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { actions } = require("@store/redux/InfluencialFollowersRedux");
  const { actions: campaignactions } = require("@store/redux/CampaignRedux");

  return {
    instagramConnect: (query) =>
      dispatch(settingPlatformActions.instagramConnect(query)),
    instagramOathCode: (code) =>
      dispatch(settingInstagramActions.brandVerifyInstagramCode(code)),
    brandConnectInstagramSubmit: (query) =>
      dispatch(settingPlatformActions.brandConnectInstagramSubmit(query)),
    handleSelectPage: (event) =>
      dispatch({ type: HANDLE_SELECT_PAGE, payload: event }),
    handleCancelConnectInstagram: () =>
      dispatch({ type: HANDLE_CANCEL_CONNECT_INSTAGRAM }),
    fetchBrandNotableUsers: (query) =>
      dispatch(brandAmbassadorsActions.fetchBrandNotableUsers(query)),
    disconnectPlatform: (data) => {
      actions.disconnectPlatform(dispatch, data, ownProps);
    },
    handleCloseErrorModal: () => dispatch({ type: HANDLE_CLOSE_ERROR_MODAL }),
    addSelectedInfluencers: (data) => {
      campaignactions.addSelectedInfluencers(dispatch, data, "followers");
    },
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
)(OldBrandInfluencialInstagramFans);
