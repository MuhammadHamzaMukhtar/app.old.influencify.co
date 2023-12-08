import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, forwardRef, useImperativeHandle } from 'react'
import { NavLink } from 'react-router-dom'
import { RxCross2 } from 'react-icons/rx'

const Popup = forwardRef(({ onClose, children }, ref) => {

    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState({});

    useImperativeHandle(ref, () => ({
        open(data) {
            setIsOpen(true);
            setData(data);
        },
        close() {
            setIsOpen(false);
        }

    }));


    const close = () => {
        setIsOpen(false);
        onClose();
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
                                            {data?.title}
                                        </Dialog.Title>
                                        <div className='cursor-pointer' onClick={close}>
                                            <RxCross2 size={20} />
                                        </div>
                                    </div>
                                    <div className="text-left w-full space-y-3 mt-5">
                                        <p className="text-slate-500 text-lg">{data?.description}</p>
                                    </div>
                                    {children}
                                    {data?.button &&
                                        <div className="flex items-end justify-between mt-5">
                                            <NavLink onClick={close} to={data?.button} className='bg--purple py-2 rounded-md hover:!shadow-none focus:!shadow-none min-w-[100px] text-white text-center'>{data?.button_text}</NavLink>
                                        </div>
                                    }
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
})

export default Popup