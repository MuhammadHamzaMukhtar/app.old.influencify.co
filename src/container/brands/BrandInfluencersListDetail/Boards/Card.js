import { useRef } from "react";
import SocialListIcons from "@constants/SocialListIcons";
import { mergeRefs } from "@constants/Board";
import { useSelector } from "react-redux";

const getCardStyle = (isDragging, defaultStyle) => {
  if (!isDragging)
    return {
      ...defaultStyle,
      cursor: "pointer",
    };
  return {
    ...defaultStyle,
    transform: defaultStyle.transform + " rotate(5deg)",
    cursor: "grabbing",
  };
};

const Card = ({
  card,
  list,
  provided,
  isDragging,
  handleOpenInfluencerModal,
}) => {
  const currentList = useSelector((state) => state.brandList.current_list);
  const { innerRef, draggableProps, dragHandleProps } = provided;
  const cardElem = useRef(null);
  return (
    <div
      ref={mergeRefs(cardElem, innerRef)}
      {...draggableProps}
      style={getCardStyle(isDragging, draggableProps.style)}
      {...dragHandleProps}
      key={card.id}
      className={`bg-white flex justify-evenly items-center border rounded-xl p-2 my-2 cursor-pointer ${
        list.board_influencers.length > 5 && "overflow-y-auto"
      }`}
      onClick={() => handleOpenInfluencerModal(card)}
    >
      <div className="w-[80px]">
        <img
          src={card.picture}
          alt={card.fullname}
          width={50}
          height={50}
          className="rounded-full"
        />
      </div>
      <span className="w-[40px]">
        {SocialListIcons(currentList?.list_channel || "instagram", 20)}
      </span>
      <span className="flex-1 break-all text-center">{card.fullname}</span>
    </div>
  );
};

export default Card;
