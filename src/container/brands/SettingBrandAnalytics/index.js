import { Component, Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import SettingHeader from "@components/BrandSettings/SettingHeader";
import SettingBrandIntegrationTopTab from "@components/SettingBrandIntegrationTopTab";
import SettingBrandSidebar from "@components/SettingBrandSidebar";
import Loader from "@components/global/Loader";
import { connect } from "react-redux";
import * as settingGmailActions from "@store/actions/SettingGmailActions";
import { HANDLE_GMAIL_SETTING_CHANGE } from "@store/constants/action-types";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import Influencify from "../../../constants/Influencify";
import { FaSpinner } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import Button from "@components/global/Button";
import Anchor from "@components/global/Anchor";

class SettingBrandAnalytics extends Component {
	constructor(props) {
		super(props);
		this.state = {
            properties: [],
            property_id: null,
            account_id: null,
            message: "",
            loading:false,
            disconnectModal:false
        };
	}

	async componentDidMount() {
        await this.props.fetchGoogleAnalyticsStatus();
        await this.props.fetchGoogleAnalyticsSummary();
        const { gaStatus } = this.props;
        if (gaStatus.account_id) {
            this.onAccountSelect(gaStatus.account_id);
        }
        if (gaStatus.property_id) {
            this.onPropertySelect(gaStatus.property_id);
        }
    }

    handleUpdateGmailSetting = () => {
        const query = {
            name: this.props.name,
        };
        this.props.handleGmailUpdate(query);
    };

    gmailSync = async () => {
        const json = await Influencify.fetchConnectAnalyticsUrl();
        if(json.status==200){
            window.location.href = json?.data;
        }
        
    };

    showDisconnetModal = () => {
        this.setState({
            disconnectModal: true,
        });
    };

    handleClose = () => {
        this.setState({
            disconnectModal: false,
        });
    };
    gmailDisconnect = async () => {
        this.setState({
            disconnectModal: false,
        });
        await Influencify.disconnectGoogleAnalytics();
        this.props.fetchGoogleAnalyticsStatus();
        
    };

    onAccountSelect = (e) => {
        let properties = [];
        const { data } = this.props;
        if (e) {
            properties = data.filter(i => i.account == e)[0].propertySummaries;
        }
        
        this.setState({ properties: properties, account_id: e, property_id:null});
    }

    onPropertySelect = (e) => {
        this.setState({ property_id: e });
    }

    saveProperty = async () => {
        const { property_id, account_id } = this.state;
        if (!property_id) {
            this.setState({ message: "Please select property." });
            return;
        }
        const data = { property_id,account_id };

        this.setState({ message: "", loading:true });
        await Influencify.saveGoogleAnalyticsSummary(data);
        this.setState({ loading: false });
        toast.success("Settings saved successfully");

    }

	render() {
        if (localStorage.getItem("role") != "brand") {
            window.location.href = "/";
        }
        if (this.props.isPlanSubscribed === false) {
            this.props.history.replace("/billing");
        }
        if (this.props.isLoading) {
            return <Loader />;
        }
		const { gaStatus, data } = this.props;
        const { properties, message, loading } = this.state;
		return (
			<div className="setting-tab-navigation">
				<SettingHeader />
				<SettingBrandIntegrationTopTab />
				<div className="containers mb-12">
					<div className="grid grid-cols-12 gap-5">
						<div className="md:col-span-3 sm:col-span-6 lg:col-start-1 sm:col-start-4 col-span-12">
							<SettingBrandSidebar />
						</div>
						<div className="md:col-span-9 col-span-12 mt-12 md:!mt-0">
                            <h4 className="font-semibold mb-4 text-[20px]">Analytics</h4>
							<div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] p-3 sm:!p-12 mb-12">
                                {(gaStatus && gaStatus.id) ? (
								    <>
                                        <div class="w-full max-w-lg">
                                            <div class="flex flex-wrap -mx-3 mb-2">
                                                <div class="w-full  px-3 mb-6 md:mb-2">
                                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                                                        Account
                                                    </label>
                                                    <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" onChange={(e) => this.onAccountSelect(e.target.value)}>
                                                        <option value={""}>Select account</option>
                                                        {data && data.length > 0 && data.map((item, key) => (
                                                            <option selected={gaStatus.account_id==item.account} value={item.account} key={key}>{item.displayName}</option>
                                                        ))}
                                                    </select>   
                                                </div>
                                                <div class="w-full px-3 mb-6 md:mb-2">
                                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                                        Property
                                                    </label>
                                                    <div class="relative">
                                                        <select  onChange={(e) => this.onPropertySelect(e.target.value)} class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                                            <option>Select property</option>
                                                                {properties && properties.length > 0 && properties.map((item, key) => (
                                                                <optgroup label={item.displayName} key={key}>
                                                                    <option selected={gaStatus.property_id==item.property} value={item.property} >{item.property}</option>
                                                                </optgroup>
                                                            ))}
                                                        </select>
                                                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="w-full px-3 mt-3 mb-6 md:mb-0">
                                                    {message && message.length > 0 && 
                                                        <p className="text-danger">{message}</p>
                                                    }
                                                    <Button
                                                        onClick={this.saveProperty}
                                                        className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg-[#7c3292] text-white hover:opacity-80"
                                                        text={loading ? <FaSpinner className="animate-[spin_2s_linear_infinite]" /> : 'Save'} 
                                                    />
                                                    <Button
                                                        text="Disconnect"
                                                        onClick={() =>
                                                            this.showDisconnetModal()
                                                        }
                                                        variant="danger"
                                                        className="self-end ml-2 px-6 rounded-[8px] h-[40px] text-[14px] bg-[#dc3545] text-white hover:opacity-80"
                                                    />
                                                </div>
                                            </div>
                                        </div>
								    </>
								) : (
									<div className="items-center justify-center flex">
											<div
												className="flex border-[1px] border-[#dee2e6] cursor-pointer rounded-[8px] p-3"
												onClick={this.gmailSync}
											>
												<div className="pr-3 pt-2 sm:flex hidden ">
													<FcGoogle size={18} />
												</div>
												<div className="flex justify-between grow items-center">
													<div className="flex flex-col tracking-[2px] grow">
														<p className="text-[8px] gray">GOOGLE</p>
														<h6 className="text-[13px]">Analytics</h6>
													</div>
												</div>
											</div>
									</div>
								)}
							</div>
							
						</div>
					</div>
				</div>
                <Transition appear show={this.state.disconnectModal} as={Fragment}>
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
									<Dialog.Title className="text-white text-center grow flex justify-between border-b border-[#dee2e6] p-3">
										<h2 className="text-[24px]">Are You Sure?</h2>
										<div
											className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
											onClick={this.handleClose}
										>
											<FiX size={24} className="text-white stroke-white" />
										</div>
									</Dialog.Title>
									<div className="p-3">
										<p className="font-medium text-[15px]">
                                        Do you want to disconnect your Google Analytics Account
										</p>
										<div className="flex justify-end pt-2 border-t border-[#dee2e6] mt-4">
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mt-2"
												onClick={this.handleClose}
												text="Cancel"
											/>
											<Button
												className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mt-2 ml-4"
												onClick={this.gmailDisconnect}
												text="Yes"
											/>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition>
				
			</div>
		);
	}
}

const mapStateToProps = ({ googleAnalytics }) => {
    return {
        gaStatus: googleAnalytics.gaStatus,
        data: googleAnalytics.data,
    };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const { dispatch } = dispatchProps;
    const {
        actions,
    } = require("../../../store/redux/GoogleAnalyticsRedux");
    return {
        ...ownProps,
        ...stateProps,
        fetchGoogleAnalyticsStatus: () => {
            return actions.fetchGoogleAnalyticsStatus(dispatch);
        },
        fetchGoogleAnalyticsSummary: () => {
            return actions.fetchGoogleAnalyticsSummary(dispatch);
        },
    };
};

export default connect(mapStateToProps, undefined, mergeProps)(SettingBrandAnalytics);
