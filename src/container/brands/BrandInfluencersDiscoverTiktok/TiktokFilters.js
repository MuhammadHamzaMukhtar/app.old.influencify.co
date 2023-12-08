import { Component } from "react";
import Location from "@components/BrandInfluencerDiscover/Filters/Location";
import Language from "@components/BrandInfluencerDiscover/Filters/Language";
import Gender from "@components/BrandInfluencerDiscover/Filters/Gender";
import Age from "@components/BrandInfluencerDiscover/Filters/Age";
import Lookalikes from "@components/BrandInfluencerDiscover/Filters/Lookalikes";
import Bio from "@components/BrandInfluencerDiscover/Filters/Bio";
import Followers from "@components/BrandInfluencerDiscover/Filters/Followers";
import Engagements from "@components/BrandInfluencerDiscover/Filters/Engagements";
import Views from "@components/BrandInfluencerDiscover/Filters/Views";
import LastPost from "@components/BrandInfluencerDiscover/Filters/LastPost";
import Growing from "@components/BrandInfluencerDiscover/Filters/Growing";
import Tags from "@components/BrandInfluencerDiscover/Filters/Tags";
import FindInfluencers from "@components/BrandInfluencerDiscover/Filters/FindInfluencers";
import WordCloud from "react-d3-cloud";
import { connect } from "react-redux";
import Keywords from "@components/BrandInfluencerDiscover/Filters/Keywords";
import Email from "@components/BrandInfluencerDiscover/Filters/Email";
import Mentions from "@components/BrandInfluencerDiscover/Filters/Mentions";
import Hashtags from "@components/BrandInfluencerDiscover/Filters/Hashtags";

class TiktokFilters extends Component {
	render() {
		const { customContainer, relevantTags } = this.props;
		return (
			<div className={customContainer}>
				<div className="bg-white">
					<div className="flex flex-wrap pt-6">
						<div className="sm:w-9/12">
							<div className="flex">
								<div className="flex flex-wrap items-center divide-x divide-[#ddd] rounded-[8px]">
									<Location className="rounded-l-[8px] border-l-[1px] border-[#ddd]" />
									<Language />
									<Gender />
									<Age />
									<Bio />
									<Lookalikes />
									<Email className="rounded-r-[8px] border-r-[1px] border-[#ddd]" />
								</div>
							</div>
							<div className="flex my-4">
								<div className="flex flex-wrap items-center divide-x divide-[#ddd] rounded-[8px]">
									<Mentions className="rounded-l-[8px] border-l-[1px] border-[#ddd]" />
									<Hashtags />
									<Followers />
									<Engagements />
									<Views />
									<LastPost />
									<Growing className="rounded-r-[8px] border-r-[1px] border-[#ddd]" />
								</div>
							</div>
							<div className="flex items-center flex-wrap mb-6 -mx-2">
								<Tags />
							</div>
						</div>
						{relevantTags && relevantTags.length > 0 && (
							<div className="sm:w-3/12">
								<p style={{ fontWeight: 600 }}>Topic Tensor</p>
								<div
									style={{
										background: "rgb(249 249 249)",
										border: "1px solid #efefef",
									}}
								>
									<WordCloud
										data={relevantTags}
										width={200}
										height={100}
										font="'Poppins', sans-serif"
										fontStyle="normal"
										fontWeight="bold"
										fontSize={(word) => word.value}
										spiral="archimedean"
										rotate={(word) => 0}
										padding={1}
										random={Math.random}
										fill={(d, i) => "#7c3292"}
										onWordClick={(event, d) => {}}
										onWordMouseOver={(event, d) => {}}
										onWordMouseOut={(event, d) => {}}
									/>
								</div>
							</div>
						)}
					</div>
				</div>
				<div className="bg-white pb-4 roundded-b-[8px]">
					<FindInfluencers />
				</div>
			</div>
		);
	}
}
const mapStateToProps = ({ influencerSearch }) => {
	return {
		relevantTags: influencerSearch.searchRelevantTags,
	};
};

export default connect(mapStateToProps)(TiktokFilters);
