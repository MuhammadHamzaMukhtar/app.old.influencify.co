export default function AudienceAge({ data }) {
	let male_percentage,
		female_percentage = 0;
	return (
		<div className="p-4 border-[1px] border-[#dee2e6] h-full audience-gender rounded-[8px]">
			<h5 className="font-normal text-[16px] darkGray flex items-center">
				Age & Gender Split{" "}
			</h5>
			<div className="grid sm:grid-cols-6 grid-cols-3 justify-center">
				{data &&
					data.audience_gender_age_data &&
					Object.keys(data.audience_gender_age_data).map((item, index) => {
						male_percentage = data.audience_gender_age_data[item]["M"] ?? 0;
						female_percentage = data.audience_gender_age_data[item]["F"] ?? 0;
						return (
							<div
								index={index}
								className="flex flex-col justify-end items-center mt-12"
							>
								<div className="flex">
									<div className="relative">
										<p
											className="darkGray text-[12px] font-normal mb-4 left-[50%] transform translate-x-[-50%] absolute"
											style={{ bottom: `${male_percentage + 16}%` }}
										>
											{male_percentage}%
										</p>
										<div className="min-h-[220px] rounded-[8px] w-[15px] flex relative flex-end bg-transparent ">
											<div
												className="bg-[#1fcfc5] w-full absolute bottom-0 rounded-[12px] transition-[height] duration-[0.6s]"
												style={{
													height: `${male_percentage + 16}%`,
												}}
											></div>
										</div>
									</div>
									<div className="relative ml-6">
										<p
											className="darkGray text-[12px] font-normal mb-4 left-[50%] transform translate-x-[-50%] absolute"
											style={{ bottom: `${female_percentage + 16}%` }}
										>
											{female_percentage}%
										</p>
										<div className="min-h-[220px] rounded-[8px] w-[15px] flex relative flex-end bg-transparent">
											<div
												className="bg-[#7c3292] w-full absolute bottom-0 rounded-[12px] transition-[height] duration-[0.6s]"
												style={{
													height: `${female_percentage + 16}%`,
												}}
											></div>
										</div>
									</div>
								</div>
								<div className="mt-6 text-center">
									<h5 className="text-[15px] darkGray font-medium whitespace-nowrap">
										{item}
									</h5>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
}
