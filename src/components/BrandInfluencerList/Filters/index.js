import { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Listbox, Transition } from "@headlessui/react";
import { AiFillCaretDown } from "react-icons/ai";
import { BsSortDownAlt } from "react-icons/bs";
import Button from "@components/global/Button";
import { BiSearchAlt2 } from "react-icons/bi";

// const sortOptions = [
// 	{
// 		key: "newestFirst",
// 		text: "Newest",
// 		value: "newestFirst",
// 	},
// 	{
// 		key: "oldestFirst",
// 		text: "Oldest",
// 		value: "oldestFirst",
// 	},
// 	{
// 		key: "nameAtoZ",
// 		text: "A-Z",
// 		value: "nameAtoZ",
// 	},
// 	{
// 		key: "nameZtoA",
// 		text: "Z-A",
// 		value: "nameZtoA",
// 	},
// ];

const sortOptions = [
	{
		key: "date",
		text: "Date",
		value: "date",
	},
	{
		key: "followers",
		text: "Followers",
		value: "followers",
	},
	{
		key: "engagements",
		text: "Engagements",
		value: "engagements",
	},
];

class ListFilters extends Component {
	handleChangeFiter = (key, value) => {
		const payload = Object.assign({}, this.props.payload);
		if (key === "searchQuery") {
			payload.searchQuery = value;
			payload.sortQuery = this.props.sortQuery;
		} else if (key === "sortQuery") {
			payload.sortQuery = value;
		}
		this.props.fetchBrandLists(payload);
	};

	defaultValue = (object, value) => {
		const txt = Object.assign(
			{},
			object.find((o) => o.value === value)
		);
		return txt.text;
	};

	render() {
		const { sortQuery } = this.props;
		return (
			<div className="containers">
				<div className="grid md:grid-cols-12 grid-cols-1 gap-5">
					<div className="md:col-span-6">
						<div className="flex items-center">
							<input
								placeholder="Search Lists"
								className="rounded-l-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
								onChange={(e) =>
									this.handleChangeFiter("searchQuery", e.target.value)
								}
							/>
							<Button
								prefix={<BiSearchAlt2 size={22} />}
								className="px-6 rounded-r-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
							/>
						</div>
					</div>
					<div className="lg:col-span-3 lg:block hidden mt-4 sm:!mt-auto">
						{/* <p>Showing Records 1 to 10 - 33</p> */}
					</div>
					<div className="lg:col-span-3 md:col-span-5 lg:col-start-10 md:col-start-8">
						<div className="flex items-center justify-end">
							<p className="whitespace-nowrap mr-2 flex items-center">
								<BsSortDownAlt size={18} className="mr-1" /> Sort by:
							</p>
							<Listbox
								onChange={(data) => this.handleChangeFiter("sortQuery", data)}
							>
								<div className="relative xxs:min-w-[14em]">
									<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
										<span className="block">
											{this.defaultValue(sortOptions, sortQuery || "")}
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
										<Listbox.Options className="absolute max-h-60 -mt-[7px] w-full overflow-auto rounded-md bg-white py-1 text-[14px] shadow-[0_3px_3px_0_#22242626] focus:outline-none sm:text-sm z-50">
											{sortOptions.map((sort, key) => (
												<Listbox.Option
													key={key}
													className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
														sort.value === sortQuery
															? "bg-[#00000008] text-black font-semibold"
															: "text-gray-900 font-medium"
													}`}
													value={sort.value}
												>
													<span
														className={`block ${
															sort.value === sortQuery
																? "text-black font-semibold"
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
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ brandList }) => {
	return {
		payload: brandList.payload,
		sortQuery: brandList.sortQuery,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/BrandListRedux");
	return {
		fetchBrandLists: (data) => {
			actions.fetchBrandLists(dispatch, data);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ListFilters);
