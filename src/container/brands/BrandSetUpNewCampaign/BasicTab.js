import { Component } from "react";
import { Nav, Tab } from "react-bootstrap";
import Tooltip from "@components/global/Tooltip";
import { BsInstagram, BsQuestionCircle, BsTwitter } from "react-icons/bs";
import { connect } from "react-redux";
import Select from "react-select";
import * as basicActionCreator from "@store/actions/BasicActions";
import {
	HANDLE_BASIC_CHANGE,
	HANDLE_PLATFORM_CHANGE,
} from "@store/actions/BasicActions";
import {
	HANDLE_CAMPAIGN_BASIC_CHANGE_SUCCESS,
	HANDLE_SELECT_CHANGE_SUCCESS,
	HANDLE_SELECT_POST_TYPE,
	HANDLE_CHANGE_SINGLE_CONTENT,
	HANDLE_CHANGE_MULTI_CONTENT,
	HANDLE_SELECT_CATEGORY_SUCCESS,
} from "@store/constants/action-types";
import { MdInsertPhoto, MdPhotoLibrary } from "react-icons/md";
import { FaFacebookSquare } from "react-icons/fa";

class BasicTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			defaultTab: "Instagram",
			categoryCounter: 0,
		};
	}

	getIcon = (name) => {
		if (name === "Facebook") {
			return <FaFacebookSquare className="mr-4" />;
		} else if (name === "Instagram") {
			return <BsInstagram className="mr-4" />;
		} else if (name === "Twitter") {
			return <BsTwitter className="mr-4" />;
		}
	};

	handleSelect = (eventKey) => {
		this.props.handlePlatformChange(eventKey);
	};

	onChange = (event) => {
		this.props.handleBasicChange(event.target.name, event.target.checked);
	};

	handleMultiContentValue = (e, postId) => {
		this.props.handleChangeMultiContentValue(e, postId);
	};

	handleCategorySelect = (e, category) => {
		let status = e.target.checked;
		this.props.handleSelectCategory(status, category);
	};

	isDisabled = (id) => {
		return (
			this.props.selectedCategories.length > 2 &&
			this.props.selectedCategories.indexOf(id) === -1
		);
	};

	render() {
		const countries =
			this.props.countries && this.props.countries.length
				? this.props.countries.map((data) => ({
						label: data.name,
						value: data.id,
				  }))
				: [];
		let newOptions = this.props.campaignCategories;
		if (
			this.props.selectedCategories != null &&
			this.props.selectedCategories.length === 3
		) {
			newOptions = this.props.selectedCategories;
		}
		return (
			<div className="SetUpNewCampaign-page">
				<div className="grid grid-cols-12 gap-5">
					<div className="md:col-span-8 col-span-12">
						<h5 className="mb-2  text-[18px]">
							Title & Location
							<Tooltip
								trigger={
									<div className="ml-2">
										<BsQuestionCircle className="dark" size={22} />
									</div>
								}
								tooltipText="This is the first thing an influencer will see about the
								campaign! Similar to Facebook ads or Adwords title -- give the
								influencer a hook"
								placement="top-left"
							/>
						</h5>
						<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-12">
							<form>
								<div className="grid grid-cols-12 gap-5">
									<div className="sm:col-span-6 col-span-12 mt-4">
										<label className="text-[14px] font-medium">
											Campaign title
										</label>
										<input
											type="text"
											placeholder="Enter title"
											className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
											value={this.props.campaignTitle}
											name="campaignTitle"
											onChange={(e) => this.props.handleCampaignBasicChange(e)}
										/>
										{this.props.errorsObj?.campaignTitle ? (
											<span className="red">
												{this.props.errorsObj.campaignTitle[0]}
											</span>
										) : (
											""
										)}
									</div>
									<div className="sm:col-span-6 col-span-12 mt-12">
										<Select
											value={this.props.selectedCountries}
											options={countries}
											isMulti
											isSearchable={true}
											placeholder={"Select Country"}
											onChange={this.props.handleSelectChange}
										/>
										<p className="text-[#6c757d] text-[14px]">
											(leave empty for global campaigns)
										</p>
									</div>
								</div>
							</form>
						</div>
						{this.props.typeName === "PUBLIC" && (
							<>
								<h5 className="mb-2 text-[18px]">
									Post type
									<Tooltip
										trigger={
											<div className="ml-2">
												<BsQuestionCircle className="dark" size={22} />
											</div>
										}
										tooltipText="This is where you let the influencer know how many and what
										kind of content do you expect from this campaign. Specifying
										the number of content, gives the influencer a clear idea on
										your expectations"
										placement="top-left"
									/>
								</h5>
								{this.props.platforms.length < 1
									? ""
									: this.props.platforms.map((platform) => (
											<div
												className={`shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-12 Post-type ${
													platform.name === this.props.selectedPlatform
														? "block"
														: "hidden"
												}`}
												key={platform.id}
											>
												<Tab.Container
													activeKey={this.props.contentType}
													onSelect={this.props.handleSelectContentType}
												>
													<Nav variant="pills" className="flex-row">
														<div className="grid grid-cols-12 gap-5 w-full">
															<div className="sm:col-span-6 col-span-12">
																<Nav.Item>
																	<Nav.Link eventKey="single" className="mr-0">
																		<MdInsertPhoto className="mr-4" />
																		SINGLE CONTENT
																	</Nav.Link>
																</Nav.Item>
															</div>
															<div className="sm:col-span-6 col-span-12">
																<Nav.Item>
																	<Nav.Link eventKey="multi" className="mr-0">
																		<MdPhotoLibrary className="mr-4" />
																		MULTI CONTENT
																	</Nav.Link>
																</Nav.Item>
															</div>
														</div>
													</Nav>
													<Tab.Content>
														<Tab.Pane eventKey={"single"}>
															<div className="my-5 space-x-4  flex justify-center">
																{platform.types.map((type) => (
																	<>
																		<label
																			key={type.id}
																			htmlFor={`gender` + type.id}
																			className="flex items-center cursor-pointer relative text-black text-[14px]"
																		>
																			<input
																				id={`gender` + type.id}
																				type="radio"
																				name="gender1"
																				checked={
																					this.props.campaignPostType ===
																					type.id
																						? true
																						: false
																				}
																				onChange={(e) =>
																					this.props.handleChangeSingleContent(
																						e
																					)
																				}
																				value={type.id}
																				className="absolute opacity-0 z-[0] peer"
																			/>
																			<span className="peer-checked:bg-[#7c3292] shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
																			{type.name}
																		</label>
																	</>
																))}
															</div>
														</Tab.Pane>
														<Tab.Pane eventKey={"multi"}>
															{platform.types.map((type) => (
																<div
																	className="range-filters table mb-6"
																	key={type.id}
																>
																	<form className="table-cell">
																		<input
																			type="text"
																			className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
																			name={this.props.multiContentValue}
																			onChange={(e) =>
																				this.handleMultiContentValue(e, type.id)
																			}
																		/>
																	</form>
																	<p className="table-cell pl-4">
																		{" "}
																		{type.name}
																	</p>
																</div>
															))}
														</Tab.Pane>
													</Tab.Content>
												</Tab.Container>
											</div>
									  ))}
							</>
						)}
						<h5 className="mb-2  text-[18px]">
							Categories
							<Tooltip
								trigger={
									<div className="ml-2">
										<BsQuestionCircle className="dark" size={22} />
									</div>
								}
								tooltipText="Optional field to choose 1-3 categories that your brand is in"
								placement="top-left"
							/>
						</h5>
						<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-12">
							{/*
                            <ImagePicker 
                              images={this.props.campaignCategories.map((category, i) => ({src: category.category_image_path, value: i}))}
                              onPick={this.onPick}
                              selected={this.props.campaignCategories  && this.props.campaignCategories.length  ? this.props.campaignCategories[0].category_image_path : ''}
                              multiple
                            />
                            */}

							<div className="flex flex-wrap">
								{newOptions.length
									? newOptions.map((category, index) => (
											<div className="ck-button" key={index}>
												<input
													type="checkbox"
													value={category.id}
													checked={
														this.props.selectedCategories &&
														this.props.selectedCategories.length > 0
															? this.props.selectedCategories.some(
																	(selectedCategory) =>
																		selectedCategory.id !== category.id
																			? false
																			: true
															  )
															: false
													}
													onChange={(e) =>
														this.handleCategorySelect(e, category)
													}
													name="categoryid"
													id={`g${index}`}
													className="hidden dd-input"
												/>
												<label
													htmlFor={`g${index}`}
													className="m-0 cursor-pointer"
												>
													<img
														height="100%"
														width="100%"
														className="rounded"
														alt="cktab"
														src={category.category_image_path}
													/>
													<span className="ck-checked-button font-bold">
														{category.name}
													</span>
												</label>
											</div>
									  ))
									: ""}
							</div>
						</div>
						{/* <h5 className="mb-2 text-[18px]">Preview</h5>
						<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-12">
							<div className="grid grid-cols-12 gap-5">
								<div className="sm:col-span-4 col-span-12 sm:text-center">
									<label
										htmlFor="preview"
										className="cursor-pointer flex items-center text-[15px] font-normal"
									>
										<input
											id="preview"
											type="checkbox"
											name="campaignPreview"
											checked={this.props.campaignPreview || false}
											onChange={(e) => this.props.handleCampaignBasicChange(e)}
											className="hidden peer"
										/>
										<span className="mr-3 peer-checked:bg-[#7c3292] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292] rounded-sm"></span>
										Enable Preview
									</label>
								</div>
								<div className="sm:col-span-8 col-span-12">
									<p>
										Preview System allows you to check and approve the
										Influencer's post before it’s published.
									</p>
								</div>
							</div>
						</div> */}
						{/*
                        <h5 className="mb-2  text-[18px]">Visibility</h5>
                        <div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-12">
                            <Row>
                                <Col sm={4} xs={12} className='sm:text-center'>
									<label
										htmlFor="campaign"
										className="cursor-pointer flex items-center text-[15px] font-normal"
									>
										<input
											id="campaign"
											type="checkbox"
											name="campaignVisibility"
                                            checked={this.props.campaignVisibility || false}
                                            onChange={(e) => this.props.handleCampaignBasicChange(e)}
											className="hidden peer"
										/>
										<span className="mr-3 peer-checked:bg-[#7c3292] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292] rounded-sm"></span>
										Public campaign
									</label>
                                </Col>
                                <Col sm={8} xs={12}>
                                    <p> Campaign content will be automatically added as reference for public campaigns
                                        and
                                        reviews will appear with names.</p>
                                </Col>
                            </Row>
                        </div>
                        */}
					</div>
					<div className="md:col-span-4 col-span-12">
						<h5 className="mb-2  text-[18px]">Platform</h5>
						<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3 sm:!p-12 mb-4 Post-type">
							<Nav
								variant="pills"
								className="flex-row"
								defaultActiveKey={this.props.selectedPlatform}
							>
								{this.props.platforms.length < 1
									? ""
									: this.props.platforms.map((platform, index) => {
											return (
												<div className="w-full" key={platform.id}>
													<Nav.Item>
														<Nav.Link
															onSelect={this.handleSelect}
															eventKey={platform.name}
															className="text-left"
														>
															{this.getIcon(platform.name)}
															{platform.name}
														</Nav.Link>
													</Nav.Item>
												</div>
											);
									  })}
							</Nav>
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
		campaignTitle: state.SetUpNewCampaignReducer.campaignTitle,
		campaignPreview: state.SetUpNewCampaignReducer.campaignPreview,
		campaignVisibility: state.SetUpNewCampaignReducer.campaignVisibility,
		countries: state.SetUpNewCampaignReducer.countries,
		selectedCountries: state.SetUpNewCampaignReducer.selectedCountries,
		contentType: state.SetUpNewCampaignReducer.contentType,
		singleContentPostId: state.SetUpNewCampaignReducer.singleContentPostId,
		multiContentValue: state.SetUpNewCampaignReducer.multiContentValue,
		platforms: state.BasicReducer.platforms,
		feedPosts: state.BasicReducer.feedPosts,
		storyPosts: state.BasicReducer.storyPosts,
		selectedPlatform: state.SetUpNewCampaignReducer.selectedPlatform,
		campaignCategories: state.BasicReducer.campaignCategories,
		selectedCategories: state.SetUpNewCampaignReducer.selectedCategories,
		campaignPostType: state.SetUpNewCampaignReducer.campaignPostType,
		typeName: state.SetUpNewCampaignReducer.typeName,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleCampaignBasicChange: (event) =>
			dispatch({
				type: HANDLE_CAMPAIGN_BASIC_CHANGE_SUCCESS,
				payload: event,
			}),
		handleSelectChange: (event) =>
			dispatch({ type: HANDLE_SELECT_CHANGE_SUCCESS, payload: event }),
		handleSelectCategory: (status, category) =>
			dispatch({
				type: HANDLE_SELECT_CATEGORY_SUCCESS,
				payload: status,
				category: category,
			}),
		handlePlatformChange: (value) =>
			dispatch({ type: HANDLE_PLATFORM_CHANGE, value: value }),
		handleSelectContentType: (event) =>
			dispatch({ type: HANDLE_SELECT_POST_TYPE, payload: event }),
		handleChangeSingleContent: (event) =>
			dispatch({ type: HANDLE_CHANGE_SINGLE_CONTENT, payload: event }),
		handleChangeMultiContentValue: (event, postId) =>
			dispatch({
				type: HANDLE_CHANGE_MULTI_CONTENT,
				payload: event,
				postId: postId,
			}),
		handleBasicChange: (name, value) =>
			dispatch({ type: HANDLE_BASIC_CHANGE, name: name, value: value }),
		addCountryField: () => dispatch(basicActionCreator.addCountryField()),
		removeCountryField: (id) =>
			dispatch(basicActionCreator.removeCountryField(id)),
		handleCountryChange: (e, id) =>
			dispatch(basicActionCreator.handleCountryChange(e, id)),
		submitBasic: () => dispatch(() => basicActionCreator.handleBasicSubmit()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BasicTab);
