import { Component } from "react";
import ImageUploader from "react-images-upload";
import { connect } from "react-redux";
import {
	HANDLE_CHANGE_CAMPAIGN_BRIEF,
	HANDLE_ON_DROP_FILE,
	HANDLE_ON_DROP_COVER,
	HANDLE_IMAGE_OPTION,
	HANDLE_GOAL_SELECT_SUCCESS,
	HANDLE_INSTRUCTION_CHANGE,
	HANDLE_WORDING_CHANGE,
} from "@store/constants/action-types";
import DOMPurify from "dompurify";
import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
import "./styles.css";

class BriefTab extends Component {
	constructor(props) {
		super(props);
		this.onDrop = this.onDrop.bind(this);
		this.onDropCover = this.onDropCover.bind(this);
		this.state = {
			editorState: "",
			value: "XasADSADSA",
		};
	}

	onDrop(pictureFiles, pictureDataURLs) {
		this.props.handleOnDrop(pictureDataURLs);
	}
	onDropCover(pictureFiles, pictureDataURLs) {
		this.props.handleOnDropCover(pictureDataURLs);
	}

	_handleImageOptionChange = (event) => {
		this.props.handleImageOptionChange(event.target.value);
	};

	createMarkup = (html) => {
		return {
			__html: DOMPurify.sanitize(html),
		};
	};

	rteChange = (content, delta, source, editor) => {
		const instructions = editor.getHTML();
		this.props.handleInstructionChange(instructions);
	};

	postWordingChange = (content, delta, source, editor) => {
		const wording = editor.getHTML();
		this.props.handleWordingChange(wording);
	};

