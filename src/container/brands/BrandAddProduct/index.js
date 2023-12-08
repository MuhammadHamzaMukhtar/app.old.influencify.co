import { Component } from "react";
import { BsQuestionCircle } from "react-icons/bs";
import Tooltip from "@components/global/Tooltip";
import Select from "react-select";
import ImageUploader from "react-images-upload";
import { connect } from "react-redux";
import { REST_RESPONSE_STATUS } from "@store/constants/action-types";
import * as addProductActionCreator from "@store/actions/AddProductActions";
import { HANDLE_CHANGE_SUCCESS } from "@store/constants/action-types";
import { HANDLE_SELECT_CHANGE_SUCCESS } from "@store/constants/action-types";
import Button from "@components/global/Button";
import { FaSpinner } from "react-icons/fa";
import ReactQuill from "react-quill";
import "./styles.css";

const colourStyles = {
	option: (styles, { data, isDisabled, isFocused, isSelected }) => {
		return {
			...styles,
			color: isSelected ? "#7d2d94" : null,
			fontWeight: isSelected ? "700" : null,
			backgroundColor: isSelected ? "#00000008" : null,
		};
	},
};

class BrandAddProduct extends Component {
	constructor(props) {
		super(props);
		this.onDrop = this.onDrop.bind(this);
	}

	componentDidMount() {
		this.props.fetchCategories();
	}

	componentDidUpdate() {
		if (this.props.response_status.statusText === "Created") {
			this.props.resetResponseStatus();
			this.props.Navigate("/products");
		}
	}

	componentWillUnmount() {
		if (this.props.errorsObj) {
			this.props.errorsObj.category = "";
			this.props.errorsObj.name = "";
			this.props.errorsObj.value = "";
		}
	}

	handleAddProduct = () => {
		const query = {
			category: this.props.selectedCategory,
			name: this.props.name,
			value: this.props.value,
			url: this.props.url,
			description: this.props.description,
			product_images: this.props.product_images,
		};
		this.props.handleProductAdd(query);
	};

	onDrop(pictureFiles, pictureDataURLs) {
		this.props.handleOnDrop(pictureDataURLs);
	}

	onDropEmpty = () => {
		let query ={
			product_images : []
		}
		this.props.handleOnEmpty(query);
		this.props.Navigate("/products");
	}

