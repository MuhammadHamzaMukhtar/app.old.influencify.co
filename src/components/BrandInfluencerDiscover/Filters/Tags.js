import React, { Component } from "react";
import { connect } from "react-redux";
import { HiHashtag, HiSpeakerphone } from "react-icons/hi";
import { IoCloseCircle } from "react-icons/io5";
import { ImUsers } from "react-icons/im";
import { VscMention } from "react-icons/vsc";
import { MdEmail } from "react-icons/md";

class Tags extends Component {
	removeSearchFilters = (key, index) => {
		const payload = Object.assign({}, this.props.payload);
		const form = Object.assign({}, this.props.form);

		switch (key) {
			case "audience_geo":
				if (typeof form["filter"][key][index] != "undefined") {
					let element = form["filter"][key][index];
					form["sortOptions"] = form["sortOptions"].filter((el) => {
						return el.value !== element.id;
					});
					payload["sort"]["field"] = "followers";
				}
				payload["filter"][key].splice(index, 1);
				form["filter"][key].splice(index, 1);
				break;
			case "geo":
				payload["filter"][key].splice(index, 1);
				form["filter"][key].splice(index, 1);
				break;
			case "username":
				payload["filter"][key] = {};
				form["filter"][key] = {};
				break;
			case "audience_lang":
				form["sortOptions"] = form["sortOptions"].filter((el) => {
					return el.value !== key;
				});
				payload["sort"]["field"] = "followers";
				delete payload["filter"][key];
				delete form["filter"][key];
				break;
			case "lang":
				delete payload["filter"][key];
				delete form["filter"][key];
				break;
			case "audience_brand":
				if (typeof form["filter"][key][index] != "undefined") {
					let element = form["filter"][key][index];
					form["sortOptions"] = form["sortOptions"].filter((el) => {
						return el.value !== element.id;
					});
					payload["sort"]["field"] = "followers";
				}
				payload["filter"][key].splice(index, 1);
				form["filter"][key].splice(index, 1);
				break;
			case "brand":
				payload["filter"][key].splice(index, 1);
				form["filter"][key].splice(index, 1);
				break;
			case "ads_brands":
				payload["filter"][key].splice(index, 1);
				form["filter"][key].splice(index, 1);
				break;
			case "has_ads":
				delete payload["filter"][key];
				delete form["filter"][key];
				break;
			case "audience_brand_category":
				if (typeof form["filter"][key][index] != "undefined") {
					let element = form["filter"][key][index];
					form["sortOptions"] = form["sortOptions"].filter((el) => {
						return el.value !== element.id;
					});
					payload["sort"]["field"] = "followers";
				}
				payload["filter"][key].splice(index, 1);
				form["filter"][key].splice(index, 1);
				break;
			case "brand_category":
				payload["filter"][key].splice(index, 1);
				form["filter"][key].splice(index, 1);
				break;
			case "audience_gender":
				form["sortOptions"] = form["sortOptions"].filter((el) => {
					return el.value !== key;
				});
				payload["sort"]["field"] = "followers";
				delete payload["filter"][key];
				delete form["filter"][key];
				break;
			case "gender":
				delete payload["filter"][key];
				delete form["filter"][key];
				break;
			case "audience_race":
				form["sortOptions"] = form["sortOptions"].filter((el) => {
					return el.value !== key;
				});
				payload["sort"]["field"] = "followers";
				delete payload["filter"][key];
				delete form["filter"][key];
				break;
			case "audience_age":
				form["sortOptions"] = form["sortOptions"].filter((el) => {
					return el.value !== key;
				});
				payload["sort"]["field"] = "followers";
				delete payload["filter"][key];
				delete form["filter"][key];
				break;
			case "age":
				delete payload["filter"][key];
				form["filter"][key] = { left_number: "18", right_number: "65" };
				break;
			case "with_contact":
				let payloadEmail = payload["filter"]["with_contact"]?.find((i) => i.type == 'email');
				if (payloadEmail) {
					payloadEmail.action = "not";
				}
				let formEmail = form["filter"]["with_contact"]?.find((i) => i.type == 'email');
				if (formEmail) {
					formEmail.action = "not";
				}
				break;
			case "text":
				delete payload["filter"][key];
				delete form["filter"][key];
				break;
			case "keywords":
				form["sortOptions"] = form["sortOptions"].filter((el) => {
					return el.value !== key;
				});
				payload["sort"]["field"] = "followers";
				delete payload["filter"][key];
				delete form["filter"][key];
				break;
			case "followers":
				delete payload["filter"][key];
				delete form["filter"][key];
				break;
			case "reels_plays":
				delete payload["filter"][key];
				delete form["filter"][key];
				break;
			case "views":
				form["sortOptions"] = form["sortOptions"].filter((el) => {
					return el.value !== key;
				});
				payload["sort"]["field"] = "followers";
				delete payload["filter"][key];
				delete form["filter"][key];
				break;
			case "engagements":
				delete payload["filter"][key];
				delete form["filter"][key];
				break;
			case "engagement_rate":
				form["sortOptions"] = form["sortOptions"].filter((el) => {
					return el.value !== key;
				});
				payload["sort"]["field"] = "followers";
				delete payload["filter"][key];
				delete form["filter"][key];
				break;
			case "last_posted":
				delete payload["filter"][key];
				delete form["filter"][key];
				break;
			case "account_type":
				payload["filter"][key].splice(index, 1);
				form["filter"][key].splice(index, 1);
				break;
			case "followers_growth":
				form["sortOptions"] = form["sortOptions"].filter((el) => {
					return el.value !== key;
				});
				payload["sort"]["field"] = "followers";
				delete payload["filter"][key];
				delete form["filter"][key];
				break;
			case "total_views_growth":
				form["sortOptions"] = form["sortOptions"].filter((el) => {
					return el.value !== key;
				});
				payload["sort"]["field"] = "followers";
				delete payload["filter"][key];
				delete form["filter"][key];
				break;
			case "total_likes_growth":
				form["sortOptions"] = form["sortOptions"].filter((el) => {
					return el.value !== key;
				});
				payload["sort"]["field"] = "followers";
				delete payload["filter"][key];
				delete form["filter"][key];
				break;
			case "relevance":
				form["relvance_value"].splice(index, 1);
				payload["filter"][key].value = form["relvance_value"].join(" ");
				form["filter"][key].splice(index, 1);
				if (!form["relvance_value"].length) {
					form["sortOptions"] = form["sortOptions"].filter((el) => {
						return el.value !== key;
					});
					payload["sort"]["field"] = "followers";
				}
				break;
			case "audience_relevance":
				form["sortOptions"] = form["sortOptions"].filter((el) => {
					return el.value !== key;
				});
				payload["sort"]["field"] = "followers";
				delete payload["filter"][key];
				delete form["filter"][key];
				break;
			case "text_tags":
				form["filter"][key].splice(index, 1);
				payload["filter"][key].splice(index, 1);
				break;
			case "audience_age_range":
				delete payload["filter"][key];
				form["filter"][key] = {
					left_number: "13",
					right_number: "65",
					weight: "0.01",
				};
				break;
			default:
				break;
		}

		payload["paging"]["skip"] = 0;
		form["loadMore"] = false;

		this.props.searchFilters(payload, form);
		this.requestInfluencerCount(payload);
	};

