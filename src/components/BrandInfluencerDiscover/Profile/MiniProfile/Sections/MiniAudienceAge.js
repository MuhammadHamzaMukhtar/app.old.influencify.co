import { useSelector } from "react-redux";
import { IoMdInformationCircle } from "react-icons/io";

export default function MiniAudienceAge() {

	const influencer = useSelector(
		(state) => state.influencerSearch.influencer
	);

	const {match} = (influencer || {});

	const audience_likers = (match?.audience_likers?.data || {});
	const audience_ages = (audience_likers?.audience_ages || []);
	const audience_genders_per_age = (audience_likers?.audience_genders_per_age || []);

	return (
		<div className="border-[1px] border-[#dee2e6] p-4 h-full rounded-[8px] audience-gender">
			<h5 className="font-normal text-[16px] darkGray flex items-center">
				Age & Gender Split{" "}
				<IoMdInformationCircle size={20} className="ml-2 gray" />
			</h5>
			<div className="grid sm:grid-cols-5 grid-cols-3 justify-center">
				{audience_genders_per_age
					.slice(0, 5)
					.map((age, index) => {
					
					const men = ((age?.male ||  0)*100).toFixed(2);
					const audience_age = (audience_ages.filter(i=>i.code==age.code)?.[0] || {});
					const weight = (audience_age?.weight || 0) - age?.male;
					const women = ((weight || 0)*100).toFixed(2);
					
					return (
						<div
							key={index}
							className="flex flex-col justify-end items-center mt-12"
						>
							<div className="flex">
								<div className="relative">
									<p
										className="darkGray text-[12px] font-normal mb-4 left-[50%] transform translate-x-[-50%] absolute"
										style={{ bottom: `${men}%` }}
									>
										{men}%
									</p>
									<div className="min-h-[220px] rounded-[8px] w-[15px] flex relative flex-end bg-transparent ">
										<div
											className="bg-[#1fcfc5] w-full absolute bottom-0 rounded-[12px] transition-[height] duration-[0.6s]"
											style={{
												height: `${men}%`,
											}}
										></div>
									</div>
								</div>
								<div className="relative ml-6">
									<p
										className="darkGray text-[12px] font-normal mb-4 left-[50%] transform translate-x-[-50%] absolute"
										style={{ bottom: `${women}%` }}
									>
										{women}%
									</p>
									<div className="min-h-[220px] rounded-[8px] w-[15px] flex relative flex-end bg-transparent ">
										<div
											className="bg-[#7c3292] w-full absolute bottom-0 rounded-[12px] transition-[height] duration-[0.6s]"
											style={{
												height: `${women}%`,
											}}
										></div>
									</div>
								</div>
							</div>
							<div className="mt-6 text-center">
								<h5 className="text-[15px] darkGray font-medium whitespace-nowrap">
									{age.code}
								</h5>
							</div>
						</div>
					)})}
			</div>
		</div>
	);
}
