import { Component } from "react";
import { connect } from "react-redux";
import TopicTags from "./TopicTags";
import { FaSpinner } from "react-icons/fa";
import Button from "@components/global/Button";
import { Listbox, Transition } from "@headlessui/react";
import SavedSearch from "./SavedSearch";
import Emitter from "../../../constants/Emitter";
import "./styles.css";
import { IoSearchOutline } from "react-icons/io5";
import { AiOutlineEnter } from "react-icons/ai";

class FindInfluencers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: true,
			error: "",
			is_focused: false,
			relevance: "",
		};
		this.timeout = 0;
	}

	_onFocus = (key) => {
		this.setState({
			[key]: true,
		});
	};

	_onBlur = (key) => {
		this.setState({
			[key]: false,
		});
	};

	_handleKeyDown = (e, key, stateKey) => {
		if (e.key === "Enter") {
			const payload = Object.assign({}, this.props.payload);
			const form = Object.assign({}, this.props.form);
			const value = e.target.value;

			if (key == 'keywords') {

				payload["filter"][key] = value;
				form["filter"][key] = value;

				if (
					key == 'keywords' &&
					typeof form["sortOptions"] !== "undefined" &&
					!form["sortOptions"].some((el) => el.value === key)
				) {
					form["sortOptions"].push({
						field: key,
						id: 0,
						direction: "desc",
						text: "Keyword Relevance",
						value: key,
					});
					payload["sort"]["field"] = key;
				}

			} else {
				if (!payload["filter"][key] && value) {
					payload["filter"][key] = [{ type: stateKey, value: value }];
					form["filter"][key] = [{ type: stateKey, value: value }];
				} else {
					if (payload["filter"][key].length < 20 && value) {

						if (
							!payload["filter"][key]
								.filter((i) => i.type === stateKey)
								.some((i) => i.value === value)
						) {

							payload["filter"][key].push({ type: stateKey, value: value });
							form["filter"][key].push({ type: stateKey, value: value });
						}
					}
				}
			}

			payload["paging"]["skip"] = 0;
			form["loadMore"] = false;
			this.props.searchFilters(payload, form);
			this.requestInfluencerCount(payload);

			this.setState({relevance:"", is_focused:false});
		}
	};

	handleTopicTags = (value) => {
		const { form, platform, topicTags } = this.props;
		if (this.timeout) clearTimeout(this.timeout);
		let query = {
			q: value,
			limit: 10,
			platform: platform,
			flag: "search-by",
		};
		this.timeout = setTimeout(() => {
			topicTags(query);
		}, 500);
		this.handleSearchFilters(form.searchBy, value)
		this.setState({ relevance: value });
	};

	handleSearchFilters = (key, value) => {
		const form = Object.assign({}, this.props.form);
		const payload = Object.assign({}, this.props.payload);
		form[key] = value;
		payload["paging"]["skip"] = 0;
		form["loadMore"] = false;
		this.props.searchFilters(payload, form);
	};

	handleClearFilters = () => {
		this.props.clearFilters();
	};

	requestInfluencerCount = (data) => {
		let payload = Object.assign({}, data);
		const actions = Object.assign([], this.props.actions);
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
		if (actions.length > 0) {
			payload = {
				...payload,
				filter: {
					...payload.filter,
					actions: actions,
				},
			};
		}
		let query = {
			platform: this.props.platform,
			payload: payload,
		};

		this.props.searchInfluencersCount(query);
	};

	handleSearchInfluencers = (estimation) => {
		let payload = Object.assign({}, this.props.payload);
		const actions = Object.assign([], this.props.actions);

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
		if (actions.length > 0) {
			payload = {
				...payload,
				filter: {
					...payload.filter,
					actions: actions,
				},
			};
		}

		let query = {
			platform: this.props.platform,
			payload: payload,
			isCreditDeduct: true,
			override_filter: true,
		};
		if (estimation) {
			query["estimation"] = estimation;
		}
		if (this.props.refreshData.is_admin) {
			this.props.searchInfluencers(query);
			this.props.searchRelevantTags(query);
		} else {
			Emitter.emit("PERMISSION_POPUP");
		}
	};

	openSavedSearchList = () => {
		if (this.props.refreshData.is_admin) {
			this.savedSearchRef.open();
		} else {
			Emitter.emit("PERMISSION_POPUP");
		}
	};

	addInfluencerActions = (key, checked) => {
		const actions = Object.assign([], this.props.actions);
		const payload = Object.assign({}, this.props.payload);
		let data = actions.filter((i) => i.filter !== key);
		if (checked) {
			data.push({ filter: key, action: "not" });
		}
		this.props.addInfluencerActions(data);
		setTimeout(() => {
			this.requestInfluencerCount(payload);
		}, 1000);
	};

	render() {
		const form = Object.assign({}, this.props.form);

		const {
			searchTopicTagLoading,
			influencerCount,
			influencerCountLoading,
			platform,
		} = this.props;
		let count = 0;
		if (form.filter.relevance && form.filter.relevance.length > 0) {
			var res = form["filter"]["relevance"].filter((el) => {
				return el.value.includes('#') || el.value.includes('@');
			});
			if (res) {
				count = res.length;
			}
		}
		return (
			<>
				<div className="flex md:flex-nowrap flex-wrap gap-4">
					<div className="md:w-6/12 w-full">
						<div className="flex items-center topic-tags-dropdown">
							<div className="relative w-full">
							<div className="flex items-center border rounded-[8px]">
								<input
									placeholder={"Search keywords"}
									className={`rounded-[8px] h-[40px] inline-flex w-full sm:text-[14px] text-[11px] items-center px-3  border-[#ced4da] focus-visible:outline-0 focus:outline-[#22242659] ${form && form.filter.relevance?.length > 0
											? " pl-28 is-topic-tags"
											: ""} `}
									onChange={(e) => this.setState({relevance:e.target.value})}
									onKeyDown={(e) => this._handleKeyDown(e, 'keywords', 'keyword')}
									value={this.state.relevance || ""}
									onFocus={() => this._onFocus('is_focused')}
									onBlur={() => this._onBlur('is_focused')}
								/>
								{this.state.is_focused === false ? (
									<div className="mx-2">
										<IoSearchOutline color="#9ea1b2" size={20} />
									</div>
								) : (
									<div className="mx-2">
										<AiOutlineEnter color="#9ea1b2" size={20} />
									</div>
								)}
								</div>
								{form && form.filter.relevance?.length > 0 ? (
									<Button
										className="absolute top-[7px]  px-3 rounded-[8px] h-[28px] text-[12px] leading-[2] left-[10px]  inline-flex items-center bg--purple text-white hover:opacity-80"
										text="Tags"
										suffix={
											<span className="bg-[#e2e3e5] rounded-full h-[18px] w-[18px] inlin-flex items-center justify-center text-[#383d41] leading-[19px] text-[10px] ml-2">
												{count}
											</span>
										}
									/>
								) : (
									""
								)}
								{searchTopicTagLoading ? (
									<FaSpinner
										className="animate-[spin_2s_linear_infinite] purple absolute right-[20px] top-[11px] z-[10]"
										size={20}
									/>
								) : (
									<>
										{this.state.is_focused ? (
											<>
												<TopicTags handleClickTag={this._onBlur} />
											</>
										) : (
											""
										)}
									</>
								)}
							</div>
						</div>
					</div>

					<div className="md:w-6/12 w-full">
						<div className="flex gap-4 sm:flex-nowrap flex-wrap">
							<Button
								text="Save/Load filters"
								onClick={() => this.openSavedSearchList()}
								className="px-3 whitespace-nowrap rounded-[8px] h-[40px] text-[14px] xs:w-auto w-full justify-center inline-flex items-center bg-white border-[1px] border-[#7c3292] text-[#7c3292] hover:opacity-80"
							/>
							{Object.keys(form.filter).length === 0 ? (
								<Button
									text="Find influencers"
									className="px-3 whitespace-nowrap rounded-[8px] h-[40px] text-[14px] xs:w-auto w-full justify-center inline-flex items-center bg-[#bd86cc] text-white hover:opacity-80"
								/>
							) : influencerCount > 0 ? (
								<Button
									onClick={() => this.handleSearchInfluencers()}
									text={
										influencerCountLoading ? (
											<FaSpinner className="animate-[spin_2s_linear_infinite]" />
										) : (
											`Show (${influencerCount
												? influencerCount
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
												: 0
											}) Influencers`
										)
									}
									disabled={influencerCountLoading}
									className="px-3 whitespace-nowrap rounded-[8px] h-[40px] text-[14px] xs:w-auto w-full justify-center inline-flex items-center bg--purple text-white hover:opacity-80"
								/>
							) : (
								<Button
									className="px-3 whitespace-nowrap rounded-[8px] h-[40px] text-[14px] xs:w-auto w-full justify-center inline-flex items-center bg-[#bd86cc] text-white hover:opacity-80"
									text="Show (0) Influencer"
								/>
							)}
						</div>
					</div>
				</div>
				<SavedSearch ref={(ref) => (this.savedSearchRef = ref)} />
			</>
		);
	}
}

