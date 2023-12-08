import { Draggable } from "react-beautiful-dnd";
import Card from "./Card";

const DraggableCard = ({ card, list, index, handleOpenInfluencerModal }) => {
    return (
        <Draggable draggableId={card.id.toString()} index={index}>
            {(provided, snapshot) => {
                if (
                    typeof provided.draggableProps.onTransitionEnd ===
                    "function"
                ) {
                    window?.requestAnimationFrame(() =>
                        provided.draggableProps.onTransitionEnd({
                            propertyName: "transform",
                        })
                    );
                }
                return (
                    <Card
                        card={card}
                        list={list}
                        provided={provided}
                        isDragging={snapshot.isDragging}
                        handleOpenInfluencerModal={handleOpenInfluencerModal}
                    />
                );
            }}
        </Draggable>
    );
};

export default DraggableCard;