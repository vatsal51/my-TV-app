"use client";

import React from "react";
import PaginationClient from "./PaginationClient";

const Pagination = ({ page = 1, onPageChange, setPage }) => {
  const handlePageChange =
    typeof onPageChange === "function"
      ? onPageChange
      : typeof setPage === "function"
        ? setPage
        : undefined;

  return <PaginationClient page={page} onPageChange={handlePageChange} />;
};

export default Pagination;
