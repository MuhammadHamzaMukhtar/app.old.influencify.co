import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import Worldmap from "./Worldmap";

export default function Index({data}) {
    const [content, setContent] = useState("");
    return (
        <div>
            <Worldmap setTooltipContent={setContent} data={data} />
            <ReactTooltip>{content}</ReactTooltip>
        </div>
    );
}
