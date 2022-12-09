import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import dayjs from "dayjs";
import Select from "../../../global/components/Select";
import DatePIcker from "../../../global/components/DatePicker";

const TODAY_DATE = dayjs();

export default function BookForm(props) {
  const { selectedProduct, handleSelect, data, formValue, handleChange } =
    props;

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} marginBottom={2}>
          <Select
            label="Select Product"
            defaultValue="none"
            value={selectedProduct.name}
            onChange={handleSelect}
            options={data}
          />

          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            mt={1}
            mb={2}
          >
            <Typography fontWeight={600} color="#3A8891">
              Price: {selectedProduct?.info?.price || 0}
            </Typography>
            <Typography fontWeight={600} color="#3A8891">
              Min Rent Period: {selectedProduct?.info?.minimum_rent_period || 0}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={6}>
          <DatePIcker
            label="From"
            value={formValue.fromDate}
            onChange={(e) => {
              handleChange(e, "toDate");
              handleChange(e, "fromDate");
            }}
            minDate={TODAY_DATE}
          />
        </Grid>

        <Grid item xs={6}>
          <DatePIcker
            label="To"
            value={formValue.toDate}
            onChange={(e) => handleChange(e, "toDate")}
            // minDate={TODAY_DATE}
            minDate={formValue.fromDate}
          />
        </Grid>
      </Grid>
      {/* <Box mt={1} display="flex" flexDirection="row" alignItems="center">
        <Box
          style={{
            width: 15,
            height: 15,
            borderRadius: 3,
            background: "#FB2576",
            marginRight: 5,
          }}
        />
        <Typography>Booked</Typography>
      </Box> */}
    </>
  );
}
