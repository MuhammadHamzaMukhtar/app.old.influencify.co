import { Component, Fragment } from "react";
import { MdGroup } from "react-icons/md";
import { connect } from "react-redux";
import { Popover, Transition, Combobox } from "@headlessui/react";
import { IoSearchOutline } from "react-icons/io5";

class Type extends Component {
	constructor(props) {
		super(props);
		this.state = {
			query_type: "",
		};
	}
	addPayload = (key, value) => {
		const payload = Object.assign({}, this.props.payload);
		payload[key] = value;
		this.props.addPayload(payload);
	};
	render() {
		const { payload, fetchSingleCampaign } = this.props;
		const { query_type } = this.state;
		if (fetchSingleCampaign.mentions == undefined) {
			fetchSingleCampaign.mentions = [];
		}
		let filteredType =
			query_type === ""
				? fetchSingleCampaign.mentions
				: fetchSingleCampaign.mentions.filter((tag) =>
						tag.text
							.toLowerCase()
							.replace(/\s+/g, "")
							.includes(query_type.toLowerCase().replace(/\s+/g, ""))
				  );
		return (
			<>
				<Popover className="flex items-center relative">
					<Popover.Button
						className={`${
							payload.mentions
								? "bg-[#7c3292] border-[#7c3292] text-white"
								: "bg-whte border-[#ddd]"
						} ${
							this.props.className
						}  px-[16px] leading-[34px] h-[34px] border-y-[1px] flex items-center justify-center focus-visible:outline-0`}
					>
						Mention
					</Popover.Button>
					<Transition
						as={Fragment}
						enter="duration-200 ease-out"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="duration-100 ease-in"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<Popover.Panel className="absolute top-full left-0 z-10 w-screen transform lg:translate-x-0 xs:translate-x-[100px] translate-x-[130px] sm:max-w-[534px] max-w-[320px]">
							<div className="p-4 bg-white rounded-[8px] shadow-[0px_1rem_3rem_#0000002d]">
								<div className="flex items-center">
									<div className="w-full">
										<p className="mb-1 font-medium whitespace-nowrap flex items-center">
											<MdGroup size={20} className="mr-2" />
											Mention
										</p>
										<div>
											<div className="flex items-center">
												<div className="w-full">
													<Combobox
														value={payload.mentions}
														onChange={(data) =>
															this.addPayload("mentions", data)
														}
													>
														<div className="relative mt-1 z-50 w-full">
															<div className="relative w-full cursor-default flex items-center overflow-hidden border border-[#22242626] rounded-lg bg-white text-left focus-visible:outline-0 sm:text-sm">
																<Combobox.Button className="w-full">
																	<Combobox.Input
																		className="w-full border-none h-[35px] px-4 text-sm text-gray-900 focus:outline-0"
																		displayValue={payload.mentions}
																		placeholder="Select Mention"
																		onChange={(e) =>
																			this.setState({
																				query_type: e.target.value,
																			})
																		}
																	/>
																</Combobox.Button>
																<div className="mx-2">
																	<IoSearchOutline color="#9ea1b2" size={20} />
																</div>
															</div>
															<Transition
																as={Fragment}
																leave="transition ease-in duration-100"
																leaveFrom="opacity-100"
																leaveTo="opacity-0"
															>
																<Combobox.Options className="absolute -mt-1 max-h-60 w-full overflow-y-auto rounded-md bg-white py-1 text-[14px] shadow-lg">
																	{filteredType.length === 0 ? (
																		<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
																			No results found.
																		</div>
																	) : (
																		filteredType.map((tag, key) => (
																			<Combobox.Option
																				key={key}
																				className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
																					tag === payload.mentions
																						? "bg-[#00000008] text-black font-semibold"
																						: "text-gray-900 font-medium"
																				}`}
																				value={tag}
																			>
																				<div className="flex items-center">
																					<span className={`block truncate `}>
																						{tag}
																					</span>
																				</div>
																			</Combobox.Option>
																		))
																	)}
																</Combobox.Options>
															</Transition>
														</div>
													</Combobox>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Popover.Panel>
					</Transition>
				</Popover>
			</>
		);
	}
}
const mapStateToProps = ({ MonitoringCampaign }) => {
	return {
		payload: MonitoringCampaign.payload,
		fetchSingleCampaign: MonitoringCampaign.fetchSingleCampaign,
		keyFilters: MonitoringCampaign.keyFilters,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/MonitoringCampaignRedux");
	return {
		addPayload: (payload) => {
			actions.addPayload(dispatch, payload);
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Type);
