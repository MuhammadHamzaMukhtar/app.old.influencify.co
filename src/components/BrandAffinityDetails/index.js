import { Component, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FiX } from "react-icons/fi";
import "./style.css";
import { connect } from "react-redux";
import { BiDownArrowAlt } from "react-icons/bi";

class BrandAffinityDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            showTab: false,
        };
    }

    openbrandDetail = () => {
        this.setState({ open: true, showTab: false });
    };

    closeAddbrand = () => {
        this.setState({ open: false, showTab: false });
    };

    render() {
        const { title, data, likers } = this.props;
        return (
            <>
                <Transition appear show={this.state.open} as={Fragment}>
                    <Dialog onClose={this.closeAddbrand} className="relative z-[9999]">
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
                                <Dialog.Panel className="mx-auto min-w-[20rem] sm:min-w-[36rem] md:min-w-[56rem] lg:min-w-[56rem] rounded-[8px] bg-white h-3/5 overflow-y-auto overflow-x-hidden">
                                    <Dialog.Title className="text-white text-center grow flex justify-between p-3">
                                        <h2 className="text-[24px] font-medium text-[#000]">
                                            {title}
                                        </h2>
                                        <div
                                            className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
                                            onClick={this.closeAddbrand}
                                        >
                                            <FiX size={24} className="text-white stroke-white" />
                                        </div>
                                    </Dialog.Title>
                                    <div className="p-3">
                                        <div className="grid grid-cols-12 gap-5 items-center border-b border-[#dee2e6]">
                                            <div className="col-span-3">
                                                <div className="pt-3">
                                                    <label className="text-[12px] black font-normal mb-0">
                                                        Brand
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-span-2">
                                                <div className="pt-3">
                                                    <label className="text-[12px] black font-normal mb-0 flex items-center">
                                                        <BiDownArrowAlt className="text-xl" /> Followers
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-span-2">
                                                <div className="pt-3">
                                                    <label className="text-[12px] black font-normal mb-0 flex items-center">
                                                        Followers Affinity
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-span-2">
                                                <div className="pt-3">
                                                    <label className="text-[12px] black font-normal mb-0 flex items-center">
                                                        Likes
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-span-2">
                                                <div className="pt-3">
                                                    <label className="text-[12px] black font-normal mb-0 flex items-center">
                                                        Likers Affininty
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            {data && data.length > 3 ? (
                                                data.map((item, key) => {
                                                    return (
                                                        <div key={key} className="grid grid-cols-12 gap-5 items-center border-b border-[#dee2e6] py-3">
                                                            <div className="col-span-3">
                                                                <p className="text-[17px] text-black text-normal ml-3">
                                                                    {item.name}
                                                                </p>
                                                            </div>
                                                            <div className="col-span-2">
                                                                {((item.weight || 0) * 100).toFixed(2)}%
                                                            </div>
                                                            <div className="col-span-2">
                                                                {(item.affinity || 0).toFixed(2)}
                                                            </div>
                                                            <div className="col-span-2">
                                                                {likers && likers.map((liker) => liker.name == item.name && (liker.weight * 100).toFixed(2) + '%')}
                                                            </div>
                                                            <div className="col-span-2">
                                                                {likers && likers.map((liker) => liker.name == item.name && (liker.affinity).toFixed(2))}
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            ) : ''}
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        
    };
};

const mapDispatchToProps = (dispatch) => {
    const { actions } = require("@store/redux/SubAccountRedux");
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps, undefined, {
    forwardRef: true,
})(BrandAffinityDetail);
