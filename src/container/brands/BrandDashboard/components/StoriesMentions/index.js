import { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { FiChevronLeft, FiChevronRight, FiHeart } from "react-icons/fi";
import { BiCommentDots } from "react-icons/bi";
import { IoLayersOutline } from "react-icons/io5";
import Influencify from "../../../../../constants/Influencify";
import InstagramLogo from "@assets/instagram_logo.png";
import { AiFillCaretDown } from "react-icons/ai";
import { Transition, Listbox } from "@headlessui/react";
import "./style.css";

const postMentions = [
	{
		key: "1",
		text: "Story",
		value: "Story",
		src: InstagramLogo,
	},
];

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

class StoriesMentions extends Component {
	constructor(props) {
		super(props);
		this.timeout = 0;
		this.state = {
			data: [],
			post: postMentions[0],
		};
	}

	async componentDidMount() {
		const json = await Influencify.businessDiscoveryStories();
		if (json !== undefined) {
			if (json.status === 200) {
				this.setState({ data: json.data });
			}
		}
	}
	handleChange = (platform) => {
		this.setState({ platform: platform });
	};

	defaultValue = (object, value) => {
		const txt = Object.assign(
			{},
			object.find((o) => o.value === value)
		);
		return txt.text;
	};

	render() {
		const { data } = this.state;
		const settings = {
			className: "center",
			dots: false,
			nextArrow: <SampleNextArrow />,
			prevArrow: <SamplePrevArrow />,
			responsive: [
				{
					breakpoint: 9024,
					settings: {
						infinite: false,
						slidesToShow: 5,
						centerPadding: "60px",
					},
				},
				{
					breakpoint: 1024,
					settings: {
						centerMode: false,
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
		if (data && data.length === 0) {
			return <></>;
		}
		return (
			<>
				<div className="flex flex-wrap">
					<div className="lg:w-3/12 md:7/12 sm:6/12 w-full">
						<Listbox onChange={(value) => this.handleChange(value)}>
							<div className="relative w-full z-50">
								<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
									<span className="flex items-center whitespace-nowrap">
										<img
											src={this.state.post.src}
											className="w-6 h-6 rounded-full mr-2"
											alt={this.state.post.value}
										/>
										{this.state.post.value}
									</span>
									<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
										<AiFillCaretDown
											size={12}
											className="text-black opacity-80"
											aria-hidden="true"
										/>
									</span>
								</Listbox.Button>
								<Transition
									as={Fragment}
									leave="transition ease-in duration-100"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<Listbox.Options className="absolute max-h-60 -mt-[5px] w-full overflow-auto rounded-md bg-white py-1 text-[14px] shadow-[0_2px_3px_0_#22242626] focus:outline-none sm:text-sm z-50">
										{postMentions.map((sort, key) => (
											<Listbox.Option
												key={key}
												className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
													sort === this.state.post ? "bg-[#00000008]" : ""
												}`}
												value={sort}
											>
												<span
													className={`flex items-center ${
														sort === this.state.post
															? "purple font-semibold"
															: "text-gray-900 font-medium"
													}`}
												>
													<img
														src={sort.src}
														className="w-6 h-6 rounded-full mr-2"
														alt={sort.text}
													/>
													{sort.text}
												</span>
											</Listbox.Option>
										))}
									</Listbox.Options>
								</Transition>
							</div>
						</Listbox>
					</div>
				</div>
				<div className="infl-slick-carousel story-mention">
					<Slider {...settings} className="equal-height">
						{data.map(
							(item, key) =>
								item.media_url && (
									<div key={key} className="px-2 py-[0.5rem] h-full">
										<div className="bg-white rounded-[8px] p-2 mb-6 sm:!mb-0 h-full flex items-center justify-between cursor-pointer shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] flex-col">
											<Link
												to="#"
												className="min-h-[190px] object-contain relative"
											>
												{item.media_type === "VIDEO" ? (
													<div>
														<video
															controls
															className=" rounded-[8px] min-h-[190px] object-contain w-full"
															src={item.media_url}
														></video>
													</div>
												) : (
													<div>
														<img
															className="rounded-[8px] min-h-[190px] max-h-[200px] object-contain w-full"
															src={item.media_url}
															alt="VIDEO"
														/>
													</div>
												)}
												<div
													className={`p-0 flex justify-start items-end flex-col rounded-t-[8px] ${
														item.media_type === "VIDEO"
															? ""
															: "absolute top-0 w-full h-full bg-[#282b3c66]"
													}`}
												>
													{item.media_type === "CAROUSEL_ALBUM" && (
														<div className="bg-white h-8 w-8 rounded-b-[8px] -mr-2 flex items-center justify-center">
															<IoLayersOutline className="darkGray" size={13} />
														</div>
													)}
												</div>
											</Link>

											<div className="pt-2 px-[1rem] pb-2 relative mt-8">
												<div className="flex justify-center items-center gap-x-4">
													<div className="flex items-center gap-x-1">
														<FiHeart color="#1D80DC" size={14} />
														<p className="text-[12px] black font-medium">
															{item.like_count}
														</p>
													</div>
													<div className="flex items-center gap-x-1">
														<BiCommentDots color="#1D80DC" size={14} />
														<p className="text-[12px] black font-medium">
															{item.comments_count}
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								)
						)}
					</Slider>
				</div>
			</>
		);
	}
}

export default StoriesMentions;
