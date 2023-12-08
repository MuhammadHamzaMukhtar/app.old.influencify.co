import React from "react";
import ContentFilters from "./ContentFilters";
import ContentCards from "./ContentCards";

const ContentTab = () => {
  return (
    <div className="space-y-10 min-h-[58vh]">
      <h1 className="black text-[20px] font-semibold pt-2">
        Published Content
      </h1>
      <div className="space-y-20">
        <ContentFilters />
        <ContentCards />
      </div>
    </div>
  );
};

export default ContentTab;