const mapStateToProps = ({ influencerSearch, HeaderReducer }) => {
	return {
		searchTopicTagLoading: influencerSearch.searchTopicTagLoading,
		platform: influencerSearch.platform,
		form: influencerSearch.form,
		payload: influencerSearch.payload,
		searchResults: influencerSearch.searchResults,
		searchResultsLoader: influencerSearch.searchResultsLoader,
		influencerCount: influencerSearch.influencerCount,
		influencerCountLoading: influencerSearch.influencerCountLoading,
		actions: influencerSearch.actions,
		refreshData: HeaderReducer.refreshData,
	};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const { dispatch } = dispatchProps;
	const { actions, types } = require("@store/redux/InfluencerSearchRedux");
	return {
		...ownProps,
		...stateProps,
		searchFilters: (payload, form) => {
			actions.searchFilters(dispatch, payload, form);
		},
		clearFilters: () => {
			actions.clearFilters(dispatch);
		},
		searchInfluencers: (data) => {
			actions.searchInfluencers(dispatch, data);
		},
		searchInfluencersCount: (data) => {
			actions.searchInfluencersCount(dispatch, data);
		},
		searchRelevantTags: (data) => {
			actions.searchRelevantTags(dispatch, data);
		},
		topicTags: (data) => {
			actions.topicTags(dispatch, data);
		},
		searchLookalikes: (data) => {
			actions.searchLookalikes(dispatch, data);
		},
		addInfluencerActions: (data) =>
			dispatch(actions.addInfluencerActions(data)),
		clearTopicTags: () => {
			dispatch({ type: types.HANDLE_CLEAR_TOPIC_TAGS });
		},
	};
};

export default connect(mapStateToProps, undefined, mergeProps)(FindInfluencers);
