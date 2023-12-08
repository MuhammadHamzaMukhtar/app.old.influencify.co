import React, { Component } from "react";
import { FiX } from "react-icons/fi";
import avatar from "@assets/avatar.png";
import { connect } from "react-redux";
import LinkTo from "@components/global/LinkTo";
import Tooltip from "@components/global/Tooltip";

class SelectedItems extends Component {
  handleRemoveInfluencer = (influencer) => {
    const { removeInfluencer, newCampaignWithSelected, setSelectAll, selected_influencers } = this.props;
    if ((selected_influencers || []).length <= 1) {
      setSelectAll(false)
    }
    removeInfluencer(influencer, newCampaignWithSelected);
  };

  render() {
    const { selected_influencers, campaign_status } = this.props;
    return (
      <div className="py-[8px] bg-white rounded-[8px] divide-y divide-#0000001f">
        {selected_influencers && selected_influencers.length ? (
          selected_influencers.map((influencer, index) => (
            <div
              className="group relative flex items-center justify-start py-[8px] pr-[28px] pl-[16px]"
              key={index}
            >
              <div>
                <LinkTo
                  to="#"
                  text={
                    <img
                      src={
                        influencer.user_profile
                          ? influencer.user_profile.picture
                          : avatar
                      }
                      alt={influencer.user_profile.username}
                      className="w-[52px] rounded-full h-[52px] overflow-hidden"
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = `${process.env.REACT_APP_BASE_URL}/images/male_avatar.png`;
                      }}
                    />
                  }
                />
              </div>
              <div className="ml-[10px] grow">
                <LinkTo
                  to="#"
                  text={
                    <Tooltip
                      trigger={
                        <div className="ml-2">
                          <h6 className="truncate text-[16px]">
                            {" "}
                            {influencer.user_profile.username
                              ? "@" + influencer.user_profile.username
                              : influencer.user_profile.fullname}
                          </h6>
                        </div>
                      }
                      tooltipText={
                        influencer.user_profile.username
                          ? influencer.user_profile.username
                          : influencer.user_profile.fullname
                      }
                      placement="top-left"
                    />
                  }
                />
              </div>
              {campaign_status === "active" &&
                influencer.status &&
                influencer.status !== "requested" &&
                influencer.status !== "waiting" ? (
                <div></div>
              ) : (
                <div className="absolute right-[16px] top-[50%] transform -translate-y-[50%] cursor-pointer">
                  <FiX
                    className="red hidden group-hover:block"
                    onClick={() => this.handleRemoveInfluencer(influencer)}
                    size={16}
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <h3 className="text-center  gray mt-[90px]">Nothing to show</h3>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ campaign }) => {
  return {
    selected_influencers: campaign.selected_influencers,
    campaign_status: campaign.form.campaign_status,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { types } = require("@store/redux/CampaignRedux");
  return {
    ...ownProps,
    ...stateProps,
    removeInfluencer: (influencer, flag) => {
      dispatch({
        type: types.HANDLE_REMOVE_INFLUENCER,
        data: { influencer: influencer, flag: flag },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(React.memo(SelectedItems));
