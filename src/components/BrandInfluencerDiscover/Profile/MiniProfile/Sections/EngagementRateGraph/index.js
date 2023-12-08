import React from "react";
import pin_cap_picture from "@assets/pin_cap_picture.png";
import "./style.css";
import ProxyImage from "@components/ProxyImage";

const formatedNumber = (num) => {
	if (num >= 1000000000) {
		return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
	}
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
	}
	return num;
};

class EngagementRateGraph extends React.Component {
	render() {
		let progress = 0;
		const { engagement_rate_histogram, profile_picture_url, engagement_rate } =
			this.props;
		return (
			<div>
				<ul
					className="rate-histogram__list relative mt-[16px] mb-0 min-h-[68px] flex items-center justify-between cursor-pointer pl-0 select-none"
					style={{ height: "70px" }}
				>
					{engagement_rate_histogram &&
						engagement_rate_histogram.length > 0 &&
						engagement_rate_histogram.map((item, index) => {
							if (engagement_rate >= item.min && engagement_rate < item.max) {
								progress = 5 * (index === 0 ? index + 1 : index);
							}
							return (
								<li
									className="inline-block relative h-full w-[5%] bg-transparent align-bottom group"
									key={index}
								>
									<div
										className="absolute bottom-0 left-1/2 transform -translate-x-[50%] w-[7px] bg-[#f7f7f7] group-hover:bg-[#ddd]"
										style={{ height: 100 - 5 * index + "%" }}
									></div>
									<div className="rate-histogram__hidden-line absolute left-0 bottom-0 h-full w-full bg-transparent opacity-[0.01] z-[5]"></div>
									<div className="bg-[#fff] absolute z-[2] rounded-[24px] bottom-[calc(100%+0px)] left-1/2 transform -translate-x-[50%] after:content-[''] after:absolute after:w-0 after:h-0 after:z-[2] after:bottom-[-4px] after:border-t-[#fff] after:border-t-[4px] after:border-x-[4px] after:left-1/2 after:-translate-x-[50%] hidden p-[8px] w-[auto] min-w-[120px] text-center  rate-histogram__tooltip ">
										{(item.min || item.max) && (
											<div className="dark font-bold ">
												<span className="font-normal text-[11px] darkGray">
													{!item.min && item.max && (
														<>
															{"< "}
															{item.max}%
														</>
													)}
													{item.min && !item.max && (
														<>
															{"> "}
															{item.min}%
														</>
													)}
													{item.min && item.max && (
														<>
															{item.min}% - {item.max}%
														</>
													)}
												</span>
											</div>
										)}
										<div className="font-normal text-[13px]">
											{formatedNumber(item?.total)} accounts
										</div>
									</div>
									{item.median && (
										<>
											<div className="absolute bottom-[-10px] w-[55px] h-[62px] z-[2] left-1/2 transform -translate-x-[50%]">
												<img
													alt="similar account"
													className="rate-histogram__current-user-pin w-full h-full"
													src={pin_cap_picture}
												/>
											</div>
											<div className="text absolute left-1/2 transform -translate-x-[50%] text-[12px] leading-[16px] bottom-[-32px] w-[95px] text-center z-[2] before:absolute before:left-1/2 before:-translate-x-[50%] before:content-[''] before:w-[1px] before:h-[6px] before:bg-[#ddd] before:top-[-6px] ">
												{" "}
												Median
											</div>
										</>
									)}
									{engagement_rate >= item.min &&
										engagement_rate < item.max && (
											<div className="absolute bottom-[-10px] left-1/2  transform -translate-x-[50%] w-[55px] h-[62px] z-[3] ">
												<img
													alt="similar account"
													className="rate-histogram__current-user-pin w-full h-full"
													src={pin_cap_picture}
												/>

												<ProxyImage
													alt="current account"
													className="absolute h-[31px] w-[31px] rounded-full top-[7px] left-[12px]"
													url={profile_picture_url}
													addCancelToken={() => { }}
												/>
											</div>
										)}
								</li>
							);
						})}
				</ul>
				<div className="relative mb-[36px] w-full h-[5px] rounded-[3px] bg-[#ddd]">
					<div
						className="absolute top-0 left-0 bg-[#7c3292] rounded-[3px] h-[5px]"
						style={{ width: progress + 3 + "%" }}
					></div>
				</div>
			</div>
		);
	}
}

export default EngagementRateGraph;
