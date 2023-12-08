import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Items from "./Items";
import SelectedItems from "./SelectedItems";
import Sort from "../Filters/Sort";
import Loader from "@components/global/Loader";
import { HANDLE_CLOSE_ERROR_MODAL } from "@store/constants/action-types";
// import { withRouter } from "react-router";
import ErrorHandlerModal from "../../ErrorHandlerModal";
import { FaSpinner } from "react-icons/fa";
import Emitter from "../../../constants/Emitter";
import { Disclosure, Transition } from "@headlessui/react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Button from "@components/global/Button";
import InfluencerListModal from "../../InfluencerListModal";
import Pagination from "@components/Pagination";


const AnalyzerItems = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [toggleButton, setToggleButton] = useState(false);
  const navigate = useNavigate();

  const campaignWithSelected = (type) => {
    let query = {
      platform: props.platform,
      selected_influencers: props.selected_influencers,
      campaign_type: type,
      type: "analyzer",
    };
    if (props.refreshData.is_admin) {
      props.createCampaignSelected(query, navigate);
    } else {
      Emitter.emit("PERMISSION_POPUP");
    }
  };

  const onHide = () => {
    props.handleCloseErrorModal();
  };

  const removeAll = () => {
    const { removeAllInfluencers } = props;
    removeAllInfluencers();
  };

  const resetPage = () => {
    props.resetPage();
  };

  const selectAllInfluencers = (e) => {
    props.addSelectedInfluencers(e.target.checked ? props.influencers : []);
  };

  const closeInfluenceModalList = () => {
    setShowModal(false);
  };

  const showInfluencerList = () => {
    if (props.refreshData.is_admin) {
      setShowModal(true);
      let query = {
        platform: props.platform,
      };
      props.fetchBrandLists(query);
    } else {
      Emitter.emit("PERMISSION_POPUP");
    }
  };

  const onPageChanged = (pageData) => {
    props.loadMore(pageData?.currentPage)
  }

  const {
    analyzedUsersLoading,
    influencers,
    selected_influencers,
    analyzedMeta,
    loadMoreLoading,
  } = props;

  return (
    <>
      <div className="containers pt-12">
        <div className="flex flex-wrap">
          <div className="lg:w-9/12 md:w-8/12 w-full order-2 md:!order-1 pr-3">
            <div className="relative">
            <div className="mb-4">
              <h1 className='font-bold text-2xl'>Past Reports</h1>
            </div>
                <div>
                  {(influencers || []).length ? (
                    <>
                      <Sort
                        resetPage={resetPage}
                        AnalyzedUsers={props.influencers}
                        platform={props.platform}
                        totalInfluencers={props.influencers.length}
                      />
                      <div className="mb-6 flex items-center">
                        <label
                          htmlFor="selectall"
                          className="cursor-pointer flex items-center text-[15px] font-normal"
                        >
                          <input
                            id="selectall"
                            type="checkbox"
                            onChange={(event) => selectAllInfluencers(event)}
                            className="hidden peer"
                          />
                          <span className="mr-3 peer-checked:bg-[#7c3292] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292] rounded-sm"></span>
                        </label>
                        <span className="pl-0">Select all</span>
                      </div>
                      <div className="grid grid-cols-12 gap-5">
                        {influencers.map((influencer, index) => (
                          <div
                            className="mb-4 lg:col-span-4 sm:col-span-6 col-span-12"
                            key={index}
                          >
                            <Items influencer={influencer} />
                          </div>
                        ))}
                      </div>
                      <div className="inline-flex items-center justify-center mt-8">
                      {(analyzedMeta?.total || 0)>12 &&
                      <Pagination 
                          totalRecords={analyzedMeta?.total}
                          pageLimit={12}
                          pageNeighbours={12}
                          onPageChanged={onPageChanged}
                      />
                      }

                      {analyzedMeta && analyzedMeta.total>0   && loadMoreLoading && 
                          <Loader
                            size="30"
                          />}

                      </div>
                    </>
                  ) : (
                    <div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
                      We have nothing to show you here.
                    </div>
                  )}
                </div>

                {analyzedUsersLoading &&
                <div className="py-12">
                  <Loader
                    className="h-[40vh] w-full flex justify-center items-center"
                    size="67"
                  />
                </div>
                }
              
            </div>
          </div>
          {selected_influencers && selected_influencers.length ? (
            <div className="lg:w-3/12 md:w-4/12 w-full order-1 md:!order-2 pl-3">
              <div className="text-center mb-4 shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mt-[125px]">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="w-full">
                        <div className="flex items-center justify-between w-full">
                          <p className="font-medium">Bulk Actions</p>
                          <FiChevronDown
                            size={20}
                            className={`${
                              open ? "rotate-180 " : ""
                            } transition transform`}
                          />
                        </div>
                      </Disclosure.Button>

                      <Transition
                        enter="transition duration-[500ms] ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-[75ms] ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Disclosure.Panel>
                          <div className="w-full mt-6">
                            <Button
                              className="px-4 rounded-[8px] h-[40px] text-[14px] inline-flex justify-center border-[1px] items-center bg-white border-[#7c3292] hover:opacity-80 w-full black"
                              onClick={() => setToggleButton(!toggleButton)}
                              text="New Campaign With Selected"
                              suffix={
                                toggleButton ? (
                                  <FiChevronUp />
                                ) : (
                                  <FiChevronDown />
                                )
                              }
                            />

                            {toggleButton && (
                              <div>
                                {props.campaign_types &&
                                  props.campaign_types.map((item, index) => (
                                    <Button
                                      key={index}
                                      onClick={() =>
                                        campaignWithSelected(item.type_name)
                                      }
                                      className="px-12 rounded-[8px] h-[40px] text-[14px] justify-center inline-flex items-center bg--purple text-white hover:opacity-80 w-full mt-2"
                                      text={item.type_button_text}
                                    />
                                  ))}
                              </div>
                            )}
                            <div className="bg-[#0000001f] h-[1px] my-2 w-full" />
                            <Button
                              onClick={showInfluencerList}
                              className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex justify-center items-center bg--purple text-white hover:opacity-80 w-full"
                              text="Add to list"
                            />
                          </div>
                        </Disclosure.Panel>
                      </Transition>
                    </>
                  )}
                </Disclosure>
              </div>
              <div className="min-h-[85px]">
                <SelectedItems />
              </div>
              <p
                className="text-right p-[10px] cursor-pointer underline text-[#9ea1b2]"
                onClick={removeAll}
              >
                Remove All
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
        {/* <ErrorHandlerModal
          show={props.is_show_modal}
          error_obj={props.error_obj}
          onHide={() => onHide()}
        /> */}
        <InfluencerListModal
          show={showModal}
          platform={props.platform}
          closeModal={closeInfluenceModalList}
          selectedInfluencers={props.selected_influencers}
          brandLists={props.brandLists}
          searchBrand={props.searchBrand}
          createBrand={props.addNewBrand}
          addInfluencer={props.addInfluencerToList}
          analyzer={true}
        />
      </div>
    </>
  );
};

