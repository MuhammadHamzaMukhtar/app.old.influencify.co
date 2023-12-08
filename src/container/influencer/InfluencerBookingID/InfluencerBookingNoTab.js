import { Component, Fragment } from "react";
import { FiX } from "react-icons/fi";
import { Dialog, Transition } from "@headlessui/react";

import { connect } from "react-redux";
import CarouselImagesComponent from "@components/CarouselImagesComponent";
import { Link } from "react-router-dom";
import avatar from "@assets/avatar.png";
import DOMPurify from "dompurify";

class InfluencerBookingNoTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lightboxIsOpen: false,
			downalodModalOpen: false,
			currentIndex: 0,
		};
	}

	handleClose = () => {
		this.setState({
			downalodModalOpen: false,
		});
	};

	handleOpenDownloadModal = () => {
		this.setState({
			downalodModalOpen: true,
		});
	};

	createMarkup = (html) => {
		return {
			__html: DOMPurify.sanitize(html),
		};
	};

	render() {
		const { campaign_payment } = this.props;
		return (
			<div>
				<div className="containers">
					<div className="grid grid-cols-12 gap-5 mt-12">
						<div className="sm:col-span-4 col-span-12">
							<h5 className="mb-2 text-[18px]">General</h5>
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-12">
								<div className="flex flex-col">
									<div className="flex justify-between px-[16px] py-[8px]">
										<p>Fixed Fee</p>
										<h4 className=" text-[20px]">
											{campaign_payment.fixedFee}{" "}
											{this.props.currentLoggedUser.currency_code}{" "}
											{campaign_payment.products && campaign_payment.products.length
												? "+ Voucher"
												: ""}
										</h4>
									</div>
									<div className="flex justify-between px-[16px] py-[8px]">
										<p>Timing</p>
										<b>
											{this.props.postingFrom} - {this.props.postingTo}
										</b>
									</div>
									<div className="flex justify-between px-[16px] py-[8px]">
										<p>Location</p>
										<b>{this.props.campaignCountry}</b>
									</div>
									<div className="flex justify-between px-[16px] py-[8px]">
										<p>Post deadline</p>
										<b className="pink">
											wthin {this.props.completeInDays} Days
										</b>
									</div>
									<div className="flex justify-between px-[16px] py-[8px]">
										<p className="mr-4 sm:mr-12">Publicity</p>
										<p>
											Campaign will be automatically added as a reference and
											reviews will appear with names
										</p>
									</div>
									<div className="flex justify-between px-[16px] py-[8px]"></div>
								</div>
							</div>
						</div>
						<div className="sm:col-span-8 col-span-12">
							<h5 className="mb-2 text-[18px]">Brief</h5>
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-12">
								<div className="flex flex-col">
									<div className="flex justify-between px-[16px] py-[8px]">
										<p>Post type</p>
										<b>
											Instagram:{" "}
											{this.props.contentPostType.Story > 0
												? "story " + this.props.contentPostType.Story
												: ""}{" "}
											{this.props.contentPostType.Post > 0
												? "+ post " + this.props.contentPostType.Post
												: ""}
										</b>
									</div>
									<div className="flex justify-between px-[16px] py-[8px]">
										<p>Wording</p>
										<b>{this.props.postWordingType}</b>
									</div>
									<div className="flex justify-between px-[16px] py-[8px]">
										<p className="mr-4 sm:mr-12">Instructions</p>
										<div>
											<p className="mt-2 mb-4">
												<div
													dangerouslySetInnerHTML={this.createMarkup(
														this.props.campaignInstruction
													)}
												></div>
											</p>
										</div>
									</div>
									<div className="flex justify-between px-[16px] py-[8px]">
										<p>Links to share</p>
										<b>{this.props.linkToShare}</b>
									</div>
									{this.props.campaignPreview ? (
										<div className="flex justify-between px-[16px] py-[8px]">
											<p className="mr-4 sm:mr-12">Preview need</p>
											<div>
												<p>
													The brand wants to preview your content first, so you
													will have to create it in advance. Once approved,
													publish it and you'll get paid.
												</p>
											</div>
										</div>
									) : (
										""
									)}
									<div className="flex justify-between px-[16px] py-[8px]"></div>
								</div>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-12 gap-5">
						<div className="sm:col-span-4 col-span-12">
							<h5 className="mb-2 text-[18px]">Products</h5>
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3 sm:!p-12">
								{campaign_payment.products?.length ? (
									campaign_payment.products.map((product, index) => (
										<div key={index}>
											{product.offer_type === "Product" ? (
												<div className="grid grid-cols-12 gap-5 pt-4">
													<div className="sm:col-span-4 col-span-12">
														<a
															href={product.url}
															target="_blank"
															rel="noopener noreferrer"
														>
															<img
																src={
																	product.images.length
																		? product.images[0]
																		: avatar
																}
																alt={product.name}
																rounded
																width={90}
															/>
														</a>
													</div>
													<div className="sm:col-span-8 col-span-12">
														<div className="table w-full h-full">
															<h6 className=" text-[16px]">{product.name}</h6>
															<h6 className="table-cell align-bottom text-right text-[16px]s">
																{product.value}{" "}
																{this.props.currentLoggedUser.currency_code}
															</h6>
														</div>
													</div>
												</div>
											) : (
												""
											)}
											{product.offer_type === "Voucher" &&
											product.voucher_type === "mandatory" &&
											this.props.FlowStatus === "requested" ? (
												<div className="grid grid-cols-12 gap-5 pt-4">
													<div className="sm:col-span-4 col-span-12">
														<a
															href={product.url}
															target="_blank"
															rel="noopener noreferrer"
														>
															<img
																src={
																	product.images.length
																		? product.images[0]
																		: avatar
																}
																alt={product.name}
																rounded
																width={90}
															/>
														</a>
													</div>
													<div className="sm:col-span-8 col-span-12">
														<div className="table w-full h-full">
															<h6 className=" text-[16px]">{product.name}</h6>
															<div className="list-group-flush mt-6">
																<div className="flex justify-between px-[16px] py-[8px]">
																	<span>Total Value</span>
																	<h6 className=" text-[16px]">
																		{product.value}{" "}
																		{this.props.currentLoggedUser.currency_code}
																	</h6>
																</div>
																<div className="flex justify-between px-[16px] py-[8px]">
																	<span>Code</span>
																	{product.code_vouchers.length
																		? product.code_vouchers.map(
																				(code, index) => (
																					<h4 className=" text-[20px]">
																						{code}{" "}
																					</h4>
																				)
																		  )
																		: ""}
																</div>
																<div className="flex justify-between px-[16px] py-[8px]">
																	<span>Links</span>
																	{product.link_vouchers.length
																		? product.link_vouchers.map(
																				(link, index) => (
																					<h4 className=" text-[20px]">
																						{link}{" "}
																					</h4>
																				)
																		  )
																		: ""}
																</div>
																<div className="flex justify-between px-[16px] py-[8px]">
																	<span>File</span>
																	{product.voucher_pdf_path ? (
																		<a>{product.voucher_pdf_name} </a>
																	) : (
																		""
																	)}
																</div>
																<div className="flex justify-between px-[16px] py-[8px]">
																	<span>Images</span>
																	{product.images.length
																		? product.images.map((image, index) => (
																				<img
																					key={index}
																					src={image}
																					thumbnail
																					alt="pdf"
																					width="100"
																				/>
																		  ))
																		: ""}
																</div>
															</div>
														</div>
													</div>
												</div>
											) : (
												""
											)}
											{product.offer_type === "Voucher" &&
											product.voucher_type === "gift" &&
											this.props.FlowStatus === "closed" ? (
												<div className="grid grid-cols-12 gap-5 pt-4">
													<div className="sm:col-span-4 col-span-12">
														<a
															href={product.url}
															target="_blank"
															rel="noopener noreferrer"
														>
															<img
																src={
																	product.images.length
																		? product.images[0]
																		: avatar
																}
																alt={product.name}
																rounded
																width={90}
															/>
														</a>
													</div>
													<div className="sm:col-span-8 col-span-12">
														<div className="table w-full h-full">
															<h6 className=" text-[16px]">{product.name}</h6>
															<div className="flex flex-col mt-6">
																<div className="flex justify-between px-[16px] py-[8px]">
																	<span>Total Value</span>
																	<h6 className=" text-[16px]">
																		{product.value}{" "}
																		{this.props.currentLoggedUser.currency_code}
																	</h6>
																</div>
																<div className="flex justify-between px-[16px] py-[8px]">
																	<span>Code</span>
																	{product.code_vouchers.length
																		? product.code_vouchers.map(
																				(code, index) => (
																					<h4 className=" text-[20px]">
																						{code}{" "}
																					</h4>
																				)
																		  )
																		: ""}
																</div>
																<div className="flex justify-between px-[16px] py-[8px]">
																	<span>Links</span>
																	{product.link_vouchers.length
																		? product.link_vouchers.map(
																				(link, index) => (
																					<h4 className=" text-[20px]">
																						{link}{" "}
																					</h4>
																				)
																		  )
																		: ""}
																</div>
																<div className="flex justify-between px-[16px] py-[8px]">
																	<span>File</span>
																	{product.voucher_pdf_path ? (
																		<a>{product.voucher_pdf_name} </a>
																	) : (
																		""
																	)}
																</div>
																<div className="flex justify-between px-[16px] py-[8px]">
																	<span>Images</span>
																	{product.images.length
																		? product.images.map((image, index) => (
																				<img
																					key={index}
																					src={image}
																					thumbnail
																					alt="product"
																					width="100"
																				/>
																		  ))
																		: ""}
																</div>
															</div>
														</div>
													</div>
												</div>
											) : (
												""
											)}
											<div className="bg-[#0000001f] h-[1px] w-full mt-4" />
										</div>
									))
								) : (
									<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
										We have nothing to show you here.
									</div>
								)}
							</div>
						</div>
						<div className="sm:col-span-8 col-span-12">
							<h5 className="mb-2 text-[18px]">Use photos like this</h5>
							{this.props.lightBoxImages.length ? (
								<h5
									className="mb-2 text-right text-[18px]"
									onClick={() => this.handleOpenDownloadModal()}
								>
									<Link to="#"> Download</Link>
								</h5>
							) : (
								""
							)}

							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-12">
								{this.props.lightBoxImages.length ? (
									<CarouselImagesComponent
										isLoading={this.props.isLoading}
										images={this.props.lightBoxImages}
									/>
								) : (
									<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
										We have nothing to show you here.
									</div>
								)}
							</div>
						</div>
					</div>

					<Transition appear show={this.state.downalodModalOpen} as={Fragment}>
						<Dialog onClose={this.handleClose} className="relative z-[9999]">
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
											<h2 className=" text-[23px]">Downloads</h2>
											<div
												className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
												onClick={this.handleClose}
											>
												<FiX size={24} className="text-white stroke-white" />
											</div>
										</Dialog.Title>
										<div className="p-3">
											{this.props.lightBoxImages.length
												? this.props.lightBoxImages.map((file, index) => (
														<div key={index}>
															<div className="row">
																<div className="col-md-8">
																	<img
																		src={file.src}
																		className="mb-4 mt-4"
																		thumbnail
																		alt="download"
																		width="100"
																	/>
																</div>
																<div className="col-md-4">
																	<div className="float-right mt-12">
																		<div>
																			<a
																				href={file.src}
																				target="_blank"
																				rel="noopener noreferrer"
																				download
																			>
																				Download
																			</a>
																		</div>
																	</div>
																</div>
															</div>
															<div className="bg-[#0000001f] h-[1px] w-full mt-12 sm:!mt-0" />
														</div>
												  ))
												: ""}
										</div>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</Dialog>
					</Transition>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currentLoggedUser: state.HeaderReducer.currentLoggedUser,
		campaignCountry: state.InfluencersBookingIDReducer.campaignCountry,
		postingFrom: state.InfluencersBookingIDReducer.postingFrom,
		postingTo: state.InfluencersBookingIDReducer.postingTo,
		postWordingType: state.InfluencersBookingIDReducer.postWordingType,
		campaignInstruction: state.InfluencersBookingIDReducer.campaignInstruction,
		linkToShare: state.InfluencersBookingIDReducer.linkToShare,
		campaignPreview: state.InfluencersBookingIDReducer.campaignPreview,
		lightBoxImages: state.InfluencersBookingIDReducer.lightBoxImages,
		completeInDays: state.InfluencersBookingIDReducer.completeInDays,
		contentPostType: state.InfluencersBookingIDReducer.contentPostType,
		platformName: state.InfluencersBookingIDReducer.platformName,
		campaign_payment: state.InfluencersBookingIDReducer.campaignPayment,
		// products: state.InfluencersBookingIDReducer.products,
	};
};

export default connect(mapStateToProps, null)(InfluencerBookingNoTab);
