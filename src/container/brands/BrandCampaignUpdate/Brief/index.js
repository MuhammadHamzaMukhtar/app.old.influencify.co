import { Component } from "react";
import ImageUploader from "react-images-upload";
import ReactQuill from "react-quill";
import { connect } from "react-redux";
import Tooltip from "@components/global/Tooltip";
import { AiFillInfoCircle } from "react-icons/ai";
import { BsQuestionCircle } from "react-icons/bs";
import "./styles.css";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";

class Brief extends Component {
	componentDidMount() {
		this.props.creation_errors.instruction = "";
		this.props.creation_errors.link_to_share = "";
	}

	handleChange = (key, value) => {
		const { addForm } = this.props;
		const form = Object.assign({}, this.props.form);
		if (key === "post_wording_type") {
			form[key] = value;
		} else if (key === "image_option") {
			form[key] = parseInt(value);
		} else if (key === "link_to_share") {
			form[key] = value;
		} else if (key === "instruction") {
			form[key] = value;
		} else if (key === "post_wording") {
			form[key] = value;
		} else if (key === "goal_id") {
			form[key] = value;
		} else if (key === "attachments") {
			form[key] = value;
		} else if (key === "covers") {
			form[key] = value;
		}
		addForm(form);
	};

	handleSaveImages = (pictureFiles, value, isDelete = false) => {
		if (!isDelete) {
			const maxFileSize = 2097152; // 2MB in bytes
	
			const invalidPictureFiles = (pictureFiles || []).find(file => file.size > maxFileSize);
			if (invalidPictureFiles) {
				const invalidPictureFileIndex = (pictureFiles || []).findIndex(file => file.size > maxFileSize);
				const indexToRemove = value.findIndex(
					(file) => {
						const first_semicolon_index = file.indexOf(';');
						const second_semicolon_index = file.indexOf(";", first_semicolon_index + 1)
						const nameValue = file.substring(0, second_semicolon_index).match(/name=([^&]+)/)?.[1];
						return nameValue == invalidPictureFiles.name
					}
				);
				pictureFiles.splice(invalidPictureFileIndex, 1)
				value.splice(indexToRemove, 1)
				toast.error('File size exceeds the maximum limit (2MB)');
			} else {
				const query = {
					attachments: value,
					campaign_id: this.props.form.campaign_id,
					isDelete: isDelete
				}
				this.props.saveImages(query);
			}
		} else {
			const query = {
				attachments: value,
				campaign_id: this.props.form.campaign_id,
				isDelete: isDelete
			}
			this.props.saveImages(query);
		}
	}

