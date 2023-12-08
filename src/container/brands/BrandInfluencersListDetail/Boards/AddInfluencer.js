import Button from '@components/global/Button'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { FiChevronRight, FiX } from 'react-icons/fi'
import { connect } from 'react-redux'
import avatar from "@assets/avatar.png";

let timeout;

const FormatedNumber = ({ num }) => {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num;
};

const AddInfluencer = (props) => {
    const [influencer, setInfluencer] = useState({});
    const [isOpen, setIsOpen] = useState(false);

    const handleSearchFilters = (key, value) => {
        setIsOpen(true);
        setInfluencer(value);
        const {
            platform,
            handleSearchQuery,
            autoCompleteUsers,
        } = props;
        handleSearchQuery({ q: value });
        let query = {
            q: value,
            limit: 5,
            type: "search",
            platform: platform,
        };
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            autoCompleteUsers(query);
        }, 500);
    };

    const selectInfluencer = (value) => {
        setIsOpen(!isOpen)
        setInfluencer(value)
    }

    const handleAddInfluencers = async () => {
        let query = {
            boardId: props.boardId,
            listId: props.listId,
            influencer: { ...influencer, 'iq_user_id': influencer.user_id }
        }
        const result = await props.addInfluencer(query);
        if (!result.errors) {
            props.setModal(false);
            setInfluencer({});
        }
        loadMore();
    }

    const loadMore = (page = 1) => {
        const { platform, listId } = props;
        let query = {
            listId: listId,
            platform: platform,
        };
        props.getInfluencerList(page, query);
    };

    const handleCancelClick = () => {
        props.setModal(false);
        setInfluencer({});
        props.removeBoardErrors();
    }

    const { autocompleteLoading, autocomplete, platform, boardLoading, errorsObj, modal, setModal } = props;

    return (
        <div>
            <Transition appear show={modal} as={Fragment}>
                <Dialog onClose={() => setModal(false)} className="relative z-[9999]">
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
                            <Dialog.Panel className="mx-auto sm:min-w-[56rem] min-w-full min-h-[40%] rounded-[8px] bg-white">
                                <Dialog.Title className="text-white text-center grow flex justify-between border-b border-[#dee2e6] p-3">
                                    <h2 className="text-[24px] font-medium text-black">
                                        Add Influencers
                                    </h2>
                                    <div
                                        className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
                                        onClick={() => setModal(false)}
                                    >
                                        <FiX size={24} className="text-white stroke-white" />
                                    </div>
                                </Dialog.Title>
                                <div className="p-3">
                                    <div className="pt-7">
                                        <label className="text-[12px] black font-normal mb-0">
                                            Search Influencers or Groups
                                        </label>
                                        <div className="relative">
                                            <input
                                                placeholder="@handle"
                                                className="rounded-[8px] h-[40px] w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292] xs:text-[14px] text-[12px]"
                                                value={influencer ? (influencer.username || influencer?.handle) : ''}
                                                onChange={(e) => handleSearchFilters("url", e.target.value)}
                                            />
                                            {errorsObj && errorsObj?.user_id && (
                                                <span className="red">{errorsObj.user_id[0]}</span>
                                            )}
                                            {autocompleteLoading ? (
                                                <FaSpinner
                                                    className="animate-[spin_2s_linear_infinite] purple absolute right-[20px] top-[11px] z-[10]"
                                                    size={20}
                                                />
                                            ) : (
                                                <div className="bg-white absolute w-full z-[12]">
                                                    <div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] rounded-[8px]">
                                                        {isOpen && autocomplete && autocomplete.length
                                                            ? autocomplete.map((item, index) => (
                                                                <div
                                                                    className="block cursor-pointer"
                                                                    onClick={() =>
                                                                        selectInfluencer(item)
                                                                    }
                                                                    key={index}
                                                                >
                                                                    <div className="flex justify-between items-center px-[1rem] py-[0.5rem] border-b border-[#dee2e6]">
                                                                        <div className="flex items-center grow">
                                                                            <img
                                                                                src={item.picture ? item.picture : avatar}
                                                                                alt={item.username}
                                                                                className="rounded-full w-[48px]"
                                                                            />
                                                                            <div className="ml-4 flex flex-col">
                                                                                {platform !== "youtube" ? (
                                                                                    <p className="text-[13px]">{"@" + item.username}</p>
                                                                                ) : (
                                                                                    ""
                                                                                )}
                                                                                <div className="flex gap-3">
                                                                                    <span className="gray text-[13px]">
                                                                                        {item.fullname}
                                                                                    </span>
                                                                                    <span className="gray text-[13px]">
                                                                                        <FormatedNumber num={item.followers} /> Followers
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="text-right">
                                                                            <FiChevronRight className="text-[20px]" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                            : ""}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-56 mb-5 col-span-12">
                                        <Button
                                            className="px-6 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--lightGray text-black hover:opacity-80 mr-4"
                                            onClick={handleCancelClick}
                                            text="CANCEL"
                                        />
                                        <Button
                                            className="px-6 rounded-[8px] h-[40px] disabled:opacity-70 text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
                                            onClick={handleAddInfluencers}
                                            disabled={!influencer || !influencer.user_id}
                                            text={boardLoading ? (
                                                <FaSpinner className="animate-[spin_2s_linear_infinite] text-[19px]" />
                                            ) : ("ADD INFLUENCERS")}
                                        />

                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

const mapStateToProps = ({ influencerAnalyzer, brandList }) => {
    return {
        autocompleteLoading: influencerAnalyzer.autocompleteLoading,
        autocomplete: influencerAnalyzer.autocomplete,
        boardLoading: brandList.boardLoading,
        errorsObj: brandList.boardErrors,
    };
};

const mapDispatchToProps = (dispatch) => {
    const {
        actions: brandlistactions,
        types,
    } = require("@store/redux/BrandListRedux");
    const { actions: searchactions } = require("@store/redux/InfluencerAnalyzerRedux");
    return {
        handleSearchQuery: (data) => {
            searchactions.handleSearchQuery(dispatch, data);
        },
        autoCompleteUsers: (data) => {
            searchactions.autoCompleteUsers(dispatch, data);
        },
        addInfluencer: (data) => {
            return brandlistactions.addInfluencerToBoard(dispatch, data);
        },
        removeBoardErrors: () => {
            dispatch({ type: types.HANDLE_REMOVE_BOARD_ERRORS })
        },
        getInfluencerList: (page, data) => {
            brandlistactions.getInfluencerList(dispatch, page, data);
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddInfluencer);