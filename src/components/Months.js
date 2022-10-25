import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import ConfirmationDialog from "./MonthData";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const Months = ({ datum }) => {
  const { actual, changeActual } = useStateContext();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  for (var i = 0; i < months.length; i++) {
    if (datum[months[i]] > "0") {
      months.splice(i, 1);
      i = -1;
    }
  }
  return (
    <div id="addKPI">
      <div className="form-group">
        <h4>{datum.kpi_name}</h4>
      </div>
      <div>
        {/* <label>Month</label>
        <br /> */}
        {/* <select id="month" onChange={(e) => changeMonth(e.target.value)}>
          <option defaultValue>Select</option>
          {months.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select> */}
        <ConfirmationDialog months={months} />
      </div>
      <div className="form-group" style={{ flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            "& > :not(style)": { m: 1 },
          }}
        >
          <TextField
            helperText=" "
            id="demo-helper-text-aligned-no-helper"
            label="Actual Value"
            value={actual}
            onChange={(e) => changeActual(e.target.value)}
          />
        </Box>
        {/* <input
          id="actual"
          required
          type="text"
          className="form-control"
          name="actual"
          value={actual}
          onChange={(e) => changeActual(e.target.value)}
        /> */}
      </div>
    </div>
  );
};

export default Months;
