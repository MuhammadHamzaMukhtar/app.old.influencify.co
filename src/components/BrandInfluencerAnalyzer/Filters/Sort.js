import { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BsSortDownAlt } from "react-icons/bs";
import Exportlist from "@components/Exportlist";
import { Listbox, Transition } from "@headlessui/react";
import { AiFillCaretDown } from "react-icons/ai";

const sortOptions = [
	{
		key: "date",
		text: "Date",
		value: "date",
	},
	{
		key: "followers",
		text: "Followers",
		value: "followers",
	},
	{
		key: "engagements",
		text: "Engagements",
		value: "engagements",
	},
];

class Sort extends Component {
	handleSearchFilters = (key, value) => {
		const { platform, handleChange, analyzedUsers } = this.props;
		handleChange({ key: key, value: value });
		let query = {
			platform: platform,
			sort_query: value,
		};
		analyzedUsers(1, query);
		this.props.resetPage();
	};

	defaultValue = (object, value) => {
		const txt = Object.assign(
			{},
			object.find((o) => o.value === value)
		);
		return txt.text;
	};

	render() {
		const { sort_query, selected_influencers } = this.props;
		return (
			<div className="mb-12 flex flex-wrap items-center">
				<div className="lg:w-5/12 md:w-7/12 sm:w-6/12 w-full">
					<div className="flex items-center">
						<p className="whitespace-nowrap mr-2 flex items-center">
							<BsSortDownAlt size={18} className="mr-1" /> Sort by:
						</p>

						<Listbox
							onChange={(data) => this.handleSearchFilters("sort_query", data)}
						>
							<div className="relative min-w-[14em]">
								<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
									<span className="block">
										{this.defaultValue(sortOptions, sort_query)}
									</span>
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
										{sortOptions.map((sort, key) => (
											<Listbox.Option
												key={key}
												className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
													sort.value === sort_query
														? "bg-[#00000008] text-black font-semibold"
														: "text-gray-900 font-medium"
												}`}
												value={sort.value}
											>
												<span
													className={`block ${
														sort.value === sort_query
															? "text-black font-semibold"
															: "text-gray-900 font-medium"
													}`}
												>
													{sort.text}
												</span>
											</Listbox.Option>
										))}
									</Listbox.Options>
								</Transition>
							</div>
						</Listbox>
					</div>
				</div>
				{selected_influencers && selected_influencers.length > 0 && (
					<div className="sm:w-3/12 w-full ml-auto lg:!mt-0 mt-4">
						<Exportlist
							influencerAnalyzer={"analyzer"}
							AnalyzedUsers={selected_influencers}
							platform={this.props.platform}
							totalInfluencers={selected_influencers.length}
						/>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = ({ influencerAnalyzer, campaign }) => {
	return {
		platform: influencerAnalyzer.platform,
		sort_query: influencerAnalyzer.sort_query,
		selected_influencers: campaign.selected_analyzer_influencers,
	};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const { dispatch } = dispatchProps;
	const { actions, types } = require("@store/redux/InfluencerAnalyzerRedux");
	return {
		...ownProps,
		...stateProps,
		analyzedUsers: (page, data) => {
			actions.analyzedUsers(dispatch, page, data);
		},
		handleChange: (data) => {
			dispatch({ type: types.HANDLE_EVENT_CHANGE_SUCCESS, data: data });
		},
	};
};

export default connect(mapStateToProps, undefined, mergeProps)(Sort);
