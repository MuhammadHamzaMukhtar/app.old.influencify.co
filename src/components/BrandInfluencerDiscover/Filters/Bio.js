import { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Switch } from "@headlessui/react";
import Tooltip from "@components/global/Tooltip";
import { AiFillQuestionCircle, AiOutlineEnter } from "react-icons/ai";
import { IoSearchOutline, IoCloseCircle } from "react-icons/io5";
import tooltip from "../../../constants/tooltip";
import { Popover, Transition } from "@headlessui/react";

class Bio extends Component {
	constructor(props) {
		super(props);
		this.state = {
			is_focused: false,
			bio: "",
			enabled: this.props.actions.filter((i) => i.filter === "text").length > 0,
		};
	}

	handleSearchFilters = (e) => {
		this.setState({
			bio: e.target.value,
		});
	};

	_handleKeyDown = (e) => {
		if (e.key === "Enter") {
			const payload = Object.assign({}, this.props.payload);
			const form = Object.assign({}, this.props.form);
			payload["filter"]["text"] = this.state.bio;
			form["filter"]["text"] = this.state.bio;

			payload["paging"]["skip"] = 0;
			form["loadMore"] = false;
			this.props.searchFilters(payload, form);
			this.requestInfluencerCount(payload);

			this.setState({
				is_focused: false,
				bio: "",
			});
		}
	};

	_onFocus = () => {
		this.setState({
			is_focused: true,
		});
	};

	_onBlur = () => {
		this.setState({
			is_focused: false,
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
					className={`${
						form.filter.text
							? "bg-[#7c3292] border-[#7c3292] text-white"
							: "bg-whte border-[#ddd]"
					} ${
						this.props.className
					}  px-[16px] leading-[34px] h-[34px] border-y-[1px] flex items-center justify-center focus-visible:outline-0`}
				>
					Bio
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
							<div className="flex items-center gx-5">
								<div className="w-full">
									<div className="mb-1 font-medium whitespace-nowrap flex items-center justify-between">
										<div className="flex items-center">
											Bio
											<Tooltip
												trigger={
													<div className="ml-2">
														<AiFillQuestionCircle color="#9ea1b2" size={18} />
													</div>
												}
												tooltipText={tooltip.bio_tooltip}
												placement="top-left"
											/>
										</div>
										<div className="flex items-center">
											<Switch
												checked={this.state.enabled}
												onChange={() => this.addInfluencerActions("text")}
												className={`${
													this.state.enabled ? "bg-[#7c3292]" : "bg-white"
												} relative inline-flex h-[20px] w-[35px] shrink-0 cursor-pointer rounded-full border-[1px] border-[#ADB5BB] transition-colors duration-200 ease-in-out focus:!outline focus:!outline-3 focus:!outline-[#7c329280] `}
											>
												<span
													aria-hidden="true"
													className={`${
														this.state.enabled
															? "translate-x-[15px] bg-white"
															: "translate-x-[1px] bg-[#adb5bd]"
													} pointer-events-none relative top-[1px] inline-block h-[17px] w-[17px] transform rounded-full ring-0 transition duration-200 ease-in-out`}
												/>
											</Switch>
											<span
												onClick={() => this.addInfluencerActions("text")}
												className="ml-2"
											>
												{this.state.enabled ? "-" : "+"}
											</span>
											<Tooltip
												trigger={
													<div className="ml-2">
														<AiFillQuestionCircle color="#9ea1b2" size={18} />
													</div>
												}
												tooltipText={"Enable negative search"}
												placement="top-left"
											/>
										</div>
									</div>
									<div className="flex items-center border rounded-[8px]">
										<input
											type="text"
											placeholder="Keywords"
											className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 focus-visible:outline-0"
											onChange={(e) => this.handleSearchFilters(e, "text")}
											onKeyDown={(e) => this._handleKeyDown(e)}
											onFocus={this._onFocus}
											onBlur={this._onBlur}
											value={this.state.bio}
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
									<>
										{form.filter.text ? (
											<div className="flex items-center justify-between mt-4">
												<div className="flex items-center ">
													<IoCloseCircle
														size={20}
														className="cursor-pointer purple"
														onClick={() => this.removeSearchFilters("text")}
													/>
													<p>{form.filter.text}</p>
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

export default connect(mapStateToProps, undefined, mergeProps)(Bio);
