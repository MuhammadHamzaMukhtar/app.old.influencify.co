import { HiHashtag } from "react-icons/hi";

const Hashtags = ({ data }) => {
	return (
		<div className="p-4 bg-white rounded-[8px] border">
			<div className="pb-7">
				<h5 className="font-normal text-[16px] text-[#8d8d8d] flex items-center">
					Hashtags
				</h5>
			</div>
			<div className="flex flex-wrap gap-2 h-[307px]">
				{data && data.length > 0 ? (
					data.map((item, key) => (
						<div
							className="bg-[#f7f7f7] rounded-full px-[1rem] py-[0.5rem] h-fit cursor-pointer flex items-center"
							key={key}
						>
							<HiHashtag className="mr-2" color="#7c3292" />
							<p className="text-[12px] font-bold text-[#7c3292]">
								{item.tag}
							</p>
						</div>
					))
				) : (
					<div className="text-center w-full py-[4.2rem] px-[1rem] justify-center text-[#bbb] text-[25px] font-medium leading-[40px]">
						We have nothing to show you here.
					</div>
				)}
			</div>
		</div>
	);
};

export default Hashtags;
