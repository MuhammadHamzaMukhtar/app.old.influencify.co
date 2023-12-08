import React, { useState } from "react";
import { useSelector } from "react-redux";
import avatar from "@assets/avatar.png";
import { FaCloudDownloadAlt, FaSpinner } from "react-icons/fa";
import moment from "moment";
import { FcLike } from "react-icons/fc";
import { MdComment, MdPeopleAlt } from "react-icons/md";
import ProxyImage from "@components/ProxyImage";
import { BsEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { ImPlay2 } from "react-icons/im";
import Pagination from "@components/Pagination";
import Loader from "@components/global/Loader";
import { useDispatch } from "react-redux";
import { actions } from "@store/redux/BrandReportsRedux";
import SimpleSlider from "./Slider";

const ContentCards = () => {
  const [currentSlide, setCurrentSlide] = useState(null);
  const dispatch = useDispatch();
  const report = useSelector((state) => state.BrandReports.currentReportDetail);
  const searchQuery = useSelector((state) => state.BrandReports.searchQuery);
  const contentDetail = useSelector(
    (state) => state.BrandReports.reportPublishedContentDetail
  );
  const isContentLoading = useSelector(
    (state) => state.BrandReports.isContentLoading
  );
  const loadMore = useSelector(
    (state) => state.BrandReports.isContentLoadMoreLoading
  );

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

  const onPageChanged = (pageData) => {
    window.scrollTo(0, 0);
    const query = Object.assign({}, searchQuery);
    query["page"] = pageData.currentPage;
    actions.fetchContents(dispatch, report.id, query);
  };

  const groupedPosts = (contentDetail.data || []).reduce((groups, content) => {
    const date = moment(content.published_at).format("YYYY-MM-DD");
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(content);
    return groups;
  }, {});

  if (isContentLoading) {
    return (
      <div className="flex items-center justify-center h-[28vh]">
        <FaSpinner
          size={66}
          className="animate-[spin_2s_linear_infinite] pink mx-auto"
        />
      </div>
    );
  }

  return (
    <>
      {(contentDetail.data || []).length > 0 ? (
        Object.keys(groupedPosts).map((date) => (
          <div key={date}>
            <p className="text-gray-600 mb-3">
              {moment(date).format("MMM DD, YYYY")} ({groupedPosts[date].length}
              )
            </p>
            <div className="grid grid-cols-12 gap-x-8 gap-y-10">
              {groupedPosts[date].map((content) => (
                <div
                  className="border bg-white space-y-5 xl:col-span-3 lg:col-span-4 md:col-span-6 col-span-12 w-full rounded-[8px] shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] p-5 relative"
                  key={content.id}
                >
                  <div className="flex justify-between flex-wrap gap-2 items-center">
                    <div className="flex items-center gap-x-1">
                      <ProxyImage
                        className="rounded-full w-11 h-11"
                        alt=""
                        url={content.media_user.profile_pic || avatar}
                        addCancelToken={() => {}}
                      />
                      <div className="truncate">
                        <span className="text-purple-900 truncate">
                          @{content.media_user.username}
                        </span>
                        <p className="text-gray-400 text-[12px] capitalize font-medium pl-1">
                          {content.media_type}
                        </p>
                      </div>
                    </div>
                    <Link
                      to={
                        (content.batch_medias || []).length > 0 && currentSlide
                          ? currentSlide.media_url || currentSlide.media_pic
                          : content.media_url || content.media_pic
                      }
                      target="_blank"
                      className="border border-purple-900 py-3 px-5 rounded-[8px] bg-white hover:bg-purple-800 cursor-pointer text-purple-800 hover:text-white"
                    >
                      <FaCloudDownloadAlt size={18} />
                    </Link>
                  </div>
                  {(content.batch_medias || []).length > 0 ? (
                    <SimpleSlider
                      batch={content.batch_medias}
                      mediaUser={content.media_user.profile_pic}
                      setCurrentSlide={setCurrentSlide}
                    />
                  ) : (
                    <div className="relative w-full h-[300px]">
                      <ProxyImage
                        className="rounded-[8px] w-full h-full"
                        alt=""
                        url={content.media_pic}
                        addCancelToken={() => {}}
                      />
                      {content.media_url && (
                        <Link
                          to={content.media_url}
                          target="_blank"
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <ImPlay2 size={60} color="white" />
                        </Link>
                      )}
                    </div>
                  )}
                  <p className="text-gray-400 text-[12px] font-medium">
                    {moment(content.published_at).format("MMM DD, YYYY")}
                  </p>
                  <p
                    className="text-ellipsis overflow-hidden h-[41px]"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {content.caption}
                  </p>
                  <div className="flex justify-between">
                    <span className="flex gap-x-2 items-center">
                      <FcLike size={18} />
                      {content.likes ? formatedNumber(content.likes) : "-"}
                    </span>
                    <span className="flex gap-x-2 items-center">
                      <MdComment size={18} className="text-blue-500" />
                      {content.comments
                        ? formatedNumber(content.comments)
                        : "-"}
                    </span>
                    {content.shares ? (
                      <span className="flex gap-x-2 items-center">
                        <MdPeopleAlt size={18} color="pink" />
                        {content.shares ? formatedNumber(content.shares) : "-"}
                      </span>
                    ) : (
                      ""
                    )}
                    {content.views ? (
                      <span className="flex gap-x-2 items-center">
                        <BsEyeFill size={18} color="pink" />
                        {content.views ? formatedNumber(content.views) : "-"}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center col-span-4 w-full py-[4.2rem] px-[1rem] justify-center text-[#bbb] text-[18px] font-medium leading-[40px]">
          We have nothing to show you here.
        </div>
      )}
      <div className="flex flex-col">
        <div className="flex-grow"></div>
        <div className="inline-flex items-center">
          {!isContentLoading && (contentDetail.total || 0) > 10 && (
            <Pagination
              totalRecords={Math.min(contentDetail.total || 0, 10000)}
              pageLimit={10}
              pageNeighbours={10}
              onPageChanged={onPageChanged}
            />
          )}
          {contentDetail &&
            !isContentLoading &&
            (contentDetail.data || []).length > 0 &&
            loadMore && <Loader size="20" />}
        </div>
      </div>
    </>
  );
};

export default ContentCards;
