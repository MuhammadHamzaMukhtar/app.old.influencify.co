import { Component, Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { HiSpeakerphone } from "react-icons/hi";
import { connect } from "react-redux";

class Views extends Component {
	addFilterPayload = (key, value) => {
		let payload = Object.assign({}, this.props.payload);
		payload[key] = value;
		this.props.addFilterPayload(payload);
	};

	render() {
		const payload = Object.assign({}, this.props.payload);
		return (
			<Popover className="flex xxs:w-auto w-full items-center relative">
				<Popover.Button
					className={`${
						payload.FromViews || payload.ToViews
							? "bg-[#7c3292] border-[#7c3292] text-white"
							: "bg-whte border-[#ddd]"
					} ${
						this.props.className
					}  px-[16px] leading-[39px] xxs:w-auto w-full h-[39px] border-y-[1px] flex items-center justify-center focus-visible:outline-0`}
				>
					Views
				</Popover.Button>
				<Transition
					as={Fragment}
					enter="duration-200 ease-out"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="duration-100 ease-in"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95"
				>
					<Popover.Panel className="absolute top-full left-0 z-10 w-screen transform lg:translate-x-0 xs:translate-x-[100px] translate-x-[130px] sm:max-w-[450px] max-w-[320px]">
						<div className="p-4 bg-white rounded-[8px] shadow-[0px_1rem_3rem_#0000002d]">
							<div className="flex items-center">
								<div className="w-full">
									<p className="mb-1 font-medium whitespace-nowrap flex items-center">
										<HiSpeakerphone className="mr-2" />
										Views
									</p>
									<div className="sm:flex items-center">
										<div className="mb-4 sm:!mb-0">
											<input
												value={payload.FromViews || ""}
												onChange={(e) =>
													this.addFilterPayload("FromViews", e.target.value)
												}
												className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
												placeholder="From"
											/>
										</div>
										<div className="ml-0 sm:!ml-4">
											<input
												value={payload.ToViews || ""}
												onChange={(e) =>
													this.addFilterPayload("ToViews", e.target.value)
												}
												className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
												placeholder="To"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Popover.Panel>
				</Transition>
			</Popover>
		);
	}
}
const mapStateToProps = ({ AdLibrary }) => {
	return {
		payload: AdLibrary.payload,
		isLoading: AdLibrary.is_loading,
		items: AdLibrary.items,
	};
};
const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/AdLibraryRedux");
	return {
		addFilterPayload: (data) => {
			actions.addFilterPayload(dispatch, data);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Views);
