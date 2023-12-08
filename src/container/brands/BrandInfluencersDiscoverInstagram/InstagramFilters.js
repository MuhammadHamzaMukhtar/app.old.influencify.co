import { Component } from "react";
import Location from "@components/BrandInfluencerDiscover/Filters/Location";
import Language from "@components/BrandInfluencerDiscover/Filters/Language";
import Brands from "@components/BrandInfluencerDiscover/Filters/Brands";
import Partnerships from "@components/BrandInfluencerDiscover/Filters/Partnerships";
import Interests from "@components/BrandInfluencerDiscover/Filters/Interests";
import Gender from "@components/BrandInfluencerDiscover/Filters/Gender";
import Ethnicity from "@components/BrandInfluencerDiscover/Filters/Ethnicity";
import Age from "@components/BrandInfluencerDiscover/Filters/Age";
import Lookalikes from "@components/BrandInfluencerDiscover/Filters/Lookalikes";
import Bio from "@components/BrandInfluencerDiscover/Filters/Bio";
import Followers from "@components/BrandInfluencerDiscover/Filters/Followers";
import ReelPlay from "@components/BrandInfluencerDiscover/Filters/ReelPlay";
import Engagements from "@components/BrandInfluencerDiscover/Filters/Engagements";
import LastPost from "@components/BrandInfluencerDiscover/Filters/LastPost";
import AccountType from "@components/BrandInfluencerDiscover/Filters/AccountType";
import Growing from "@components/BrandInfluencerDiscover/Filters/Growing";
import Tags from "@components/BrandInfluencerDiscover/Filters/Tags";
import Keywords from "@components/BrandInfluencerDiscover/Filters/Keywords";
import { connect } from "react-redux";
import FindInfluencers from "@components/BrandInfluencerDiscover/Filters/FindInfluencers";
import WordCloud from "react-d3-cloud";
import Email from "@components/BrandInfluencerDiscover/Filters/Email";
import Mentions from "@components/BrandInfluencerDiscover/Filters/Mentions";
import Hashtags from "@components/BrandInfluencerDiscover/Filters/Hashtags";

class InstagramFilters extends Component {
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
									<Brands />
									<Partnerships />
									<Interests />
									<Gender />
									<Ethnicity />
									<Age />
									<Email className="rounded-r-[8px] border-r-[1px] border-[#ddd]" />
								</div>
							</div>
							<div className="flex my-4">
								<div className="flex flex-wrap items-center divide-x divide-[#ddd] rounded-[8px]">
									{/* <Keywords className="rounded-l-[8px] border-l-[1px] border-[#ddd]" /> */}
									<Mentions className="rounded-l-[8px] border-l-[1px] border-[#ddd]" />
									<Hashtags />
									<Lookalikes />
									<Bio />
									<Followers />
									<ReelPlay />
									<Engagements />
									<LastPost />
									<AccountType />
									<Growing className="rounded-r-[8px] border-r-[1px] border-[#ddd]" />
								</div>
							</div>
							<div className="flex items-center flex-wrap mb-4">
								<Tags />
							</div>
						</div>
						{relevantTags && relevantTags.length > 0 && (
							<div className="sm:w-3/12">
								<p className="font-bold">Topic Tensor</p>
								<div className="bg-[rgb(249_249_249)] border border-[#efefef]">
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
										onWordClick={(event, d) => {
											//console.log(`onWordClick: ${d.text}`);
										}}
										onWordMouseOver={(event, d) => {
											//console.log(`onWordMouseOver: ${d.text}`);
										}}
										onWordMouseOut={(event, d) => {
											//console.log(`onWordMouseOut: ${d.text}`);
										}}
									/>
								</div>
							</div>
						)}
					</div>
				</div>
				<div className="bg-white pb-6 roundded-b-[8px]">
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

export default connect(mapStateToProps)(InstagramFilters);
