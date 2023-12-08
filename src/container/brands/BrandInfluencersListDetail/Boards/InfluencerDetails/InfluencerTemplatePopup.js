import { Fragment, forwardRef, useImperativeHandle, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FiX } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";
import Button from "@components/global/Button";
import { actions, types } from "@store/redux/InfluencerSearchRedux";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const InfluencerTemplatePopup = forwardRef((props, ref) => {

    const [open, setIsOpen] = useState(false)
    const [form, setForm] = useState({})
    const [title, setTitle] = useState('')
    const loader = useSelector((state) => state.influencerSearch.isProfileLoading)
    const errors = useSelector((state) => state.influencerSearch.influencerEmailTemplatesErrors)
    const dispatch = useDispatch()

    useImperativeHandle(ref, () => ({
        open(data) {
            setIsOpen(true);
            setForm(data)
        },
        close() {
            setIsOpen(false);
        }

    }));

    const saveEmailTemplate = async () => {
        form['title'] = title
        const result = await actions.saveEmailTemplate(dispatch, form)
        if (!result.data?.errors) {
            setIsOpen(false)
            setTitle('')
        }
    }

    const handleCancel = () => {
        setIsOpen(false)
        setTitle('')
        dispatch({ type: types.REMOVE_VALIDATION_ERRORS })
    }

    const isEmptyOrSpaces = (str = '') => {
        return str === null || str.match(/^ *$/) !== null;
    };

    return (
        <>
            <Transition appear show={open} as={Fragment}>
                <Dialog onClose={() => setIsOpen(false)} className="relative z-[9999]">
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
                                <Dialog.Title className="text-white text-center grow flex justify-between items-center border-b border-[#dee2e6] p-3 sticky top-0 bg-white z-10">
                                    <h2 className="text-[17px] px-5 font-medium text-black">
                                        Save Email Template
                                    </h2>
                                    <div
                                        className="px-[12px] rounded-full mt-[2px] mr-[13px] h-[40px] w-[40px] shadow-[0px_10px_30px_#96969640] flex items-center cursor-pointer"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <FiX size={24} className="text-black stroke-black" />
                                    </div>
                                </Dialog.Title>
                                <div className="p-3">
                                    <div className="mb-6 space-y-4">
                                        <label>Template title</label>
                                        <input
                                            className="rounded-[8px] w-full px-[1rem] py-[0.5rem] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292] "
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="Enter template title"
                                        />
                                        {errors && (
                                            <div className="text-red-500">
                                                {errors.body && <p>{errors.body[0]}</p>}
                                                {errors.title && <p>{errors.title[0]}</p>}
                                                {errors.subject && <p>{errors.subject[0]}</p>}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex justify-end gap-3 pt-3 border-t border-t-[#dee2e6]">
                                        <Button
                                            className="px-5 rounded-[8px] h-[36px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
                                            onClick={handleCancel}
                                            text="Cancel"
                                        />
                                        <Button
                                            className={`${(isEmptyOrSpaces(title) || title.length < 3) && 'cursor-not-allowed'} px-5 rounded-[8px] h-[36px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70`}
                                            onClick={saveEmailTemplate}
                                            disabled={isEmptyOrSpaces(title) || title.length < 3 || loader}
                                            text={loader ? (
                                                <FaSpinner className="animate-[spin_2s_linear_infinite]" />
                                            ) : "Save"}
                                        />
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
})

export default InfluencerTemplatePopup;
