import { Component } from "react";
import Slider from "react-slick";
import { connect } from "react-redux";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import AffiliatesintheUK from "@assets/affiliates_in_the_uk.jpg";
import AfricandescentinUK from "@assets/african_descent_in_uk.jpg";
import BeautyTiktokersWorldwide from "@assets/beauty_tiktokers_worldwide.jpg";
import BigTiktokersinCanada from "@assets/big_tiktokers_in_canada.jpg";
import CampingYoutubersinUSA from "@assets/camping_youtubers_in_usa.jpg";
import Crypto from "@assets/crypto.jpg";
import FashioninGermany from "@assets/fashion_in_germany.jpg";
import FitnessYogainAustralia from "@assets/fitness_yoga_in_australia.jpg";
import FoodBeveragesinItaly from "@assets/food_beverages_in_italy.jpg";
import GamingintheUSA from "@assets/gaming_in_the_usa.jpg";
import ShopifyYoutubers from "@assets/shopify_youtubers.jpg";
import TravelinJapan from "@assets/travel_in_japan.jpg";
import TrendingYoutubersIndonesia from "@assets/trending_youtubers_Indonesia.jpg";
import "./styles.css";

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

class PopularSearches extends Component {
	constructor(props) {
		super(props);
		this.timeout = 0;
	}

