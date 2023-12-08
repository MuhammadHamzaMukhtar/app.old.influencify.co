import { Component, Fragment } from "react";
import Button from "@components/global/Button";
import { BsSortDownAlt } from "react-icons/bs";
import { Transition, Listbox } from "@headlessui/react";
import { AiFillCaretDown } from "react-icons/ai";
import ItemCard from "./ItemCard";
import Loader from "@components/global/Loader";
import { connect } from "react-redux";
import { FaSpinner } from "react-icons/fa";

const instagramOptions = [
	{
		key: "Impressions ascending",
		text: "Impressions ascending",
		value: "impression|asc",
	},
	{
		key: "Impressions descending",
		text: "Impressions descending",
		value: "impression|desc",
	},
	{
		key: "Newest first",
		text: "Newest first",
		value: "ad_key|asc",
	},
	{
		key: "Oldest First",
		text: "Oldest First",
		value: "ad_key|desc",
	},
];

const youtubeOptions = [
	{
		key: "Views ascending",
		text: "Views ascending",
		value: "view_count|asc",
	},
	{
		key: "Views descending",
		text: "Views descending",
		value: "view_count|desc",
	},
	{
		key: "Newest first",
		text: "Newest first",
		value: "ad_key|asc",
	},
	{
		key: "Oldest First",
		text: "Oldest First",
		value: "ad_key|desc",
	},
];

const tiktokOptions = [
	{
		key: "likes ascending",
		text: "likes ascending",
		value: "like_count|asc",
	},
	{
		key: "likes descending",
		text: "likes descending",
		value: "like_count|desc",
	},
	{
		key: "Comments ascending",
		text: "Comments ascending",
		value: "comment_count|asc",
	},
	{
		key: "Comments descending",
		text: "Comments descending",
		value: "comment_count|desc",
	},
	{
		key: "Newest first",
		text: "Newest first",
		value: "ad_key|asc",
	},
	{
		key: "Oldest First",
		text: "Oldest First",
		value: "ad_key|desc",
	},
];

class Content extends Component {
	constructor(props) {
		super(props);
		this.state = {
			url: "",
			setValue: "ad_key|asc",
		};
	}

	addFilterPayload = (key, value) => {
		let payload = Object.assign({}, this.props.payload);
		payload[key] = value;
		this.props.addFilterPayload(payload);
		setTimeout(() => {
			this.props.fetchAdsLibrary(true);
		}, 500);
		this.setState({ setValue: value });
	};

	play = (id) => {
		setTimeout(() => {
			document.querySelectorAll("video").forEach((vid) => vid.pause());
			document
				.querySelectorAll(".play-button")
				.forEach((div) => (div.style.display = "block"));
			if (document.getElementById("play-" + id)) {
				document.getElementById("play-" + id).play();
				document.getElementById("button-" + id).style.display = "none";
			}
		}, 200);
	};

	pause = (id) => {
		if (document.getElementById("button-" + id).style.display === "none") {
			document.getElementById("play-" + id).pause();
			document.getElementById("button-" + id).style.display = "block";
		}
	};

	defaultValue = (object, value) => {
		const txt = Object.assign(
			{},
			object.find((o) => o.value === value)
		);
		return txt.text;
	};

	render() {
		const payload = Object.assign({}, this.props.payload);
		const { isLoading, items, total, is_loading_more } = this.props;
		if (isLoading) {
			return (
				<Loader
					className="h-[60vh] w-full flex justify-center items-center"
					size="67"
				/>
			);
		}
		let platformOptions =
			payload.platforms === "instagram"
				? instagramOptions
				: payload.platforms === "youtube"
				? youtubeOptions
				: tiktokOptions;
		return (
			<>
				{items && items.length > 0 ? (
					<>
						<div className="flex items-center justify-center flex-wrap">
							<div className="flex xs:flex-nowrap flex-wrap xs:w-auto w-full items-center mr-auto sm:!mb-0 mb-4">
								<div className="flex mr-2 items-center">
									<BsSortDownAlt size="20" className="mr-1" />
									<p>Sort by:</p>
								</div>
								<Listbox
									onChange={(data) => this.addFilterPayload("sortFilter", data)}
								>
									<div className="relative xxs:w-[15em] w-full z-40">
										<Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
											<span className="block">
												{this.defaultValue(
													platformOptions,
													this.state.setValue
												)}
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
												{platformOptions.map((sort, key) => (
													<Listbox.Option
														key={key}
														className={`relative cursor-pointer select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem] ${
															sort.value === this.state.setValue
																? "bg-[#00000008]"
																: ""
														}`}
														value={sort.value}
													>
														<span
															className={`block ${
																sort.value === this.state.setValue
																	? "purple font-semibold"
																	: "text-gray-900 font-medium"
															}`}
														>
															{sort.text}
														</span>
													</Listbox.Option>
												))}
											</Listbox.Options>
										</Transition>
									</div>
								</Listbox>
							</div>
							<div className="flex items-center mr-2 ml-auto md:absolute">
								Show {(total || 0).toLocaleString()} results
							</div>
						</div>
						<div className="grid grid-cols-12 gap-5 mt-12">
							{items.map((item, index) => (
								<ItemCard
									play={this.play}
									pause={this.pause}
									key={index}
									item={item}
									isLoading={isLoading}
								/>
							))}
						</div>
					</>
				) : (
					<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
						We have nothing to show you here.
					</div>
				)}
				<div className="m-form__actions m-form__actions clearfix py-3 flex justify-center">
					{items &&
						total > items.length &&
						(!is_loading_more ? (
							<Button
								onClick={() => this.props.fetchAdsLibrary(false)}
								className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
								text="Load more"
							/>
						) : (
							<FaSpinner className="animate-[spin_2s_linear_infinite] pink text-[19px]" />
						))}
				</div>
			</>
		);
	}
}
const mapStateToProps = ({ AdLibrary }) => {
	return {
		payload: AdLibrary.payload,
		isLoading: AdLibrary.is_loading,
		items: AdLibrary.items,
		total: AdLibrary.total,
		is_loading_more: AdLibrary.is_loading_more,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/AdLibraryRedux");
	return {
		changePageUrl: (page) => {
			actions.changePageUrl(dispatch, page);
		},
		applyFilters: (query) => {
			actions.applyFilters(dispatch, query);
		},
		addFilterPayload: (data) => {
			actions.addFilterPayload(dispatch, data);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
