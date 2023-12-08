import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "@components/global/Button";
import ImageUploader from "react-images-upload";
import { FaSpinner } from "react-icons/fa";
import { FiX } from "react-icons/fi";

const BrandAvatarModal = (props) => {

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
						<Dialog.Panel className="mx-auto sm:min-w-[36rem] min-w-full rounded-[8px] bg-white profile">
							<div className="text-center grow flex justify-between border-b border-[#dee2e6] p-3">
								<h3 className="text-[25px] font-semibold">Edit Avatar</h3>
								<div
									className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
									onClick={props.onHide}
								>
									<FiX size={24} className="text-white stroke-white" />
								</div>
							</div>
							<div className="p-3">
								<ImageUploader
									buttonText="Add Avatar"
									className="avatar---------"
									onChange={props.onDrop}
									defaultImages={[props.defaultImage]}
									imgExtension={[".jpg", ".gif", ".png", ".gif"]}
									maxFileSize={5242880}
									withPreview={true}
									{...props}
								/>
							</div>
							<div className="text-right pt-2 px-3 pb-3 border-t border-[#dee2e6]">
								<Button
									className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mt-2"
									onClick={props.onHide}
									text="Cancel"
								/>
								{props.isLoading ? (
									<FaSpinner className="animate-[spin_2s_linear_infinite] pink" />
								) : (
									<Button
										className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mt-2 ml-4"
										onClick={props.handleChangeAvatar}
										text="Save"
									/>
								)}
							</div>
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
};

export default BrandAvatarModal;