	render() {
		const categories = (this.props.categories || []).map((data) => ({
			label: data.name,
			value: data.id,
		}));
		const { loading } = this.props;
		return (
			<div className="mb-12">
				<div className="py-[20px] border-b-[1px] border-[#ddd] bg-white">
					<div className="containers">
						<h2 className="dark text-[23px] font-italic font-bold">
							ADD NEW PRODUCT
						</h2>
					</div>
				</div>
				<div className="containers mt-12">
					<div className="grid grid-cols-12 gap-5">
						<div className="md:col-span-8 col-span-12">
							<div className="flex items-center mb-4">
								<h4 className="text-[20px]">Product Details</h4>
								<Tooltip
									trigger={
										<div className="ml-2">
											<BsQuestionCircle className="dark" size={20} />
										</div>
									}
									tooltipText="Add the details for a product you want to use to reward
									influencers with, giving them a form of payment, whilst also
									boosting your brand presence."
									placement="top-left"
								/>
							</div>
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-4">
								<div className="grid grid-cols-12 gap-5">
									<div className="sm:col-span-6 col-span-12">
										<label className="text-[#282b3c] font-semibold">
											Category
										</label>
										<Select
											options={categories}
											styles={colourStyles}
											isSearchable={true}
											placeholder="Select Category"
											onChange={this.props.handleSelectChange}
										/>
										{this.props.errorsObj?.category ? (
											<span className="red">
												{this.props.errorsObj.category[0]}
											</span>
										) : (
											""
										)}
									</div>
									<div className="col-span-6"></div>
									<div className="sm:col-span-6 col-span-12">
										<label className="text-[#282b3c] font-semibold">
											Product Name
										</label>
										<input
											type="text"
											name="name"
											className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
											onChange={(e) => this.props.handleChange(e)}
											placeholder="Enter Name"
										/>
										{this.props.errorsObj?.name ? (
											<span className="red">
												{this.props.errorsObj.name[0]}
											</span>
										) : (
											""
										)}
									</div>
									<div className="sm:col-span-6 col-span-12">
										<label className="text-[#282b3c] font-semibold">
											Value
										</label>
										<div className="flex items-center">
											<input
												className="rounded-l-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292] text-right"
												onChange={(e) => this.props.handleChange(e)}
												name="value"
												type="number"
											/>
											<div className="bg-[#e9ecef] h-[40px] px-[0.75rem] text-[#495057] rounded-r-[8px] border-l-0 text-[14px] border-[1px] border-[#ced4da] flex items-center justify-center">
												{this.props.currentLoggedUser.currency_code}
											</div>
										</div>
										{this.props.errorsObj?.value ? (
											<span className="red">
												{this.props.errorsObj.value[0]}
											</span>
										) : (
											""
										)}
									</div>
									<div className="col-span-12">
										<label className="text-[#282b3c] font-semibold">URL</label>
										<input
											type="text"
											placeholder="Enter Url"
											className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
											onChange={(e) => this.props.handleChange(e)}
											name="url"
										/>
										<small className="text-[#6c757d]">
											(i.e https://example.com)
										</small>
										{this.props.errorsObj?.url ? (
											<span className="red">{this.props.errorsObj.url[0]}</span>
										) : (
											""
										)}
									</div>
									<div className="col-span-12">
										<label className="text-[#282b3c] font-semibold">
											Description
										</label>
										<ReactQuill
											className="editor-class add-product"
											onChange={(editor) =>
												this.props.handleChange({
													target: { name: "description", value: editor },
												})
											}
											theme="snow"
										/>
										{this.props.errorsObj?.description ? (
											<span className="red">
												{this.props.errorsObj.description[0]}
											</span>
										) : (
											""
										)}
									</div>
								</div>
							</div>
						</div>
						<div className="md:col-span-4 col-span-12">
							<h4 className="mb-4 text-[20px]">
								Images{" "}
								<span className="ml-1 text-[12px] darkGray font-normal">
									(optional)
								</span>
							</h4>
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-12 sm:p-4 mb-2 text-center">
								<ImageUploader
									defaultImages={this.props.product_images}
									withPreview={true}
									buttonText="Add Image"
									onChange={this.onDrop}
									label="Max file size: 1mb, max images:5, accepted: jpg, gif, png"
									imgExtension={[".jpg", ".gif", ".png"]}
									maxFileSize={1048576}
								/>
								{this.props.errorsObj &&
									this.props.errorsObj?.product_images && (
										<span className="red">
											{this.props.errorsObj.product_images[0]}
										</span>
									)}
							</div>
							<div className="pt-12">
								<Button
									disabled={loading}
									onClick={this.handleAddProduct}
									className="px-12 rounded-[8px] h-[40px] w-full text-[14px] inline-flex items-center justify-center bg--purple text-white hover:opacity-80"
									text={
										loading ? (
											<FaSpinner className="animate-[spin_2s_linear_infinite] pink" />
										) : (
											"Save"
										)
									}
								/>
								<Button
									onClick={this.onDropEmpty}
									text={"Cancel"}
									className="px-12 rounded-[8px] h-[40px] w-full text-[14px] inline-flex items-center justify-center mt-6 bg-[#8d8d8d] text-white hover:opacity-80"
								/>
							</div>
							{/* <div className="pt-12">
                <Button
                  disabled={loading}
                  onClick={this.handleAddProduct}
                  className="px-12 rounded-[8px] h-[40px] w-full text-[14px] inline-flex items-center justify-center bg--purple text-white hover:opacity-80"
                >
                  {loading ? (
                    <FaSpinner className="animate-[spin_2s_linear_infinite] pink" />
                  ) : (
                    "Save"
                  )}
                </Button>
                <Link to="/products">
                  <Button
                    // variant="secondary"
                    className="px-12 rounded-[8px] h-[40px] w-full text-[14px] inline-flex items-center justify-center mt-6 bg-[#8d8d8d] text-white hover:opacity-80"
                  >
                    Cancel
                  </Button>
                </Link>
              </div> */}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currentLoggedUser: state.HeaderReducer.currentLoggedUser,
		remainingPayPerProducts: state.HeaderReducer.remainingPayPerProducts,
		errorsObj: state.AddProductReducer.errorsObj,
		categories: state.AddProductReducer.categories,
		name: state.AddProductReducer.name,
		value: state.AddProductReducer.value,
		url: state.AddProductReducer.url,
		description: state.AddProductReducer.description,
		selectedCategory: state.AddProductReducer.selectedCategory,
		product_images: state.AddProductReducer.product_images,
		response_status: state.AddProductReducer.response_status,
		loading: state.AddProductReducer.loading,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		fetchCategories: () => dispatch(addProductActionCreator.fetchCategories()),
		handleChange: (event) =>
			dispatch({ type: HANDLE_CHANGE_SUCCESS, payload: event }),
		handleSelectChange: (event) =>
			dispatch({ type: HANDLE_SELECT_CHANGE_SUCCESS, payload: event }),
		handleOnDrop: (event) =>
			dispatch({ type: "ADD_PRODUCT_ON_DROP_FILE", payload: event }),
		handleOnEmpty: (event) =>
			dispatch({ type: "ADD_PRODUCT_ON_EMPTY_FILE", payload: event }),
		handleProductAdd: (query) =>
			dispatch(addProductActionCreator.handleProductAdd(query, ownProps)),
		resetResponseStatus: () => dispatch({ type: REST_RESPONSE_STATUS }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandAddProduct);
