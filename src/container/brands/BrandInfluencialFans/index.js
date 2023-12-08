import React, { Component, Fragment } from "react";
import Tooltip from "@components/global/Tooltip";
import tooltip from "../../../constants/tooltip";
import { AiFillCaretDown, AiFillQuestionCircle } from "react-icons/ai";
import { Listbox, Transition } from "@headlessui/react";
import { connect } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import Button from "@components/global/Button";
import { toast } from "react-toastify";
import { FiChevronRight, FiUsers } from "react-icons/fi";
import { BsShop } from "react-icons/bs";
import { EMPTY_SELECTED_ANALYZED_INFLUENCERS } from "@store/constants/action-types";
import { Link } from "react-router-dom";
import avatar from "@assets/avatar.png";
import Popup from "@components/Popup";

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

class BrandReportsAndTracking extends Component {
	constructor(props) {
		super(props);
		this.state = {
			top100: false,
			selectAll: true,
			query: {},
			selected_followers: '',
			influencer: '',
			isOpen: false,
			loader: false,
			cost: 0
		};
		this.inputRef = React.createRef();
		this.errorToast = React.createRef();
		this.popupRef = React.createRef();
	}

	followersRange = [
		{
			label: '1k',
			value: 1000,
		},
		{
			label: '5k',
			value: 5000,
		},
		{
			label: '10k',
			value: 10000,
		},
		{
			label: '20k',
			value: 20000,
		},
		{
			label: '100k',
			value: 100000,
		},
		{
			label: '500k',
			value: 500000,
		},
		{
			label: '1M',
			value: 1000000,
		}
	];

	audienceOptions = [
		{
			label: 'all',
			value: 'All'
		}, {
			label: 'followers',
			value: 'Followers'
		}, {
			label: 'likers',
			value: 'Likers'
		},
	];

	selectCheckbox = (name, e) => {
		if (name === 'selectAll') {
			this.setState({ selectAll: e.target.checked, top100: !e.target.checked })
		} else {
			delete this.state.query['exclude_exported'];
			delete this.state.query['min_followers'];
			delete this.state.query['audience'];
			this.setState({ selectAll: !e.target.checked, top100: e.target.checked })
		}
	};

	handleAddForm = (key, value) => {
		const query = Object.assign({}, this.state.query);
		query[key] = value;
		query['platform'] = this.props.platform;
		query['dry_run'] = true;
		if (this.state.selectAll) {
			query['exclude_exported'] = false;
		} else {
			delete query['exclude_exported'];
			delete query['min_followers'];
			delete query['audience'];
		}
		this.setState({ query })
	}

	onConfirm = async () => {
		this.popupRef?.current?.close();
		const { cost } = this.state;

		const query = Object.assign({}, this.state.query);
		query['dry_run'] = false;
		query['cost'] = cost;
		let results = undefined;
		this.setState({ loader: true })
		if (this.state.top100) {
			results = await this.props.submitTopData(query);
		} else if (this.state.selectAll) {
			results = await this.props.submitForm(query);
		}
		this.setState({ loader: false })
		if (results !== undefined && results?.data) {
			if (results?.data?.success) {
				toast.success(results?.data?.notification)
			} else {
				toast.error(results?.data?.notification)
			}
			this.setState({ influencer: '', query: {} })
		} else {
			toast.error('Account field is required!');
		}

	}

	handleSubmitForm = async () => {


		this.setState({ loader: true })
		if (!this.state.query['url']) {
			toast.error('Account field is required!');
		} else {
			let error = false;

			if (this.state.selectAll) {
				if (!this.state.query['min_followers'] || !this.state.query['audience']) {
					error = true;
					toast.error('Please select all fields');
					this.setState({ loader: false });
					return;
				}

			}

			const json = this.state.selectAll ? await this.props.submitForm(this.state.query) : await this.props.submitTopData(this.state.query);

			if (json !== undefined) {
				if (json.status == 200) {
					if (json.data?.[0]?.count > 0) {
						const cost = (json.data?.[0]?.count || 0);
						this.setState({ cost });
						this.popupRef?.current?.open({
							title: `Report cost: ${cost} credits`,
							description: `There are ${this.state.selectAll ? cost : "Top 100"} notable users with contact details (if publicaly avalaible). Do you want to proceed?`,
						});
					} else {
						toast.error('no notable users founds')
					}
				} else {
					toast.error('Something went wrong!')
				}
			}

			this.setState({ loader: false });

		}
		this.setState({ loader: false })
	}


