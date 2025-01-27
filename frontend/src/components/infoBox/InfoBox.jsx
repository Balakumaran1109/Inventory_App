import { Box, Typography } from "@mui/material";
import React from "react";

const InfoBox = ({ bgColor, title, count, icon }) => {
  return (
    <Box
      component={"div"}
      id="infoBox"
      sx={{
        width: "100%",
        height: "7rem",
        maxWidth: "16rem",
        marginRight: "10px",
        marginBottom: "10px",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        bgcolor: bgColor,
        flexWrap: "wrap",
        color: "white",
        textAlign: "center",
      }}
    >
      <Box>{icon}</Box>
      <Box
        sx={{
          maxWidth: "10rem",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography component={"p"} variant="p" sx={{ fontFamily: "Poppins" }}>
          {title}
        </Typography>
          <Typography component={"h4"} variant="h4" >
            {count}
          </Typography>
      </Box>
    </Box>
  );
};

export default InfoBox;
