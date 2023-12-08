import { Component } from "react";
import TopHeader from "@components/BrandInfluencerList/TopHeader";
import Filters from "@components/BrandInfluencerList/Filters";
import Lists from "@components/BrandInfluencerList/Lists";

class BrandInfluencersTiktokListScreeen extends Component {
	render() {
		return (
			<div className="mb-12">
				<div className="bg-white py-[20px] border border-b border-[#ddd] mb-0">
					<TopHeader />
					<div className="bg-[#ddd] h-[1px] w-full my-6" />
					<Filters />
				</div>
				<div className="containers">
					<div className="mt-12">
						<Lists />
					</div>
				</div>
			</div>
		);
	}
}

export default BrandInfluencersTiktokListScreeen;
