import { Component, Fragment } from "react";
import { FiDownload } from "react-icons/fi";
import { Popover, Transition } from "@headlessui/react";
import { connect } from "react-redux";
import helper from "../../constants/helper";
import Emitter from "../../constants/Emitter";
import { FaSpinner } from "react-icons/fa";
import Button from "@components/global/Button";
import Anchor from "@components/global/Anchor";
import "./styles.css";
import Tooltip from "@components/global/Tooltip";
import { MdLock } from "react-icons/md";

class Exportlist extends Component {
	constructor(props) {
		super(props);
		this.state = {
			export: true,
			listCount: 1,
			skipCount: 0,
			handleListType: "SHORT",
			cost: 0.5,
			numberInRange: false,
			numberNotValid: false,
			defaultValue: 1,
			totalUsers: "",
			exceedingNumber: false,
			exceedingSkipNumber: false,
		};
	}

	componentDidMount() {
		this.props.createNewExport();
	}

	handleListCount = (e) => {
		let cost = 0;
		this.setState({ listCount: e.target.value });
		this.validateListCount(e.target.value);
		this.setState({ listCount: e.target.value });
		if (this.state.handleListType === "SHORT") {
			cost = e.target.value * 0.5;
			this.setState({ cost: cost });
		}
		if (this.state.handleListType === "FULL") {
			cost = e.target.value * 1;
			this.setState({ cost: cost });
		}
		if (this.state.handleListType === "") {
			this.setState({ cost: 0 });
		}
	};

	handleListType = (e) => {
		let cost = 0;
		this.setState({ handleListType: e.target.value });
		if (e.target.value === "SHORT") {
			if (this.props.selectedInfluencers && this.props.selectedInfluencers.length > 0) {
				cost = this.props.selectedInfluencers.length * 0.5;
				this.setState({ cost: cost });
			} else {
				cost = this.state.listCount * 0.5;
				this.setState({ cost: cost });
			}
		}
		if (e.target.value === "FULL") {
			if (this.props.selectedInfluencers && this.props.selectedInfluencers.length > 0) {
				cost = this.props.selectedInfluencers.length * 1;
				this.setState({ cost: cost });
			} else {
				cost = this.state.listCount * 1;
				this.setState({ cost: cost });
			}
		}
	};

	handlePalyload = async () => {
		let payload = Object.assign({}, this.props.payload);
		let limit = payload["paging"]["limit"];

		payload["export_type"] = this.state.handleListType;
		payload["paging"]["limit"] = this.state.listCount;
		payload["paging"]["skip"] = this.state.skipCount ?? 0;
		payload["dry_run"] = false;
		payload["send_email"] = false;
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
		const data = {
			payload: payload,
			platform: this.props.platform,
			cost: this.state.cost
		}
		if (this.props.refreshData.is_admin) {
			this.setState({ export: false });
			const json = await this.props.exportList(data);
			payload["paging"]["limit"] = limit;
			this.setState({
				numberInRange: false,
				numberNotValid: false,
			});
		} else {
			Emitter.emit("PERMISSION_POPUP");
		}
	};

	handleAnalyzer = () => {
		let AnalyzedUserArray,
			listOfUserIds = [];

		if (this.props.AnalyzedUsers) {
			AnalyzedUserArray = this.props.AnalyzedUsers;
			AnalyzedUserArray.forEach((element) => {
				listOfUserIds.push(element.iq_user_id);
			});
			const data = {
				payloads: {
					ids: listOfUserIds,
					platform: this.props.platform,
					export_type: this.state.handleListType,
					dry_run: false,
					send_email: false,
					paging: {
						limit: listOfUserIds.length,
					},
				},
				cost: this.state.cost,
			};
			if (this.props.refreshData.is_admin) {
				this.props.AnalyzerInfluencer(data);
				this.setState({ export: false });
			} else {
				Emitter.emit("PERMISSION_POPUP");
			}
		}
	};

