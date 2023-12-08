import { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { DATE_CHANGE_HANDLER } from "@store/constants/action-types";

class TimingTab extends Component {
	_onDateChange = (event) => {
		var date = moment(event.target.value).format("YYYY/MM/DD");
		this.props.onDateChangeHandler(event.target.name, date);
	};

	render() {
		return (
			<div>
				<div className="grid grid-cols-12 gap-5 mb-12">
					<div className="sm:col-span-6 col-span-12">
						<h5 className="mb-2  text-[18px]">Posting period</h5>
						<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-4">
							<label className="text-[10px] darkGray">Posting From:</label>
							<input
								name="postingFrom"
								value={this.props.postingFrom || ""}
								onChange={(date) => {
									this._onDateChange({
										target: {
											name: "postingFrom",
											value: date,
										},
									});
								}}
								className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
							/>
							<div />
							<label className="text-[10px] darkGray">Posting To:</label>
							<input
								name="postingTo"
								value={this.props.postingTo || ""}
								onChange={(date) => {
									this._onDateChange({
										target: {
											name: "postingTo",
											value: date,
										},
									});
								}}
								className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
							/>
						</div>
					</div>
					{this.props.typeName === "PUBLIC" ? (
						<div className="sm:col-span-6 col-span-12">
							<h5 className="mb-2 text-[18px]">Application period</h5>
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-4">
								<label className="text-[10px] darkGray">
									Application From:
								</label>
								<input
									name="applicationFrom"
									value={this.props.applicationFrom || ""}
									onChange={(date) => {
										this._onDateChange({
											target: {
												name: "applicationFrom",
												value: date,
											},
										});
									}}
									className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
								/>
								<div />
								<label className="text-[10px] darkGray">Application To:</label>
								<input
									name="applicationTo"
									value={this.props.applicationTo || ""}
									onChange={(date) => {
										this._onDateChange({
											target: {
												name: "applicationTo",
												value: date,
											},
										});
									}}
									className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
								/>
							</div>
						</div>
					) : (
						""
					)}

					<div className="range-filters table mb-6 text-center m-auto d-inline">
						<p className="table-cell pr-2">
							<input
								type="number"
								className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
								onChange={(event) =>
									this.props.onDateChangeHandler(
										event.target.name,
										event.target.value
									)
								}
								name="completeInDays"
								value={this.props.completeInDays}
							/>{" "}
							days
						</p>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		typeName: state.SetUpNewCampaignReducer.typeName,
		completeInDays: state.SetUpNewCampaignReducer.completeInDays,
		applicationFrom: state.SetUpNewCampaignReducer.applicationFrom,
		applicationTo: state.SetUpNewCampaignReducer.applicationTo,
		postingFrom: state.SetUpNewCampaignReducer.postingFrom,
		postingTo: state.SetUpNewCampaignReducer.postingTo,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onDateChangeHandler: (name, value) =>
			dispatch({ type: DATE_CHANGE_HANDLER, name: name, value: value }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TimingTab);
