import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Mentions = ({ data }) => {
	const [pagination, setPagination] = useState({ min: 0, max: data.length < 5 ? data.length : 5 });

	return (
		<div className="p-4 bg-white rounded-[8px] border">
			<div className="pb-10">
				<h5 className="font-normal text-[16px] text-[#8d8d8d] flex items-center">
					Mentions
				</h5>
			</div>
			<div className="h-[272px]">
				{data && data.length > 0 ? (
					data.slice(pagination.min, pagination.max).map((item, key) => (
						<div key={key} className="flex items-center justify-between mb-3 border-b-gray-200 border-b-2 pb-3">
							<p className="text-[14px] text-black font-normal">
								{item.tag}
							</p>
							<div className="ml-auto text-[14px] text-black font-normal mt-3">
								{((item.weight || 0) * 100).toFixed(2)}%
							</div>
						</div>
					))
				) : (
					<div className="text-center w-full py-[4.2rem] px-[1rem] justify-center text-[#bbb] text-[25px] font-medium leading-[40px]">
						We have nothing to show you here.
					</div>
				)}
			</div>
			{data && data.length > 0 &&
				<div className="col-span-12">
					<div className="flex justify-center items-center text-slate-400 font-medium text-lg">
						{pagination.min > 1 &&
							<IoIosArrowBack cursor={'pointer'} size={20} onClick={() => setPagination({ min: pagination.min - 5, max: pagination.min })} />
						}
						<span className="px-3">{pagination.min + 1} - {pagination.max} of {data.length} posts found</span>
						{pagination.max < data.length &&
							<IoIosArrowForward size={20} cursor={'pointer'} onClick={() => setPagination({ min: pagination.max, max: (pagination.max + 5 > data.length ? data.length : pagination.max + 5) })} />
						}
					</div>
				</div>
			}
		</div>
	);
};

export default Mentions;
