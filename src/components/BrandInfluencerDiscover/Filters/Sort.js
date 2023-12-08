import { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BsSortDownAlt } from "react-icons/bs";
import Exportlist from "@components/Exportlist";
import { Listbox, Transition } from "@headlessui/react";
import { AiFillCaretDown } from "react-icons/ai";

class Sort extends Component {
	handleSearchFilters = (data) => {
		const { field, id, direction } = data;
		let payload = Object.assign({}, this.props.payload);
		const actions = Object.assign([], this.props.actions);
		const form = Object.assign({}, this.props.form);
		payload["sort"]["field"] = field;
		payload["sort"]["id"] = id;
		payload["sort"]["direction"] = direction;
		payload["paging"]["skip"] = 0;
		form["loadMore"] = false;
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
		this.props.searchFilters(payload, form);
		let query = {
			platform: this.props.platform,
			payload: payload,
			override_filter: true,
			isCreditDeduct: true,
		};
		this.props.searchInfluencers(query);
	};

	render() {
		const { payload, form, selected_influencers, influencers } = this.props;
		let sortValue = "";
		if (
			payload.sort.field === "audience_geo" ||
			payload.sort.field === "audience_brand" ||
			payload.sort.field === "audience_brand_category"
		) {
			sortValue = payload.sort.id;
		} else {
			sortValue = payload.sort.field;
		}

		const sortText = Object.assign(
			{},
			form.sortOptions.find((o) => o.field === payload.sort.field)
		);
		return (
			<div className="mb-12 flex flex-wrap items-center">
				<div className="lg:w-5/12 md:w-7/12 sm:w-6/12 w-full">
					<div className="flex items-center">
						<p className="whitespace-nowrap mr-2 flex items-center">
							<BsSortDownAlt size={18} className="mr-1" /> Sort by:
						</p>

						<Listbox onChange={(data) => this.handleSearchFilters(data)}>
							<div className="relative min-w-[14em]">
								<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
									<span className="block">{sortText.text || ""}</span>
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
										{form.sortOptions.map((sort, key) => (
											<Listbox.Option
												key={key}
												className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
													sort.value === sortValue
														? "bg-[#00000008] text-black font-semibold"
														: "text-gray-900 font-medium"
												}`}
												value={sort}
											>
												<span
													className={`block ${
														sort.value === sortValue
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
				<div className="sm:w-3/12 w-full pr-0 ml-auto lg:!mt-0 mt-4">
					<Exportlist
						platform={this.props.platform}
						influencerAnalyzer={"Discover"}
						selectedInfluencers={selected_influencers}
						totalInfluencers={influencers?.length}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ influencerSearch, campaign }) => {
	return {
		platform: influencerSearch.platform,
		payload: influencerSearch.payload,
		form: influencerSearch.form,
		total: influencerSearch.total,
		selected_influencers: campaign.selected_influencers,
		influencers: influencerSearch.influencers,
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
		searchInfluencers: (data) => {
			actions.searchInfluencers(dispatch, data);
		},
	};
};

export default connect(mapStateToProps, undefined, mergeProps)(Sort);
