import { Component } from "react";
import { Tab } from "@headlessui/react";
import BrandProfileHeader from "./BrandProfileHeader";
import BrandReview from "./BrandReview";
import BrandProductTab from "./BrandProductTab";
import Loader from "@components/global/Loader";
import { connect } from "react-redux";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}
class BrandProfile extends Component {
	render() {
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
				<div className="containers">
					<BrandProfileHeader />
				</div>

				<Tab.Group defaultIndex={0}>
					<div className="bg-gradient-to-b from-[#f2f2f2] to-[#fff] border-b-[3px] border-[#ccc] min-h-[50px] mb-[42px]">
						<div className="containers">
							<div className="flex flex-wrap">
								<Tab.List className="flex mb-0">
									<Tab
										className={({ selected }) =>
											classNames(
												"mr-[20px] min-w-[80px] text-center relative leading-[33px] text-black  before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] py-[0.5rem] px-[1rem] block before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0",
												selected
													? "font-semibold before:w-full"
													: "font-normal before:w-0"
											)
										}
									>
										Review References
									</Tab>
									<Tab
										className={({ selected }) =>
											classNames(
												"mr-[20px] min-w-[80px] text-center relative leading-[33px] text-black  before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] py-[0.5rem] px-[1rem] block before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0",
												selected
													? "font-semibold before:w-full"
													: "font-normal before:w-0"
											)
										}
									>
										Products
									</Tab>
								</Tab.List>
							</div>
						</div>
					</div>
					<div className="containers">
						<Tab.Panels className="bg-transparent">
							<Tab.Panel>
								<BrandReview />
							</Tab.Panel>
							<Tab.Panel>
								<BrandProductTab />
							</Tab.Panel>
						</Tab.Panels>
					</div>
				</Tab.Group>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoading: state.BrandProfileReducer.isLoading,
	};
};

export default connect(mapStateToProps, null)(BrandProfile);
