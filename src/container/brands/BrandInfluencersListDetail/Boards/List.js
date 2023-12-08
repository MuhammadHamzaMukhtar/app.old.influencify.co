import { HiDotsHorizontal } from "react-icons/hi";
import { BsFillPlusCircleFill } from "react-icons/bs";
import React, { Fragment, useRef, useState } from "react";
import Button from "@components/global/Button";
import { Menu, Popover, Transition } from "@headlessui/react";
import { MdDelete, MdEmail } from "react-icons/md";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { mergeRefs } from "@constants/Board";
import DraggableCard from "./DraggableCard";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import EmailPopup from "./InfluencerDetails/EmailPopup";
import { useSelector } from "react-redux";
import Popup from "@components/Popup";
import { Link } from "react-router-dom";
import { actions } from "@store/redux/InfluencerSearchRedux";
import { useDispatch } from "react-redux";
import { FiDownload } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";

const getListStyle = (isDragging, defaultStyle) => {
  if (!isDragging) return defaultStyle;
  return {
    ...defaultStyle,
    transform: defaultStyle.transform + " rotate(5deg)",
  };
};

const getListTitleStyle = (isDragging, defaultStyle) => {
  if (!isDragging)
    return {
      ...defaultStyle,
      cursor: "pointer",
    };
  return {
    ...defaultStyle,
    cursor: "grabbing",
  };
};

