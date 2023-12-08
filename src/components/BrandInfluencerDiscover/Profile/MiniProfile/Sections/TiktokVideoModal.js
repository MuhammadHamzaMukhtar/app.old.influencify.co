import { Component, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FiX } from "react-icons/fi";

class TiktokVideoModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openTiktok: false,
			videoUrl: "",
		};
	}

	openPopups = (url) => {
		this.setState({ openTiktok: true, videoUrl: url });
	};

	closePopups = () => {
		this.setState({ openTiktok: false });
	};

	render() {
		return (
			<>
				<Transition appear show={this.state.openTiktok} as={Fragment}>
					<Dialog onClose={this.closePopups} className="relative z-[9999]">
						<div className="fixed inset-0 bg-[#00000080]" aria-hidden="true" />
						<div className="fixed inset-0 flex items-center justify-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="mx-auto w-screen h-screen">
									<div className="relative h-full">
										<div className="absolute top-0 right-0 mr-[25px] z-10">
											<button
												type="button"
												className="!outline-0 !border-0 flex mt-4 bg-[#ffffff38] w-[55px] h-[55px] rounded-full items-center justify-center "
												onClick={this.closePopups}
											>
												<FiX className="fill-white text-white text-[30px]" />
											</button>
										</div>
										<div className="relative h-full">
											<video
												className="absolute inset-0 mx-auto z-10 mt-1 h-full w-auto max-w-none"
												controls
											>
												<source src={this.state.videoUrl} type="video/mp4" />
												Your browser does not support the video tag.
											</video>
											<div className="bg-[#000000cc] absolute inset-0 z-0"></div>
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
}

export default TiktokVideoModal;