	handleSelectedInfluencersPalyload = () => {
		let SelectedInfluencersArray,
			listOfUserIds = [];

		if (this.props.selectedInfluencers && this.props.selectedInfluencers.length > 0) {
			SelectedInfluencersArray = this.props.selectedInfluencers;
			SelectedInfluencersArray.forEach((element) => {
				listOfUserIds.push(element.user_profile.user_id);
			});
			const data = {
				payloads: {
					ids: listOfUserIds,
					platform: this.props.platform,
					export_type: this.state.handleListType,
					dry_run: false,
					send_email: false,
					paging: {
						limit: listOfUserIds.length,
					},
				},
				cost: this.state.cost,
			};
			if (this.props.refreshData.is_admin) {
				this.props.AnalyzerInfluencer(data);
				this.setState({ export: false });
			} else {
				Emitter.emit("PERMISSION_POPUP");
			}
		}
	};

	handleList = () => {
		let AnalyzedUserArray,
			listOfUserIds = [];

		if (this.props.AnalyzedUsers) {
			AnalyzedUserArray = this.props.AnalyzedUsers;
			AnalyzedUserArray.forEach((element) => {
				listOfUserIds.push(element.user_profile.user_id);
			});
			const data = {
				payloads: {
					ids: listOfUserIds,
					platform: this.props.platform,
					export_type: this.state.handleListType,
					dry_run: false,
					send_email: false,
					paging: {
						limit: listOfUserIds.length,
					},
				},
				cost: this.state.cost,
			};
			if (this.props.refreshData.is_admin) {
				this.props.ExportInfluencerList(data);
				this.setState({ export: false });
			} else {
				Emitter.emit("PERMISSION_POPUP");
			}
		}
	};
	handleFollowersPayload = () => {
		let InfluentialUserArray,
			listOfUserIds = [];

		if (this.props.AnalyzedUsers) {
			InfluentialUserArray = this.props.AnalyzedUsers;
			InfluentialUserArray.forEach((element) => {
				listOfUserIds.push(element.user_id);
			});

			const data = {
				payloads: {
					ids: listOfUserIds,
					platform: this.props.platform,
					export_type: this.state.handleListType,
					dry_run: false,
					send_email: false,
					paging: {
						limit: listOfUserIds.length,
					},
				},
				cost: this.state.cost,
			};
			if (this.props.refreshData.is_admin) {
				this.props.InfluentialFollowers(data);
				this.setState({ export: false });
			} else {
				Emitter.emit("PERMISSION_POPUP");
			}
		}
	};

	handleLikersPayload = () => {
		let InfluentialLikerArray,
			listOfUserIds = [];

		if (this.props.notableLikers) {
			InfluentialLikerArray = this.props.AnalyzedUsers;

			InfluentialLikerArray.forEach((element) => {
				listOfUserIds.push(element.user_id);
			});

			const data = {
				payloads: {
					ids: listOfUserIds,
					platform: this.props.platform,
					export_type: this.state.handleListType,
					dry_run: false,
					send_email: false,
					paging: {
						limit: listOfUserIds.length,
					},
				},
				cost: this.state.cost,
			};
			if (this.props.refreshData.is_admin) {
				this.props.InfluentialLikers(data);
				this.setState({ export: false });
			} else {
				Emitter.emit("PERMISSION_POPUP");
			}
		}
	};
	validateListCount = (numberOfList) => {
		const { AnalyzedUsers, notableUsers, selectedInfluencers } = this.props;

		if (selectedInfluencers && selectedInfluencers.length > 0) {
			this.setState({ cost: selectedInfluencers.length / 2 })
		}

		if (!isNaN(numberOfList)) {
			this.setState({ numberNotValid: false });
			numberOfList > 0 && numberOfList <= 10000
				? this.setState({ numberInRange: true })
				: this.setState({ numberInRange: false });
		} else if (isNaN(numberOfList)) {
			this.setState({ numberInRange: true });
			this.setState({ numberNotValid: true });
		}
		if (!isNaN(numberOfList) && AnalyzedUsers) {
			let totalUsers = AnalyzedUsers.length;
			numberOfList > totalUsers
				? this.setState({
					exceedingNumber: true,
					totalUsers: totalUsers,
				})
				: this.setState({ exceedingNumber: false });
		}

		if (!isNaN(numberOfList) && notableUsers) {
			let totalUsers = notableUsers.length;
			numberOfList > totalUsers
				? this.setState({
					exceedingNumber: true,
					totalUsers: totalUsers,
				})
				: this.setState({ exceedingNumber: false });
		}
	};

