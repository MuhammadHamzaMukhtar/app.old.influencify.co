import React, { Component, Fragment } from "react";
import { Popover, Transition, Listbox } from "@headlessui/react";
import Button from "@components/global/Button";
import { AiFillCaretDown } from "react-icons/ai";
import InstagramLogo from "@assets/instagram_logo.png";
import YoutubeLogo from "@assets//youtube_logo.png";
import TiktokLogo from "@assets/tiktok_logo.png";
import "./styles.css";
import Searchbrand from "./searchbrand";

const platformOptions = [
	{
		key: "instagram",
		text: "Instagram",
		value: "instagram",
		src: InstagramLogo,
	},
	{
		key: "youtube",
		text: "Youtube",
		value: "youtube",
		src: YoutubeLogo,
	},
	{
		key: "tiktok",
		text: "Tiktok",
		value: "tiktok",
		src: TiktokLogo,
	},
];

class BrandInfluentialsExport extends Component {
	constructor(props) {
		super(props);
		this.state = {
			platform: platformOptions[0],
			followersPlatform: platformOptions[0],
		};
		this.searchbrandRef = React.createRef();
	}
	handleChange = (platform) => {
		this.setState({ platform: platform });
	};
	handleFollowersChange = (platform) => {
		this.setState({ followersPlatform: platform });
	};