const mapStateToProps = ({
  campaign,
  errorHandler,
  influencerAnalyzer,
  HeaderReducer,
  brandList,
}) => {
  return {
    analyzedUsersLoading: influencerAnalyzer.analyzedUsersLoading,
    analyzedMeta: influencerAnalyzer.analyzedMeta,
    loadMoreLoading: influencerAnalyzer.loadMoreLoading,
    influencers: influencerAnalyzer.analyzedUsers,
    platform: influencerAnalyzer.platform,
    selected_influencers: campaign.selected_analyzer_influencers,
    is_show_modal: errorHandler.is_show_modal,
    error_obj: errorHandler.error_obj,
    refreshData: HeaderReducer.refreshData,
    brandLists: brandList.brandlists,
    campaign_types: campaign.campaign_types,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const {
    actions: campaignactions,
    types: campaigntypes,
  } = require("@store/redux/CampaignRedux");
  const { actions: brandlistactions } = require("@store/redux/BrandListRedux");
  return {
    ...ownProps,
    ...stateProps,
    removeAllInfluencers: () => {
      dispatch({
        type: campaigntypes.HANDLE_REMOVE_ALL_INFLUENCERS,
        data: { type: "analyzer" },
      });
    },
    handleCloseErrorModal: () => dispatch({ type: HANDLE_CLOSE_ERROR_MODAL }),
    createCampaignSelected: (data, navigate) => {
      campaignactions.createCampaignSelected(
        dispatch,
        ownProps,
        data,
        navigate
      );
    },
    addSelectedInfluencers: (data) => {
      campaignactions.addSelectedInfluencers(dispatch, data, "analyzer");
    },
    fetchBrandLists: (data) => {
      brandlistactions.fetchBrandLists(dispatch, data);
    },
    searchBrand: (data) => {
      brandlistactions.searchBrand(dispatch, data);
    },
    addNewBrand: (data) => {
      brandlistactions.addNewBrand(dispatch, data);
    },
    addInfluencerToList: (data) => {
      brandlistactions.addInfluencersToList(dispatch, data);
    },
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(AnalyzerItems);
