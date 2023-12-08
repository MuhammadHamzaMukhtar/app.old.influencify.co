import { Component } from "react";
import Reach from "@assets/reach.png";
import { FaStar } from "react-icons/fa";
import { connect } from "react-redux";
import {
	HANDLE_SELECT_TYPE_SUCCESS,
	HANDLE_EMPTY_CAMPAIGN_ID_SUCCESS,
} from "@store/constants/action-types";
import Loader from "@components/global/Loader";

class TypeTab extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.handleEmptyCampaignId();
	}

	render() {
		if (this.props.isLoading) {
			return <Loader />;
		}
		return (
			<div className="">
				<div className="grid grid-cols-12 gap-5 lg:justify-center mb-12">
					{this.props.typeItems &&
						this.props.typeItems.length &&
						this.props.typeItems.map((item) => (
							<div
								className="lg:col-span-4 sm:col-span-6 col-span-12"
								key={item.id}
							>
								{item.name == "PUBLIC" ? (
									<div
										onClick={() =>
											this.props.handleTypeChange(item.id, item.name)
										}
										className={
											"type-card flex flex-col relative border-[1px] border-[#0000002d] " +
											(this.props.typeId === item.id
												? "type-card-selected"
												: "") +
											" p-3 mt-12 md:!mt-0"
										}
									>
										<div className="p-0 grow">
											<div className="text-center p-3 mb-[0.5rem]">
												<img
													src={Reach}
													alt="Reach"
													className="w-[22px] mr-4"
												/>
												{item.name}
												{this.props.typeId === item.id ? <FaStar /> : ""}
											</div>
											<h6 className="text-center mb-6 text-[16px]">
												Let them apply to you
											</h6>
											<div className="pl-3 pr-3">
												<div className="flex flex-col">
													<div className="flex justify-between px-[16px] py-[8px]">
														<p className="text-[14px]">
															Simply create the brief and choose the payment
															method
														</p>
													</div>
													<div className="flex justify-between px-[16px] py-[8px]">
														<p className="text-[14px]">
															Accept influencers at your dissertations
														</p>
													</div>
													<div className="flex justify-between px-[16px] py-[8px]">
														<p className="text-[14px]">
															Only pay for the creators you choose to work with
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								) : (
									""
								)}
								{item.name == "DIRECT" ? (
									<div
										onClick={() =>
											this.props.handleTypeChange(item.id, item.name)
										}
										className={
											"type-card flex flex-col relative border-[1px] border-[#0000002d] " +
											(this.props.typeId === item.id
												? "type-card-selected"
												: "") +
											" p-3 mt-12 md:!mt-0"
										}
									>
										<div className="p-0 grow">
											<div className="text-center p-3 mb-[0.5rem]">
												<img
													src={Reach}
													alt="Reach"
													className="w-[22px] mr-4"
												/>
												{item.name}
												{this.props.typeId === item.id ? <FaStar /> : ""}
											</div>
											<h6 className="text-center mb-6 text-[16px]">
												Choose specific influencers
											</h6>
											<div className="pl-3 pr-3">
												<div className="flex flex-col">
													<div className="flex justify-between px-[16px] py-[8px]">
														<p className="text-[14px]">
															Use our search filters and audience metrics to
															find your perfect influencers
														</p>
													</div>
													<div className="flex justify-between px-[16px] py-[8px]">
														<p className="text-[14px]">
															Contact them directly through the platform
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								) : (
									""
								)}
							</div>
						))}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		typeItems: state.TypeReducer.typeItems,
		typeId: state.SetUpNewCampaignReducer.typeId,
		isLoading: state.HeaderReducer.isLoading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleEmptyCampaignId: () =>
			dispatch({ type: HANDLE_EMPTY_CAMPAIGN_ID_SUCCESS, payload: "" }),
		handleTypeChange: (id, name) =>
			dispatch({ type: HANDLE_SELECT_TYPE_SUCCESS, payload: id, name: name }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TypeTab);
