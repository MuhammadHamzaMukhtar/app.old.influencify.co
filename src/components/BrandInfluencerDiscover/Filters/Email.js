import { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Switch } from "@headlessui/react";
import Tooltip from "@components/global/Tooltip";
import { AiFillQuestionCircle } from "react-icons/ai";
import tooltip from "../../../constants/tooltip";
import { Popover, Transition } from "@headlessui/react";
import { MdEmail } from "react-icons/md";

class Email extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email:
				this.props.payload.filter.with_contact.filter((i) => i.type === "email" && i.action === 'should').length > 0,
		};
	}

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

	addInfluencerActions = (key, email) => {
		let checked = false;
		// this.setState({ email: email });
		checked = email;

		const payload = Object.assign({}, this.props.payload);
		const data = {
			payload: { type: key, action: checked ? "should" : "not" },
			checked: checked,
			key: key
		}
		payload['filter']['with_contact'] = [data.payload];
		this.props.InfluencerActions(data);

		setTimeout(() => {
			this.requestInfluencerCount(payload);
		}, 1000);
	};

	render() {
		let { payload } = this.props;
		const emailFilter = payload.filter.with_contact?.filter((i) => (i.type == 'email' && i.action == 'should')).length > 0;

		return (
			<Popover className="flex items-center relative">
				<Popover.Button
					className={`${(emailFilter)
							? "bg-[#7c3292] border-[#7c3292] text-white"
							: "bg-whte border-[#ddd]"
						} ${this.props.className
						}  px-[16px] leading-[34px] h-[34px] border-y-[1px] flex items-center justify-center focus-visible:outline-0`}
				>
					Email
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
											<MdEmail className="mr-2" /> Has email
											<Tooltip
												trigger={
													<div className="ml-2">
														<AiFillQuestionCircle color="#9ea1b2" size={18} />
													</div>
												}
												tooltipText={tooltip.has_email_tooltip}
												placement="bottom-left"
											/>
										</div>
										<div className="flex items-center">
											<Switch
												checked={emailFilter}
												onChange={() => this.addInfluencerActions("email", emailFilter ? false : true)}
												className={`${emailFilter ? "bg-[#7c3292]" : "bg-white"
													} relative inline-flex h-[20px] w-[35px] shrink-0 cursor-pointer rounded-full border-[1px] border-[#ADB5BB] transition-colors duration-200 ease-in-out focus:!outline focus:!outline-3 focus:!outline-[#7c329280] `}
											>
												<span
													aria-hidden="true"
													className={`${emailFilter
															? "translate-x-[15px] bg-white"
															: "translate-x-[1px] bg-[#adb5bd]"
														} pointer-events-none relative top-[1px] inline-block h-[17px] w-[17px] transform rounded-full ring-0 transition duration-200 ease-in-out`}
												/>
											</Switch>
											<span
												onClick={() => this.addInfluencerActions("email")}
												className="ml-2"
											>
												{emailFilter ? "-" : "+"}
											</span>
											<Tooltip
												trigger={
													<div className="ml-2">
														<AiFillQuestionCircle color="#9ea1b2" size={18} />
													</div>
												}
												tooltipText={"Enable influencers with email search"}
												placement="top-left"
											/>
										</div>
									</div>
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
		form: influencerSearch.form,
		platform: influencerSearch.platform,
		payload: influencerSearch.payload,
		actions: influencerSearch.actions,
	};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const { dispatch } = dispatchProps;
	const { actions } = require("@store/redux/InfluencerSearchRedux");
	return {
		...ownProps,
		...stateProps,
		searchInfluencersCount: (data) => {
			actions.searchInfluencersCount(dispatch, data);
		},
		InfluencerActions: (data) =>
			actions.influencerActions(dispatch, data),
	};
};

export default connect(mapStateToProps, undefined, mergeProps)(Email);
