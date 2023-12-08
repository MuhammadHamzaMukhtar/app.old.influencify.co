import React, { useState, useEffect } from "react";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

const Pagination = ({
  totalRecords = null,
  pageLimit = 30,
  pageNeighbours = 0,
  onPageChanged = () => {},
}) => {
  const [page, setPage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalRecords / pageLimit);
  const pageNeighboursCount = Math.max(0, Math.min(pageNeighbours, 3));

  useEffect(() => {
    setCurrentPage(1);
  }, [totalRecords, pageLimit, pageNeighbours]);

  const gotoPage = (page) => {
    const newCurrentPage = Math.max(0, Math.min(page, totalPages));
    setCurrentPage(newCurrentPage);

    const paginationData = {
      currentPage: newCurrentPage,
      totalPages: totalPages,
      pageLimit: pageLimit,
      totalRecords: totalRecords,
    };

    onPageChanged(paginationData);
  };

  const handleClick = (page, evt) => {
    evt.preventDefault();
    gotoPage(page);
  };

  const handleMoveLeft = (evt) => {
    evt.preventDefault();
    gotoPage(currentPage - pageNeighboursCount * 2 - 1);
  };

  const handleMoveRight = (evt) => {
    evt.preventDefault();
    gotoPage(currentPage + pageNeighboursCount * 2 + 1);
  };

  const fetchPageNumbers = () => {
    const totalNumbers = pageNeighboursCount * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      let pages = [];
      const leftBound = currentPage - pageNeighboursCount;
      const rightBound = currentPage + pageNeighboursCount;
      const beforeLastPage = totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      pages = range(startPage, endPage);

      const pagesCount = pages.length;
      const singleSpillOffset = totalNumbers - pagesCount - 1;

      const leftSpill = startPage > 2;
      const rightSpill = endPage < beforeLastPage;

      const leftSpillPage = LEFT_PAGE;
      const rightSpillPage = RIGHT_PAGE;

      if (leftSpill && !rightSpill) {
        const extraPages = range(startPage - singleSpillOffset, startPage - 1);
        pages = [leftSpillPage, ...extraPages, ...pages];
      } else if (!leftSpill && rightSpill) {
        const extraPages = range(endPage + 1, endPage + singleSpillOffset);
        pages = [...pages, ...extraPages, rightSpillPage];
      } else if (leftSpill && rightSpill) {
        pages = [leftSpillPage, ...pages, rightSpillPage];
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };

  if (!totalRecords || totalPages === 1) return null;

  const pages = fetchPageNumbers();

  return (
    <nav
      aria-label="Countries Pagination"
      className="inline-flex items-center justify-center"
    >
      <ul className="inline-flex gap-2">
        {pages.map((page, index) => {
          if (page === LEFT_PAGE) {
            return (
              <li key={index} className="page-item">
                <button
                  className={`px-4 py-2 bg-[#efefef] border border-[#7c3292] rounded-md font-semibold`}
                  aria-label="Previous"
                  onClick={handleMoveLeft}
                >
                  <span className="text-[#7c3292]">Previous</span>
                </button>
              </li>
            );
          }

          if (page === RIGHT_PAGE) {
            return (
              <li key={index} className="page-item">
                <button
                  className={`px-4 py-2 bg-[#efefef] border border-[#7c3292] rounded-md font-semibold`}
                  aria-label="Next"
                  onClick={handleMoveRight}
                >
                  <span className="text-[#7c3292]">Next</span>
                </button>
              </li>
            );
          }

          return (
            <li key={index}>
              <button
                className={`px-4 py-2 ${
                  currentPage === page
                    ? "text-white bg-[#7c3292] rounded-md font-semibold"
                    : "bg-[#efefef] text-[#29023a] rounded-md font-semibold"
                }`}
                disabled={currentPage === page}
                onClick={(e) => handleClick(page, e)}
              >
                {page}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="text-[#29023a] font-semibold ml-4 mr-2">Go to page</div>

      <div>
        <input
          onChange={(e) => setPage(e.target.value)}
          value={page}
          type="number"
          id="small-input"
          className="block max-w-[100px] rounded-md py-2 border border-[#c5c5d2] focus-visible:outline-none px-2 text-base"
        />
      </div>

      <div className="ml-2 mr-2">
        <button
          disabled={currentPage == page || page == ""}
          className={`px-3 py-2 bg-[#7c3292] text-white rounded-md`}
          onClick={(e) => gotoPage(page)}
        >
          Go
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
