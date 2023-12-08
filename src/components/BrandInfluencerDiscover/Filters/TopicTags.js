import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class TopicTags extends Component {
	handleSearchFilters = (key, value) => {
		const payload = Object.assign({}, this.props.payload);
		const form = Object.assign({}, this.props.form);
		if (form.searchBy === "#") {
			if (!payload["filter"][key]) {
				payload["filter"][key] = [{ type: "hashtag", value: value }];
				form["filter"][key] = [{ type: "hashtag", value: value }];
			} else {
				if (payload["filter"][key].length < 20) {
					if (
						!payload["filter"][key]
							.filter((i) => i.type === "hashtag")
							.some((i) => i.value === value)
					) {
						payload["filter"][key].push({ type: "hashtag", value: value });
						form["filter"][key].push({ type: "hashtag", value: value });
					}
				}
			}
		} else {
			if (!form["relvance_value"].some((el) => el === "#" + value)) {
				form["relvance_value"].push("#" + value);
			}

			payload["filter"]["relevance"] = {
				value: form["relvance_value"].join(" "),
				weight: 0.5,
			};
			if (form["filter"].hasOwnProperty("relevance") === false) {
				form["filter"]["relevance"] = [
					{ value: "#" + value, weight: 0.5, type: "#" },
				];
			} else {
				if (
					!form["filter"]["relevance"].some((el) => el.value === "#" + value)
				) {
					form["filter"]["relevance"].push({
						value: "#" + value,
						weight: 0.5,
						type: "#",
					});
				}
			}

			if (
				typeof form["sortOptions"] != "undefined" &&
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

			payload["sort"]["field"] = "audience_relevance";
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
		const { searchTopictags, platform } = this.props;
		return (
			<div>
				<div className="absolute z-[12] w-full max-h-[250px] overflow-y-auto rounded-[8px]">
					<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-0 m-0">
						{searchTopictags && searchTopictags.length
							? searchTopictags.map((item, index) => (
									<Link
										to="#"
										className="block hover:opacity-100 font-normal text-[#888] group"
										onClick={() =>
											this.handleSearchFilters(
												"relevance",
												item.tag
											)
										}
										key={index}
									>
										<div className="flex justify-between items-center  px-[1rem] py-[0.5rem]">
											<div className="flex items-center grow">
												<div className="ml-4 flex flex-col grow">
													<span className="grow text-[14px] group-hover:text-[#7c3292]">
														{item.value}
													</span>
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
		searchTopictags: influencerSearch.searchTopictags,
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

export default connect(mapStateToProps, mapDispatchToProps)(TopicTags);
