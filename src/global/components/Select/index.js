import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

export default function Select(props) {
  const { value, onSelect, label, defaultValue, options, ...otherProps } =
    props;
  return (
    <TextField
      select
      label={label}
      value={value}
      onChange={onSelect}
      style={{ width: "100%" }}
      {...otherProps}
    >
      <MenuItem value="none">none</MenuItem>
      {options.map((item, index) => (
        <MenuItem value={index} key={index}>
          {item.name}
        </MenuItem>
      ))}
    </TextField>
  );
}
