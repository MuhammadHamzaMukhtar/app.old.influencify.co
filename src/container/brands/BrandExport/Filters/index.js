import { Component, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { AiFillCaretDown } from "react-icons/ai";
import { BsSortDownAlt } from "react-icons/bs";

const sortOptions = [
    {
        text: "Newest",
        value: "created_at|desc",
    },
    {
        text: "Oldest",
        value: "created_at|asc",
    },
    {
        text: "Accounts: High - Low",
        value: "total_accounts|desc",
    },
    {
        text: "Accounts: Low - High",
        value: "total_accounts|asc",
    },
];
const socialNetwork = [
    {
        text: "All",
        value: "",
    },
    
    {
        text: "Youtube",
        value: "youtube",
    },
   
    {
        text: "Tiktok",
        value: "tiktok",
    },
];
const exportType = [
    {
        text: "All",
        value: "",
    },
    {
        text: "Regular",
        value: "SHORT",
    },
    {
        key: "export_type",
        text: "With contact detail",
        value: "FULL",
    },
];

class BrandExportFilters extends Component {
    constructor() {
        super();
        this.state = {
            sortQuery: sortOptions[0].value,
            socialQuery: socialNetwork[0].value,
            exportQuery: exportType[0].value
        }
    }

    handleChangeFiter = (option, data) => {
        if (option === 'sort') {
            this.setState({ sortQuery: data });
            this.props.setSort(data);
        }
        if (option === 'social') {
            this.setState({ socialQuery: data })
            this.props.setPlatform(data);
        }
        if (option === 'exporttype') {
            this.setState({ exportQuery: data })
            this.props.setType(data);
        }

    }

    defaultValue = (object, value) => {
		const txt = Object.assign(
			{},
			object.find((o) => o.value === value)
		);
		return txt.text;
	};

    render() {
        const { sortQuery, socialQuery, exportQuery } = this.state
        return (
            <div className="containers">
                <div className="flex lg:flex-nowrap flex-wrap justify-between gap-3">
                    <div className="flex items-center flex-wrap lg:w-3/4 w-full gap-3">
                        <div className="lg:w-auto w-full">
                            <div className="flex items-center lg:flex-nowrap flex-wrap justify-start">
                                <p className="whitespace-nowrap mr-2 flex items-center">
                                    Social networks:
                                </p>
                                <Listbox
                                    onChange={(data) => this.handleChangeFiter('social', data)}
                                >
                                    <div className="relative xxs:min-w-[14em] lg:w-auto w-full">
                                        <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
                                            <span className="block">
                                                {this.defaultValue(socialNetwork, socialQuery)}
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
                                                {socialNetwork.map((social, key) => (
                                                    <Listbox.Option
                                                        key={key}
                                                        className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${social.value === socialQuery
                                                            ? "bg-[#00000008] text-black font-semibold"
                                                            : "text-gray-900 font-medium"
                                                            }`}
                                                        value={social.value}
                                                    >
                                                        <span
                                                            className={`block ${social.value === socialQuery
                                                                ? "text-black font-semibold"
                                                                : "text-gray-900 font-medium"
                                                                }`}
                                                        >
                                                            {social.text}
                                                        </span>
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </Transition>
                                    </div>
                                </Listbox>
                            </div>
                        </div>
                        <div className="lg:w-auto w-full">
                            <div className="flex items-center lg:flex-nowrap flex-wrap justify-start">
                                <p className="whitespace-nowrap mr-2 flex items-center">
                                     Export Type:
                                </p>
                                <Listbox
                                    onChange={(data) => this.handleChangeFiter('exporttype', data)}
                                >
                                    <div className="relative xxs:min-w-[14em] lg:w-auto w-full">
                                        <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
                                            <span className="block">
                                                {this.defaultValue(exportType, exportQuery)}
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
                                                {exportType.map((exporttype, key) => (
                                                    <Listbox.Option
                                                        key={key}
                                                        className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${exporttype.value === exportQuery
                                                            ? "bg-[#00000008] text-black font-semibold"
                                                            : "text-gray-900 font-medium"
                                                            }`}
                                                        value={exporttype.value}
                                                    >
                                                        <span
                                                            className={`block ${exporttype.value === exportQuery
                                                                ? "text-black font-semibold"
                                                                : "text-gray-900 font-medium"
                                                                }`}
                                                        >
                                                            {exporttype.text}
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
                    <div className="lg:w-1/4 w-full">
                        <div className="flex items-center lg:flex-nowrap flex-wrap justify-start">
                            <p className="whitespace-nowrap mr-2 flex items-center">
                                <BsSortDownAlt size={18} className="mr-1" /> Sort by:
                            </p>
                            <Listbox
                                onChange={(data) => this.handleChangeFiter('sort', data)}
                            >
                                <div className="relative xxs:min-w-[14em] lg:w-auto w-full">
                                    <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
                                        <span className="block">
                                            {this.defaultValue(sortOptions, sortQuery)}
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
                                                    className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${sort.value === sortQuery
                                                        ? "bg-[#00000008] text-black font-semibold"
                                                        : "text-gray-900 font-medium"
                                                        }`}
                                                    value={sort.value}
                                                >
                                                    <span
                                                        className={`block ${sort.value === sortQuery
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
        )
    }
}

export default BrandExportFilters