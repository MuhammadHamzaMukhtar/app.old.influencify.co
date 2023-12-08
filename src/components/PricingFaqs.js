import { Disclosure, Transition } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";

export default function PricingFaqs() {
	return (
		<>
			<h2 className="text-[24px] black font-italic font-bold">FAQs</h2>
			<div className="shadow-[0px_4px_5px_#96969640] border-b border-[#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white p-4 rounded-t-[8px] mt-3">
				<Disclosure>
					{({ open }) => (
						<>
							<Disclosure.Button className="w-full">
								<div className="flex items-center justify-between w-full">
									<h4 className=" text-[16px] font-medium black my-2">
										1. What is public campaign?
									</h4>
									<FiChevronDown
										size={20}
										className={`${
											open ? "rotate-180 " : ""
										} transition transform`}
									/>
								</div>
							</Disclosure.Button>
							<Disclosure.Panel>
								<p>
									Public campaign is when a brand creates a campaign brief,
									defining influencers requirements they are looking for and
									publish it. Active public campaign are available for
									influencers that match brand's defined requirements, and they
									can request to participate in that campaign. Brand can review
									requests and accept or reject every request separately.
								</p>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
			</div>
			<div className="shadow-[0px_4px_5px_#96969640] border-b border-[#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white p-4">
				<Disclosure>
					{({ open }) => (
						<>
							<Disclosure.Button className="w-full">
								<div className="flex items-center justify-between w-full">
									<h4 className=" text-[16px] font-medium black my-2">
										2. What is direct invite campaign?
									</h4>
									<FiChevronDown
										size={20}
										className={`${
											open ? "rotate-180 " : ""
										} transition transform`}
									/>
								</div>
							</Disclosure.Button>
							<Disclosure.Panel>
								<p>
									Private campaigns are when a brand searches for influencers
									and directly invite them to their campaign without having the
									campaign publicly available nor accepting request from non
									invited influencers
								</p>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
			</div>
		
			<div className="shadow-[0px_4px_5px_#96969640] border-b border-[#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white p-4">
				<Disclosure>
					{({ open }) => (
						<>
							<Disclosure.Button className="w-full">
								<div className="flex items-center justify-between w-full">
									<h4 className=" text-[16px] font-medium black my-2">
										4. What is content creation campaign?
									</h4>
									<FiChevronDown
										size={20}
										className={`${
											open ? "rotate-180 " : ""
										} transition transform`}
									/>
								</div>
							</Disclosure.Button>
							<Disclosure.Panel>
								<p>
									Content creation campaign is when a brand needs only user
									generated content for their social media accounts, website or
									ads. The difference between content campaign and influencers
									campaign is that content campaign doesn't require influencers
									to publish posts on their profiles. Instead brand pays only to
									get fresh content
								</p>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
			</div>
			<div className="shadow-[0px_4px_5px_#96969640] border-b border-[#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white p-4">
				<Disclosure>
					{({ open }) => (
						<>
							<Disclosure.Button className="w-full">
								<div className="flex items-center justify-between w-full">
									<h4 className=" text-[16px] font-medium black my-2">
										5. What is verified influencer?
									</h4>
									<FiChevronDown
										size={20}
										className={`${
											open ? "rotate-180 " : ""
										} transition transform`}
									/>
								</div>
							</Disclosure.Button>
							<Disclosure.Panel>
								<p>
									Verified influencers are influencers who authenticated their
									social profile with influencify. All their profile data are
									100% verified to be accurate as they are pulled directly from
									Tiktok database
								</p>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
			</div>
			<div className="shadow-[0px_4px_5px_#96969640] border-b border-[#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white p-4">
				<Disclosure>
					{({ open }) => (
						<>
							<Disclosure.Button className="w-full">
								<div className="flex items-center justify-between w-full">
									<h4 className=" text-[16px] font-medium black my-2">
										6. What is un verified influencer?
									</h4>
									<FiChevronDown
										size={20}
										className={`${
											open ? "rotate-180 " : ""
										} transition transform`}
									/>
								</div>
							</Disclosure.Button>
							<Disclosure.Panel>
								<p>
									Unverified influencer is when we use our latest tech in
									machine learning, computer vision and natural language
									processing to analyze influencers data without them connecting
									or authenticating their social profile to influencify
								</p>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
			</div>
			<div className="shadow-[0px_4px_5px_#96969640] border-b border-[#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white p-4">
				<Disclosure>
					{({ open }) => (
						<>
							<Disclosure.Button className="w-full">
								<div className="flex items-center justify-between w-full">
									<h4 className=" text-[16px] font-medium black my-2">
										7. What is pay per product?
									</h4>
									<FiChevronDown
										size={20}
										className={`${
											open ? "rotate-180 " : ""
										} transition transform`}
									/>
								</div>
							</Disclosure.Button>
							<Disclosure.Panel>
								<p>
									It's a premium functionality that allows brand to create
									voucher or a product on influencify and use the product or
									voucher as a payment for the campaign with or without cash
									payment.
								</p>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
			</div>
			<div className="shadow-[0px_4px_5px_#96969640] border-b border-[#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white p-4">
				<Disclosure>
					{({ open }) => (
						<>
							<Disclosure.Button className="w-full">
								<div className="flex items-center justify-between w-full">
									<h4 className=" text-[16px] font-medium black my-2">
										8. What are credits
									</h4>
									<FiChevronDown
										size={20}
										className={`${
											open ? "rotate-180 " : ""
										} transition transform`}
									/>
								</div>
							</Disclosure.Button>
							<Disclosure.Panel>
								<p>
									Each search, influencer profile open or invite to a campaign,
									costs 1 credit
								</p>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
			</div>
			<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white p-4 rounded-b-[8px] ">
				<Disclosure>
					{({ open }) => (
						<>
							<Disclosure.Button className="w-full">
								<div className="flex items-center justify-between w-full">
									<h4 className=" text-[16px] font-medium black my-2">
										9. What's Gmail integration?
									</h4>
									<FiChevronDown
										size={20}
										className={`${
											open ? "rotate-180 " : ""
										} transition transform`}
									/>
								</div>
							</Disclosure.Button>
							<Disclosure.Panel>
								<p>
									It's a premium option allowing brands to integrate their email
									address to send invitations to influencers instead of using
									influencify.co default email address. It allows for higher
									personalization and increases influencers conversion rate
								</p>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
			</div>
		</>
	);
}
