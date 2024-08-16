import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <>
      <Grid container component="main">
        <Grid item xs={4} sm={4} md={4}>
          <Box>
            <Typography
              gutterBottom
              className="footer_text_style"
              variant="h3"
              component="h3"
              textAlign={"center"}
            >
              7K
            </Typography>
            <Typography
              className="footer_text_style_p"
              variant="p"
              component="p"
              textAlign={"center"}
            >
              Brand Owners
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
          <Box>
            <Typography
              gutterBottom
              className="footer_text_style"
              variant="h3"
              component="h3"
              textAlign={"center"}
            >
              11K
            </Typography>
            <Typography
              className="footer_text_style_p"
              variant="p"
              component="p"
              textAlign={"center"}
            >
              Active Users
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={4} sm={4} md={4}>
          <Box>
            <Typography
              gutterBottom
              className="footer_text_style"
              variant="h3"
              component="h3"
              textAlign={"center"}
            >
              100+
            </Typography>
            <Typography
              className="footer_text_style_p"
              variant="p"
              component="p"
              textAlign={"center"}
            >
              Partners
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Footer;