const List = (props) => {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const connectionRef = useRef();
  const exportRef = useRef();
  const [boardData, setBoardData] = useState({});
  const [exportList, setExportList] = useState({
    isExport: false,
    listType: "SHORT",
    selectedInfluencers: [],
  });
  const smtpSetting = useSelector((state) => state.smtp.form);
  const listBoards = useSelector((state) => state.brandList.listBoards);
  const exportListLoading = useSelector(
    (state) => state.influencerSearch.exportListLoading
  );
  const currentLoggedUser = useSelector(
    (state) => state.HeaderReducer.currentLoggedUser
  );
  const { index, errorsObj, board, currentList, updateBoardName } = props;

  const handleDoubleClick = (board) => {
    setBoardData({
      ...boardData,
      id: board.id,
      name: board.board_name,
      nameEditing: true,
    });
  };

  const handleOpenEmailPopup = async (boardId) => {
    const res = await actions.fetchBoardInfluencers(dispatch, boardId);
    if (res.length <= 0) {
      toast.error("No email found");
    } else {
      if (
        currentLoggedUser.isGmailLinked ||
        Object.keys(smtpSetting).length > 0
      ) {
        emailRef.current.open(boardId);
      } else {
        const data = {
          title: "Connect Email",
        };
        connectionRef.current.open(data);
      }
    }
  };

  const handleInputChange = (event) => {
    setBoardData({ ...boardData, name: event.target.value, nameEditing: true });
  };

  const isEmptyOrSpaces = (str) => {
    return str === null || str?.match(/^ *$/) !== null;
  };

  const handleKeyDown = (e) => {
    const {
      code,
      target: { value },
    } = e;
    if (code === "Enter" && !isEmptyOrSpaces(value)) {
      if (value.length < 3) {
        toast.error("Board name must be at least 3 characters");
      } else {
        handleInputBlur();
      }
    }
  };

  const handleInputBlur = async () => {
    if (!isEmptyOrSpaces(boardData.name) && boardData.name.length >= 3) {
      let query = {
        id: boardData.id,
        name: boardData.name,
        listId: currentList.id,
      };
      const result = await updateBoardName(query);
      if (!result.errors) {
        setBoardData({});
      } else {
        setBoardData({ ...boardData, nameEditing: true });
      }
    }
  };

  const deleteListBoardColumn = (id) => {
    props.deleteListBoardColumn(id);
  };

  const handleClickAddInfluencer = (boardId) => {
    props.setModal(true);

    props.setBoardData({ id: boardId });
  };

  const handleExport = async () => {
    const data = {
      payloads: {
        ids: exportList.selectedInfluencers,
        platform: currentList.list_channel,
        export_type: exportList.listType,
        dry_run: false,
        send_email: false,
        paging: {
          limit: exportList.selectedInfluencers.length,
        },
      },
      cost: exportList.cost,
    };
    await actions.ExportInfluencerList(dispatch, data);
    exportRef.current.close();
  };

  const handleClickExport = (boardId) => {
    exportRef.current.open({
      title: "Export Details",
    });
    const listInfluencers = listBoards.find(
      (board) => board.id === boardId
    )?.board_influencers;
    const listOfUserIds = (listInfluencers || []).map((inf) => inf?.user_id);
    setExportList({
      ...exportList,
      isExport: true,
      selectedInfluencers: listOfUserIds,
      cost: listOfUserIds.length * 0.5,
    });
  };

  const addExportList = (key, value) => {
    let cost = exportList.selectedInfluencers.length * 0.5;
    if (key === "listType" && value === "FULL") {
      cost = exportList.selectedInfluencers.length;
    }
    setExportList({ ...exportList, [key]: value, cost: cost });
  };

  const listCards = useRef(null);

  return (
    <>
      <Draggable draggableId={"list" + board.id.toString()} index={index}>
        {(provided, snapshot) => {
          if (typeof provided.draggableProps.onTransitionEnd === "function") {
            window?.requestAnimationFrame(() =>
              provided.draggableProps.onTransitionEnd({
                propertyName: "transform",
              })
            );
          }
          return (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              style={getListStyle(
                snapshot.isDragging,
                provided.draggableProps.style
              )}
              className={`list bg-white pb-2 rounded-xl w-[300px] ${
                (board.board_influencers || []).length > 4
                  ? "h-[430px]"
                  : "!h-max"
              } shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640]`}
              key={board.id}
            >
              <div
                className="bg-white flex justify-between items-center sticky top-0 py-3 list__title px-5 rounded-xl"
                {...provided.dragHandleProps}
                style={getListTitleStyle(
                  snapshot.isDragging,
                  provided.dragHandleProps.style
                )}
              >
                {boardData.id === board.id && boardData?.nameEditing ? (
                  <div className="flex flex-col w-full">
                    <input
                      className="rounded-[8px] w-full px-[1rem] py-[0.2rem] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
                      type="text"
                      value={boardData.name}
                      onChange={handleInputChange}
                      onKeyDown={(e) => handleKeyDown(e)}
                      onBlur={handleInputBlur}
                      autoFocus
                    />
                    {errorsObj && errorsObj?.name && (
                      <p className="red">{errorsObj.name[0]}</p>
                    )}
                  </div>
                ) : (
                  <span
                    onDoubleClick={() =>
                      board.id !== 0 && handleDoubleClick(board)
                    }
                    className={`${board.id !== 0 && "cursor-pointer"} w-full`}
                  >
                    {board.board_name}
                  </span>
                )}
                {board.id !== 0 && (
                  <>
                    {/* Menu */}
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button
                          as="div"
                          className="inline-flex items-center cursor-pointer"
                        >
                          <HiDotsHorizontal size={20} className="darkGray" />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-[8px] bg-white shadow-[0px_4px_5px_#96969640] focus:outline-none py-[0.5rem]">
                          <div className="px-1 rounded-[8px]">
                            {(board.board_influencers || []).length >= 1 && (
                              <>
                                <Menu.Item>
                                  <div
                                    onClick={() => handleClickExport(board.id)}
                                    className="text-[14px] p-3 w-full
                                      hover:bg-[#0000000a] flex gap-x-3 items-center"
                                  >
                                    <FiDownload className="purple" size={25} />{" "}
                                    <span> Export</span>
                                  </div>
                                </Menu.Item>
                                <Menu.Item>
                                  <Button
                                    onClick={() =>
                                      handleOpenEmailPopup(board.id)
                                    }
                                    className="text-[14px] p-3 w-full hover:bg-[#0000000a]"
                                    text={
                                      <div className="flex gap-x-3 items-center">
                                        <MdEmail size={25} />{" "}
                                        <span> Bulk Email</span>
                                      </div>
                                    }
                                  />
                                </Menu.Item>
                              </>
                            )}
                            <Menu.Item>
                              <Button
                                onClick={() => deleteListBoardColumn(board.id)}
                                className="text-[14px] p-3 w-full hover:bg-[#0000000a] text-left"
                                text={
                                  <div className="flex gap-x-3 items-center text-red-500">
                                    <MdDelete size={25} />{" "}
                                    <span> Delete column</span>
                                  </div>
                                }
                              />
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </>
                )}
              </div>

              {/* Influencers */}
              <Droppable droppableId={board.id.toString()} type="item">
                {(provided) => (
                  <div
                    className="list__cards max-h-[371px] overflow-y-auto px-3"
                    ref={mergeRefs(provided.innerRef, listCards)}
                    {...provided.droppableProps}
                  >
                    {board.board_influencers &&
                      board.board_influencers.map((influencer, index) => (
                        <DraggableCard
                          card={influencer}
                          list={board}
                          index={index}
                          key={influencer.id}
                          handleOpenInfluencerModal={
                            props.handleOpenInfluencerModal
                          }
                        />
                      ))}

                    {provided.placeholder}
                    {board.id !== 0 && (
                      <>
                        {/* Add new influencers */}
                        <div
                          div
                          className="bg-white px-5 py-3 my-2 rounded-xl cursor-pointer min-w-[200px] border border-dashed border-gray-400"
                          onClick={() => handleClickAddInfluencer(board.id)}
                        >
                          <div className="flex justify-center items-center gap-x-3">
                            <BsFillPlusCircleFill size={20} className="gray" />
                            <span className="text-gray-400 font-semibold text-lg">
                              Add influencers
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </Droppable>
            </div>
          );
        }}
      </Draggable>

      {/* Send Email Popup */}
      <EmailPopup ref={emailRef} />

      {/* Email Connection Popup */}
      <Popup ref={connectionRef} onClose={() => {}}>
        <div className="text-left w-full space-y-3 mt-5">
          <p>Please connect your Gmail or SMTP to continue</p>
        </div>
        <div className="multi-buttons pt-3 flex justify-end">
          <Button
            className="px-10 rounded-[8px] h-[36px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mt-2"
            onClick={() => connectionRef.current.close()}
            text="Cancel"
          />
          <Link
            to={"/integration"}
            className="px-10 rounded-[8px] h-[36px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mt-2 ml-4"
          >
            Connect
          </Link>
        </div>
      </Popup>

      {/* Export Popup */}
      <Popup ref={exportRef} onClose={() => {}}>
        <p className="mb-1 font-medium whitespace-nowrap flex items-center">
          {exportList.selectedInfluencers.length} influencers found
        </p>
        <div className="flex items-center justify-start">
          <div className="mt-5 space-y-4">
            <label
              htmlFor="short"
              className="flex items-center cursor-pointer relative text-black text-[14px]"
            >
              <input
                id="short"
                type="radio"
                checked={exportList.listType === "SHORT" ? true : false}
                onChange={(e) =>
                  addExportList("listType", e.target.checked ? "SHORT" : "FULL")
                }
                value="SHORT"
                className="absolute opacity-0 z-[0] peer"
              />
              <span className="peer-checked:bg-[#7c3292] shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
              Brief: Basic data
            </label>
            <label
              htmlFor="full"
              className="flex items-center cursor-pointer relative text-black text-[14px]"
            >
              <input
                id="full"
                type="radio"
                checked={exportList.listType === "FULL" ? true : false}
                onChange={(e) =>
                  addExportList("listType", e.target.checked ? "FULL" : "SHORT")
                }
                value="FULL"
                className="absolute opacity-0 z-[0] peer"
              />
              <span className="peer-checked:bg-[#7c3292] shadow-[inset_0px_0px_0px_3px_white] border-2 border-[#7c3292] w-[18px] h-[18px] inline-block mr-2 rounded-full shrink-0 z-[10]"></span>
              Full: Include contacts details and demographic data
            </label>
          </div>
        </div>
        <div className="flex items-center mt-4">
          <Button
            onClick={handleExport}
            type="button"
            disabled={exportListLoading}
            className="py-0 px-4 rounded-[8px] h-[30px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
            text={
              exportListLoading ? (
                <FaSpinner className="animate-[spin_2s_linear_infinite]" />
              ) : (
                <>Export ({exportList.selectedInfluencers.length})</>
              )
            }
          />
          <p className="ml-4 font-normal gray text-[13px] cursor-pointer flex items-center">
            Cost: {exportList.cost}
          </p>
        </div>
      </Popup>
    </>
  );
};

const mapStateToProps = ({ brandList }) => {
  return {
    currentList: brandList.current_list,
    errorsObj: brandList.boardErrors,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions: brandlistactions } = require("@store/redux/BrandListRedux");
  return {
    ...ownProps,
    ...stateProps,
    updateBoardName: (data) => {
      return brandlistactions.updateListBoardName(dispatch, data);
    },
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(List);
