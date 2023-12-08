import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FiX } from "react-icons/fi";
import Button from "./global/Button";
import { FaSpinner } from "react-icons/fa";

function ChangeEmailModal(props) {
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
									<h3 className="text-[20px] font-medium text-black">Change Influencer Email</h3>
									<div
										className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
										onClick={props.onHide}
									>
										<FiX size={24} className="text-white stroke-white" />
									</div>
								</Dialog.Title>
								<div className="p-3">
									<div className="mb-6 space-y-4">
										<label>Email</label>
										<input
											className="rounded-[8px] w-full px-[1rem] py-[0.5rem] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292] "
											value={props.influencerEmail}
											onChange={(e) => props.handleChangeEmail(e.target.value)}
											type="email"
											placeholder="Enter influencer email"
										/>
									</div>
									<div className="flex justify-end gap-3 pt-3 border-t border-t-[#dee2e6]">
										<Button
											className="px-5 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
											onClick={props.onHide}
											text="Cancel"
										/>
										{props.isLoading ? (
											<FaSpinner className="animate-[spin_2s_linear_infinite] pink" />
										) : (
											<Button
												className="px-5 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
												onClick={() => props.changeEmail(false)}
												text="Save"
											/>
										)}

										<Button
											className="px-5 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
											onClick={() => props.changeEmail(true)}
											text="Save & Re-invite"
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

export default ChangeEmailModal;
