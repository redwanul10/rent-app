import React from "react";
import Box from "@mui/material/Box";

export default function BookedDay(props) {
  return (
    <Box
      style={{
        margin: "0 2px",
        width: 36,
        height: 36,
        background: "#FB2576",
        borderRadius: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: 12,
      }}
    >
      {props.day}
    </Box>
  );
}
