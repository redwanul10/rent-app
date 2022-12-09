import React from "react";
import Grid from "@mui/material/Grid";
import Select from "../../../global/components/Select";
import TextField from "@mui/material/TextField";

export default function RentForm(props) {
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
        </Grid>

        <Grid item xs={12}>
          <TextField
            placeholder="Product name"
            onChange={(e) => handleChange(e, "mileage")}
            id="outlined-basic"
            label="Used Mileage"
            variant="outlined"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            style={{ width: "100%" }}
          />
        </Grid>
      </Grid>
    </>
  );
}
