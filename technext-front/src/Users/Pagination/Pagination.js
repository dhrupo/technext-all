import React, { useEffect, useMemo, useState } from 'react';

const Pagination = ({ total = 0, itemsPerPage = 10, currentPage = 1, onPageChange, handlePostPerPage }) => {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (total > 0 && itemsPerPage > 0) {
      setTotalPages(Math.ceil(total / itemsPerPage))
    }
  }, [total, itemsPerPage])

  const paginationItems = useMemo(() => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(<li key={i} className="page-item"><button className="page-link" onClick={() => onPageChange(i)}>{i}</button></li>)
    }
    return pages;
  }, [totalPages, currentPage, onPageChange]);

  if (totalPages === 0) return null;

  return (
    <nav>
      <ul className="pagination">
        {paginationItems}
        <input type="text" style={{ width: "100px" }} name="postNumber" placeholder="paginate" onChange={(e) => handlePostPerPage(parseInt(e.target.value))} />
      </ul>
    </nav>
  );
};

export default Pagination;