import { Component } from "react";
import { IoStar } from "react-icons/io5";
import "./styles.css";

class pricingtokens extends Component {
	render() {
		return (
			<div className="pricing-screen">
				<div className="containers">
					<div className="row">
						<div className="col-lg-4 col-md-5 sm:w-8/12 mx-auto py-12 my-12">
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-12">
								<div>
									<p className="text-[20px] black font-medium text-center">
										Tokkens needed:
									</p>
									<input
										name="tokkens"
										placeholder="0"
										type="number"
										className="gray-placeholder pr-12 mt-6 rounded-[8px] form-control h-11 text-[22px] text-center font-medium gray"
									/>
								</div>
								<div className="text-center">
									<button
										type="button"
										className="my-6 px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
									>
										Buy Tokens
									</button>
								</div>
								<div className="flex justify-center items-center">
									<p className="mb-1">
										<IoStar size={15} className="text-warning" />
									</p>
									<p className="ml-2 darkGray">Most Popular choice:</p>
									<p className="purple ml-1">50,000 tokens</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default pricingtokens;
