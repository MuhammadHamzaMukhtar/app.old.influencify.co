import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import avatar from "@assets/avatar.png";
import { FiChevronRight } from "react-icons/fi";

const FormatedNumber = ({ num }) => {
	if (num >= 1000000000) {
		return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
	}
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
	}
	return num;
};

class AutoCompletePanel extends Component {

	handleAutoCompleteUsers = (user_id, user_name, handle) => {
		const { platform, handleSearchQuery, autoCompleteUsers } = this.props;
		if (user_id) {
			let q = "";
			if (platform === "youtube") {
				q = user_id;
				let data = {
					q: user_id,
					user_id: user_id,
					handle: handle,
				};
				handleSearchQuery(data);
			} else {
				q = user_name;
				let data = {
					q: user_name,
					user_id: user_id,
					handle: handle,
				};
				handleSearchQuery(data);
			}
			let query = {
				q: q,
				limit: 5,
				type: "search",
				platform: platform,
				report_user_id: user_id,
			};

			autoCompleteUsers(query);
		}


		this.props?.viewInfluencer(user_id);

	};

	render() {
		const { platform, autocomplete, handleInfluencerProfileModal } = this.props;
		return (
			<div className="absolute w-[90%] z-[12]">
				<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px]">
					{(autocomplete || []).map((item, index) => (
								<div
									className="block cursor-pointer"
									onClick={() =>
										this.handleAutoCompleteUsers(item.user_id, item.username, item.handle)
									}
									key={index}
								>
									<div className="flex justify-between items-center  px-[1rem] py-[0.5rem]">
										<div className="flex items-center grow">
											<img
												src={item.picture ? item.picture : avatar}
												alt={item.username}
												className="rounded-full w-[48px]"
											/>
											<div className="ml-4 flex flex-col">
												{platform !== "youtube" ? (
													<p className="text-[13px]">{"@" + item.username}</p>
												) : (
													""
												)}
												<div className="flex gap-2">
													<span className="gray text-[13px]">
														{item.fullname}
													</span>
													<span className="gray text-[13px]">
														<FormatedNumber num={item.followers} /> Followers
													</span>
												</div>
											</div>
										</div>
										<div className="text-right">
											<FiChevronRight className="text-[20px]" />
										</div>
									</div>
								</div>
						  ))}
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ influencerAnalyzer }) => {
	return {
		platform: influencerAnalyzer.platform,
		autocomplete: influencerAnalyzer.autocomplete,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	const { actions } = require("@store/redux/InfluencerAnalyzerRedux");
	return {
		handleSearchQuery: (data) => {
			actions.handleSearchQuery(dispatch, data);
		},
		autoCompleteUsers: (data) => {
			actions.autoCompleteUsers(dispatch, data);
		},
		viewInfluencer:(user_id) =>{
			if(typeof ownProps?.handleInfluencerProfileModal == "function"){
				ownProps?.handleInfluencerProfileModal(user_id)
			}
			
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AutoCompletePanel);
