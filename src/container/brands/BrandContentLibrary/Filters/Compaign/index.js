import { Component, Fragment } from "react";
import { Transition, Listbox } from "@headlessui/react";
import { AiFillCaretDown } from "react-icons/ai";
import { connect } from "react-redux";

const options = [
	{
		key: "0",
		text: "Compaign",
		value: "Compaign",
		content: "Compaign",
	},
];

class Compaign extends Component {
	constructor(props) {
		super(props);
		this.state = {
			seletCampaign: "Select Campaign",
		};
	}
	selectCampaign = (keyword, value) => {
		const { searchContentLibrary, addPayload } = this.props;
		const payload = Object.assign({}, this.props.payload);
		this.setState({ seletCampaign: value });
		if (value !== "Select Campaign" && value !== "") {
			payload[keyword] = value;
			addPayload(payload);
			searchContentLibrary(payload);
		}
	};

	render() {
		return (
			<div className="mr-6 mb-4 md:!mb-0">
				<Listbox onChange={(value) => this.selectCampaign("campaignId", value)}>
					<div className="relative w-[11em] z-50">
						<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
							<span className="block whitespace-nowrap">
								{this.state.seletCampaign}
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
								{options.map((sort, key) => (
									<Listbox.Option
										key={key}
										className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
											sort.value === this.state.seletCampaign
												? "bg-[#00000008]"
												: ""
										}`}
										value={sort.value}
									>
										<span
											className={`block ${
												sort.value === this.state.seletCampaign
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
			</div>
		);
	}
}
const mapStateToProps = ({ contentLibrary }) => {
	return {
		is_loading: contentLibrary.is_loading,
		items: contentLibrary.items,
		payload: contentLibrary.payload,
		campaignList: contentLibrary.campaign,
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

export default connect(mapStateToProps, mapDispatchToProps)(Compaign);
