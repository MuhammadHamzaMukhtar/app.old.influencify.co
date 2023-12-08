import { Component, Fragment } from "react";
import { Transition, Listbox } from "@headlessui/react";
import { AiFillCaretDown } from "react-icons/ai";
import { connect } from "react-redux";
const options = [
	{
		key: "0",
		text: "Influencer",
		value: "Influencer",
		content: "Influencer",
	},
];

class Influencer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			influencerList: "Select influencer",
		};
	}
	influencerSelect = (keyword, value) => {
		const { addPayload, searchContentLibrary } = this.props;
		const payload = Object.assign({}, this.props.payload);
		if (value !== "Select influencer" && value !== "") {
			this.setState({ influencerList: value });
			payload[keyword] = value;
			addPayload(payload);
			searchContentLibrary(payload);
		}
	};
	render() {
		return (
			<div className="mr-6 mb-4 md:!mb-0">
				<Listbox
					onChange={(value) => this.influencerSelect("influencerEmail", value)}
				>
					<div className="relative w-[11em] z-50">
						<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
							<span className="block whitespace-nowrap">
								{this.state.influencerList}
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
											sort.value === this.state.influencerList
												? "bg-[#00000008]"
												: ""
										}`}
										value={sort.value}
									>
										<span
											className={`block ${
												sort.value === this.state.influencerList
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
		influencer: contentLibrary.influencer,
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

export default connect(mapStateToProps, mapDispatchToProps)(Influencer);
