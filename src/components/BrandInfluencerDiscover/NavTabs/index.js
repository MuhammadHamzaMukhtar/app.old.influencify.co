import { Component } from "react";
import { connect } from "react-redux";
import { AiOutlineInstagram } from "react-icons/ai";
import { MdMusicNote } from "react-icons/md";
import { BsYoutube } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./styles.css";
import { HANDLE_CLEAR_SELECTED_INFLUENCERS } from "@store/constants/action-types";

class BrandInfluencerDiscoveryTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 0,
		};
	}

	componentDidMount = () => {
		const pathname = window.location.pathname;
		const { handlePlatform } = this.props;
		if (pathname === "/discovery/youtube") {
			handlePlatform("youtube");
			this.setState({
				activeTab: 2,
			});
		}
		if (pathname === "/discovery/tiktok") {
			handlePlatform("tiktok");
			this.setState({
				activeTab: 3,
			});
		}

		const { fetchDictionaries } = this.props;
		fetchDictionaries();
		this.props.fetchCampaginTypes();
	};

	handleChangePlatform = (platform) => {
		const {
			handlePlatform,
			clearFilters,
			setDefaultFilters,
			handleClearSelectedInfluencers,
			clearTopicTags,
		} = this.props;
		handlePlatform(platform);
		clearFilters();
		setDefaultFilters();
		handleClearSelectedInfluencers();
		clearTopicTags();
	};

	render() {
		return (
			<div className="containers">
				<nav className="flex flex-wrap items-center md:justify-start justify-center gap-4">
					
					<Link
						to="/discovery/youtube"
						onClick={() => this.handleChangePlatform("youtube")}
						className={`!h-[46px] flex items-center !rounded-[8px] text-[14px] min-w-[180px] justify-center ${
							this.state.activeTab === 2
								? "bg-[#7c3292] text-white"
								: "bg-[#f1f3f4] text-black"
						}`}
					>
						<BsYoutube size={18} className="mr-2" />
						Youtube
					</Link>
					{
						<Link
							to="/discovery/tiktok"
							onClick={() => this.handleChangePlatform("tiktok")}
							className={`!h-[46px] flex items-center !rounded-[8px] text-[14px] min-w-[180px] justify-center ${
								this.state.activeTab === 3
									? "bg-[#7c3292] text-white"
									: "bg-[#f1f3f4] text-black"
							}`}
						>
							<MdMusicNote size={20} className="mr-2" />
							Tiktok
						</Link>
					}
				</nav>
			</div>
		);
	}
}

const mapStateToProps = ({ influencerSearch, HeaderReducer }) => {
	return {
		payload: influencerSearch.payload,
		form: influencerSearch.form,
		currentLoggedUser: HeaderReducer.currentLoggedUser,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { actions, types } = require("@store/redux/InfluencerSearchRedux");
	const { actions: campaignactions } = require("@store/redux/CampaignRedux");
	return {
		handlePlatform: (data) => {
			actions.handlePlatform(dispatch, data);
		},
		clearFilters: () => {
			actions.clearFilters(dispatch);
		},
		setDefaultFilters: () => {
			dispatch({ type: types.HANDLE_SET_DEFAULT_SEARCH_FILTERS });
		},
		handleClearSelectedInfluencers: () => {
			dispatch({ type: HANDLE_CLEAR_SELECTED_INFLUENCERS });
		},
		clearTopicTags: () => {
			dispatch({ type: types.HANDLE_CLEAR_TOPIC_TAGS });
		},
		fetchDictionaries: () => {
			actions.fetchDictionaries(dispatch);
		},
		fetchCampaginTypes: () => {
			campaignactions.fetchCampaginTypes(dispatch);
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BrandInfluencerDiscoveryTab);
