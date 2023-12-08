import { Component } from "react";
import { FaUsers } from "react-icons/fa";
import { RiChatSmile3Fill, RiEditCircleFill } from "react-icons/ri";
import moment from "moment";
import Influencify from "../../../../constants/Influencify";

class Overview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			start_date: moment().subtract(30, "days").format("YYYY-MM-DD"),
			end_date: moment().format("YYYY-MM-DD"),
			data: {},
		};
	}

	componentDidMount() {
		this.fetchInstagramBusinessOverview();
	}

	fetchInstagramBusinessOverview = async () => {
		const data = {
			start_date: this.state.start_date,
			end_date: this.state.end_date,
		};
		const json = await Influencify.instagramBusinessOverview(data);
		if (json !== undefined) {
			if (json.status === 200) {
				this.setState({ data: json.data });
			}
		}
	};

	onChangeStartDate = (e) => {
		this.setState(
			{ start_date: e.target.value },
			this.fetchInstagramBusinessOverview
		);
	};
	onChangeEndDate = (e) => {
		this.setState(
			{ end_date: e.target.value },
			this.fetchInstagramBusinessOverview
		);
	};

	render() {
		const { start_date, end_date, data } = this.state;
		const { brandDashboardInformation } = this.props;
		return (
			<div>
				<div className="md:py-12">
					<div className="mb-2 flex flex-wrap">
						<div className="xl:w-8/12 lg:6/12 w-full my-auto">
							{brandDashboardInformation &&
								brandDashboardInformation?.instagram_username && (
									<h3 className="text-[22px] font-bold">
										Overview of: @
										{brandDashboardInformation?.instagram_username}
									</h3>
								)}
						</div>
						<div className="xl:w-2/12 lg:3/12 w-full lg:pr-6 mb-6 lg:mb-0">
							<div className="mr-2 mb-4 md:!mb-0 w-full">
								<input
									type="date"
									value={start_date}
									className="rounded-[8px] h-[40px] inline-flex w-full items-center bg-white px-3 border-0 font-light text-[#8d8d8d] shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] focus-visible:outline-0 focus:border-[#7c3292]"
									onChange={this.onChangeStartDate}
									disabled
								/>
							</div>
						</div>
						<div className="xl:w-2/12 lg:3/12 w-full">
							<div className="mr-2 mb-4 md:!mb-0 w-full">
								<input
									type="date"
									value={end_date}
									className="rounded-[8px] h-[40px] inline-flex w-full items-center bg-white px-3 border-0 font-light text-[#8d8d8d] shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] focus-visible:outline-0 focus:border-[#7c3292]"
									onChange={this.onChangeEndDate}
									disabled
								/>
							</div>
						</div>
					</div>
					<div className="mb-12 md:!mb-0 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
						<div className="flex items-stretch">
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] mb-[1rem] px-4 py-12 w-full text-center">
								<div className="bg-[#7c32921a] w-12 h-12 rounded-full mx-auto flex items-center justify-center">
									<FaUsers className="purple" size={17} />
								</div>
								<h4 className="text-[18px] font-medium mt-4">
									{data?.impressions}
								</h4>
								<p className="text-[11px] darkGray font-medium">Impressions</p>
							</div>
						</div>
						<div className="flex items-stretch">
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] mb-[1rem] px-4 py-12 w-full text-center">
								<div className="bg-[#ffbb421a] w-12 h-12 rounded-full mx-auto flex items-center justify-center">
									<RiEditCircleFill color="#FFBB42" size={17} />
								</div>
								<h4 className="text-[18px] font-medium mt-4">{data?.reach}</h4>
								<p className="text-[11px] darkGray font-medium">Reach</p>
							</div>
						</div>
						<div className="flex items-stretch">
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] mb-[1rem] px-4 py-12 w-full text-center">
								<div className="bg-[#1d80dc1a] w-12 h-12 rounded-full mx-auto flex items-center justify-center">
									<FaUsers color="#1D80DC" size={17} />
								</div>
								<h4 className="text-[18px] font-medium mt-4">
									{data?.follower_count}
								</h4>
								<p className="text-[11px] darkGray font-medium">Followers</p>
							</div>
						</div>
						<div className="flex items-stretch">
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] mb-[1rem] px-4 py-12 w-full text-center">
								<div className="bg-[#55cd451a] w-12 h-12 rounded-full mx-auto flex items-center justify-center">
									<RiChatSmile3Fill color="#55CD45" size={17} />
								</div>
								<h4 className="text-[18px] font-medium mt-4">
									{data?.profile_views}
								</h4>
								<p className="text-[11px] darkGray font-medium">
									Profile Visits
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Overview;
