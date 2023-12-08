import { Component, Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import * as settingPlatformActionCreator from "@store/actions/SettingPlatformActions";
import { connect } from "react-redux";
const capitalize = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};
class Platform extends Component {
	constructor(props) {
		super(props);
		this.state = {
			facebookCheck: false,
			youtubeCheck: false,
		};
	}

	componentDidMount() {
		this.props.handleFetchPlatforms();
	}

	handlePlatformChange = (platforms) => {
		let payload = Object.assign({}, this.props.payload);
		payload.platforms = platforms;
		this.props.addFilterPayload(payload);
	};

	render() {
		const { platforms, payload } = this.props;
		const selectedPlatforms = payload.platforms;
		return (
			<Popover className="flex items-center xxs:w-auto w-full relative">
				<Popover.Button
					className={`${
						(payload.platforms || "") !== ""
							? "bg-[#7c3292] border-[#7c3292] text-white"
							: "bg-whte border-[#ddd]"
					} ${
						this.props.className
					}  px-[16px] leading-[39px] h-[39px] xxs:w-auto w-full border-y-[1px] flex items-center justify-center focus-visible:outline-0`}
				>
					Platform
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
					<Popover.Panel className="absolute top-full left-0 z-10 w-screen transform lg:translate-x-0 xs:translate-x-[100px] translate-x-[130px] max-w-[320px]">
						<div className="p-4 bg-white rounded-[8px] shadow-[0px_1rem_3rem_#0000002d]">
							<div className="flex items-center">
								<div className="w-full">
									<p className="mb-1 font-medium whitespace-nowrap flex items-center">
										Platform
									</p>
									<div>
										{platforms &&
											platforms.length > 0 &&
											platforms.map((platform, key) => (
												<div key={key} className="mt-5 space-y-4">
													<label
														htmlFor={`platform` + key}
														className="flex items-center cursor-pointer relative text-black text-[14px]"
													>
														<input
															id={`platform` + key}
															type="radio"
															checked={
																selectedPlatforms === platform.name
																	? true
																	: false
															}
															onChange={() =>
																this.handlePlatformChange(platform.name)
															}
															className="absolute opacity-0 z-[0] peer"
														/>
														<span className="peer-checked:bg-[#7c3292] shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
														{capitalize(platform.name)}
													</label>
												</div>
											))}
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
const mapStateToProps = ({ AdLibrary, SettingPlatformReducer }) => {
	return {
		platforms: SettingPlatformReducer.platforms,
		payload: AdLibrary.payload,
	};
};
const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/AdLibraryRedux");
	return {
		handleFetchPlatforms: () =>
			dispatch(settingPlatformActionCreator.handleFetchPlatforms(true)),
		addFilterPayload: (data) => {
			actions.addFilterPayload(dispatch, data);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Platform);
