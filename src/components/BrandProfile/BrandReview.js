import { Component } from "react";
import { Tab } from "@headlessui/react";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

class BrandReview extends Component {
	render() {
		return (
			<Tab.Group defaultIndex={0}>
				<div className="grid grid-cols-12 gap-5">
					<div className="md:col-span-4 col-span-12">
						<Tab.List className="flex flex-col mb-0 shadow-[0px_4px_5px_#96969640] bg-[#fbfbfb] rounded-[8px] overflow-hidden">
							<Tab
								className={({ selected }) =>
									classNames(
										"text-[#343749] border-l-[3px] border-b border-b-[#e6e6e7] py-[0.75rem] px-[1.25rem] text-[12pt] flex justify-between focus-visible:outline-[0px]",
										selected
											? "font-semibold border-l-[#343749] bg-white"
											: "font-normal border-l-transparent"
									)
								}
							>
								Review received
							</Tab>
							<Tab
								className={({ selected }) =>
									classNames(
										"text-[#343749] border-l-[3px] border-b border-b-[#e6e6e7] py-[0.75rem] px-[1.25rem] text-[12pt] flex justify-between focus-visible:outline-[0px]",
										selected
											? "font-semibold border-l-[#343749] bg-white"
											: "font-normal border-l-transparent"
									)
								}
							>
								References
							</Tab>
						</Tab.List>
					</div>
					<div className="md:col-span-8 col-span-12">
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
						</Tab.Panels>
					</div>
				</div>
			</Tab.Group>
		);
	}
}
export default BrandReview;
