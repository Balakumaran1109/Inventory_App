import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import CardItem from "./CardItem";
import inv_img_1 from "../../assets/inventory_App.jpg";
import inv_img_2 from "../../assets/inventory_App_1.jpg";
import inv_img_3 from "../../assets/inventory_App_2.jpg";
import "@fontsource/poppins";
import Footer from "./Footer";

const HomeCard = () => {
  const content_1 =
    "Analyzes historical sales data to predict future inventory needs, helping businesses plan better and reduce excess inventory.";
  const content_2 =
    "Provides easy access to personalized features, manage the inventory data's and and collaborate with team members.";
  const content_3 =
    "Enables users to check for items that are out of stock, ensuring timely replenishment and preventing lost sales opportunities.";
  return (
    <>
      <Grid
        container
        width={"100%"}
        height={"100%"}
        margin={"auto"}
        marginTop={3}
      >
        <Grid
          item
          sm={6}
          xs={12}
          md={12}
          width={"100%"}
          padding={1}
          margin={"auto"}
        >
          <Typography
            sx={{
              color: "#ffffff",
              textAlign: "center",
              fontFamily: "Poppins",
            }}
            variant="h1"
            className="font_style_title"
          >
            Inventory & Stock Management Solution
          </Typography>
        </Grid>
        <Grid
          item
          width={"90%"}
          sm={6}
          xs={6}
          md={12}
          padding={1}
          margin={"auto"}
        >
          <Typography
            className="font_style_content"
            sx={{
              color: "#ffffff",
            }}
            textAlign={"center"}
            marginTop={2}
            component={"p"}
          >
            Inventory system to control and manage products in the warehouse in
            real time and integrated to make it easier to develop your business.
          </Typography>
        </Grid>
        <Grid
          item
          margin={"auto"}
          marginTop={3}
          display={"flex"}
          width={"100%"}
          justifyContent={"center"}
          flexWrap={"wrap"}
          alignItems={"center"}
          sm={12}
          md={12}
          xs={6}
        >
          <Box>
            <CardItem
              img={inv_img_1}
              content={content_1}
              title={"Inventory Forecasting"}
            />
          </Box>
          <Box className="card_2_media">
            <CardItem
              img={inv_img_2}
              content={content_2}
              title={"Team Collaboration"}
            />
          </Box>
          <Box className="card_3_media">
            <CardItem
              img={inv_img_3}
              content={content_3}
              title={"Out of Stock Alerts"}
            />
          </Box>
        </Grid>
        <Grid
          item
          margin={"auto"}
          marginTop={5}
          display={"flex"}
          width={"70%"}
          justifyContent={"center"}
          flexWrap={"wrap"}
          alignItems={"center"}
          sm={12}
          md={12}
          xs={6}
        >
          <Footer />
        </Grid>
      </Grid>
    </>
  );
};

export default HomeCard;
