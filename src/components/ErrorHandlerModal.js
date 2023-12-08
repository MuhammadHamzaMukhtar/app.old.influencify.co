import { Fragment } from "react";
import { FiX } from "react-icons/fi";
import { Dialog, Transition } from "@headlessui/react";
import faceWithRollingEyes from "@assets/face_with_rolling_eyes.gif";
import { connect } from "react-redux";
import { HANDLE_CLOSE_ERROR_MODAL } from "@store/constants/action-types";
import LinkTo from "@components/global/LinkTo";

function ErrorHandlerModal(props) {
	const closemodel = () => {
		props.handleCloseErrorModal();
	};

	return (
		<>
			<Transition appear show={props.is_show_modal} as={Fragment}>
				<Dialog onClose={closemodel} className="relative z-[9999]">
					<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
					<div className="fixed inset-0 flex items-center justify-center p-4">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="mx-auto sm:min-w-[36rem] min-w-full rounded-[8px] bg-white">
								<Dialog.Title className="text-white text-center grow flex justify-between border-b border-[#dee2e6] p-3">
									<h2 className="text-[24px]">{props.error_obj.message}</h2>
									<div
										className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
										onClick={closemodel}
									>
										<FiX size={24} className="text-white stroke-white" />
									</div>
								</Dialog.Title>
								<div className="p-3">
									{props.error_obj.error === "something_went_wrong" ? (
										<>
											<div className="flex justify-center">
												<img
													className="w-[180px]"
													src={faceWithRollingEyes}
													alt={props.error_obj.error_message}
												/>
											</div>
											<p className="text-center">
												<b>{props.error_obj.error_message}</b>
											</p>
										</>
									) : (
										""
									)}
									{props.error_obj.error === "handle_not_found" ? (
										<>
											<div className="flex justify-center">
												<img
													className="w-[180px]"
													src={faceWithRollingEyes}
													alt={props.error_obj.error_message}
												/>
											</div>
											<p className="text-center">
												<b>{props.error_obj.error_message}</b>
											</p>
										</>
									) : (
										""
									)}
									{props.error_obj.error === "handle_not_email_exist" ? (
										<>
											<div className="flex justify-center">
												<img
													className="w-[180px]"
													src={faceWithRollingEyes}
													alt={props.error_obj.error_message}
												/>
											</div>
											<p className="text-center">
												<b>{props.error_obj.error_message}</b>
											</p>
										</>
									) : (
										""
									)}
									{props.error_obj.error === "handle_not_plan_subscribed" ||
									props.error_obj.error === "handle_no_credits_remaining" ? (
										<>
											<div className="flex justify-center">
												<img
													className="w-[180px]"
													src={faceWithRollingEyes}
													alt={props.error_obj.error_message}
												/>
											</div>
											<p className="text-center">
												<b>{props.error_obj.error_message}</b>
											</p>
											<p className="text-center">
												Upgrade your account to access
											</p>
											<div className="flex justify-center mt-12">
												<div onClick={props.onHide}>
													<LinkTo
														to="/billing"
														text="Upgrade"
														className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
													/>
												</div>
											</div>
										</>
									) : (
										<>
											<div className="flex justify-center">
												<img
													className="w-[180px]"
													src={faceWithRollingEyes}
													alt={props.error_obj.error_message}
												/>
											</div>
											<p className="text-center">
												<b>{props.error_obj.error_message}</b>
											</p>
										</>
									)}
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		is_show_modal: state.errorHandler.is_show_modal,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleCloseErrorModal: () => dispatch({ type: HANDLE_CLOSE_ERROR_MODAL }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandlerModal);
