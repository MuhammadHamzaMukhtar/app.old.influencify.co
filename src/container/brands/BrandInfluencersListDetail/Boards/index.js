import { connect } from "react-redux";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { useRef, useState } from "react";
import Button from "@components/global/Button";
import { FaSpinner } from "react-icons/fa";
import AddInfluencer from "./AddInfluencer";
import Influencer from "./InfluencerDetails";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { onDragEnd } from "@constants/Board";
import { useDispatch } from "react-redux";
import List from "./List";

const Boards = (props) => {
  const { actions } = require("@store/redux/BrandListRedux");
  const dispatch = useDispatch();
  const [boardData, setBoardData] = useState({});
  const [modal, setModal] = useState(false);
  const influencerModalRef = useRef();
  const { boards, errorsObj, isLoading } = props;

  const addNewBoard = async () => {
    let query = {
      listId: props.currentList.id,
      boardName: boardData.name,
    };
    const result = await props.addNewBoardToList(query);
    if (!result.errors) {
      setBoardData({ ...boardData, name: "", isSelected: false });
    }
  };

  const handleCloseBoard = () => {
    props.removeBoardErrors();
    setBoardData({ ...boardData, name: "", isSelected: false });
  };

  const deleteListBoardColumn = (id) => {
    let query = {
      id: id,
      listId: props.currentList.id,
    };
    props.deleteBoard(query);
  };

  const handleOpenInfluencerModal = (influencer) => {
    influencerModalRef.current?.open(influencer.user_id);
  };

  const setBoard = (data) => {
    actions.bulkUpdateBoards(dispatch, data);
  };

  return (
    <>
      <div className="flex gap-x-5 h-[416px]">
        {/* Boards */}
        <DragDropContext onDragEnd={onDragEnd(boards, setBoard)}>
          <Droppable droppableId={"board"} direction="horizontal" type="list">
            {(provided) => (
              <div
                className="board__lists flex gap-x-5 h-[430px] focus-visible:outline-none"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {boards &&
                  boards.map((board, index) => (
                    <List
                      board={board}
                      index={index}
                      key={board.id}
                      setModal={setModal}
                      setBoardData={setBoardData}
                      deleteListBoardColumn={deleteListBoardColumn}
                      handleOpenInfluencerModal={handleOpenInfluencerModal}
                    />
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {/* Add new board */}
        <div className="pr-16">
          <div
            className={`bg-gray-100 p-5 rounded-xl min-w-[300px] ${
              !boardData.isSelected && "h-[65px]"
            } border border-dashed border-gray-400 shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640]`}
          >
            {boardData.isSelected ? (
              <div>
                <input
                  className="rounded-[8px] w-full px-[1rem] py-[0.5rem] border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
                  value={boardData.name}
                  onChange={(e) =>
                    setBoardData({ ...boardData, name: e.target.value })
                  }
                  type="text"
                  placeholder="Enter board name"
                />
                {errorsObj && errorsObj?.boardName && (
                  <span className="red">{errorsObj.boardName[0]}</span>
                )}
                <div className="flex justify-end gap-3 pt-3 border-t border-t-[#dee2e6]">
                  <Button
                    className="px-5 rounded-[8px] h-[38px] text-[12px] inline-flex items-center bg--purple text-white hover:opacity-80"
                    onClick={handleCloseBoard}
                    text="Cancel"
                  />
                  <Button
                    className={`${
                      (!boardData.name || boardData.name?.length < 3) &&
                      "cursor-not-allowed"
                    } px-5 rounded-[8px] h-[38px] text-[12px] inline-flex items-center bg--purple text-white hover:opacity-80 disabled:opacity-70`}
                    disabled={
                      !boardData.name || boardData.name?.length < 3 || isLoading
                    }
                    onClick={addNewBoard}
                    text={
                      isLoading ? (
                        <FaSpinner className="animate-[spin_2s_linear_infinite]" />
                      ) : (
                        "Add"
                      )
                    }
                  />
                </div>
              </div>
            ) : (
              <div
                className="flex justify-center cursor-pointer items-center gap-x-3"
                onClick={() => setBoardData({ ...boardData, isSelected: true })}
              >
                <BsFillPlusCircleFill size={25} className="darkGray" />
                <span className="text-gray-500 text-xl">Add new column</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddInfluencer
        modal={modal}
        setModal={setModal}
        platform={props.platform}
        boardId={boardData.id}
        listId={props.currentList.id}
      />

      <Influencer ref={influencerModalRef} />
    </>
  );
};

const mapStateToProps = ({ brandList }) => {
  return {
    currentList: brandList.current_list,
    errorsObj: brandList.boardErrors,
    isLoading: brandList.boardLoading,
  };
};
const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const {
    actions: brandlistactions,
    types,
  } = require("@store/redux/BrandListRedux");
  return {
    ...ownProps,
    ...stateProps,
    addNewBoardToList: (data) => {
      return brandlistactions.addNewBoard(dispatch, data);
    },
    removeBoardErrors: () => {
      dispatch({ type: types.HANDLE_REMOVE_BOARD_ERRORS });
    },
    deleteBoard: (data) => {
      brandlistactions.deleteListBoard(dispatch, data);
    },
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(Boards);
