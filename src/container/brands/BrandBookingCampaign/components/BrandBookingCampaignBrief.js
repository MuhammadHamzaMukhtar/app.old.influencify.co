import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "@components/global/Loader";
import DOMPurify from "dompurify";
import LinkTo from "@components/global/LinkTo";

class BrandBookingCampaignBrief extends Component {
  createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  render() {
    if (this.props.isLoading) {
      return (
        <Loader
          className="h-[50vh] w-full flex justify-center items-center"
          size="67"
        />
      );
    }

    return (
      <div>
        <div className="brief-page w-full">
          <div className="grid grid-cols-12 gap-5">
            <div className="sm:col-span-6 col-span-12 flex flex-col">
              <h4 className="mb-2 text-[18px]">Instructions</h4>
              <div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] mb-4 p-4 h-full">
                <div
                  dangerouslySetInnerHTML={this.createMarkup(
                    this.props.campaign.campaignInstruction
                  )}
                ></div>
              </div>
            </div>
            <div className="sm:col-span-6 col-span-12 flex flex-col">
              <h4 className="mb-2 text-[18px]">Wording of the posts</h4>
              <div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] mb-4 p-4 h-full">
                <div
                  dangerouslySetInnerHTML={this.createMarkup(
                    this.props.campaign.postWording
                  )}
                ></div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-5 mt-6">
            <div className="sm:col-span-6 col-span-12">
              <h4 className="mb-2 text-[18px]">Links to share</h4>
              <div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] mb-4 p-4">
                <LinkTo
                  to={this.props.campaign.linkToShare}
                  target="_blank"
                  className="break-words success"
                  text={this.props.campaign.linkToShare}
                />
              </div>
            </div>
            <div className="sm:col-span-6 col-span-12 flex flex-col">
              <h4 className="mb-2 text-[18px]">Photos to share</h4>
              <div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] mb-4 p-4 h-full break-words flex gap-6 flex-wrap">
                {this.props.campaign.campaignAttachments &&
                this.props.campaign.campaignAttachments.length > 0
                  ? this.props.campaign.campaignAttachments.map(
                      (image, index) => (
                        <img
                          src={image}
                          thumbnail
                          alt={`${this.props.campaign.campaignTitle} Preview`}
                          className="w-[100px]"
                          key={index}
                        />
                      )
                    )
                  : ""}
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
    isLoading: state.BrandBookingCampaignReducer.isLoading,
    campaign: state.BrandBookingCampaignReducer.campaign,
  };
};

export default connect(mapStateToProps, null)(BrandBookingCampaignBrief);
