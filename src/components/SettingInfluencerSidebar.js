import { Component } from "react";
// import "../assets/css/Setting.css";
import LinkTo from "@components/global/LinkTo";

class SettingInfluencerSidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 0,
		};
	}

	componentDidMount = () => {
		const pathname = window.location.pathname;
		if (pathname === "/influencer/setting-influencer-profile") {
			this.setState({
				activeTab: 1,
			});
		}
		if (pathname === "/influencer/setting-influencer-platforms") {
			this.setState({
				activeTab: 2,
			});
		}
		if (pathname === "/influencer/setting-influencer-account") {
			this.setState({
				activeTab: 3,
			});
		}
		if (pathname === "/influencer/setting-influencer-subscription") {
			this.setState({
				activeTab: 4,
			});
		}
	};

	render() {
		return (
			<>
				<div className="bg-[#fbfbfb] shadow-[0px_4px_5px_#96969640] rounded-[8px] overflow-hidden">
					<div className="flex flex-col" role="tablist">
						<LinkTo
							to="/influencer/setting-influencer-account"
							className={`text-[#343749] border-l-[3px] border-b border-b-[#e6e6e7] py-[8px] px-[1.25rem] text-[15px] flex justify-between focus-visible:outline-[0px] ${
								this.state.activeTab === 3
									? "font-semibold border-l-[#343749] bg-white"
									: "font-normal border-l-transparent"
							}`}
							text="Account"
						/>
						<div className="h-[1px] w-full bg-[#0000001f]" />
						<LinkTo
							to="/influencer/setting-influencer-platforms"
							className={`text-[#343749] border-l-[3px] border-b border-b-[#e6e6e7] py-[8px] px-[1.25rem] text-[15px] flex justify-between focus-visible:outline-[0px] ${
								this.state.activeTab === 2
									? "font-semibold border-l-[#343749] bg-white"
									: "font-normal border-l-transparent"
							}`}
							text="Platforms"
						/>
					</div>
				</div>
			</>
		);
	}
}

export default SettingInfluencerSidebar;
