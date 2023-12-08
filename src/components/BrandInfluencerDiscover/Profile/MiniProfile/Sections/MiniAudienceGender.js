import { useSelector } from "react-redux";
import MaleAge from "@assets/male_age.png";
import AltMaleAge from "@assets/male_age_alt.png";
import FemaleAge from "@assets/female_age.png";
import AltFemaleAge from "@assets/female_age_alt.png";

export default function MiniAudienceGender() {

	const influencer = useSelector(
		(state) => state.influencerSearch.influencer
	);

	const {account, match} = (influencer || {});

	const audience_likers = ((match?.audience_likers?.data?.audience_genders || []).filter(i=>i.code=="MALE")?.[0] || {});

	const male = ((audience_likers?.weight || 0)*100).toFixed(1);
	const female = 100 - male;
	return (
		<div className="p-4 border-[1px] border-[#dee2e6] h-full rounded-[8px]">
			<h5 className="font-normal text-[16px] darkGray">Audience Gender</h5>
			<div className="flex flex-wrap justify-center items-end mt-12 pt-3">
				<div className="flex w-7/12 justify-center mb-6 pr-4">
					<div className="inline-flex items-end relative mr-6">
						<img src={FemaleAge} alt="male age" className="h-[150px]" />
						<div
							className="absolute w-full overflow-hidden"
							style={{
								height: `${female}%`,
							}}
						>
							<img
								src={AltFemaleAge}
								alt="male age"
								className="absolute bottom-0 h-[150px]"
							/>
						</div>
					</div>
					<div className="inline-flex items-end relative">
						<img src={MaleAge} alt="male age" className="h-[150px]" />
						<div
							className="absolute w-full overflow-hidden"
							style={{
								height: `${male}%`,
							}}
						>
							<img
								src={AltMaleAge}
								alt="male age"
								className="absolute bottom-0 h-[150px]"
							/>
						</div>
					</div>
				</div>
				<div className="md:hidden w-full"></div>
				<div className="">
					<div className="flex mb-4">
						<p className="text-[14px] darkGray font-normal w-24">
							{"Female"}
						</p>
						<p className="text-[16px] pink font-normal">
							{(female).toFixed(1)}%
						</p>
					</div>
					<div className="flex">
						<p className="text-[14px] darkGray font-normal w-24">
							{"MAle"}
						</p>
						<p className="text-[16px] purple font-normal">
							{male}%
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
