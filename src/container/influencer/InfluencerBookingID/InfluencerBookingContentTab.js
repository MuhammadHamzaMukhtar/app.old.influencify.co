import { Component } from "react";
import { Tab } from "@headlessui/react";
import Button from "@components/global/Button";
import { connect } from "react-redux";
import * as influencersBookingIDActions from "@store/actions/InfluencersBookingIDActions";
import Loader from "@components/global/Loader";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}
class InfluencerBookingContentTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedFile: "",
			storyPreviewUrl: "",
			insightPreviewUrl: "",
		};
	}

	fileChangedStoryHandler = (event, id) => {
		const file = event.target.files[0];
		const formData = new FormData();
		formData.append("campaignId", this.props.campaignID);
		formData.append("contentId", id);
		formData.append("story", file);

		this.props.handleUploadContentStory(formData, this.props.campaignID);
	};

	fileChangedInsightHandler = (event, id) => {
		const file = event.target.files[0];
		const formData = new FormData();
		formData.append("campaignId", this.props.campaignID);
		formData.append("contentId", id);
		formData.append("insight", file);
		this.props.handleUploadContentStoryInsight(formData, this.props.campaignID);
	};

	render() {
		if (this.props.isLoading) {
			return (
				<Loader
					className="h-[46vh] w-full flex justify-center items-center"
					size="67"
				/>
			);
		}
		return (
			<>
				{this.props.influencerCampaignContent.length ? (
					this.props.influencerCampaignContent.map((content, index) => (
						<div key={index}>
							{content.contentType === "Story" ? (
								<div className="grid grid-cols-12 gap-5 mb-12">
									<div className="md:col-span-8 sm:col-span-6 col-span-12">
										<h5 className="mb-2 text-[18px]">Story - Upload content</h5>
										<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-12">
											<div className="grid grid-cols-12 gap-5 p-3">
												<div className="md:col-span-9 sm:col-span-8 col-span-12">
													<p>
														Create kick-ass content (photo/video) based on the
														brief, upload it and click on 'Submit'. Once
														approved, publish on your social channel and you’ll
														get paid.
													</p>
												</div>
												<div className="md:col-span-3 sm:col-span-4 col-span-12">
													{content.contentStoryPath ||
													this.state.storyPreviewUrl ? (
														<Button
															prefix={
																<input
																	type="file"
																	className="absolute inset-x-0 h-full cursor-pointer opacity-0"
																	onChange={(e) =>
																		this.fileChangedStoryHandler(
																			e,
																			content.uniqueId
																		)
																	}
																/>
															}
															text="Replace Story"
															className="h-[50px] leading-[3] relative cursor-pointer border-2 border-[#e9eaec] rounded-[8px] bg-[#fbfbfb] shadow-[0px_4px_5px_#96969640] text-center mt-6 mb-6 w-full"
														/>
													) : (
														<Button
															prefix={
																<input
																	type="file"
																	className="absolute inset-x-0 h-full cursor-pointer opacity-0"
																	onChange={(e) =>
																		this.fileChangedStoryHandler(
																			e,
																			content.uniqueId
																		)
																	}
																/>
															}
															text="Upload Story"
															className="h-[50px] leading-[3] relative cursor-pointer border-2 border-[#e9eaec] rounded-[8px] bg-[#fbfbfb] shadow-[0px_4px_5px_#96969640] text-center mt-6 mb-6 w-full"
														/>
													)}
												</div>
											</div>
											<div className="grid grid-cols-12 gap-5 p-3">
												<div className="md:col-span-9 sm:col-span-8 col-span-12">
													<p>Upload the insight screenshot with this button:</p>
												</div>
												<div className="md:col-span-3 sm:col-span-4 col-span-12">
													{content.contentStoryInsightPath ||
													this.state.insightPreviewUrl ? (
														<Button
															prefix={
																<input
																	type="file"
																	className="absolute inset-x-0 h-full cursor-pointer opacity-0"
																	onChange={(e) =>
																		this.fileChangedInsightHandler(
																			e,
																			content.uniqueId
																		)
																	}
																/>
															}
															text="Replace Insight"
															className="h-[50px] leading-[3] relative cursor-pointer border-2 border-[#e9eaec] rounded-[8px] bg-[#fbfbfb] shadow-[0px_4px_5px_#96969640] text-center mt-6 mb-6 w-full"
														/>
													) : (
														<Button
															prefix={
																<input
																	type="file"
																	className="absolute inset-x-0 h-full cursor-pointer opacity-0"
																	onChange={(e) =>
																		this.fileChangedInsightHandler(
																			e,
																			content.uniqueId
																		)
																	}
																/>
															}
															text="Upload Insight"
															className="h-[50px] leading-[3] relative cursor-pointer border-2 border-[#e9eaec] rounded-[8px] bg-[#fbfbfb] shadow-[0px_4px_5px_#96969640] text-center mt-6 mb-6 w-full"
														/>
													)}
												</div>
											</div>
										</div>
									</div>
									<div className="md:col-span-4 sm:col-span-6 col-span-12">
										<h5 className="mb-2 text-[18px]">Preview</h5>
										<div
											className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3"
											style={{ backgroundColor: "#E9EAEC" }}
										>
											<Tab.Group defaultIndex={0}>
												<Tab.List className="flex bg-white rounded-[8px] overflow-hidden">
													<Tab
														className={({ selected }) =>
															classNames(
																"text-[#343749] py-[8px] px-[1.25rem] text-[12pt] focus-visible:outline-[0px]",
																selected ? "font-semibold" : "font-normal"
															)
														}
													>
														Story
													</Tab>
													<Tab
														className={({ selected }) =>
															classNames(
																"text-[#343749] py-[8px] px-[1.25rem] text-[12pt] focus-visible:outline-[0px]",
																selected ? "font-semibold" : "font-normal"
															)
														}
													>
														Insight
													</Tab>
												</Tab.List>
												<Tab.Panels className="bg-transparent">
													<Tab.Panel>
														{content.contentStoryPath ||
														this.state.storyPreviewUrl ? (
															<img
																htmlFor="photo-upload"
																alt="Upload Preview"
																className="w-[350px] h-[300px]"
																src={
																	this.state.storyPreviewUrl
																		? this.state.storyPreviewUrl
																		: content.contentStoryPath
																}
															/>
														) : (
															<h4 className=" text-[20px]">
																No story selected yet...
															</h4>
														)}
													</Tab.Panel>
													<Tab.Panel>
														{content.contentStoryInsightPath ||
														this.state.insightPreviewUrl ? (
															<img
																htmlFor="photo-upload"
																alt="Upload Preview"
																className="w-[350px] h-[300px]"
																src={
																	this.state.insightPreviewUrl
																		? this.state.insightPreviewUrl
																		: content.contentStoryInsightPath
																}
															/>
														) : (
															<h4 className=" text-[20px]">
																No insight selected yet...
															</h4>
														)}
													</Tab.Panel>
												</Tab.Panels>
											</Tab.Group>
										</div>
									</div>
								</div>
							) : (
								""
							)}
							{content.contentType === "Posts" ? (
								<div className="grid grid-cols-12 gap-5 mb-12">
									<div className="md:col-span-8 sm:col-span-6 col-span-12">
										<h5 className="mb-2 text-[18px]">Post - Upload content</h5>
										<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-12">
											<div className="grid grid-cols-12 gap-5 p-3">
												<div className="md:col-span-9 sm:col-span-8 col-span-12">
													<p>
														Create kick-ass content (photo/video) based on the
														brief, upload it and click on 'Submit'. Once
														approved, publish on your social channel and you’ll
														get paid.
													</p>
												</div>
												<div className="md:col-span-3 sm:col-span-4 col-span-12">
													{content.contentStoryPath ||
													this.state.storyPreviewUrl ? (
														<Button
															prefix={
																<input
																	type="file"
																	className="absolute inset-x-0 h-full cursor-pointer opacity-0"
																	onChange={(e) =>
																		this.fileChangedStoryHandler(
																			e,
																			content.uniqueId
																		)
																	}
																/>
															}
															text="Replace Story"
															className="h-[50px] leading-[3] relative cursor-pointer border-2 border-[#e9eaec] rounded-[8px] bg-[#fbfbfb] shadow-[0px_4px_5px_#96969640] text-center mt-6 mb-6 w-full"
														/>
													) : (
														<Button
															prefix={
																<input
																	type="file"
																	className="absolute inset-x-0 h-full cursor-pointer opacity-0"
																	onChange={(e) =>
																		this.fileChangedStoryHandler(
																			e,
																			content.uniqueId
																		)
																	}
																/>
															}
															text="Upload Story"
															className="h-[50px] leading-[3] relative cursor-pointer border-2 border-[#e9eaec] rounded-[8px] bg-[#fbfbfb] shadow-[0px_4px_5px_#96969640] text-center mt-6 mb-6 w-full"
														/>
													)}
												</div>
											</div>
											<div className="grid grid-cols-12 gap-5 p-3">
												<div className="md:col-span-9 sm:col-span-8 col-span-12">
													<p>Upload the insight screenshot with this button:</p>
												</div>
												<div className="md:col-span-3 sm:col-span-4 col-span-12">
													{content.contentStoryInsightPath ||
													this.state.insightPreviewUrl ? (
														<Button
															prefix={
																<input
																	type="file"
																	className="absolute inset-x-0 h-full cursor-pointer opacity-0"
																	onChange={(e) =>
																		this.fileChangedInsightHandler(
																			e,
																			content.uniqueId
																		)
																	}
																/>
															}
															text="Replace Insight"
															className="h-[50px] leading-[3] relative cursor-pointer border-2 border-[#e9eaec] rounded-[8px] bg-[#fbfbfb] shadow-[0px_4px_5px_#96969640] text-center mt-6 mb-6 w-full"
														/>
													) : (
														<Button
															prefix={
																<input
																	type="file"
																	className="absolute inset-x-0 h-full cursor-pointer opacity-0"
																	onChange={(e) =>
																		this.fileChangedInsightHandler(
																			e,
																			content.uniqueId
																		)
																	}
																/>
															}
															text="Upload Insight"
															className="h-[50px] leading-[3] relative cursor-pointer border-2 border-[#e9eaec] rounded-[8px] bg-[#fbfbfb] shadow-[0px_4px_5px_#96969640] text-center mt-6 mb-6 w-full"
														/>
													)}
												</div>
											</div>
										</div>
									</div>
									<div className="md:col-span-4 sm:col-span-6 col-span-12">
										<h5 className="mb-2 text-[18px]">Preview</h5>
										<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-[#E9EAEC] rounded-[8px] p-3">
											<Tab.Group defaultIndex={0}>
												<Tab.List className="flex bg-white rounded-[8px] overflow-hidden">
													<Tab
														className={({ selected }) =>
															classNames(
																"text-[#343749] py-[8px] px-[1.25rem] text-[12pt] focus-visible:outline-[0px]",
																selected ? "font-semibold" : "font-normal"
															)
														}
													>
														Story
													</Tab>
													<Tab
														className={({ selected }) =>
															classNames(
																"text-[#343749] py-[8px] px-[1.25rem] text-[12pt] focus-visible:outline-[0px]",
																selected ? "font-semibold" : "font-normal"
															)
														}
													>
														Insight
													</Tab>
												</Tab.List>
												<Tab.Panels className="bg-transparent">
													<Tab.Panel>
														{content.contentStoryPath ||
														this.state.storyPreviewUrl ? (
															<img
																htmlFor="photo-upload"
																alt="Upload Preview"
																className="w-[350px] h-[300px]"
																src={
																	this.state.storyPreviewUrl
																		? this.state.storyPreviewUrl
																		: content.contentStoryPath
																}
															/>
														) : (
															<h4 className=" text-[20px]">
																No story selected yet...
															</h4>
														)}
													</Tab.Panel>
													<Tab.Panel>
														{content.contentStoryInsightPath ||
														this.state.insightPreviewUrl ? (
															<img
																htmlFor="photo-upload"
																alt="Upload Preview"
																className="w-[350px] h-[300px]"
																src={
																	this.state.insightPreviewUrl
																		? this.state.insightPreviewUrl
																		: content.contentStoryInsightPath
																}
															/>
														) : (
															<h4 className=" text-[20px]">
																No insight selected yet...
															</h4>
														)}
													</Tab.Panel>
												</Tab.Panels>
											</Tab.Group>
										</div>
									</div>
								</div>
							) : (
								""
							)}
						</div>
					))
				) : (
					<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
						We have nothing to show you here.
					</div>
				)}
			</>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		isLoading: state.InfluencersBookingIDReducer.isLoading,
		campaignType: state.InfluencersBookingIDReducer.campaignType,
		influencerCampaignContent:
			state.InfluencersBookingIDReducer.influencerCampaignContent,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		handleUploadContentStory: (query, campaignId) =>
			dispatch(
				influencersBookingIDActions.handleUploadContentStory(query, campaignId)
			),
		handleUploadContentStoryInsight: (query, campaignId) =>
			dispatch(
				influencersBookingIDActions.handleUploadContentStoryInsight(
					query,
					campaignId
				)
			),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InfluencerBookingContentTab);