	requestInfluencerCount = (data) => {
		let payload = Object.assign({}, data);
		const actions = Object.assign([], this.props.actions);
		if (payload.filter.account_type) {
			if (payload.filter.account_type.includes("2")) {
				payload = {
					...payload,
					filter: {
						...payload.filter,
						account_type: [2],
					},
				};
			}
			if (payload.filter.account_type.includes("3")) {
				payload = {
					...payload,
					filter: {
						...payload.filter,
						account_type: [3],
					},
				};
			}
			if (payload.filter.account_type.includes("1")) {
				payload = {
					...payload,
					filter: {
						...payload.filter,
						account_type: [1, 3],
					},
				};
			}
		}
		if (actions.length > 0) {
			payload = {
				...payload,
				filter: {
					...payload.filter,
					actions: actions,
				},
			};
		}
		let query = {
			platform: this.props.platform,
			payload: payload,
		};

		this.props.searchInfluencersCount(query);
	};

	render() {
		const { form, payload } = this.props;
		const emailFilter = payload.filter.with_contact?.find((i) => (i.type == 'email' && i.action == 'should'));

		return (
			<div className="flex flex-wrap gap-4">
				{form.filter.audience_geo && form.filter.audience_geo.length
					? form.filter.audience_geo.map((item, index) => (
						<div
							className="bg-[#f7f7f7] rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center"
							key={index}
						>
							<ImUsers className="mr-2" color="#000" />
							<p className="text-[12px]">
								{item.name} {item.weight ? ">" + item.weight * 100 + "%" : ""}
							</p>
							<IoCloseCircle
								className="purple ml-2"
								size={18}
								onClick={() =>
									this.removeSearchFilters("audience_geo", index)
								}
							/>
						</div>
					))
					: ""}
				{form.filter.geo && form.filter.geo.length
					? form.filter.geo.map((item, index) => (
						<div
							className={`${form.filter.actions?.filter((el) => el.filter == "geo").length > 0 ? 'bg-[#FF5757] text-white' : 'bg-[#f7f7f7]'} rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center`}
							key={index}
						>
							<HiSpeakerphone className="mr-2 " color={`${form.filter.actions?.filter((el) => el.filter == 'geo').length > 0 ? '#fff' : '#000'}`} />
							<p className="text-[12px]">{item.name}</p>

							<IoCloseCircle
								className={`${form.filter.actions?.filter((el) => el.filter == 'geo').length > 0 ? 'white' : 'purple'} ml-1`}
								size={18}
								onClick={() => this.removeSearchFilters("geo", index)}
							/>
						</div>
					))
					: ""}

				{form.filter.audience_lang ? (
					<div className="bg-[#f7f7f7] rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center">
						<ImUsers className="mr-2" color="#000" />
						<p className="text-[12px]">
							{form.filter.audience_lang.name}{" "}
							{form.filter.audience_lang.weight
								? ">" + form.filter.audience_lang.weight * 100 + "%"
								: ""}
						</p>
						<IoCloseCircle
							className="purple ml-2"
							size={18}
							onClick={() => this.removeSearchFilters("audience_lang", "")}
						/>
					</div>
				) : (
					""
				)}

				{form.filter.lang ? (
					<div className={`${form.filter.actions?.filter((el) => el.filter == "lang").length > 0 ? 'bg-[#FF5757] text-white' : 'bg-[#f7f7f7]'} rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center`}>
						<HiSpeakerphone className="mr-2" color={`${form.filter.actions?.filter((el) => el.filter == "lang").length > 0 ? '#fff' : '#000'}`} />
						<p className="text-[12px]">
							{form.filter.lang.name}{" "}
							{form.filter.lang.weight
								? ">" + form.filter.lang.weight * 100 + "%"
								: ""}
						</p>

						<IoCloseCircle
							className={`${form.filter.actions?.filter((el) => el.filter == "lang").length > 0 ? 'white' : 'purple'} ml-1`}
							size={18}
							onClick={() => this.removeSearchFilters("lang", "")}
						/>
					</div>
				) : (
					""
				)}

				{form.filter.audience_brand && form.filter.audience_brand.length
					? form.filter.audience_brand.map((item, index) => (
						<div
							className="bg-[#f7f7f7] rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center"
							key={index}
						>
							<ImUsers className="mr-2" color="#000" />
							<p className="text-[12px]">
								{item.name} {item.weight ? ">" + item.weight * 100 + "%" : ""}
							</p>
							<IoCloseCircle
								className="purple ml-2"
								size={18}
								onClick={() =>
									this.removeSearchFilters("audience_brand", index)
								}
							/>
						</div>
					))
					: ""}

				{form.filter.brand && form.filter.brand.length
					? form.filter.brand.map((item, index) => (
						<div
							className={`${form.filter.actions?.filter((el) => el.filter == "brand").length > 0 ? 'bg-[#FF5757] text-white' : 'bg-[#f7f7f7]'} rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center`}
							key={index}
						>
							<HiSpeakerphone className="mr-2" color={`${form.filter.actions?.filter((el) => el.filter == "brand").length > 0 ? '#fff' : '#000'}`} />
							<p className="text-[12px]">{item.name}</p>
							<IoCloseCircle
								className={`${form.filter.actions?.filter((el) => el.filter == "brand").length > 0 ? 'white' : 'purple'} ml-1`}
								size={18}
								onClick={() => this.removeSearchFilters("brand", index)}
							/>
						</div>
					))
					: ""}

				{form.filter.ads_brands && form.filter.ads_brands.length
					? form.filter.ads_brands.map((item, index) => (
						<div
							className={`${form.filter.actions?.filter((el) => el.filter == "ads_brands").length > 0 ? 'bg-[#FF5757] text-white' : 'bg-[#f7f7f7]'} rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center`}
							key={index}
						>
							<HiSpeakerphone className="mr-2" color={`${form.filter.actions?.filter((el) => el.filter == "ads_brands").length > 0 ? '#fff' : '#000'}`} />
							<p className="text-[12px]">Affiliates:{item.name}</p>

							<IoCloseCircle
								className={`${form.filter.actions?.filter((el) => el.filter == "ads_brands").length > 0 ? 'white' : 'purple'} ml-1`}
								size={18}
								onClick={() => this.removeSearchFilters("ads_brands", index)}
							/>
						</div>
					))
					: ""}
				{form.filter.has_ads ? (
					<div className={`${form.filter.actions?.filter((el) => el.filter == "has_ads").length > 0 ? 'bg-[#FF5757] text-white' : 'bg-[#f7f7f7]'} rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center`}>
						<HiSpeakerphone className="mr-2" color={`${form.filter.actions?.filter((el) => el.filter == "has_ads").length > 0 ? '#fff' : '#000'}`} />
						<p className="text-[12px]">Affiliates:Any</p>

						<IoCloseCircle
							className={`${form.filter.actions?.filter((el) => el.filter == "has_ads").length > 0 ? 'white' : 'purple'} ml-1`}
							size={18}
							onClick={() => this.removeSearchFilters("has_ads", "")}
						/>
					</div>
				) : (
					""
				)}

				{form.filter.audience_brand_category &&
					form.filter.audience_brand_category.length
					? form.filter.audience_brand_category.map((item, index) => (
						<div
							className="bg-[#f7f7f7] rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center"
							key={index}
						>
							<ImUsers className="mr-2" color="#000" />
							<p className="text-[12px]">
								{item.name} {item.weight ? ">" + item.weight * 100 + "%" : ""}
							</p>
							<IoCloseCircle
								className="purple ml-2"
								size={18}
								onClick={() =>
									this.removeSearchFilters("audience_brand_category", index)
								}
							/>
						</div>
					))
					: ""}

				{form.filter.brand_category && form.filter.brand_category.length
					? form.filter.brand_category.map((item, index) => (
						<div
							className={`${form.filter.actions?.filter((el) => el.filter == "brand_category").length > 0 ? 'bg-[#FF5757] text-white' : 'bg-[#f7f7f7]'} rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center`}
							key={index}
						>
							<HiSpeakerphone className="mr-2 " color={`${form.filter.actions?.filter((el) => el.filter == "brand_category").length > 0 ? '#fff' : '#000'}`} />
							<p className="text-[12px]">{item.name}</p>

							<IoCloseCircle
								className={`${form.filter.actions?.filter((el) => el.filter == "brand_category").length > 0 ? 'white' : 'purple'} ml-1`}
								size={18}
								onClick={() =>
									this.removeSearchFilters("brand_category", index)
								}
							/>
						</div>
					))
					: ""}

				{form.filter.audience_gender ? (
					<div className="bg-[#f7f7f7] rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center">
						<ImUsers className="mr-2" color="#000" />
						<p className="text-[12px]">
							{form.filter.audience_gender.code}{" "}
							{form.filter.audience_gender.weight
								? ">" + form.filter.audience_gender.weight * 100 + "%"
								: ""}
						</p>
						<IoCloseCircle
							className="purple ml-2"
							size={18}
							onClick={() => this.removeSearchFilters("audience_gender", "")}
						/>
					</div>
				) : (
					""
				)}

				{form.filter.gender ? (
					<div className={`${form.filter.actions?.filter((el) => el.filter == "gender").length > 0 ? 'bg-[#FF5757] text-white' : 'bg-[#f7f7f7]'} rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center`}>
						<HiSpeakerphone className="mr-2" color={`${form.filter.actions?.filter((el) => el.filter == "gender").length > 0 ? '#fff' : '#000'}`} />
						<p className="text-[12px]">{form.filter.gender.code}</p>

						<IoCloseCircle
							className={`${form.filter.actions?.filter((el) => el.filter == "gender").length > 0 ? 'white' : 'purple'} ml-1`}
							size={18}
							onClick={() => this.removeSearchFilters("gender", "")}
						/>
					</div>
				) : (
					""
				)}

				{form.filter.audience_race ? (
					<div className="bg-[#f7f7f7] rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center">
						<ImUsers className="mr-2" color="#000" />
						<p className="text-[12px]">
							{form.filter.audience_race.code}{" "}
							{form.filter.audience_race.weight
								? ">" + form.filter.audience_race.weight * 100 + "%"
								: ""}
						</p>
						<IoCloseCircle
							className="purple ml-2"
							size={18}
							onClick={() => this.removeSearchFilters("audience_race", "")}
						/>
					</div>
				) : (
					""
				)}

				{form.filter.audience_age && form.filter.audience_age.length
					? form.filter.audience_age.map((item, index) => (
						<div
							className="bg-[#f7f7f7] rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center"
							key={index}
						>
							<ImUsers className="mr-2" color="#000" />
							<p className="text-[12px]">
								{item.code} y.o{" "}
								{item.weight ? ">" + item.weight * 100 + "%" : ""}
							</p>
							<IoCloseCircle
								className="purple ml-2"
								size={18}
								onClick={() =>
									this.removeSearchFilters("audience_age", index)
								}
							/>
						</div>
					))
					: ""}
				{payload.filter.audience_age_range &&
					payload.filter.audience_age_range && (
						<div className="bg-[#f7f7f7] rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center">
							<ImUsers className="mr-2" color="#000" />
							<p className="text-[12px]">
								{payload.filter.audience_age_range.left_number} -{" "}
								{payload.filter.audience_age_range.right_number} y.o{" "}
								{payload.filter.audience_age_range.weight &&
									">" + payload.filter.audience_age_range.weight * 100 + "%"}
							</p>
							<IoCloseCircle
								className="purple ml-2"
								size={18}
								onClick={() =>
									this.removeSearchFilters("audience_age_range", "")
								}
							/>
						</div>
					)}
				{payload.filter.age ? (
					<div className={`${form.filter.actions?.filter((el) => el.filter == "age").length > 0 ? 'bg-[#FF5757] text-white' : 'bg-[#f7f7f7]'} rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center`}>
						<HiSpeakerphone className="mr-2" color={`${form.filter.actions?.filter((el) => el.filter == "age").length > 0 ? '#fff' : '#000'}`} />
						<p className="text-[12px]">
							{payload.filter.age.left_number}-{" "}
							{payload.filter.age.right_number} y.o
						</p>

						<IoCloseCircle
							className={`${form.filter.actions?.filter((el) => el.filter == "age").length > 0 ? 'white' : 'purple'} ml-1`}
							size={18}
							onClick={() => this.removeSearchFilters("age", "")}
						/>
					</div>
				) : (
					""
				)}

				{emailFilter ? (
					<div className={`${form.filter.actions?.with_contact?.filter((el) => el.type == "email" && el.action == "should").length > 0 ? 'bg-[#FF5757] text-white' : 'bg-[#f7f7f7]'} rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center`}>
						<MdEmail className="mr-2" />
						<p className="text-[12px]">
							Has email
						</p>

						<IoCloseCircle
							className='purple ml-1'
							size={18}
							onClick={() => this.removeSearchFilters("with_contact", "email")}
						/>
					</div>
				) : (
					""
				)}

				{form.filter.text ? (
					<div className={`${form.filter.actions?.filter((el) => el.filter == "text").length > 0 ? 'bg-[#FF5757] text-white' : 'bg-[#f7f7f7]'} rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center`}>
						<HiSpeakerphone className="mr-2" color={`${form.filter.actions?.filter((el) => el.filter == "text").length > 0 ? '#fff' : '#000'}`} />
						<p className="text-[12px]">{form.filter.text}</p>

						<IoCloseCircle
							className={`${form.filter.actions?.filter((el) => el.filter == "text").length > 0 ? 'white' : 'purple'} ml-1`}
							size={18}
							onClick={() => this.removeSearchFilters("text", "")}
						/>
					</div>
				) : (
					""
				)}

				{form.filter.keywords ? (
					<div className={`${form.filter.actions?.filter((el) => el.filter == "keywords").length > 0 ? 'bg-[#FF5757] text-white' : 'bg-[#f7f7f7]'} rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center`}>
						<HiSpeakerphone className="mr-2" color={`${form.filter.actions?.filter((el) => el.filter == "keywords").length > 0 ? '#fff' : '#000'}`} />
						<p className="text-[12px]">{form.filter.keywords}</p>
						<IoCloseCircle
							className={`${form.filter.actions?.filter((el) => el.filter == "keywords").length > 0 ? 'white' : 'purple'} ml-1`}
							size={18}
							onClick={() => this.removeSearchFilters("keywords", "")}
						/>
					</div>
				) : (
					""
				)}

				{form.filter.followers ? (
					<div className={`${form.filter.actions?.filter((el) => el.filter == "followers").length > 0 ? 'bg-[#FF5757] text-white' : 'bg-[#f7f7f7]'} rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center`}>
						<HiSpeakerphone className="mr-2" color={`${form.filter.actions?.filter((el) => el.filter == "followers").length > 0 ? '#fff' : '#000'}`} />
						<p className="text-[12px]">
							Followers:
							{form.filter.followers.left_number
								? form.filter.followers.left_number
								: "up to"}
							{form.filter.followers.right_number
								? "-" + form.filter.followers.right_number
								: "+"}
						</p>
						<IoCloseCircle
							className={`${form.filter.actions?.filter((el) => el.filter == "followers").length > 0 ? 'white' : 'purple'} ml-1`}
							size={18}
							onClick={() => this.removeSearchFilters("followers", "")}
						/>
					</div>
				) : (
					""
				)}

				{form.filter.reels_plays ? (
					<div className="bg-[#f7f7f7] rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center">
						<HiSpeakerphone className="mr-2" color="#000" />
						<p className="text-[12px]">
							Reels Plays:
							{form.filter.reels_plays.left_number
								? form.filter.reels_plays.left_number
								: "up to"}
							{form.filter.reels_plays.right_number
								? "-" + form.filter.reels_plays.right_number
								: "+"}
						</p>
						<IoCloseCircle
							className="purple ml-2"
							size={18}
							onClick={() => this.removeSearchFilters("reels_plays", "")}
						/>
					</div>
				) : (
					""
				)}

				{form.filter.views ? (
					<div className={`${form.filter.actions?.filter((el) => el.filter == "views").length > 0 ? 'bg-[#FF5757] text-white' : 'bg-[#f7f7f7]'} rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center`}>
						<HiSpeakerphone className="mr-2" color={`${form.filter.actions?.filter((el) => el.filter == "views").length > 0 ? '#fff' : '#000'}`} />
						<p className="text-[12px]">
							Views:
							{form.filter.views.left_number
								? form.filter.views.left_number
								: "up to"}
							{form.filter.views.right_number
								? "-" + form.filter.views.right_number
								: "+"}
						</p>
						<IoCloseCircle
							className={`${form.filter.actions?.filter((el) => el.filter == "views").length > 0 ? 'white' : 'purple'} ml-1`}
							size={18}
							onClick={() => this.removeSearchFilters("views", "")}
						/>
					</div>
				) : (
					""
				)}

				{form.filter.engagements ? (
					<div className={`${form.filter.actions?.filter((el) => el.filter == "engagements").length > 0 ? 'bg-[#FF5757] text-white' : 'bg-[#f7f7f7]'} rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center`}>
						<HiSpeakerphone className="mr-2" color={`${form.filter.actions?.filter((el) => el.filter == "engagements").length > 0 ? '#fff' : '#000'}`} />
						<p className="text-[12px]">
							Engagements:
							{form.filter.engagements.left_number
								? form.filter.engagements.left_number
								: "up to"}
							{form.filter.engagements.right_number
								? "-" + form.filter.engagements.right_number
								: "+"}
						</p>
						<IoCloseCircle
							className={`${form.filter.actions?.filter((el) => el.filter == "engagements").length > 0 ? 'white' : 'purple'} ml-1`}
							size={18}
							onClick={() => this.removeSearchFilters("engagements", "")}
						/>
					</div>
				) : (
					""
				)}

				{form.filter.engagement_rate ? (
					<div className={`${form.filter.actions?.filter((el) => el.filter == "engagement_rate").length > 0 ? 'bg-[#FF5757] text-white' : 'bg-[#f7f7f7]'} rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center`}>
						<HiSpeakerphone className="mr-2" color={`${form.filter.actions?.filter((el) => el.filter == "engagement_rate").length > 0 ? '#fff' : '#000'}`} />
						<p className="text-[12px]">
							Engagement Rate: ≥{form.filter.engagement_rate.value * 100}%
						</p>
						<IoCloseCircle
							className={`${form.filter.actions?.filter((el) => el.filter == "engagement_rate").length > 0 ? 'white' : 'purple'} ml-1`}
							size={18}
							onClick={() => this.removeSearchFilters("engagement_rate", "")}
						/>
					</div>
				) : (
					""
				)}

				{form.filter.last_posted ? (
					<div className={`${form.filter.actions?.filter((el) => el.filter == "last_posted").length > 0 ? 'bg-[#FF5757] text-white' : 'bg-[#f7f7f7]'} rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center`}>
						<HiSpeakerphone className="mr-2" color={`${form.filter.actions?.filter((el) => el.filter == "last_posted").length > 0 ? '#fff' : '#000'}`} />
						<p className="text-[12px]">Last Post: {form.filter.last_posted}</p>
						<IoCloseCircle
							className={`${form.filter.actions?.filter((el) => el.filter == "last_posted").length > 0 ? 'white' : 'purple'} ml-1`}
							size={18}
							onClick={() => this.removeSearchFilters("last_posted", "")}
						/>
					</div>
				) : (
					""
				)}
				{form.filter.account_type && form.filter.account_type.length
					? form.filter.account_type.map((item, index) => (
						<div
							className={`${form.filter.actions?.filter((el) => el.filter == "account_type").length > 0 ? 'bg-[#FF5757] text-white' : 'bg-[#f7f7f7]'} rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center`}
							key={index}
						>
							<HiSpeakerphone className="mr-2" color={`${form.filter.actions?.filter((el) => el.filter == "account_type").length > 0 ? '#fff' : '#000'}`} />
							{item == 1 ? (
								<p className="text-[12px]">Account Type: Regular</p>
							) : (
								""
							)}
							{item == 2 ? (
								<p className="text-[12px]">Account Type: Business</p>
							) : (
								""
							)}
							{item == 3 ? (
								<p className="text-[12px]">Account Type: Creator</p>
							) : (
								""
							)}
							<IoCloseCircle
								className={`${form.filter.actions?.filter((el) => el.filter == "account_type").length > 0 ? 'white' : 'purple'} ml-1`}
								size={18}
								onClick={() =>
									this.removeSearchFilters("account_type", index)
								}
							/>
						</div>
					))
					: ""}

				{form.filter.followers_growth ? (
					<div className="bg-[#f7f7f7] rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center">
						<HiSpeakerphone className="mr-2" color="#000" />
						<p className="text-[12px]">
							Followers Growth:{" "}
							{form.filter.followers_growth.interval.replace(/[^\d.]/g, "")}{" "}
							months{" "}
							{form.filter.followers_growth.operator === "lte" ? "<" : ">"}
							{form.filter.followers_growth.value * 100}%
						</p>
						<IoCloseCircle
							className="purple ml-2"
							size={18}
							onClick={() => this.removeSearchFilters("followers_growth", "")}
						/>
					</div>
				) : (
					""
				)}

				{form.filter.total_views_growth ? (
					<div className="bg-[#f7f7f7] rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center">
						<HiSpeakerphone className="mr-2" color="#000" />
						<p className="text-[12px]">
							Total Views Growth:{" "}
							{form.filter.total_views_growth.interval.replace(/[^\d.]/g, "")}{" "}
							months{" "}
							{form.filter.total_views_growth.operator === "lte" ? "<" : ">"}
							{form.filter.total_views_growth.value * 100}%
						</p>
						<IoCloseCircle
							className="purple ml-2"
							size={18}
							onClick={() => this.removeSearchFilters("total_views_growth", "")}
						/>
					</div>
				) : (
					""
				)}

				{form.filter.total_likes_growth ? (
					<div className="bg-[#f7f7f7] rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center">
						<HiSpeakerphone className="mr-2" color="#000" />
						<p className="text-[12px]">
							Total Likes Growth:{" "}
							{form.filter.total_likes_growth.interval.replace(/[^\d.]/g, "")}{" "}
							months{" "}
							{form.filter.total_likes_growth.operator === "lte" ? "<" : ">"}
							{form.filter.total_likes_growth.value * 100}%
						</p>
						<IoCloseCircle
							className="purple ml-2"
							size={18}
							onClick={() => this.removeSearchFilters("total_likes_growth", "")}
						/>
					</div>
				) : (
					""
				)}

				{form.filter.audience_relevance ? (
					<div className="bg-[#f7f7f7] rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center">
						<ImUsers className="mr-2" color="#000" />
						<p className="text-[12px]">
							Lookalike: {form.filter.audience_relevance.value}
						</p>
						<IoCloseCircle
							className="purple ml-2"
							size={18}
							onClick={() => this.removeSearchFilters("audience_relevance", "")}
						/>
					</div>
				) : (
					""
				)}
				{form.filter.relevance && form.filter.relevance.length
					? form.filter.relevance.map((item, index) => (
						<div
							className={`${form.filter.actions?.filter((el) => el.filter == "relevance").length > 0 ? 'bg-[#FF5757] text-white' : 'bg-[#f7f7f7]'} rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center`}
							key={index}
						>
							<HiSpeakerphone className="mr-2" color={`${form.filter.actions?.filter((el) => el.filter == "relevance").length > 0 ? '#fff' : '#000'}`} />
							{item.type === "topic" ? (
								<p className="text-[12px]">
									Relevance:{" "}
									{item && item.value ? item.value.replace(/^#/, "") : ""}
								</p>
							) : (
								<p className="text-[12px]">Similar: {item.value}</p>
							)}
							<IoCloseCircle
								className={`${form.filter.actions?.filter((el) => el.filter == "relevance").length > 0 ? 'white' : 'purple'} ml-1`}
								size={18}
								onClick={() => this.removeSearchFilters("relevance", index)}
							/>
						</div>
					))
					: ""}
				{form.filter.text_tags && form.filter.text_tags.length
					? form.filter.text_tags.map((item, index) => (
						<div
							className="bg-[#f7f7f7] rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center"
							key={index}
						>
							{item.type === "hashtag" ? (
								<>
									<HiHashtag className="mr-2" color="#000" />
									<p className="text-[12px]">
										{item && item.value ? item.value.replace(/^#/, "") : ""}
									</p>
								</>
							) : (
								<>
									<VscMention className="mr-1 text-[18px]" color="#000" />
									<p className="text-[12px]">{item.value}</p>
								</>
							)}
							<IoCloseCircle
								className="purple ml-2"
								size={18}
								onClick={() => this.removeSearchFilters("text_tags", index)}
							/>
						</div>
					))
					: ""}
				{
					form.filter.username && form.filter.username.value
						?
						<div
							className="bg-[#f7f7f7] rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center"
						>
							<VscMention className="mr-1 text-[18px]" color="#000" />
							<p className="text-[12px]">{form.filter.username.value}</p>
							<IoCloseCircle
								className="purple ml-2"
								size={18}
								onClick={() => this.removeSearchFilters("username")}
							/>
						</div>
						: ""
				}
			</div>
		);
	}
}

const mapStateToProps = ({ influencerSearch }) => {
	return {
		payload: influencerSearch.payload,
		platform: influencerSearch.platform,
		form: influencerSearch.form,
		actions: influencerSearch.actions,
	};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const { dispatch } = dispatchProps;
	const { actions } = require("@store/redux/InfluencerSearchRedux");
	return {
		...ownProps,
		...stateProps,
		searchFilters: (payload, form) => {
			actions.searchFilters(dispatch, payload, form);
		},
		searchInfluencersCount: (data) => {
			actions.searchInfluencersCount(dispatch, data);
		},
		addInfluencerActions: (data) =>
			dispatch(actions.addInfluencerActions(data)),
		InfluencerActions: (data) =>
			actions.influencerActions(dispatch, data),
	};
};

export default connect(mapStateToProps, undefined, mergeProps)(Tags);


// filter = [];
// 	actions:{
// delete filter.actions.[]
// filter = {
// 	...filter,
// 	actions:{
// 		...filter.actions,
// 		[type]:value
// 	}
// }
