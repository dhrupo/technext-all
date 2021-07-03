import React, { useState } from 'react';

const TableHeader = ({ headers, onSorting }) => {
  const [sortingField, setSortingField] = useState("");
  const [sortingOrder, setSortingOrder] = useState("asc");

  const onSortingChange = (field) => {
    const order = field === sortingField && sortingOrder === "asc" ? "desc" : "asc";
    setSortingField(field);
    setSortingOrder(order);
    onSorting(field, order);
  }

  return (
    <thead>
      <tr>
        {headers.map(({ name, field, sortable }) => (
          <th key={name} onClick={() => sortable ? onSortingChange(field) : null}>
            {name}
            {sortingField && sortingField === field && (
              // <FontAwesomeIcon icon={["fas",
              //   sortingOrder === "asc" ? "arrow-down" : "arrow-up"
              // ]} />
              <span style={{ fontSize: "24px" }}>{
                sortingOrder === "asc" ? "↓" : "↑"
              }
              </span>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;