import { Component } from "react";
import CheckMark from "@assets/svgs/check.svg";

class AppsumoFeatures extends Component {
	render() {
		const { refreshData } = this.props;
		return (
			<>
				<b>Features Included in Plan</b>
				<ul className="pl-3">
					<li className="flex mt-4">
						<img src={CheckMark} className="w-[15px] h-[11.5px]" alt="check" />
						<div>
							<span>
								<p className="ml-4">
									<b className="mr-1">
										{refreshData &&
										refreshData.offer &&
										refreshData.offer.credits
											? refreshData.offer.credits
											: 0}
									</b>{" "}
									Credits per month
								</p>
							</span>
						</div>
					</li>
					<li className="flex mt-4">
						<img src={CheckMark} className="w-[15px] h-[11.5px]" alt="check" />
						<div>
							<span>
								<p className="ml-4">
									<b className="mr-1">
										{refreshData &&
										refreshData.offer &&
										refreshData.offer.pay_per_products
											? refreshData.offer.pay_per_products
											: 0}
									</b>{" "}
									Pay per product
								</p>
							</span>
						</div>
					</li>
					{refreshData &&
					refreshData.offer &&
					refreshData.offer.audienceOverlay ? (
						<li className="flex mt-4">
							<img
								src={CheckMark}
								className="w-[15px] h-[11.5px]"
								alt="check"
							/>
							<div>
								<span>
									<p className="ml-4">Audience overlap</p>
								</span>
							</div>
						</li>
					) : (
						""
					)}
					<li className="flex mt-4">
						<img src={CheckMark} className="w-[15px] h-[11.5px]" alt="check" />
						<div>
							<span>
								<p className="ml-4">Influential followers</p>
							</span>
						</div>
					</li>

					<li className="flex mt-4">
						<img src={CheckMark} className="w-[15px] h-[11.5px]" alt="check" />
						<div>
							<span>
								<p className="ml-4">Influencer search</p>
							</span>
						</div>
					</li>

					<li className="flex mt-4">
						<img src={CheckMark} className="w-[15px] h-[11.5px]" alt="check" />
						<div>
							<span>
								<p className="ml-4">Analyzer</p>
							</span>
						</div>
					</li>

					<li className="flex mt-4">
						<img src={CheckMark} className="w-[15px] h-[11.5px]" alt="check" />
						<div>
							<span>
								<p className="ml-4">TikTok network</p>
							</span>
						</div>
					</li>

					<li className="flex mt-4">
						<img src={CheckMark} className="w-[15px] h-[11.5px]" alt="check" />
						<div>
							<span>
								<p className="ml-4">YouTube network</p>
							</span>
						</div>
					</li>

					<li className="flex mt-4">
						<img src={CheckMark} className="w-[15px] h-[11.5px]" alt="check" />
						<div>
							<span>
								<p className="ml-4">Unlimited public campaigns</p>
							</span>
						</div>
					</li>

					<li className="flex mt-4">
						<img src={CheckMark} className="w-[15px] h-[11.5px]" alt="check" />
						<div>
							<span>
								<p className="ml-4">Unlimited direct invite campaign</p>
							</span>
						</div>
					</li>

					<li className="flex mt-4">
						<img src={CheckMark} className="w-[15px] h-[11.5px]" alt="check" />
						<div>
							<span>
								<p className="ml-4">Content creation campaign</p>
							</span>
						</div>
					</li>

					<li className="flex mt-4">
						<img src={CheckMark} className="w-[15px] h-[11.5px]" alt="check" />
						<div>
							<span>
								<p className="ml-4">Lists</p>
							</span>
						</div>
					</li>

					<li className="flex mt-4">
						<img src={CheckMark} className="w-[15px] h-[11.5px]" alt="check" />
						<div>
							<span>
								<p className="ml-4">Gmail Outreach</p>
							</span>
						</div>
					</li>

					<li className="flex mt-4">
						<img src={CheckMark} className="w-[15px] h-[11.5px]" alt="check" />
						<div>
							<span>
								<p className="ml-4">Request a quote campaign</p>
							</span>
						</div>
					</li>
				</ul>
			</>
		);
	}
}

export default AppsumoFeatures;
