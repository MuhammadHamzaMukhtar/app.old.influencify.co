import { Component, Fragment } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import SocialListIcons from "../../../../constants/SocialListIcons";
import { BRAND_CHANGE_CAMPAING_DROPDOWN_SUCCESS } from "@store/constants/action-types";
import * as brandBookingCampaignActions from "@store/actions/BrandBookingCampaignActions";
import Emitter from "../../../../constants/Emitter";
import { VscFilePdf } from "react-icons/vsc";
import Api from "@services/axios";
import Anchor from "@components/global/Anchor";
import LinkTo from "@components/global/LinkTo";
import { IoSettingsSharp } from "react-icons/io5";
import { Combobox, Transition } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";

class BrandBookingSubHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			query_campaign: "",
		};
	}

	handleChangeSelect = (id) => {
		this.props.navigate("/brand/brand-booking/" + id);
		this.props.handleChangeDropdown(id);
		// this.props.brandBookingCampaignOverview(id);
		// this.props.brandBookingCampaignInfluencers(id);
		// this.props.brandBookingCampaignContent(id);
		// this.props.brandBookingCampaignChatUsers(id);
		// this.props.brandBookingCampaignActivites(id);
	};

	draftCampaign = (event) => {
		const id = this.props.campaignId;
		Swal.fire({
			title: "Are you sure?",
			text: "Do you want to draft this campaign?",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: "Yes, do it",
			cancelButtonText: "No!",
			confirmButtonColor: "#7c3292",
			cancelButtonColor: "#f4f4f5",
			customClass: {
				actions: "flex-row-reverse",
				closeButton: "hover:text-[#7c3292]",
				confirmButton: "hover:!shadow-none focus:!shadow-none min-w-[100px]",
				cancelButton:
					"hover:!shadow-none focus:!shadow-none min-w-[100px] !text-[#202020]",
			},
			allowOutsideClick: () => !Swal.isLoading(),
		}).then((result) => {
			if (result.value) {
				// axios
				//     .post(helper.url + "/api/v1/draft-campaign/" + id)
				Api.DraftCampaign(id).then((res) => {
					if (res.data === "success") {
						this.props.brandBookingCampaignOverview(id);
						toast.success("Campaign Draft Successfully!");
					} else {
						toast.error(res.data.CanNotDraft);
					}
				});
			}
		});
	};

	checkPermission = () => {
		if (!this.props.refreshData.is_admin) {
			Emitter.emit("PERMISSION_POPUP");
		}
	};

	render() {
		let selectedCampaign = {};
		let campaigns = [];
		if (this.props.campaign?.campaignStatus === "active") {
			campaigns =
				this.props.activeCampaigns &&
				this.props.activeCampaigns.length > 0 &&
				this.props.activeCampaigns.map((data) => ({
					label: data.campaignTitle ? data.campaignTitle : "Noname",
					value: data.id ? data.id : "",
				}));
			let campaign =
				Array.isArray(this.props.activeCampaigns) &&
				this.props.activeCampaigns.find(
					(el) => el.id === this.props.campaignId
				);
			if (campaign) {
				selectedCampaign = {
					label: campaign.campaignTitle ? campaign.campaignTitle : "Noname",
					value: campaign.id,
				};
			}
		}
		// if (this.props.activeCampaignTab === 1) {
		// 	campaigns = this.props.draftCampaigns && this.props.draftCampaigns.map((data) => ({
		// 		label: data.campaignTitle ? data.campaignTitle : "Noname",
		// 		value: data.id ? data.id : "",
		// 	}));
		// 	let campaign =
		// 		Array.isArray(this.props.draftCampaigns) &&
		// 		this.props.draftCampaigns.find((el) => el.id === this.props.campaignId);
		// 	if (campaign) {
		// 		selectedCampaign = {
		// 			label: campaign.campaignTitle ? campaign.campaignTitle : "Noname",
		// 			value: campaign.id,
		// 		};
		// 	}
		// }
		if (this.props.campaign?.campaignStatus === "closed") {
			campaigns = this.props.closedCampaigns?.map((data) => ({
				label: data.campaignTitle ? data.campaignTitle : "Noname",
				value: data.id ? data.id : "",
			}));
			let campaign =
				Array.isArray(this.props.closedCampaigns) &&
				this.props.closedCampaigns.find(
					(el) => el.id === this.props.campaignId
				);
			if (campaign) {
				selectedCampaign = {
					label: campaign.campaignTitle ? campaign.campaignTitle : "Noname",
					value: campaign.id,
				};
			}
		}

		const filteredCampaigns =
			this.state.query_campaign === ""
				? campaigns
				: campaigns.filter((campaign) =>
						campaign.label
							.toLowerCase()
							.replace(/\s+/g, "")
							.includes(
								this.state.query_campaign.toLowerCase().replace(/\s+/g, "")
							)
				  );

		return (
			<div className="grid grid-cols-12 gap-5 items-center">
				<div className="lg:col-span-4 md:col-span-6 col-span-12">
					<div className="flex items-center">
						<Combobox
							value={selectedCampaign.label}
							onChange={(e) => this.handleChangeSelect(e)}
						>
							<div className="relative mt-1 z-50 w-full">
								<div className="relative w-full cursor-default flex items-center overflow-hidden border border-[#22242626] rounded-lg bg-white text-left focus-visible:outline-0">
									<Combobox.Button className="w-full flex items-center">
										<Combobox.Input
											className="w-full border-none h-[35px] pl-4 text-sm text-[#7d2d94] font-medium !text-[16px] !placeholder:text-[16px] focus:outline-0 truncate"
											displayValue={selectedCampaign.label}
											onChange={(event) =>
												this.setState({
													query_campaign: event.target.value,
												})
											}
										/>
										<div className="mx-2">
											<FiChevronDown color="#9ea1b2" size={20} />
										</div>
									</Combobox.Button>
								</div>
								<Transition
									as={Fragment}
									leave="transition ease-in duration-100"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
									afterLeave={() => this.setState({ query_campaign: "" })}
								>
									<Combobox.Options className="absolute -mt-1 max-h-60 w-full overflow-y-auto rounded-md bg-white py-1 text-[14px] shadow-lg">
										{filteredCampaigns === false ? (
											<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
												No results found.
											</div>
										) : (
											filteredCampaigns?.map((campain, key) => (
												<Combobox.Option
													key={key}
													className={`relative cursor-pointer break-all select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
														campain.value === selectedCampaign.value
															? "bg-[#00000008] text-[#7d2d94] font-semibold"
															: "text-gray-900 font-medium"
													}`}
													value={campain.value}
												>
													{campain.label}
												</Combobox.Option>
											))
										)}
									</Combobox.Options>
								</Transition>
							</div>
						</Combobox>
					</div>
				</div>
				<div className="lg:col-span-3 md:col-span-6 col-span-12">
					<div className="flex items-center h-full">
						<p className="mr-2">
							{SocialListIcons(this.props.campaign.platformName, 30)}
						</p>

						<div>
							<h5 className="text-[14px] black ">
								{this.props.campaign.campaignType === "quoteCampaign"
									? "Request a Quote Campaign"
									: this.props.campaign.campaignType === "influencerCampaign"
									? "Influencer Campaign"
									: this.props.campaign.campaignType === "contentCampaign"
									? "Affiliate Campaign"
									: ""}
								{this.props.campaign.countries &&
								this.props.campaign.countries.length > 0
									? this.props.campaign.countries[0].label
									: ""}
							</h5>
							<span>
								{this.props.campaign.campaignDate && (
									<span className="darkGray font-normal text-[12px]">
										{this.props.campaign.campaignDate.formatedPostingFrom} -{" "}
										{this.props.campaign.campaignDate.formatedPostingTo}
									</span>
								)}
							</span>
						</div>
					</div>
				</div>
				<div className="lg:cols-start-8 lg:col-span-5 col-span-12">
					<div className="flex flex-wrap items-center w-full justify-end h-full gap-4">
						{this.props.campaign.id && this.props.campaign.campaignStatus !== "closed" && this.props.campaign.campaignStatus !== "rejected" && (
							<div onClick={this.checkPermission} className="inline-block">
								<LinkTo
									to={
										this.props.refreshData.is_admin
											? `/brand/campaign/${this.props.campaign.id}`
											: "#"
									}
									prefix={<IoSettingsSharp className="mr-2 fill-white" />}
									text="Campaign settings"
									className="px-[1rem] rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
								/>
							</div>
						)}
						{this.props.campaign && this.props.campaign.id && (
							<Anchor
								className="text-[13px] black px-[1rem] rounded-[8px] h-[40px] inline-flex items-center bg--lightGray hover:opacity-80"
								target="_blank"
								href={`${process.env.REACT_APP_BASE_URL}/export-campaign-overview/${this.props.campaign.id}`}
								text="Export Overview"
								prefix={<VscFilePdf size={18} className="mr-2" />}
							/>
						)}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		activeCampaignTab: state.CampaignReducer.activeCampaignTab,
		campaign: state.BrandBookingCampaignReducer.campaign,
		campaignId: state.BrandBookingCampaignReducer.campaignId,
		activeCampaigns: state.BrandBookingCampaignReducer.activeCampaigns,
		draftCampaigns: state.BrandBookingCampaignReducer.draftCampaigns,
		closedCampaigns: state.BrandBookingCampaignReducer.closedCampaigns,
		currentLoggedUser: state.HeaderReducer.currentLoggedUser,
		refreshData: state.HeaderReducer.refreshData,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		brandBookingCampaignOverview: (query) =>
			dispatch(brandBookingCampaignActions.brandBookingCampaignOverview(query)),
		brandBookingCampaignInfluencers: (id) =>
			dispatch(brandBookingCampaignActions.brandBookingCampaignInfluencers(id)),
		brandBookingCampaignContent: (id) =>
			dispatch(brandBookingCampaignActions.brandBookingCampaignContent(id)),
		brandBookingCampaignActivites: (id) =>
			dispatch(brandBookingCampaignActions.brandBookingCampaignActivites(id)),
		brandBookingCampaignChatUsers: (id) =>
			dispatch(brandBookingCampaignActions.brandBookingCampaignChatUsers(id)),
		duplicateCampaign: (id) =>
			dispatch(brandBookingCampaignActions.duplicateCampaign(id, ownProps)),
		handleChangeDropdown: (id) =>
			dispatch({
				type: BRAND_CHANGE_CAMPAING_DROPDOWN_SUCCESS,
				payload: id,
			}),
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BrandBookingSubHeader);
