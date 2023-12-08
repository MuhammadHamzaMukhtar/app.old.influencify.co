import { Component } from "react";
// import "../../assets/css/footer.css";
import { Link } from "react-router-dom";
import footerlogo from "@assets/footer_logo.png";
import { FaFacebookSquare } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import Anchor from "@components/global/Anchor";


class Footer extends Component {
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
	}

	render() {
		const { show } = this.state;
		if (!show) {
			return null;
		}
		return (
			<div className="border-t border-[#e0e1e4]">
				<div className="containers px-[1rem] w-full pt-[40px] pb-[20px]">
					<div className="grid xl:grid-cols-7 grid-cols-12 gap-4">
						<div className="xl:col-span-1 md:col-span-3 col-span-12">
							<Link to="/">
								<img width="100px" src={footerlogo} alt="footerlogo" />
							</Link>
							<div className="flex my-8">
								<a
									href="https://www.facebook.com/influencify"
									target="_blank"
									rel="noopener noreferrer"
								>
									<FaFacebookSquare className="text-[30px] black hover:success " />
								</a>
								<a
									href="https://www.instagram.com/influencify.co"
									target="_blank"
									className="ml-4"
									rel="noopener noreferrer"
								>
									<BsInstagram className="text-[30px]  black hover:success" />
								</a>
							</div>
						</div>
						<div className="mt-8 md:!mt-0 xl:col-span-1 md:col-span-3 sm:col-span-4 col-span-6">
							<h6 className="font-medium mb-6 text-[18px] black">Company</h6>
							<div className="flex flex-col">
								<Anchor
									className="text-[14px] mb-4 font-regular black hover:success"
									href={"http://influencify.co/#"}
									text="About Us"
								/>
								<Anchor
									className="text-[14px] mb-4 font-regular black hover:success"
									href={"http://influencify.co/#"}
									text="Team"
								/>
								<Anchor
									className="text-[14px] mb-4 font-regular black hover:success"
									href={"http://influencify.co/#"}
									text="Mission"
								/>
								<Link
									className="text-[14px] mb-4 font-regular black hover:success"
									to="/pricing"
								>
									Pricing
								</Link>
							</div>
						</div>
						<div className="mt-8 md:!mt-0 xl:col-span-1 md:col-span-3 sm:col-span-4 col-span-6">
							<h6 className="font-medium mb-6 text-[18px] black">Product</h6>
							<div className="flex flex-col">
								<Anchor
									className="text-[14px] mb-4 font-regular black hover:success"
									href={"http://influencify.co/find-influencers/"}
									text="Discovery"
								/>
								<Anchor
									className="text-[14px] mb-4 font-regular black hover:success"
									href={"http://influencify.co/analyze-influencers/"}
									text="Analyzer"
								/>
								<Anchor
									className="text-[14px] mb-4 font-regular black hover:success"
									href={"http://influencify.co/influencers-outreach/"}
									text="Influencers Outreach"
								/>
								<Anchor
									className="text-[14px] mb-4 font-regular black hover:success"
									href={"http://influencify.co/brand#irm"}
									text="IRM"
								/>
								<Anchor
									className="text-[14px] mb-4 font-regular black hover:success"
									href={"http://influencify.co/analyze-influencers/#overlap"}
									text="Audience overlap"
								/>
							</div>
						</div>
						<div className="mt-8 md:!mt-0 xl:col-span-1 md:col-span-3 sm:col-span-4 col-span-6">
							<h6 className="font-medium mb-6 text-[18px] black">Solutions</h6>
							<div className="flex flex-col">
								<Anchor
									className="text-[14px] mb-4 font-regular black hover:success"
									href={"https://influencify.co/health-fitness-influencer-marketing/"}
									text="Health & Fitness"
								/>
								<Anchor
									className="text-[14px] mb-4 font-regular black hover:success"
									href={"https://influencify.co/apparel-influencer-marketing/"}
									text="Apparel"
								/>
								<Anchor
									className="text-[14px] mb-4 font-regular black hover:success"
									href={"https://influencify.co/cosmetics-influencer-marketing/"}
									text="Cosmetics"
								/>
								<Anchor
									className="text-[14px] mb-4 font-regular black hover:success"
									href={"https://influencify.co/food-beverages-influencer-marketing/"}
									text="Food & Beverages"
								/>
								<Anchor
									className="text-[14px] mb-4 font-regular black hover:success"
									href={"https://influencify.co/digital-products-influencer-marketing/"}
									text="Digital Products"
								/>
							</div>
						</div>
						<div className="mt-8 md:!mt-0 xl:col-span-1 md:col-span-3 sm:col-span-4 col-span-6">
							<h6 className="font-medium mb-6 text-[18px] black">About</h6>
							<div className="flex flex-col">
								<Anchor
									className="text-[14px] mb-4 font-regular black hover:success"
									href={"http://influencify.co/terms-of-service/"}
									text="Terms of Service"
								/>
								<Anchor
									className="text-[14px] mb-4 font-regular black hover:success"
									href={"http://influencify.co/privacy-policy/"}
									text="Privacy Policy"
								/>
								<Anchor
									className="text-[14px] mb-4 font-regular black hover:success"
									href={"http://influencify.co/influencers-database/"}
									text="Our Data"
								/>
							</div>
						</div>
						<div className="mt-8 xl:mt-0 xl:col-span-1 md:col-start-4 md:col-span-3 sm:col-span-4 col-span-6">
							<h6 className="font-medium mb-6 text-[18px] black">Contact</h6>
							<div className="flex flex-col">
								<a
									href="https://calendly.com/hazim-klafla/discovery"
									target="_blank"
									className="text-[14px] mb-4 font-regular black hover:success"
									rel="noopener noreferrer"
								>
									Book a demo
								</a>
								<Link
									to="/contact"
									className="text-[14px] mb-4 font-regular black hover:success"
								>
									Submit a ticket
								</Link>
							</div>
						</div>
						<div className="mt-8 xl:mt-0 xl:col-span-1 md:col-span-3 sm:col-span-4 col-span-6">
							<h6 className="font-medium mb-6 text-[18px] black">Resources</h6>
							<div className="flex flex-col">
								<Anchor
									className="text-[14px] mb-4 font-regular black hover:success"
									href={"https://influencify.co/#"}
									text="Recipes"
								/>
								<Anchor
									className="text-[14px] mb-4 font-regular black hover:success"
									href={"https://influencify.co/#"}
									text="Free tools"
								/>
								<a
									href="https://academy.influencify.co"
									className="text-[14px] mb-4 font-regular black hover:success"
									target={"_blank"}
									rel="noopener noreferrer"
								>
									{"Blog"}
								</a>
							</div>
						</div>
						
					</div>
				</div>
			</div>
		);
	}
}

export default Footer;
