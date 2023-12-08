import { Component } from "react";
import InfluencerNiche from "@assets/svgs/find_instagram_influencers_in_your_niche.svg";
import InfluencerLocation from "@assets/svgs/search_instagram_influencer_by_location.svg";
import YoutubeNiche from "@assets/svgs/search_youtube_influencers_in_niche.svg";
import YoutubeLocation from "@assets/svgs/search_youtube_influencers_by_location.svg";
import TiktokNiche from "@assets/svgs/find_tiktok_influencers_in_your_niche.svg";
import TiktokLocation from "@assets/search_tiktok_influencers_by_location.webp";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Slider from "react-slick";
import "./styles.css";
import LinkTo from "@components/global/LinkTo";
// import helper from "../../constants/helper";

function SampleNextArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ ...style, display: "block" }}
			onClick={onClick}
		>
			<FiChevronRight size={22} />
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
			<FiChevronLeft size={22} />
		</div>
	);
}

class MarketingCarousel extends Component {
	componentDidMount() {
		window.scrollTo(0, 0);
	}
	render() {
		const settings = {
			dots: true,
			infinite: false,
			nextArrow: <SampleNextArrow />,
			prevArrow: <SamplePrevArrow />,
			responsive: [
				{
					breakpoint: 9024,
					settings: {
						slidesToShow: 3,
					},
				},
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 2,
					},
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
					},
				},
			],
			speed: 500,
		};
		return (
			<>
				<div className="marketing-Carousel infl-slick-carousel">
					<Slider {...settings}>
						
					
						<div>
							<div className="rounded-[8px] mb-[10px] py-[25px] bg-white shadow-[0px_4px_5px_#96969640]  transition-all hover:shadow-[0px_10px_30px_#96969640] h-full">
								<div className="min-h-[270px] discovery-alt pt-3">
									<img src={YoutubeNiche} alt="Youtube Niche" width="100%" />
								</div>
								<div className="list-card sm:px-12 px-6">
									<h3 className="text-[24px] black mb-6 leading-[35px] font-medium">
										Search Youtube Influencers In Your Niche
									</h3>
									<p className="text-[16px] black font-normal">
										Search for influencers by keywords either in their content,
										bio, or anywhere.
									</p>
									<LinkTo
										to="/youtube-niche"
										text="Start Now"
										className="mt-12 text-white px-12 rounded-[8px] h-[40px] bg--purple text-[14px] inline-flex items-center justify-center hover:opacity-80"
									/>
								</div>
							</div>
						</div>
						<div>
							<div className="rounded-[8px] mb-[10px] py-[25px] bg-white shadow-[0px_4px_5px_#96969640]  transition-all hover:shadow-[0px_10px_30px_#96969640] h-full">
								<div className="min-h-[270px] discovery-alt pt-3">
									<img
										src={YoutubeLocation}
										alt="Youtube Location"
										width="100%"
									/>
								</div>
								<div className="list-card sm:px-12 px-6">
									<h3 className="text-[24px] black mb-6 leading-[35px] font-medium">
										Search Youtube Influencers By Location
									</h3>
									<p className="text-[16px] black font-normal">
										Find social media influencers by location for your marketing
										campaign.
									</p>
									<LinkTo
										to="/youtube-location"
										text="Start Now"
										className="mt-12 text-white px-12 rounded-[8px] h-[40px] bg--purple text-[14px] inline-flex items-center justify-center hover:opacity-80"
									/>
								</div>
							</div>
						</div>
						<div>
							<div className="rounded-[8px] mb-[10px] py-[25px] bg-white shadow-[0px_4px_5px_#96969640]  transition-all hover:shadow-[0px_10px_30px_#96969640] h-full">
								<div className="min-h-[270px] pt-3">
									<img src={TiktokNiche} alt="TikTok Niche" width="100%" />
								</div>
								<div className="list-card sm:px-12 px-6">
									<h3 className="text-[24px] black mb-6 leading-[35px] font-medium">
										Find TikTok Influencers In Your Niche
									</h3>
									<p className="text-[16px] black font-normal">
										Search for influencers by keywords either in their content,
										bio, or anywhere.
									</p>
									<LinkTo
										to="/tiktok-niche"
										text="Start Now"
										className="mt-12 text-white px-12 rounded-[8px] h-[40px] bg--purple text-[14px] inline-flex items-center justify-center hover:opacity-80"
									/>
								</div>
							</div>
						</div>
						<div>
							<div className="rounded-[8px] mb-[10px] py-[25px] bg-white shadow-[0px_4px_5px_#96969640]  transition-all hover:shadow-[0px_10px_30px_#96969640] h-full">
								<div className="min-h-[270px] pt-3">
									<img
										src={TiktokLocation}
										alt="TikTok Location"
										width="100%"
									/>
								</div>
								<div className="list-card sm:px-12 px-6">
									<h3 className="text-[24px] black mb-6 leading-[35px] font-medium">
										Search TikTok Influencers By Location
									</h3>
									<p className="text-[16px] black font-normal">
										Find social media influencers by location for your marketing
										campaign.
									</p>
									<LinkTo
										to="/tiktok-location"
										text="Start Now"
										className="mt-12 text-white px-12 rounded-[8px] h-[40px] bg--purple text-[14px] inline-flex items-center justify-center hover:opacity-80"
									/>
								</div>
							</div>
						</div>
						{/* <div>
                            <div className="rounded-[8px] mb-[10px] py-[25px] bg-white shadow-[0px_4px_5px_#96969640]  transition-all hover:shadow-[0px_10px_30px_#96969640] h-full">
                                <div className="min-h-[270px] element pt-3">
                                    <img src={InstaCalculator}  alt="Instagram Engagement Calculator" width="100%" />
                                    <img src={CardElement}  alt="Element" className="card-element" />
                                </div>
                                <div className="list-card sm:px-12 px-6">
                                    <h3 className="text-[24px] black mb-6 leading-[35px] font-medium">Instagram Engagement Calculator</h3>
                                    <p className="text-[16px] black font-normal">Calculate the engagement rate of any influencer in Instagram.</p>
                                    <Link to="/insta-engagement-calculator" className="mt-12 px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70">
                                        Start Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="rounded-[8px] mb-[10px] py-[25px] bg-white shadow-[0px_4px_5px_#96969640]  transition-all hover:shadow-[0px_10px_30px_#96969640] h-full">
                                <div className="min-h-[270px] element pt-3">
                                    <img src={InstaAuditCheck}  alt="Influencer Location" width="100%" />
                                    <img src={CardElement}  alt="Element" className="card-element" />
                                </div>
                                <div className="list-card sm:px-12 px-6">
                                    <h3 className="text-[24px] black mb-6 leading-[35px] font-medium">Instagram Audit & Fake Followers Check</h3>
                                    <p className="text-[16px] black font-normal">Check any Instagram account for fake followers and engagement.</p>
                                    <Link to="/" className="mt-12 px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70">
                                        Start Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="rounded-[8px] mb-[10px] py-[25px] bg-white shadow-[0px_4px_5px_#96969640]  transition-all hover:shadow-[0px_10px_30px_#96969640] h-full">
                                <div className="min-h-[270px] element pt-3">
                                    <img src={InstaEarnedMedia}  alt="Instagram Earned Media" width="100%" />
                                    <img src={CardElement}  alt="Element" className="card-element" />
                                </div>
                                <div className="list-card sm:px-12 px-6">
                                    <h3 className="text-[24px] black mb-6 leading-[35px] font-medium">Instagram Earned Media Value Calculator</h3>
                                    <p className="text-[16px] black font-normal">Calculate projected earned Media Value for any Instagram influencer.</p>
                                    <Link to="/" className="mt-12 px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70">
                                        Start Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="rounded-[8px] mb-[10px] py-[25px] bg-white shadow-[0px_4px_5px_#96969640]  transition-all hover:shadow-[0px_10px_30px_#96969640] h-full">
                                <div className="min-h-[270px] element pt-3">
                                    <img src={InstaMoneyCalculator}  alt="Instagram Money Calculator" width="100%" />
                                    <img src={CardElement}  alt="Element" className="card-element" />
                                </div>
                                <div className="list-card sm:px-12 px-6">
                                    <h3 className="text-[24px] black mb-6 leading-[35px] font-medium">Instagram Money Calculator</h3>
                                    <p className="text-[16px] black font-normal">Calculate estimated earnings & sponsored posts price.</p>
                                    <Link to="/emv-calculator" className="mt-12 px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70">
                                        Start Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="rounded-[8px] mb-[10px] py-[25px] bg-white shadow-[0px_4px_5px_#96969640]  transition-all hover:shadow-[0px_10px_30px_#96969640] h-full">
                                <div className="min-h-[270px] element pt-3">
                                    <img src={TiktokCalculator}  alt="TikTok Engagement Calculator" width="100%" />
                                    <img src={CardElement}  alt="Element" className="card-element" />
                                </div>
                                <div className="list-card sm:px-12 px-6">
                                    <h3 className="text-[24px] black mb-6 leading-[35px] font-medium">TikTok Engagement Calculator</h3>
                                    <p className="text-[16px] black font-normal">Calculate the engagement rate of any influencer in Instagram.</p>
                                    <Link to="/tiktok-engagement-calculator" className="mt-12 px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70">
                                        Start Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="rounded-[8px] mb-[10px] py-[25px] bg-white shadow-[0px_4px_5px_#96969640]  transition-all hover:shadow-[0px_10px_30px_#96969640] h-full">
                                <div className="min-h-[270px] element pt-3">
                                    <img src={LookalikeTool}  alt="Lookalike Search Tool" width="100%" />
                                    <img src={CardElement}  alt="Element" className="card-element" />
                                </div>
                                <div className="list-card sm:px-12 px-6">
                                    <h3 className="text-[24px] black mb-6 leading-[35px] font-medium">Lookalike Search Tool</h3>
                                    <p className="text-[16px] black font-normal">Find Lookalike Influencers across Instagram, Tiktok or Youtube.</p>
                                    <Link to="/" className="mt-12 px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70">
                                        Start Now
                                    </Link>
                                </div>
                            </div>
                        </div> */}
					</Slider>
				</div>
			</>
		);
	}
}

export default MarketingCarousel;
