import React, { Component } from "react";
import { Tab } from "@headlessui/react";
import Tooltip from "@components/global/Tooltip";
import { MdInsertPhoto, MdMusicNote, MdPhotoLibrary } from "react-icons/md";
import { connect } from "react-redux";
import { BsInstagram, BsQuestionCircle, BsYoutube } from "react-icons/bs";
import "./styles.css";
import moment from "moment";

import Addbrand from "@components/Header/AddBrand";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

class Basic extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
		};
		this.addbrandRef = React.createRef();
	}

	getIcon = (name) => {
		if (name === "youtube") {
			return <BsYoutube className="mr-4" />;
		} else if (name === "instagram") {
			return <BsInstagram className="mr-4" />;
		} else if (name === "tiktok") {
			return <MdMusicNote className="mr-4" />;
		}
	};

	handleChange = (key, value) => {
		const form = Object.assign({}, this.props.form);
		if (key === "title" || key === "preview" || key === "goal_id") {
			form[key] = value;
		} else if (key === "locations") {
			form[key] = value;
		} else if (key === "content_type") {
			let val;
			if (value === 0) {
				val = "single";
			} else if (value === 1) {
				val = "multi";
			}
			form[key] = val;
		} else if (key === "campaign_platform_post_types") {
			form[key] = [
				{
					post_type_id: value,
					content_value: 1,
					content_type: "single",
				},
			];
		}
		this.props.addForm(form);
	};
	handleChangePeriod = (key, value) => {
		// this.setState({ show: true });
		const { addForm } = this.props;
		let form = Object.assign({}, this.props.form);
		var date = moment(value).format("YYYY-MM-DD");
		form = {
			...form,
			campaign_date: {
				...form.campaign_date,
				[key]: date,
			},
		};

		addForm(form);
	};

	handleMultiContentChange = (key, value, type_id) => {
		const form = Object.assign({}, this.props.form);
		if (!form[key].some((el) => el.post_type_id === type_id)) {
			form[key].push({
				post_type_id: type_id,
				content_value: value,
				content_type: "multi",
			});
		} else {
			let arr = form[key];
			let objIndex = arr.findIndex((obj) => obj.post_type_id === type_id);
			arr[objIndex].content_type = "multi";
			arr[objIndex].content_value = value;
		}
		this.props.addForm(form);
	};

	getValue = (key, value) => {
		const form = Object.assign({}, this.props.form);
		let arr = form[key];
		let objIndex = form[key].findIndex((obj) => obj.post_type_id === value);
		if (objIndex !== -1) {
			return arr[objIndex].content_value;
		}
	};

	handleChangeCategories = (key, category, checked) => {
		if (this.props.form.campaign_status === "active") return;
		const form = Object.assign({}, this.props.form);
		if (checked) {
			if (!form[key].some((el) => el.id === category.id)) {
				form[key].push(category);
			}
		} else {
			form[key] = form[key].filter((el) => {
				return el.id !== category.id;
			});
		}

		this.props.addForm(form);
	};

	handlePlatformChange = (key, value, platform) => {
		if (this.props.form.campaign_status === "active") return;
		this.props.handlePlatform(platform);
		const form = Object.assign({}, this.props.form);
		form[key] = value;
		this.props.addForm(form);
		form.current_tab = 2;
		form.prior_tab = 2;
		this.props.saveCampaign(form);
	};

	render() {
		const { goals, platforms, form, creation_errors } = this.props;
		// let newOptions = categoires;
		// if (
		// 	form.campaign_categories !== null &&
		// 	form.campaign_categories.length === 3
		// ) {
		// 	newOptions = form.campaign_categories;
		// }
		return (
			<div>
				<div className="grid grid-cols-12 gap-5">
					<div className="md:col-span-8 col-span-12 order-2 md:order-1">
						<h5 className="mb-2 text-[18px] flex items-center">
							Title & Location
							<Tooltip
								trigger={
									<div className="ml-2">
										<BsQuestionCircle className="dark" size={20} />
									</div>
								}
								tooltipText="This is the first thing an influencer will see about the
								campaign! Similar to Facebook ads or Adwords title -- give the
								influencer a hook"
								placement="top-left"
							/>
						</h5>
						<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-6">
							<form>
								<div className="grid grid-cols-12 gap-5">
									<div className="sm:col-span-6 col-span-12 mt-4">
										<div className="mb-4">
											<label>Campaign Title</label>
											<input
												type="text"
												value={form.title || ''}
												disabled={
													form.campaign_status === "active" ? true : false
												}
												className="rounded-[8px] h-[40px] inline-flex w-full items-center px-[1rem] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
												placeholder="Enter Campaign Title"
												onChange={(e) =>
													this.handleChange("title", e.target.value)
												}
											/>
										</div>
										<p className="pink">{creation_errors.title}</p>
									</div>
									{/* <Col sm={6} xs={12} className="mt-4">
                                        <div className="flex items-center">
                                            <div className="mr-4">
                                                <img src={Avatar} alt="avatar" width="50" className="rounded-full" />
                                            </div>
                                            <div className="grow flex-fill">
                                                <Form.Group className="mb-0 add-brand-dropdown">
                                                    <Form.Label className="gray">Brand</Form.Label>
                                                    <Dropdown
                                                        header={
                                                            <div className="flex plus-new-brand cursor-pointer" onClick={() =>
                                                                this.addbrandRef.current.openAddbrand()
                                                            }>
                                                                <AiOutlinePlus size={20} className="gray" /> 
                                                                <p className="ml-2 gray">Add brand</p>
                                                            </div>
                                                        }
                                                        fluid
                                                        search
                                                        selection
                                                        options={friendOptions}
                                                        defaultValue={friendOptions[0].value}
                                                    />
                                                    <Form.Text className="text-[#6c757d]">(leave empty for global campaigns)</Form.Text>
                                                </Form.Group> 
                                            </div>
                                        </div>
                                    </Col> */}
								</div>
							</form>
						</div>

						{form.type_name === "public" && (
							<>
								<h5 className="mb-2 flex items-center text-[18px]">
									Post type
									<Tooltip
										trigger={
											<div className="ml-2">
												<BsQuestionCircle className="dark" size={20} />
											</div>
										}
										tooltipText="This is where you let the influencer know how many and what
										kind of content do you expect from this campaign. Specifying
										the number of content, gives the influencer a clear idea on
										your expectations"
										placement="top-left"
									/>
								</h5>
								<div></div>
								{platforms && platforms.length
									? platforms.map((platform, index) => (
										<div
											className={`shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-12 post-type ${platform.id === form.platform_id ? "block" : "hidden"
												}`}
											key={index}
										>
											<Tab.Group
												defaultIndex={form.content_type === "single" ? 0 : 1}
												onChange={(index) => {
													this.handleChange("content_type", index);
												}}
											>
												<Tab.List className="flex items-center grow">
													<Tab
														className={({ selected }) =>
															classNames(
																"flex px-3 grow items-center justify-start font-medium hover:opacity-80 text-[11pt] shadow-[0px_4px_5px_#96969640] h-[60px] leading-[60px] !rounded-[8px] mb-[30px] border-0 mr-5",
																selected
																	? "bg-[#7c3292] text-white"
																	: "bg-white text-[#343749]"
															)
														}
													>
														<MdInsertPhoto size={20} className="mr-4" />
														SINGLE CONTENT
													</Tab>
													<Tab
														className={({ selected }) =>
															classNames(
																"flex px-3 grow items-center justify-start font-medium hover:opacity-80 text-[11pt] shadow-[0px_4px_5px_#96969640] h-[60px] leading-[60px] !rounded-[8px] mb-[30px] border-0 mr-5",
																selected
																	? "bg-[#7c3292] text-white"
																	: "bg-white text-[#343749]"
															)
														}
													>
														<MdPhotoLibrary size={20} className="mr-4" />
														MULTI CONTENT
													</Tab>
												</Tab.List>
												<Tab.Panels>
													<Tab.Panel>
														<div className="my-5 space-x-4  flex justify-center">
															{platform.types && platform.types.length
																? platform.types.map((type, index) => (
																	<label
																		key={index}
																		htmlFor={`gender` + index}
																		className="flex items-center cursor-pointer relative text-black text-[14px]"
																	>
																		<input
																			id={`gender` + index}
																			name="gender1"
																			type="radio"
																			checked={
																				form.campaign_platform_post_types &&
																					form.campaign_platform_post_types.find(
																						(el) =>
																							el.post_type_id === type.id &&
																							el.content_type === "single"
																					)
																					? true
																					: false
																			}
																			value={type.id}
																			onChange={(e) =>
																				this.handleChange(
																					"campaign_platform_post_types",
																					e.target.value
																				)
																			}
																			className="absolute opacity-0 z-[0] peer"
																		/>
																		<span className="peer-checked:bg-[#7c3292] shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
																		{type.name}
																	</label>
																))
																: ""}
														</div>
														<p className="pink">
															{creation_errors.campaign_platform_post_types}
														</p>
													</Tab.Panel>
													<Tab.Panel>
														{platform.types && platform.types.length
															? platform.types.map((type, index) => (
																<div
																	className="range-filters flex items-center mb-6"
																	key={index}
																>
																	<form>
																		<div>
																			<input
																				type="text"
																				className="rounded-[8px] h-[40px] inline-flex w-full items-center px-[1rem] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
																				value={this.getValue(
																					"campaign_platform_post_types",
																					type.id
																				)}
																				onChange={(e) =>
																					this.handleMultiContentChange(
																						"campaign_platform_post_types",
																						e.target.value,
																						type.id
																					)
																				}
																			/>
																		</div>
																	</form>
																	<p className="pl-4"> {type.name}</p>
																</div>
															))
															: ""}
													</Tab.Panel>
												</Tab.Panels>
											</Tab.Group>
										</div>
									))
									: ""}
							</>
						)}
						<h5 className="mb-2 text-[18px]">Post Types</h5>
						<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-6">
							<div className="w-full">
								<div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-1">
									{goals && goals.length
										? goals.map((goal, index) => (
											<div className="relative" key={index}>
												<input
													type="radio"
													defaultChecked={
														form.goal_id === goal.id ? true : false
													}
													onChange={() =>
														this.handleChange("goal_id", goal.id)
													}
													disabled={
														form.campaign_status === "active" ? true : false
													}
													value={goal.id}
													name="goalid"
													id={`c${index}`}
													className="hidden dd-input group"
												/>
												<label
													htmlFor={`c${index}`}
													className={`m-0 h-[190px] relative flex items-center text-[16px] rounded-[8px] bg-[#fff] ${form.campaign_status !== "active" && 'cursor-pointer hover:bg-[#7c3292]'} purple font-normal p-[3px] group-checked:bg-[#7c3292] transition-all duration-[0.4s] ${form.goal_id === goal.id &&
														"border border-[#dc3545]"
														}`}
												>
													<img
														className="rounded-[8px] w-full h-full"
														src={goal.goal_image_path}
														alt={goal.goal_name}
													/>
													<span className="absolute left-1/2 bottom-[10px] transform -translate-x-[50%] text-center rounded-[8px] p-[12px] w-[75%] bg-white purple text-[12px] font-semibold">
														{goal.goal_name}
													</span>
												</label>
											</div>
										))
										: ""}
								</div>
							</div>
						</div>
						{/* <>
                        <h5 className="mb-2  text-[18px]">
                            Categories
                            <OverlayTrigger
                                delay={{ show: 250, hide: 400 }}
                                overlay={
                                    <Tooltip>
                                        Optional field to choose 1-3 categories
                                        that your brand is in
                                    </Tooltip>
                                }
                            >
                                <svg
                                    className="ml-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    version="1.1"
                                    width="18"
                                    height="18"
                                    x="0"
                                    y="0"
                                    viewBox="0 0 512 512"
                                >
                                    <g>
                                        <path
                                            xmlns="http://www.w3.org/2000/svg"
                                            d="m277.332031 384c0 11.78125-9.550781 21.332031-21.332031 21.332031s-21.332031-9.550781-21.332031-21.332031 9.550781-21.332031 21.332031-21.332031 21.332031 9.550781 21.332031 21.332031zm0 0"
                                            fill="#282b3c"
                                            data-original="#000000"
                                        />
                                        <path
                                            xmlns="http://www.w3.org/2000/svg"
                                            d="m256 512c-141.164062 0-256-114.835938-256-256s114.835938-256 256-256 256 114.835938 256 256-114.835938 256-256 256zm0-480c-123.519531 0-224 100.480469-224 224s100.480469 224 224 224 224-100.480469 224-224-100.480469-224-224-224zm0 0"
                                            fill="#282b3c"
                                            data-original="#000000"
                                        />
                                        <path
                                            xmlns="http://www.w3.org/2000/svg"
                                            d="m256 314.667969c-8.832031 0-16-7.167969-16-16v-21.546875c0-20.308594 12.886719-38.507813 32.042969-45.269532 25.492187-8.980468 42.625-36.140624 42.625-55.851562 0-32.363281-26.304688-58.667969-58.667969-58.667969s-58.667969 26.304688-58.667969 58.667969c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16c0-49.984375 40.664063-90.667969 90.667969-90.667969s90.667969 40.683594 90.667969 90.667969c0 35.585938-28.097657 73.367188-63.980469 86.039062-6.398438 2.238282-10.6875 8.316407-10.6875 15.101563v21.527344c0 8.832031-7.167969 16-16 16zm0 0"
                                            fill="#282b3c"
                                            data-original="#000000"
                                        />
                                    </g>
                                </svg>
                            </OverlayTrigger>
                        </h5>
                        <div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-6 rounded-[8px]">
                            <div className="row">
                                <Form.Group className="mb-0 ck-button-categories-wrap">
                                    {newOptions && newOptions.length
                                        ? newOptions.map((category, index) => (
                                              <div
                                                  className="ck-button m-0 p-0"
                                                  key={index}
                                              >
                                                  <input
                                                      type="checkbox"
                                                      value={category.id}
                                                      onChange={(e) =>
                                                          this.handleChangeCategories(
                                                              "campaign_categories",
                                                              category,
                                                              e.target.checked
                                                          )
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
                                                          src={
                                                              category.category_image_path
                                                          }
                                                          alt="ckedit"
                                                      />
                                                      <span className="ck-checked-button font-bold text-[12px]">
                                                          {category.name}
                                                      </span>
                                                  </label>
                                              </div>
                                          ))
                                        : ""}
                                </Form.Group>
                            </div>
                            </div>
                        </> */}
						{/* <h5 className="mb-2  text-[18px]">Preview</h5>
						<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-6">
							<div className="grid grid-cols-12 gap-5">
								<div className="sm:col-span-4 col-span-12 sm:text-center">
									<label
										htmlFor="preview"
										className="cursor-pointer flex items-center text-[15px] font-normal"
									>
										<input
											id="preview"
											type="checkbox"
											onChange={(e) =>
												this.handleChange("preview", e.target.checked)
											}
											checked={form.preview}
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
					</div>
					<div className="md:col-span-4 col-span-12 order-1 md:order-2">
						<div className="grid grid-cols-12 gap-5">
							<div className="col-span-12">
								<h5 className="mb-2 text-[18px]">Posting period</h5>
								<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-6">
									<div className="grid grid-cols-12 gap-5">
										<div className="lg:col-span-6 col-span-12">
											<label
												className={`${form.campaign_date &&
													form.campaign_date.postingFrom >
													form.campaign_date.postingTo
													? "red"
													: ""
													} text-[10px] darkGray`}
											>
												Posting From:
											</label>
											<input
												type="date"
												min={moment().format("YYYY-MM-DD")}
												max={moment().add(3, "months").format("YYYY-MM-DD")}
												className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
												disabled={
													form.campaign_status === "active" ? true : false
												}
												value={
													(form.campaign_date &&
														moment(form.campaign_date.postingFrom).format(
															"YYYY-MM-DD"
														)) ||
													moment().add("3", "months").format("YYYY-MM-DD")
												}
												onChange={(e) =>
													this.handleChangePeriod("postingFrom", e.target.value)
												}
											/>
											{!form.is_published &&
												<>
													{form.campaign_date &&
														form.campaign_date.postingFrom >
														form.campaign_date.postingTo ? (
														<p className="text-[red]">
															Date should not be before minimal date
														</p>
													) : (
														form.campaign_date?.postingFrom < moment().local().format("YYYY-MM-DD") &&
														<p className="text-[red]">
															Date should not be before today
														</p>
													)}
												</>
											}
										</div>
										<div className="lg:col-span-6 col-span-12">
											<label className="text-[10px] darkGray">
												Posting To:
											</label>
											<input
												type="date"
												min={
													form.campaign_date &&
													moment(form.campaign_date.postingFrom)
														.add("1", "day")
														.format("YYYY-MM-DD")
												}
												max={moment().add(3, "months").format("YYYY-MM-DD")}
												className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
												disabled={
													form.campaign_status === "active" ? true : false
												}
												value={
													(form.campaign_date &&
														moment(form.campaign_date.postingTo).format(
															"YYYY-MM-DD"
														)) ||
													""
												}
												onChange={(e) =>
													this.handleChangePeriod("postingTo", e.target.value)
												}
											/>
										</div>
									</div>
								</div>
							</div>
							{this.props.typeName === "PUBLIC" ? (
								<div className="col-span-12">
									<h5 className="mb-2 text-[18px]">Application period</h5>
									<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-6">
										<div className="grid grid-cols-12 gap-5">
											{/* <div className="lg:col-span-6 col-span-12">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Grid container justify="space-around">
                            <KeyboardDatePicker
                              disableToolbar
                              variant="inline"
                              format="yyyy/dd/MM"
                              margin="normal"
                              id="date-picker-inline"
                              label="Application From:"
                              className="w-full timing-tab"
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                              value={
                                (form.campaign_date &&
                                  form.campaign_date.applicationFrom) ||
                                ""
                              }
                              onChange={date =>
                                this.handleChangePeriod("applicationFrom", date)
                              }
                            />
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </div> */}
											{/* <div className="lg:col-span-6 col-span-12">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Grid container justify="space-around">
                            <KeyboardDatePicker
                              disableToolbar
                              variant="inline"
                              format="yyyy/dd/MM"
                              margin="normal"
                              id="date-picker-inline"
                              label="Application To:"
                              className="w-full timing-tab"
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                              value={
                                (form.campaign_date &&
                                  form.campaign_date.applicationTo) ||
                                ""
                              }
                              onChange={date =>
                                this.handleChangePeriod("applicationTo", date)
                              }
                            />
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </div> */}
										</div>
									</div>
									{/* <h5 className="mb-2  text-[18px]">Platform</h5>
									<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] px-4 pb-4 pt-2 mb-4 Post-type">
										<Nav
											variant="pills"
											className="flex-col"
											defaultActiveKey={form.platform_id}
											activeKey={form.platform_id}
										>
											{platforms && platforms.length
												? platforms.map((platform, index) => (
													<Nav.Item key={index}>
														<Nav.Link
															disabled={
																form.campaign_status ==
																"active"
																	? true
																	: false
															}
															onSelect={() =>
																this.handlePlatformChange(
																	"platform_id",
																	platform.id,
																	platform.name
																)
															}
															eventKey={platform.id}
															className="text-left mt-4 mb-0 rounded-[8px] border-0"
														>
															{this.getIcon(platform.name)}
															{platform.name
																? capitalizeFirstLetter(
																		platform.name
																	)
																: ""}
														</Nav.Link>
													</Nav.Item>
												))
												: ""}
										</Nav>
										<p className="pink">
											{creation_errors.platform_name}
										</p>
									</div> */}
								</div>
							) : (
								""
							)}
						</div>
					</div>
				</div>
				<Addbrand ref={this.addbrandRef} />
			</div>
		);
	}
}

const mapStateToProps = ({ campaign, global }) => {
	return {
		countries: global.countries,
		platforms: global.platforms,
		categoires: global.categoires,
		form: campaign.form,
		creation_errors: campaign.creation_errors,
		goals: global.goals,
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
		handlePlatform: (data) => {
			searchactions.handlePlatform(dispatch, data);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Basic);
