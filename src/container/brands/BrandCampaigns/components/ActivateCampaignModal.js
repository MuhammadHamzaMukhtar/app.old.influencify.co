import { Fragment } from "react";
import { FiX } from "react-icons/fi";
import Button from "@components/global/Button";
import { Dialog, Transition } from "@headlessui/react";

function ActivateCampaignModal(props) {
	return (
		<>
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
							<Dialog.Panel className="mx-auto sm:min-w-[36rem] min-w-full rounded-[8px] bg-white">
								<Dialog.Title className="text-white text-center grow flex justify-between border-b border-[#dee2e6] p-3">
									<h2 className="text-[24px]">Activate campaign</h2>
									<div
										className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
										onClick={props.onHide}
									>
										<FiX size={24} className="text-white stroke-white" />
									</div>
								</Dialog.Title>
								<div className="p-3">
									<p className="text-center py-12">
										<b>Are you sure?</b>
									</p>
									<div className="flex justify-end pt-2 border-t border-[#dee2e6] mt-4">
										<Button
											className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mt-2"
											onClick={props.onHide}
											text="Cancel"
										/>
										<Button
											className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mt-2 ml-4"
											onClick={props.onHide}
											text="Activate"
										/>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}

export default ActivateCampaignModal;
