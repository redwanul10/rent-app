import React from "react";
import { getTotalDays } from "../utils";
import Typography from "@mui/material/Typography";

export default function ProductEstimation(props) {
  const { fromDate, toDate, price } = props;
  return (
    <Typography variant="body1" mb={2}>
      Your estimated price is {getTotalDays(fromDate, toDate) * price}, Do you
      want to proceed ?
    </Typography>
  );
}
