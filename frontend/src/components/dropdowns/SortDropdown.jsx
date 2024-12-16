import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box, Typography } from "@mui/material";

export default function SelectSmall({ handleSortData }) {
  const [data, setData] = useState("All");

  const handleChange = (event) => {
    handleSortData(event.target.value);
    setData(event.target.value);
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Box>
          <Typography
            color={"black"}
            variant="h6"
            textAlign={"center"}
            className="loading_text"
            marginBottom={2}
          >
            Sort:
          </Typography>
        </Box>
        <Box>
          <FormControl sx={{ minWidth: 90 }} size="small">
            <Select id="demo-select-small" value={data} onChange={handleChange}>
              <MenuItem value="All">All </MenuItem>
              <MenuItem value={"OS"}>Out of Stock</MenuItem>
              <MenuItem value={"LtoH"}>
                <b>Price -</b>&nbsp;Low to High
              </MenuItem>
              <MenuItem value={"HtoL"}>
                <b>Price -</b>&nbsp;High to Low
              </MenuItem>

              <MenuItem value={"LtoG"}>
                <b>Quantity -</b> &nbsp;Lesser to Greater
              </MenuItem>
              <MenuItem value={"GtoL"}>
                <b>Quantity -</b> &nbsp;Greater to Lesser
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </>
  );
}