	handleNewExport = () => {
		this.props.createNewExport();
	};

	validateSkipCount = (e) => {
		this.setState({ skipCount: e.target.value })
		if (parseInt(e.target.value) < parseInt(this.props.totalInfluencers)) {
			this.setState({ exceedingSkipNumber: false })
		} else {
			this.setState({ exceedingSkipNumber: true })
		}
	}

	render() {
		const { exportListLoading, exportListDone, refreshData, selectedInfluencers } = this.props;
		const {
			exceedingNumber,
			exceedingSkipNumber,
			numberInRange,
			totalUsers,
			numberNotValid,
			listCount,
			// skipCount
		} = this.state;
		return (
			<div className="flex items-end justify-end export-search-result">
				<Popover className="flex items-center relative pr-2">
					<Popover.Button onClick={() => this.validateListCount(listCount)} className="py-0 w-full purple text-[14px] rounded-[8px] cursor flex items-center">
						<FiDownload className="purple" size={20} />
						<div className="ml-2">
							Export
						</div>
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
						<Popover.Panel className="absolute top-full right-0 z-[12] w-screen transform lg:translate-x-0 xs:translate-x-[100px] translate-x-[130px] sm:max-w-[500px] max-w-[320px]">
							<div className="p-4 bg-white rounded-[8px] shadow-[0px_1rem_3rem_#0000002d]">
								{exportListLoading === false && exportListDone === false ? (
									<div className="w-full">
										<p className="mb-1 font-medium whitespace-nowrap flex items-center">
											{selectedInfluencers?.length > 0 ? selectedInfluencers.length : this.props.influencerCount
												? this.props.influencerCount
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
												: 0
											} influencers found
										</p>
										{selectedInfluencers?.length == 0 &&
											this.props.influencerAnalyzer !== "list" &&
											this.props.influencerAnalyzer !== "analyzer" &&
											this.props.influencerAnalyzer !== "followers" &&
											this.props.influencerAnalyzer !== "mentions" &&
											this.props.influencerAnalyzer !== "likers" && (
												<>
													<div className="mb-4">
														<p className="mb-1 mt-2 text-[12px] gray font-normal cursor-pointer whitespace-nowrap flex items-center">
															Amount of influencers needed
														</p>
														{numberInRange === false && (
															<p className="red">
																Enter Number between 1 and 10k
															</p>
														)}

														{numberNotValid === true && (
															<p className="red">Please Enter the valid Number</p>
														)}
														{exceedingNumber && (
															<p className="red">
																Please enter the number within range of 1 -{" "}
																{totalUsers}
															</p>
														)}
														<input
															placeholder="Enter the amount of Influencers e.g 5"
															type="number"
															className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
															id="numberOfList"
															value={listCount}
															onChange={(e) => this.handleListCount(e)}
														/>
													</div>
													{/* <div className="mb-4">
													<p className="mb-1 mt-2 text-[12px] gray font-normal cursor-pointer whitespace-nowrap flex items-center">
														Amount of influencers to be skipped
													</p>
													{exceedingSkipNumber && (
														<p className="red">
															Please enter the number less than 
															Total Influencers ({this.props.totalInfluencers})
														</p>
													)}
													<input
														placeholder="Skip number of influencers"
														type="number"
														value={skipCount}
														className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
														id="numberOfSkips"
														onChange={(e) => this.validateSkipCount(e)}
													/>
												</div> */}
												</>
											)}
										<div className="flex items-center justify-start">
											<div className="mt-5 space-y-4">
												<label
													htmlFor="short"
													className="flex items-center cursor-pointer relative text-black text-[14px]"
												>
													<input
														id="short"
														type="radio"
														checked={
															this.state.handleListType === "SHORT"
																? true
																: false
														}
														onChange={(e) => this.handleListType(e)}
														value="SHORT"
														className="absolute opacity-0 z-[0] peer"
													/>
													<span className="peer-checked:bg-[#7c3292] shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
													Brief: Basic data
												</label>
												{/* {refreshData && refreshData.is_full_report_access ? ( */}
												<label
													htmlFor="full"
													className="flex items-center cursor-pointer relative text-black text-[14px]"
												>
													<input
														id="full"
														type="radio"
														checked={
															this.state.handleListType === "FULL"
																? true
																: false
														}
														onChange={(e) => this.handleListType(e)}
														value="FULL"
														className="absolute opacity-0 z-[0] peer"
													/>
													<span className="peer-checked:bg-[#7c3292] shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
													Full: Include contacts details and demographic data
												</label>
												{/* ) : (
													<Tooltip
														trigger={
															<label className="flex items-center cursor-pointer relative text-black text-[14px]">
																<input
																	type="radio"
																	value="FULL"
																	disabled
																	className="absolute opacity-0 z-[0] peer"
																/>
																<span className="peer-checked:bg-[#7c3292]/50 shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292]/70 w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
																Full: Include contacts details and demographic
																data
																<MdLock className="ml-1" size={16} />
															</label>
														}
														tooltipText="Please upgrade your subscription to access
																	this feature"
														placement="top-right"
													/>
												)} */}
											</div>
										</div>
										<div className="flex items-center mt-4">
											{this.props.influencerAnalyzer === "Discover" && (
												<>
													{selectedInfluencers && selectedInfluencers?.length > 0 ?
														<Button
															onClick={this.handleSelectedInfluencersPalyload}
															type="button"
															className="py-0 px-4 rounded-[8px] h-[30px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
															text={<>Export ({selectedInfluencers.length})</>}
														/> :
														listCount &&
															numberInRange &&
															!numberNotValid &&
															!exceedingNumber &&
															!exceedingSkipNumber ? (
															<Button
																onClick={this.handlePalyload}
																type="button"
																className="py-0 px-4 rounded-[8px] h-[30px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
																text={<>Export ({listCount})</>}
															/>
														) : (
															<Button
																type="button"
																className="py-0 opacity-70 px-4 rounded-[8px] h-[30px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
																text="Export"
															/>
														)
													}
												</>
											)}

											{/* Influential followers */}

											{this.props.influencerAnalyzer === "followers" && (
												<Button
													onClick={this.handleFollowersPayload}
													type="button"
													className="py-0 px-4 rounded-[8px] h-[30px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
													text={
														<>
															Export ({(this.props.AnalyzedUsers || []).length})
														</>
													}
												/>
											)}

											{this.props.influentialFollowers === "likers" && (
												<Button
													onClick={this.handleLikersPayload}
													type="button"
													className="py-0 px-4 rounded-[8px] h-[30px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
													text={
														<>
															Export ({(this.props.AnalyzedUsers || []).length})
														</>
													}
												/>
											)}

											{this.props.influencerAnalyzer === "analyzer" && (
												<>
													{listCount &&
														numberInRange &&
														!numberNotValid &&
														!exceedingNumber ? (
														<Button
															onClick={this.handleAnalyzer}
															type="button"
															className="py-0 px-4 rounded-[8px] h-[30px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
															text={
																<>
																	Export (
																	{(this.props.AnalyzedUsers || []).length})
																</>
															}
														/>
													) : (
														<Button
															type="button"
															className="py-0 px-4 opacity-70 rounded-[8px] h-[30px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
															text="Export"
														/>
													)}
												</>
											)}

											{this.props.influencerAnalyzer === "list" && (
												<>
													{listCount &&
														numberInRange &&
														!numberNotValid &&
														!exceedingNumber ? (
														<Button
															onClick={this.handleList}
															type="button"
															className="py-0 px-4 rounded-[8px] h-[30px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
															text={
																<>
																	Export (
																	{(this.props.AnalyzedUsers || []).length})
																</>
															}
														/>
													) : (
														<Button
															type="button"
															className="py-0 opacity-70 px-4 rounded-[8px] h-[30px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
															text="Export"
														/>
													)}
												</>
											)}

											{this.props.influencerAnalyzer === "list" ||
												this.props.influencerAnalyzer === "analyzer" ||
												this.props.influencerAnalyzer === "followers" ||
												this.props.influencerAnalyzer === "likers" ? (
												<p className="ml-4 font-normal gray text-[13px] cursor-pointer flex items-center">
													Cost:{" "}
													{this.state.handleListType === "SHORT"
														? (this.props.AnalyzedUsers || []).length / 2
														: (this.props.AnalyzedUsers || []).length}
												</p>
											) : (
												<p className="ml-4 font-normal gray text-[13px] cursor-pointer flex items-center">
													Cost: {this.state.cost}
												</p>
											)}
										</div>
									</div>
								) : (
									<>
										{exportListLoading ? (
											<FaSpinner className="animate-[spin_2s_linear_infinite] mr-2" />
										) : (
											<div className="w-full">
												<>
													<div className="flex items-center success">
														<p className="mb-1 font-medium cursor-pointer text-[17px] flex items-center ml-2">
															Your export is ready!
														</p>
													</div>

													<div className="flex flex-wrap gap-3">
														{this.props.influencerAnalyzer === "Discover" && selectedInfluencers?.length == 0 && (
															<>
																<div className="grow w-50 flex items-center cursor-pointer mb-4">
																	<Anchor
																		className="flex items-center"
																		rel="noopener noreferrer"
																		target="_blank"
																		href={`${helper.url}/downoad-export-file/${this.props.ExportFileDownload.export_id}/csv`}
																		prefix={
																			<FiDownload
																				className="purple"
																				size={20}
																			/>
																		}
																		text={<p className="purple ml-2">CSV</p>}
																	/>
																</div>
																<div className="grow w-50 flex items-center cursor-pointer mb-4">
																	<Anchor
																		className="flex items-center"
																		rel="noopener noreferrer"
																		target="_blank"
																		href={`${helper.url}/downoad-export-file/${this.props.ExportFileDownload.export_id}/xlsx`}
																		prefix={
																			<FiDownload
																				className="purple"
																				size={20}
																			/>
																		}
																		text={
																			<p className="purple ml-2">
																				XLS (first 10,000)
																			</p>
																		}
																	/>
																</div>
																<div className="grow w-50 flex items-center cursor-pointer mb-4">
																	<Anchor
																		className="flex items-center"
																		rel="noopener noreferrer"
																		target="_blank"
																		href={`${helper.url}/downoad-export-file/${this.props.ExportFileDownload.export_id}/json`}
																		prefix={
																			<FiDownload
																				className="purple"
																				size={20}
																			/>
																		}
																		text={<p className="purple ml-2">JSON</p>}
																	/>
																</div>
															</>
														)}

														{this.props.influencerAnalyzer === "Discover" && selectedInfluencers?.length > 0 && (
															<>
																<div className="grow w-50 flex items-center cursor-pointer mb-4">
																	<Anchor
																		className="flex items-center"
																		rel="noopener noreferrer"
																		href={`${helper.url}/downoad-export-file/${this.props.ExportAnalyzerDownload.export_id}/csv`}
																		target="_blank"
																		prefix={
																			<FiDownload
																				className="purple"
																				size={20}
																			/>
																		}
																		text={<p className="purple ml-2">CSV</p>}
																	/>
																</div>
																<div className="grow w-50 flex items-center cursor-pointer mb-4">
																	<Anchor
																		className="flex items-center"
																		rel="noopener noreferrer"
																		href={`${helper.url}/downoad-export-file/${this.props.ExportAnalyzerDownload.export_id}/xlsx`}
																		target="_blank"
																		prefix={
																			<FiDownload
																				className="purple"
																				size={20}
																			/>
																		}
																		text={
																			<p className="purple ml-2">
																				XLS (first 10,000)
																			</p>
																		}
																	/>
																</div>
																<div className="grow w-50 flex items-center cursor-pointer mb-4">
																	<Anchor
																		className="flex items-center"
																		rel="noopener noreferrer"
																		href={`${helper.url}/downoad-export-file/${this.props.ExportAnalyzerDownload.export_id}/json`}
																		target="_blank"
																		prefix={
																			<FiDownload
																				className="purple"
																				size={20}
																			/>
																		}
																		text={<p className="purple ml-2">JSON</p>}
																	/>
																</div>
															</>
														)}

														{this.props.influencerAnalyzer === "analyzer" && (
															<>
																<div className="grow w-50 flex items-center cursor-pointer mb-4">
																	<Anchor
																		className="flex items-center"
																		rel="noopener noreferrer"
																		href={`${helper.url}/downoad-export-file/${this.props.ExportAnalyzerDownload.export_id}/csv`}
																		target="_blank"
																		prefix={
																			<FiDownload
																				className="purple"
																				size={20}
																			/>
																		}
																		text={<p className="purple ml-2">CSV</p>}
																	/>
																</div>
																<div className="grow w-50 flex items-center cursor-pointer mb-4">
																	<Anchor
																		className="flex items-center"
																		rel="noopener noreferrer"
																		href={`${helper.url}/downoad-export-file/${this.props.ExportAnalyzerDownload.export_id}/xlsx`}
																		target="_blank"
																		prefix={
																			<FiDownload
																				className="purple"
																				size={20}
																			/>
																		}
																		text={
																			<p className="purple ml-2">
																				XLS (first 10,000)
																			</p>
																		}
																	/>
																</div>
																<div className="grow w-50 flex items-center cursor-pointer mb-4">
																	<Anchor
																		className="flex items-center"
																		rel="noopener noreferrer"
																		href={`${helper.url}/downoad-export-file/${this.props.ExportAnalyzerDownload.export_id}/json`}
																		target="_blank"
																		prefix={
																			<FiDownload
																				className="purple"
																				size={20}
																			/>
																		}
																		text={<p className="purple ml-2">JSON</p>}
																	/>
																</div>
															</>
														)}

														{this.props.influencerAnalyzer === "list" && (
															<>
																<div className="grow w-50 flex items-center cursor-pointer mb-4">
																	<Anchor
																		className="flex items-center"
																		href={`${helper.url}/downoad-export-file/${this.props.InfluencerListExport.export_id}/csv`}
																		target="_blank"
																		prefix={
																			<FiDownload
																				className="purple"
																				size={20}
																			/>
																		}
																		text={<p className="purple ml-2">CSV</p>}
																	/>
																</div>
																<div className="grow w-50 flex items-center cursor-pointer mb-4">
																	<Anchor
																		className="flex items-center"
																		rel="noopener noreferrer"
																		href={`${helper.url}/downoad-export-file/${this.props.InfluencerListExport.export_id}/xlsx`}
																		target="_blank"
																		prefix={
																			<FiDownload
																				className="purple"
																				size={20}
																			/>
																		}
																		text={
																			<p className="purple ml-2">
																				XLS (first 10,000)
																			</p>
																		}
																	/>
																</div>
																<div className="grow w-50 flex items-center cursor-pointer mb-4">
																	<Anchor
																		className="flex items-center"
																		rel="noopener noreferrer"
																		href={`${helper.url}/downoad-export-file/${this.props.InfluencerListExport.export_id}/json`}
																		target="_blank"
																		prefix={
																			<FiDownload
																				className="purple"
																				size={20}
																			/>
																		}
																		text={<p className="purple ml-2">JSON</p>}
																	/>
																</div>
															</>
														)}

														{this.props.influencerAnalyzer === "followers" && (
															<>
																<div className="grow w-50 flex items-center cursor-pointer mb-4">
																	<Anchor
																		className="flex items-center"
																		rel="noopener noreferrer"
																		href={`${helper.url}/downoad-export-file/${this.props.ExportInfluentialFollowers.export_id}/csv`}
																		target="_blank"
																		prefix={
																			<FiDownload
																				className="purple"
																				size={20}
																			/>
																		}
																		text={<p className="purple ml-2">CSV</p>}
																	/>
																</div>
																<div className="grow w-50 flex items-center cursor-pointer mb-4">
																	<Anchor
																		className="flex items-center"
																		rel="noopener noreferrer"
																		href={`${helper.url}/downoad-export-file/${this.props.ExportInfluentialFollowers.export_id}/xlsx`}
																		target="_blank"
																		prefix={
																			<FiDownload
																				className="purple"
																				size={20}
																			/>
																		}
																		text={
																			<p className="purple ml-2">
																				XLS (first 10,000)
																			</p>
																		}
																	/>
																</div>
																<div className="grow w-50 flex items-center cursor-pointer mb-4">
																	<Anchor
																		className="flex items-center"
																		rel="noopener noreferrer"
																		href={`${helper.url}/downoad-export-file/${this.props.ExportInfluentialFollowers.export_id}/json`}
																		target="_blank"
																		prefix={
																			<FiDownload
																				className="purple"
																				size={20}
																			/>
																		}
																		text={<p className="purple ml-2">JSON</p>}
																	/>
																</div>
															</>
														)}

														{this.props.influencerAnalyzer === "likers" && (
															<>
																<div className="grow w-50 flex items-center cursor-pointer mb-4">
																	<Anchor
																		className="flex items-center"
																		rel="noopener noreferrer"
																		href={`${helper.url}/downoad-export-file/${this.props.ExporTLikerUsers.export_id}/csv`}
																		target="_blank"
																		prefix={
																			<FiDownload
																				className="purple"
																				size={20}
																			/>
																		}
																		text={<p className="purple ml-2">CSV</p>}
																	/>
																</div>
																<div className="grow w-50 flex items-center cursor-pointer mb-4">
																	<Anchor
																		className="flex items-center"
																		rel="noopener noreferrer"
																		href={`${helper.url}/downoad-export-file/${this.props.ExporTLikerUsers.export_id}/xlsx`}
																		target="_blank"
																		prefix={
																			<FiDownload
																				className="purple"
																				size={20}
																			/>
																		}
																		text={
																			<p className="purple ml-2">
																				XLS (first 10,000)
																			</p>
																		}
																	/>
																</div>
																<div className="grow w-50 flex items-center cursor-pointer mb-4">
																	<Anchor
																		className="flex items-center"
																		rel="noopener noreferrer"
																		href={`${helper.url}/downoad-export-file/${this.props.ExporTLikerUsers.export_id}/json`}
																		target="_blank"
																		prefix={
																			<FiDownload
																				className="purple"
																				size={20}
																			/>
																		}
																		text={<p className="purple ml-2">JSON</p>}
																	/>
																</div>
															</>
														)}
													</div>
													<Button
														onClick={() => this.handleNewExport()}
														type="button"
														className="mt-6 px-6 rounded-[8px] h-[30px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
														text="Create new export"
													/>
												</>
											</div>
										)}
									</>
								)}
							</div>
						</Popover.Panel>
					</Transition>
				</Popover>
			</div>
		);
	}
}
const mapStateToProps = ({ influencerSearch, HeaderReducer }) => {
	return {
		form: influencerSearch.form,
		payload: influencerSearch.payload,
		isLoading: influencerSearch.exportFileLoading,
		ExportFileDownload: influencerSearch.ExportFileDownload,
		ExportAnalyzerDownload: influencerSearch.ExportAnalyzerDownload,
		ExportInfluentialFollowers: influencerSearch.ExportInfluentialFollowers,
		ExporTLikerUsers: influencerSearch.ExporTLikers,
		InfluencerListExport: influencerSearch.ExportInfluencerList,
		exportListLoading: influencerSearch.exportListLoading,
		exportListDone: influencerSearch.exportListDone,
		refreshData: HeaderReducer.refreshData,
		influencerCount: influencerSearch.influencerCount,
	};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const { dispatch } = dispatchProps;
	const { actions } = require("@store/redux/InfluencerSearchRedux");
	return {
		...ownProps,
		...stateProps,
		exportList: (payload) => {
			return actions.exportList(dispatch, payload);
		},
		AnalyzerInfluencer: (data) => {
			actions.AnalyzerInfluencer(dispatch, data);
		},
		InfluentialFollowers: (data) => {
			actions.InfluentialFollowers(dispatch, data);
		},

		InfluentialLikers: (data) => {
			actions.InfluentialLikers(dispatch, data);
		},
		ExportInfluencerList: (data) => {
			actions.ExportInfluencerList(dispatch, data);
		},
		createNewExport: () => {
			actions.createNewExport(dispatch);
		},
	};
};
export default connect(mapStateToProps, undefined, mergeProps)(Exportlist);
