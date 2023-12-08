import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, forwardRef, useImperativeHandle } from 'react'
import {RxCross2} from 'react-icons/rx'
import { useSelector } from 'react-redux';
const AnalyzerConfirmation = forwardRef(({onClose, proceed, onChange }, ref) => {

    const refreshData = useSelector(state=> Object.assign({}, state.HeaderReducer?.refreshData));
    const [isOpen, setIsOpen] = useState(false);
    const [credits, setCredits] = useState(0);

    useImperativeHandle(ref, () => ({
        open(credits){
            setIsOpen(true);
            setCredits(credits);
        }
    
    }));

    
    const close = () => {
        setIsOpen(false);
        setCredits(0);
        onClose();
    }

    const action = () => {
        setIsOpen(false);
        proceed()
    }




    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-[1022]" onClose={close}>
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className='flex justify-between items-center'>
                                        <div></div>
                                        <Dialog.Title
                                            as="h3"
                                            className="text-2xl font-bold text-center leading-6 text-black"
                                        >
                                            Analyze Profile
                                        </Dialog.Title>
                                        <div className='cursor-pointer' onClick={close}>
                                            <RxCross2 size={20} />
                                        </div>
                                    </div>
                                    <div className="text-left w-full space-y-3 mt-5">
                                        <h1 className="text-bold text-xl">Confirmation</h1>
                                        <div className="flex justify-between">
                                            <span className="text-[#979797]">Service Cost :</span>
                                            <span className="text-[#202020]">{credits} Credit</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-[#979797]">Your balance :</span>
                                            <span className="text-[#202020]">{(refreshData?.remainingCredits || 0)}  Credit</span>
                                        </div>
                                        <div className="mt-5">
                                            <label
                                                htmlFor="dontShow"
                                                className="cursor-pointer flex text-[#979797] items-center text-[15px] font-normal"
                                            >
                                                <input
                                                    id="dontShow"
                                                    type="checkbox"
                                                    className="hidden peer"
                                                    onChange={onChange}
                                                />
                                                <span className="mr-3 peer-checked:bg-[#979797] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#979797] rounded-md"></span>
                                                Don't show this message again
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex items-center mt-5 justify-between'>
                                        <button onClick={close} className='bg-[#f4f4f5] py-2 rounded-md hover:!shadow-none focus:!shadow-none min-w-[100px] !text-[#202020]'>Cancel</button>
                                        <button className='bg-[#7c3292] py-2 rounded-md text-white hover:!shadow-none focus:!shadow-none min-w-[100px]' onClick={action}>Proceed</button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
})

export default AnalyzerConfirmation