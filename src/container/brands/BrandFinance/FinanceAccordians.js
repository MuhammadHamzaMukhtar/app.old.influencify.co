import { useState, useRef } from "react";
import avatar from "@assets/avatar.png";
import { BsChevronDown } from "react-icons/bs";
import LinkTo from "@components/global/LinkTo";
import moment from "moment";
const FinanceAccordians = (props) => {
	const contentEl = useRef();
	const contentFl = useRef();
	const [active, setActive] = useState(null);

	const handleToggle = (index) => {
		if (active === index) {
			setActive(null);
		} else {
			setActive(index);
		}
	};

	return (
		<>

			{props.brandTransactions?.data?.map((tran, index) => (
				<div
					key={index}
					className="border-[1px] border-[#00000020] flex flex-col relative first:rounded-t-[8px] last:rounded-b-[8px]"
				>
					<div className="bg-[#00000008]" onClick={() => handleToggle(index)}>
						<div className="cursor-pointer md:grid grid-cols-12 gap-5 items-center py-[1rem] md:divide-y-0 divide-y divide-[#0000001f]">
							<div className="flex md:justify-start justify-center md:col-span-4 col-span-12 md:pb-0 pb-3 px-[1rem]">
								<div className="flex items-center">
									<div className="mr-2 min-w-[56px] shrink-0">
										<img
											src={
												tran.transactions?.[0]?.influencer && tran.transactions?.[0]?.influencer?.full_name
													? tran.transactions?.[0]?.influencer.profile_picture
													: avatar
											}
											alt={tran.title}
											className="w-[52px] h-[52px] rounded-full"
										/>
									</div>
									<div className="text-left grow">
										{tran.id && tran.title ? (
											<LinkTo
												to={"/brand/brand-booking/" + tran.id}
												state={{
													id: tran.id,
												}}
												text={tran.title}
												className="text-[16px] font-medium break-all"
											/>
										) : (
											<h6 className="text-[16px] font-medium">
												Influencify.co
											</h6>
										)}
										{/* <span className="block text-[#9ea1b2] font-normal text-[14px]">
											Fulfilled
										</span> */}
									</div>
								</div>
							</div>
							<div className="md:!text-left text-center md:col-span-2 col-span-12 md:py-0 py-3 px-[1rem]">
								<p>{moment(tran.published_date).format("YYYY-MM-DD")}</p>
							</div>
							<div className="md:!text-left text-center md:col-span-2 col-span-12 md:py-0 py-3 px-[1rem]">
								<p>Influencer Fee</p>
							</div>
							<div className="text-center md:col-span-2 col-span-12 md:py-0 py-3 px-[1rem]">
								<p>
									{tran.total_tran_amount} {props.currentLoggedUser.currency_code}
								</p>
							</div>
							{/* {tran.tranType === "Influencer Fee" ? (
								<div className="text-center md:col-span-2 col-span-12 md:pt-0 pt-3 px-[1rem]">
									<div className="flex justify-center relative">
										<p className="pink sm:!mx-0 mx-auto">
											{tran.availableAmount}{" "}
											{props.currentLoggedUser.currency_code}
										</p>
										<BsChevronDown
											className="absolute -right-[10px] md:right-0 mt-2 sm:!mt-0"
											size={20}
										/>
									</div>
								</div>
							) : (
								<div className=" text-center md:col-span-2 col-span-12 md:pt-0 pt-3 px-[1rem]"> */}
							<div className="flex justify-center relative">
								{/* <p className="sm:!mx-0 mx-auto">---</p> */}
								<BsChevronDown
									className="absolute -right-[10px] md:right-0 mt-2 sm:!mt-0"
									size={20}
								/>
							</div>
							{/* </div>
							)} */}
						</div>
					</div>
					{active === index &&
						<div className="relative top-0 overflow-hidden">
							{/* {tran.tranType === "Influencer Fee" ? ( */}
							<div
								className="transition-[height] overflow-auto ease-in-out duration-[0.35s]"
							// ref={contentEl}
							// style={
							// 	active === index
							// 		? { height: contentEl.current?.scrollHeight }
							// 		: { height: "0px" }
							// }
							>
								<div className="min-w-[550px] overflow-x-auto">
									<div className="grid grid-cols-12 gap-5 mb-6 pt-[20px] px-[20px]">
										<div className="col-span-4">
											<p className="font-medium text-[14px]">Influencers</p>
										</div>
										<div className="col-span-3">
											<p className="font-medium text-[14px]">Closing date</p>
										</div>
										<div className="col-span-3">
											<p className="font-medium text-[14px]"> Amount</p>
										</div>
										<div className="col-span-2">
											<p className="font-medium text-[14px]"> Status</p>
										</div>
									</div>
									<div className="pb-[20px] px-[20px]">
										{tran.transactions && tran.transactions.length ? (
											tran.transactions.map((transaction, index) => (
												<div
													key={index}
													className="grid grid-cols-12 gap-5 mb-4 items-center"
												>
													{transaction.influencer ?
														<>
															<div className="flex items-center col-span-4">
																<div className="shrink-0">
																	<img
																		src={
																			transaction.influencer &&
																				transaction.influencer.full_name &&
																				transaction.influencer.profile_picture !== ""
																				? transaction.influencer.profile_picture
																				: avatar
																		}
																		alt={transaction.influencer.full_name}
																		className="rounded-full w-[45px] h-[45px]"
																	/>
																</div>
																<div className="grow ml-[1rem]">
																	<LinkTo
																		to={"/brand/brand-booking/" + transaction.id}
																		text={transaction.influencer.full_name}
																		className="text-[16px] font-medium break-all"
																	/>
																</div>
															</div>
															<div className="col-span-3">
																<p>{moment(transaction.tran_date).format("YYYY-MM-DD")} </p>
															</div>
															<div className="col-span-3">
																<p>
																	{transaction.tran_amount}{" "}
																	{props.currentLoggedUser.currency_code}
																</p>
															</div>
															<div className="col-span-2">
																{transaction.tran_status === 2 ? (
																	<p className="blue">Pending</p>
																) : (
																	""
																)}
																{transaction.tran_status === 1 ? (
																	<p className="success">Fulfilled</p>
																) : (
																	""
																)}
															</div>
														</> :
														<div className="col-span-12 text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
															We have nothing to show you here.
														</div>
													}
												</div>
											))
										) : (
											<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
												We have nothing to show you here.
											</div>
										)}
									</div>
								</div>
							</div>
							{/* ) : (
							<div
								className={` transition-[height] ease-in-out duration-[0.35s]`}
								ref={contentFl}
								style={
									active === index
										? { height: contentFl.current.scrollHeight }
										: { height: "0px" }
								}
							>
								<div className="p-[1.25rem]"></div>
							</div>
						)} */}
						</div>
					}
				</div>
			))}
		</>
	);
};

export default FinanceAccordians;
