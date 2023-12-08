import Button from "@components/global/Button";
import React, { useRef, useState } from "react";
import { BsQuestionCircle } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@store/redux/InfluencerSearchRedux";
import moment from "moment";
import { SiGmail } from "react-icons/si";
import { Tooltip } from "recharts";
import { AiOutlineCheck } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Popup from "@components/Popup";

const InfluencerLogsTab = () => {
  const [deletedEmail, setDeletedEmail] = useState("");
  const loadMoreLoading = useSelector(
    (state) => state.influencerSearch?.isInfluencerLogsLoading
  );
  const influencer = useSelector((state) => state.influencerSearch?.influencer);
  const deleteLoader = useSelector(
    (state) => state.influencerSearch?.influencerLogsDeleteLoading
  );
  const influencerLogs = useSelector(
    (state) => state.influencerSearch?.influencerEmailLogs
  );
  const metaData = useSelector(
    (state) => state.influencerSearch?.influencerLogsMetadeta
  );
  const loader = useSelector(
    (state) => state.influencerSearch?.influencerLogsLoading
  );
  const dispatch = useDispatch();
  const confirmationRef = useRef();

  const handleDeleteEmail = () => {
    let query = {
      logId: deletedEmail,
      influencerId: influencer.id,
    };
    actions.deleteInfluencerEmailLog(dispatch, query);
    confirmationRef.current.close();
  };

  const handleFetchLogs = () => {
    actions.fetchInfluencerEmailLogs(dispatch, influencer.id, {
      page: metaData.current_page + 1,
    });
  };

  if (loader) {
    return (
      <div className="flex items-center h-[70vh] overflow-hidden">
        <FaSpinner
          size={66}
          className="animate-[spin_2s_linear_infinite] pink mx-auto"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-h-[611px] overflow-auto border p-5 rounded-xl text-[#7c3292]">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="text-center">
            <th scope="col" className="px-6 py-3">
              Date/Time
            </th>
            <th className="px-6 py-3">Subject</th>
            <th className="px-6 py-3">Source</th>
            <th className="px-6 py-3">Scheduled At</th>
            <th className="px-6 py-3">Delivery Status</th>
            <th className="px-6 py-3">Seen Status</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {(influencerLogs || []).length > 0 ? (
            influencerLogs.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {moment
                    .utc(item.created_at)
                    .local()
                    .format("DD MMM YYYY, h:mm a")}
                </th>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.subject}
                </td>
                <td className="px-6 py-4 flex items-center justify-center">
                  {item.source === "smtp" ? (
                    <MdOutlineMail size={15} />
                  ) : item.source === "gmail" ? (
                    <SiGmail />
                  ) : (
                    <p>
                      <Tooltip
                        trigger={
                          <div className="ml-2">
                            <BsQuestionCircle className="darkGray" size={18} />
                          </div>
                        }
                        tooltipText={item.message}
                        placement="top-left"
                      />
                    </p>
                  )}
                </td>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {moment.utc(item.sent_at).local().format("DD MMM YYYY")}
                </th>
                <td className="flex items-center justify-center">
                  {item.sent_at > item.created_at ? (
                    <IoMdClose className="red" />
                  ) : (
                    <AiOutlineCheck className="success" />
                  )}
                </td>
                <td className="px-6 py-4">
                  {item.read_at ? (
                    <AiOutlineCheck className="success" />
                  ) : (
                    <IoMdClose className="red" />
                  )}
                </td>
                <td className="px-6 py-4 flex items-center justify-center">
                  <RiDeleteBin6Fill
                    size={18}
                    cursor={"pointer"}
                    onClick={() => {
                      confirmationRef.current.open({ title: "Delete Email" });
                      setDeletedEmail(item.id);
                    }}
                  />
                </td>
              </tr>
            ))
          ) : (
            <td
              colSpan="6"
              className="text-center w-full pt-4 px-[1rem] justify-center text-[#bbb] text-[20px] font-medium leading-[40px]"
            >
              No Logs Found
            </td>
          )}
          <td colSpan="6" className="text-center">
            {metaData.total > (influencerLogs || []).length && (
              <Button
                onClick={handleFetchLogs}
                className="px-8 rounded-[8px] h-[30px] text-[12px] inline-flex items-center bg--purple text-white hover:opacity-80 my-2"
                disabled={loadMoreLoading}
                text={
                  loadMoreLoading ? (
                    <FaSpinner className="animate-[spin_2s_linear_infinite]" />
                  ) : (
                    "Load More"
                  )
                }
              />
            )}
          </td>
        </tbody>
      </table>

      {/* Email Delete Popup */}
      <Popup ref={confirmationRef} onClose={() => {}}>
        <div className="text-left w-full space-y-3 mt-5">
          <h1 className="text-bold text-xl">Confirmation</h1>
          <p>Are you sure to delete your email?</p>
          <p>
            If email not deleivered yet it will be deleted and will not be send
          </p>
        </div>
        <div className="text-right multi-buttons pt-3">
          <Button
            className="px-10 rounded-[8px] h-[36px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mt-2"
            onClick={() => confirmationRef.current.close()}
            text="Cancel"
          />
          <Button
            className="px-10 rounded-[8px] h-[36px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80 mt-2 ml-4"
            onClick={handleDeleteEmail}
            disabled={deleteLoader}
            text={
              deleteLoader ? (
                <FaSpinner className="animate-[spin_2s_linear_infinite]" />
              ) : (
                "Proceed"
              )
            }
          />
        </div>
      </Popup>
    </div>
  );
};

export default InfluencerLogsTab;