	render() {
		return (
			<div className="SetUpNewCampaign-page">
				<div className="grid grid-cols-12 gap-5">
					<div className="md:col-span-8 sm:col-span-9 col-span-12">
						<h5 className="mb-2  text-[18px]">Instructions</h5>
						<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-12">
							<div className="grid grid-cols-12 gap-5">
								<div className="sm:col-span-7 col-span-12">
									<ReactQuill
										className="editor-class brief-tab-quill"
										theme="snow"
										value={this.props.campaignInstruction}
										onChange={this.rteChange}
									/>
									{this.props.errorsObj?.campaignInstruction ? (
										<div className="red">
											{this.props.errorsObj.campaignInstruction[0]}
										</div>
									) : (
										""
									)}
									{/*
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <input as="textarea" rows="8" name="campaignInstruction"
                                                      value={this.props.campaignInstruction}
                                                      onChange={(event) => this.props.handleChangeCampaignBrief(event)}/>
                                            {this.props.errorsObj.campaignInstruction ?
                                                <FormHelperText  error>{this.props.errorsObj.campaignInstruction[0]}</FormHelperText> : ''}
                                    </Form.Group>
                                    */}
								</div>
								<div className="sm:col-span-5 col-span-12">
									<p className="mb-4">
										Enter further instructions, requirements with regards to
										your Campaign.
									</p>
									<p className="mb-4">
										It’s better to describe in a few bullet points what you want
										to demonstrate with your campaign.
									</p>
									<p>
										The more information you provide to Influencer(s) the better
										result you will get.
									</p>
								</div>
							</div>
						</div>
						<h5 className="mb-2  text-[18px]">Wording of the Post</h5>
						<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-12 Post-type">
							<div className="grid grid-cols-12 gap-5">
								<div className="md:col-span-4 sm:col-span-10 col-span-12">
									<div className="my-5 space-x-4  flex justify-center">
										<label
											htmlFor="gender1"
											className="flex items-center cursor-pointer relative text-black text-[14px]"
										>
											<input
												id="gender1"
												type="radio"
												name="postWordingType"
												checked={
													this.props.postWordingType == "strict" ? true : false
												}
												onChange={(e) =>
													this.props.handleChangeCampaignBrief(e)
												}
												value="strict"
												className="absolute opacity-0 z-[0] peer"
											/>
											<span className="peer-checked:bg-[#7c3292] shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
											Strict
										</label>
										<span>
											{" "}
											Describe the exact wording you like to see in the post.
										</span>
										<label
											htmlFor="gender2"
											className="flex items-center cursor-pointer relative text-black text-[14px]"
										>
											<input
												id="gender2"
												type="radio"
												name="postWordingType"
												checked={
													this.props.postWordingType == "freestyle"
														? true
														: false
												}
												onChange={(e) =>
													this.props.handleChangeCampaignBrief(e)
												}
												value="freestyle"
												className="absolute opacity-0 z-[0] peer"
											/>
											<span className="peer-checked:bg-[#7c3292] shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
											Freestyle
										</label>
										<span>
											Let the Influencer write the post in their own
											tonality/voice.
										</span>
									</div>
								</div>
								<div className="sm:col-span-8 col-span-12">
									<div className="mb-4">
										<ReactQuill
											className="editor-class brief-tab-quill"
											theme="snow"
											value={this.props.postWording}
											onChange={this.postWordingChange}
										/>
										{/*
                                        <input as="textarea" name="postWording" value={this.props.postWording}
                                                      onChange={(event) => this.props.handleChangeCampaignBrief(event)} rows="10"/>
                                        */}
										<span className="mt-4 block">
											You can add @ and the # as well that is also very
											important part of your post!
										</span>
									</div>
								</div>
							</div>
						</div>
						<h5 className="mb-2  text-[18px]">Post Types</h5>
						<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-12">
							<div className="row">
								<div className="flex mb-0 flex-row flex-wrap">
									{this.props.campaignGoals.length
										? this.props.campaignGoals.map((goal, index) => (
												<div className="ck-button" key={index}>
													<input
														type="radio"
														defaultChecked={
															this.props.selectedGoal === goal.goal_name
																? true
																: false
														}
														onChange={(e) => this.props.handleGoalSelect(e)}
														value={goal.goal_name}
														name="goalid"
														id={`c${index}`}
														className="hidden dd-input"
													/>
													<label
														htmlFor={`c${index}`}
														className="m-0 cursor-pointer"
													>
														<img
															className="rounded w-full h-full"
															alt="goal"
															src={goal.goal_image_path}
														/>
														<span className="ck-checked-button font-bold">
															{goal.goal_name}
														</span>
													</label>
												</div>
										  ))
										: ""}
								</div>
							</div>
						</div>
					</div>
					<div className="md:col-span-4 sm:col-span-3 col-span-12">
						<h5 className="mb-2  text-[18px]">Link to share in the Post</h5>
						<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3 sm:!p-4 mb-12">
							<form>
								<div className="mb-4">
									<label className="text-[14px] font-medium">Website URL</label>
									<input
										type="text"
										name="linkToShare"
										className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
										value={this.props.linkToShare}
										onChange={(event) =>
											this.props.handleChangeCampaignBrief(event)
										}
									/>
								</div>
							</form>
						</div>
						<h5 className="mb-2  text-[18px]">
							Images <span className="ml-4">(optional)</span>
						</h5>
						<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3 sm:!p-4 mb-2  Post-type">
							<div className="my-5 space-x-4  flex justify-center">
								<label
									htmlFor="image1"
									className="flex items-center cursor-pointer relative text-black text-[14px]"
								>
									<input
										id="image1"
										type="radio"
										name="images"
										checked={this.props.imageOption === 1 ? true : false}
										onChange={(e) => this._handleImageOptionChange(e)}
										value="1"
										className="absolute opacity-0 z-[0] peer"
									/>
									<span className="peer-checked:bg-[#7c3292] shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
									Use influencer’s own pictures
								</label>
								<label
									htmlFor="image2"
									className="flex items-center cursor-pointer relative text-black text-[14px]"
								>
									<input
										id="image2"
										type="radio"
										name="images"
										checked={this.props.imageOption === 2 ? true : false}
										onChange={(e) => this._handleImageOptionChange(e)}
										value="2"
										className="absolute opacity-0 z-[0] peer"
									/>
									<span className="peer-checked:bg-[#7c3292] shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
									Use uploaded pictures
								</label>
							</div>
							<ImageUploader
								buttonText="Add Images"
								defaultImages={
									this.props.campaignAttachments
										? this.props.campaignAttachments
										: []
								}
								onChange={this.onDrop}
								imgExtension={[".jpg", ".gif", ".png", ".gif"]}
								maxFileSize={2097152}
								withPreview={true}
							/>
							{this.props.errorsObj?.campaignAttachments ? (
								<div className="red">
									{this.props.errorsObj.campaignAttachments[0]}
								</div>
							) : (
								""
							)}
						</div>
						<span>
							Take your Campaign to the next level and upload a branded photo
							for the influencer to share, or upload mood photos to inspire
							them.
						</span>
						<h5 className="mb-2 mt-12  text-[18px]">
							Mobile app cover image{" "}
							<span className="ml-4 mt-6 ">(optional)</span>
						</h5>
						<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3 sm:!p-4 mb-2  Post-type">
							<span>
								This image appears only on Application to distinguish your brand
								from the others and turns up as a cover image of your current
								Product or Sevice.
							</span>
							<ImageUploader
								buttonText="Add Cover"
								defaultImages={
									this.props.campaignCover ? this.props.campaignCover : []
								}
								onChange={this.onDropCover}
								imgExtension={[".jpg", ".gif", ".png", ".gif"]}
								maxFileSize={2097152}
								withPreview={true}
							/>
							{this.props.errorsObj?.campaignCover ? (
								<div className="red">
									{this.props.errorsObj.campaignCover[0]}
								</div>
							) : (
								""
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		errorsObj: state.SetUpNewCampaignReducer.errorsObj,
		campaignInstruction: state.SetUpNewCampaignReducer.campaignInstruction,
		postWording: state.SetUpNewCampaignReducer.postWording,
		postWordingType: state.SetUpNewCampaignReducer.postWordingType,
		linkToShare: state.SetUpNewCampaignReducer.linkToShare,
		campaignAttachments: state.SetUpNewCampaignReducer.campaignAttachments,
		campaignCover: state.SetUpNewCampaignReducer.campaignCover,
		imageOption: state.SetUpNewCampaignReducer.imageOption,
		campaignGoals: state.BasicReducer.campaignGoals,
		selectedGoal: state.SetUpNewCampaignReducer.selectedGoal,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleGoalSelect: (event) =>
			dispatch({ type: HANDLE_GOAL_SELECT_SUCCESS, payload: event }),
		handleChangeCampaignBrief: (event) =>
			dispatch({ type: HANDLE_CHANGE_CAMPAIGN_BRIEF, payload: event }),
		handleInstructionChange: (event) =>
			dispatch({ type: HANDLE_INSTRUCTION_CHANGE, payload: event }),
		handleWordingChange: (event) =>
			dispatch({ type: HANDLE_WORDING_CHANGE, payload: event }),
		handleOnDrop: (event) =>
			dispatch({ type: HANDLE_ON_DROP_FILE, payload: event }),
		handleOnDropCover: (event) =>
			dispatch({ type: HANDLE_ON_DROP_COVER, payload: event }),
		handleImageOptionChange: (event) =>
			dispatch({ type: HANDLE_IMAGE_OPTION, value: event }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BriefTab);