	defaultValue = (object, value) => {
		const txt = Object.assign(
			{},
			object.find((o) => o.value === value)
		);
		return txt.text;
	};
	render() {
		return (
			<>
				<div className="bg-[#ffff] py-[20px] border-[1px] border-[#ddd] mb-12">
					<div className="containers">
						<div className="row">
							<div className="col-sm-12">
								<h2 className="dark font-bold">Influentials Export</h2>
								<p>Export Influential users of specific influencer.</p>
							</div>
						</div>
					</div>
				</div>
				<div className="containers">
					<div className="grid grid-cols-12 gap-5">
						<div className="col-span-12">
							<div className="mb-2 flex flex-wrap items-center influential-export">
								<div className="mr-4 shadow-[0px_4px_5px_#96969640] rounded-[8px] bg-white w-150px h-[40px] mb-4">
									<Listbox onChange={(value) => this.handleChange(value)}>
										<div className="relative w-full z-50">
											<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
												<span className="flex items-center whitespace-nowrap">
													<img
														src={this.state.platform.src}
														className="w-6 h-6 rounded-full mr-2"
														alt={this.state.platform.value}
													/>
													{this.defaultValue(
														platformOptions,
														this.state.platform.value
													)}
												</span>
												<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
													<AiFillCaretDown
														size={12}
														className="text-black opacity-80"
														aria-hidden="true"
													/>
												</span>
											</Listbox.Button>
											<Transition
												as={Fragment}
												leave="transition ease-in duration-100"
												leaveFrom="opacity-100"
												leaveTo="opacity-0"
											>
												<Listbox.Options className="absolute max-h-60 -mt-[5px] w-full overflow-auto rounded-md bg-white py-1 text-[14px] shadow-[0_2px_3px_0_#22242626] focus:outline-none sm:text-sm z-50">
													{platformOptions.map((sort, key) => (
														<Listbox.Option
															key={key}
															className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
																sort === this.state.platform
																	? "bg-[#00000008]"
																	: ""
															}`}
															value={sort}
														>
															<span
																className={`flex items-center ${
																	sort === this.state.platform
																		? "purple font-semibold"
																		: "text-gray-900 font-medium"
																}`}
															>
																<img
																	src={sort.src}
																	className="w-6 h-6 rounded-full mr-2"
																	alt={sort.text}
																/>
																{sort.text}
															</span>
														</Listbox.Option>
													))}
												</Listbox.Options>
											</Transition>
										</div>
									</Listbox>
								</div>
								<div className="mr-4 shadow-[0px_4px_5px_#96969640] rounded-[8px] bg-white h-[40px] mb-4">
									<input
										placeholder="Influencer profile URL or @handle"
										className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
									/>
								</div>
								<div className="mr-4 shadow-[0px_4px_5px_#96969640] rounded-[8px] bg-white w-150px mb-4">
									<Popover className="flex items-center relative">
										<Popover.Button className="w-[150px] leading-[40px] h-[40px] bg-white rounded-[8px] flex items-center justify-center focus-visible:outline-0">
											Audience
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
													<div className="flex items-center gx-5">
														<div className="w-full">
															<div className="mt-5 space-y-4">
																<label
																	htmlFor="fol1"
																	className="flex items-center cursor-pointer relative text-black text-[14px]"
																>
																	<input
																		id="fol1"
																		name="follower"
																		type="radio"
																		value=""
																		className="absolute opacity-0 z-[0] peer"
																		checked
																	/>
																	<span className="peer-checked:bg-[#7c3292] shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
																	From 1000 Followers
																</label>
																<label
																	htmlFor="fol2"
																	className="flex items-center cursor-pointer relative text-black text-[14px]"
																>
																	<input
																		id="fol2"
																		name="follower"
																		type="radio"
																		value="30"
																		className="absolute opacity-0 z-[0] peer"
																	/>
																	<span className="peer-checked:bg-[#7c3292] shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
																	From 1000 Followers
																</label>
															</div>
														</div>
													</div>
												</div>
											</Popover.Panel>
										</Transition>
									</Popover>
								</div>
								<div className="mr-4 shadow-[0px_4px_5px_#96969640] rounded-[8px] bg-white w-150px mb-4">
									<Popover className="flex items-center relative">
										<Popover.Button className="w-[150px] leading-[40px] h-[40px] bg-white rounded-[8px] flex items-center justify-center focus-visible:outline-0">
											Followers
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
													<div className="flex items-center gx-5">
														<div className="w-full">
															<div className="mt-5 space-y-4">
																<label
																	htmlFor="fol1"
																	className="flex items-center cursor-pointer relative text-black text-[14px]"
																>
																	<input
																		id="fol1"
																		name="follower"
																		type="radio"
																		value=""
																		className="absolute opacity-0 z-[0] peer"
																		checked
																	/>
																	<span className="peer-checked:bg-[#7c3292] shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
																	From 1000 Followers
																</label>
																<label
																	htmlFor="fol2"
																	className="flex items-center cursor-pointer relative text-black text-[14px]"
																>
																	<input
																		id="fol2"
																		name="follower"
																		type="radio"
																		value="30"
																		className="absolute opacity-0 z-[0] peer"
																	/>
																	<span className="peer-checked:bg-[#7c3292] shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
																	From 1000 Followers
																</label>
															</div>
														</div>
													</div>
												</div>
											</Popover.Panel>
										</Transition>
									</Popover>
								</div>
								<div className="mr-4 flex items-center h-[40px] mb-4">
									<label
										htmlFor="emailonly"
										className="cursor-pointer flex items-center text-[15px] font-normal"
									>
										<input
											id="emailonly"
											type="checkbox"
											value="Has emails only"
											className="hidden peer"
										/>
										<span className="mr-3 peer-checked:bg-[#7c3292] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292] rounded-sm"></span>
										Has emails only
									</label>
								</div>
								<div className="mr-4 flex items-center h-[40px] mb-4">
									<Button
										className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
										onClick={() =>
											this.searchbrandRef.current.openSearchBrand()
										}
										text="Search"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="bg-[#ffff] py-[20px] border-[1px] border-[#ddd] my-12">
					<div className="containers">
						<div className="grid grid-cols-12 gap-5">
							<div className="col-span-12">
								<h2 className="dark font-bold">Instagram followers Export</h2>
								<p>
									Mobilize followers by contacting them directly. Extract the
									entire list of followers and their contact details from any
									public Instagram account.
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="containers">
					<div className="grid grid-cols-12 gap-5">
						<div className="col-span-12">
							<div className="mb-2 flex flex-wrap items-center influential-export">
								<div className="mr-4 shadow-[0px_4px_5px_#96969640] rounded-[8px] bg-white w-150px h-[40px] mb-4">
									<Listbox
										onChange={(value) => this.handleFollowersChange(value)}
									>
										<div className="relative w-full z-50">
											<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
												<span className="flex items-center whitespace-nowrap">
													<img
														src={this.state.followersPlatform.src}
														className="w-6 h-6 rounded-full mr-2"
														alt="Followers Platform"
													/>
													{this.defaultValue(
														platformOptions,
														this.state.followersPlatform.value
													)}
												</span>
												<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
													<AiFillCaretDown
														size={12}
														className="text-black opacity-80"
														aria-hidden="true"
													/>
												</span>
											</Listbox.Button>
											<Transition
												as={Fragment}
												leave="transition ease-in duration-100"
												leaveFrom="opacity-100"
												leaveTo="opacity-0"
											>
												<Listbox.Options className="absolute max-h-60 -mt-[5px] w-full overflow-auto rounded-md bg-white py-1 text-[14px] shadow-[0_2px_3px_0_#22242626] focus:outline-none sm:text-sm z-50">
													{platformOptions.map((sort, key) => (
														<Listbox.Option
															key={key}
															className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
																sort === this.state.followersPlatform
																	? "bg-[#00000008]"
																	: ""
															}`}
															value={sort}
														>
															<span
																className={`flex items-center ${
																	sort === this.state.followersPlatform
																		? "purple font-semibold"
																		: "text-gray-900 font-medium"
																}`}
															>
																<img
																	src={sort.src}
																	alt={sort.text}
																	className="w-6 h-6 rounded-full mr-2"
																/>
																{sort.text}
															</span>
														</Listbox.Option>
													))}
												</Listbox.Options>
											</Transition>
										</div>
									</Listbox>
								</div>
								<div className="mr-4 shadow-[0px_4px_5px_#96969640] rounded-[8px] bg-white h-[40px] mb-4">
									<input
										placeholder="Influencer profile URL or @handle"
										className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
									/>
								</div>
								<div className="mr-4 flex items-center h-[40px] mb-4">
									<Button
										className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
										onClick={() =>
											this.searchbrandRef.current.openSearchBrand()
										}
										text="Search"
									/>
								</div>
							</div>
						</div>
						<Searchbrand ref={this.searchbrandRef} />
					</div>
				</div>
			</>
		);
	}
}

export default BrandInfluentialsExport;
