import Influencify from "./Influencify";

export const onDragEnd = (board, setBoard) => (result) => {
    // Must update state synchromously so hit endpoint after setState
    // A bit optimistic but a must
    if (result.type === "list") {
        onDragEndList(board, setBoard, result);
        
    }
    else if (result.type === "item") {
        onDragEndItem(board, setBoard, result);
    }
};

const onDragEndList = (board, setBoard, result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return; // Dropped outside of board
    if (source.index === destination.index) return; // Position didn't change, no need to compare droppableIds as only one droppable

    const list = board.find(
        (list) => "list" + list.id.toString() === draggableId
    );

    const newLists = [...board];
    newLists.splice(source.index, 1);
    newLists.splice(destination.index, 0, list);

    const newBoard = {
        ...board,
        lists: newLists,
    };

    setBoard(newLists);
    onDragEndListBackend(newLists);
};

const onDragEndListBackend = async (board) => {

    let sort = {};
    board.map((item, index)=>{
        sort[item.id] = index;
    });

    Influencify.boardOrderUpdate({sort});
};



const onDragEndItem = (board, setBoard, result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return; // Dropped outside of list
    if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
    )
        return; // Position didn't change

    const sourceList = board.find(
        (list) => list.id.toString() === source.droppableId
    );
    const item = sourceList.board_influencers.find(
        (item) => item.id.toString() === draggableId
    );
    const destinationList = board.find(
        (list) => list.id.toString() === destination.droppableId
    );

    const newItems = [...sourceList.board_influencers];
    let newItems2;
    if (source.droppableId === destination.droppableId) {
        newItems2 = newItems;
    } else {
        newItems2 = [...destinationList.board_influencers];
    }
    newItems.splice(source.index, 1);
    newItems2.splice(destination.index, 0, item);

    const newList = {
        ...sourceList,
        board_influencers: newItems,
    };

    const newList2 = {
        ...destinationList,
        board_influencers: newItems2,
    };

    const newLists = board.map((list) => {
        if (list.id === newList.id) return newList;
        else if (list.id === newList2.id) return newList2;
        return list;
    });

    const newBoard = {
        ...board,
        lists: newLists,
    };

    setBoard(newLists);
    onDragEndItemBackend(newLists,result);
};

const onDragEndItemBackend = async (board, result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return; // Dropped outside of list
    if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
    )
        return; // Position didn't change
    
        
    const sourceList = board.find(
        (list) => list.id.toString() === source.droppableId
    );
    const item = sourceList.board_influencers.find(
        (item) => item.id.toString() === draggableId
    );
    const destinationList = board.find(
        (list) => list.id.toString() === destination.droppableId
    );

    let sort = {};
    sourceList.board_influencers.map((item, index)=>{
        sort[item.id] = index;
    });

    Influencify.boardItemOrderUpdate({sort, id:sourceList.id});

    sort = {};
    destinationList.board_influencers.map((item, index)=>{
        sort[item.id] = index;
    });

    Influencify.boardItemOrderUpdate({sort, id:destinationList.id});
}

export const mergeRefs = (...refs) => {
    const filteredRefs = refs.filter(Boolean);
    if (!filteredRefs.length) return null;
    if (filteredRefs.length === 0) return filteredRefs[0];
    return (inst) => {
        for (const ref of filteredRefs) {
            if (typeof ref === "function") {
                ref(inst);
            } else if (ref) {
                ref.current = inst;
            }
        }
    };
};