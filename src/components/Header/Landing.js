import { Component } from "react";
import { Link } from "react-router-dom";
import logo from "@assets/header_logo.png";
import { NavLink } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { VscChevronDown } from "react-icons/vsc";
import * as headerActions from "@store/actions/HeaderActions";
import { connect } from "react-redux";
import { Transition, Menu, Popover } from "@headlessui/react";
import Anchor from "@components/global/Anchor";
import { Fragment } from "react";
import { FiTool } from "react-icons/fi";
class LandingPageHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: true,
		};
	}
	componentDidMount() {
		const path = window.location.pathname;
		if (path) {
			const route = path.split("/");
			if (route) {
				if (route[1]) {
					if (route[1] === "register") {
						this.setState({ show: false });
					}
				}
			}
		}

		this.props.currentLoggedInUser();
		document.querySelector("body").addEventListener("click", setScroll);
		function setScroll() {
			let state = document.querySelector(
				"#preserve_scroll button[data-headlessui-state=open]"
			);
			if (state) {
				document.querySelector("html").style.overflow = "hidden";
				// document.querySelector("html").style.paddingRight = "5px";
			} else {
				document.querySelector("html").style.overflow = "";
				// document.querySelector("html").style.paddingRight = "";
			}
		}
	}
	render() {
		const { show } = this.state;
		return (
			<>
				<div className="sticky top-0 left-0 right-0 z-[11] min-h-[75px] bg-white border-b border-[#f7f7f7] flex items-center">
					<div className="containers px-[1rem]">
						<div className="flex items-center justify-between py-6 md:space-x-10">
							<div className="flex justify-start shrink-0">
								<Link to={process.env.REACT_APP_LANDING_URL}>
									<img className="w-[90px]" src={logo} alt="logo" />
								</Link>
							</div>
							{/** Free tool */}
							<div className="relative group after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:h-[38px] cursor-pointer">
										<button
											type="button"
											className="black inline-flex items-center rounded-md  bg-white text-[14px] font-medium  focus:outline-none"
											aria-expanded="false"
										>
											{/* <img
												src={Assets}
												alt="Assets"
												className="overflow-hidden mr-1 shrink-0 w-[16px] h-[16px]"
											/> */}
											<FiTool className="overflow-hidden mr-1 shrink-0 w-[16px] h-[16px]" />
											<span className="font-normal">Free tools</span>
										</button>

										<div className="absolute group-hover:block hidden z-10  mt-4 w-screen max-w-[600px] transform px-2 sm:!px-0 lg:!ml-0 -translate-x-1 ">
											<div className="overflow-hidden rounded-[8px] shadow-lg bg-white">
												<div className="flex">
													<div className="relative grid gap-6 bg-white p-6 sm:gap-8">
													
													
										
															<NavLink
																to="/tiktok-engagement-calculator"
																className={({ isActive }) => [
																	"-m-3 text-[14px] rounded-[8px] p-3 font-medium text-gray-900 hover:bg-gray-50 block ",
																	isActive ? " bg-gray-50" : "",
																]}
															>
																<div>
																	<p className="text-[14px] font-medium text-gray-900">
																		TikTok ER calculator
																	</p>
																	<p className="mt-1 text-sm text-gray-500">
																		Calculate the engagement rate
																		for any influencer
																	</p>
																</div>
															</NavLink>

															<NavLink
														to="/tiktok-niche"
														className={({ isActive }) => [
															"-m-3 text-[14px] rounded-[8px] p-3 font-medium text-gray-900 hover:bg-gray-50 block ",
															isActive ? " bg-gray-50" : "",
														]}
													>
														<div>
															<p className="text-[14px] font-medium text-gray-900">
																Niche Tiktok Influencers
															</p>
															<p className="mt-1 text-sm text-gray-500">
																Search for influencers by topics
																they talk about
															</p>
														</div>
													</NavLink>
													<NavLink
														to="/tiktok-location"
														className={({ isActive }) => [
															"-m-3 text-[14px] rounded-[8px] p-3 font-medium text-gray-900 hover:bg-gray-50 block ",
															isActive ? " bg-gray-50" : "",
														]}
													>
														<div>
															<p className="text-[14px] font-medium text-gray-900">
																TikTok Location search
															</p>
															<p className="mt-1 text-sm text-gray-500">
																Find tiktok influencers by
																location
															</p>
														</div>
													</NavLink>
													<NavLink
														to="/tiktok-email-finder"
														className={({ isActive }) => [
															"-m-3 text-[14px] rounded-[8px] p-3 font-medium text-gray-900 hover:bg-gray-50 block ",
															isActive ? " bg-gray-50" : "",
														]}
													>
														<div>
															<p className="text-[14px] font-medium text-gray-900">
																Tiktok Email Finder
															</p>
															<p className="mt-1 text-sm text-gray-500">
																Find emails for Tiktok
																influencer
															</p>
														</div>
													</NavLink>
															
															
													</div>
													<div className="relative grid gap-6 bg-white p-6 sm:gap-8">
													
													
													<NavLink
														to="/youtube-niche"
														className={({ isActive }) => [
															"-m-3 text-[14px] rounded-[8px] p-3 font-medium text-gray-900 hover:bg-gray-50 block ",
															isActive ? " bg-gray-50" : "",
														]}
													>
														<div>
															<p className="text-[14px] font-medium text-gray-900">
																Niche Youtube Influencers
															</p>
															<p className="mt-1 text-sm text-gray-500">
																Search for influencers by topics
																they talk about
															</p>
														</div>
													</NavLink>
													<NavLink
														to="/youtube-location"
														className={({ isActive }) => [
															"-m-3 text-[14px] rounded-[8px] p-3 font-medium text-gray-900 hover:bg-gray-50 block ",
															isActive ? " bg-gray-50" : "",
														]}
													>
														<div>
															<p className="text-[14px] font-medium text-gray-900">
																Youtube Location search
															</p>
															<p className="mt-1 text-sm text-gray-500">
																Find Youtube influencers by
																location
															</p>
														</div>
													</NavLink>
													<NavLink
																to="/youtube-email-finder"
																className={({ isActive }) => [
																	"-m-3 text-[14px] rounded-[8px] p-3 font-medium text-gray-900 hover:bg-gray-50 block ",
																	isActive ? " bg-gray-50" : "",
																]}
															>
																<div>
																	<p className="text-[14px] font-medium text-gray-900">
																		Youtube Email Finder
																	</p>
																	<p className="mt-1 text-sm text-gray-500">
																		Find emails for Youtube
																		influencer
																	</p>
																</div>
															</NavLink>
													
													</div>
												</div>
											</div>
										</div>
									</div>
									{/** end free tool */}
							{show && (
								<>
								
									<div className="hidden items-center justify-end xl:flex md:flex-1 lg:w-0">
										{localStorage.getItem("isLogin") ? (
											<a href={"/dashboard"}>Dashboard</a>
										) : (
											<>
											<NavLink
												to="/brand/login"
												className={({ isActive }) => [
													"-m-3 text-[14px] rounded-[8px] p-3 font-medium text-gray-900 hover:bg-gray-50 block ",
													isActive ? " success" : "",
												]}
											>
												Login
											</NavLink>
												<div className="relative group after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:h-[35px] cursor-pointer">
													{/* <NavLink to="/brand/login"
																	className={({ isActive }) => [
																		"-m-3 text-[14px] rounded-[8px] p-3 font-medium text-gray-900 hover:bg-gray-50 block ",
																		isActive ? " success" : "",
																	]} >
														<span className="black font-normal group-hover:text-[color:var(--successs)]">
															Login
														</span>
														<VscChevronDown className="black ml-2 h-5 w-5 group-hover:text-[color:var(--successs)]" />
													</NavLink> */}

													{/* <div className="absolute group-hover:block hidden z-10  mt-4 w-screen max-w-[270px] transform px-2 sm:px-0 lg:ml-0 -translate-x-1 ">
														<div className="overflow-hidden rounded-[8px] shadow-lg ring-1 ring-black ring-opacity-5">
															<div className="relative grid gap-6 bg-white  p-6 sm:gap-8">
																<NavLink
																	to="/brand/login"
																	className={({ isActive }) => [
																		"-m-3 text-[14px] rounded-[8px] p-3 font-medium text-gray-900 hover:bg-gray-50 block ",
																		isActive ? " success" : "",
																	]}
																>
																	Brand
																</NavLink>
																<NavLink
																	to="/influencer/login"
																	className={({ isActive }) => [
																		"-m-3 text-[14px] rounded-[8px] p-3 font-medium text-gray-900 hover:bg-gray-50 block ",
																		isActive ? " success" : "",
																	]}
																>
																	Influencer
																</NavLink>
															</div>
														</div>
													</div> */}
												</div>
												<NavLink
													to="/brand/register"
													className="ml-6 inline-flex items-center justify-center whitespace-nowrap rounded-md border-[1px] text-[12px] border--purple bg--purple px-4 py-[0.5rem] font-medium text-white hover:opacity-80"
												>
													Get Started
												</NavLink>
											</>
										)}
									</div>
									<div className="-my-2 -mr-2 xl:hidden flex flex-1 justify-end pr-3">
										<Menu as="div" className="bg-white" id="preserve_scroll">
											<Menu.Button className="bg-whte rounded-md p-2 hover:text-gray-900 inline-flex items-center justify-center text-gray-500  hover:bg-gray-100">
												<HiOutlineMenu size={30} className="black" />
											</Menu.Button>

											<Transition
												as={Fragment}
												enter="duration-200 ease-out"
												enterFrom="opacity-0 scale-95"
												enterTo="opacity-100 scale-100"
												leave="duration-100 ease-in"
												leaveFrom="opacity-100 scale-100"
												leaveTo="opacity-0 scale-95"
											>
												<Menu.Items className="absolute top-20 max-w-[92%] mx-auto z-2xlfull inset-x-0 py-[0.5rem] transition transform origin-top-right xxl:hidden">
													<div className="rounded-[8px] shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
														<div className="py-10 px-12 space-y-10">
															<Popover className="relative">
																<Popover.Button className="relative after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:h-[35px] cursor-pointer">
																	<div className="inline-flex items-center">
																		<span className="black font-normal group-hover:text-[color:var(--successs)]">
																			What we do
																		</span>
																		<VscChevronDown className="black ml-2 h-5 w-5 group-hover:text-[color:var(--successs)]" />
																	</div>
																</Popover.Button>
																<Popover.Panel className="absolute mt-4 md:w-screen md:max-w-md transform px-2 sm:px-0 lg:ml-0 -translate-x-1 z-10">
																	<div className="overflow-hidden rounded-[8px] shadow-lg ring-1 ring-black ring-opacity-5">
																		<div className="relative grid gap-6 bg-white  p-6 sm:gap-8">
																			<Menu.Item>
																				<NavLink
																					to="/influencer"
																					className={({ isActive }) => [
																						"-m-3 text-[14px] rounded-[8px] p-3 font-medium text-gray-900 hover:bg-gray-50 block ",
																						isActive ? " success" : "",
																					]}
																				>
																					<div>
																						<p className="text-[14px] font-medium text-gray-900">
																							Influencer Marketing
																						</p>
																						<p className="mt-1 text-sm text-gray-500">
																							Branded content that converts
																						</p>
																					</div>
																				</NavLink>
																			</Menu.Item>
																			<Menu.Item>
																				<NavLink
																					to="/ugc"
																					className={({ isActive }) => [
																						"-m-3 text-[14px] rounded-[8px] p-3 font-medium text-gray-900 hover:bg-gray-50 block ",
																						isActive ? " success" : "",
																					]}
																				>
																					<div>
																						<p className="text-[14px] font-medium text-gray-900">
																							User Generated Content
																						</p>
																						<p className="mt-1 text-sm text-gray-500">
																							Discover, connect and manage
																							influencers
																						</p>
																					</div>
																				</NavLink>
																			</Menu.Item>
																			<Menu.Item>
																				<NavLink
																					to="/managed-services"
																					className={({ isActive }) => [
																						"-m-3 text-[14px] rounded-[8px] p-3 font-medium text-gray-900 hover:bg-gray-50 block ",
																						isActive ? " success" : "",
																					]}
																				>
																					<div>
																						<p className="text-[14px] font-medium text-gray-900">
																							Managed Campaigns
																						</p>
																						<p className="mt-1 text-sm text-gray-500">
																							Let us do it for you
																						</p>
																					</div>
																				</NavLink>
																			</Menu.Item>
																		</div>
																	</div>
																</Popover.Panel>
															</Popover>
															<Popover className="relative">
																<Popover.Button className="relative after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:h-[35px] cursor-pointer">
																	<div className="inline-flex items-center">
																		<span className="black font-normal group-hover:text-[color:var(--successs)]">
																			How we do it
																		</span>

																		<VscChevronDown className="black ml-2 h-5 w-5 group-hover:text-[color:var(--successs)]" />
																	</div>
																</Popover.Button>
																<Popover.Panel className="absolute z-10  mt-4 md:w-screen md:max-w-md transform px-2 sm:px-0 lg:ml-0 -translate-x-1">
																	<div className="overflow-hidden rounded-[8px] shadow-lg ring-1 ring-black ring-opacity-5">
																		<div className="relative grid gap-6 bg-white p-6 sm:gap-8 md:h-full h-[60vh] overflow-y-auto">
																			<Menu.Item>
																				<NavLink
																					to="/discovery"
																					className={({ isActive }) => [
																						"-m-3 text-[14px] rounded-[8px] p-3 font-medium text-gray-900 hover:bg-gray-50 block ",
																						isActive ? " success" : "",
																					]}
																				>
																					<div>
																						<p className="text-[14px] font-medium text-gray-900">
																							Dicover & Recruit
																						</p>
																						<p className="mt-1 text-sm text-gray-500">
																							Filter through 34+ Million
																							influencers
																						</p>
																					</div>
																				</NavLink>
																			</Menu.Item>
																			<Menu.Item>
																				<NavLink
																					to="/discovery#ambassadors"
																					className={({ isActive }) => [
																						"-m-3 text-[14px] rounded-[8px] p-3 font-medium text-gray-900 hover:bg-gray-50 block ",
																						isActive ? " success" : "",
																					]}
																				>
																					<div>
																						<p className="text-[14px] font-medium text-gray-900">
																							Influential fans
																						</p>
																						<p className="mt-1 text-sm text-gray-500">
																							Reveal influencers that already in
																							love with your brand.
																						</p>
																					</div>
																				</NavLink>
																			</Menu.Item>
																			<Menu.Item>
																				<NavLink
																					to="/analyzer"
																					className={({ isActive }) => [
																						"-m-3 text-[14px] rounded-[8px] p-3 font-medium text-gray-900 hover:bg-gray-50 block ",
																						isActive ? " success" : "",
																					]}
																				>
																					<div>
																						<p className="text-[14px] font-medium text-gray-900">
																							Analyzer
																						</p>
																						<p className="mt-1 text-sm text-gray-500">
																							Over 10 in-depth metrics to
																							analyze influencers
																						</p>
																					</div>
																				</NavLink>
																			</Menu.Item>
																			<Menu.Item>
																				<NavLink
																					to="/analyzer#overlap"
																					className={({ isActive }) => [
																						"-m-3 text-[14px] rounded-[8px] p-3 font-medium text-gray-900 hover:bg-gray-50 block ",
																						isActive ? " success" : "",
																					]}
																				>
																					<div>
																						<p className="text-[14px] font-medium text-gray-900">
																							Audience overlap
																						</p>
																						<p className="mt-1 text-sm text-gray-500">
																							Estimated percentage of repeated
																							followers influencers have
																						</p>
																					</div>
																				</NavLink>
																			</Menu.Item>
																			<Menu.Item>
																				<NavLink
																					to="/monitor-campaign-tools"
																					className={({ isActive }) => [
																						"-m-3 text-[14px] rounded-[8px] p-3 font-medium text-gray-900 hover:bg-gray-50 block ",
																						isActive ? " success" : "",
																					]}
																				>
																					<div>
																						<p className="text-[14px] font-medium text-gray-900">
																							Content Explorer
																						</p>
																						<p className="mt-1 text-sm text-gray-500">
																							Instagram stories tracking &
																							sponsored posts library
																						</p>
																					</div>
																				</NavLink>
																			</Menu.Item>
																		</div>
																	</div>
																</Popover.Panel>
															</Popover>
															<Popover className="relative">
																<Popover.Button className="relative after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:h-[35px] cursor-pointer">
																	<div className="inline-flex items-center">
																		<span className="black font-normal group-hover:text-[color:var(--successs)]">
																			Free tools
																		</span>

																		<VscChevronDown className="black ml-2 h-5 w-5 group-hover:text-[color:var(--successs)]" />
																	</div>
																</Popover.Button>
																<Popover.Panel className="absolute z-10  mt-4 md:w-screen md:max-w-[675px] transform px-2 sm:px-0 lg:ml-0 -translate-x-1">
																	<div className="overflow-hidden rounded-[8px] shadow-lg ring-1 ring-black ring-opacity-5">
																		<div className="md:flex md:h-full h-[60vh] overflow-y-auto">
																			<div className="relative grid gap-6 bg-white p-6 sm:gap-8 border-r-[1px] border-[#dee2e6]">
																				
																				
																				
																				<Menu.Item>
																					<NavLink
																						to="/tiktok-engagement-calculator"
																						className={({ isActive }) => [
																							"-m-3 text-[14px] rounded-[8px] p-3 font-medium text-gray-900 hover:bg-gray-50 block ",
																							isActive ? " success" : "",
																						]}
																					>
																						<div>
																							<p className="text-[14px] font-medium text-gray-900">
																								TikTok ER calculator
																							</p>
																							<p className="mt-1 text-sm text-gray-500">
																								Calculate the engagement rate
																								for any influencer
																							</p>
																						</div>
																					</NavLink>
																				</Menu.Item>
																				<Menu.Item>
																					<NavLink
																						to="/youtube-email-finder"
																						className={({ isActive }) => [
																							"-m-3 text-[14px] rounded-[8px] p-3 font-medium text-gray-900 hover:bg-gray-50 block ",
																							isActive ? " success" : "",
																						]}
																					>
																						<div>
																							<p className="text-[14px] font-medium text-gray-900">
																								Youtube Email Finder
																							</p>
																							<p className="mt-1 text-sm text-gray-500">
																								Find emails for Youtube
																								influencer
																							</p>
																						</div>
																					</NavLink>
																				</Menu.Item>
																			</div>
																			<div className="relative grid gap-6 bg-white p-6 sm:gap-8">
																				<Menu.Item>
																					<NavLink
																						to="/tiktok-niche"
																						className={({ isActive }) => [
																							"-m-3 text-[14px] rounded-[8px] p-3 font-medium text-gray-900 hover:bg-gray-50 block ",
																							isActive ? " success" : "",
																						]}
																					>
																						<div>
																							<p className="text-[14px] font-medium text-gray-900">
																								Niche Tiktok Influencers
																							</p>
																							<p className="mt-1 text-sm text-gray-500">
																								Search for influencers by topics
																								they talk about
																							</p>
																						</div>
																					</NavLink>
																				</Menu.Item>
																				<Menu.Item>
																					<NavLink
																						to="/tiktok-location"
																						className={({ isActive }) => [
																							"-m-3 text-[14px] rounded-[8px] p-3 font-medium text-gray-900 hover:bg-gray-50 block ",
																							isActive ? " success" : "",
																						]}
																					>
																						<div>
																							<p className="text-[14px] font-medium text-gray-900">
																								TikTok Location search
																							</p>
																							<p className="mt-1 text-sm text-gray-500">
																								Find tiktok influencers by
																								location
																							</p>
																						</div>
																					</NavLink>
																				</Menu.Item>
																				<Menu.Item>
																					<NavLink
																						to="/youtube-niche"
																						className={({ isActive }) => [
																							"-m-3 text-[14px] rounded-[8px] p-3 font-medium text-gray-900 hover:bg-gray-50 block ",
																							isActive ? " success" : "",
																						]}
																					>
																						<div>
																							<p className="text-[14px] font-medium text-gray-900">
																								Niche Youtube Influencers
																							</p>
																							<p className="mt-1 text-sm text-gray-500">
																								Search for influencers by topics
																								they talk about
																							</p>
																						</div>
																					</NavLink>
																				</Menu.Item>
																				<Menu.Item>
																					<NavLink
																						to="/youtube-location"
																						className={({ isActive }) => [
																							"-m-3 text-[14px] rounded-[8px] p-3 font-medium text-gray-900 hover:bg-gray-50 block ",
																							isActive ? " success" : "",
																						]}
																					>
																						<div>
																							<p className="text-[14px] font-medium text-gray-900">
																								Youtube Location search
																							</p>
																							<p className="mt-1 text-sm text-gray-500">
																								Find Youtube influencers by
																								location
																							</p>
																						</div>
																					</NavLink>
																				</Menu.Item>
																				<Menu.Item>
																					<NavLink
																						to="/tiktok-email-finder"
																						className={({ isActive }) => [
																							"-m-3 text-[14px] rounded-[8px] p-3 font-medium text-gray-900 hover:bg-gray-50 block ",
																							isActive ? " success" : "",
																						]}
																					>
																						<div>
																							<p className="text-[14px] font-medium text-gray-900">
																								Tiktok Email Finder
																							</p>
																							<p className="mt-1 text-sm text-gray-500">
																								Find emails for Tiktok
																								influencer
																							</p>
																						</div>
																					</NavLink>
																				</Menu.Item>
																			</div>
																		</div>
																	</div>
																</Popover.Panel>
															</Popover>

															<div>
																<Menu.Item>
																	<NavLink
																		to="/discover-recipes"
																		className={({ isActive }) => [
																			" inline-flex items-center rounded-md hover:success bg-white text-[14px] font-normal  focus:outline-none",
																			isActive ? " success" : " black",
																		]}
																	>
																		Discover recipes
																	</NavLink>
																</Menu.Item>
															</div>
															<div>
																<Menu.Item>
																	<NavLink
																		to="/influencer"
																		className={({ isActive }) => [
																			" inline-flex items-center rounded-md hover:success bg-white text-[14px] font-normal  focus:outline-none",
																			isActive ? " success" : " black",
																		]}
																	>
																		Influencers
																	</NavLink>
																</Menu.Item>
															</div>
															{localStorage.getItem("isLogin") ? (
																<Menu.Item>
																	<Anchor
																		className="inline-flex items-center black rounded-md hover:success bg-white text-[14px] font-normal  focus:outline-none"
																		href={'/' + localStorage.role + "/dashboard"}
																		text="Dashboard"
																	/>
																</Menu.Item>
															) : (
																<>
																	<Popover className="relative">
																		<Popover.Button className="relative after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:h-[35px] cursor-pointer">
																			<div className="inline-flex items-center">
																				<span className="black font-normal group-hover:text-[color:var(--successs)]">
																					Login
																				</span>
																				<VscChevronDown className="black ml-2 h-5 w-5 group-hover:text-[color:var(--successs)]" />
																			</div>
																		</Popover.Button>
																		<Popover.Panel className="absolute z-10  mt-4 md:w-screen w-full md:max-w-[270px] transform px-2 sm:px-0 lg:ml-0 -translate-x-1">
																			<div className="overflow-hidden rounded-[8px] shadow-lg ring-1 ring-black ring-opacity-5">
																				<div className="relative grid gap-6 bg-white  p-6 sm:gap-8">
																					<Menu.Item>
																						<NavLink
																							to="/brand/login"
																							className={({ isActive }) => [
																								" items-center rounded-md hover:success bg-white text-[14px] font-normal hover:bg-gray-50 block focus:outline-none",
																								isActive
																									? " success"
																									: " text-gray-500",
																							]}
																						>
																							<p className="text-[14px] font-medium text-gray-900">
																								Brand
																							</p>
																						</NavLink>
																					</Menu.Item>
																					<Menu.Item>
																						<NavLink
																							to="/influencer/login"
																							className={({ isActive }) => [
																								" items-center rounded-md hover:success bg-white text-[14px] font-normal hover:bg-gray-50 block focus:outline-none",
																								isActive
																									? " success"
																									: " text-gray-500",
																							]}
																						>
																							<p className="text-[14px] font-medium text-gray-900">
																								Influencer
																							</p>
																						</NavLink>
																					</Menu.Item>
																				</div>
																			</div>
																		</Popover.Panel>
																	</Popover>
																	<div className="flex flex-wrap xxs:flex-nowrap gap-4">
																		<Menu.Item>
																			<NavLink
																				to="/brand/register"
																				className="flex items-center justify-center whitespace-nowrap flex-1 rounded-md border-[1px] text-[12px] border--purple bg--purple px-4 py-[0.5rem] font-medium text-white hover:opacity-80"
																			>
																				Get Started
																			</NavLink>
																		</Menu.Item>
																	</div>
																</>
															)}
														</div>
													</div>
												</Menu.Items>
											</Transition>
										</Menu>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		currentLoggedInUser: () => dispatch(headerActions.currentLoggedInUser()),
	};
};

export default connect(null, mapDispatchToProps)(LandingPageHeader);
