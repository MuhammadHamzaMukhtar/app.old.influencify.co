import { Component, createRef, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import faceWithRollingEyes from "@assets/face_with_rolling_eyes.gif";
import { connect } from "react-redux";
import ContainerLoader from "@components/ContainerLoader";
import ViewInfluencerProfile from "../unusedcomponents/BrandViewInfluencerProfile";
import { NavLink } from "react-router-dom";
import { FiChevronUp, FiX } from "react-icons/fi";

class InfluencerProfileDialog extends Component {
	scrollDiv = createRef();
	constructor(props) {
		super(props);
		this.state = {
			isShowFab: false,
		};
	}
	listenScrollEvent = (event) => {
		const target = event.target;
		if (target.scrollTop >= 30) {
			this.setState({
				isShowFab: true,
			});
		} else {
			this.setState({
				isShowFab: false,
			});
		}
	};

	scrollSmoothHandler = () => {
		this.scrollDiv.current?.scrollIntoView({ behavior: "smooth" });
	};

	render() {
		return (
			<div onScroll={(e) => this.listenScrollEvent(e)}>
				<Transition.Root show={this.props.open} as={Fragment}>
					<Dialog
						as="div"
						className="relative z-[1021]"
						onClose={this.props.onClose}
					>
						<Transition.Child
							as={Fragment}
							enter="ease-in-out duration-500"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in-out duration-500"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div className="fixed inset-0 bg-[#00000033] bg-opacity-75 transition-opacity" />
						</Transition.Child>

						<div className="fixed inset-0 overflow-hidden">
							<div className="absolute inset-0 overflow-hidden">
								<div className="pointer-events-none fixed inset-y-0 right-0 flex justify-end max-w-full pl-10">
									<div ref={this.scrollDiv}></div>
									<Transition.Child
										as={Fragment}
										enter="transform transition ease-in-out duration-500 sm:duration-300"
										enterFrom="translate-x-full"
										enterTo="translate-x-0"
										leave="transform transition ease-in-out duration-500 sm:duration-300"
										leaveFrom="translate-x-0"
										leaveTo="translate-x-full"
									>
										<Dialog.Panel className="pointer-events-auto relative w-screen xl:max-w-[65%] lg:max-w-[80%]">
											<Transition.Child
												as={Fragment}
												enter="ease-in-out duration-500"
												enterFrom="opacity-0"
												enterTo="opacity-100"
												leave="ease-in-out duration-500"
												leaveFrom="opacity-100"
												leaveTo="opacity-0"
											>
												<div className="absolute top-0 right-0 mr-[25px]  z-10">
													<button
														type="button"
														className="!outline-0 !border-0 flex mt-4 bg-[#00000080] w-[55px] h-[55px] rounded-full items-center justify-center"
														onClick={this.props.onClose}
													>
														<FiX className="fill-white text-white text-[30px]" />
													</button>
												</div>
											</Transition.Child>
											<div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
												{this.state.isShowFab ? (
													<div className="profile_scrollTopBtn">
														<div
															onClick={this.scrollSmoothHandler}
															color="secondary"
															size="small"
															className="float-right dark bg-white"
															aria-label="scroll back to top"
														>
															<FiChevronUp />
														</div>
													</div>
												) : (
													""
												)}
												{this.props.isLoading ? (
													<div className="profile-modal-loader">
														<ContainerLoader />
													</div>
												) : (
													<div>
														{this.props.errorMessage ||
														this.props.NoCreditsExist ? (
															<div className="relative">
																{this.props.errorMessage &&
																this.props.NoCreditsExist === false ? (
																	<div className="mx-auto my-12 w-[30%] border-[#f8f9fa] border-[1px]">
																		<div className="p-[1rem]">
																			<div className="flex justify-center flex-col items-center">
																				<img
																					className="w-[180px]"
																					src={faceWithRollingEyes}
																					alt="We have found issues to find this influencer details"
																				/>
																				<p className="text-center">
																					<b>
																						We have found issues to find this
																						influencer details or influencer had
																						set their profile is private.
																					</b>
																				</p>
																			</div>
																		</div>
																	</div>
																) : (
																	""
																)}
																{this.props.NoCreditsExist &&
																this.props.onFreeTrial === false ? (
																	<div className="mx-auto my-12 w-[30%] border-[#f8f9fa] border-[1px]">
																		<div className="bg--purple text-white text-center text-[25px] py-[0.5rem] px-[1rem] border-b border-[#0000002d]">
																			Limit Reached
																		</div>
																		<div className="p-[1rem]">
																			<div className="flex justify-center flex-col items-center">
																				<img
																					className="w-[180px]"
																					src={faceWithRollingEyes}
																					alt="You've reached the limit for maximum number of influencers"
																				/>
																				<p className="text-center">
																					<b>
																						You have reached the limit for
																						"maximum number of influencers"
																					</b>
																					<p>
																						Upgrade your plan to use this
																						feature
																					</p>
																				</p>
																			</div>
																			<div className="flex justify-center my-12">
																				<NavLink
																					to="/billing"
																					className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
																				>
																					Upgrade
																				</NavLink>
																			</div>
																		</div>
																	</div>
																) : (
																	""
																)}
																{this.props.NoCreditsExist &&
																this.props.onFreeTrial === true ? (
																	<div className="mx-auto my-12 w-[30%] border-[#f8f9fa] border-[1px]">
																		<div className="bg--purple text-white text-center text-[25px] py-[0.5rem] px-[1rem] border-b border-[#0000002d]">
																			This is a premium feature
																		</div>
																		<div className="p-[1rem]">
																			<div className="flex justify-center flex-col items-center">
																				<img
																					className="w-[180px]"
																					src={faceWithRollingEyes}
																					alt="You've reached the limit for Free featuers"
																				/>
																				<p className="text-center">
																					<b>
																						You've reached the limit for "Free
																						featuers"
																					</b>
																					<p>Upgrade your account to access</p>
																				</p>
																			</div>
																			<div className="flex justify-center my-12">
																				<NavLink
																					to="/billing"
																					className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
																				>
																					Upgrade
																				</NavLink>
																			</div>
																		</div>
																	</div>
																) : (
																	""
																)}
															</div>
														) : (
															<ViewInfluencerProfile
																influencerId={this.props.influencerId}
																onClose={this.props.onClose}
															/>
														)}
													</div>
												)}
											</div>
										</Dialog.Panel>
									</Transition.Child>
								</div>
							</div>
						</div>
					</Dialog>
				</Transition.Root>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoading: state.InfluencerProfileReducer.isLoading,
		errorMessage: state.InfluencerProfileReducer.errorMessage,
		NoCreditsExist: state.InfluencerProfileReducer.NoCreditsExist,
		onFreeTrial: state.InfluencerProfileReducer.onFreeTrial,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InfluencerProfileDialog);
