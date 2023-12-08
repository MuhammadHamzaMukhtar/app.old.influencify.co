import { Component } from "react";
import Button from "@components/global/Button";
import SettingHeader from "@components/InfluencerSettings/SettingHeader";
import SettingInfluencerTopTab from "@components/SettingInfluencerTopTab";
import SettingInfluencerSidebar from "@components/SettingInfluencerSidebar";
import SettingSubscriptionPackages from "@components/InfluencerSettings/SettingSubscriptionPackages";

class SettingInfluencerSubscription extends Component {
	render() {
		return (
			<div className="setting-tab-navigation">
				<SettingHeader />
				<SettingInfluencerTopTab />
				<div className="containers">
					<div className="grid grid-cols-12 gap-5">
						<div className="md:col-span-3 sm:col-span-4 col-span-12">
							<SettingInfluencerSidebar />
						</div>
						<div className="md:col-span-9 sm:col-span-8 col-span-12">
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3 sm:!p-12 mb-12">
								<div className="grid grid-cols-12 gap-5">
									<div className="md:col-span-10 md:col-start-2 col-span-12">
										<div className="flex">
											<p>Sorry, your account has been</p>
											<h6 className="ml-2 mt-1 text-[16px]">locked!</h6>
										</div>
										<div className="flex mt-4">
											<p>We tried to charge you with</p>
											<h6 className="ml-2 mt-1 mr-2 text-[16px]"> 59 USD!</h6>
											<p>,but failed.</p>
										</div>
										<p>
											Please ensure that you have enough funds available on your
											credit card or at your balance.
										</p>
										<div className="text-center mt-6">
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
												text="Try Again"
											/>
										</div>
									</div>
								</div>
							</div>
							<div>
								<SettingSubscriptionPackages />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default SettingInfluencerSubscription;
