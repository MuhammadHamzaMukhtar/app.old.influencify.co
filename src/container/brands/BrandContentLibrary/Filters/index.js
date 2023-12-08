import { Component } from "react";
import Instagram from "./Instagram";
import Influencer from "./Influencer";
import Compaign from "./Compaign";
import SortFilter from "./SortFilter";
import { connect } from "react-redux";
import { HiOutlineSearch } from "react-icons/hi";

class LibraryFilters extends Component {
	searchContentLibray = (keyword, value) => {
		const { searchContentLibrary, addPayload } = this.props;
		const payload = Object.assign({}, this.props.payload);
		setTimeout(() => {
			payload[keyword] = value;
			addPayload(payload);
			searchContentLibrary(payload);
		}, 500);
	};
	render() {
		const { payload } = this.props;
		return (
			<>
				<div className="containers">
					<div className="grid grid-cols-12 gap-5 items-center">
						<div className="md:col-span-3 col-span-12">
							<h3>Content Library</h3>
						</div>

						<div className="md:col-span-5 col-span-12 relative">
							<input
								icon="search"
								className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
								placeholder="Search contents"
								onChange={(e) =>
									this.searchContentLibray("searchContent", e.target.value)
								}
							/>
							<HiOutlineSearch
								size={17}
								className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#999898]"
							/>
						</div>
					</div>
					<div className="flex flex-wrap mt-12">
						<div className="flex flex-wrap">
							<Instagram />
							<Compaign />
							<Influencer />
							{/* <Nike /> */}
							{/* <HU /> */}
							{/* <Category /> */}
						</div>
						{payload.platform && (
							<div className="ml-auto">
								<SortFilter />
							</div>
						)}
					</div>
				</div>
			</>
		);
	}
}
const mapStateToProps = ({ contentLibrary }) => {
	return {
		is_loading: contentLibrary.is_loading,
		items: contentLibrary.items,
		payload: contentLibrary.payload,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/ContentLibraryRedux");
	return {
		searchContentLibrary: (search) => {
			actions.searchContentLibrary(dispatch, search);
		},
		addPayload: (payload) => {
			actions.addPayload(dispatch, payload);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LibraryFilters);
