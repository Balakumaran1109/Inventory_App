import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box, Typography } from "@mui/material";
import { selectFilteredData } from "../../redux/features/product/FilterSlice";
import { useSelector } from "react-redux";

export default function SelectSmall({ handleCategoryValue }) {
  const [data, setData] = useState("All");

  const filteredData = useSelector(selectFilteredData);

  const handleChange = (event) => {
    setData(event.target.value);

    handleCategoryValue(event.target.value == "All" ? "" : event.target.value);
  };

  const filteredCategoryValue = () => {
    let filteredCategory = [];

    filteredData.filter((product) => {
      const category = product.category;
      if (!filteredCategory.includes(category)) {
        filteredCategory.push(category);
      }
    });
    return filteredCategory
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
            Category :
          </Typography>
        </Box>
        <Box>
          <FormControl sx={{ minWidth: 90 }} size="small">
            <Select id="demo-select-small" value={data} onChange={handleChange}>
              <MenuItem value="All">All</MenuItem>
              {filteredCategoryValue().map((product, index) => (
                <MenuItem key={index} value={product}>
                  {product}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </>
  );
}
