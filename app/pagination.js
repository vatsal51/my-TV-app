import React from "react";

const Pagination = ({ page, setPage }) => {
  const handlePrevious = () => {
    if (page !== 1) {
      setPage(page - 1);
    } else {
      setPage(page);
    }
  };

  const handleNext = () => {
    // You might want to add a maximum page check here if needed
    if (page < 10) {
      setPage(page + 1);
    }
  };
  return (
    <>
      <div className="my-3 d-flex justify-content-between align-items-center">
        <button
          className="px-3 py-1 m-1 text-center btn btn-light"
          onClick={handlePrevious}
        >
          <i className="bi bi-caret-left"></i>
          Previous
        </button>
        <button
          className="px-3 py-1 m-1 text-center btn btn-light"
          onClick={handleNext}
        >
          Next
          <i className="bi bi-caret-right"></i>
        </button>
      </div>
    </>
  );
};

export default Pagination;
