import { Component } from "react";
import Likes from "./Likes";
import Comments from "./Comments";
import Impressions from "./Impressions";
import Views from "./Views";
import Platform from "./Platform";
import Tags from "./Tags";
import Tooltip from "@components/global/Tooltip";
import { connect } from "react-redux";
import Button from "@components/global/Button";

class Filters extends Component {
	applyFilter = () => {
		const { payload, applyFilters } = this.props;
		applyFilters(payload);
	};

	render() {
		const { payload } = this.props;

		return (
			<div className="bg-white py-1">
				<div className="mt-6">
					<div className="containers">
						<div className="flex flex-wrap xxs:w-auto w-full items-center gap-y-5 gap-x-4 relative z-50">
							<div className="flex flex-wrap xxs:w-auto xxs:gap-y-0 gap-y-5 w-full items-center xxs:divide-x divide-[#ddd]">
								{(payload.platforms === "tiktok" ||
									payload.platforms === "facebook") && (
									<>
										<Likes className="rounded-l-[8px] border-l-[1px] xxs:rounded-r-none rounded-r-[8px] xxs:border-r-0 border-r-[1px] border-[#ddd]" />
										<Comments className="xxs:rounded-none rounded-[8px] xxs:border-x-0 border-x-[1px] border-[#ddd]" />
									</>
								)}
								{payload.platforms === "instagram" && (
									<Impressions className="rounded-l-[8px] border-l-[1px] xxs:rounded-r-none rounded-r-[8px] xxs:border-r-0 border-r-[1px] border-[#ddd]" />
								)}
								{payload.platforms === "youtube" && (
									<Views className="rounded-l-[8px] border-l-[1px] xxs:rounded-r-none rounded-r-[8px] xxs:border-r-0 border-r-[1px] border-[#ddd]" />
								)}
								<Platform
									className="rounded-r-[8px] border-r-[1px] xxs:rounded-l-none rounded-l-[8px] xxs:border-l-0 border-l-[1px] border-[#ddd]"
									{...this.props}
								/>
							</div>
							<div className="xs:!mx-0 mx-auto">
								<Tooltip
									trigger={
										<Button
											onClick={() => this.props.fetchAdsLibrary(true)}
											type="button"
											text="Apply"
											className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
										/>
									}
									tooltipText="Click to Apply"
									placement="left"
								/>
							</div>
						</div>
						<div className="flex items-center flex-wrap mb-6">
							<Tags />
						</div>
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = ({ AdLibrary }) => {
	return {
		payload: AdLibrary.payload,
	};
};
const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/AdLibraryRedux");
	return {
		addFilterPayload: (data) => {
			actions.addFilterPayload(dispatch, data);
		},
		applyFilters: (data) => {
			actions.applyFilters(dispatch, data);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
