import { Component } from "react";
import { Link } from "react-router-dom";
import squareimage from "@assets/avatar.png";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import * as productsActionCreator from "@store/actions/ProductsActions";
import { HANDLE_CHANGE_SUCCESS } from "@store/constants/action-types";
import { FiPlus } from "react-icons/fi";
import Emitter from "../../../constants/Emitter";
import { FaShopify } from "react-icons/fa";
import LinkTo from "@components/global/LinkTo";
import Pagination from "@components/Pagination";
import Loader from "@components/global/Loader";


class BrandProduct extends Component {
	componentDidMount() {
		this.onPageChanged({ currentPage: 1 });
	}
	handleAllProducts = (event) => {
		this.props.handleChange(event);
		this.props.fetchAllProducts({ retire_as_well: event.target.checked, page: 1 });
	};

	permissionDenied = () => {
		if (!this.props.refreshData.is_admin) {
			Emitter.emit("PERMISSION_POPUP");
		}
	};

	onPageChanged = (pageData) => {
		this.props.fetchProducts({ retire_as_well: this.props.retire_as_well, page: pageData?.currentPage });
	}

	render() {
		const url = window.location.href;
		if (localStorage.getItem("role") !== "brand") {
			window.location.href = "/";
		}

		const { refreshData } = this.props;
		return (
			<div>
				<Helmet>
					<meta charSet="utf-8" />
					<title>Products | Influencify</title>
					<link rel="canonical" href={url} />
				</Helmet>
				<div className="py-[20px] border-b-[1px] border-[#ddd] bg-white">
					<div className="containers">
						<div className="grid grid-cols-12 gap-5 items-center">
							<div className="lg:col-span-5 col-span-12 my-auto">
								<div className="flex flex-wrap gap-x-12 gap-y-5 items-center">
									<h2 className="dark text-[23px] font-italic font-bold black">
										Products
									</h2>
									<label
										htmlFor="login"
										className="cursor-pointer flex items-center text-[15px] font-normal xs:ml-0 ml-auto"
									>
										<input
											id="login"
											type="checkbox"
											checked={this.props.retire_as_well || false}
											name="retire_as_well"
											onChange={(e) => this.handleAllProducts(e)}
											className="hidden peer"
										/>
										<span className="mr-3 peer-checked:bg-[#7c3292] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292] rounded-sm"></span>
										Show retired as well
									</label>
								</div>
							</div>
							{refreshData.is_admin &&
								<div className="lg:col-span-7 col-span-12 my-auto">
									<div className="xs:flex grid gap-5 flex-wrap justify-end text-center mt-4 md:!mt-0">
										<LinkTo
											to={"/products/add"}
											onClick={this.permissionDenied}
											prefix={<FiPlus className="text-white mr-2" />}
											text="Add Product"
											className="xs:px-12 px-6 rounded-[8px] h-[40px] text-[14px] inline-flex justify-center items-center bg--purple text-white hover:opacity-80"
										/>
										<LinkTo
											to={"/products/voucher/add"}
											prefix={<FiPlus className="text-white mr-2" />}
											text="Add Discount/Voucher"
											onClick={this.permissionDenied}
											className="xs:px-12 px-6 rounded-[8px] h-[40px] text-[14px] inline-flex justify-center items-center bg--purple text-white hover:opacity-80"
										/>
									</div>
								</div>
							}
						</div>
					</div>
				</div>
				<div className="containers my-12">
					{(this.props.products || []).length ? (
						(this.props.products || []).map((row, index) => (
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] w-full p-3 mb-4">
								<Link
									to={`/products/${row.id}`}
									key={index}
									state={{ id: row.id }}
								>
									<div className="grid grid-cols-12 gap-5 items-center">
										<div className="md:col-span-9 col-span-12 ">
											<div className="xs:flex grid gap-5 items-center">
												<div className="relative inline-block w-[82px] xs:mx-0 mx-auto shrink-0">
													{row.is_shopify_product && (
														<div className="absolute top-[-10px] p-[4px] rounded-full bg-white shadow-md success">
															<FaShopify size={17} />
														</div>
													)}
													<img
														src={
															row.images && row.images.length
																? row.images[0]
																: squareimage
														}
														alt="offer"
														className="rounded-[14px] w-[82px]"
													/>
												</div>
												<div className="xs:ml-4 xs:text-left text-center">
													<h4 className="text-[17px] font-medium black">
														{row.name}
													</h4>
													<span className="darkGray font-normal">
														{row.offer_type}
													</span>
												</div>
											</div>
										</div>
										{/* <div className="md:col-span-3 col-span-12 text-center">
											<div className="table w-full h-full">
												<p className="table-cell align-middle">
													{row.no_of_products_left}
												</p>
											</div>
										</div> */}
										<div className="md:col-span-3 col-span-12 text-center">
											<div className="flex flex-wrap items-center xs:justify-end md:justify-center justify-center w-full h-full">
												<span className="flex md:hidden mr-2 darkGray font-normal">
													Product value:
												</span>
												{row.offer_type === "Voucher" ? (
													<h4 className="table-cell align-middle text-[20px]">
														{row.influencer_discount_value} %
													</h4>
												) : (
													<h4 className="table-cell align-middle text-[20px]">
														{row.value}{" "}
														{this.props.currentLoggedUser.currency_code}
													</h4>
												)}
											</div>
										</div>
									</div>
								</Link>
							</div>
						))
					) : (
						<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
							We have nothing to show you here.
						</div>
					)}

					<div className="inline-flex items-center justify-center mt-8 mb-4">
						{(this.props.meta?.total || 0) > 12 &&
							<Pagination
								totalRecords={this.props.meta?.total}
								pageLimit={12}
								pageNeighbours={12}
								onPageChanged={this.onPageChanged}
							/>
						}

						{/* {influencers && influencers.length>0 && !isLoading  && form.loadMore && 
						<Loader
							size="30"
						/>} */}

					</div>
				</div>


			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isPlanSubscribed: state.HeaderReducer.isPlanSubscribed,
		currentLoggedUser: state.HeaderReducer.currentLoggedUser,
		remainingPayPerProducts: state.HeaderReducer.remainingPayPerProducts,
		products: state.ProductsReducer.products,
		meta: state.ProductsReducer.meta,
		retire_as_well: state.ProductsReducer.retire_as_well,
		refreshData: state.HeaderReducer.refreshData,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleChange: (event) =>
			dispatch({ type: HANDLE_CHANGE_SUCCESS, payload: event }),
		fetchProducts: (query) =>
			dispatch(productsActionCreator.fetchProducts(query)),
		fetchAllProducts: (query) =>
			dispatch(productsActionCreator.fetchAllProducts(query)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandProduct);
