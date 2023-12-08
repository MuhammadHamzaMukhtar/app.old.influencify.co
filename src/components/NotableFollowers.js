import { IoIosArrowDown } from "react-icons/io";
import avatar from "@assets/avatar.png";
import { useState } from "react";

const formatedNumber = (num) => {
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

const NotableFollowers = ({ data }) => {

	const [errorCount, setErrorCount] = useState(0)

	const handleImageError = (event, pic) => {
		const { currentTarget } = event;
		setErrorCount((prevErrorCount) => prevErrorCount + 1);
		if (errorCount < 3) {
			const fallbackImage = pic || `${process.env.REACT_APP_BASE_URL}/images/male_avatar.png`;
			currentTarget.src = fallbackImage;
		} else {
			currentTarget.src = avatar
		}
	};

	return (
		<div className="bg-white rounded-[8px] border">
			<div className="px-4 rounded-t-[8px] grid grid-cols-12 pt-4 text-[14px] font-medium text-[#8d8d8d] border-b-gray-200 border-b-2 pb-2 sticky top-0 bg-white">
				<p className="col-span-6">
					Username
				</p>
				<div className="ml-auto col-span-3">
					Avg. Interactions
				</div>
				<div className="ml-auto flex items-center gap-x-2 col-span-3">
					Followers <IoIosArrowDown size={20} />
				</div>
			</div>
			<div className="max-h-[400px] overflow-auto">
				{data && data.length > 0 ? (
					data.map((item, key) => (
						<div key={key} className="px-4 grid grid-cols-12 text-[14px] text-black font-normal border-b-gray-200 border-b-2 py-1 items-center">
							<div className="flex items-center gap-x-4 col-span-6">
								<img src={item.picture} width={40} className="rounded-full" alt={item.fullname} onError={(e) => handleImageError(e, item.picture)} />
								<div>
									<span>@{item.username || item.handle}</span>
									<p className="text-[#8d8d8d]">{item.geo?.country?.name}</p>
								</div>
							</div>
							<div className="ml-auto text-lg col-span-3">
								{formatedNumber(item.engagements)}
							</div>
							<div className="ml-auto col-span-3 pr-5">
								{formatedNumber(item.followers)}
							</div>
						</div>
					))
				) : (
					<div className="text-center w-full py-[4.2rem] px-[1rem] justify-center text-[#bbb] text-[18px] font-medium leading-[40px]">
						We have nothing to show you here.
					</div>
				)}
			</div>
		</div>
	);
};

export default NotableFollowers;
