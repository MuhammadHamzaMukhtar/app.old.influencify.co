import { Component } from "react";
import Button from "@components/global/Button";
import { connect } from "react-redux";
import { IoCloseCircle } from "react-icons/io5";
import "./styles.css";

class BrandMonitoringNewCampaignScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editTitleFlag: false,
			date: "",
			campaignName: "",
			noCampaignName: false,
			nohashTags: false,
			noStartDate: false,
			is_focused: false,
			relevance: "",
			countExceeding: false,
			tagExist: false,
			hashTagExist: false,
			removeTag: false,
			countHashtagExceeding: false,
			countTagExceeding: false,
			countStoriesExceeding: false,
			handle: "",
		};
		this.timeout = null;
	}

	componentDidMount() {
		let form = {};
		this.props.addForm(form);
		this.props.fetchBrandPages();
	}

	_onFocus = () => {
		this.setState({
			is_focused: true,
		});
	};
	_onBlur = () => {
		this.setState({
			is_focused: false,
			relevance: "",
		});
	};

	showEditInput = () => {
		this.setState({
			editTitleFlag: true,
		});
	};

	hideEditInput = () => {
		let form = this.props.form;
		this.setState({
			editTitleFlag: false,
			campaignName: !form && !form.campaign_name ? "" : form.campaign_name,
		});
	};

	handleTopicTags = (e) => {
		let value = e.target.value;
		const { searchLookalikes } = this.props;
		clearTimeout(this.timeout);
		let query = {
			q: value,
			type: "topic-tags",
			platform: "instagram",
			limit: 10,
			flag: "search-by",
		};
		this.timeout = setTimeout(() => {
			searchLookalikes(query);
		}, 500);
	};
	handleHashTags = (value) => {
		const { platform, topicTags } = this.props;
		clearTimeout(this.timeout);
		let query = {
			q: value,
			limit: 10,
			platform: platform,
			flag: "search-by",
		};
		this.timeout = setTimeout(() => {
			topicTags(query);
		}, 500);
	};
	campaignPayload = (keyword, e, data) => {
		let value = keyword === "startDate" ? e.target.value : data.value;
		const form = Object.assign({}, this.props.form);
		if (keyword === "campaign_name") {
			form[keyword] = data;
			this.setState({ noCampaignName: false, campaignName: data });
			this.props.addForm(form);
		} else if (keyword === "user_stories") {
			if (form.user_stories) {
				form.user_stories.push(value);
				this.props.addForm(form);
			} else {
				let user_stories = [];

				user_stories.push(value);
				form[keyword] = user_stories;

				this.props.addForm(form);
			}
		} else if (keyword === "tags") {
			const form = Object.assign({}, this.props.form);
			if (form.tags) {
				if (form.tags.indexOf(value) !== -1) {
					this.setState({ tagExist: true });
				} else {
					form.tags.push(value);
					const countTag = !form.tags ? 0 : form.tags.length;
					const countHashTag = !form.hashTags ? 0 : form.hashTags.length;
					const totalCount = countTag + countHashTag;
					if (totalCount > 5) {
						this.setState({ countExceeding: true });
					} else {
						this.props.addForm(form);
						this.setState({
							tagExist: false,
							countExceeding: false,
						});
					}
				}
			} else {
				const countTag = !form.tags ? 0 : form.tags.length;
				const countHashTag = !form.hashTags ? 0 : form.hashTags.length;
				const totalCount = countTag + countHashTag;
				if (totalCount < 5) {
					let tags = [];
					tags.push(value);
					form[keyword] = tags;
					this.props.addForm(form);
				} else this.setState({ countExceeding: true });
			}
		} else if (keyword === "mentions") {
			if (form.mentions) {
				form.mentions.push(value);
				this.props.addForm(form);
			} else {
				let mentions = [];

				mentions.push(value);
				form[keyword] = mentions;
				this.props.addForm(form);
			}
		} else if (keyword === "hashTags") {
			const form = Object.assign({}, this.props.form);
			if (form.hashTags) {
				if (form.hashTags.indexOf(value) !== -1) {
					this.setState({ hashTagExist: true });
				} else {
					form.hashTags.push(value);
					const countTag = !form.tags ? 0 : form.tags.length;
					const countHashTag = !form.hashTags ? 0 : form.hashTags.length;
					const totalCount = countTag + countHashTag;
					if (totalCount > 5) {
						this.setState({ countExceeding: true });
					} else {
						this.setState({
							hashTagExist: false,
							countExceeding: false,
						});
						this.props.addForm(form);
					}
				}
			} else {
				const countTag = !form.tags ? 0 : form.tags.length;
				const countHashTag = !form.hashTags ? 0 : form.hashTags.length;
				const totalCount = countTag + countHashTag;
				let hashTags = [];
				if (totalCount > 5) {
					this.setState({ removeTag: true });
				}
				hashTags.push(value);
				form[keyword] = hashTags;
				this.props.addForm(form);
			}
		} else if (keyword === "startDate") {
			let startDate;
			startDate = value;
			form[keyword] = startDate;
			this.props.addForm(form);
		}
	};

	getListName = (listName) => {
		this.setState({ campaignName: listName });
	};
	handleListName = () => {
		this.setState({
			editTitleFlag: false,
		});

		this.campaignPayload("campaign_name", null, this.state.campaignName);
	};

	handleStartCampaign = (e) => {
		e.preventDefault();
		this.setState({
			noCampaignName: false,
			nohashTags: false,
			noStartDate: false,
		});
		const form = Object.assign({}, this.props.form);
		if (!form.campaign_name) {
			this.setState({ noCampaignName: true });
		} else if (
			!(
				(form.hashTags && form.hashTags.length > 0) ||
				(form.tags && form.tags.length > 0) ||
				(form.mentions && form.mentions.length > 0) ||
				(form.user_stories && form.user_stories.length > 0)
			)
		) {
			this.setState({ nohashTags: true });
		} else {
			this.props.createCampaign(form, this.props.navigate);
		}
	};

	removeSearchFilters = (keyword, index) => {
		const form = Object.assign({}, this.props.form);
		if (keyword === "user_stories") {
			form.user_stories.splice(index, 1);
			this.props.addForm(form);
		} else if (keyword === "tags") {
			form.tags.splice(index, 1);
			const countTag = !form.tags ? 0 : form.tags.length;
			const countHashTag = !form.hashTags ? 0 : form.hashTags.length;
			const totalCount = countTag + countHashTag;
			if (totalCount <= 5) {
				this.setState({
					countExceeding: false,
					tagExist: false,
					hashTagExist: false,
				});
			}
			this.props.addForm(form);
		} else if (keyword === "mentions") {
			form.mentions.splice(index, 1);
			this.props.addForm(form);
		} else if (keyword === "hashTags") {
			form.hashTags.splice(index, 1);
			const countTag = !form.tags ? 0 : form.tags.length;
			const countHashTag = !form.hashTags ? 0 : form.hashTags.length;
			const totalCount = countTag + countHashTag;
			if (totalCount <= 5) {
				this.setState({
					countExceeding: false,
					tagExist: false,
					hashTagExist: false,
				});
			}
			this.props.addForm(form);
		} else if (keyword === "startDate") {
			form.startDate = "";
			this.props.addForm(form);
		}
	};
	searchMentions = (e) => {
		clearTimeout(this.timeout);
		let query = {
			searchQuery: e.target.value,
		};
		this.timeout = setTimeout(() => {
			this.props.fetchMentions(query);
		}, 500);
	};

	addHashTags = (value, type) => {
		this.setState({ countHashtagExceeding: false });
		let form = Object.assign({}, this.props.form);
		let hashTags = Object.assign([], form.hashTags);
		if (hashTags.length > 4 && type === "add") {
			this.setState({ countHashtagExceeding: true });
			return;
		}
		if (hashTags.includes(value)) {
			if (type === "remove") {
				hashTags.splice(hashTags.indexOf(value), 1);
			}
		} else {
			hashTags.push(value);
		}
		form.hashTags = hashTags;
		this.props.addForm(form);
	};

	addTags = (value, type) => {
		this.setState({ countTagExceeding: false });
		let form = Object.assign({}, this.props.form);
		let tags = Object.assign([], form.tags);
		if (tags.length > 3 && type === "add") {
			this.setState({ countTagExceeding: true });
			return;
		}
		if (tags.includes(value)) {
			if (type === "remove") {
				tags.splice(tags.indexOf(value), 1);
			}
		} else {
			tags.push(value);
		}
		form.tags = tags;
		this.props.addForm(form);
	};

	addStories = (value, type) => {
		this.setState({ countStoriesExceeding: false });
		let form = Object.assign({}, this.props.form);
		let user_stories = Object.assign([], form.user_stories);
		if (user_stories.length > 3 && type === "add") {
			this.setState({ countStoriesExceeding: true });
			return;
		}
		if (user_stories.includes(value)) {
			if (type === "remove") {
				user_stories.splice(user_stories.indexOf(value), 1);
			}
		} else {
			user_stories.push(value);
		}
		form.user_stories = user_stories;
		this.props.addForm(form);
	};

	enterStories = (e) => {
		if (e.key === "Enter" && (e.target.value || "").length > 2) {
			e.preventDefault();
			this.setState({ countStoriesExceeding: false });
			let form = Object.assign({}, this.props.form);
			let user_stories = Object.assign([], form.user_stories);
			if (user_stories.length > 3) {
				this.setState({ countStoriesExceeding: true });
				return;
			}
			if (user_stories.includes(e.target.value)) {
			} else {
				user_stories.push(e.target.value);
			}
			form.user_stories = user_stories;
			this.props.addForm(form);
			this.setState({ handle: "" });
		}
	};

	addForm = (key, value) => {
		let form = Object.assign({}, this.props.form);
		form[key] = value;
		this.props.addForm(form);
	};

	render() {
		const {
			noCampaignName,
			nohashTags,
			countExceeding,
			countStoriesExceeding,
			removeTag,
		} = this.state;
		const { refreshData, errors, form } = this.props;

		if (!refreshData.is_admin) {
			return null;
		}

		return (
			<div className="containers mb-12">
				<h3 className="dark text-uppercase text-[22px] font-bold pt-12 pb-3">
					Instagram Story Tracking
				</h3>
				<div className="flex items-center">
					<div className="xl:w-9/12 w-full">
						<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 rounded-[8px] shadow--xs">
							<form>
								<div className="grid grid-cols-12 gap-5">
									<div className="col-span-12 py-4">
										<p className="font-bold black text-[18px]">
											Which content would you like to track?
										</p>
										<p>Please specify which username we should track</p>
									</div>
									<div className="lg:col-span-6 col-span-12">
										<div className="mb-[1rem]">
											<label className="font-medium">Campaign Name</label>
											<input
												type="text"
												name="listName"
												id="campaignNameID"
												//placeholder="Campaign Name"
												onChange={(e) =>
													this.addForm("campaign_name", e.target.value)
												}
												value={form.campaign_name}
												className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
											/>
											{noCampaignName && (
												<p className="red ">Name is required</p>
											)}
											{errors && errors.campaign_name && (
												<p className="red">{errors.campaign_name[0]}</p>
											)}
										</div>
									</div>
									<div className="lg:col-span-6 col-span-12">
										<div className="mb-[1rem]">
											<label className="font-medium">User Stories</label>

											<input
												onKeyDown={this.enterStories}
												className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
												type="text"
												placeholder="i.e yulia.kanakina"
												onChange={(e) =>
													this.setState({
														handle: e.target.value,
													})
												}
												value={this.state.handle}
											/>
											<p className="text-[#6c757d]">
												Write influencer username and press enter.
											</p>
											{countStoriesExceeding && (
												<p className="red mt-1">
													You cannot select stories more then 4
												</p>
											)}
											<div className="inline-flex flex-wrap">
												{this.props.form.user_stories
													? this.props.form.user_stories.map((data, index) => (
															<div
																key={index}
																className="flex items-center justify-between mt-4"
															>
																<div className="bg-[#f7f7f7] rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center my-2 mr-1">
																	<IoCloseCircle
																		size={20}
																		className="cursor-pointer purple"
																		onClick={() =>
																			this.addStories(data, "remove")
																		}
																	/>
																	<p className="ml-2 mr-2">{data}</p>
																</div>
															</div>
													  ))
													: ""}
											</div>
										</div>
									</div>
									<div className="lg:col-span-6 col-span-12">
										{nohashTags && (
											<p className="create-campaign mt-1">
												Please enter stories
											</p>
										)}
										<div>
											<label className="text-white block">.</label>
											{countExceeding || removeTag ? (
												<Button
													disabled
													text="Start Campaign"
													className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 "
												/>
											) : (
												<Button
													onClick={this.handleStartCampaign}
													text="Start Campaign"
													className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 "
												/>
											)}
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		isConnectedInstagram:
			state.HeaderReducer.currentLoggedUser.isConnectedInstagram,
		searchTopicTagLoading: state.influencerSearch.searchTopicTagLoading,
		lookalikes: state.influencerSearch.topictags,
		searchTopictags: state.influencerSearch.searchTopictags,
		form: state.MonitoringCampaign.form,
		mentionUser: state.MonitoringCampaign.mentions,
		brandPages: state.MonitoringCampaign.brandPages,
		errors: state.MonitoringCampaign.errors,
		refreshData: state.HeaderReducer.refreshData,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	const { actions } = require("@store/redux/MonitoringCampaignRedux");
	const {
		actions: InfluencerSearch,
	} = require("@store/redux/InfluencerSearchRedux");
	return {
		createCampaign: (data, navigate) => {
			actions.createCampaign(dispatch, data, navigate);
		},

		addForm: (data) => {
			actions.addForm(dispatch, data);
		},

		searchLookalikes: (data) => {
			InfluencerSearch.searchLookalikes(dispatch, data);
		},
		topicTags: (data) => {
			InfluencerSearch.topicTags(dispatch, data);
		},

		fetchMentions: (data) => {
			actions.fetchMentions(dispatch, data);
		},

		fetchBrandPages: () => {
			actions.fetchBrandPages(dispatch);
		},
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BrandMonitoringNewCampaignScreen);
