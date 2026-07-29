"use client";

import React from "react";

const PaginationClient = ({ page, onPageChange = () => {} }) => {
  const handlePrevious = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < 10) {
      onPageChange(page + 1);
    }
  };

  return (
    <div className="my-3 d-flex justify-content-between align-items-center">
      <button
        className="px-3 py-1 m-1 text-center btn btn-light"
        onClick={handlePrevious}
      >
        <i className="bi bi-caret-left"></i>
        Previous
      </button>
      <span className="text-white">Page {page}</span>
      <button
        className="px-3 py-1 m-1 text-center btn btn-light"
        onClick={handleNext}
      >
        Next
        <i className="bi bi-caret-right"></i>
      </button>
    </div>
  );
};

export default PaginationClient;
