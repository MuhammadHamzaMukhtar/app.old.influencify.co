import { Component } from "react";
import { connect } from "react-redux";
import LinkTo from "./global/LinkTo";

class SettingTabSidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 0,
		};
	}

	componentDidMount = () => {
		const pathname = window.location.pathname;
		if (pathname === "/account" || pathname === "/account/change-password" || pathname === "/account/close-account") {
			this.setState({
				activeTab: 1,
			});
		}
		if (
			pathname === "/permission" ||
			pathname === "/brand/setting-brand-invitation"
		) {
			this.setState({
				activeTab: 3,
			});
		}
		if (
			pathname === "/billing" ||
			pathname === "/billing/payment-method" ||
			pathname === "/billing/invoice" ||
			pathname === "/billing/credit"
		) {
			this.setState({
				activeTab: 4,
			});
		}
		if (
			pathname === "/integration" ||
			pathname === "/integration/smtp" ||
			pathname === "/integration/shopify" || 
			pathname === "/integration/analytics"
		) {
			this.setState({
				activeTab: 5,
			});
		}
		if (
			pathname === "/history/account-history" ||
			pathname === "/history/credits-history"
		) {
			this.setState({
				activeTab: 6,
			});
		}
	};
	render() {
		const { refreshData } = this.props;

		return (
			<div>
					<div className="bg-[#fbfbfb] shadow-[0px_4px_5px_#96969640] rounded-[8px] overflow-hidden">
						<div className="flex flex-col" role="tablist">
							<LinkTo
								to="/account"
								className={`text-[#343749] border-l-[3px] border-b border-b-[#e6e6e7] py-[8px] px-[1.25rem] text-[15px] flex justify-between focus-visible:outline-[0px] ${
									this.state.activeTab === 1
										? "font-semibold border-l-[#343749] bg-white"
										: "font-normal border-l-transparent"
								}`}
								text="Account"
							/>
						</div>
					</div>
					{refreshData.is_main && (
					<div className="bg-[#fbfbfb] shadow-[0px_4px_5px_#96969640] rounded-[8px] overflow-hidden mt-6">
						<div className="flex flex-col" role="tablist">
							<LinkTo
								to="/permission"
								className={`text-[#343749] border-l-[3px] border-b border-b-[#e6e6e7] py-[8px] px-[1.25rem] text-[15px] flex justify-between focus-visible:outline-[0px] ${
									this.state.activeTab === 3
										? "font-semibold border-l-[#343749] bg-white"
										: "font-normal border-l-transparent"
								}`}
								text="Permissions"
							/>
						</div>
					</div>)}
				{refreshData.is_main && (
					<div className="bg-[#fbfbfb] shadow-[0px_4px_5px_#96969640] rounded-[8px] overflow-hidden mt-6">
						<div className="flex flex-col" role="tablist">
							<LinkTo
								to="/billing"
								className={`text-[#343749] border-l-[3px] border-b border-b-[#e6e6e7] py-[8px] px-[1.25rem] text-[15px] flex justify-between focus-visible:outline-[0px] ${
									this.state.activeTab === 4
										? "font-semibold border-l-[#343749] bg-white"
										: "font-normal border-l-transparent"
								}`}
								text="Billing"
							/>
						</div>
					</div>
				)}
				<div className="bg-[#fbfbfb] shadow-[0px_4px_5px_#96969640] rounded-[8px] overflow-hidden mt-6">
					<div className="flex flex-col" role="tablist">
						<LinkTo
							to="/integration"
							className={`text-[#343749] border-l-[3px] border-b border-b-[#e6e6e7] py-[8px] px-[1.25rem] text-[15px] flex justify-between focus-visible:outline-[0px] ${
								this.state.activeTab === 5
									? "font-semibold border-l-[#343749] bg-white"
									: "font-normal border-l-transparent"
							}`}
							text="Integrations"
						/>
					</div>
				</div>
				<div className="bg-[#fbfbfb] shadow-[0px_4px_5px_#96969640] rounded-[8px] overflow-hidden mt-6">
					<div className="flex flex-col" role="tablist">
						<LinkTo
							to="/history/account-history"
							className={`text-[#343749] border-l-[3px] border-b border-b-[#e6e6e7] py-[8px] px-[1.25rem] text-[15px] flex justify-between focus-visible:outline-[0px] ${
								this.state.activeTab === 6
									? "font-semibold border-l-[#343749] bg-white"
									: "font-normal border-l-transparent"
							}`}
							text="History"
						/>
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

export default connect(mapStateToProps)(SettingTabSidebar);
