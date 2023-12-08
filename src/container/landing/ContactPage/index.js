import React from "react";
import { connect } from "react-redux";
import * as contactActions from "@store/actions/ContactActions";
import { HANDLE_CHANGE_CONTACT_US_SUCCESS } from "@store/constants/action-types";
import Loader from "@components/global/Loader";
import helper from "../../../constants/helper";
import Anchor from "@components/global/Anchor";
import Button from "@components/global/Button";
import { Helmet } from "react-helmet";
import { FaSpinner } from "react-icons/fa";

class Contact extends React.Component {
	componentDidMount() {
		var Scroll = require("react-scroll");
		var scroll = Scroll.animateScroll;
		scroll.scrollToTop();
	}
	messageSend = () => {
		let query = {
			name: this.props.name,
			email: this.props.email,
			phoneNumber: this.props.phoneNumber,
			company: this.props.company,
			message: this.props.message,
		};
		this.props.sendMessage(query);
	};

	render() {
		const url = window.location.href;
		const title = helper.contact_title;
		const description = helper.contact_description;
		// if (this.props.isLoading) {
		// 	return <Loader />;
		// }
		return (
			<div>
				<Helmet>
					<title>{title}</title>
					<meta charSet="utf-8" />
					<meta name="description" content={description} />
					<link rel="canonical" href={url} />
				</Helmet>
				<div className="py-[20px] bg-white border-b border-[#ddd]">
					<div className="containers">
						<h2 className="text-[30px] font-semibold">Contact</h2>
					</div>
				</div>
				<div className="containers mt-12 mb-12">
					<div className="flex flex-wrap">
						<div className="md:w-8/12 w-full">
							<p>
								For information on how to get started using our site please
								check out our{" "}
								<Anchor
									target="_blank"
									href="https://knowledgebase.influencify.co/docs"
									rel="noopener noreferrer"
									className="success"
									text="GUIDE"
								/>
								.
							</p>
							<p>
								For specific questions be sure to search the{" "}
								<Anchor
									target="_blank"
									href="https://knowledgebase.influencify.co/docs"
									rel="noopener noreferrer"
									className="success"
									text="FAQ"
								/>{" "}
								first, it should give you quick and correct answers.
							</p>
							<div className="mt-6 flex flex-wrap">
								<div className="md:w-6/12 md:pr-3 w-full">
									<div className="mb-[1rem]">
										<label className="text-[14px] lightDark">Name</label>
										<input
											type="text"
											value={this.props.name}
											name="name"
											onChange={(e) => this.props.handleChange(e)}
											className="border-[1px] w-full border-[#ced4da] focus:border-[#7c3292] h-[40px] px-[1rem] focus-visible:outline-0 rounded-[8px]"
											placeholder="Your Name *"
										/>
										{this.props.errorsObj?.name ? (
											<span error className="red">
												{this.props.errorsObj.name[0]}
											</span>
										) : (
											""
										)}
									</div>
								</div>
								<div className="md:w-6/12 w-full">
									<div className="mb-[1rem]">
										<label className="text-[14px] lightDark">Email</label>
										<input
											type="text"
											value={this.props.email}
											name="email"
											onChange={(e) => this.props.handleChange(e)}
											className="border-[1px] w-full border-[#ced4da] focus:border-[#7c3292] h-[40px] px-[1rem] focus-visible:outline-0 rounded-[8px]"
											placeholder="Your Email *"
										/>
										{this.props.errorsObj?.email ? (
											<span error className="red">
												{this.props.errorsObj.email[0]}
											</span>
										) : (
											""
										)}
									</div>
								</div>
							</div>
							<div className="flex flex-wrap">
								<div className="md:w-6/12 md:pr-3 w-full">
									<div className="mb-[1rem]">
										<label className="text-[14px] lightDark">
											Phone Number
										</label>
										<input
											type="text"
											value={this.props.phoneNumber}
											name="phoneNumber"
											onChange={(e) => this.props.handleChange(e)}
											className="border-[1px] w-full border-[#ced4da] focus:border-[#7c3292] h-[40px] px-[1rem] focus-visible:outline-0 rounded-[8px]"
											placeholder="Your Phone Number"
										/>
									</div>
								</div>
								<div className="md:w-6/12 w-full">
									<div className="mb-[1rem]">
										<label className="text-[14px] lightDark">Company</label>
										<input
											type="text"
											value={this.props.company}
											name="company"
											onChange={(e) => this.props.handleChange(e)}
											className="border-[1px] w-full border-[#ced4da] focus:border-[#7c3292] h-[40px] px-[1rem] focus-visible:outline-0 rounded-[8px]"
											placeholder="Your company name if applicable"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-wrap">
						<div className="md:w-8/12 w-full">
							<div className="mb-[1rem]">
								<label className="text-[14px] lightDark">Message</label>
								<textarea
									name="message"
									value={this.props.message}
									onChange={(e) => this.props.handleChange(e)}
									className="border-[1px] w-full border-[#ced4da] focus:border-[#7c3292] py-3 px-[1rem] focus-visible:outline-0 rounded-[8px]"
									placeholder="Message Text *"
									rows="9"
								/>
								{this.props.errorsObj?.message ? (
									<span error className="red">
										{this.props.errorsObj.message[0]}
									</span>
								) : (
									""
								)}
							</div>
							<div className="text-right">
								<Button
									onClick={() => this.messageSend()}
									className="bg--purple h-[40px] inline-flex items-center px-12 rounded-[8px] hover:opacity-80 text-white"
									text={
										this.props.isLoading ? (
											<FaSpinner className="animate-[spin_2s_linear_infinite]" />
										) : (
											"Send"
										)
									}

								/>
							</div>
						</div>
						<div className="md:w-4/12 w-full"></div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoading: state.ContactReducer.isLoading,
		errorsObj: state.ContactReducer.errorsObj,
		name: state.ContactReducer.name,
		email: state.ContactReducer.email,
		phoneNumber: state.ContactReducer.phoneNumber,
		company: state.ContactReducer.company,
		message: state.ContactReducer.message,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		sendMessage: (query) => dispatch(contactActions.sendMessage(query)),
		handleChange: (event) =>
			dispatch({ type: HANDLE_CHANGE_CONTACT_US_SUCCESS, payload: event }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
