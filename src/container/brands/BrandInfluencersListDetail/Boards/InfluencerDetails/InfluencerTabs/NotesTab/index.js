import Button from '@components/global/Button'
import { actions } from '@store/redux/InfluencerSearchRedux'
import moment from 'moment'
import React, { useRef, useState } from 'react'
import { FaComments, FaDownload, FaSpinner } from 'react-icons/fa'
import { RiAttachment2 } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import axios from "axios";

const InfluencerNotesTab = () => {
    const [comment, setComment] = useState({});
    const [isEditing, setIsEditing] = useState({});
    const data = useSelector((state) => state.influencerSearch?.influencerNotes)
    const metaData = useSelector((state) => state.influencerSearch?.influencerNotesMeta)
    const influencer = useSelector((state) => state.influencerSearch?.influencer)
    const loader = useSelector((state) => state.influencerSearch?.isInfluencerLoading)
    const saveLoader = useSelector((state) => state.influencerSearch?.influencerNotesSaveLoader)
    const loadMoreLoading = useSelector((state) => state.influencerSearch?.isInfluencerNotesLoading)
    const dispatch = useDispatch();
    const divRef = useRef(null);

    const handleSaveForm = async () => {
        const formData = new FormData();
        formData.append("influencer_id", influencer.iq_user_id);
        formData.append("brand_id", localStorage.getItem("main_account"));
        formData.append("sender_id", localStorage.getItem("main_account"));
        if (comment.data) {
            formData.append("comment", comment.data);
        }
        if (comment.attachment) {
            formData.append("attachment", comment.attachment);
        }
        const result = await actions.saveInfluencerNote(dispatch, formData);
        if (result.status === 200) {
            setComment({ data: '' })
            divRef.current.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    }

    const updateComment = async () => {
        if (!isEmptyOrSpaces(isEditing.comment)) {
            let query = {
                influencer_id: influencer.iq_user_id,
                note_id: isEditing.id,
                brand_id: localStorage.getItem("main_account"),
                comment: isEditing.comment
            }
            const result = await actions.updateInfluencerNote(dispatch, query);
            if (result.status == 200) {
                setComment({ data: '' })
                setIsEditing({})
            }
        }
    }

    const isEmptyOrSpaces = (str) => {
        return str === null || str?.match(/^ *$/) !== null;
    };

    const _handleKeyDown = async (e) => {
        if (e.keyCode === 13 && (e.target.value ? !isEmptyOrSpaces(e.target.value) : '')) {
            const formData = new FormData();
            formData.append("influencer_id", influencer.iq_user_id);
            formData.append("brand_id", localStorage.getItem("main_account"));
            formData.append("sender_id", localStorage.getItem("main_account"));
            if (comment.data) {
                formData.append("comment", comment.data);
            }
            if (comment.attachment) {
                formData.append("attachment", comment.attachment);
            }
            const result = await actions.saveInfluencerNote(dispatch, formData);
            if (result.status === 200) {
                setComment({ data: '' })
                divRef.current.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            }
        }
    }

    const fileUploadHandler = (event) => {
        const file = event.target.files[0];
        if (file.size > (process.env.MAX_FILE_SIZE || 2097152)) {
            toast.error('Max file size should be less than 2MB');
            setComment({ ...comment, attachment: null })
        } else {
            setComment({ ...comment, attachment: file })
        }
    }

    const handleClickEdit = (note) => {
        setIsEditing({ id: note.id, comment: note.comment })
    }

    const handleUpdateThroughEnter = async (e) => {
        if (e.keyCode === 13 && !isEmptyOrSpaces(e.target.value)) {
            let query = {
                note_id: isEditing.id,
                influencer_id: influencer.iq_user_id,
                brand_id: localStorage.getItem("main_account"),
                comment: isEditing.comment
            }
            const result = await actions.updateInfluencerNote(dispatch, query);
            if (result.status === 200) {
                setComment({ data: '' })
                setIsEditing({})
            }
        }
    }

    const isImageFileType = (type) => {
        const types = ['jpg', 'png', 'webp', 'jpeg']
        if (types.includes(type)) {
            return true;
        } else {
            return false;
        }
    }

    const fileDownload = (path, attachmentName) => {
        var download = require("js-file-download");
        axios({
            url: path,
            method: "GET",
            responseType: "blob",
        }).then((response) => {
            download(response.data, attachmentName);
        });
    };

    const fetchHistory = () => {
        actions.fetchInfluencerNotes(dispatch, influencer.iq_user_id, { page: metaData.current_page + 1 })
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
        <div className='space-y-6 border p-5 rounded-xl'>
            <div className='flex gap-x-5'>
                <FaComments size={20} color='purple' />
                <h1 className='font-semibold'>Team Comments</h1>
            </div>
            <div className='h-[410px] overflow-auto' ref={divRef}>
                {data && data.map((note) => (
                    <div key={note.id}>
                        <div className='my-5'>
                            {note.attachment &&
                                (isImageFileType(note.attachment_type) ?
                                    <img src={process.env.REACT_APP_AWS_URl + '/' + note.attachment} alt={note.comment} width={200} height={200} className='p-3 rounded-3xl' />
                                    :
                                    <a
                                        href={process.env.REACT_APP_AWS_URl + '/' + note.attachment}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        className="bg-[#435f7a] success w-fit flex p-[10px_18px] ml-2 mb-2 rounded-[12px]"
                                    >
                                        <span>{note.attachment_name}</span>
                                        <FaDownload
                                            onClick={() =>
                                                fileDownload(
                                                    process.env.REACT_APP_AWS_URl + '/' + note.attachment,
                                                    note.attachment_name
                                                )
                                            }
                                            className="ml-4"
                                        />
                                    </a>
                                )
                            }
                            {note.comment &&
                                (
                                    <div>
                                        {isEditing && isEditing.id == note.id ?
                                            <input
                                                className="rounded-[8px] h-[38px] w-[50%] items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292] xs:text-[14px] text-[12px]"
                                                value={isEditing.comment}
                                                onKeyDown={(e) => handleUpdateThroughEnter(e)}
                                                onChange={(e) => setIsEditing({ ...isEditing, comment: e.target.value })}
                                            /> :
                                            <span className='px-3'>{note.comment}</span>}
                                    </div>
                                )
                            }
                            <p className='text-gray-400 font-medium text-xs pt-1 pl-3'>You -
                                <span className='px-2'>{moment.utc(note.created_at).local().fromNow()}</span>
                                {note.comment &&
                                    <>
                                        <span className='pr-2'>|</span>
                                        {note.updated_at > note.created_at &&
                                            <>
                                                <span className='pr-2'>Edited</span>
                                                <span className='pr-2'>|</span>
                                            </>
                                        }
                                        <span className='cursor-pointer text-[#7c3292]'>
                                            {isEditing.id == note.id ?
                                                <>
                                                    <span className='pr-3' onClick={() => setIsEditing({})}>Cancel</span>
                                                    <span onClick={updateComment}>Update</span>
                                                </> :
                                                <span onClick={() => handleClickEdit(note)}>Edit</span>
                                            }
                                        </span>
                                    </>
                                }
                            </p>
                        </div>
                        {window.scrollTo(0, 0)}
                    </div>
                ))}
                {metaData.total > data.length &&
                    <div className='flex justify-center'>
                        <Button
                            onClick={fetchHistory}
                            className="px-8 rounded-[8px] h-[30px] text-[12px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 my-2"
                            disabled={loadMoreLoading}
                            text={
                                loadMoreLoading ? (
                                    <FaSpinner className="animate-[spin_2s_linear_infinite]" />
                                ) : (
                                    "Load More"
                                )
                            }
                        />
                    </div>
                }
            </div>
            <div className='border p-3 rounded-xl space-y-5'>
                <input
                    className="rounded-[8px] w-full items-center px-3 focus-visible:outline-0 focus:border-[#7c3292]"
                    placeholder="Write a comment..."
                    rows={3}
                    name='comment'
                    value={comment.data}
                    onChange={(e) => setComment({ ...comment, data: e.target.value })}
                    onKeyDown={(e) => _handleKeyDown(e)}
                />
                <div className='flex justify-between'>
                    <div>
                        <label htmlFor="file-input" className="px-5 rounded-[8px] h-[36px] text-[12px] inline-flex items-center bg--purple text-white hover:opacity-80 opacity-90 cursor-pointer">
                            <RiAttachment2 /> Attachments
                        </label>
                        <input
                            id="file-input"
                            type="file"
                            className="hidden"
                            onChange={(e) => fileUploadHandler(e)}
                        />
                        {comment.attachment &&
                            <span className="bg-[#435f7a] success inline-block ml-3 p-[7px_15px] rounded-[10px]">
                                {comment.attachment.name}
                            </span>
                        }
                    </div>
                    {saveLoader ?
                        <div className="px-5 rounded-[8px] h-[38px] text-[12px] inline-flex items-center bg--purple text-white hover:opacity-80">
                            <FaSpinner className="animate-[spin_2s_linear_infinite] mx-auto" />
                        </div> :
                        <Button
                            className="px-5 rounded-[8px] h-[38px] text-[12px] inline-flex items-center bg--purple text-white hover:opacity-80 disabled:opacity-70"
                            onClick={handleSaveForm}
                            disabled={(!comment.data && !comment.attachment) || (comment.data && isEmptyOrSpaces(comment.data))}
                            text="Comment"
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default InfluencerNotesTab