import { Component } from "react";
import Reach from "@assets/reach.png";
import { FaStar } from "react-icons/fa";
import { connect } from "react-redux";
import Loader from "@components/global/Loader";

class Type extends Component {
	handleChange = (key, value, name) => {
		const form = Object.assign({}, this.props.form);
		form[key] = value;
		form["type_name"] = name;
		this.props.addForm(form);
	};

	render() {
		const { typeItems, form } = this.props;
		if (this.props.isLoading) {
			return (
				<Loader
					className="h-full w-full flex justify-center items-center"
					size="67"
				/>
			);
		}
		return (
			<div>
				<div className="flex flex-wrap lg:justify-center mb-12">
					{typeItems &&
						typeItems.length &&
						typeItems.map((item, index) => (
							<div className="lg:w-4/12 sm:w-6/12 w-full px-[1rem]" key={index}>
								{item.name === "PUBLIC" ? (
									<div
										onClick={() =>
											this.handleChange("type_id", item.id, item.name)
										}
										className={
											"" +
											(form && form.type_id === item.id
												? "shadow-[0px_0px_25px_0px_#7d2c94] border-[1px] border-[#7d2c94] "
												: "shadow-[0px_4px_5px_#96969640] border-[1px] border-[transparent]") +
											" p-3 mt-12 md:!mt-0 relative flex flex-col  bg-white rounded-[8px] min-h-[300px] "
										}
									>
										<div className="text-center p-3 border-b border-[#e8e8e8]">
											<img className="mr-4 w-[22px]" src={Reach} alt="Reach" />
											<h4 className="text-[15pt] font-medium dark">
												{item.name}
											</h4>
											{form && form.type_id === item.id ? (
												<FaStar size={20} />
											) : (
												""
											)}
										</div>
										<h6 className="text-center mb-6 text-[16px] pt-3">
											Let them apply to you
										</h6>
										<div className="px-[1rem]">
											<div className="flex flex-col">
												<div className="py-[0.75rem] border-b border-[#e8e8e8]">
													<p className="before:content-['\u....'] before:inline-block before:mr-[5px] before:text-[#1fcfc5]">
														Simply create the brief and choose the payment
														method
													</p>
												</div>
												<div className="py-[0.75rem] border-b border-[#e8e8e8]">
													<p className="before:content-['\u....'] before:inline-block before:mr-[5px] before:text-[#1fcfc5]">
														Accept influencers at your dissertations
													</p>
												</div>
												<div className="py-[0.75rem]">
													<p className="before:content-['\u....'] before:inline-block before:mr-[5px] before:text-[#1fcfc5]">
														Only pay for the creators you choose to work with
													</p>
												</div>
											</div>
										</div>
									</div>
								) : (
									""
								)}
								{item.name === "DIRECT" ? (
									<div
										onClick={() =>
											this.handleChange("type_id", item.id, item.name)
										}
										className={
											"" +
											(form && form.type_id === item.id
												? "shadow-[0px_0px_25px_0px_#7d2c94] border-[1px] border-[#7d2c94] "
												: "shadow-[0px_4px_5px_#96969640] border-[1px] border-[transparent]") +
											" p-3 mt-12 md:!mt-0 relative flex flex-col  bg-white rounded-[8px] min-h-[300px] "
										}
									>
										<div className="text-center p-3 border-b border-[#e8e8e8]">
											<img className="mr-4 w-[22px]" src={Reach} alt="Reach" />
											<h4 className="text-[15pt] font-medium dark">
												{item.name}
											</h4>
											{form && form.type_id === item.id ? (
												<FaStar size={20} />
											) : (
												""
											)}
										</div>
										<h6 className="text-center mb-6 text-[16px] pt-3">
											Choose specific influencers
										</h6>
										<div className="px-[1rem]">
											<div className="flex flex-col">
												<div className="py-[0.75rem] border-b border-[#e8e8e8]">
													<p className="before:content-['\u....'] before:inline-block before:mr-[5px] before:text-[#1fcfc5]">
														Use our search filters and audience metrics to find
														your perfect influencers
													</p>
												</div>
												<div className="py-[0.75rem]">
													<p className="before:content-['\u....'] before:inline-block before:mr-[5px] before:text-[#1fcfc5]">
														Contact them directly through the platform
													</p>
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

const mapStateToProps = ({ campaign }) => {
	return {
		typeItems: campaign.typeItems,
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

export default connect(mapStateToProps, mapDispatchToProps)(Type);
