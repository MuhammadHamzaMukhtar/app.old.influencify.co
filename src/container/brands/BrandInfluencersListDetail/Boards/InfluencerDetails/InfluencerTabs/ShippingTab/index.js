import Button from '@components/global/Button'
import React, { useState } from 'react'
import { BsClipboardCheck, BsFillTelephoneFill } from 'react-icons/bs'
import { FaAddressCard, FaSpinner } from 'react-icons/fa'
import { FiEdit } from 'react-icons/fi'
import { MdEmail } from 'react-icons/md'
import { RxAvatar } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import { actions, types } from '@store/redux/InfluencerSearchRedux'
import { toast } from 'react-toastify'

const InfluencerShippingTab = () => {

    const [isEditing, setIsEditing] = useState(false);
    const [editedForm, setEditedForm] = useState({});
    const influencer = useSelector((state) => state.influencerSearch?.influencer);
    const data = useSelector((state) => state.influencerSearch?.influencerShipping)
    const loader = useSelector((state) => state.influencerSearch?.isInfluencerLoading)
    const saveLoader = useSelector((state) => state.influencerSearch?.influencerShippingSaveLoading)
    const errors = useSelector((state) => state.influencerSearch?.influencerShippingErrors)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const form = Object.assign({}, editedForm);
        form[e.target.name] = e.target.value
        setEditedForm(form)
    }

    const handleCancel = () => {
        setIsEditing(false)
        dispatch({ type: types.REMOVE_SHIPPING_VALIDATION_ERRORS })
    }

    const handleSaveForm = async () => {
        editedForm['influencer_id'] = influencer.id
        const result = await actions.saveInfluencerShipping(dispatch, editedForm);
        if (result.status === 200) {
            setIsEditing(false);
        }
    }

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedForm(data)
    }

    const formatObjectToText = (data) => {
        const newData = {
            'Full Name': data.full_name,
            'Email': data.email,
            'Phone Number': data.phone,
            'Address': data.address,
        }
        let text = '';
        for (const key in newData) {
            text += `${key}: ${newData[key]}\n`;
        }
        return text;
    };

    const handleCopyInfo = () => {
        const formattedText = formatObjectToText(data);
        if (formattedText) {
            navigator.clipboard.writeText(formattedText)
                .then(() => {
                    toast.success(`Copied to clipboard`);
                })
                .catch((error) => {
                    toast.error("Error while Copied to clipboard");
                });
        }

    }

    if (loader) {
        return (
            <div className='flex items-center h-[70vh] overflow-hidden'>
                <FaSpinner
                    size={66}
                    className="animate-[spin_2s_linear_infinite] pink mx-auto"
                />
            </div>
        )
    }

    return (
        <div className='space-y-6 border p-5 rounded-xl text-[#7c3292]'>
            {isEditing ?
                <>
                    <div>
                        <input
                            placeholder='FULL NAME'
                            className="rounded-[8px] h-[45px] w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292] xs:text-[14px] text-[12px]"
                            name='full_name'
                            value={editedForm?.full_name}
                            onChange={(e) => handleChange(e)}
                        />
                        {errors && errors.full_name &&
                            <p className="red">{errors.full_name[0]}</p>
                        }
                    </div>
                    <div className='flex gap-x-5'>
                        <div className='w-full'>
                            <input
                                placeholder='PHONE'
                                className="rounded-[8px] h-[45px] w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292] xs:text-[14px] text-[12px]"
                                name='phone'
                                type='number'
                                value={editedForm?.phone}
                                onChange={(e) => handleChange(e)}
                            />
                            {errors && errors.phone &&
                                <p className="red">{errors.phone[0]}</p>
                            }
                        </div>
                        <div className='w-full'>
                            <input
                                placeholder='EMAIL'
                                className="rounded-[8px] h-[45px] w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292] xs:text-[14px] text-[12px]"
                                name='email'
                                value={editedForm?.email}
                                onChange={(e) => handleChange(e)}
                            />
                            {errors && errors.email &&
                                <p className="red">{errors.email[0]}</p>
                            }
                        </div>
                    </div>
                    <div>
                        <input
                            placeholder='ADDRESS'
                            className="rounded-[8px] h-[45px] w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292] xs:text-[14px] text-[12px]"
                            name='address'
                            value={editedForm?.address}
                            onChange={(e) => handleChange(e)}
                        />
                        {errors && errors.address &&
                            <p className="red">{errors.address[0]}</p>
                        }
                    </div>
                    <div className='flex gap-x-5'>
                        <div className='w-full'>
                            <input
                                placeholder='ZIP'
                                className="rounded-[8px] h-[45px] w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292] xs:text-[14px] text-[12px]"
                                name='zip'
                                type='number'
                                value={editedForm?.zip}
                                onChange={(e) => handleChange(e)}
                            />
                            {errors && errors.zip &&
                                <p className="red">{errors.zip[0]}</p>
                            }
                        </div>
                        <div className='w-full'>
                            <input
                                placeholder='CITY'
                                className="rounded-[8px] h-[45px] w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292] xs:text-[14px] text-[12px]"
                                name='city'
                                value={editedForm?.city}
                                onChange={(e) => handleChange(e)}
                            />
                            {errors && errors.city &&
                                <p className="red">{errors.city[0]}</p>
                            }
                        </div>
                    </div>
                    <div className='flex gap-x-5'>
                        <div className='w-full'>
                            <input
                                placeholder='COUNTRY'
                                className="rounded-[8px] w-full h-[45px] items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292] xs:text-[14px] text-[12px]"
                                name='country'
                                value={editedForm?.country}
                                onChange={(e) => handleChange(e)}
                            />
                            {errors && errors.country &&
                                <p className="red">{errors.country[0]}</p>
                            }
                        </div>
                        <div className='w-full'>
                            <input
                                placeholder='STATE'
                                className="rounded-[8px] h-[45px] w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292] xs:text-[14px] text-[12px]"
                                name='state'
                                value={editedForm?.state}
                                onChange={(e) => handleChange(e)}
                            />
                            {errors && errors.state &&
                                <p className="red">{errors.state[0]}</p>
                            }
                        </div>
                    </div>
                    <div className='flex gap-x-5'>
                        {saveLoader ?
                            <div className="px-8 rounded-[8px] h-[38px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80">
                                <FaSpinner className="animate-[spin_2s_linear_infinite] mx-auto" />
                            </div> :
                            <Button
                                className="px-8 rounded-[8px] h-[38px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
                                text={'Save'}
                                onClick={handleSaveForm}
                            />
                        }
                        <Button
                            className="px-8 rounded-[8px] h-[38px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
                            text={'Cancel'}
                            onClick={handleCancel}
                        />
                    </div>
                </>
                :
                <>
                    <div className='flex gap-x-6 items-center'>
                        <RxAvatar size={20} color='purple' /> {data?.full_name ? <span>{data?.full_name}</span> : "No contact name added"}
                    </div>
                    <div className='flex gap-x-6 items-center'>
                        <MdEmail size={20} color='purple' /> {data?.email ? <span>{data?.email}</span> : "No contact email added"}
                    </div>
                    <div className='flex gap-x-6 items-center'>
                        <BsFillTelephoneFill size={20} color='purple' /> {data?.phone ? <span>{data?.phone}</span> : "No contact phone added"}
                    </div>
                    <div className='flex gap-x-6 items-center'>
                        <FaAddressCard size={20} color='purple' /> {data?.address ? <span>{data?.address}</span> : "No contact address added"}
                    </div>
                    <div className='flex gap-x-10'>
                        <Button
                            className="px-8 rounded-[8px] h-[38px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
                            prefix=<span className='pr-3'><FiEdit /></span>
                            text={'Edit'}
                            onClick={handleEditClick}
                        />
                        {Object.keys(data)?.length >= 7 &&
                            <Button
                                className="px-8 rounded-[8px] h-[38px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
                                prefix=<span className='pr-3'><BsClipboardCheck /></span>
                                text={'Copy contact info'}
                                onClick={handleCopyInfo}
                            />
                        }
                    </div>
                </>
            }
        </div>
    )
}

export default InfluencerShippingTab