import { Component, createRef, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { connect } from "react-redux";
import faceWithRollingEyes from "@assets/face_with_rolling_eyes.gif";
import { HANDLE_CLOSE_ERROR_MODAL } from "@store/constants/action-types";
import { FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";

import BrandInfluencerDeepScan from "@container/brands/BrandInfluencerDeepScan";


function MyVerticallyCenteredModal(props) {
	return (
		<Transition appear show={props.show} as={Fragment}>
			<Dialog onClose={props.onHide} className="relative z-[9999]">
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
						<Dialog.Panel className="mx-auto sm:min-w-[36rem] min-w-full rounded-[8px]">
							<Dialog.Title className="text-white text-center grow flex justify-between border-b border-[#dee2e6] p-3">
								<h2 className="text-[24px]">{props.data.message}</h2>
								<div
									className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
									onClick={props.onHide}
								>
									<FiX size={24} className="text-white stroke-white" />
								</div>
							</Dialog.Title>
							<div className="p-3">
								<div className="flex justify-center">
									<img
										variant="top"
										width="180px"
										alt={props.data.error_message}
										src={faceWithRollingEyes}
									/>
								</div>
								<p className="text-center">
									<b>{props.data.error_message}</b>
								</p>
							</div>
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
}

const InfluencerProfileModal = (props) => {
	//scrollDiv = createRef();

	const dispatch = useDispatch();

	const onHide = () => {
		this.props.handleCloseErrorModal();
	};


	const {
		isProfileLoading,
		platform,
		open,
		onClose,
		current_influencer,
		newCampaignWithSelected,
		influencer_id,
		onShow
	} = props;

	return (
		<>
			<Transition.Root show={open} as={Fragment}>
				<Dialog as="div" className="relative z-[1021]" onClose={onClose}>
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
								<Transition.Child
									as={Fragment}
									enter="transform transition ease-in-out duration-500 sm:duration-300"
									enterFrom="translate-x-full"
									enterTo="translate-x-0"
									leave="transform transition ease-in-out duration-500 sm:duration-300"
									leaveFrom="translate-x-0"
									leaveTo="translate-x-full"
								>
									<Dialog.Panel className="pointer-events-auto relative w-screen xl:max-w-[90%] lg:max-w-[90%]">
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
													onClick={onClose}
												>
													<FiX className="fill-white text-white text-[30px]" />
												</button>
											</div>
										</Transition.Child>
										
										<div className="flex h-full flex-col overflow-y-scroll bg-gray-100 py-6 shadow-xl">
											<BrandInfluencerDeepScan
												platform={platform}
												id={influencer_id}
												dispatch={dispatch}
												onClose={onClose}
												onShow={onShow}
											/>
										</div>

									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	);
}

const mapStateToProps = ({ HeaderReducer, influencerSearch }) => {
	return {
		refreshData: HeaderReducer.refreshData,
		current_influencer: influencerSearch.current_influencer,
		influencer_id: influencerSearch.influencer_id,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleCloseErrorModal: () => dispatch({ type: HANDLE_CLOSE_ERROR_MODAL }),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InfluencerProfileModal);
