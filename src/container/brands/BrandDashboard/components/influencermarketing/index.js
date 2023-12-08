import React, { Component } from "react";
import Slider from "react-slick";
import { VscArrowRight, VscArrowLeft } from "react-icons/vsc";
import "./styles.css";

function SampleNextArrow(props) {
	const { className, style, onClick } = props;
	return (
		<div
			className={className}
			style={{ ...style, display: "block" }}
			onClick={onClick}
		>
			<VscArrowRight size={20} />
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
			<VscArrowLeft size={20} />
		</div>
	);
}

class InfluencerMarketing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeSlide: 0,
			activeSlide2: 0,
		};
		this.timeout = 0;
	}
	render() {
		const settings = {
			className: "center",
			dots: false,
			centerMode: true,
			nextArrow: <SampleNextArrow />,
			prevArrow: <SamplePrevArrow />,
			beforeChange: (current, next) => this.setState({ activeSlide: next }),
			afterChange: (current) => this.setState({ activeSlide2: current }),
			responsive: [
				{
					breakpoint: 9024,
					settings: {
						infinite: false,
						slidesToShow: 1,
						centerPadding: "120",
					},
				},
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 1,
						centerPadding: "60px",
					},
				},
				{
					breakpoint: 768,
					settings: {
						centerPadding: "0",
						dots: false,
						centerMode: true,
						slidesToShow: 1,
					},
				},
				{
					breakpoint: 380,
					settings: {
						centerPadding: "0",
						dots: false,
						centerMode: true,
						slidesToShow: 1,
					},
				},
			],
			speed: 500,
		};
		return (
			<div className="influencer-marketing relative -ml-4">
				<Slider {...settings}>
					<div>
						<div className="p-3">
							<div className="flex justify-center shadow-[0px_4px_5px_#96969640] rounded-[8px] m-0 overflow-hidden flex-wrap lg:!flex-nowrap">
								<div className="p-0 h-[180px] shrink-0">
									<div className="relative flex justify-center items-center w-full h-full">
										<iframe
											title="What is Product Seeding?"
											src="https://player.vimeo.com/video/648558811?h=3d9e4d036e"
											width="100%"
											height="100%"
											className="border-0"
											allow="autoplay; fullscreen; picture-in-picture"
											allowFullScreen
										></iframe>
									</div>
								</div>
								<div className="grow p-0">
									<div className="py-4 px-0 md:!px-6">
										<p className="text-[20px] font-medium black pt-2 mb-4">
											What is Product Seeding?
										</p>
										<p className="text-[14px] black">
											Learn about the foundation of Influencer marketing. Why
											it’s crucial and how exactly it can help you to build the
											most powerful marketing campaign.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div>
						<div className="p-3">
							<div className="flex justify-center shadow-[0px_4px_5px_#96969640] rounded-[8px] m-0 overflow-hidden flex-wrap lg:!flex-nowrap">
								<div className="p-0 h-[180px] shrink-0">
									<div className="relative flex justify-center items-center w-full h-full">
										<iframe
											title="Seeding Is Your First Impression"
											src="https://player.vimeo.com/video/648559436?h=df2d9b03ca"
											width="100%"
											height="100%"
											className="border-0"
											allow="autoplay; fullscreen; picture-in-picture"
											allowFullScreen
										></iframe>
									</div>
								</div>
								<div className="grow p-0">
									<div className="py-4 px-0 md:!px-6">
										<p className="text-[20px] font-medium black pt-2 mb-4">
											Seeding Is Your First Impression
										</p>
										<p className="text-[14px] black">
											Master knowledge about making a great first impression. In
											this short video, you’ll learn how to establish a positive
											relationship with your influencer.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div>
						<div className="p-3">
							<div className="flex justify-center shadow-[0px_4px_5px_#96969640] rounded-[8px] m-0 overflow-hidden flex-wrap lg:!flex-nowrap">
								<div className="p-0 h-[180px] shrink-0">
									<div className="relative flex justify-center items-center w-full h-full">
										<iframe
											title="How To Find an Influencer’s Contact Information"
											src="https://player.vimeo.com/video/648559887"
											width="100%"
											height="100%"
											className="border-0"
											allow="autoplay; fullscreen; picture-in-picture"
											allowFullScreen
										></iframe>
									</div>
								</div>
								<div className="grow p-0">
									<div className="py-4 px-0 md:!px-6">
										<p className="text-[20px] font-medium black pt-2 mb-4">
											How To Find an Influencer’s Contact Information
										</p>
										<p className="text-[14px] black">
											Write or not to write? Or, rather, what to write? Learn
											about key takeaways of contacting your influencer in the
											most effective way.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div>
						<div className="p-3">
							<div className="flex justify-center shadow-[0px_4px_5px_#96969640] rounded-[8px] m-0 overflow-hidden flex-wrap lg:!flex-nowrap">
								<div className="p-0 h-[180px] shrink-0">
									<div className="relative flex justify-center items-center w-full h-full">
										<iframe
											title=" How To Create An Unboxing Experience"
											src="https://player.vimeo.com/video/648560199"
											width="100%"
											height="100%"
											className="border-0"
											allow="autoplay; fullscreen; picture-in-picture"
											allowFullScreen
										></iframe>
									</div>
								</div>
								<div className="grow p-0">
									<div className="py-4 px-0 md:!px-6">
										<p className="text-[20px] font-medium black pt-2 mb-4">
											How To Create An Unboxing Experience
										</p>
										<p className="text-[14px] black">
											Learn about what is a powerful unboxing experience and how
											exactly it can enhance your marketing campaign.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div>
						<div className="p-3">
							<div className="flex justify-center shadow-[0px_4px_5px_#96969640] rounded-[8px] m-0 overflow-hidden flex-wrap lg:!flex-nowrap">
								<div className="p-0 h-[180px] shrink-0">
									<div className="relative flex justify-center items-center w-full h-full">
										<iframe
											title="Building A Core Community"
											src="https://player.vimeo.com/video/648561098?h=616a756db8"
											width="100%"
											height="100%"
											className="border-0"
											allow="autoplay; fullscreen; picture-in-picture"
											allowFullScreen
										></iframe>
									</div>
								</div>
								<div className="grow p-0">
									<div className="py-4 px-0 md:!px-6">
										<p className="text-[20px] font-medium black pt-2 mb-4">
											Building A Core Community
										</p>
										<p className="text-[14px] black">
											Become an expert in building a powerful community for your
											business niche. Learn how to make an impressive entry into
											the category of your interest.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div>
						<div className="p-3">
							<div className="flex justify-center shadow-[0px_4px_5px_#96969640] rounded-[8px] m-0 overflow-hidden flex-wrap lg:!flex-nowrap">
								<div className="p-0 h-[180px] shrink-0">
									<div className="relative flex justify-center items-center w-full h-full">
										<iframe
											title="Creator vs. Distributor"
											src="https://player.vimeo.com/video/648561386"
											width="100%"
											height="100%"
											className="border-0"
											allow="autoplay; fullscreen; picture-in-picture"
											allowFullScreen
										></iframe>
									</div>
								</div>
								<div className="grow p-0">
									<div className="py-4 px-0 md:!px-6">
										<p className="text-[20px] font-medium black pt-2 mb-4">
											Creator vs. Distributor
										</p>
										<p className="text-[14px] black">
											Gain an understanding of the difference between terms of
											creator and distributor. Learn how it can impact your ROI.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div>
						<div className="p-3">
							<div className="flex justify-center shadow-[0px_4px_5px_#96969640] rounded-[8px] m-0 overflow-hidden flex-wrap lg:!flex-nowrap">
								<div className="p-0 h-[180px] shrink-0">
									<div className="relative flex justify-center items-center w-full h-full">
										<iframe
											title="How To Identify and Analyze an Influencer"
											src="https://player.vimeo.com/video/648561998"
											width="100%"
											height="100%"
											className="border-0"
											allow="autoplay; fullscreen; picture-in-picture"
											allowFullScreen
										></iframe>
									</div>
								</div>
								<div className="grow p-0">
									<div className="py-4 px-0 md:!px-6">
										<p className="text-[20px] font-medium black pt-2 mb-4">
											How To Identify and Analyze an Influencer
										</p>
										<p className="text-[14px] black">
											Find out which Influencer is the best for you to work
											with. Learn about different types of influencers and how
											to define the most suitable one for your business.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div>
						<div className="p-3">
							<div className="flex justify-center shadow-[0px_4px_5px_#96969640] rounded-[8px] m-0 overflow-hidden flex-wrap lg:!flex-nowrap">
								<div className="p-0 h-[180px] shrink-0">
									<div className="relative flex justify-center items-center w-full h-full">
										<iframe
											title="Why Video? The “Authentic” Test"
											src="https://player.vimeo.com/video/648562446"
											width="100%"
											height="100%"
											className="border-0"
											allow="autoplay; fullscreen; picture-in-picture"
											allowFullScreen
										></iframe>
									</div>
								</div>
								<div className="grow p-0">
									<div className="py-4 px-0 md:!px-6">
										<p className="text-[20px] font-medium black pt-2 mb-4">
											Why Video? The “Authentic” Test
										</p>
										<p className="text-[14px] black">
											How to create the most authentic marketing campaign? Where
											to start and, most importantly, what should I ask for
											while working with an Influencer? Learn all you need in
											this short video.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div>
						<div className="p-3">
							<div className="flex justify-center shadow-[0px_4px_5px_#96969640] rounded-[8px] m-0 overflow-hidden flex-wrap lg:!flex-nowrap">
								<div className="p-0 h-[180px] shrink-0">
									<div className="relative flex justify-center items-center w-full h-full">
										<iframe
											title="How To Outreach To An Influencer"
											src="https://player.vimeo.com/video/653539903"
											width="100%"
											height="100%"
											className="border-0"
											allow="autoplay; fullscreen; picture-in-picture"
											allowFullScreen
										></iframe>
									</div>
								</div>
								<div className="grow p-0">
									<div className="py-4 px-0 md:!px-6">
										<p className="text-[20px] font-medium black pt-2 mb-4">
											How To Outreach To An Influencer
										</p>
										<p className="text-[14px] black">
											Master the best way of reaching out to your Influencer by
											structuring a high quality invitation email.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div>
						<div className="p-3">
							<div className="flex justify-center shadow-[0px_4px_5px_#96969640] rounded-[8px] m-0 overflow-hidden flex-wrap lg:!flex-nowrap">
								<div className="p-0 h-[180px] shrink-0">
									<div className="relative flex justify-center items-center w-full h-full">
										<iframe
											title="Congratulations"
											src="https://player.vimeo.com/video/648563707"
											width="100%"
											height="100%"
											className="border-0"
											allow="autoplay; fullscreen; picture-in-picture"
											allowFullScreen
										></iframe>
									</div>
								</div>
								<div className="grow p-0">
									<div className="py-4 px-0 md:!px-6">
										<p className="text-[20px] font-medium black pt-2 mb-4">
											Congratulations
										</p>
										<p className="text-[14px] black">
											Congratulations! You have just finished the foundational
											course on effective influencer marketing. Now you can
											start your campaign and see incredible results!
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Slider>
				<div className="slideCounter">
					<p>{this.state.activeSlide + 1}/10</p>
				</div>
			</div>
		);
	}
}

export default InfluencerMarketing;
