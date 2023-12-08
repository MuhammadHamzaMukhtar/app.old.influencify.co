import { Component } from "react";
import Button from "@components/global/Button";
import SettingHeader from "@components/BrandSettings/SettingHeader";
import SettingBrandTopTab from "@components/SettingBrandTopTab";
import SettingBrandSidebar from "@components/SettingBrandSidebar";

class BrandSettingWebhook extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className="setting-tab-navigation">
				<SettingHeader />
				<SettingBrandTopTab />
				<div className="containers">
					<div className="grid grid-cols-12 gap-5">
						<div className="md:col-span-3 md:col-start-1 sm:col-span-6 sm:col-start-4  col-span-12">
							<SettingBrandSidebar />
						</div>
						<div className="md:col-span-9 col-span-12">
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3 sm:!p-12 mb-12">
								<div className="items-center justify-center flex">
									<Button
										text="Generate Webhooks"
										className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default BrandSettingWebhook;