	searchInfluencer = (key) => {
		const payload = Object.assign({}, this.props.payload);
		const form = Object.assign({}, this.props.form);
		const { handlePlatform } = this.props;
		let redirect_url = "/discovery/youtube";
		delete payload["filter"]["gender"];
		delete form["filter"]["gender"];

		delete payload["filter"]["last_posted"];
		delete form["filter"]["last_posted"];

		delete payload["filter"]["followers"];
		delete form["filter"]["followers"];

		delete payload["filter"]["audience_geo"];
		delete form["filter"]["audience_geo"];

		if (key === "GamingintheUSA") {
			handlePlatform("youtube");
			payload["filter"]["audience_brand_category"] = [{ id: 30, weight: 0.4 }];
			form["filter"]["audience_brand_category"] = [
				{ id: 30, weight: 0.4, name: "Gaming" },
			];

			payload["filter"]["audience_geo"] = [{ id: 148838, weight: 0.5 }];
			form["filter"]["audience_geo"] = [
				{ id: 148838, weight: 0.5, name: "United States" },
			];

			payload["filter"]["followers"] = { left_number: 5000, right_number: "" };
			form["filter"]["followers"] = { left_number: 5000, right_number: "" };

			payload["filter"]["gender"] = { code: "KNOWN" };
			form["filter"]["gender"] = { code: "KNOWN" };

			payload["filter"]["last_posted"] = 30;
			form["filter"]["last_posted"] = 30;
		} else if (key === "TrendingYoutubersIndonesia") {
			handlePlatform("youtube");
			redirect_url = "/discovery/youtube";
			payload["filter"]["audience_geo"] = [{ id: 304751, weight: 0.5 }];
			form["filter"]["audience_geo"] = [
				{ id: 304751, weight: 0.5, name: "Indonesia" },
			];

			payload["filter"]["gender"] = { code: "KNOWN" };
			form["filter"]["gender"] = { code: "KNOWN" };

			payload["filter"]["followers"] = { left_number: 5000, right_number: "" };
			form["filter"]["followers"] = { left_number: 5000, right_number: "" };

			payload["filter"]["last_posted"] = 30;
			form["filter"]["last_posted"] = 30;

			payload["filter"]["followers_growth"] = {
				interval: "i1month",
				operator: "gte",
				value: 0.4,
			};
			form["filter"]["followers_growth"] = {
				interval: "i1month",
				operator: "gte",
				value: 0.4,
			};
		} else if (key === "BigTiktokersinCanada") {
			handlePlatform("tiktok");
			redirect_url = "/discovery/tiktok";
			payload["filter"]["audience_geo"] = [{ id: 1428125, weight: 0.5 }];
			form["filter"]["audience_geo"] = [
				{ id: 1428125, weight: 0.5, name: "Canada" },
			];

			payload["filter"]["followers"] = { left_number: 5000, right_number: "" };
			form["filter"]["followers"] = { left_number: 5000, right_number: "" };

			payload["filter"]["views"] = { left_number: 5000, right_number: "" };
			form["filter"]["views"] = { left_number: 5000, right_number: "" };

			payload["filter"]["last_posted"] = 30;
			form["filter"]["last_posted"] = 30;
		} else if (key === "CampingYoutubersinUSA") {
			handlePlatform("youtube");
			redirect_url = "/discovery/youtube";
			payload["filter"]["audience_geo"] = [{ id: 148838, weight: 0.5 }];
			form["filter"]["audience_geo"] = [
				{ id: 148838, weight: 0.5, name: "United States" },
			];

			payload["filter"]["views"] = { left_number: 5000, right_number: "" };
			form["filter"]["views"] = { left_number: 5000, right_number: "" };

			payload["filter"]["relevance"] = {
				value: "#camping #van_life",
				weight: 0.5,
			};
			form["filter"]["relevance"] = [
				{ value: "#camping", weight: 0.5, type: "#" },
				{ value: "#van_life", weight: 0.5, type: "#" },
			];
		} else if (key === "AffiliatesintheUK") {
			handlePlatform("youtube");
			redirect_url = "/discovery/youtube";

			payload["filter"]["audience_geo"] = [{ id: 62149, weight: 0.4 }];
			form["filter"]["audience_geo"] = [
				{ id: 62149, weight: 0.4, name: "United Kingdom" },
			];

			payload["filter"]["has_ads"] = true;
			form["filter"]["has_ads"] = true;

			payload["filter"]["gender"] = { code: "KNOWN" };
			form["filter"]["gender"] = { code: "KNOWN" };

			payload["filter"]["followers"] = { left_number: 5000, right_number: "" };
			form["filter"]["followers"] = { left_number: 5000, right_number: "" };

			payload["filter"]["last_posted"] = 30;
			form["filter"]["last_posted"] = 30;
		} else if (key === "TravelinJapan") {
			handlePlatform("youtube");
			redirect_url = "/discovery/youtube";

			payload["filter"]["gender"] = { code: "KNOWN" };
			form["filter"]["gender"] = { code: "KNOWN" };

			payload["filter"]["followers"] = {
				left_number: 5000,
				right_number: 10000000,
			};
			form["filter"]["followers"] = {
				left_number: 5000,
				right_number: 10000000,
			};

			payload["filter"]["last_posted"] = 30;
			form["filter"]["last_posted"] = 30;

			payload["filter"]["audience_geo"] = [{ id: 382313, weight: 0.5 }];
			form["filter"]["audience_geo"] = [
				{ id: 382313, weight: 0.5, name: "Japan" },
			];

			payload["filter"]["audience_brand_category"] = [{ id: 43, weight: 0.45 }];
			form["filter"]["audience_brand_category"] = [
				{ id: 43, weight: 0.45, name: "Travel, Tourism & Aviation" },
			];
		} else if (key === "AfricandescentinUK") {
			handlePlatform("youtube");
			redirect_url = "/discovery/youtube";

			payload["filter"]["audience_geo"] = [{ id: 62149, weight: 0.4 }];
			form["filter"]["audience_geo"] = [
				{ id: 62149, weight: 0.4, name: "United Kingdom" },
			];

			payload["filter"]["audience_race"] = { code: "Black", weight: 0.4 };
			form["filter"]["audience_race"] = { code: "Black", weight: 0.4 };

			payload["filter"]["has_ads"] = true;
			form["filter"]["has_ads"] = true;

			payload["filter"]["gender"] = { code: "KNOWN" };
			form["filter"]["gender"] = { code: "KNOWN" };

			payload["filter"]["followers"] = { left_number: 5000, right_number: "" };
			form["filter"]["followers"] = { left_number: 5000, right_number: "" };

			payload["filter"]["last_posted"] = 30;
			form["filter"]["last_posted"] = 30;
		} else if (key === "FitnessYogainAustralia") {
			handlePlatform("youtube");
			redirect_url = "/discovery/youtube";

			payload["filter"]["audience_geo"] = [{ id: 80500, weight: 0.5 }];
			form["filter"]["audience_geo"] = [
				{ id: 80500, weight: 0.5, name: "Australia" },
			];

			payload["filter"]["audience_brand_category"] = [
				{ id: 196, weight: 0.45 },
			];
			form["filter"]["audience_brand_category"] = [
				{ id: 196, weight: 0.45, name: "Fitness & Yoga" },
			];

			payload["filter"]["gender"] = { code: "KNOWN" };
			form["filter"]["gender"] = { code: "KNOWN" };

			payload["filter"]["followers"] = {
				left_number: 5000,
				right_number: 10000000,
			};
			form["filter"]["followers"] = {
				left_number: 5000,
				right_number: 10000000,
			};

			payload["filter"]["last_posted"] = 30;
			form["filter"]["last_posted"] = 30;
		} else if (key === "FoodBeveragesinItaly") {
			handlePlatform("youtube");
			redirect_url = "/discovery/youtube";

			payload["filter"]["gender"] = { code: "KNOWN" };
			form["filter"]["gender"] = { code: "KNOWN" };

			payload["filter"]["followers"] = {
				left_number: 5000,
				right_number: 10000000,
			};
			form["filter"]["followers"] = {
				left_number: 5000,
				right_number: 10000000,
			};

			payload["filter"]["last_posted"] = 30;
			form["filter"]["last_posted"] = 30;

			payload["filter"]["audience_geo"] = [{ id: 365331, weight: 0.5 }];
			form["filter"]["audience_geo"] = [
				{ id: 365331, weight: 0.5, name: "Italy" },
			];

			payload["filter"]["audience_brand_category"] = [
				{ id: 139, weight: 0.55 },
				{ id: 9, weight: 0.55 },
			];
			form["filter"]["audience_brand_category"] = [
				{ id: 139, weight: 0.55, name: "Restaurants, Food & Grocery" },
				{ id: 9, weight: 0.55, name: "Coffee, Tea & Beverages" },
			];
		} else if (key === "FashioninGermany") {
			handlePlatform("youtube");
			redirect_url = "/discovery/youtube";

			payload["filter"]["gender"] = { code: "KNOWN" };
			form["filter"]["gender"] = { code: "KNOWN" };

			payload["filter"]["followers"] = {
				left_number: 5000,
				right_number: 10000000,
			};
			form["filter"]["followers"] = {
				left_number: 5000,
				right_number: 10000000,
			};

			payload["filter"]["last_posted"] = 30;
			form["filter"]["last_posted"] = 30;

			payload["filter"]["audience_geo"] = [{ id: 51477, weight: 0.5 }];
			form["filter"]["audience_geo"] = [
				{ id: 51477, weight: 0.5, name: "Germany" },
			];

			payload["filter"]["audience_brand_category"] = [
				{ id: 13, weight: 0.5 },
				{ id: 130, weight: 0.5 },
				{ id: 7, weight: 0.5 },
			];
			form["filter"]["audience_brand_category"] = [
				{ id: 13, weight: 0.5, name: "Clothes, Shoes, Handbags & Accessories" },
				{ id: 130, weight: 0.5, name: "Jewellery & Watches" },
				{ id: 7, weight: 0.5, name: "Shopping & Retail" },
			];
		} else if (key === "ShopifyYoutubers") {
			handlePlatform("youtube");
			redirect_url = "/discovery/youtube";

			payload["filter"]["keywords"] = "shopify";
			form["filter"]["keywords"] = "shopify";

			payload["filter"]["views"] = { left_number: 5000, right_number: "" };
			form["filter"]["views"] = { left_number: 5000, right_number: "" };

			payload["filter"]["last_posted"] = 30;
			form["filter"]["last_posted"] = 30;

			payload["filter"]["followers"] = {
				left_number: 1000,
				right_number: 10000000,
			};
			form["filter"]["followers"] = {
				left_number: 1000,
				right_number: 10000000,
			};
		} else if (key === "BeautyTiktokersWorldwide") {
			handlePlatform("tiktok");
			redirect_url = "/discovery/tiktok";

			payload["filter"]["gender"] = { code: "KNOWN" };
			form["filter"]["gender"] = { code: "KNOWN" };

			payload["filter"]["followers"] = {
				left_number: 5000,
				right_number: 10000000,
			};
			form["filter"]["followers"] = {
				left_number: 5000,
				right_number: 10000000,
			};

			payload["filter"]["last_posted"] = 30;
			form["filter"]["last_posted"] = 30;

			payload["filter"]["relevance"] = {
				value:
					"#beautytips #beautytutorial #beautyhacks #beautymode #beautyessentials #skincare #haircare #cosmetics",
				weight: 0.5,
			};
			form["filter"]["relevance"] = [
				{ value: "#beautytips", weight: 0.5, type: "#" },
				{ value: "#beautytutorial", weight: 0.5, type: "#" },
				{ value: "#beautyhacks", weight: 0.5, type: "#" },
				{ value: "#beautymode", weight: 0.5, type: "#" },
				{ value: "#beautyessentials", weight: 0.5, type: "#" },
				{ value: "#skincare", weight: 0.5, type: "#" },
				{ value: "#haircare", weight: 0.5, type: "#" },
				{ value: "#cosmetics", weight: 0.5, type: "#" },
			];
		}

		payload["paging"]["skip"] = 0;
		form["loadMore"] = false;
		form["override_filter"] = true;

		this.props.searchFilters(payload, form);
		if (this.timeout) clearTimeout(this.timeout);
		this.timeout = setTimeout(() => {
			this.props.navigate(redirect_url);
		}, 500);
	};

