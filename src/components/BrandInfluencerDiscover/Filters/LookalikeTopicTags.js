import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import avatar from "@assets/avatar.png";

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

class LookalikeTopicTags extends Component {
	handleSearchFilters = (key, item) => {
		let form_value = "";
		let payload_value = "";
		const payload = Object.assign({}, this.props.payload);
		const form = Object.assign({}, this.props.form);
		const { platform } = this.props;
		if (platform === "youtube") {
			form_value = item.custom_name ?? item.handle;
			payload_value = item.custom_name ?? item.handle;
		} else {
			form_value = item.username;
			payload_value = item.username;
		}

		if (key === "username") {

			// if (!payload["filter"][key]) {
				payload["filter"][key] = {  value: payload_value };
				form["filter"][key] = {  value: form_value };
			// } else {
			// 	// if (payload["filter"][key].length < 20) {

			// 		if (
			// 			!payload["filter"][key]
			// 				.filter((i) => i.operator === "exact")
			// 				.some((i) => i.value === payload_value)
			// 		) {
			// 			payload["filter"][key] = {
			// 				value: payload_value,
			// 			};
			// 			form["filter"][key] = { operator: "exact", value: form_value };
			// 		}
			// 	// }
			// }
		}
		//  else {
		// 	if (!form["relvance_value"].some((el) => el === "@" + payload_value)) {
		// 		form["relvance_value"].push("@" + payload_value);
		// 	}

		// 	payload["filter"][key] = {
		// 		value: form["relvance_value"].join(" "),
		// 		weight: 0.5,
		// 	};
		// 	if (form["filter"].hasOwnProperty(key) === false) {
		// 		form["filter"][key] = [
		// 			{ value: "@" + form_value, weight: 0.5, type: "@" },
		// 		];
		// 	} else {
		// 		if (!form["filter"][key].some((el) => el.value === "@" + form_value)) {
		// 			form["filter"][key].push({
		// 				value: "@" + form_value,
		// 				weight: 0.5,
		// 				type: "@",
		// 			});
		// 		}
		// 	}
		// 	payload["sort"]["field"] = "relevance";
		// }

		if (
			typeof form["sortOptions"] !== "undefined" &&
			!form["sortOptions"].some((el) => el.value === 'audience_relevance')
		) {
			form["sortOptions"].push({
				field: "audience_relevance",
				id: 0,
				direction: "desc",
				text: "Tag Relevance",
				value: "audience_relevance",
			});
		}

		payload["paging"]["skip"] = 0;
		form["loadMore"] = false;
		this.props.searchFilters(payload, form);
		this.requestInfluencerCount(payload);
		this.props.handleClickTag();
		this.props.clearTopicTags();
	};

	requestInfluencerCount = (data) => {
		let payload = Object.assign({}, data);
		if (payload.filter.account_type) {
			if (payload.filter.account_type.includes("2")) {
				payload = {
					...payload,
					filter: {
						...payload.filter,
						account_type: [],
					},
				};
			}
			if (payload.filter.account_type.includes("3")) {
				payload = {
					...payload,
					filter: {
						...payload.filter,
						account_type: [],
					},
				};
			}
			if (payload.filter.account_type.includes("1")) {
				payload = {
					...payload,
					filter: {
						...payload.filter,
						account_type: [1, 3],
					},
				};
			}
		}

		let query = {
			platform: this.props.platform,
			payload: payload,
		};

		this.props.searchInfluencersCount(query);
	};

	render() {
		const { topictags, platform } = this.props;
		return (
			<div>
				<div className="absolute z-[12] w-full max-h-[250px] overflow-y-auto rounded-[8px]">
					<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-0 m-0">
						{topictags && topictags.length
							? topictags.map((item, index) => (
									<Link
										to="#"
										className="block hover:opacity-100 font-normal text-[#888] group"
										onClick={() =>
											this.handleSearchFilters(
												"username",
												item
											)
										}
										key={index}
									>
										<div className="flex justify-between items-center  px-[1rem] py-[0.5rem]">
											<div className="flex items-center grow">
												<img
													src={item.picture ? item.picture : avatar}
													alt={item.username}
													width="48px"
													className="rounded-full"
												/>
												<div className="ml-4 flex flex-col grow">
													{platform !== "youtube" ? (
														<span className="grow text-[14px] group-hover:text-[#7c3292]">
															{"@" + item.username}
														</span>
													) : (
														<span className="grow text-[14px] group-hover:text-[#7c3292]">
															{item.custom_name}
														</span>
													)}
													<div className="flex ">
														<span className="gray grow text-[13px] group-hover:text-[#7c3292]">
															{item.fullname}
														</span>
														<span className="gray grow text-[13px] group-hover:text-[#7c3292]">
															<FormatedNumber num={item.followers} /> Followers
														</span>
													</div>
												</div>
											</div>
										</div>
									</Link>
							  ))
							: ""}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ influencerSearch }) => {
	return {
		topictags: influencerSearch.topictags,
		form: influencerSearch.form,
		platform: influencerSearch.platform,
		payload: influencerSearch.payload,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { actions, types } = require("@store/redux/InfluencerSearchRedux");
	return {
		searchFilters: (payload, form) => {
			actions.searchFilters(dispatch, payload, form);
		},
		clearTopicTags: () => {
			dispatch({ type: types.HANDLE_CLEAR_TOPIC_TAGS });
		},
		searchInfluencersCount: (data) => {
			actions.searchInfluencersCount(dispatch, data);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LookalikeTopicTags);
