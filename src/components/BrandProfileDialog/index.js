import { Component, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import "./styles.css";
import { connect } from "react-redux";
import BrandProfile from "../BrandProfile";
import { FiX } from "react-icons/fi";

class BrandProfileDialog extends Component {
	render() {
		return (
			<div>
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
												<BrandProfile />
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
	return {};
};
const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandProfileDialog);
