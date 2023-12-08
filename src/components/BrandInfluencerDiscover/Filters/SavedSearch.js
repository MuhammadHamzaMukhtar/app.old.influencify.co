import { Component, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FaPlusCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { FiTrash2 } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";
import Button from "@components/global/Button";
import { FiX } from "react-icons/fi";

const captalize = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

class savedSearch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
			newList: false,
			search: "",
		};
	}

	open = () => {
		const data = { platform: this.props.platform };
		this.props.fetchSavedSearch(data);
		this.setState({ show: true, search: "" });
	};

	hide = () => {
		this.setState({ show: false });
	};

	addForm = (key, value) => {
		const form = Object.assign({}, this.props.form);
		form[key] = value;
		this.props.addForm(form);
	};

	submitSavedSearch = async () => {
		let data = Object.assign({}, this.props.form);
		const actions = Object.assign([], this.props.actions);
		data = {
			...data,
			payload: {
				payload: this.props.payload,
				form: this.props.payloadForm,
				actions: actions,
			},
			platform: this.props.platform,
		};
		const json = await this.props.submitSavedSearch(data);
		if (json.status === 200) {
			this.setState({ newList: false });
		}
	};

	applyFilter = (payload, name) => {
		this.setState({ show: false });
		this.props.searchFilters(payload.payload, payload.form);
		if (payload.actions) {
			this.props.addInfluencerActions(payload.actions);
		}
		setTimeout(() => {
			this.requestInfluencerCount(payload.payload);
		}, 1000);

		toast.success(`"${name}" applied to current filter`);
	};

	updateFilter = async (name, id) => {
		let data = { id: id };
		const actions = Object.assign([], this.props.actions);
		data = {
			...data,
			payload: {
				payload: this.props.payload,
				form: this.props.payloadForm,
				actions: actions,
			},
			platform: this.props.platform,
		};
		const json = await this.props.updateSavedSearch(data);
		if (json.status === 200) {
			this.setState({ newList: false });
		}

		toast.success(`update current filter to "${name}"`);
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

	search = (e) => {
		this.setState({ search: e.target.value });
	};

	render() {
		const { show, newList, search } = this.state;
		const form = Object.assign({}, this.props.form);
		const { platform } = this.props;
		return (
			<>
				<Transition appear show={show} as={Fragment}>
					<Dialog
						onClose={() => this.setState({ show: false })}
						className="relative z-[9999]"
					>
						<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
						<div className="fixed inset-0 flex items-center justify-center p-4">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="mx-auto sm:min-w-[56rem] min-w-full rounded-[8px] bg-white">
									<Dialog.Title className="text-center grow flex justify-between border-b border-[#dee2e6] p-3">
										<h3>{captalize(platform || "")} Saved Filters</h3>
										<div
											className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
											onClick={() => this.setState({ show: false })}
										>
											<FiX size={24} className="text-white stroke-white" />
										</div>
									</Dialog.Title>
									<div className="p-3">
										{!newList ? (
											<div>
												<div className="mb-4">
													<input
														type="text"
														name="searchList"
														onChange={this.search}
														className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
														placeholder="Search"
														value={search}
													/>
												</div>
												<div className="relative h-50">
													{this.props.isFetching && (
														<div className="flex justify-center items-center">
															<FaSpinner className="animate-[spin_2s_linear_infinite] pink" />
														</div>
													)}
													<div>
														{this.props.data && this.props.data.length ? (
															this.props.data
																.filter((i) => {
																	if (search === "") return i;
																	else if (
																		i.name
																			.toLowerCase()
																			.includes(search.toLowerCase())
																	) {
																		return i;
																	}
																})
																.map((list, index) => {
																	return (
																		<div
																			className="flex justify-between items-center mb-2"
																			key={index}
																		>
																			<h6 className=" text-[16px]">
																				{list.name}
																			</h6>
																			<span>
																				<Button
																					onClick={() =>
																						this.applyFilter(
																							list.payload,
																							list.name
																						)
																					}
																					text="Apply filter"
																					className="px-3 rounded-[8px] h-[35px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
																				/>

																				<Button
																					onClick={() =>
																						this.props.deleteSavedSearch(
																							list.id
																						)
																					}
																					text="Delete"
																					prefix={<FiTrash2 />}
																					className="ml-2 px-3 rounded-[8px] h-[35px] text-[14px] inline-flex items-center bg-white border-[1px] border-[ff0000] text-dark hover:opacity-80"
																				/>
																			</span>
																		</div>
																	);
																})
														) : (
															<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
																We have nothing to show you here.
															</div>
														)}
														<hr />
														{Object.keys(this.props.payloadForm.filter).length >
															0 && (
															<div className="flex justify-between items-center cursor-pointer">
																<div
																	// to="#"
																	onClick={() =>
																		this.setState({ newList: true })
																	}
																	className="border rounded-[8px] flex items-center p-4 mt-4"
																>
																	<FaPlusCircle className=" mr-2" />
																	Create New
																</div>
															</div>
														)}
													</div>
												</div>
											</div>
										) : (
											<div>
												<div className="mb-4">
													<label>Filter Name</label>
													<input
														type="text"
														name="list_name"
														onChange={(e) =>
															this.addForm("name", e.target.value)
														}
														placeholder="Enter name"
														className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
														value={form.name}
														maxlength={50}
													/>

													{this.props.error &&
														Object.keys(this.props.error).length > 0 &&
														Object.keys(this.props.error).map((item, key) => (
															<p key={key} className="red">
																{this.props.error[item][0]}
															</p>
														))}
												</div>
												<div className="flex justify-end mb-2">
													<div>{(form.name || "").length}/50</div>
												</div>
												<div className="text-right multi-buttons">
													<Button
														className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--lightGray text-white dark hover:opacity-80 mt-2"
														onClick={() => this.setState({ newList: false })}
														text="Cancel"
													/>
													<Button
														disabled={this.props.isSubmitting}
														className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mt-2 ml-4"
														onClick={this.submitSavedSearch}
														text="Submit"
													/>
												</div>
											</div>
										)}
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	const platform = state.influencerSearch.platform;
	return {
		isFetching: state.savedSearch.isFetching,
		isSubmitting: state.savedSearch.isSubmitting,
		form: state.savedSearch.form,
		data: state.savedSearch.data[platform],
		error: state.savedSearch.error,
		platform: platform,
		payload: state.influencerSearch.payload,
		payloadForm: state.influencerSearch.form,
		actions: state.influencerSearch.actions,
	};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const { dispatch } = dispatchProps;
	const platform = stateProps.platform;
	const { actions } = require("@store/redux/SavedSearch");
	const {
		actions: influencerAction,
	} = require("@store/redux/InfluencerSearchRedux");
	return {
		...ownProps,
		...stateProps,
		fetchSavedSearch: (data) => {
			actions.fetchSavedSearch(dispatch, data, platform);
		},
		submitSavedSearch: (data) => {
			return actions.submitSavedSearch(dispatch, data, platform);
		},
		updateSavedSearch: (data) => {
			return actions.updateSavedSearch(dispatch, data, platform);
		},
		deleteSavedSearch: (id) => {
			actions.deleteSavedSearch(dispatch, id, platform);
		},
		addForm: (data) => {
			actions.addForm(dispatch, data);
		},
		searchFilters: (payload, form) => {
			influencerAction.searchFilters(dispatch, payload, form);
		},
		searchInfluencersCount: (data) => {
			influencerAction.searchInfluencersCount(dispatch, data);
		},
		addInfluencerActions: (data) =>
			dispatch(influencerAction.addInfluencerActions(data)),
	};
};

export default connect(mapStateToProps, undefined, mergeProps, {
	forwardRef: true,
})(savedSearch);
