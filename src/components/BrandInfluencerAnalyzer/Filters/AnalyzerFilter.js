import { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Listbox, Transition } from "@headlessui/react";
import { AiFillCaretDown } from "react-icons/ai";
import AutoCompletePanel from "./AutoCompletePanel";
import YoutubeLogo from "@assets/youtube_logo.png";
import TiktokLogo from "@assets/tiktok_logo.png";
import InfluencerProfileModal from "@components/BrandInfluencerDiscover/Profile/InfluencerProfileModal";
import { Link } from "react-router-dom";
import Button from "@components/global/Button";
import { EMPTY_SELECTED_ANALYZED_INFLUENCERS } from "@store/constants/action-types";
import Emitter from "../../../constants/Emitter";
import { FaSpinner } from "react-icons/fa";
import "./styles.css";
const platformOptions = [
	{
		key: "youtube",
		text: "Youtube",
		value: "youtube",
		src: YoutubeLogo,
		to: "/past-report/youtube",
	},
	{
		key: "tiktok",
		text: "Tiktok",
		value: "tiktok",
		src: TiktokLogo,
		to: "/past-report/tiktok",
	},
];

class AnalyzerFilter extends Component {
	constructor(props) {
		super(props);
		this.timeout = 0;
		this.state = {
			profileModal: false,
			user_id:null
		};
	}

	handleSearchFilters = (key, value) => {
		const {
			platform,
			handleSearchQuery,
			autoCompleteUsers,
			handlePlatform,
			emptyAnalyzedSelectedInfluencers,
		} = this.props;
		if (this.timeout) clearTimeout(this.timeout);
		if (key === "platform") {
			emptyAnalyzedSelectedInfluencers();
			this.props.addSelectedInfluencers([]);
			handleSearchQuery({ q: value });
			handlePlatform(value);
		} else {
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
		}
	};

	handleInfluencerProfileModal = async () => {
		const { platform, user_id, handleSearchQuery, refreshData } = this.props;
		if (refreshData.is_admin) {
			if (user_id) {
				let query = {
					platform: platform,
					user_id: user_id,
				};
				handleSearchQuery({ q: "", user_id: "", isViewButton: false });
				
				await this.props.viewInfluencerProfile(user_id);
				this.setState({profileModal:true});
			}
		} else {
			Emitter.emit("PERMISSION_POPUP");
		}
	};

	handleClose = () => {
		this.setState({
			profileModal: false,
		});
	};

	viewInfluencer = async (user_id) => {
		const { platform } = this.props;
		let query = {
			platform: platform,
			user_id: user_id,
		};
		await this.props.viewInfluencerProfile(user_id);
		this.setState({
			profileModal: true,
		});
		
	}

	defaultValue = (object, value, type) => {
		const txt = Object.assign(
			{},
			object.find((o) => o.value === value)
		);

		if (type === "text") {
			return txt.text;
		}
		if (type === "src") {
			return txt.src;
		}
	};

