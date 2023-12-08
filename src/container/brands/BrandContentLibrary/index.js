import { Component } from "react";
import "./styles.css";
import LibraryFilters from "./Filters";
import LibraryContentCard from "./Items";
import { connect } from "react-redux";
import Loader from "@components/global/Loader";

class BrandContentLibrary extends Component {
	componentDidMount = () => {
		const { fetchApiContent, searchContentLibrary } = this.props;
		let query = {
			sortFilter: "newestFirst",
		};
		searchContentLibrary();
		fetchApiContent(query);
	};

	render() {
		const { is_loading, items, filterLoading } = this.props;
		if (is_loading) {
			return (
				<Loader
					className="h-full w-full flex justify-center items-center"
					size="67"
				/>
			);
		}
		return (
			<div>
				<div className="content-library-page">
					<div className="content-library-filters bg-white pt-12 pb-3">
						<LibraryFilters />
					</div>
					{filterLoading ? (
						<Loader
							className="h-full w-full flex justify-center items-center"
							size="67"
						/>
					) : (
						<div className="library-content  mt-12 containers">
							<div className="grid grid-cols-12 gap-5">
								{items && items.data && items.data.length ? (
									items.data.map((item, index) => (
										<div className="md:col-span-3 col-span-12 mb-6">
											<LibraryContentCard index={index} item={item} />
										</div>
									))
								) : (
									<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
										We have nothing to show you here.
									</div>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ contentLibrary }) => {
	return {
		filterLoading: contentLibrary.filter_loading,
		items: contentLibrary.items,
		campaign: contentLibrary.campaign,
		platform: contentLibrary.platform,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/ContentLibraryRedux");
	return {
		fetchApiContent: () => {
			actions.fetchApiContent(dispatch);
		},
		searchContentLibrary: () => {
			actions.searchContentLibrary(dispatch);
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BrandContentLibrary);
