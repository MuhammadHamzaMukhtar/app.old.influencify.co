import { Component, Fragment, createRef } from "react";
import { Popover, Dialog, Transition } from "@headlessui/react";
import { FiX } from "react-icons/fi";
import Button from "@components/global/Button";
import SettingHeader from "@components/BrandSettings/SettingHeader";
import SettingBrandSidebar from "@components/SettingBrandSidebar";
import Loader from "@components/global/Loader";
import { connect } from "react-redux";
import { HANDLE_SHOPIFY_STORE_URL_CHANGE } from "@store/constants/action-types";
import * as settingShopifyActions from "@store/actions/SettingShopifyActions";
import SettingBrandIntegrationTopTab from "@components/SettingBrandIntegrationTopTab";
import { NavLink } from "react-router-dom";
import { MdLock } from "react-icons/md";
import Tooltip from "@components/global/Tooltip";
import { FiPlus } from "react-icons/fi";
import Influencify from "../../constants/Influencify";
import Emitter from "../../constants/Emitter";
import { toast } from "react-toastify";
import Popup from "@components/Popup";

const isFeatureEnable = (plan) => {
	const plans = [
		"business_month",
		"business_year",
		"agency_month",
		"agency_year",
	];
	return plans.includes(plan);
};

class BrandSettingShopify extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowModal: false,
			disconnectModal: false,
			loading:false,
			loadingInstall:false
		};
		this.popupRef = createRef(null);
	}

	handleClose = () => {
		this.setState({
			isShowModal: false,
		});
	};
	
	isEmptyOrSpaces = (str) => {
		return str === null || str.match(/^ *$/) !== null;
	};

	handleShow = () => {
		this.setState({
			isShowModal: true,
		});
	};

	handleShopifySync = async () => {
		this.setState({loadingInstall:true})

		const json  = await Influencify.shopifyInstall({shop:this.props.shopUrl});
		this.setState({loadingInstall:false})
		if(json.status==200){
			if(json.data?.status){
				window.location.href = json.data?.message;
			} else {
				this.setState({
					isShowModal: false,
				}, () => {
					this.popupRef?.current?.open({
						title:"Attention required",
						description:json.data?.message,
					})
				});
				
			}
		}


	};

	showDisconnetModal = () => {
		this.setState({
			disconnectModal: true,
		});
	};

	shopifyDisconnect = () => {
		this.setState({
			disconnectModal: false,
		});
		this.props.disconnectShopifyStore();
	};

	cancelSubscription = async () => {
		this.setState({loading:true});
		const json = await Influencify.cancelSubscriptionNow({});
		this.setState({loading:false});
		if(json.status==200){
			toast.success(json.data);
			this.popupRef?.current?.close();
		}
		


	}

	render() {
		const { refreshData, shopUrl } = this.props;
		if (localStorage.getItem("role") !== "brand") {
			window.location.href = "/";
		}
		if (this.props.isPlanSubscribed === false) {
			this.props.history.replace("/billing");
		}
		if (this.props.isLoading) {
			return <Loader />;
		}
		return (
			<div className="setting-tab-navigation">
				<SettingHeader />
				<SettingBrandIntegrationTopTab />
				<div className="containers">
					<div className="grid grid-cols-12 gap-5">
						<div className="md:col-span-3 md:col-start-1 sm:col-span-6 sm:col-start-4 col-span-12">
							<SettingBrandSidebar />
						</div>
						<div className="md:col-span-9 col-span-12">
							<h4 className="font-semibold mb-4 text-[20px]">Shopify</h4>
							{/* {isFeatureEnable(refreshData?.identifier) ? ( */}
								<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3 sm:!p-12 mb-12">
									{this.props.currentLoggedUser &&
									this.props.currentLoggedUser?.shopify? (
										<>
											<div className="items-center justify-center flex">
												{this.props.currentLoggedUser.shopify && (
													<p className="text-[18px] mb-2 text-gray-700 font-medium">
														{this.props.currentLoggedUser.shopify.shop}{" "}
													</p>
												)}
											</div>
											<div className="items-center gap-3 mt-2 justify-center flex">
												<Button
													className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg-[#198754] text-white hover:opacity-80"
													onClick={() => this.props.startImportProduct()}
													text="Import Product"
												/>
											</div>
										</>
									) : (
										<div className="grid grid-cols-12 gap-5">
											<div className="items-center justify-center flex col-span-12">
												{/* <Button
													onClick={() => this.handleShow()}
													className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
													text="Shopify Sync"
												/> */}
												Add Influencify app from Shopify store
											</div>
										</div>
									)}
								</div>
							{/*	
							) : (
								<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3 sm:!p-12 mb-12">
									<Popover className="bg-white flex items-center relative">
										<Popover.Button
											as="div"
											className="bg-transparent p-0 w-auto inline-block items-center"
										>
											<Tooltip
												trigger={
													<NavLink
														className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
														to="/billing"
													>
														<FiPlus size={16} className="mr-1" />
														Connect Shopify
														<MdLock className="ml-1" size={16} />
													</NavLink>
												}
												tooltipText="Please upgrade your subscription to add Shopify"
												placement="top-left"
											/>
										</Popover.Button>
									</Popover>
								</div>
											)*/
								}
						</div>
					</div>
				</div>

				<Transition appear show={this.state.isShowModal} as={Fragment}>
					<Dialog onClose={this.handleClose} className="relative z-[9999]">
						<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
						<div className="fixed inset-0 flex items-center justify-center p-4">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="mx-auto sm:min-w-[36rem] min-w-full rounded-[8px] bg-white">
									<Dialog.Title className="text-center grow flex justify-between border-b border-[#dee2e6] p-3">
										<h2 className="text-[24px]">Are you sure?</h2>
										<div
											className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
											onClick={this.handleClose}
										>
											<FiX size={24} className="text-white stroke-white" />
										</div>
									</Dialog.Title>
									<div className="p-3">
										<div className="mb-[1rem]">
											<label className="text-[14px] font-medium">
												Shopify Store Url
											</label>
											<div className="mb-0 md:!mb-4">
											<div class="flex">
												<input
													placeholder="Your store username"
													onChange={(e) => this.props.handleChange(e)}
													name="shopUrl"
													className="rounded-l-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
												/>
												<span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
												.myshopify.com
												</span>
												</div>
											</div>
										</div>
										<div className="flex justify-end pt-2 border-t border-[#dee2e6] mt-4">
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mt-2"
												onClick={this.handleClose}
												text="Cancel"
											/>
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mt-2 ml-4"
												onClick={() =>
													this.handleShopifySync(this.props.shopUrl)
												}
												disabled={this.isEmptyOrSpaces(shopUrl)}
												text="Install"
											/>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition>

				<Transition appear show={this.state.disconnectModal} as={Fragment}>
					<Dialog
						onClose={() => this.setState({ disconnectModal: false })}
						className="relative z-[9999]"
					>
						<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
						<div className="fixed inset-0 flex items-center justify-center p-4">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="mx-auto sm:min-w-[36rem] min-w-full rounded-[8px] bg-white">
									<Dialog.Title className="text-white text-center grow flex justify-between border-b border-[#dee2e6] p-3">
										<h2 className="text-[24px]">Are You Sure?</h2>
										<div
											className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
											onClick={() => this.setState({ disconnectModal: false })}
										>
											<FiX size={24} className="text-white stroke-white" />
										</div>
									</Dialog.Title>
									<div className="p-3">
										<p className="font-medium text-[15px]">
											Do you want to disconnect your Shopify Account
										</p>
										<div className="flex justify-end pt-2 border-t border-[#dee2e6] mt-4">
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mt-2"
												onClick={() =>
													this.setState({ disconnectModal: false })
												}
												text="Cancel"
											/>
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mt-2 ml-4"
												onClick={this.shopifyDisconnect}
												text="Yes"
											/>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition>
				<Popup ref={this.popupRef} onClose={() => { }}>
				<div className="flex gap-2">
				<button disabled={this.state.loading} onClick={this.cancelSubscription} className={`self-end mt-4 mb-4 w-full bg--purple  py-2 rounded-md hover:!shadow-none focus:!shadow-none min-w-[100px] text-white text-center`}>{this.state.loading?"Cancel...":"Cancel Subscription"}</button>

				<button onClick={()=>this.popupRef?.current?.close()} className={`self-end mt-4 mb-4 w-full bg-gray-400  py-2 rounded-md hover:!shadow-none focus:!shadow-none min-w-[100px] text-white text-center`}>No</button>
				</div>
            </Popup>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isPlanSubscribed: state.HeaderReducer.isPlanSubscribed,
		currentLoggedUser: state.HeaderReducer.currentLoggedUser,
		isLoading: state.SettingShopifyReducer.isLoading,
		shopUrl: state.SettingShopifyReducer.shopUrl,
		refreshData: state.HeaderReducer.refreshData,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleChange: (event) =>
			dispatch({ type: HANDLE_SHOPIFY_STORE_URL_CHANGE, payload: event }),
		disconnectShopifyStore: () =>
			dispatch(settingShopifyActions.disconnectShopifyStore()),
		startImportProduct: () =>
			dispatch(settingShopifyActions.startImportProduct()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BrandSettingShopify);
