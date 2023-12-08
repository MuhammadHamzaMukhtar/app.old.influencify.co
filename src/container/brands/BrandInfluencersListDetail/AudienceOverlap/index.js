import { Component } from "react";
import { connect } from "react-redux";
import Tooltip from "@components/global/Tooltip";
import avatar from "@assets/avatar.png";
import SocialListIcons from "../../../../constants/SocialListIcons";
import { FaSpinner } from "react-icons/fa";

const FormatedNumber = ({ num }) => {
	if (num >= 1000000000) {
		return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
	}
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
	}
	return num;
};

class AudienceOverlap extends Component {
	render() {
		const { overlapping_data, platform, overlapping_loading } = this.props;

		if (overlapping_loading) {
			return (
				<div className='flex items-center h-[70vh] overflow-hidden'>
					<FaSpinner
						size={66}
						className="animate-[spin_2s_linear_infinite] pink mx-auto"
					/>
				</div>
			)
		}

		return (
			<>
				<div className="grid grid-cols-12 gap-5 mb-12">
					{overlapping_data && overlapping_data.length > 0 ? (
						overlapping_data.map((item, index) => (
							<div
								className="lg:col-span-3 sm:col-span-6 col-span-12 mb-4"
								key={index}
							>
								<div
									className="relative rounded-[8px] overflow-hidden mb-6 sm:!mb-0"
									key={index}
								>
									<div className="relative block cursor-pointer">
										<img
											className="min-h-[299px] max-h-[300px] w-full"
											src={item.picture ? item.picture : avatar}
											onError={({ currentTarget }) => {
												currentTarget.onerror = null;
												currentTarget.src = `${process.env.REACT_APP_BASE_URL}/images/male_avatar.png`;
											}}
											alt={item.fullname ? item.fullname : ""}
										/>

										<div className="p-0 absolute top-0 w-full h-full bg-gradient-to-b from-[#000000e6] via-[#0000007d] to-[#000000e6] flex items-end rounded-t-[8px]">
											<div className="px-3 pb-[20px]">
												<b className="block text-white">
													<Tooltip
														trigger={
															<p className="card-name">
																{" "}
																{item.fullname ? item.fullname : ""}
															</p>
														}
														tooltipText={item.fullname ? item.fullname : ""}
														placement="top-left"
													/>
												</b>
											</div>
										</div>
									</div>
									<div className="flex flex-col bg-white">
										<div className="flex justify-between py-[0.75rem] px-[10px] border-b border-[#00000020]">
											<div className="flex items-center">
												<p className="success">
													<p className="success">
														{SocialListIcons(platform, 16)}
													</p>
												</p>
												<p className="ml-2 text-[10pt] text-[#000000de] font-medium">
													Followers
												</p>
											</div>
											<b className="text-[10pt]">
												<FormatedNumber num={item.followers} />
											</b>
										</div>
										<div className="flex justify-between py-[0.75rem] px-[10px] border-b border-[#00000020]">
											<p className="text-[10pt] text-[#000000de] font-medium">
												Unique Percentage
											</p>
											<b className="text-[10pt]">
												{item.unique_percentage
													? (item.unique_percentage * 100).toFixed(2)
													: 0}{" "}
												%
											</b>
										</div>
										<div className="flex justify-between py-[0.75rem] px-[10px]">
											<p className="text-[10pt] text-[#000000de] font-medium">
												Overlapping Percentage
											</p>
											<b className="text-[10pt]">
												{item.overlapping_percentage
													? (item.overlapping_percentage * 100).toFixed(2)
													: 0}{" "}
												%
											</b>
										</div>
									</div>
								</div>
							</div>
						))
					) : (
						<div className="col-span-12 text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
							We have nothing to show you here.
						</div>
					)}
				</div>
			</>
		);
	}
}

const mapStateToProps = ({ brandList }) => {
	return {
		overlapping_data: brandList.overlapping_data,
		overlapping_loading: brandList.overlapping_loading,
	};
};

export default connect(mapStateToProps, null)(AudienceOverlap);
