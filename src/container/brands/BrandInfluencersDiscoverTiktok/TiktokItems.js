import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Items from "@components/BrandInfluencerDiscover/Items/Items";
import Sort from "@components/BrandInfluencerDiscover/Filters/Sort";
import SelectedItems from "@components/BrandInfluencerDiscover/Items/SelectedItems";
import Loader from "@components/global/Loader";
import { HANDLE_CLOSE_ERROR_MODAL } from "@store/constants/action-types";
import helper from "../../../constants/helper";
import ErrorHandlerModal from "@components/ErrorHandlerModal";
import Emitter from "../../../constants/Emitter";
import { Disclosure, Transition } from "@headlessui/react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import InfluencerListModal from "@components/InfluencerListModal";
import Button from "@components/global/Button";
import Pagination from "@components/Pagination";
import CampaignWithoutEmailModal from "@components/CampaignWithoutEmailModal";

const TiktokItems = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [toggleButton, setToggleButton] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  const campaignRef = useRef(null);

  const onLoadMore = () => {
    if (props.refreshData.is_admin) {
      const payload = Object.assign({}, props.payload);
      const form = Object.assign({}, props.form);
      payload["paging"]["skip"] += helper.search_results_limit;
      props.searchFilters(payload, form);
      let query = {
        platform: props.platform,
        payload: payload,
        isCreditDeduct: true,
      };
      props.searchInfluencers(query);
    } else {
      Emitter.emit("PERMISSION_POPUP");
    }
  };

  const onPageChanged = (pageData) => {
    if (props.refreshData.is_admin) {
      const payload = Object.assign({}, props.payload);
      const form = Object.assign({}, props.form);
      payload["paging"]["skip"] =
        (pageData?.currentPage || 0) * (pageData?.pageLimit || 0) -
        pageData?.pageLimit;
      form["loadMore"] = true;
      props.searchFilters(payload, form);
      let query = {
        platform: props.platform,
        payload: payload,
        isCreditDeduct: true,
        override_filter: true,
      };
      props.searchInfluencers(query);
    } else {
      Emitter.emit("PERMISSION_POPUP");
    }
  };

  const campaignPopup = (type) => {
    campaignRef?.current?.open(type);
  };

  const campaignWithSelected = (type) => {
    const filter = props.payload.filter.with_contact?.find(
      (i) => i.type == "email"
    );
    if (filter.type == "email" && filter.action == "not") {
      campaignPopup(type);
    } else {
      setIsDisabled(true);
      let query = {
        platform: props.platform,
        selected_influencers: props.selected_influencers,
        campaign_type: type,
      };
      if (props.refreshData.is_admin) {
        props.createCampaignSelected(query, navigate);
      } else {
        Emitter.emit("PERMISSION_POPUP");
      }
    }
  };

  const onHide = () => {
    props.hideCreditsModal();
    props.handleCloseErrorModal();
  };

  const removeAll = () => {
    const { removeAllInfluencers } = props;
    removeAllInfluencers();
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

  const {
    isLoading,
    influencers,
    form,
    selected_influencers,
    newCampaignWithSelected,
    campaign_status,
    influencerTotal,
  } = props;
  return (
    <>
      <div className="flex flex-wrap">
        <div className="lg:w-9/12 md:w-8/12 w-full order-2 md:!order-1 pr-3">
          <div className="pb-12 relative">
            {form.loadMore && influencers.length == 0 ? (
              <div className="py-12">
                <Loader
                  className="h-full w-full flex justify-center items-center"
                  size="67"
                />
              </div>
            ) : (
              <div>
                {influencers && influencers.length ? (
                  <>
                    <Sort />
                    <div className="grid grid-cols-12 gap-5">
                      {influencers.map((influencer, index) => (
                        <div
                          className="mb-4 lg:col-span-4 sm:col-span-6 col-span-12"
                          key={index}
                        >
                          <Items
                            influencer={influencer}
                            newCampaignWithSelected={newCampaignWithSelected}
                            platform={"tiktok"}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
                    We have nothing to show you here.
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="inline-flex items-center justify-center">
            {!isLoading && (influencerTotal || 0) > 12 && (
              <Pagination
                totalRecords={
                  (influencerTotal || 0) <= 24
                    ? influencerTotal || 0
                    : Math.min(influencerTotal || 0, 10000) - 12
                }
                pageLimit={12}
                pageNeighbours={12}
                onPageChanged={onPageChanged}
              />
            )}

            {influencers &&
              influencers.length > 0 &&
              !isLoading &&
              form.loadMore && <Loader size="30" />}
          </div>
          {/* {influencers && influencerTotal > influencers.length && (
						<>
							{influencers && influencers.length && !isLoading ? (
								<div>
									{!form.loadMore ? (
										<div className="text-center">
											<Button
												className="mb-12 px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
												onClick={() => onLoadMore()}
												text="Load More"
											/>
										</div>
									) : (
										<div className="pb-12 relative">
											<div className="py-12">
												<Loader
													className="h-full w-full flex justify-center items-center"
													size="67"
												/>
											</div>
										</div>
									)}
								</div>
							) : (
								""
							)}
						</>
					)} */}
        </div>
        {selected_influencers && selected_influencers.length ? (
          <div className="lg:w-3/12 md:w-4/12 w-full order-1 md:!order-2 pl-3">
            {newCampaignWithSelected && (
              <div className="text-center mb-4 shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mt-[80px]">
                <Disclosure defaultOpen={true}>
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
                                      disabled={isDisabled}
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
            )}
            <div className="min-h-[85px]">
              <SelectedItems
                newCampaignWithSelected={newCampaignWithSelected}
              />
            </div>
            {campaign_status !== "active" && (
              <p
                className="text-right p-[10px] cursor-pointer underline text-[#9ea1b2]"
                onClick={() => removeAll()}
              >
                Remove All
              </p>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      {/* <ErrorHandlerModal
				show={props.is_show_modal && props.error_obj}
				error_obj={props.error_obj}
				onHide={() => onHide()}
			/> */}
      <InfluencerListModal
        show={showModal}
        platform={props.platform}
        closeModal={closeInfluenceModalList}
        selectedInfluencers={selected_influencers}
        brandLists={props.brandLists}
        searchBrand={props.searchBrand}
        createBrand={props.addNewBrand}
        addInfluencer={props.addInfluencerToList}
      />
      <CampaignWithoutEmailModal ref={campaignRef} onClose={() => {}} />
    </>
  );
};

const mapStateToProps = ({
  influencerSearch,
  errorHandler,
  campaign,
  HeaderReducer,
  brandList,
}) => {
  return {
    isLoading: influencerSearch.isLoading,
    influencers: influencerSearch.influencers,
    platform: influencerSearch.platform,
    payload: influencerSearch.payload,
    form: influencerSearch.form,
    influencerTotal: influencerSearch.influencerTotal,
    is_show_modal: errorHandler.is_show_modal,
    error_obj: errorHandler.error_obj,
    selected_influencers: campaign.selected_influencers,
    campaign_status: campaign.form.campaign_status,
    refreshData: HeaderReducer.refreshData,
    brandLists: brandList.brandlists,
    campaign_types: campaign.campaign_types,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions, types } = require("@store/redux/InfluencerSearchRedux");
  const {
    actions: campaignactions,
    types: campaigntypes,
  } = require("@store/redux/CampaignRedux");
  const { actions: brandlistactions } = require("@store/redux/BrandListRedux");
  return {
    ...ownProps,
    ...stateProps,
    searchFilters: (payload, form) => {
      actions.searchFilters(dispatch, payload, form);
    },
    searchInfluencers: (data) => {
      actions.searchInfluencers(dispatch, data);
    },
    hideCreditsModal: () => dispatch({ type: types.HANDLE_HIDE_MODAL }),
    handleCloseErrorModal: () => dispatch({ type: HANDLE_CLOSE_ERROR_MODAL }),
    createCampaignSelected: (data, navigate) => {
      campaignactions.createCampaignSelected(
        dispatch,
        ownProps,
        data,
        navigate
      );
    },
    removeAllInfluencers: () => {
      dispatch({
        type: campaigntypes.HANDLE_REMOVE_ALL_INFLUENCERS,
        data: { type: "discover" },
      });
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

export default connect(mapStateToProps, undefined, mergeProps)(TiktokItems);
