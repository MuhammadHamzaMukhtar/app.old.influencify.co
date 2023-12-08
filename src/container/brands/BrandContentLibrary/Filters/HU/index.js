import { Component, Fragment } from "react";
import { Transition, Listbox } from "@headlessui/react";
import { AiFillCaretDown } from "react-icons/ai";

const options = [
	{
		key: "0",
		text: "Hu",
		value: "Hu",
		content: "Hu",
	},
];

class HU extends Component {
	constructor(props) {
		super(props);
		this.state = {
			platform: options[0],
		};
	}
	handleChange = (platform) => {
		this.setState({ platform: platform });
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
			<div className="mr-6 mb-4 md:!mb-0">
				<Listbox onChange={(value) => this.handleChange(value)}>
					<div className="relative w-full z-50">
						<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
							<span className="flex items-center whitespace-nowrap">
								{this.defaultValue(options, this.state.platform)}
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
											sort === this.state.platform ? "bg-[#00000008]" : ""
										}`}
										value={sort.value}
									>
										<span
											className={`flex items-center ${
												sort === this.state.platform
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

export default HU;
