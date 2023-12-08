import { Component } from "react";
import LinkTo from "@components/global/LinkTo";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";

class SettingBrandAccountTopTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 0,
		};
	}

	componentDidMount = () => {
		const pathname = window.location.pathname;
		if (pathname === "/brand/setting-brand-account") {
			this.setState({
				activeTab: 1,
			});
		}
		if (pathname === "/brand/setting-brand-reports") {
			this.setState({
				activeTab: 2,
			});
		}
	};

	render() {
		const url = window.location.href;
		const { refreshData } = this.props;
		return (
			<div>
				<Helmet>
					<meta charSet="utf-8" />
					<title>Settings | Influencify</title>
					<link rel="canonical" href={url} />
				</Helmet>
				<div className="bg-white border-b-[3px] border-[#ccc] min-h-[50px]z mb-12">
					<div className="containers">
						<div className="flex flex-wrap">
							<LinkTo
								to="/account"
								className={`mr-[20px] min-w-[80px] text-center relative leading-[33px] text-black  before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] py-[0.5rem] px-[1rem] block before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0 ${
									this.state.activeTab === 1
										? "font-semibold before:w-full"
										: "font-normal before:w-0"
								}`}
								text="Account"
							/>
							{refreshData.is_main && (
								<LinkTo
									to="/brand/setting-brand-reports"
									className={`mr-[20px] min-w-[80px] text-center relative leading-[33px] text-black  before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] py-[0.5rem] px-[1rem] block before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0 ${
										this.state.activeTab === 2
											? "font-semibold before:w-full"
											: "font-normal before:w-0"
									}`}
									text="Reports"
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		refreshData: state.HeaderReducer.refreshData,
	};
};

export default connect(mapStateToProps)(SettingBrandAccountTopTab);
