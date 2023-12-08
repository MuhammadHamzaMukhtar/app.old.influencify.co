import { Component } from "react";
import { connect } from "react-redux";
import avatar from "@assets/avatar.png";
import Anchor from "@components/global/Anchor";

class BrandProductTab extends Component {
	render() {
		return (
			<div className="grid grid-cols-12 gap-5 mb-12">
				{this.props.brandProducts.length ? (
					this.props.brandProducts.map((product, index) => (
						<div className="sm:col-span-6 col-span-12" key={index}>
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3">
								<div className="grid grid-cols-12 gap-5">
									<div className="md:col-span-3 sm:col-span-4 col-span-12">
										<Anchor
											href={product.url}
											target="_blank"
											rel="noopener noreferrer"
											text={
												<img
													src={
														product.images && product.images.length
															? product.images[0]
															: avatar
													}
													alt={product.name}
													className="w-[140px] rounded-full"
												/>
											}
										/>
									</div>
									<div className="md:col-span-9 sm:col-span-8 col-span-12">
										<div className="flex items-center w-full h-full">
											<h4 className="pl-4 text-[20px]">{product.name}</h4>
											<h4 className="align-bottom text-right text-[20px]">
												{product.value}{" "}
												{this.props.currentLoggedUser.currency_code}
											</h4>
										</div>
									</div>
								</div>
							</div>
						</div>
					))
				) : (
					<div className="text-center w-full col-span-12 py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
						We have nothing to show you here.
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currentLoggedUser: state.HeaderReducer.currentLoggedUser,
		brandProducts: state.BrandProfileReducer.brandProducts,
	};
};

export default connect(mapStateToProps, null)(BrandProductTab);