	render() {
		const { form, creation_errors } = this.props;
		return (
			<div className="grid md:grid-cols-12 grid-cols-1 gap-5 mb-12">
				<div className="md:col-span-8">
					<h5 className="mb-2  text-[18px]">Instructions</h5>
					<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-6 rouded--lg">
						<div className="grid sm:grid-cols-12 grid-cols-1 gap-5">
							<div className="sm:col-span-7">
								<ReactQuill
									className="editor-class brief-tab-quill"
									value={form.instruction}
									onChange={(editor) =>
										this.handleChange("instruction", editor)
									}
									readOnly={
										form.campaign_status === "active" ? true : false
									}
									theme="snow"
								/>
							</div>
							<div className="sm:col-span-5">
								<p className="mb-4">
									Enter further instructions, requirements with regards to your
									Campaign.
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
							<p className="pink col-span-full">
								{creation_errors.instruction}
							</p>
						</div>
					</div>
					<h5 className="mb-2  text-[18px]">Wording of the Post</h5>
					<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-6 rouded--lg Post-type">
						<div className="grid xs:grid-cols-12 grid-cols-1 gap-5">
							<div className="sm:col-span-4 xs:col-span-10">
								<div className="my-5">
									<label
										htmlFor="strict"
										className="flex items-center cursor-pointer relative text-black text-[14px] my-5 font-medium"
									>
										<input
											id="strict"
											type="radio"
											checked={
												form.post_wording_type === "strict" ? true : false
											}
											disabled={
												form.campaign_status === "active" ? true : false
											}
											onChange={(e) =>
												this.handleChange("post_wording_type", e.target.value)
											}
											value="strict"
											className="absolute opacity-0 z-[0] peer"
										/>
										<span className="peer-checked:bg-[#7c3292] shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
										Strict
									</label>
									<p className="font-normal">
										Describe the exact wording you like to see in the post.
									</p>
									<label
										htmlFor="freestyle"
										className="flex items-center cursor-pointer relative text-black text-[14px] my-5 font-medium"
									>
										<input
											id="freestyle"
											type="radio"
											checked={
												form.post_wording_type === "freestyle" ? true : false
											}
											disabled={
												form.campaign_status === "active" ? true : false
											}
											onChange={(e) =>
												this.handleChange("post_wording_type", e.target.value)
											}
											value="freestyle"
											className="absolute opacity-0 z-[0] peer"
										/>
										<span className="peer-checked:bg-[#7c3292] shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
										Freestyle
									</label>
									<p className="font-normal">
										Let the Influencer write the post in their own
										tonality/voice.
									</p>
								</div>
							</div>
							<div className="sm:col-span-8 col-span-full">
								<div className="mb-4">
									<ReactQuill
										className="editor-class brief-tab-quill"
										value={form.post_wording}
										onChange={(editor) =>
											this.handleChange("post_wording", editor)
										}
										readOnly={
											form.campaign_status === "active" ? true : false
										}
										theme="snow"
									/>
									<span className="mt-4 block text-[14px] font-light">
										You can add @ and the # as well that is also very important
										part of your post!
									</span>
									<p className="pink">{creation_errors.post_wording}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="md:col-span-4">
					<h5 className="mb-2  text-[18px]">Link to share in the Post</h5>
					<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-6 rouded--lg">
						<form>
							<div className="mb-4">
								<label className="font-semibold flex items-center">
									Website URL{" "}
									<Tooltip
										trigger={
											<div className="ml-2">
												<BsQuestionCircle className="dark" size={18} />
											</div>
										}
										tooltipText="All links are automatically UTM tagged, so you can quickly
											get a breakdown of traffic and sales per influencer on
											your Google Analytics dashboard"
										placement="top-left"
									/>
								</label>
								<input
									disabled={
										this.props.form.campaign_status === "active" ? true : false
									}
									type="text"
									className="rounded-[8px] h-[40px] inline-flex w-full items-center px-[1rem] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292] text-[#6c757d] placeholder:text-[#6c757d]"
									value={form.link_to_share}
									onChange={(e) =>
										this.handleChange("link_to_share", e.target.value)
									}
								/>
								<span className="text-[#6c757d] text-[10px]">
									example: http://example.com
								</span>
								<p className="pink">{creation_errors.link_to_share}</p>
							</div>
						</form>
						<div className="flex flex-col">
							<div className="flex items-center gap-x-2 mb-2">
								<p className="w-[10rem] gap-x-1 flex items-center">
									Source
									<Tooltip
										trigger={
											<div className="ml-1">
												<AiFillInfoCircle className="darkGray" />
											</div>
										}
										tooltipText="All links are automatically UTM tagged, so you can quickly
											get a breakdown of traffic and sales per influencer on
											your Google Analytics dashboard"
										placement="top-left"
									/>
								</p>
								<input
									type={"text"}
									readOnly
									className="rounded-[8px] h-[35px] inline-flex w-full items-center px-[1rem] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292] text-[#6c757d] placeholder:text-[#6c757d] read-only:bg-[#e9ecef]"
									value={"Influencify"}
								/>
							</div>
							<div className="flex items-center gap-x-2 mb-2">
								<p className="w-[10rem] gap-x-1 flex items-center">
									Medium
									<Tooltip
										trigger={
											<div className="ml-1">
												<AiFillInfoCircle className="darkGray" />
											</div>
										}
										tooltipText="All links are automatically UTM tagged, so you can quickly
											get a breakdown of traffic and sales per influencer on
											your Google Analytics dashboard"
										placement="top-left"
									/>
								</p>
								<input
									type={"text"}
									readOnly
									className="rounded-[8px] h-[35px] inline-flex w-full items-center px-[1rem] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292] text-[#6c757d] placeholder:text-[#6c757d] read-only:bg-[#e9ecef]"
									value={"{Campaign.name}"}
								/>
							</div>
							<div className="flex items-center gap-x-2 mb-2">
								<p className="w-[10rem] gap-x-1 flex items-center">
									Campaign
									<Tooltip
										trigger={
											<div className="ml-1">
												<AiFillInfoCircle className="darkGray" />
											</div>
										}
										tooltipText="All links are automatically UTM tagged, so you can quickly
											get a breakdown of traffic and sales per influencer on
											your Google Analytics dashboard"
										placement="top-left"
									/>
								</p>
								<input
									type={"text"}
									readOnly
									className="rounded-[8px] h-[35px] inline-flex w-full items-center px-[1rem] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292] text-[#6c757d] placeholder:text-[#6c757d] read-only:bg-[#e9ecef]"
									value={"{Influencer.name}"}
								/>
							</div>
						</div>
					</div>
					<h5 className="mb-2  text-[18px]">
						Images{" "}
						<span className="ml-1 text-[12px] font-normal darkGray">
							(optional)
						</span>
					</h5>
					<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3 sm:!p-4 mb-6 rouded--lg  Post-type">
						<div className="my-5">
							<label
								htmlFor="uploaded"
								className="flex items-center cursor-pointer relative text-[14px] text-black my-5 font-medium"
							>
								<input
									id="uploaded"
									type="radio"
									disabled={this.props.form.campaign_status == "active"}
									checked={form.image_option === 1 ? true : false}
									onChange={(e) =>
										this.handleChange("image_option", e.target.value)
									}
									value="1"
									className="absolute opacity-0 z-[0] peer"
								/>
								<span className="peer-checked:bg-[#7c3292] shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
								Use influencer’s own pictures
							</label>
							<label
								htmlFor="pictures"
								className="flex items-center cursor-pointer relative text-[14px] text-black my-5 font-medium"
							>
								<input
									id="pictures"
									disabled={this.props.form.campaign_status == "active"}
									type="radio"
									checked={form.image_option === 2 ? true : false}
									onChange={(e) =>
										this.handleChange("image_option", e.target.value)
									}
									value="2"
									className="absolute opacity-0 z-[0] peer"
								/>
								<span className="peer-checked:bg-[#7c3292] shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
								Use uploaded pictures
							</label>
						</div>
						{this.props.form.campaign_status !== "active" ?
							(form.image_option === 2 &&
								<>
									<ImageUploader
										buttonText="Add Images"
										imgExtension={[".jpg", ".gif", ".png", ".gif"]}
										// singleImage={true}
										// maxFileSize={2097152}
										// withPreview={(form.attachments || []).length > 0}
										defaultImages={
											form.attachments && form.attachments.length
												? form.attachments
												: []
										}
										onChange={(pictureFiles, pictureDataURLs) =>
											this.handleSaveImages(pictureFiles, pictureDataURLs)
										}
										label="Max file size: 2MB. Allowed extensions: .jpg, .gif, .png"
										// fileSizeError={toast.error('File size exceeds the maximum limit (2MB)')}
										// fileTypeError="Invalid file extension. Allowed extensions: .jpg, .gif, .png"
										errorClass="hidden"
									/>
									<div className="grid grid-cols-3 gap-2">
										{form.attachments && form.attachments.length > 0
											&& form.attachments.map((attach, index) => (
												<div key={index}>
													<div className="w-7 h-7 bg-[#7c3292] rounded-full text-white font-extrabold relative top-[15px] right-[-85px] flex items-center justify-center cursor-pointer" onClick={() => this.handleSaveImages(null, attach, true)}>
														<RxCross2 />
													</div>
													<img src={attach} alt="attachment" className="border-[10px] border-gray-200" width="100px" />
												</div>
											))}
									</div>
								</>)
							:
							<div className="grid grid-cols-3 gap-2">
								{form.attachments && form.attachments.length > 0
									&& form.attachments.map((attach) => (
										<div>
											<img src={attach} alt="attachment" width="100px" />
										</div>
									))}
							</div>
						}
					</div>
					<span className="text-[14px] font-light">
						Take your Campaign to the next level and upload a branded photo for
						the influencer to share, or upload mood photos to inspire them.
					</span>
					{/* <>
                        <h5 className="mb-2  text-[18px]">Mobile app cover image <span className='ml-1 text-[12px] font-normal darkGray'>(optional)</span>
                        </h5>
                        <div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3 sm:!p-4 mb-6 rouded--lg  Post-type">
                            <span>This image appears only on Application to distinguish your brand from the others and turns up as a cover image of your current Product or Service.</span>
                            <ImageUploader
                                buttonText='Add Cover'
                                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                maxFileSize={2097152}
                                withPreview={true}
                                defaultImages= {(form.covers && form.covers.length) ? form.covers : [] }
                                onChange={(pictureFiles, pictureDataURLs) => this.handleChange('covers', pictureDataURLs)}
                            />  
                        </div>
                        </> */}
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ campaign, global }) => {
	return {
		form: campaign.form,
		creation_errors: campaign.creation_errors,
		goals: global.goals,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/CampaignRedux");
	return {
		addForm: (form) => {
			actions.addForm(dispatch, form);
		},
		saveImages: (query) => {
			actions.saveImages(dispatch, query);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Brief);
