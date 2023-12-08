import React from "react";
import avatar from "@assets/avatar.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { FaSpinner, FaYoutube } from "react-icons/fa";
import Button from "@components/global/Button";
import Anchor from "@components/global/Anchor";
import * as htmlToImage from "html-to-image";
import { jsPDF } from "jspdf";
import ProxyImage from "@components/ProxyImage";

const { actions } = require("@store/redux/CampaignRedux");

const A4_PAPER_DIMENSIONS = {
	width: 210,
	height: 297,
};
const A4_PAPER_RATIO = A4_PAPER_DIMENSIONS.width / A4_PAPER_DIMENSIONS.height;

const imageDimensionsOnA4 = (width, height) => {
	const isLandscapeImage = width >= height;
	if (isLandscapeImage) {
		return {
			width: A4_PAPER_DIMENSIONS.width,
			height: A4_PAPER_DIMENSIONS.width / (width / height),
		};
	}
	const imageRatio = width / height;
	if (imageRatio > A4_PAPER_RATIO) {
		const imageScaleFactor = (A4_PAPER_RATIO * height) / width;
		const scaledImageHeight = A4_PAPER_DIMENSIONS.height * imageScaleFactor;
		return {
			height: scaledImageHeight,
			width: scaledImageHeight * imageRatio,
		};
	}
	return {
		width: A4_PAPER_DIMENSIONS.height / (height / width),
		height: A4_PAPER_DIMENSIONS.height,
	};
};
export default function YoutubeMiniProfileInfo(props) {
	const dispatch = useDispatch();
	const influencer = useSelector(
		(state) => state.influencerSearch.influencer
	);
	const [loader, setLoader] = React.useState(false);
	const createCampaignInvite = (id) => {
		dispatch(
			actions.createCampaignInvite({ id: id, platform: props.platform })
		);
	};

	const {account, match} = (influencer || {});



	const exportPdf = async (title) => {
		setLoader(true)
		var nodess = document.getElementById("user-profile-page");
		const filter = (node) => {
			const exclusionClasses = ["ignore-element"];
			return !exclusionClasses.some((classname) =>
				node.classList?.contains(classname)
			);
		};
		await htmlToImage
			.toBlob(nodess, { quality: 0.95, filter: filter })
			.then(function (blob) {
				const doc = new jsPDF();
				const img = new Image();
				let url = URL.createObjectURL(blob);
				img.src = url;
				img.onload = () => {
					const imageDimensions = imageDimensionsOnA4(img.width, img.height);
					doc.addImage(
						img.src,
						blob.type,
						(A4_PAPER_DIMENSIONS.width - imageDimensions.width) / 2,
						(A4_PAPER_DIMENSIONS.height - imageDimensions.height) / 2,
						imageDimensions.width,
						imageDimensions.height
					);
					doc.save(title + ".pdf");
				};
			})
			.catch(function (error) {
				console.error("oops, something went wrong!", error);
			});
		setLoader(false)
	};

	return (
		<>
			<div className="grid grid-cols-12 gap-5">
				<div className="col-span-12">
					<div className="bg-white rounded-[8px] p-3 h-full lg:w-4/12 mx-auto px-[10px]">
						<div className="items-center flex flex-col h-full justify-center">
							<div className="w-36 h-36 relative mb-6">
								{account?.user_profile?.picture ? (
									<ProxyImage
										alt={account?.user_profile?.username}
										url={account?.user_profile?.picture}
										className="w-[130px] h-[130px] rounded-full shrink-0"
										addCancelToken={() => {}}
									/>
								) : (
									<ProxyImage
										alt={account?.user_profile?.username}
										url={avatar}
										className="w-[130px] h-[130px] rounded-full shrink-0"
										addCancelToken={() => {}}
									/>
								)}
							</div>
							<div className="w-full mb-6">
								<div className="flex items-center justify-center mt-4 mb-1">
									<FaYoutube size={22} className="darkGray" />
									<h3 className="ml-2 text-[28px] text-black font-medium">
										{account?.user_profile?.url ?  <a target={"_blank"} href={account?.user_profile?.url}>{(account?.user_profile?.username || account?.user_profile?.custom_name)}</a>
											: ""}
									</h3>
								</div>
								<p className="text-[12pt] font-normal pink text-center">
									{!!account?.user_profile?.description
										? truncate(account?.user_profile?.description)
										: ""}
								</p>
							</div>
							<div className="my-4 text-center">
								<div className="text-center inline-flex">
									<a
										target="_blank"
										rel="noopener noreferrer"
										className="px-3 border-[1px] border-[#f4f4f5] bg-[#f4f4f5] text-[#000000de] rounded-[8px] h-[36px] font-medium text-[18px] inline-flex items-center hover:opacity-80 mr-2"
										href={account?.user_profile?.url}
									>
										Follow
									</a>
								</div>
							</div>
							<div className="flex flex-wrap items-center justify-center gap-x-2 ignore-element">
								<div className="w-full mb-2 text-center">
									<Button
										onClick={() =>
											exportPdf(account?.user_profile?.username)
										}
										text={
											<>
												{loader ? (
													<FaSpinner className="animate-[spin_2s_linear_infinite] purple" />
												) : (
													<>Download PDF</>
												)}
											</>
										}
										className="px-3 border-[1px] border-[#7c3292] purple hover:bg-[#7c3292] hover:text-white rounded-[8px] h-[36px] text-[14px] inline-flex items-center"
									/>
								</div>
								<Anchor
									className="px-3 border-[1px] border-[#7c3292] bg-[#7c3292] text-white rounded-[8px] h-[36px] text-[14px] inline-flex items-center hover:opacity-80"
									text="Deep Scan"
									target={"_blank"}
									href={`/brand/influencer/${props.platform}/${account?.user_profile?.user_id}`}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

function truncate(input) {
	if (input.length > 50) {
		return input.substring(0, 50) + "...";
	}
	return input;
}
