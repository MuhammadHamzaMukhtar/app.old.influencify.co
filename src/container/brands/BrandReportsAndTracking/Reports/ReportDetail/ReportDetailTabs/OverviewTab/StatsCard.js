import React from "react";

const StatsCard = ({ icon, count, title }) => {
  const formatedNumber = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num;
  };

  return (
    <div className="p-8 flex gap-x-5 items-center border w-fit rounded-[8px] shadow-[0px_4px_5px_#96969640] ">
      {icon}
      <div>
        <p className="font-semibold text-[20px] text-center">
          {formatedNumber(count)}
        </p>
        <p className="text-gray-600 text-center">{title}</p>
      </div>
    </div>
  );
};

export default StatsCard;
