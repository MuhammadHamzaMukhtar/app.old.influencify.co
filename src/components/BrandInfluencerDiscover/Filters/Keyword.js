import { Component, Fragment } from "react";
import { connect } from "react-redux";
import Tooltip from "@components/global/Tooltip";
import { AiFillQuestionCircle, AiOutlineEnter } from "react-icons/ai";
import { IoSearchOutline, IoCloseCircle } from "react-icons/io5";
import tooltip from "../../../constants/tooltip";
import { Popover, Transition } from "@headlessui/react";

class Keyword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			is_keywords_focused: false,
			keyword: "",
			enabled: this.props.actions.filter((i) => i.filter === "text").length > 0,
		};
	}

	handleSearchFilters = (e, key) => {
		this.setState({
			[key]: e.target.value,
		});
	};

	_handleKeyDown = (e, key, stateKey) => {
		if (e.key === "Enter") {
			const payload = Object.assign({}, this.props.payload);
			const form = Object.assign({}, this.props.form);
			const value = e.target.value;

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

			payload["paging"]["skip"] = 0;
			form["loadMore"] = false;
			this.props.searchFilters(payload, form);
			this.requestInfluencerCount(payload);

			this.setState({
				['is_' + stateKey + 's_focused']: false,
				[stateKey]: "",
			});
		}
	};

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

	removeSearchFilters = (key) => {
		const payload = Object.assign({}, this.props.payload);
		const form = Object.assign({}, this.props.form);

		delete payload["filter"][key];
		delete form["filter"][key];

		this.props.searchFilters(payload, form);
		this.requestInfluencerCount(payload);
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

	addInfluencerActions = (key) => {
		this.setState({ enabled: !this.state.enabled });
		let checked = this.state.enabled;

		const payload = Object.assign({}, this.props.payload);
		const data = {
			payload: { filter: key, action: "not" },
			checked: checked,
			key: key
		}
		this.props.InfluencerActions(data);

		setTimeout(() => {
			this.requestInfluencerCount(payload);
		}, 1000);
	};

	render() {
		const { form } = this.props;
		return (
			<Popover className="flex items-center relative">
				<Popover.Button
					className={`${form.filter.keywords || form.filter.text_tags?.length > 0
						? "bg-[#7c3292] border-[#7c3292] text-white"
						: "bg-whte border-[#ddd]"
						} ${this.props.className
						}  px-[16px] leading-[34px] h-[34px] border-y-[1px] flex items-center justify-center focus-visible:outline-0`}
				>
					Keywords
				</Popover.Button>
				<Transition
					as={Fragment}
					enter="duration-200 ease-out"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="duration-100 ease-in"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95"
				>
					<Popover.Panel className="absolute top-full left-0 z-10 w-screen transform lg:translate-x-0 xs:translate-x-[100px] translate-x-[130px] max-w-[250px]">
						<div className="p-4 bg-white rounded-[8px] shadow-[0px_1rem_3rem_#0000002d]">
							<div className="items-center gx-5 space-y-6">
								<div className="w-full">
									<div className="mb-1 font-medium whitespace-nowrap flex items-center  justify-between">
										<div className="flex items-center">
											Keywords
											<Tooltip
												trigger={
													<div className="ml-2">
														<AiFillQuestionCircle color="#9ea1b2" size={18} />
													</div>
												}
												tooltipText={tooltip.keywords_tooltip}
												placement="top-left"
											/>
										</div>
									</div>
									<div className="flex items-center border rounded-[8px]">
										<input
											type="text"
											placeholder="Keywords"
											className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 focus-visible:outline-0"
											onChange={(e) => this.handleSearchFilters(e, "keyword")}
											onKeyDown={(e) => this._handleKeyDown(e, 'keywords', 'keyword')}
											onFocus={() => this._onFocus('is_keywords_focused')}
											onBlur={() => this._onBlur('is_keywords_focused')}
											value={this.state.keyword}
										/>
										{this.state.is_keywords_focused === false ? (
											<div className="mx-2">
												<IoSearchOutline color="#9ea1b2" size={20} />
											</div>
										) : (
											<div className="mx-2">
												<AiOutlineEnter color="#9ea1b2" size={20} />
											</div>
										)}
									</div>
									<>
										{form.filter.keywords ? (
											<div className="flex items-center justify-between mt-4">
												<div className="flex items-center ">
													<IoCloseCircle
														size={20}
														className="cursor-pointer purple"
														onClick={() => this.removeSearchFilters("keywords")}
													/>
													<p>{form.filter.keywords}</p>
												</div>
											</div>
										) : (
											""
										)}
									</>
								</div>
							</div>
						</div>
					</Popover.Panel>
				</Transition>
			</Popover>
		);
	}
}

const mapStateToProps = ({ influencerSearch }) => {
	return {
		payload: influencerSearch.payload,
		platform: influencerSearch.platform,
		form: influencerSearch.form,
		actions: influencerSearch.actions,
	};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const { dispatch } = dispatchProps;
	const { actions } = require("@store/redux/InfluencerSearchRedux");
	return {
		...ownProps,
		...stateProps,
		searchFilters: (payload, form) => {
			actions.searchFilters(dispatch, payload, form);
		},
		searchInfluencersCount: (data) => {
			actions.searchInfluencersCount(dispatch, data);
		},
		addInfluencerActions: (data) =>
			dispatch(actions.addInfluencerActions(data)),
		InfluencerActions: (data) =>
			actions.influencerActions(dispatch, data),
	};
};

export default connect(mapStateToProps, undefined, mergeProps)(Keyword);
