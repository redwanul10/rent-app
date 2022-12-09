import React, { useMemo, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { getComparator, stableSort } from "./utils";

export default function SortableTable(props) {
  const { columns, data, children, initialSortedField } = props;
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(initialSortedField);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  let sortedData = useMemo(
    () => stableSort(data, getComparator(order, orderBy)),
    [data, order, orderBy]
  );

  return (
    <TableContainer sx={{ height: 440 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column?.id}
                align={column?.align}
                style={{ minWidth: column?.minWidth }}
              >
                <TableSortLabel
                  active={orderBy === column?.id}
                  direction={orderBy === column?.id ? order : "asc"}
                  onClick={createSortHandler(column?.id)}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{children && children(sortedData)}</TableBody>
      </Table>
    </TableContainer>
  );
}
