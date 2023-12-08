import { Component } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { BsInstagram, BsYoutube } from "react-icons/bs";
import { MdMusicNote } from "react-icons/md";

class InfluencerProfileTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 0,
		};
	}

	componentDidMount = () => {
		const pathname = window.location.pathname;
		if (pathname === "/influencer/profile/instagram") {
			this.setState({
				activeTab: 1,
			});
		}
		if (pathname === "/influencer/profile/youtube") {
			this.setState({
				activeTab: 2,
			});
		}
		if (pathname === "/influencer/profile/tiktok") {
			this.setState({
				activeTab: 3,
			});
		}
	};

	render() {
		const activeClass = "active";
		return (
			<div>
				<div
					className="containers influencer-tabs"
					id="iq-influencer-discovery-tab"
				>
					<nav className="nav nav-tabs border-0" role="tablist">
						<Link
							to="/influencer/profile/instagram"
							className={`nav-item nav-link ${
								this.state.activeTab === 1 ? activeClass : ""
							}`}
						>
							<BsInstagram className="mr-2" />
							Instagram
						</Link>
						<Link
							to="/influencer/profile/youtube"
							className={`nav-item nav-link ${
								this.state.activeTab === 2 ? activeClass : ""
							}`}
						>
							<BsYoutube className="mr-2" />
							Youtube
						</Link>
						{
							<Link
								to="/influencer/profile/tiktok"
								className={`nav-item nav-link ${
									this.state.activeTab === 3 ? activeClass : ""
								}`}
							>
								<MdMusicNote className="mr-2" />
								Tiktok
							</Link>
						}
					</nav>
				</div>
			</div>
		);
	}
}

export default InfluencerProfileTab;
