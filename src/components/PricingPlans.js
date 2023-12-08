import { Component, useState } from "react";
import Button from "@components/global/Button";
import { connect } from "react-redux";
import * as settingSubscriptionActions from "@store/actions/SettingSubscriptionActions";
import { FiCheck, FiX } from "react-icons/fi";
import Tooltip from "@components/global/Tooltip";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineCheck } from "react-icons/ai";
import Capterra from '@assets/capterra.png'
import TrustPilot from '@assets/trustpilot.png'
import Rating from '@assets/rating.png'
import Upper from '@assets/pricing/upper.png'
import Bottom from '@assets/pricing/bottom.png'
import Side from '@assets/pricing/side.png'
import End from '@assets/pricing/pricingend.png'

const PricingPlans = (props) => {
    const navigate = useNavigate();

    const [billingType, setBillingType] = useState("month");
    const handleBillingType = (newAlignment) => {
        setBillingType(newAlignment);
    };

    return (
        <div className="containers font-firaSans relative">
            <div className="w-full max-w-5xl mx-auto">
                <div className="mb-12 pb-md-5 md:flex items-center gap-5 justify-center flex-col">
                    <div className="mb-12 md:!mb-0 text-center">
                        <h1 className="lg:text-[60px] text-[30px] font-bold">
                            Plans & Pricing
                        </h1>
                        {/* <p>All plans have 30% early bird discount applied</p> */}
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center bg-white w-max shadow-xl rounded-full">
                            <button
                                onClick={() => handleBillingType("month")}
                                className={`font-semibold text-[14px] rounded-full px-6 py-2 focus-visible:outline-0 outline-0 p-2  white ${
                                    billingType === "month"
                                        ? "bg-[#c771ff] text-white"
                                        : "bg-white text-black"
                                }`}
                            >
                                Monthly Billing <br /> <span className="font-light text-sm">No contracts, cancel anytime</span>
                            </button>
                            <button
                                onClick={() => handleBillingType("year")}
                                className={`font-semibold hidden text-[14px] w-48 rounded-full px-6 py-2 focus-visible:outline-0 outline-0 p-2 white ${
                                    billingType === "year"
                                        ? "bg-[#c771ff] text-white"
                                        : "bg-white text-black"
                                }`}
                            >
                                Annual Billing <br /> <span className="font-light text-sm">Save 20%</span>
                            </button>
                        </div>
                    </div>
                </div>
				{
					billingType === "month" &&
                    <div className="relative">
                        <div className="grid grid-cols-9 gap-4 mb-12">
                            {props.monthlyPlans &&
                                props.monthlyPlans.length &&
                                props.monthlyPlans.map((plan, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={`border-[1px] lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-9 border-[#dddddd] px-5 pt-5 pb-10 ${
                                                index === 0
                                                    ? "bg-[#FFE1A1]"
                                                    : index === 1
                                                    ? "bg-[#c1e5ff]"
                                                    : "bg-[#f0c0f5]"
                                            } rounded-2xl`}
                                        >
                                            <div className="text-center space-y-6">
                                                <h6 className="text-[35px] font-bold">
                                                    {plan.name}
                                                </h6>
                                                <p className="font-medium text-sm">
                                                    {
                                                        index === 0 ? 'Ideal for small companies starting out with Influencer Marketing' : index === 1 ? 'Ideal for companies running regular Influencer Campaigns' : 'Ideal for marketing agencies and large & Teams with large number of influencers'
                                                    }
                                                    
                                                </p>
                                                <div>
                                                    <p className="font-extrabold text-3xl">
                                                        ${plan.price}
                                                    </p>
                                                    <p className="font-normal">
                                                        /mo billed monthly
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex justify-center items-center mt-5">
                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/brand/register/${plan.id}/trial`
                                                        )
                                                    }
                                                    className={`relative w-full shadow-lg max-w-[280px] ${index === 0 ? 'bg-[#DDB000]' : index === 1 ? 'bg-[#2b54f6]' : 'bg-[#a42bf6]'} rounded-[29px] group text-black text-base fill-black px-3 py-2 font-medium`}
                                                >
                                                    <span className="flex justify-center">
                                                        <span className="bg-white rounded-full p-2 absolute top-1/2 left-[7px] -translate-y-[50%] transition-all duration-300 ease-linear mr-1 group-hover:left-full group-hover:-translate-x-[130%] group-hover:-translate-y-[50%]">
                                                            <AiOutlineArrowRight className="font-bold" />
                                                        </span>
                                                        <span className="transition-transform duration-200 ease-linear translate-x-0 inline-block group-hover:-translate-x-[30px]">
                                                            Start your 14-Days free trial
                                                        </span>
                                                    </span>
                                                </button>
                                                
                                            </div>
                                            <div className="mt-4">
                                                <p className="text-[#585c7b] text-lg font-medium">
                                                    Everything in Starter, plus:
                                                </p>
                                                {index === 0 ? (
                                                    <ul className="mt-5 space-y-4">
                                                        <li className="flex items-center gap-3">
                                                            <AiOutlineCheck
                                                                size={17}
                                                            />
                                                            {plan.planFeature &&
                                                            plan.planFeature
                                                                .credits ? (
                                                                <p className="text-[14px] font-medium">
                                                                    {
                                                                        plan
                                                                            .planFeature
                                                                            .credits
                                                                    }{" "}
                                                                    Credits
                                                                </p>
                                                            ) : (
                                                                ""
                                                            )}
                                                        </li>
                                                        <li className="flex items-center gap-3">
                                                            <AiOutlineCheck
                                                                size={17}
                                                            />
                                                            <p className="text-[14px] font-medium">
                                                                Tiktok &
                                                                Youtube
                                                            </p>
                                                        </li>
                                                        <li className="flex items-center gap-3">
                                                            <AiOutlineCheck
                                                                size={17}
                                                            />
                                                            <p className="text-[14px] font-medium">
                                                                0 Campaigns
                                                            </p>
                                                        </li>
                                                        <li className="flex items-center gap-3">
                                                            <AiOutlineCheck
                                                                size={17}
                                                            />
                                                            {plan.planFeature &&
                                                            plan.planFeature
                                                                .sub_account > 0 ? (
                                                                <p className="text-[14px] font-medium">
                                                                    {
                                                                        plan
                                                                            .planFeature
                                                                            .sub_account
                                                                    }{" "}
                                                                    Sub Accounts
                                                                </p>
                                                            ) : (
                                                                <p className="text-[14px] font-medium">
                                                                    0 Sub Accounts
                                                                </p>
                                                            )}
                                                        </li>
                                                        <li className="flex items-center gap-3">
                                                            <AiOutlineCheck
                                                                size={17}
                                                            />
                                                            {plan.planFeature &&
                                                            plan.planFeature
                                                                .team_member > 0 ? (
                                                                <p className="text-[14px] font-medium">
                                                                    {
                                                                        plan
                                                                            .planFeature
                                                                            .team_member
                                                                    }{" "}
                                                                    Team members
                                                                </p>
                                                            ) : (
                                                                <p className="text-[14px] font-medium">
                                                                    0 Team members
                                                                </p>
                                                            )}
                                                        </li>
                                                    </ul>
                                                ) : index === 1 ? (
                                                    <ul className="mt-5 space-y-4">
                                                        <li className="flex items-center gap-3">
                                                            <AiOutlineCheck
                                                                size={17}
                                                            />
                                                            {plan.planFeature &&
                                                            plan.planFeature
                                                                .credits ? (
                                                                <p className="text-[14px] font-medium">
                                                                    {
                                                                        plan
                                                                            .planFeature
                                                                            .credits
                                                                    }{" "}
                                                                    Credits
                                                                </p>
                                                            ) : (
                                                                ""
                                                            )}
                                                        </li>
                                                        <li className="flex items-center gap-3">
                                                            <AiOutlineCheck
                                                                size={17}
                                                            />
                                                            <p className="text-[14px] font-medium">
                                                                Audience Overlap
                                                            </p>
                                                        </li>
                                                        <li className="flex items-center gap-3">
                                                            <AiOutlineCheck
                                                                size={17}
                                                            />
                                                            <p className="text-[14px] font-medium">
                                                                Priority Support
                                                            </p>
                                                        </li>
                                                        <li className="flex items-center gap-3">
                                                            <AiOutlineCheck
                                                                size={17}
                                                            />
                                                            {plan.planFeature &&
                                                            plan.planFeature
                                                                .sub_account > 0 ? (
                                                                <p className="text-[14px] font-medium">
                                                                    {
                                                                        plan
                                                                            .planFeature
                                                                            .sub_account
                                                                    }{" "}
                                                                    Sub Accounts
                                                                </p>
                                                            ) : (
                                                                <p className="text-[14px] font-medium">
                                                                    0 Sub Accounts
                                                                </p>
                                                            )}
                                                        </li>
                                                        <li className="flex items-center gap-3">
                                                            <AiOutlineCheck
                                                                size={17}
                                                            />
                                                            {plan.planFeature &&
                                                            plan.planFeature
                                                                .team_member > 0 ? (
                                                                <p className="text-[14px] font-medium">
                                                                    {
                                                                        plan
                                                                            .planFeature
                                                                            .team_member
                                                                    }{" "}
                                                                    Team members
                                                                </p>
                                                            ) : (
                                                                <p className="text-[14px] font-medium">
                                                                    0 Team members
                                                                </p>
                                                            )}
                                                        </li>
                                                    </ul>
                                                ) : (
                                                    <ul className="mt-5 space-y-4">
                                                        <li className="flex items-center gap-3">
                                                            <AiOutlineCheck
                                                                size={17}
                                                            />
                                                            {plan.planFeature &&
                                                            plan.planFeature
                                                                .credits ? (
                                                                <p className="text-[14px] font-medium">
                                                                    {
                                                                        plan
                                                                            .planFeature
                                                                            .credits
                                                                    }{" "}
                                                                    Credits
                                                                </p>
                                                            ) : (
                                                                ""
                                                            )}
                                                        </li>
                                                        <li className="flex items-center gap-3">
                                                            <AiOutlineCheck
                                                                size={17}
                                                            />
                                                            <p className="text-[14px] font-medium">
                                                                Dedicated Customer
                                                                Success
                                                            </p>
                                                        </li>
                                                        <li className="flex items-start gap-3">
                                                            <AiOutlineCheck
                                                                size={17}
                                                            />
                                                            <p className="text-[14px] font-medium">
                                                                Trusted by 1,000+
                                                                Innovative companies
                                                                World wide
                                                            </p>
                                                        </li>
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                        <div className="absolute xl:block lg:block hidden -top-14 -left-12">
                            <img src={Upper} alt="Upper" width={100} />
                        </div>
                        <div className="absolute xl:block lg:block hidden -bottom-10 -right-10">
                            <img src={Bottom} alt="Bottom" width={130} />
                        </div>
                    </div>
				}

				<div className="bg-white px-5 py-4 shadow-2xl rounded-2xl mb-16">
					<div className="lg:w-96 w-60 text-center bg-[#C1FFE6]">
						<p className="font-semibold text-lg">Influencify Price Match</p>
					</div>
					<div className="text-center mt-3">
						<p className="font-medium text-lg">Share with us a lower quote from anyone else and we will beat it with 15% Discount</p>
					</div>
				</div>

				<div className="flex gap-4 mb-12 justify-center items-center flex-col">
					<p className="border border-[#000000] rounded-full px-4 py-2 font-bold lg:text-2xl text-lg inline-block">
						+ See all features and compare plans
					</p>
					<p className="font-bold lg:text-2xl text-lg">Trusted by 1000+ fastest growing brands worldwide</p>
					<div className="flex gap-3">
						<img src={Capterra} width={120} alt="Capterra" />
						<img src={TrustPilot} width={180} alt="TrustPilot" />
					</div>
				</div>
            </div>
            <div className="xl:block lg:block hidden absolute top-[35%] -left-72">
                <img src={Side} alt="Side" width={300} />
            </div>
            <div className="grid grid-cols-12 gap-3 relative">
                <div className="absolute top-0 -right-[75px] z-10 xl:block lg:block hidden">
                    <img src={End} alt="End" width={100} />
                </div>
                <div className="xl:col-span-4 px-0 relative mb-[50px] hidden xl:block">
                    <div className="flex flex-col items-start justify-end p-4 item min-h-[200px]">
                        <img src={Rating} alt="Rating" width={300} />
                    </div>
                    <div className="p-[1rem] flex flex-col border-r-0">
                        <ul className="list-unstyled text-left space-y-4">
                            <li className="font-semibold text-[14px] leading-[14px] h-[50px] flex flex-col justify-center py-[8px]">
                                Credits
                                <span className="font-normal text-black text-sm">Each search, influencer profile open or invite to a campaign, costs 1 credit</span>
                            </li>
                            <li className="font-semibold text-[14px] leading-[14px] h-[50px] flex flex-col justify-center py-[8px]">
                                Social networks
                                <span className="font-normal text-black text-sm">Social networks in which you can find, analyze and recruit influencers</span>
                            </li>
                            <li className="font-semibold text-[14px] leading-[14px] h-[50px] flex flex-col justify-center py-[8px]">
                                Filter through 170M+ influencers
                                <span className="font-normal text-black text-sm">The amount of influencers available inside influencify's database</span>
                            </li>
                            <li className="font-semibold text-[14px] leading-[14px] h-[50px] flex flex-col justify-center py-[8px]">
                                Analyze influencers
                                <span className="font-normal text-black text-sm">Analyze any influencer for audience demographics, fake followers</span>
                            </li>
                            <li className="font-semibold text-[14px] leading-[14px] h-[50px] flex flex-col justify-center py-[8px]">
                                Export results
                                <span className="font-normal text-black text-sm">Export your influencers search results in a neat CSV, with all metrics available</span>
                            </li>
                            <li className="font-semibold text-[14px] leading-[14px] h-[50px] flex flex-col justify-center py-[8px]">
                                Audience overlap
                                <span className="font-normal text-black text-sm">Ensure you are reaching the largest unique audience possible or find audience with a crossover to reinforce your message</span>
                            </li>
                            <li className="font-semibold text-[14px] leading-[14px] h-[50px] flex flex-col justify-center py-[8px]">
                                Unlimited campaings
                                <span className="font-normal text-black text-sm">Campaigns are the process of outreac hing to influencers, manage payment, product,gifting, ROI trac king</span>
                            </li>
                            <li className="font-semibold text-[14px] leading-[14px] h-[50px] flex flex-col justify-center py-[8px]">
                                Lists
                                <span className="font-normal text-black text-sm">CA space for you to organize your influencers in one place, use Kanban or lists, add statuses and more</span>
                            </li>
                            <li className="font-semibold text-[14px] leading-[14px] h-[50px] flex flex-col justify-center py-[8px]">
                                IRM
                                <span className="font-normal text-black text-sm">Influencer relationship manager consists of different modules like campaign managment,email outreach , payment escrow, social listening & reporting</span>
                            </li>
                            <li className="font-semibold text-[16px] leading-[14px] h-[50px] flex flex-col justify-center py-[8px]">
                                INTEGRATIONS
                            </li>
                            <li className="font-semibold text-[14px] leading-[14px] h-[50px] flex flex-col justify-center py-[8px]">
                                Gmail
                                <span className="font-normal text-black text-sm">Directly outreach to influencers on influencify using your own email address</span>
                            </li>
                            <li className="font-semibold text-[14px] leading-[14px] h-[50px] flex flex-col justify-center py-[8px]">
                                SMTP
                                <span className="font-normal text-black text-sm">Integrate lnfluencify with any email platform using SMTP for influencers email outreach</span>
                            </li>

                            <li className="font-semibold text-[14px] leading-[14px] h-[50px] flex flex-col justify-center py-[8px]">
                                Shopify
                                <span className="font-normal text-black text-sm">Import your products to influencify and use them to pay influencers, Track sales and revenue</span>
                            </li>
                            <li className="font-semibold text-[14px] leading-[14px] h-[50px] flex flex-col justify-center py-[8px]">
                                Google Analytics
                                <span className="font-normal text-black text-sm">Get your website traffic, sales and other metrics integrated into your influencify account</span>
                            </li>
                            <li className="font-semibold text-[16px] leading-[14px] h-[50px] flex flex-col justify-center py-[8px]">
                                COLLABORATION
                            </li>
                            <li className="font-semibold text-[14px] leading-[14px] h-[50px] flex flex-col justify-center py-[8px]">
                                Team members access
                                <span className="font-normal text-black text-sm">Invite team members and clients to your account, control thier access and what they can see or do</span>
                            </li>
                            <li className="font-semibold text-[14px] leading-[14px] h-[50px] flex flex-col justify-center py-[8px]">
                                Sub-Accounts
                                <span className="font-normal text-black text-sm">Create different brands under your ma in account, each subaccount has it's own team</span>
                            </li>
                        </ul>
                    </div>
                </div>
                    {billingType === "month" &&
                        <div className="xl:col-span-8 col-span-12 gap-3 grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1">
                            {
                            props.monthlyPlans &&
                            props.monthlyPlans.length
                                ? props.monthlyPlans.map((plan, index) => (
                                        <div
                                            className={
                                                "relative rounded-2xl mb-[50px] border-[1px] border-[#dddddd]" +
                                                (plan.isRecommended
                                                    ? " bg-[#f9f9f9]"
                                                    : "")
                                            }
                                            key={index}
                                        >
                                            {plan.isRecommended ? (
                                                <div className="hidden absolute w-full top-[-40px] ">
                                                    <p className="text-white">
                                                        Most Popular
                                                    </p>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                            <div className={`text-center py-4 xl:!px-4 px-2 flex flex-col items-center justify-center min-h-[200px] ${index === 0
                                                        ? "bg-[#FFE1A1]"
                                                        : index === 1
                                                        ? "bg-[#c1e5ff]"
                                                        : "bg-[#f0c0f5]"
                                                } rounded-2xl rounded-b-none`}>
                                                <h5 className="card-title text-2xl font-bold">
                                                    {plan.name}
                                                </h5>
                                                <h6 className=" text-[16px] invisible">
                                                    ${plan.price}/M
                                                </h6>
                                                <i className="invisible">Free Trial (14 Days)</i>
                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/brand/register/${plan.id}/trial`
                                                        )
                                                    }
                                                    className={`relative w-full shadow-lg max-w-[280px] ${index === 0 ? 'bg-[#DDB000]' : index === 1 ? 'bg-[#2b54f6]' : 'bg-[#a42bf6]'} rounded-[29px] group text-black text-base fill-black px-3 py-2 font-medium`}
                                                    >
                                                    <span className="flex justify-center">
                                                        <span className="bg-white rounded-full p-2 absolute top-1/2 left-[7px] -translate-y-[50%] transition-all duration-300 ease-linear mr-1 group-hover:left-full group-hover:-translate-x-[130%] group-hover:-translate-y-[50%]">
                                                            <AiOutlineArrowRight className="font-bold" />
                                                        </span>
                                                        <span className="transition-transform duration-200 ease-linear translate-x-0 inline-block group-hover:-translate-x-[30px]">
                                                            Start your 14-Days free trial
                                                        </span>
                                                    </span>
                                                </button>
                                            </div>
                                            <div className={`flex flex-col p-2 lg:!p-[1rem] ${index === 0
                                                        ? "bg-[#FFE1A1]"
                                                        : index === 1
                                                        ? "bg-[#c1e5ff]"
                                                        : "bg-[#f0c0f5]"
                                            } rounded-2xl rounded-t-none`}>
                                                <ul className="list-unstyled text-center space-y-4">
                                                   
                                                    <li className="leading-[14px] h-[50px] flex items-center justify-center py-[8px]">
                                                        <FiCheck
                                                            className="text-[#000000]"
                                                            size={19}
                                                        />
                                                        <span className="invisible">Demo</span>
                                                    </li>
                                                    <li className="leading-[14px] h-[50px] flex items-center justify-center py-[8px]">
                                                        <FiCheck
                                                            className="text-[#000000]"
                                                            size={19}
                                                        />
                                                        <span className="invisible">Demo</span>
                                                    </li>
                                                    <li className="leading-[14px] h-[50px] flex items-center justify-center py-[8px]">
                                                        <FiCheck
                                                            className="text-[#000000]"
                                                            size={19}
                                                        />
                                                        <span className="invisible">Demo</span>
                                                    </li>
                                                    <li className="leading-[14px] h-[50px] flex items-center justify-center py-[8px]">
                                                        <FiCheck
                                                            className="text-[#000000]"
                                                            size={19}
                                                        />
                                                        <span className="invisible">Demo</span>
                                                    </li>
                                                    <li className="leading-[14px] h-[50px] flex items-center justify-center py-[8px]">
                                                        <FiCheck
                                                            className="text-[#000000]"
                                                            size={19}
                                                        />
                                                        <span className="invisible">Demo</span>
                                                    </li>
                                                    <li className="leading-[14px] h-[50px] flex items-center justify-center py-[8px]">
                                                        <FiCheck
                                                            className="text-[#000000]"
                                                            size={19}
                                                        />
                                                        <span className="invisible">Demo</span>
                                                    </li>
                                                    <li className="leading-[14px] h-[50px] flex items-center justify-center py-[8px]">
                                                        <FiCheck
                                                            className="text-[#000000]"
                                                            size={19}
                                                        />
                                                        <span className="invisible">Demo</span>
                                                    </li>
                                                    <li className="leading-[14px] h-[50px] flex items-center justify-center py-[8px]">
                                                        <FiCheck
                                                            className="text-[#000000]"
                                                            size={19}
                                                        />
                                                        <span className="invisible">Demo</span>
                                                    </li>
                                                    <li className="leading-[14px] h-[50px] flex items-center justify-center py-[8px]">
                                                        <FiCheck
                                                            className="text-[#000000]"
                                                            size={19}
                                                        />
                                                        <span className="invisible">Demo</span>
                                                    </li>
                                                    <li className="text-[14px] leading-[14px] h-[50px] flex flex-col justify-center py-[8px]">
                                                        <span className="invisible">
                                                            Demo
                                                        </span>
                                                    </li>
                                                    <li className="leading-[14px] h-[50px] flex items-center justify-center py-[8px]">
                                                        <FiCheck
                                                            className="text-[#000000]"
                                                            size={19}
                                                        />
                                                        <span className="invisible">Demo</span>
                                                    </li>
                                                    <li className="leading-[14px] h-[50px] flex items-center justify-center py-[8px]">
                                                        <FiCheck
                                                            className="text-[#000000]"
                                                            size={19}
                                                        />
                                                        <span className="invisible">Demo</span>
                                                    </li>
                                                   
                                                    <li className="leading-[14px] h-[50px] flex items-center justify-center py-[8px]">
                                                        <FiCheck
                                                            className="text-[#000000]"
                                                            size={19}
                                                        />
                                                        <span className="invisible">Demo</span>
                                                    </li>
                                                    <li className="leading-[14px] h-[50px] flex items-center justify-center py-[8px]">
                                                        <FiCheck
                                                            className="text-[#000000]"
                                                            size={19}
                                                        />
                                                        <span className="invisible">Demo</span>
                                                    </li>
                                                    <li className="text-[14px] leading-[14px] h-[50px] flex flex-col justify-center py-[8px]">
                                                        <span className="invisible">
                                                            Demo
                                                        </span>
                                                    </li>
                                                    <li className="leading-[14px] h-[50px] flex items-center justify-center py-[8px]">
                                                        <FiCheck
                                                            className="text-[#000000]"
                                                            size={19}
                                                        />
                                                        <span className="invisible">Demo</span>
                                                    </li>
                                                    <li className="leading-[14px] h-[50px] flex items-center justify-center py-[8px]">
                                                        <FiCheck
                                                            className="text-[#000000]"
                                                            size={19}
                                                        />
                                                        <span className="invisible">Demo</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            {plan.isRecommended ? (
                                                <div className="hidden absolute w-full bottom-[-50px]">
                                                    <p className="text-white">
                                                        Most Popular
                                                    </p>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    ))
                                : ""
                            }
                        </div>
                    }
                    {billingType === "year" &&
                        <div className="xl:col-span-8 col-span-12 gap-3 grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1">
                            {
                            props.yearlyPlans &&
                            props.yearlyPlans.length
                                ? props.yearlyPlans.map((plan, index) => (
                                        <div
                                            className={
                                                "relative mb-[50px] border-[1px] border-[#ededed]" +
                                                (plan.isRecommended
                                                    ? " bg-[#f9f9f9]"
                                                    : "") +
                                                ""
                                            }
                                            key={index}
                                        >
                                            {plan.isRecommended ? (
                                                <div className=" absolute w-full top-[-40px]">
                                                    <p className="text-white rounded-t-[8px] bg-[#000] h-[40px] flex items-center justify-center font-medium">
                                                        Most Popular
                                                    </p>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                            <div className="border-b border-[#ededed] text-center py-4 xl:!px-4 px-2 item min-h-[200px]">
                                                <h5 className="card-title text-[18px]">
                                                    {plan.name}
                                                </h5>

                                                <h6 className=" text-[16px]">
                                                    ${plan.price}/Y
                                                </h6>
                                                <i>Free Trial (14 Days)</i>
                                                {plan.name === "Free" ? (
                                                    <Button
                                                        text="Create a free account"
                                                        onClick={() =>
                                                            navigate(
                                                                `/brand/register/${plan.id}`
                                                            )
                                                        }
                                                        className="mt-6 px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 w-full justify-center"
                                                    />
                                                ) : (
                                                    <Button
                                                        text="Start Free Trial"
                                                        onClick={() =>
                                                            navigate(
                                                                `/brand/register/${plan.id}`
                                                            )
                                                        }
                                                        className="mt-6 px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 w-full justify-center"
                                                    />
                                                )}
                                            </div>
                                            <div className="card-body flex flex-col">
                                                <ul className="list-unstyled text-left lg:text-center">
                                                    <li className="flex items-center justify-between xl:justify-center text-[14px] leading-[14px] h-[40px] py-[8px] border-b border-dashed border-[#ededed]">
                                                        <span className="invisible">
                                                            Demo
                                                        </span>
                                                    </li>
                                                    <li className="flex items-center justify-between xl:justify-center text-[14px] leading-[14px] h-[40px] py-[8px] border-b border-dashed border-[#ededed]">
                                                        <p className="xl:hidden inline-block text-[12px]">
                                                            Influential Followers
                                                        </p>
                                                        {plan.planFeature &&
                                                        plan.planFeature
                                                            .influentialFollowers ? (
                                                            <FiCheck
                                                                className="text-[#2b9348]"
                                                                size={19}
                                                            />
                                                        ) : (
                                                            <FiX
                                                                className="red"
                                                                size={19}
                                                            />
                                                        )}
                                                    </li>
                                                    <li className="flex items-center justify-between xl:justify-center text-[14px] leading-[14px] h-[40px] py-[8px] border-b border-dashed border-[#ededed]">
                                                        <p className="xl:hidden inline-block text-[12px]">
                                                            Analyzer
                                                        </p>
                                                        {plan.planFeature &&
                                                        plan.planFeature.analyzer ? (
                                                            <FiCheck
                                                                className="text-[#2b9348]"
                                                                size={19}
                                                            />
                                                        ) : (
                                                            <FiX
                                                                className="red"
                                                                size={19}
                                                            />
                                                        )}
                                                    </li>
                                                    <li className="flex items-center justify-between xl:justify-center text-[14px] leading-[14px] h-[40px] py-[8px] border-b border-dashed border-[#ededed]">
                                                        <p className="xl:hidden inline-block text-[12px]">
                                                            Credits
                                                        </p>
                                                        {plan.planFeature &&
                                                        plan.planFeature.credits ? (
                                                            <p className="purple text-[14px] font-medium">
                                                                {plan.planFeature.credits}{" "}
                                                                <small>/M</small>
                                                            </p>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </li>
                                                    <li className="flex items-center justify-between xl:justify-center text-[14px] leading-[14px] h-[40px] py-[8px] border-b border-dashed border-[#ededed]">
                                                        <p className="xl:hidden inline-block text-[12px]">
                                                            Free Trial Credits
                                                        </p>
                                                        {plan.planFeature &&
                                                        plan.planFeature.trial_credits ? (
                                                            <p className="purple text-[14px] font-medium">
                                                                {
                                                                    plan.planFeature
                                                                        .trial_credits
                                                                }
                                                            </p>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </li>
                                                
                                                    <li className="flex items-center justify-between xl:justify-center text-[14px] leading-[14px] h-[40px] py-[8px] border-b border-dashed border-[#ededed]">
                                                        <p className="xl:hidden inline-block text-[12px]">
                                                            Tiktok Network
                                                        </p>
                                                        {plan.planFeature &&
                                                        plan.planFeature
                                                            .discoverTiktokInfluencers ? (
                                                            <FiCheck
                                                                className="text-[#2b9348]"
                                                                size={19}
                                                            />
                                                        ) : (
                                                            <FiX
                                                                className="red"
                                                                size={19}
                                                            />
                                                        )}
                                                    </li>
                                                    <li className="flex items-center justify-between xl:justify-center text-[14px] leading-[14px] h-[40px] py-[8px] border-b border-dashed border-[#ededed]">
                                                        <p className="xl:hidden inline-block text-[12px]">
                                                            Audience Overlap
                                                        </p>
                                                        {plan.planFeature &&
                                                        plan.planFeature
                                                            .audienceOverlay ? (
                                                            <FiCheck
                                                                className="text-[#2b9348]"
                                                                size={19}
                                                            />
                                                        ) : (
                                                            <FiX
                                                                className="red"
                                                                size={19}
                                                            />
                                                        )}
                                                    </li>
                                                    <li className="flex items-center justify-between xl:justify-center text-[14px] leading-[14px] h-[40px] py-[8px] border-b border-dashed border-[#ededed]">
                                                        <span className="invisible">
                                                            Demo
                                                        </span>
                                                    </li>
                                                    <li className="flex items-center justify-between xl:justify-center text-[14px] leading-[14px] h-[40px] py-[8px] border-b border-dashed border-[#ededed]">
                                                        <p className="xl:hidden inline-block text-[12px]">
                                                            Public campaigns
                                                        </p>
                                                        {plan.planFeature &&
                                                        plan.planFeature
                                                            .publicCampaigns === 0 ? (
                                                            <FiX
                                                                className="red"
                                                                size={19}
                                                            />
                                                        ) : (
                                                            ""
                                                        )}
                                                        {plan.planFeature &&
                                                        plan.planFeature
                                                            .publicCampaigns ===
                                                            "Unlimited" ? (
                                                            <p className="purple text-[14px] font-medium">
                                                                Unlimited
                                                            </p>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {plan.planFeature &&
                                                        plan.planFeature.publicCampaigns >
                                                            0 ? (
                                                            <p className="purple text-[14px] font-medium">
                                                                {
                                                                    plan.planFeature
                                                                        .publicCampaigns
                                                                }{" "}
                                                                <small>/M</small>
                                                            </p>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </li>
                                                    <li className="flex items-center justify-between xl:justify-center text-[14px] leading-[14px] h-[40px] py-[8px] border-b border-dashed border-[#ededed]">
                                                        <p className="xl:hidden inline-block text-[12px]">
                                                            Direct invite campaign
                                                        </p>
                                                        {plan.planFeature &&
                                                        plan.planFeature
                                                            .directCampaigns === 0 ? (
                                                            <FiX
                                                                className="red"
                                                                size={19}
                                                            />
                                                        ) : (
                                                            ""
                                                        )}
                                                        {plan.planFeature &&
                                                        plan.planFeature
                                                            .directCampaigns ===
                                                            "Unlimited" ? (
                                                            <p className="purple text-[14px] font-medium">
                                                                Unlimited
                                                            </p>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {plan.planFeature &&
                                                        plan.planFeature.directCampaigns >
                                                            0 ? (
                                                            <p className="purple text-[14px] font-medium">
                                                                {
                                                                    plan.planFeature
                                                                        .directCampaigns
                                                                }{" "}
                                                                <small>/M</small>
                                                            </p>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </li>
                                                    <li className="flex items-center justify-between xl:justify-center text-[14px] leading-[14px] h-[40px] py-[8px] border-b border-dashed border-[#ededed]">
                                                        <p className="xl:hidden inline-block text-[12px]">
                                                            Content Creation Campaign{" "}
                                                        </p>
                                                        {plan.planFeature &&
                                                        plan.planFeature
                                                            .contentCampaigns ? (
                                                            <FiCheck
                                                                className="text-[#2b9348]"
                                                                size={19}
                                                            />
                                                        ) : (
                                                            <FiX
                                                                className="red"
                                                                size={19}
                                                            />
                                                        )}
                                                    </li>
                                                    <li className="flex items-center justify-between xl:justify-center text-[14px] leading-[14px] h-[40px] py-[8px] border-b border-dashed border-[#ededed]">
                                                        <p className="xl:hidden inline-block text-[12px]">
                                                            Pay Per Products
                                                        </p>
                                                        {plan.planFeature &&
                                                        plan.planFeature
                                                            .pay_per_products === 0 ? (
                                                            <FiX
                                                                className="red"
                                                                size={19}
                                                            />
                                                        ) : (
                                                            ""
                                                        )}
                                                        {plan.planFeature &&
                                                        plan.planFeature
                                                            .pay_per_products ===
                                                            "Unlimited" ? (
                                                            <p className="purple text-[14px] font-medium">
                                                                Unlimited
                                                            </p>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {plan.planFeature &&
                                                        plan.planFeature
                                                            .pay_per_products > 0 ? (
                                                            <p className="purple text-[14px] font-medium">
                                                                {
                                                                    plan.planFeature
                                                                        .pay_per_products
                                                                }{" "}
                                                                <small>/M</small>
                                                            </p>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </li>
                                                    <li className="flex items-center justify-between xl:justify-center text-[14px] leading-[14px] h-[40px] py-[8px] border-b border-dashed border-[#ededed]">
                                                        <p className="xl:hidden inline-block text-[12px]">
                                                            Lists
                                                        </p>
                                                        {plan.planFeature &&
                                                        plan.planFeature.lists ? (
                                                            <FiCheck
                                                                className="text-[#2b9348]"
                                                                size={19}
                                                            />
                                                        ) : (
                                                            <FiX
                                                                className="red"
                                                                size={19}
                                                            />
                                                        )}
                                                    </li>
                                                    <li className="flex items-center justify-between xl:justify-center text-[14px] leading-[14px] h-[40px] py-[8px] border-b border-dashed border-[#ededed]">
                                                        <p className="xl:hidden inline-block text-[12px]">
                                                            Service fee
                                                        </p>
                                                        <p className="purple text-[14px] font-medium">
                                                            {plan.planFeature &&
                                                            plan.planFeature.serviceFee
                                                                ? plan.planFeature
                                                                    .serviceFee + "%"
                                                                : "0%"}
                                                        </p>
                                                    </li>
                                                    <li className="flex items-center justify-between xl:justify-center text-[14px] leading-[14px] h-[40px] py-[8px] border-b border-dashed border-[#ededed]">
                                                        <span className="invisible">
                                                            Demo
                                                        </span>
                                                    </li>
                                                    <li className="flex items-center justify-between xl:justify-center text-[14px] leading-[14px] h-[40px] py-[8px] border-b border-dashed border-[#ededed]">
                                                        <p className="xl:hidden inline-block text-[12px]">
                                                            Gmail
                                                        </p>
                                                        {plan.planFeature &&
                                                        plan.planFeature.gmail ? (
                                                            <FiCheck
                                                                className="text-[#2b9348]"
                                                                size={19}
                                                            />
                                                        ) : (
                                                            <FiX
                                                                className="red"
                                                                size={19}
                                                            />
                                                        )}
                                                    </li>
                                                    <li className="flex items-center justify-between xl:justify-center text-[14px] leading-[14px] h-[40px] py-[8px] border-b border-dashed border-[#ededed]">
                                                        <span className="invisible">
                                                            demo
                                                        </span>
                                                    </li>
                                                    <li className="flex items-center justify-between xl:justify-center text-[14px] leading-[14px] h-[40px] py-[8px] border-b border-dashed border-[#ededed]">
                                                        <p className="xl:hidden inline-block text-[12px]">
                                                            Sub account
                                                        </p>
                                                        {plan.planFeature &&
                                                        plan.planFeature.sub_account >
                                                            0 ? (
                                                            <p className="purple text-[14px] font-medium">
                                                                {
                                                                    plan.planFeature
                                                                        .sub_account
                                                                }
                                                            </p>
                                                        ) : (
                                                            <FiX
                                                                className="red"
                                                                size={19}
                                                            />
                                                        )}
                                                    </li>
                                                    <li className="flex items-center justify-between xl:justify-center text-[14px] leading-[14px] h-[40px] py-[8px] border-b border-dashed border-[#ededed]">
                                                        <p className="xl:hidden inline-block text-[12px]">
                                                            Team members
                                                        </p>
                                                        {plan.planFeature &&
                                                        plan.planFeature.team_member >
                                                            0 ? (
                                                            <p className="purple text-[14px] font-medium">
                                                                {
                                                                    plan.planFeature
                                                                        .team_member
                                                                }
                                                            </p>
                                                        ) : (
                                                            <FiX
                                                                className="red"
                                                                size={19}
                                                            />
                                                        )}
                                                    </li>
                                                </ul>
                                                {plan.name === "Free" ? (
                                                    <Button
                                                        onClick={() =>
                                                            navigate(
                                                                `/brand/register/${plan.id}`
                                                            )
                                                        }
                                                        className="mt-6 px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 w-full justify-center"
                                                        text="Create a free account"
                                                    />
                                                ) : (
                                                    <Button
                                                        onClick={() =>
                                                            navigate(
                                                                `/brand/register/${plan.id}`
                                                            )
                                                        }
                                                        className="mt-6 px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 w-full justify-center"
                                                        text="Start Free Trial"
                                                    />
                                                )}
                                            </div>
                                            {plan.isRecommended ? (
                                                <div className="hidden absolute w-full bottom-[-50px]">
                                                    <p className="text-white">
                                                        Most Popular
                                                    </p>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    ))
                                : ""
                            }
                                
                        </div>
                    }
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoading: state.SettingSubscriptionReducer.isLoading,
        monthlyPlans: state.SettingSubscriptionReducer.monthlyPlans,
        yearlyPlans: state.SettingSubscriptionReducer.yearlyPlans,
        currentLoggedUser: state.HeaderReducer.currentLoggedUser,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        upgradePlan: (id) =>
            dispatch(settingSubscriptionActions.upgradePlan(id)),
        getStartedPaid: (id) =>
            dispatch(settingSubscriptionActions.getStartedPaid(id, ownProps)),
        getStartedFree: (id) =>
            dispatch(settingSubscriptionActions.getStartedFree(id, ownProps)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PricingPlans);
