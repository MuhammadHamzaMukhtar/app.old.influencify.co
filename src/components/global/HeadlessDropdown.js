import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { AiFillCaretDown } from "react-icons/ai";

const keywordOptions = [
	{
		key: "keywords",
		name: "Keyword",
		value: "keywords",
	},
	{
		key: "#",
		name: "#",
		value: "#",
	},
	{
		key: "@",
		name: "@",
		value: "@",
	},
];

export default function Example() {
	const [selected, setSelected] = useState(keywordOptions[0]);
	const Changes = (val) => {
		setSelected(val);
	};

	return (
		<Listbox defaultValue={selected} onChange={(val) => Changes(val)}>
			<div className="relative mt-1 w-[95px]">
				<Listbox.Button className="relative w-full cursor-pointer rounded-l-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
					<span className="block truncate">{selected.name}</span>
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
					<Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-[14px] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
						{keywordOptions.map((person, personIdx) => (
							<Listbox.Option
								key={personIdx}
								className={({ active }) =>
									`relative cursor-pointer select-none hover:bg-[#00000008] py-2 px-4 ${
										active
											? "bg-[#00000008] text-black font-semibold"
											: "text-gray-900 font-medium"
									}`
								}
								value={person}
							>
								{({ selected }) => (
									<>
										<span
											className={`block truncate ${
												selected ? "font-medium" : "font-normal"
											}`}
										>
											{person.name}
										</span>
									</>
								)}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</Transition>
			</div>
		</Listbox>
	);
}
