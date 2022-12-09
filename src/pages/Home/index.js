import React, { useMemo, useState } from "react";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import data from "../../data.json";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import BookModal from "./components/BookModal";
import SortableTable from "../../global/components/Table";
import ReturnModal from "./components/ReturnModal";

const columns = [
  { id: "sl", label: "SL" },
  { id: "name", label: "Name" },
  { id: "code", label: "code", maxWidth: 50, align: "center" },
  {
    id: "availability",
    label: "availability",
    maxWidth: 50,
    align: "center",
  },
  {
    id: "needing_repair",
    label: "Need to Repair",
    maxWidth: 50,
    align: "center",
  },
  {
    id: "durability",
    label: "Durability",
    align: "center",
  },
  {
    id: "mileage",
    label: "Milage",
    align: "center",
  },
];

export default function Home(props) {
  const [search, setSearch] = useState("");
  const [modals, setModals] = useState({
    bookModal: false,
    returnModal: false,
  });

  const handleOpen = (type) => {
    setModals({
      ...modals,
      [type]: true,
    });
  };
  const handleClose = (type) => {
    setModals({
      ...modals,
      [type]: false,
    });
  };

  const searchedProduct = useMemo(
    () =>
      data.filter(
        (product) =>
          product?.name
            ?.toLocaleLowerCase()
            .indexOf(search.toLocaleLowerCase()) !== -1
      ),
    [search]
  );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Box padding={2} textAlign="center">
        <TextField
          placeholder="Product name"
          onChange={(e) => setSearch(e.target.value)}
          id="outlined-basic"
          label="Search"
          variant="outlined"
          size="small"
          style={{ width: "50%" }}
        />
      </Box>

      <SortableTable
        columns={columns}
        data={searchedProduct}
        initialSortedField="name"
      >
        {(sortedData) =>
          sortedData.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>

              <TableCell component="th" scope="row">
                {row?.name}
              </TableCell>
              <TableCell align="center">{row?.code}</TableCell>
              <TableCell align="center">
                {row?.availability ? "true" : "false"}
              </TableCell>
              <TableCell align="center">
                {row.needing_repair ? "true" : "false"}
              </TableCell>
              <TableCell align="center">{row?.durability}</TableCell>
              <TableCell align="center">
                {row?.mileage ? row?.mileage : 0}
              </TableCell>
            </TableRow>
          ))
        }
      </SortableTable>

      <Box padding={2} textAlign="right">
        <Button
          style={{ marginRight: 10 }}
          variant="outlined"
          onClick={() => handleOpen("bookModal")}
        >
          Book
        </Button>
        <Button variant="outlined" onClick={() => handleOpen("returnModal")}>
          Return
        </Button>
      </Box>

      <BookModal
        open={modals.bookModal}
        onClose={() => handleClose("bookModal")}
        data={data}
      />

      <ReturnModal
        open={modals.returnModal}
        onClose={() => handleClose("returnModal")}
        data={data}
      />
    </Paper>
  );
}
