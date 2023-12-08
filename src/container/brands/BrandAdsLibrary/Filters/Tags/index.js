import React, { Component } from "react";
import { HiSpeakerphone } from "react-icons/hi";
import { IoCloseCircle } from "react-icons/io5";
import { connect } from "react-redux";

const capitalize = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

class Tags extends Component {
	handlePlatformChange = (id) => {
		let payload = Object.assign({}, this.props.payload);
		let platforms = Object.assign([], payload.platforms);
		if (platforms.includes(id)) {
			platforms.splice(platforms.indexOf(id), 1);
		} else {
			platforms.push(id);
		}
		payload.platforms = platforms;
		this.props.addFilterPayload(payload);
	};

	addFilterPayload = (key) => {
		let payload = Object.assign({}, this.props.payload);
		key.forEach((k) => {
			payload[k] = "";
		});
		this.props.addFilterPayload(payload);
	};

	render() {
		const { payload, platforms } = this.props;
		const selectedPlatforms = Object.assign([], payload.platforms);
		return (
			<>
				{payload && payload.FromLikes && payload.ToLikes && (
					<div className="bg-[#f7f7f7] rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center  my-2 mr-2">
						<HiSpeakerphone className="mr-2" color="#000" />
						<p className="text-[12px]">
							Likes: {payload.FromLikes} - {payload.ToLikes}
						</p>
						<IoCloseCircle
							onClick={() => this.addFilterPayload(["FromLikes", "ToLikes"])}
							className="purple ml-2"
							size={18}
						/>
					</div>
				)}

				{payload &&
					payload.FromLikes &&
					(typeof payload.ToLikes === "undefined" ||
						payload.ToLikes === "") && (
						<div className="bg-[#f7f7f7] rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center  my-2 mr-2">
							<HiSpeakerphone className="mr-2" color="#000" />
							<p className="text-[12px]">Likes: {payload.FromLikes}+</p>
							<IoCloseCircle
								onClick={() => this.addFilterPayload(["FromLikes"])}
								className="purple ml-2"
								size={18}
							/>
						</div>
					)}

				{payload &&
					(typeof payload.FromLikes === "undefined" ||
						payload.FromLikes === "") &&
					payload.ToLikes && (
						<div className="bg-[#f7f7f7] rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center  my-2 mr-2">
							<HiSpeakerphone className="mr-2" color="#000" />
							<p className="text-[12px]">{`Likes: < ${payload.ToLikes}`}</p>
							<IoCloseCircle
								onClick={() => this.addFilterPayload(["ToLikes"])}
								className="purple ml-2"
								size={18}
							/>
						</div>
					)}
				{payload && payload.FromComments && payload.ToComments && (
					<div className="bg-[#f7f7f7] rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center  my-2 mr-2">
						<HiSpeakerphone className="mr-2" color="#000" />
						<p className="text-[12px]">
							Comments: {payload.FromComments} - {payload.ToComments}
						</p>
						<IoCloseCircle
							onClick={() =>
								this.addFilterPayload(["FromComments", "ToComments"])
							}
							className="purple ml-2"
							size={18}
						/>
					</div>
				)}

				{payload &&
					payload.FromComments &&
					(typeof payload.ToComments === "undefined" ||
						payload.ToComments === "") && (
						<div className="bg-[#f7f7f7] rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center  my-2 mr-2">
							<HiSpeakerphone className="mr-2" color="#000" />
							<p className="text-[12px]">Comments: {payload.FromComments}+</p>
							<IoCloseCircle
								onClick={() => this.addFilterPayload(["FromComments"])}
								className="purple ml-2"
								size={18}
							/>
						</div>
					)}

				{payload &&
					(typeof payload.FromComments === "undefined" ||
						payload.FromComments === "") &&
					payload.ToComments && (
						<div className="bg-[#f7f7f7] rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center  my-2 mr-2">
							<HiSpeakerphone className="mr-2" color="#000" />
							<p className="text-[12px]">{`Comments: < ${payload.ToComments}`}</p>
							<IoCloseCircle
								onClick={() => this.addFilterPayload(["ToComments"])}
								className="purple ml-2"
								size={18}
							/>
						</div>
					)}
				{platforms &&
					platforms.length > 0 &&
					platforms
						.filter((i) => selectedPlatforms.includes(i.id))
						.map((platform, key) => (
							<div
								key={key}
								className="bg-[#f7f7f7] rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center  my-2 mr-2"
							>
								<HiSpeakerphone className="mr-2" color="#000" />
								<p className="text-[12px]">
									Platform : {capitalize(platform.name)}
								</p>
								<IoCloseCircle
									onClick={() => this.handlePlatformChange(platform.id)}
									className="purple ml-2"
									size={18}
								/>
							</div>
						))}
			</>
		);
	}
}
const mapStateToProps = ({ AdLibrary, SettingPlatformReducer }) => {
	return {
		payload: AdLibrary.payload,
		platforms: SettingPlatformReducer.platforms,
	};
};
const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/AdLibraryRedux");
	return {
		addFilterPayload: (data) => {
			actions.addFilterPayload(dispatch, data);
		},
		applyFilters: (data) => {
			actions.applyFilters(dispatch, data);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
