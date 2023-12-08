import { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import "./styles.css";

class Timing extends Component {
	handleChange = (key, value) => {
		const { addForm } = this.props;
		const form = Object.assign({}, this.props.form);
		var date = moment(value).format("YYYY-MM-DD");
		if (key === "postingFrom") {
			form["campaign_date"][key] = date;
		} else if (key === "postingTo") {
			form["campaign_date"][key] = date;
		} else if (key === "applicationFrom") {
			form["campaign_date"][key] = date;
		} else if (key === "applicationTo") {
			form["campaign_date"][key] = date;
		}

		addForm(form);
	};

	render() {
		const { form } = this.props;
		return (
			<div>
				<div className="flex flex-wrap mb-12">
					<div className="w-full">
						<h5 className="mb-2 text-[18px]">Posting period</h5>
						<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white p-4 mb-6 rounded-[8px]">
							<div className="grid sm:grid-cols-2 grid-cols-1">
								<div>
									<label className="text-[10px] darkGray">Posting From:</label>
									<input
										type="date"
										className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
										max={moment().add(3, "months").format("yyyy-MM-DD")}
										disabled={form.campaign_status === "active" ? true : false}
										value={
											(form.campaign_date && form.campaign_date.postingFrom) ||
											""
										}
										onChange={(date) => this.handleChange("postingFrom", date)}
									/>
								</div>
								<div>
									<label className="text-[10px] darkGray">Posting To:</label>
									<input
										type="date"
										className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
										max={moment().add(3, "months").format("yyyy-MM-DD")}
										disabled={form.campaign_status === "active" ? true : false}
										value={
											(form.campaign_date && form.campaign_date.postingTo) || ""
										}
										onChange={(date) => this.handleChange("postingTo", date)}
									/>
								</div>
							</div>
						</div>
					</div>
					{this.props.typeName === "PUBLIC" ? (
						<div className="w-full">
							<h5 className="mb-2 text-[18px]">Application period</h5>
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4 mb-6 rounded-[8px]">
								<div className="grid sm:grid-cols-2 grid-cols-1">
									<div>
										<label className="text-[10px] darkGray">
											Application From:
										</label>
										<input
											type="date"
											className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
											value={
												(form.campaign_date &&
													form.campaign_date.applicationFrom) ||
												""
											}
											onChange={(date) =>
												this.handleChange("applicationFrom", date)
											}
										/>
									</div>
									<div>
										<label className="text-[10px] darkGray">
											Application To:
										</label>
										<input
											type="date"
											className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
											value={
												(form.campaign_date &&
													form.campaign_date.applicationTo) ||
												""
											}
											onChange={(date) =>
												this.handleChange("applicationTo", date)
											}
										/>
									</div>
								</div>
							</div>
						</div>
					) : (
						""
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ campaign }) => {
	return {
		form: campaign.form,
	};
};

const mapDispatchToProps = (dispatch) => {
	const { actions } = require("@store/redux/CampaignRedux");
	return {
		addForm: (form) => {
			actions.addForm(dispatch, form);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Timing);