	selectInfluencer = (value) => {
		this.setState({ isOpen: !this.state.isOpen, influencer: (value.username || value?.handle) }, () => {
			this.handleAddForm('url', { user_id: value.user_id, username: (value.username || value?.handle) })

		})
	}

	handleSearchFilters = (key, value) => {
		this.setState({ isOpen: true })
		this.setState({ influencer: value })
		const {
			platform,
			handleSearchQuery,
			autoCompleteUsers,
		} = this.props;
		if (this.timeout) clearTimeout(this.timeout);
		handleSearchQuery({ q: value });
		let query = {
			q: value,
			limit: 5,
			type: "search",
			platform: platform,
		};
		this.timeout = setTimeout(() => {
			autoCompleteUsers(query);
		}, 500);
	};

	render() {
		const { platform, autocompleteLoading, autocomplete } = this.props;
		const { loader, influencer } = this.state;
		return (
			<div className="mb-12">
				<div className="bg-white shadow-[0px_4px_5px_#96969640]">
					<div className="containers py-10">
						<div className="flex items-center mb-6 black text-[18px] font-medium">
							{platform.charAt(0).toUpperCase() + platform.slice(1)} Influential Fans
							<Tooltip
								trigger={
									<div className="ml-2">
										<AiFillQuestionCircle color="#9ea1b2" size={18} />
									</div>
								}
								tooltipText={tooltip.influential_tooltip}
								placement="top-left"
							/>
						</div>
						<p className="md:w-7/12 black font-normal">
							Discover and reveal all influencers among the followers or likers of any account (yours or a competitor)
						</p>
					</div>
				</div>
				<div className="containers">
					<div className="shadow-[0px_4px_5px_#96969640] bg-white rounded-[8px] px-8 mt-12 relative pt-6 pb-20">
						<div className="flex flex-col gap-2 mt-2">
							<div>List Type:</div>
							<div className="flex flex-wrap gap-12">
								<div>
									<label
										htmlFor="selectall"
										className="cursor-pointer flex items-center text-[15px] font-normal gap-1"
									>
										<input
											id="selectall"
											type="checkbox"
											checked={this.state.selectAll}
											onChange={(event) => this.selectCheckbox('selectAll', event)}
											className="hidden peer"
										/>
										<span className="peer-checked:bg-[#7c3292] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292] rounded-sm"></span>
										<span>All</span>
									</label>
								</div>
								<div>
									<label
										htmlFor="selectTop"
										className="cursor-pointer flex items-center text-[15px] font-normal gap-1"
									>
										<input
											id="selectTop"
											type="checkbox"
											checked={this.state.top100}
											onChange={(event) => this.selectCheckbox('top100', event)}
											className="hidden peer"
										/>
										<span className="peer-checked:bg-[#7c3292] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292] rounded-sm"></span>
										<span>Top 100</span>
									</label>
								</div>
							</div>
						</div>
						<div className="grid grid-cols-12 gap-8 mt-7 w-full">
							<div className="lg:col-span-4 md:col-span-6 sm:col-span-12 col-span-10 space-y-2">
								<label>Account</label>
								<div className="relative">
									<input
										placeholder="@handle"
										className="rounded-[8px] h-[40px] w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292] xs:text-[14px] text-[12px]"
										value={this.state.influencer ?? ''}
										onChange={(e) => this.handleSearchFilters("url", e.target.value)}
									/>
									{autocompleteLoading ? (
										<FaSpinner
											className="animate-[spin_2s_linear_infinite] purple absolute right-[20px] top-[11px] z-[10]"
											size={20}
										/>
									) : (
										<div className="bg-white absolute w-full z-[12]">
											<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] rounded-[8px]">
												{this.state.isOpen && autocomplete && autocomplete.length
													? autocomplete.map((item, index) => (
														<div
															className="block cursor-pointer"
															onClick={() =>
																this.selectInfluencer(item)
															}
															key={index}
														>
															<div className="flex justify-between items-center px-[1rem] py-[0.5rem] border-b border-[#dee2e6]">
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
																		<div className="flex gap-3">
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
													))
													: ""}
											</div>
										</div>
									)}
								</div>
							</div>
							<div className="lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-10 space-y-2">
								<label className="flex gap-2 whitespace-nowrap"><FiUsers /> Min number of followers</label>
								<Listbox
									onChange={(data) => this.handleAddForm('min_followers', parseInt(data))}
									disabled={this.state.top100}
								>
									<div className="relative">
										<Listbox.Button className={`relative w-full cursor-pointer rounded-lg ${this.state.top100 ? 'bg-gray-100' : 'bg-white'} py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]`}>
											<span className="block">{this.state.query.min_followers || ''}</span>
											<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
												<AiFillCaretDown
													size={12}
													className="text-black opacity-80"
													aria-hidden="true"
												/>
											</span>
										</Listbox.Button>
										<Transition
											as={Fragment}
											leave="transition ease-in duration-100"
											leaveFrom="opacity-100"
											leaveTo="opacity-0"
										>
											<Listbox.Options className="text-center absolute max-h-60 -mt-[7px] w-full overflow-auto rounded-md bg-white py-1 text-[14px] shadow-[0_3px_3px_0_#22242626] focus:outline-none sm:text-sm z-50">
												{this.followersRange.map((range) => (
													<Listbox.Option
														key={range.value}
														className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] text-black font-semibold`}
														value={range.value}
													>
														<span>
															{range.label}
														</span>
													</Listbox.Option>
												))}
											</Listbox.Options>
										</Transition>
									</div>
								</Listbox>
							</div>
							<div className="lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-10 space-y-2">
								<label className="flex flex-wrap gap-2"><BsShop /> Audience</label>
								<Listbox
									onChange={(data) => this.handleAddForm('audience', data)}
									disabled={this.state.top100}
								>
									<div className="relative">
										<Listbox.Button className={`relative w-full cursor-pointer rounded-lg ${this.state.top100 ? 'bg-gray-100' : 'bg-white'} py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]`}>
											<span className="block">{this.state.query.audience || ''}</span>
											<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
												<AiFillCaretDown
													size={12}
													className="text-black opacity-80"
													aria-hidden="true"
												/>
											</span>
										</Listbox.Button>
										<Transition
											as={Fragment}
											leave="transition ease-in duration-100"
											leaveFrom="opacity-100"
											leaveTo="opacity-0"
										>
											<Listbox.Options className="text-center absolute max-h-60 -mt-[7px] w-full overflow-auto rounded-md bg-white py-1 text-[14px] shadow-[0_3px_3px_0_#22242626] focus:outline-none sm:text-sm z-50">
												{this.audienceOptions.map((option) => (
													<Listbox.Option
														key={option.value}
														className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] text-black font-semibold`}
														value={option.label}
													>
														<span>
															{option.value}
														</span>
													</Listbox.Option>
												))}
											</Listbox.Options>
										</Transition>
									</div>
								</Listbox>
							</div>
							<div className="lg:col-span-2 md:col-span-6 sm:col-span-12 col-span-10 mt-0 md:mt-8">
								<Button
									className="px-8 rounded-[8px] h-[40px] text-[14px] inline-flex whitespace-nowrap items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 justify-center"
									type="button"
									disabled={!influencer}
									text={
										loader ? (
											<FaSpinner className="animate-[spin_2s_linear_infinite]" />
										) : (
											"Unlock Results"
										)
									}
									onClick={() => this.handleSubmitForm()}
								/>
							</div>
						</div>
					</div>
				</div>
				<Popup ref={this.popupRef} onClose={() => { }}>
					<div className="flex flex-col">
						<button onClick={this.onConfirm} className='self-end  bg--purple py-2 rounded-md hover:!shadow-none focus:!shadow-none min-w-[100px] text-white text-center'>Confirm</button>
					</div>

				</Popup>
			</div>
		);
	}
}

const mapStateToProps = ({ influencerAnalyzer, influencialFollowers }) => {
	return {
		isLoading: influencialFollowers.isLoading,
		search_query: influencerAnalyzer.search_query,
		autocompleteLoading: influencerAnalyzer.autocompleteLoading,
		autocomplete: influencerAnalyzer.autocomplete,
		handle: influencerAnalyzer.handle,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/InfluencialFollowersRedux");
	const { actions: searchactions } = require("@store/redux/InfluencerAnalyzerRedux");
	return {
		submitForm: (data) => {
			return actions.submitInfluentialForm(dispatch, data);
		},
		submitTopData: (data) => {
			return actions.submitInfluentialTopData(dispatch, data);
		},
		handleSearchQuery: (data) => {
			searchactions.handleSearchQuery(dispatch, data);
		},
		autoCompleteUsers: (data) => {
			searchactions.autoCompleteUsers(dispatch, data);
		},
		handlePlatform: (data) => {
			searchactions.handlePlatform(dispatch, data);
		},
		emptyAnalyzedSelectedInfluencers: () => {
			dispatch({ type: EMPTY_SELECTED_ANALYZED_INFLUENCERS });
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BrandReportsAndTracking);
