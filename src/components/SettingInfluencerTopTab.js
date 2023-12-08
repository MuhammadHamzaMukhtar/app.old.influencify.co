import { Component } from "react";
import LinkTo from "./global/LinkTo";

class SettingInfluencerTopTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 0,
		};
	}

	componentDidMount = () => {
		const pathname = window.location.pathname;
		if (
			pathname === "/influencer/setting-influencer-profile" ||
			"/influencer/setting-influencer-platforms" ||
			"/influencer/setting-influencer-account" ||
			"/influencer/setting-influencer-payment"
		) {
			this.setState({
				activeTab: 1,
			});
		}
		if (pathname === "/influencer/setting-influencer-finances") {
			this.setState({
				activeTab: 2,
			});
		}
		if (pathname === "/influencer/setting-influencer-notifications") {
			this.setState({
				activeTab: 3,
			});
		}
		if (pathname === "/influencer/setting-influencer-revandref") {
			this.setState({
				activeTab: 4,
			});
		}
	};

	render() {
		return (
			<div className="bg-white border-b-[3px] border-[#ccc] min-h-[50px]z mb-12">
				<div className="containers">
					<div className="flex flex-wrap">
						<LinkTo
							to="/influencer/setting-influencer-profile"
							className={`mr-[20px] min-w-[80px] text-center relative leading-[33px] text-black  before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] py-[0.5rem] px-[1rem] block before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0 ${
								this.state.activeTab === 1
									? "font-semibold before:w-full"
									: "font-normal before:w-0"
							}`}
							text="Settings"
						/>
						{/* <LinkTo
							to="/influencer/setting-influencer-finances"
							className={`mr-[20px] min-w-[80px] text-center relative leading-[33px] text-black  before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] py-[0.5rem] px-[1rem] block before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0 ${
								this.state.activeTab === 2
									? "font-semibold before:w-full"
									: "font-normal before:w-0"
							}`}
							text="Finance & Products"
						/> */}
					</div>
				</div>
			</div>
		);
	}
}
export default SettingInfluencerTopTab;
