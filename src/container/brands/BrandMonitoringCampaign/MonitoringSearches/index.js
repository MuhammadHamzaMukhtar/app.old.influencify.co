import { Component, Fragment } from "react";
import { GoSearch } from "react-icons/go";
import { BsSortDownAlt } from "react-icons/bs";
import { FiRefreshCw } from "react-icons/fi";
import { connect } from "react-redux";
import Button from "@components/global/Button";
import { Transition, Listbox } from "@headlessui/react";
import { AiFillCaretDown } from "react-icons/ai";
import "../styles.css";

const SortFilter = [
	{
		value: "newestFirst",
		text: "Newest",
	},
	{
		value: "oldestFirst",
		text: "Oldest",
	},
	{
		value: "nameAtoZ",
		text: "A-Z",
	},
	{
		value: "nameZtoA",
		text: "Z-A",
	},
];

class Monitoringsearches extends Component {
	defaultValue = (object, value) => {
		const txt = Object.assign(
			{},
			object.find((o) => o.value === value)
		);
		return txt.text;
	};
	render() {
		return (
			<div className="grid xs:grid-cols-12 grid-cols-1 items-center">
				<div className="md:col-span-6 col-span-full w-full mb-6 md:!mb-0">
					<div className="flex items-center">
						<input
							placeholder="Search Campaigns"
							aria-label="Recipient's username"
							aria-describedby="basic-addon2"
							className="rounded-l-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
							name="searchQuery"
							onChange={(e) =>
								this.props.handleSearch("searchQuery", e.target.value)
							}
						/>
						<Button
							className="px-6 rounded-r-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
							prefix={<GoSearch size={18} className="fill-white" />}
						/>
					</div>
				</div>
				<div className="lg:col-span-3 lg:block hidden w-full mt-auto mb-4 md:!mb-auto">
					{/* {from && to && total &&
                    <p className="font-medium black">Showing Records {from} to {to} - {total}</p>
                    } */}
				</div>
				<div className="lg:col-span-3 md:col-span-4 lg:col-start-10 md:col-start-9 sm:col-start-7 xs:col-start-5 sm:col-span-6 xs:col-span-8 w-full mb-6 md:!mb-0 ml-auto">
					<div className="flex items-center justify-end">
						<p className="whitespace-nowrap mr-2 flex items-center">
							<BsSortDownAlt size={18} className="" /> Sort by:
						</p>

						<Listbox
							onChange={(sort) =>
								this.props.handleSearch("sortQuery", sort.value)
							}
						>
							<div className="relative w-full">
								<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
									<span className="block">
										{this.defaultValue(SortFilter, this.props.sortQuery)}
									</span>
									<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
										<AiFillCaretDown
											size={12}
											className="text-black opacity-80"
											aria-hidden="true"
										/>
									</span>
								</Listbox.Button>
								<Transition
									as={Fragment}
									leave="transition ease-in duration-100"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<Listbox.Options className="absolute max-h-60 -mt-[5px] w-full overflow-auto rounded-md bg-white py-1 text-[14px] shadow-[0_2px_3px_0_#22242626] focus:outline-none sm:text-sm z-50">
										{SortFilter.map((sort, key) => (
											<Listbox.Option
												key={key}
												className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
													sort.value === this.props.sortQuery
														? "bg-[#00000008]"
														: ""
												}`}
												value={sort}
											>
												<span
													className={`block ${
														sort.value === this.props.sortQuery
															? "purple font-semibold"
															: "text-gray-900 font-medium"
													}`}
												>
													{sort.text}
												</span>
											</Listbox.Option>
										))}
									</Listbox.Options>
								</Transition>
							</div>
						</Listbox>
						<div className="cursor-pointer ml-6" onClick={this.props.refresh}>
							<FiRefreshCw className="text-[18px]" />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ MonitoringCampaign }) => {
	return {
		total: MonitoringCampaign.total,
		from: MonitoringCampaign.from,
		to: MonitoringCampaign.to,
	};
};

export default connect(mapStateToProps)(Monitoringsearches);
