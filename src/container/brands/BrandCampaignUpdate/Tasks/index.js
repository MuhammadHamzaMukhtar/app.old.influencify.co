import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { connect } from "react-redux";
import "./styles.css";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import Button from "@components/global/Button";
import { toast } from "react-toastify";

const Tasks = (props) => {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		setTasks(props.form?.campaign_tasks)
	}, [props.form?.campaign_tasks])

	const { form, addForm, errors } = props;

	const [active, setActive] = useState(null);


	const handleAddTask = () => {
		if (tasks?.length >= 10) {
			toast.error('Add Task limit exceeded');
			return;
		}
		const newTask = {
			title: '',
			description: '',
			is_mandatory: false
		};
		const updatedTasks = [...tasks, newTask];
		setTasks(updatedTasks);
		addTaskToForm(updatedTasks);
	};

	const onChangeHandler = (index, key, value) => {
		const updatedTasks = tasks.map((task, i) => {
			if (i === index) {
				return {
					...task,
					[key]: value
				};
			}
			return task;
		});

		setTasks(updatedTasks);
		addTaskToForm(updatedTasks);
	};

	const handleToggle = (index) => {
		if (active === index) {
			setActive(null);
		} else {
			setActive(index);
		}
	};

	const removeTask = (index) => {
		const updatedTasks = [...tasks];
		updatedTasks.splice(index, 1);
		setTasks(updatedTasks);
		if (active === index) {
			setActive(null);
		} else if (active !== null && active > index) {
			setActive(active - 1);
		} else {
			setActive(active + 1);
		}
		addTaskToForm(updatedTasks);
	}

	const addTaskToForm = (updatedTasks) => {
		const taskForm = Object.assign([], form);
		taskForm['campaign_tasks'] = updatedTasks ?? tasks;
		addForm(taskForm);
	}

	return (
		<div className="mb-12 max-w-5xl">
			<Tab.Group>
				<Tab.List className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] ml-0 p-3 sm:p-4 w-full">
					<Tab.Panel className={'mx-5'}>
						<div className="flex justify-between mb-6">
							<p className="font-bold text-[22px]">
								Influencers Tasks
							</p>
							{form.campaign_status !== "active" &&
								<Button
									className="px-6 rounded-[8px] h-[36px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
									onClick={handleAddTask}
									text="Add Task"
								/>
							}
						</div>
						{errors.campaign_tasks && (
							<div className="px-6 rounded-[8px]">
								<p className="text-[#dc3545]">{errors.campaign_tasks[0]}</p>
							</div>
						)}
						{tasks && tasks.length > 0 && tasks.map((task, index) => {
							return (
								<div
									key={index}
									className="border-[1px] my-5 border-[#00000020] bg-[#49749a08] flex flex-col relative rounded-[8px] p-2 px-5">
									<div className="flex justify-between cursor-pointer items-center md:divide-y-0 divide-y divide-[#0000001f]"
										onClick={() => handleToggle(index)}
									>
										<h6 className="text-[20px] font-medium">
											Task {index + 1}
										</h6>
										{active === index ?
											<BsChevronDown
												className="mt-2 sm:!mt-0"
												size={20}
											/> :
											<BsChevronUp
												className="mt-2 sm:!mt-0"
												size={20}
											/>
										}
									</div>
									{active === index &&
										<div className="relative top-0 overflow-hidden">
											<div className="transition-[height] overflow-auto ease-in-out duration-[0.35s]">
												<div className="min-w-[550px] overflow-x-auto">
													<div className="py-[20px] px-[20px] space-y-5">
														<div className="space-y-2">
															<label className="text-[15px] font-medium">Title*</label>
															<input
																type="text"
																value={task.title}
																disabled={
																	form.campaign_status === "active" ? true : false
																}
																onChange={(e) => onChangeHandler(index, 'title', e.target.value)}
																className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
																placeholder="Add title"
															/>
															{errors?.[index] && (
																<div className="px-6 w-1/2 py-3 rounded-[8px] mb-4">
																	<p className="text-[#dc3545]">{(errors?.[index]?.title?.[0] || "")}</p>
																</div>
															)}
														</div>
														<div className="space-y-2">
															<label className="text-[15px] font-medium">Description</label>
															<textarea
																onChange={(e) => onChangeHandler(index, 'description', e.target.value)}
																className="rounded-[8px] w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
																placeholder="Add description of your task"
																rows={10}
																disabled={
																	form.campaign_status === "active" ? true : false
																}
																value={task.description}
															/>
															{errors?.[index] && (
																<div className="px-6 py-3 rounded-[8px] mb-4">
																	<p className="text-[#dc3545]">{(errors?.[index]?.description?.[0] || "")}</p>
																</div>
															)}
														</div>
														<div className="flex items-center justify-between">
															<p className="text-[15px]">Is this task mandatory?</p>
															<div className="flex gap-32">
																<div className="flex items-center ">
																	<label
																		htmlFor="yes"
																		className="cursor-pointer flex items-center text-[15px] font-normal"
																	>
																		<input
																			id="yes"
																			type="radio"
																			name="is_mandatory"
																			checked={task.is_mandatory}
																			onChange={(e) => onChangeHandler(index, 'is_mandatory', e.target.checked)}
																			disabled={
																				form.campaign_status === "active" ? true : false
																			}
																			className="hidden peer"
																		/>
																		<span className="mr-3 peer-checked:bg-[#7c3292] rounded-lg bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292]"></span>
																		<p>Yes</p>
																	</label>
																</div>
																<div className="flex items-center ">
																	<label
																		htmlFor="no"
																		className="cursor-pointer flex items-center text-[15px] font-normal"
																	>
																		<input
																			id="no"
																			type="radio"
																			name="is_mandatory"
																			checked={!task.is_mandatory}
																			onChange={(e) => onChangeHandler(index, 'is_mandatory', !e.target.checked)}
																			disabled={
																				form.campaign_status === "active" ? true : false
																			}
																			className="hidden peer"
																		/>
																		<span className="mr-3 peer-checked:bg-[#7c3292] rounded-lg bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292]"></span>
																		<p>No</p>
																	</label>
																</div>
															</div>
														</div>
														{index >= 1 && form.campaign_status !== "active" &&
															<div className="flex justify-end">
																<p className="text-[#dc3545] cursor-pointer" onClick={() => removeTask(index)}>Remove Task</p>
															</div>
														}
													</div>
												</div>
											</div>
										</div>
									}
								</div>
							)
						})}
					</Tab.Panel>
				</Tab.List>
			</Tab.Group>
		</div>
	);
}

const mapStateToProps = ({ campaign }) => {
	return {
		form: campaign.form,
		errors: campaign.tasks_errors,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/CampaignRedux");
	return {
		addForm: (form) => {
			actions.addForm(dispatch, form);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
