import { Component, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { AiFillCaretDown } from "react-icons/ai";
import { connect } from "react-redux";

const options = [
	{
		key: "0",
		text: "Newest first",
		value: "newestFirst",
	},
	{
		key: "1",
		text: "Oldest first",
		value: "oldestFirst",
	},
	{
		key: "1",
		text: "Name A-Z",
		value: "nameAtoZ",
	},
	{
		key: "1",
		text: "Name Z-A",
		value: "nameZtoA",
	},
];

class SortFilter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sortValue: "newestFirst",
		};
	}
	handleSortFilter = (keyword, value) => {
		this.setState({ sortValue: value });
		const { searchContentLibrary, addPayload } = this.props;
		const payload = Object.assign({}, this.props.payload);
		payload[keyword] = value;
		addPayload(payload);
		searchContentLibrary(payload);
	};

	defaultValue = (object, value) => {
		const txt = Object.assign(
			{},
			object.find((o) => o.value === value)
		);
		return txt.text;
	};
	render() {
		return (
			<div className="mr-6">
				<div className="flex items-center">
					Sort by Followers:{" "}
					<Listbox
						onChange={(value) => this.handleSortFilter("sortFilter", value)}
					>
						<div className="relative min-w-[14em] ml-2">
							<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
								<span className="block">
									{this.defaultValue(options, this.state.sortValue)}
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
									{options.map((sort, key) => (
										<Listbox.Option
											key={key}
											className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
												sort.value === this.state.sortValue
													? "bg-[#00000008] text-black font-semibold"
													: "text-gray-900 font-medium"
											}`}
											value={sort.value}
										>
											<span
												className={`block ${
													sort.value === this.state.sortValue
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
		);
	}
}
const mapStateToProps = ({ contentLibrary }) => {
	return {
		is_loading: contentLibrary.is_loading,
		items: contentLibrary.items,
		payload: contentLibrary.payload,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/ContentLibraryRedux");
	return {
		searchContentLibrary: (search) => {
			actions.searchContentLibrary(dispatch, search);
		},
		addPayload: (payload) => {
			actions.addPayload(dispatch, payload);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SortFilter);