	render() {
		const {
			autocompleteLoading,
			search_query,
			handle,
			isProfileLoading,
			platform,
			isViewButton,
			user_id
		} = this.props;
		return (
			<div className="bg-white">
				<div className="containers py-12">
					<div className="grid md:grid-cols-12 grid-cols-1 gap-5">
						<div className="lg:col-span-2 md:col-span-4">
							<Listbox
								onChange={(data) => this.handleSearchFilters("platform", data)}
							>
								<div className="relative">
									<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
										<div className="flex items-center">
											<img
												src={this.defaultValue(
													platformOptions,
													platform,
													"src"
												)}
												alt={this.defaultValue(
													platformOptions,
													platform,
													"text"
												)}
												className="w-6 h-6"
											/>
											<span className="block ml-2">
												{this.defaultValue(platformOptions, platform, "text")}
											</span>
										</div>
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
										<Listbox.Options className="absolute max-h-60 -mt-[7px] w-full overflow-auto rounded-md bg-white py-1 text-[14px] shadow-[0_3px_3px_0_#22242626] focus:outline-none sm:text-sm z-50">
											{platformOptions.map((sort, key) => (
												<Link to={sort.to}>
													<Listbox.Option
														key={key}
														className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${sort.value === platform
																? "bg-[#00000008] text-black font-semibold"
																: "text-gray-900 font-medium"
															}`}
														value={sort.value}
													>
														<div className="flex items-center">
															<img
																src={sort.src}
																alt={sort.text}
																className="w-6 h-6"
															/>
															<span
																className={`block ml-2 ${sort.value === platform
																		? "text-black font-semibold"
																		: "text-gray-900 font-medium"
																	}`}
															>
																{sort.text}
															</span>
														</div>
													</Listbox.Option>
												</Link>
											))}
										</Listbox.Options>
									</Transition>
								</div>
							</Listbox>
						</div>
						<div className="lg:col-span-6 md:col-span-6 relative">
							<input
								placeholder="@handle"
								className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292] xs:text-[14px] text-[12px]"
								value={handle ? handle : search_query}
								onChange={(e) => this.handleSearchFilters("q", e.target.value)}
							/>
							{autocompleteLoading ? (
								<FaSpinner
									className="animate-[spin_2s_linear_infinite] purple absolute right-[20px] top-[11px] z-[10]"
									size={20}
								/>
							) : (
								<AutoCompletePanel handleInfluencerProfileModal={this.viewInfluencer} />
							)}
						</div>
						<div className="lg:col-span-2 md:col-span-2 flex justify-end md:justify-start">
							{isViewButton ? (
								<Button
									disabled={autocompleteLoading ? true : user_id?false:true}
									onClick={this.handleInfluencerProfileModal}
									className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
									text="View"
								/>
							) : (
								<Button
								disabled={autocompleteLoading ? true : user_id?false:true}
									onClick={this.handleInfluencerProfileModal}
									text="Analyze"
									className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
								/>
							)}
						</div>
					</div>
				</div>
				<>
					<InfluencerProfileModal
						isProfileLoading={isProfileLoading}
						platform={platform}
						open={this.state.profileModal}
						onClose={() => this.handleClose()}
					/>
				</>
			</div>
		);
	}
}

const mapStateToProps = ({
	influencerAnalyzer,
	influencerSearch,
	HeaderReducer,
}) => {
	return {
		autocompleteLoading: influencerAnalyzer.autocompleteLoading,
		isViewButton: influencerAnalyzer.isViewButton,
		isProfileLoading: influencerSearch.isProfileLoading,
		platform: influencerAnalyzer.platform,
		search_query: influencerAnalyzer.search_query,
		handle: influencerAnalyzer.handle,
		user_id: influencerAnalyzer.user_id,
		refreshData: HeaderReducer.refreshData,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/InfluencerAnalyzerRedux");
	const {
		actions: searchactions,
	} = require("@store/redux/InfluencerSearchRedux");
	const { actions: campaignactions } = require("@store/redux/CampaignRedux");
	return {
		handlePlatform: (data) => {
			actions.handlePlatform(dispatch, data);
		},
		handleSearchQuery: (data) => {
			actions.handleSearchQuery(dispatch, data);
		},
		autoCompleteUsers: (data) => {
			actions.autoCompleteUsers(dispatch, data);
		},
		viewInfluencerProfile: (data) => {
			searchactions.viewInfluencerProfile(dispatch, data);
		},
		analyzedUsers: (data) => {
			actions.analyzedUsers(dispatch, data);
		},
		emptyAnalyzedSelectedInfluencers: () => {
			dispatch({ type: EMPTY_SELECTED_ANALYZED_INFLUENCERS });
		},
		addSelectedInfluencers: (data) => {
			campaignactions.addSelectedInfluencers(dispatch, data, "analyzer");
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AnalyzerFilter);