	render() {
		const settings = {
			className: "center",
			dots: true,
			nextArrow: <SampleNextArrow />,
			prevArrow: <SamplePrevArrow />,
			responsive: [
				{
					breakpoint: 9024,
					settings: {
						infinite: false,
						slidesToShow: 4,
						centerPadding: "60px",
					},
				},
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 3,
						centerPadding: "60px",
					},
				},
				{
					breakpoint: 768,
					settings: {
						centerPadding: "60px",
						dots: false,
						centerMode: true,
						slidesToShow: 1,
					},
				},
				{
					breakpoint: 380,
					settings: {
						centerPadding: "60px",
						dots: false,
						centerMode: true,
						slidesToShow: 1,
					},
				},
			],
			speed: 500,
		};
		return (
			<div className="infl-slick-carousel popularArrows">
				<Slider {...settings}>
					<div>
						<div onClick={() => this.searchInfluencer("GamingintheUSA")}>
							<div className="h-[100px] flex items-center justify-center">
								<div className="w-full h-full ml-2 mr-2 bg-transparent border-0 rounded-[8px] overflow-hidden relative cursor-pointer">
									<img
										className="rounded-[8px] max-h-[100px] w-full object-cover object-center rounded-t-[8px]"
										src={GamingintheUSA}
										alt="Gaming"
									/>
									<div className="p-0 flex justify-center items-center rounded-[8px] absolute top-0 h-full w-full bg-[#282b3c66]">
										<b className="text-white font-light text-[18px] text-center">
											Gaming
										</b>
									</div>
								</div>
							</div>
							<div className="p-2">
								<p className="text-[15px] font-semibold black">USA</p>
							</div>
						</div>
					</div>
					<div>
						<div
							onClick={() =>
								this.searchInfluencer("TrendingYoutubersIndonesia")
							}
						>
							<div className="h-[100px] flex items-center justify-center">
								<div className="w-full h-full ml-2 mr-2 bg-transparent border-0 rounded-[8px] overflow-hidden relative cursor-pointer">
									<img
										className="rounded-[8px] max-h-[100px] w-full object-cover object-center"
										src={TrendingYoutubersIndonesia}
										alt="Trending Youtubers"
									/>
									<div className="p-0 flex justify-center items-center rounded-[8px] absolute top-0 h-full w-full bg-[#282b3c66]">
										<b className="text-white font-light text-[18px] text-center">
											Trending Youtubers
										</b>
									</div>
								</div>
							</div>
							<div className="p-2">
								<p className="text-[15px] font-semibold black">Indonesia</p>
							</div>
						</div>
					</div>
					<div>
						<div onClick={() => this.searchInfluencer("Crypto")}>
							<div className="h-[100px] flex items-center justify-center">
								<div className="w-full h-full ml-2 mr-2 bg-transparent border-0 rounded-[8px] overflow-hidden relative cursor-pointer">
									<img
										className="rounded-[8px] max-h-[100px] w-full object-cover object-center"
										src={Crypto}
										alt="Crypto"
									/>
									<div className="p-0 flex justify-center items-center rounded-[8px] absolute top-0 h-full w-full bg-[#282b3c66]">
										<b className="text-white font-light text-[18px] text-center">
											Crypto
										</b>
									</div>
								</div>
							</div>
							<div className="p-2">
								<p className="text-[15px] font-semibold black">Worldwide</p>
							</div>
						</div>
					</div>
					<div>
						<div onClick={() => this.searchInfluencer("BigTiktokersinCanada")}>
							<div className="h-[100px] flex items-center justify-center">
								<div className="w-full h-full ml-2 mr-2 bg-transparent border-0 rounded-[8px] overflow-hidden relative cursor-pointer">
									<img
										className="rounded-[8px] max-h-[100px] w-full object-cover object-center"
										src={BigTiktokersinCanada}
										alt="Big Tiktokers"
									/>
									<div className="p-0 flex justify-center items-center rounded-[8px] absolute top-0 h-full w-full bg-[#282b3c66]">
										<b className="text-white font-light text-[18px] text-center">
											Big Tiktokers
										</b>
									</div>
								</div>
							</div>
							<div className="p-2">
								<p className="text-[15px] font-semibold black">Canada</p>
							</div>
						</div>
					</div>
					<div>
						<div onClick={() => this.searchInfluencer("CampingYoutubersinUSA")}>
							<div className="h-[100px] flex items-center justify-center">
								<div className="w-full h-full ml-2 mr-2 bg-transparent border-0 rounded-[8px] overflow-hidden relative cursor-pointer">
									<img
										className="rounded-[8px] max-h-[100px] w-full object-cover object-center"
										src={CampingYoutubersinUSA}
										alt="Camping Youtubers"
									/>
									<div className="p-0 flex justify-center items-center rounded-[8px] absolute top-0 h-full w-full bg-[#282b3c66]">
										<b className="text-white font-light text-[18px] text-center">
											Camping Youtubers
										</b>
									</div>
								</div>
							</div>
							<div className="p-2">
								<p className="text-[15px] font-semibold black">USA</p>
							</div>
						</div>
					</div>
					<div>
						<div onClick={() => this.searchInfluencer("AffiliatesintheUK")}>
							<div className="h-[100px] flex items-center justify-center">
								<div className="w-full h-full ml-2 mr-2 bg-transparent border-0 rounded-[8px] overflow-hidden relative cursor-pointer">
									<img
										className="rounded-[8px] max-h-[100px] w-full object-cover object-center"
										src={AffiliatesintheUK}
										alt="Affiliates"
									/>
									<div className="p-0 flex justify-center items-center rounded-[8px] absolute top-0 h-full w-full bg-[#282b3c66]">
										<b className="text-white font-light text-[18px] text-center">
											Affiliates
										</b>
									</div>
								</div>
							</div>
							<div className="p-2">
								<p className="text-[15px] font-semibold black">UK</p>
							</div>
						</div>
					</div>
					<div>
						<div onClick={() => this.searchInfluencer("TravelinJapan")}>
							<div className="h-[100px] flex items-center justify-center">
								<div className="w-full h-full ml-2 mr-2 bg-transparent border-0 rounded-[8px] overflow-hidden relative cursor-pointer">
									<img
										className="rounded-[8px] max-h-[100px] w-full object-cover object-center"
										src={TravelinJapan}
										alt="Travel"
									/>
									<div className="p-0 flex justify-center items-center rounded-[8px] absolute top-0 h-full w-full bg-[#282b3c66]">
										<b className="text-white font-light text-[18px] text-center">
											Travel
										</b>
									</div>
								</div>
							</div>
							<div className="p-2">
								<p className="text-[15px] font-semibold black">Japan</p>
							</div>
						</div>
					</div>
					<div>
						<div onClick={() => this.searchInfluencer("AfricandescentinUK")}>
							<div className="h-[100px] flex items-center justify-center">
								<div className="w-full h-full ml-2 mr-2 bg-transparent border-0 rounded-[8px] overflow-hidden relative cursor-pointer">
									<img
										className="rounded-[8px] max-h-[100px] w-full object-cover object-center"
										src={AfricandescentinUK}
										alt="African descent"
									/>
									<div className="p-0 flex justify-center items-center rounded-[8px] absolute top-0 h-full w-full bg-[#282b3c66]">
										<b className="text-white font-light text-[18px] text-center">
											African descent
										</b>
									</div>
								</div>
							</div>
							<div className="p-2">
								<p className="text-[15px] font-semibold black">UK</p>
							</div>
						</div>
					</div>
					<div>
						<div
							onClick={() => this.searchInfluencer("FitnessYogainAustralia")}
						>
							<div className="h-[100px] flex items-center justify-center">
								<div className="w-full h-full ml-2 mr-2 bg-transparent border-0 rounded-[8px] overflow-hidden relative cursor-pointer">
									<img
										className="rounded-[8px] max-h-[100px] w-full object-cover object-center"
										src={FitnessYogainAustralia}
										alt="Fitness&Yoga"
									/>
									<div className="p-0 flex justify-center items-center rounded-[8px] absolute top-0 h-full w-full bg-[#282b3c66]">
										<b className="text-white font-light text-[18px] text-center">
											Fitness&Yoga
										</b>
									</div>
								</div>
							</div>
							<div className="p-2">
								<p className="text-[15px] font-semibold black">Australia</p>
							</div>
						</div>
					</div>
					<div>
						<div onClick={() => this.searchInfluencer("FoodBeveragesinItaly")}>
							<div className="h-[100px] flex items-center justify-center">
								<div className="w-full h-full ml-2 mr-2 bg-transparent border-0 rounded-[8px] overflow-hidden relative cursor-pointer">
									<img
										className="rounded-[8px] max-h-[100px] w-full object-cover object-center"
										src={FoodBeveragesinItaly}
										alt="Food&Beverages"
									/>
									<div className="p-0 flex justify-center items-center rounded-[8px] absolute top-0 h-full w-full bg-[#282b3c66]">
										<b className="text-white font-light text-[18px] text-center">
											Food&Beverages
										</b>
									</div>
								</div>
							</div>
							<div className="p-2">
								<p className="text-[15px] font-semibold black">Italy</p>
							</div>
						</div>
					</div>
					<div>
						<div onClick={() => this.searchInfluencer("FashioninGermany")}>
							<div className="h-[100px] flex items-center justify-center">
								<div className="w-full h-full ml-2 mr-2 bg-transparent border-0 rounded-[8px] overflow-hidden relative cursor-pointer">
									<img
										className="rounded-[8px] max-h-[100px] w-full object-cover object-center"
										src={FashioninGermany}
										alt="Fashion"
									/>
									<div className="p-0 flex justify-center items-center rounded-[8px] absolute top-0 h-full w-full bg-[#282b3c66]">
										<b className="text-white font-light text-[18px] text-center">
											Fashion
										</b>
									</div>
								</div>
							</div>
							<div className="p-2">
								<p className="text-[15px] font-semibold black">Germany</p>
							</div>
						</div>
					</div>
					<div>
						<div onClick={() => this.searchInfluencer("ShopifyYoutubers")}>
							<div className="h-[100px] flex items-center justify-center">
								<div className="w-full h-full ml-2 mr-2 bg-transparent border-0 rounded-[8px] overflow-hidden relative cursor-pointer">
									<img
										className="rounded-[8px] max-h-[100px] w-full object-cover object-center"
										src={ShopifyYoutubers}
										alt="Shopify Youtubers"
									/>
									<div className="p-0 flex justify-center items-center rounded-[8px] absolute top-0 h-full w-full bg-[#282b3c66]">
										<b className="text-white font-light text-[18px] text-center">
											Shopify Youtubers
										</b>
									</div>
								</div>
							</div>
							<div className="p-2">
								<p className="text-[15px] font-semibold black">Worldwide</p>
							</div>
						</div>
					</div>
					<div>
						<div
							onClick={() => this.searchInfluencer("BeautyTiktokersWorldwide")}
						>
							<div className="h-[100px] flex items-center justify-center">
								<div className="w-full h-full ml-2 mr-2 bg-transparent border-0 rounded-[8px] overflow-hidden relative cursor-pointer">
									<img
										className="rounded-[8px] max-h-[100px] w-full object-cover object-center"
										src={BeautyTiktokersWorldwide}
										alt="Beauty Tiktokers"
									/>
									<div className="p-0 flex justify-center items-center rounded-[8px] absolute top-0 h-full w-full bg-[#282b3c66]">
										<b className="text-white font-light text-[18px] text-center">
											Beauty Tiktokers
										</b>
									</div>
								</div>
							</div>
							<div className="p-2">
								<p className="text-[15px] font-semibold black">Worldwide</p>
							</div>
						</div>
					</div>
				</Slider>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		payload: state.influencerSearch.payload,
		form: state.influencerSearch.form,
		platform: state.influencerSearch.platform,
	};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const { dispatch } = dispatchProps;
	const { actions } = require("@store/redux/InfluencerSearchRedux");
	return {
		...ownProps,
		...stateProps,
		handlePlatform: (data) => {
			actions.handlePlatform(dispatch, data);
		},
		searchFilters: (payload, form) => {
			actions.searchFilters(dispatch, payload, form);
		},
	};
};

export default connect(mapStateToProps, undefined, mergeProps)(PopularSearches);
