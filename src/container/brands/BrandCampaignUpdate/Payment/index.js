import { Component } from "react";
import { Tab } from "@headlessui/react";
import { MdDelete } from "react-icons/md";
import Select from "react-select";
import { connect } from "react-redux";
import Switch from "react-switch";
import "./styles.css";
import LinkTo from "@components/global/LinkTo";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";

const colourStyles = {
	option: (styles, { isSelected }) => {
		return {
			...styles,
			color: isSelected ? "#7d2d94" : null,
			fontWeight: isSelected ? "700" : null,
			backgroundColor: isSelected ? "#00000008" : null,
		};
	},
};

class Payment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			product_list: this.props.form?.campaign_payment?.campaign_products ?? [],
			has_gift_product: this.props.form?.campaign_payment?.has_gift_product ?? false,
			has_fixed_price: this.props.form?.campaign_payment?.has_fixed_price ?? false,
			has_influencer_email: this.props.form?.campaign_payment?.has_influencer_email ?? false,
		};
	}

	removeProduct = (value) => {
		const updatedProductList = this.state.product_list.filter((product) => product.value !== value);
		this.setState({ product_list: updatedProductList });
		this.addFormData('campaign_products', updatedProductList);
	}

	changeSwitch = (key, value) => {
		this.setState({ [key]: value })
		this.addFormData(key, value)
	}

	handleSelectChange = (product) => {
		let productList = Object.assign([], this.state.product_list);
		if (productList.filter((i) => i.value === product.value).length === 0) {
			if (productList.length >= 10) {
				toast.error('Products limit exceeded')
			} else {
				productList.push(product);
			}
		}
		this.setState({ product_list: productList })
		this.addFormData('campaign_products', productList)
	}

	addFormData = (key, value) => {
		const form = Object.assign({}, this.props.form);
		form['campaign_payment'][key] = value;
		this.props.addForm(form);
	}

	render() {
		const { product_list, has_fixed_price, has_gift_product } = this.state;
		const { refreshData, form, errors } = this.props;
		const products = (this.props.products || []).length > 0
			? (this.props.products).filter(i => i.offer_type == "Voucher").map((data) => ({
				label: data.name,
				value: data.id,
				price: data.value,
				images: data.images,
				discountCode: data.influencer_discount_code,
				discountPercentage: data.influencer_discount_value,

			}))
			: [];

		return (
			<div className="mb-12">
				<Tab.Group>
					{errors.toggle && (
						<div className="px-6 w-1/2 py-3 rounded-[8px] mb-4">
							<p className="text-[#dc3545]">{errors.toggle}</p>
						</div>
					)}
					<div className="grid grid-cols-12 gap-5">
						<div className="lg:col-span-4 md:col-span-6 col-span-12">
							<Tab.List className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] ml-0 p-3 sm:p-4 w-full">
								<Tab.Panel>
									<div className="flex flex-wrap">
										<div className="rounded-[8px] p-4 space-y-5">
											<div className="grid grid-cols-12 gap-5">
												<div className="sm:col-span-10 col-span-12">
													<p className="font-bold flex items-center">
														Enable fixed pay for influencers:
													</p>
												</div>
												<div className="sm:col-span-1 col-span-12">
													<Switch
														icons="false"
														onChange={() => this.changeSwitch('has_fixed_price', !has_fixed_price)}
														checked={has_fixed_price}
														disabled={
															form.campaign_status === "active" ? true : false
														}
														onColor="#7c3292"
														offColor="#888"
														offHandleColor="#fff"
														onHandleColor="#fff"
														handleDiameter={20}
														uncheckedIcon={false}
														checkedIcon={false}
														boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
														activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
														height={25}
														width={40}
														className="react-switch"
														id="material-switch"
													/>
												</div>
											</div>
											{has_fixed_price &&
												<>
													<p className="font-bold flex items-center">
														Enter the fixed value:
													</p>
													<p className="font-bold flex items-center">
														The amount that you wish to pay the influencers
													</p>
													<div className="grid grid-cols-4">
														<input
															type="text"
															className="col-span-1 font-semibold text-lg rounded-l-[8px] h-[40px] text-center inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
															value={'$'}
															disabled={true}
														/>
														<input
															type="number"
															// min={0}
															disabled={
																form.campaign_status === "active" ? true : false
															}
															value={form?.campaign_payment?.price}
															onChange={(e) => this.addFormData('price', parseInt(e.target.value))}
															// className="col-span-3 pl-6 rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
															className="col-span-3 px-[1rem] border-[1px] border-[#00000020] h-[40px] w-full focus-visible:outline-0 focus:border-[#7c3292] rounded-r-[8px]"
														// onInput={(e) => {
														// 	e.target.value = Math.max(
														// 		0,
														// 		parseInt(e.target.value)
														// 	)
														// 		.toString()
														// 		.slice(0, 10);
														// }}
														/>
													</div>
													{errors.price && (
														<div className="rounded-[8px] mb-4">
															<p className="text-[#dc3545]">{errors.price[0]}</p>
														</div>
													)}
													<p className="font-bold flex items-center">
														Allow influencers to propose cost:
													</p>
													<div className="flex gap-40">
														<div className="flex items-center ">
															<label
																htmlFor="yes"
																className="cursor-pointer flex items-center text-[15px] font-normal"
															>
																<input
																	id="yes"
																	type="radio"
																	name="is_influencer_propose"
																	disabled={
																		form.campaign_status === "active" ? true : false
																	}
																	checked={form?.campaign_payment?.is_influencer_propose ?? false}
																	onChange={(e) => this.addFormData(e.target.name, e.target.checked)}
																	className="hidden peer"
																/>
																<span className="mr-3 peer-checked:bg-[#7c3292] rounded-lg bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292]"></span>
																<p>Yes</p>
															</label>
														</div>
														<div className="flex items-center ">
															<label
																htmlFor="no"
																className="cursor-pointer flex items-center text-[15px] font-normal"
															>
																<input
																	id="no"
																	type="radio"
																	name="is_influencer_propose"
																	disabled={
																		form.campaign_status === "active" ? true : false
																	}
																	checked={!form?.campaign_payment?.is_influencer_propose ?? false}
																	onChange={(e) => this.addFormData(e.target.name, !e.target.checked)}
																	className="hidden peer"
																/>
																<span className="mr-3 peer-checked:bg-[#7c3292] rounded-lg bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292]"></span>
																<p>No</p>
															</label>
														</div>
													</div>
													<p className="font-bold flex items-center">
														Collect influencer's PayPal email id:
													</p>
													<div className="flex gap-40">
														<div className="flex items-center ">
															<label
																htmlFor="yes1"
																className="cursor-pointer flex items-center text-[15px] font-normal"
															>
																<input
																	id="yes1"
																	type="radio"
																	name="has_influencer_email"
																	checked={form?.campaign_payment?.has_influencer_email ?? false}
																	onChange={(e) => this.addFormData(e.target.name, e.target.checked)}
																	className="hidden peer"
																	disabled={
																		form.campaign_status === "active" ? true : false
																	}
																/>
																<span className="mr-3 peer-checked:bg-[#7c3292] rounded-lg bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292]"></span>
																<p>Yes</p>
															</label>
														</div>
														<div className="flex items-center ">
															<label
																htmlFor="no1"
																className="cursor-pointer flex items-center text-[15px] font-normal"
															>
																<input
																	id="no1"
																	type="radio"
																	checked={!form?.campaign_payment?.has_influencer_email ?? false}
																	name="has_influencer_email"
																	onChange={(e) => this.addFormData(e.target.name, !e.target.checked)}
																	className="hidden peer"
																	disabled={
																		form.campaign_status === "active" ? true : false
																	}
																/>
																<span className="mr-3 peer-checked:bg-[#7c3292] rounded-lg bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292]"></span>
																<p>No</p>
															</label>
														</div>
													</div>
													{/* {form?.campaign_payment?.has_influencer_email &&
														<>
															<input
																type="email"
																placeholder="Enter Email ID"
																value={form?.campaign_payment?.influencer_email ?? ''}
																onChange={(e) => this.addFormData('influencer_email', e.target.value)}
																className="col-span-3 pl-6 rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
															/>
															{errors.influencer_email && (
																<div className="px-6 w-1/2 py-3 rounded-[8px] mb-4">
																	<p className="text-[#dc3545]">{errors.influencer_email[0]}</p>
																</div>
															)}
														</>
													} */}
												</>
											}
										</div>
									</div>
								</Tab.Panel>
							</Tab.List>
						</div>
						<div className="lg:col-span-8 md:col-span-6 col-span-12">
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] ml-0 p-3 sm:p-4 w-full">
								<div className="mx-5 my-3 space-y-5">
									<div className="flex justify-between items-center pb-4">
										<p className="font-bold flex items-center">
											Enable voucher gifting flow:
										</p>
										<Switch
											icons="false"
											onChange={() => this.changeSwitch('has_gift_product', !has_gift_product)}
											checked={has_gift_product}
											onColor="#7c3292"
											offColor="#888"
											offHandleColor="#fff"
											onHandleColor="#fff"
											handleDiameter={20}
											uncheckedIcon={false}
											checkedIcon={false}
											boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
											activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
											height={25}
											disabled={
												form.campaign_status === "active" ? true : false
											}
											width={40}
											className="react-switch"
											id="material-switch"
										/>
									</div>
									{has_gift_product &&
										<>
											{product_list && product_list.length > 0 &&
												<>
													<p className="font-bold flex items-center">{product_list.length} Voucher added</p>
													<div className="border border-gray-300 p-4">
														<table className="w-full table-auto">
															<thead>
																<tr className="font-bold text-lg border-b-2 border-gray-300">
																	<td>Voucher</td>
																	<td>Discount</td>
																	{form.campaign_status !== "active" &&
																		<td>Action</td>
																	}
																</tr>
															</thead>
															<tbody>
																{product_list.map((product) => {
																	return (
																		<tr>
																			<td className="flex flex-wrap items-center gap-2"> <p>{product.label} ({product?.discountCode})</p></td>
																			<td>{(product.discountPercentage || 0)}%</td>
																			{form.campaign_status !== "active" &&
																				<td><MdDelete size={20} cursor={'pointer'} onClick={() => this.removeProduct(product.value)} /></td>
																			}
																		</tr>
																	)
																})}
															</tbody>
														</table>
													</div>
												</>
											}
											<div className="flex flex-wrap justify-between">
												<div>
													<p className="font-bold flex items-center">
														Voucher*
													</p>
												</div>
												{form.campaign_status !== "active" &&
													<div>
														<LinkTo
															to={refreshData.is_admin ? "/products/voucher/add" : "#"}
															onClick={this.permissionDenied}
															prefix={<FiPlus className="text-white" />}
															text="Add Voucher"
															className="ml-2 xs:px-12 px-6 rounded-[8px] h-[34px] text-[14px] inline-flex justify-center items-center bg--purple text-white hover:opacity-80"
														/>
													</div>
												}
											</div>
											{form.campaign_status !== "active" &&
												<>
													<Select
														options={products}
														isOptionSelected={false}
														styles={colourStyles}
														isSearchable={true}
														placeholder="Select Products"
														onChange={(e) => this.handleSelectChange(e)}
													/>
													{errors.campaign_products && (
														<div className="px-6 w-1/2 py-3 rounded-[8px] mb-4">
															<p className="text-[#dc3545]">{errors.campaign_products[0]}</p>
														</div>
													)}
												</>
											}
										</>
									}
								</div>
							</div>
						</div>
					</div>
				</Tab.Group>
			</div>
		);
	}
}

const mapStateToProps = ({ campaign, global, HeaderReducer }) => {
	return {
		products: global.products,
		form: campaign.form,
		errors: campaign.creation_errors,
		refreshData: HeaderReducer.refreshData,
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

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
