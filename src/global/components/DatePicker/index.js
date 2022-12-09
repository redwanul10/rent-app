import React from "react";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
export default function DatePIcker(props) {
  const { onChange, value, minDate, label, ...otherProps } = props;

  return (
    <DesktopDatePicker
      label={label}
      inputFormat="MM/DD/YYYY"
      style={{ width: "100%" }}
      value={value}
      onChange={onChange}
      minDate={minDate}
      renderInput={(params) => (
        <TextField {...params} style={{ width: "100%" }} />
      )}
      {...otherProps}
    />
  );
}
