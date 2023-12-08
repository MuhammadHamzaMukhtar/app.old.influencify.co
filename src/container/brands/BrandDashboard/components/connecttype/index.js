import { Component } from "react";
import Slider from "react-slick";
import google from "@assets/google.png";
import LinkTo from "@components/global/LinkTo";
import "./styles.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

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

class ConnectType extends Component {
	render() {
		const { brandDashboardInformation } = this.props;
		const settings = {
			className: "center",
			dots: true,
			infinite: false,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			nextArrow: <SampleNextArrow />,
			prevArrow: <SamplePrevArrow />,
		};
		return (
			<div className="infl-slick-carousel connect-type shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] mb-6 p-6 w-full text-center relative">
				<Slider {...settings}>
					<div>
						<div className="pb-1">
							<div className="px-[1rem] text-center w-full rounded-[8px]">
								<h4 className="text-[20px]">Send with Gmail!</h4>
								<p className="gray text-[11px] px-2">
									Sign in with your Gmail to send Quick invites to Your
									influencers with just one-click!
								</p>
								<LinkTo
									to="/integration"
									className={`px-6 rounded-full h-[30px] text-[12px] inline-flex items-center ${
										brandDashboardInformation.gmail_connected
											? "bg--purple text-white"
											: "bg-white text-[#7c3292]"
									} border-[#7c3292] border-[1px] hover:opacity-80 hover:!bg-[#7c3292] hover:text-white mt-4`}
									prefix={
										<img
											src={google}
											alt="google"
											className="mr-2 h-[12px] w-[12px] rounded-full"
										/>
									}
									text={
										brandDashboardInformation.gmail_connected
											? "Connected"
											: "Sign in with Google"
									}
								/>
							</div>
						</div>
					</div>
					<div>
						<div className="pb-1">
							<div className="px-[1rem] text-center w-full rounded-[8px]">
								<h4 className="text-[20px]">Send via SMTP</h4>
								<p className="gray text-[11px] px-2">
									Connect your outlook, office 365, hotmail, yahoo or yandex
									email
								</p>
								<LinkTo
									to="/integration/smtp"
									className={`px-6 rounded-full h-[30px] text-[12px] inline-flex items-center ${
										brandDashboardInformation.smtp_connected
											? "bg--purple text-white"
											: "bg-white text-[#7c3292]"
									} border-[#7c3292] border-[1px] hover:opacity-80 hover:!bg-[#7c3292] hover:text-white mt-4`}
									prefix={
										<img
											src={google}
											alt="google"
											className="mr-2 h-[12px] w-[12px] runded-full"
										/>
									}
									text={
										brandDashboardInformation.smtp_connected
											? "Connected"
											: "Connect with SMTP"
									}
								/>
							</div>
						</div>
					</div>
				</Slider>
			</div>
		);
	}
}

export default ConnectType;
