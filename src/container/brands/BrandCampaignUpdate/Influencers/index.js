import { Component } from "react";
import { Tab } from "@headlessui/react";
import { AiOutlineInstagram } from "react-icons/ai";
import { MdMusicNote } from "react-icons/md";
import { BsYoutube } from "react-icons/bs";
import InstagramFilters from "@container/brands/BrandInfluencersDiscoverInstagram/InstagramFilters";
import InstagramItems from "@container/brands/BrandInfluencersDiscoverInstagram/InstagramItems";
import YoutubeItems from "@container/brands/BrandInfluencersDiscoverYoutube/YoutubeItems";
import YoutubeFilters from "@container/brands/BrandInfluencersDiscoverYoutube/YoutubeFilters";
import TiktokItems from "@container/brands/BrandInfluencersDiscoverTiktok/TiktokItems";
import TiktokFilters from "@container/brands/BrandInfluencersDiscoverTiktok/TiktokFilters";
import { connect } from "react-redux";
import "./styles.css";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const captalize = (s) => {
	return s.charAt(0).toUpperCase() + s.slice(1);
};

class Influencers extends Component {
	componentDidMount() {
		const { platform, searchInfluencers, clearFilters } = this.props;
		clearFilters();
		const payload = Object.assign({}, this.props.payload);
		let query = {
			platform: platform,
			payload: payload,
		};
		searchInfluencers(query);
		this.requestInfluencerCount(payload, platform);
	}

	handleSelect = (key) => {
		let name;
		if (key === 0) {
			name = "instagram";
		} else if (key === 1) {
			name = "tiktok";
		} else if (key === 2) {
			name = "youtube";
		}
		if (this.props.form.campaign_status === "active") return;
		const { clearFilters, searchInfluencers, platforms } = this.props;
		clearFilters();
		let platform = platforms.find((i) => i.name === name);
		this.handlePlatformChange("platform_id", platform.id, platform.name);
		const payload = Object.assign({}, this.props.payload);

		let query = {
			platform: name,
			payload: payload,
		};
		searchInfluencers(query);
		this.requestInfluencerCount(payload, key);
	};

	handlePlatformChange = (key, value, platform) => {
		this.props.handlePlatform(platform);
		const form = Object.assign({}, this.props.form);
		form[key] = value;
		this.props.addForm(form);
		form.current_tab = 2;
		form.prior_tab = 5;
		this.props.saveCampaign(form);
	};

	requestInfluencerCount = (data, platform) => {
		let payload = Object.assign({}, data);
		if (payload.filter.account_type) {
			if (payload.filter.account_type.includes("2")) {
				payload = {
					...payload,
					filter: {
						...payload.filter,
						account_type: [],
					},
				};
			}
			if (payload.filter.account_type.includes("3")) {
				payload = {
					...payload,
					filter: {
						...payload.filter,
						account_type: [],
					},
				};
			}
			if (payload.filter.account_type.includes("1")) {
				payload = {
					...payload,
					filter: {
						...payload.filter,
						account_type: [1, 3],
					},
				};
			}
		}
		let query = {
			platform: platform,
			payload: payload,
		};

		this.props.searchInfluencersCount(query);
	};

	render() {
		const { form, total, platform, platforms } = this.props;
		return (
			<>
				<Tab.Group
					defaultIndex={
						platform === "instagram"
							? 0
							: platform === "tiktok"
							? 1
							: platform === "youtube"
							? 2
							: null
					}
					onChange={(index) => {
						this.handleSelect(index);
					}}
				>
					<div className="bg-white p-4 border-bottom rounded-t-[8px]">
						<Tab.List className="flex justify-center md:justify-start">
							{platforms &&
								platforms.length > 0 &&
								platforms.map((item, key) => (
									<Tab
										key={key}
										disabled={form.campaign_status === "active" ? true : false}
										className={({ selected }) =>
											classNames(
												"!h-[46px] flex items-center !mr-2 mb-2 md:!mb-0 !rounded-[8px] text-[14px] min-w-[180px] justify-center",
												selected
													? "bg-[#7c3292] text-white"
													: "bg-[#f1f3f4] text-[#343749]"
											)
										}
									>
										{item.name === "instagram" && (
											<AiOutlineInstagram size={20} className="mr-2" />
										)}
										{item.name === "tiktok" && (
											<MdMusicNote size={18} className="mr-2" />
										)}
										{item.name === "youtube" && (
											<BsYoutube size={20} className="mr-2" />
										)}
										{captalize(item.name)}
									</Tab>
								))}
						</Tab.List>
					</div>
					<Tab.Panels className="bg-transparent mb-12">
						{platforms &&
							platforms.length > 0 &&
							platforms.map((item, key) => (
								<Tab.Panel key={key}>
									{item.name === "instagram" && (
										<InstagramFilters customContainer="pb-4 rounded-b-[8px]" />
									)}
									{item.name === "youtube" && (
										<YoutubeFilters customContainer="pb-4 rounded-b-[8px]" />
									)}
									{item.name === "tiktok" && (
										<TiktokFilters customContainer="pb-4 rounded-b-[8px]" />
									)}
									<div className="mt-12">
										{form.type_name === "PUBLIC" ? (
											<div className="text-[16px] leading-[24px] text-[#222] font-bold tracking-[0.1px] mt-2">
												{" "}
												{total
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
												influencers found
											</div>
										) : (
											<>
												{item.name === "instagram" && (
													<InstagramItems newCampaignWithSelected={false} />
												)}
												{item.name === "youtube" && (
													<YoutubeItems newCampaignWithSelected={false} />
												)}
												{item.name === "tiktok" && (
													<TiktokItems newCampaignWithSelected={false} />
												)}
											</>
										)}
									</div>
								</Tab.Panel>
							))}
					</Tab.Panels>
				</Tab.Group>
			</>
		);
	}
}

const mapStateToProps = ({ campaign, influencerSearch, global }) => {
	return {
		form: campaign.form,
		platform: influencerSearch.platform,
		payload: influencerSearch.payload,
		total: influencerSearch.total,
		platforms: global.platforms,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	const { actions } = require("@store/redux/CampaignRedux");
	const {
		actions: searchactions,
	} = require("@store/redux/InfluencerSearchRedux");
	return {
		addForm: (form) => {
			actions.addForm(dispatch, form);
		},
		saveCampaign: (data) => {
			actions.saveCampaign(dispatch, ownProps, data);
		},
		fetchDictionaries: () => {
			searchactions.fetchDictionaries(dispatch);
		},
		clearFilters: () => {
			searchactions.clearFilters(dispatch);
		},
		handlePlatform: (data) => {
			searchactions.handlePlatform(dispatch, data);
		},
		searchInfluencers: (data) => {
			searchactions.searchInfluencers(dispatch, data);
		},
		searchInfluencersCount: (data) => {
			searchactions.searchInfluencersCount(dispatch, data);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Influencers);
