import React from "react";
import avatar from "@assets/avatar.png";
import { useSelector } from "react-redux";
import Followers from "@assets/svgs/followers_alt.svg";
import Credibility from "@assets/svgs/profile_credibility.svg";
import Activity from "@assets/svgs/activity.svg";
import { FiCheck } from "react-icons/fi";
import EngagementRateGraph from "./EngagementRateGraph";
import { FaSpinner } from "react-icons/fa";
import LinkTo from "@components/global/LinkTo";
import Button from "@components/global/Button";
import Anchor from "@components/global/Anchor";
import * as htmlToImage from "html-to-image";
import { jsPDF } from "jspdf";
import ProxyImage from "@components/ProxyImage";

const FormatedNumber = ({ num, decimal=2 }) => {
	if (num >= 1000000000) {
		return (num / 1000000000).toFixed(decimal).replace(/\.0$/, "") + "B";
	}
	if (num >= 1000000) {
		return (num / 1000000).toFixed(decimal).replace(/\.0$/, "") + "M";
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(decimal).replace(/\.0$/, "") + "K";
	}
	return num;
};

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
export default function MiniProfileInfo(props) {

	const influencer = useSelector(
		(state) => state.influencerSearch.influencer
	);

	const {account, match, engagement_rate_histogram} = (influencer || {});

	const [loader, setLoader] = React.useState(false);

	const exportPdf = async (title) => {
		setLoader(true);
		var nodess = document.getElementById("user-profile-page");
		const filter = (node) => {
			const exclusionClasses = ["ignore-element", "slick-arrow", "nav-pills"];
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
		setLoader(false);
	};

	return (
		<div className="grid grid-cols-12 gap-5">
			<div className="col-span-12">
				<div className="bg-white rounded-[8px] p-3 h-full">
					<div className="items-center flex flex-col h-full justify-center">
						<div className="w-36 h-36 relative mb-6">
							{account?.user_profile?.picture ? (
								<ProxyImage
									className="w-[130px] h-[130px] rounded-full shrink-0"
									url={account?.user_profile?.picture}
									alt={account?.user_profile?.username}
										addCancelToken={() => { }}

								/>
							) : (
								<img
									src={avatar}
									alt={account?.user_profile?.username}
									className="w-[130px] h-[130px] rounded-full shrink-0"
								/>
							)}
							{account?.user_profile?.geo?.country?.code? (
								<div className="influncer-country absolute flex items-end justify-center inset-0">
									{account?.user_profile?.geo?.country ? (
										<span
											className={`text-[26px] -mb-4 flag-icon flag-icon-${(account?.user_profile?.geo?.country?.code || "").toLowerCase()}`}
										></span>
									) : (
										""
									)}
								</div>
							) : null}
						</div>
						<div className="w-full mb-6">
							
							<p className="text-[14px] font-normal darkGray text-center">
								{!!account?.user_profile?.description
									? truncate(account?.user_profile?.description)
									: ""}
							</p>
						</div>
						<div className="flex items-center gap-x-2 ignore-element">
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
								className="px-3 border-[1px] border-[#7c3292] purple rounded-[8px] h-[36px] text-[14px] inline-flex items-center"
							/>

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
			<div className="xl:col-span-6 col-span-12">
				<div className="bg-white rounded-[8px] p-4 border-[1px] border-[#dee2e6] h-full flex-col flex justify-between">
					<div className="grow">
						<div className="flex items-center mb-4">
							<div className="w-23">
								<img
									src={Followers}
									alt="followers"
									className="w-[22px] mr-2"
								/>
							</div>
							<h4 className="text-[20px] w-28 darkGray font-semibold">
								<FormatedNumber
									num={account?.user_profile?.followers || 0}
									decimal={0}
								/>
							</h4>
							<p className="text-[13px] font-normal darkGray">Followers</p>
						</div>
						<div className="flex items-center mb-4">
							<div className="w-23">
								<img src={Activity} alt="activity" className="w-[22px] mr-2" />
							</div>
							<h4 className="w-28 text-[20px] darkGray font-semibold">
								<FormatedNumber
									num={account?.user_profile?.engagements|| 0}
								/>
							</h4>
							<p className="text-[13px] font-normal darkGray">
								Engagement count
							</p>
						</div>
						<div className="flex items-center mb-4">
							<div className="w-23">
								<h4 className="text-[22px] darkGray font-semibold mr-4">%</h4>
							</div>
							<h4 className="w-28 text-[20px] darkGray font-semibold">
								{((account?.user_profile?.engagement_rate || 0)*100).toFixed(2)}
							</h4>
							<p className="text-[13px] font-normal darkGray">
								Engagement rate
							</p>
						</div>
					</div>
					<EngagementRateGraph

						engagement_rate={((account?.user_profile?.engagement_rate || 0)*100).toFixed(2)}
						profile_picture_url={account?.user_profile?.picture}
						engagement_rate_histogram={(engagement_rate_histogram || [])}

					/>
				</div>
			</div>
			<div className="xl:col-span-6 col-span-12">
				<div className="bg-white rounded-[8px] p-4 border-[1px] border-[#dee2e6] h-full">
					<div className="flex items-center">
						<img src={Credibility} alt="credibility" className="w-[25px]" />
						<h4 className="ml-2 text-[20px] darkGray font-semibold">
							{((match?.audience_likers?.data?.audience_credibility || 0)*100).toFixed(2)}%
						</h4>
						<p className="text-[14px] font-normal darkGray ml-4 mb-1">
							Credibility{" "}
						</p>
					</div>
					<p className="text-[13px] darkGray mt-6 mb-4">
						How reliable are the users following this account? 75% is the
						average, anything below that is a sign of a doubtful followers base.
						The following are some of the doubtful followers characteristics:
					</p>
					<div>
						<div className="flex items-start mb-2">
							<FiCheck className="success shrink-0" size={18} />
							<p className="text-[13px] darkGray ml-2">
								An account has no profile photo, or bio, but likes 50-100 posts
								per day.
							</p>
						</div>
						<div className="flex items-start mb-2">
							<FiCheck className="success shrink-0" size={18} />
							<p className="text-[13px] darkGray ml-2">
								Unbalanced ratio between followings and followers
							</p>
						</div>
						<div className="flex items-start mb-2">
							<FiCheck className="success shrink-0" size={18} />
							<p className="text-[13px] darkGray ml-2">
								Up to 10 posts or, in most cases, zero posts.
							</p>
						</div>
						<div className="flex items-start">
							<FiCheck className="success shrink-0" size={18} />
							<p className="text-[13px] darkGray ml-2">
								Username is filled with random letters and numbers.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function truncate(input) {
	if (input.length > 300) {
		return input.substring(0, 300) + "...";
	}
	return input;
}
