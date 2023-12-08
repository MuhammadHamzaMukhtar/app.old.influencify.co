import React, { Component } from "react";
import { connect } from "react-redux";
import { AiOutlineInstagram } from "react-icons/ai";
import { MdMusicNote } from "react-icons/md";
import { BsYoutube } from "react-icons/bs";
import { Link } from "react-router-dom";

class TopHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 0,
		};
	}

	componentDidMount = () => {
		const pathname = window.location.pathname;
		const { handlePayloadChange, fetchBrandLists } = this.props;
		const payload = Object.assign({}, this.props.payload);

		if (pathname === "/list/youtube") {
			payload.platform = "youtube";
			this.setState({
				activeTab: 2,
			});
		}
		if (pathname === "/list/tiktok") {
			payload.platform = "tiktok";
			this.setState({
				activeTab: 3,
			});
		}
		handlePayloadChange(payload);
		fetchBrandLists(payload);
	};

	render() {
		return (
			<div className="containers">
				<nav className="flex flex-wrap items-center gap-5 md:justify-start justify-center">
					
					<Link
						to="/list/youtube"
						className={`!h-[46px] flex items-center !rounded-[8px] text-[14px] min-w-[180px] md:w-auto w-full justify-center ${
							this.state.activeTab === 2
								? "bg-[#7c3292] text-white hover:text-white"
								: "bg-[#f1f3f4] text-[#000] hover:text-[#000]"
						}`}
					>
						<BsYoutube size={18} className="mr-2" />
						Youtube
					</Link>
					<Link
						to="/list/tiktok"
						className={`!h-[46px] flex items-center !rounded-[8px] text-[14px] min-w-[180px] md:w-auto w-full justify-center ${
							this.state.activeTab === 3
								? "bg-[#7c3292] text-white hover:text-white"
								: "bg-[#f1f3f4] text-[#000] hover:text-[#000]"
						}`}
					>
						<MdMusicNote size={20} className="mr-2" />
						Tiktok
					</Link>
				</nav>
			</div>
		);
	}
}

const mapStateToProps = ({ brandList }) => {
	return {
		payload: brandList.payload,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { actions, types } = require("@store/redux/BrandListRedux");
	return {
		handlePayloadChange: (data) => {
			dispatch({ type: types.HANDLE_LIST_PAYLOAD_CHANGE, data: data });
		},
		fetchBrandLists: (data) => {
			actions.fetchBrandLists(dispatch, data);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TopHeader);
