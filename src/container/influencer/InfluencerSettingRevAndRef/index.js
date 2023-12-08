import { Tab } from "@headlessui/react";
import SettingHeader from "@components/InfluencerSettings/SettingHeader";
import SettingInfluencerTopTab from "@components/SettingInfluencerTopTab";
import { Helmet } from "react-helmet";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}
export default function InfluencerSettingRevAndRef() {
	const url = window.location.href;
	if (localStorage.getItem("role") !== "influencer") {
		window.location.href = "/";
	}
	return (
		<div className="setting-tab-navigation">
			<Helmet>
				<meta charSet="utf-8" />
				<title>Reviews & References | Influencify</title>
				<link rel="canonical" href={url} />
			</Helmet>
			<SettingHeader />
			<SettingInfluencerTopTab />
			<div className="campaigns-page">
				<div className="containers mb-12">
					<Tab.Group defaultIndex={0}>
						<div className="grid grid-cols-12 gap-5">
							<div className="md:col-span-3 col-span-12">
								<Tab.List className="flex flex-col mb-0 shadow-[0px_4px_5px_#96969640] bg-[#fbfbfb] rounded-[8px] overflow-hidden">
									<Tab
										className={({ selected }) =>
											classNames(
												"text-[#343749] border-l-[3px] border-b border-b-[#e6e6e7] py-[8px] px-[1.25rem] text-[12pt] flex justify-between focus-visible:outline-[0px]",
												selected
													? "font-semibold border-l-[#343749] bg-white"
													: "font-normal border-l-transparent"
											)
										}
									>
										All
									</Tab>
									<Tab
										className={({ selected }) =>
											classNames(
												"text-[#343749] border-l-[3px] border-b border-b-[#e6e6e7] py-[8px] px-[1.25rem] text-[12pt] flex justify-between focus-visible:outline-[0px]",
												selected
													? "font-semibold border-l-[#343749] bg-white"
													: "font-normal border-l-transparent"
											)
										}
									>
										Work in progress
									</Tab>
									<Tab
										className={({ selected }) =>
											classNames(
												"text-[#343749] border-l-[3px] border-b border-b-[#e6e6e7] py-[8px] px-[1.25rem] text-[12pt] flex justify-between focus-visible:outline-[0px]",
												selected
													? "font-semibold border-l-[#343749] bg-white"
													: "font-normal border-l-transparent"
											)
										}
									>
										Preview upload
									</Tab>
								</Tab.List>
							</div>
							<div className="md:col-span-9 col-span-12">
								<Tab.Panels className="bg-transparent">
									<Tab.Panel>
										<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
											We have nothing to show you here.
										</div>
									</Tab.Panel>
									<Tab.Panel>
										<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
											We have nothing to show you here.
										</div>
									</Tab.Panel>
									<Tab.Panel>
										<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
											We have nothing to show you here.
										</div>
									</Tab.Panel>
								</Tab.Panels>
							</div>
						</div>
					</Tab.Group>
				</div>
			</div>
		</div>
	);
}
