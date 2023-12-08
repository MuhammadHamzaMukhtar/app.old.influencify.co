import { Component, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from "react-icons/io";
import avatar from "@assets/avatar.png";

function SampleNextArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ ...style, display: "block" }}
			onClick={onClick}
		>
			<IoIosArrowForward size={18} className="gray" />
		</div>
	);
}

function SamplePrevArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ ...style, display: "block" }}
			onClick={onClick}
		>
			<IoIosArrowBack size={18} className="gray" />
		</div>
	);
}

class ContentDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showContentDetail: false,
		};
	}
	showContentDetail = () => {
		this.setState({ showContentDetail: true });
	};
	hideContentDetail = () => {
		this.setState({ showContentDetail: false });
	};
	render() {
		const { item } = this.props;
		const settings = {
			className: "center",
			dots: false,
			slidesToShow: 1,
			infinite: false,
			nextArrow: <SampleNextArrow />,
			prevArrow: <SamplePrevArrow />,
		};
		return (
			<>
				<Transition appear show={this.state.showContentDetail} as={Fragment}>
					<Dialog
						onClose={this.hideContentDetail}
						className="relative z-[9999]"
					>
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
								<Dialog.Panel className="mx-auto sm:min-w-[57rem] min-w-full rounded-[8px] bg-white">
									<div className="p-3">
										<div
											className="close-detail-modal"
											onClick={this.hideContentDetail}
										>
											<IoIosClose size={28} />
										</div>
										<Slider {...settings}>
											<div>
												<div className="p-3">
													<div className="flex items-center mb-1">
														<img
															className="rounded-full mr-4 w-[45px]"
															src={
																(item &&
																	item.influencer &&
																	item.influencer.profile_pic)
															}
															alt="Influencer"
														/>
														<div className="ml-4">
															{item &&
																item.influencer &&
																item.influencer.name && (
																	<h6 className="mt-0 text-[16px]">
																		{item.influencer.name}
																	</h6>
																)}
															<p>
																{item &&
																item.influencer &&
																item.influencer.created_at
																	? item.influencer.created_at
																	: ""}
															</p>
														</div>
													</div>
												</div>
												<div className="grid grid-cols-12 gap-5">
													<div className="border-t !border-[#dee2e6] px-4 md:col-span-4 col-span-12">
														<div className="flex justify-between flex-col h-full py-4">
															<ul className="list-unstyled">
																<li className="mb-6">
																	<p className="gray">Brand</p>
																	<h6 className="font-medium text-[14px]">
																		{item && item.brand ? item.brand.name : ""}
																	</h6>
																</li>
																{item.brandCountry && (
																	<li className="mb-6">
																		<p className="gray">Location</p>
																		<h6 className="font-medium text-[14px]">
																			{item && item.brand && item.brand.country
																				? item.brand.country
																				: ""}
																		</h6>
																	</li>
																)}
																<li className="mb-6">
																	<p className="gray">Project</p>
																	<h6 className="font-medium text-[14px]">
																		Running Woman
																	</h6>
																</li>
																{item.platform && (
																	<li className="mb-6">
																		<p className="gray">Platform</p>
																		<h6 className="font-medium text-[14px]">
																			{item.platform}
																		</h6>
																	</li>
																)}
																{item.category && (
																	<li className="mb-6">
																		<p className="gray">Category</p>
																		<h6 className="font-medium text-[14px]">
																			{item.category}
																		</h6>
																	</li>
																)}
															</ul>
															<ul className="list-unstyled">
																<li className="mb-6 text-center"></li>
															</ul>
														</div>
													</div>
													<div className="py-4 bg-light px-0 md:col-span-8 col-span-12">
														<div>
															{item ? (
																<>
																	{item.media_type === "VIDEO" ? (
																		<a
																			href={item.permalink}
																			target="_blank"
																			rel="noopener noreferrer"
																			className="card-link"
																		>
																			<iframe
																				title="VIDEO"
																				className="h-[auto] w-full"
																				src={item.media_url}
																				frameBorder="0"
																				allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
																				allowFullScreen
																			></iframe>
																		</a>
																	) : (
																		""
																	)}
																	{item.media_type === "IMAGE" ? (
																		<a
																			href={item.permalink}
																			target="_blank"
																			rel="noopener noreferrer"
																			className="card-link"
																		>
																			<img
																				className="max-h-[307px] object-cover"
																				src={item.media_url}
																				alt="Influencer"
																			/>
																		</a>
																	) : (
																		""
																	)}
																</>
															) : (
																<img
																	className="max-h-[307px] object-cover"
																	src={avatar}
																	alt="avatar"
																/>
															)}
														</div>
													</div>
												</div>
											</div>
										</Slider>
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
export default ContentDetail;
