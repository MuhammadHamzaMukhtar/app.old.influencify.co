import { Component, Fragment } from "react";
import Button from "@components/global/Button";
import { connect } from "react-redux";
import { BiSearchAlt2 } from "react-icons/bi";
import { Transition, Listbox } from "@headlessui/react";
import { AiFillCaretDown } from "react-icons/ai";

class CampaignsFilters extends Component {
	constructor(props) {
		super(props);
		this.state = {
			reach: "",
		};
	}

	render() {
		return (
			<div className="campaigns-filter">
				<div className="grid grid-cols-12 gap-5">
					<div className="md:col-span-9 col-span-12">
						<div className="flex">
							<input
								placeholder="Search Campaigns"
								aria-label="Recipient's username"
								aria-describedby="basic-addon2"
								name="searchQuery"
								onChange={(e) => this.handleChangeSearch(e)}
								className="border-[1px] flex-1 border-[#ffffff] focus:border-[#7c3292] h-[40px] px-[1rem] focus-visible:outline-0 rounded-l-[8px]"
							/>
							<Button
								prefix={<BiSearchAlt2 />}
								className="text-white h-[40px] border-[1px] border--purple bg--purple rounded-r-[8px] inline-flex items-center justify-center px-4"
							/>
						</div>
					</div>
					<div className="md:col-span-3 col-span-12">
						<Listbox>
							<div className="relative w-full">
								<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
									<span className="block text-[14px] darkGray">
										{this.state.reach != "" ? this.state.reach : "Reach"}
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
										<Listbox.Option
											onClick={() => this.setState({ reach: "10" })}
											className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
												this.state.reach == "10" ? "bg-[#00000008]" : ""
											}`}
											value="10"
										>
											<span
												className={`block ${
													this.state.reach == "10"
														? "purple font-semibold"
														: "text-gray-900 font-medium"
												}`}
											>
												Ten
											</span>
										</Listbox.Option>
										<Listbox.Option
											onClick={() => this.setState({ reach: "20" })}
											className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
												this.state.reach == "20" ? "bg-[#00000008]" : ""
											}`}
											value="20"
										>
											<span
												className={`block ${
													this.state.reach == "20"
														? "purple font-semibold"
														: "text-gray-900 font-medium"
												}`}
											>
												Twenty
											</span>
										</Listbox.Option>
										<Listbox.Option
											onClick={() => this.setState({ reach: "30" })}
											className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
												this.state.reach == "30" ? "bg-[#00000008]" : ""
											}`}
											value="30"
										>
											<span
												className={`block ${
													this.state.reach == "30"
														? "purple font-semibold"
														: "text-gray-900 font-medium"
												}`}
											>
												Thirty
											</span>
										</Listbox.Option>
									</Listbox.Options>
								</Transition>
							</div>
						</Listbox>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		draftCampaigns: state.CampaignReducer.draftCampaigns,
		pagination: state.CampaignReducer.pagination,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleCampaignDelete: (id, campaign_type, index) =>
			dispatch(campaignActions.deleteCampaign(id, campaign_type, index)),
		fetchDraftCampaigns: (url) =>
			dispatch(campaignActions.fetchDraftCampaigns(url)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CampaignsFilters);
