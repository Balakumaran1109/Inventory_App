import { Box, Typography } from "@mui/material";
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
      <Box width={"100%"} height={"100%"} margin={"auto"} marginTop={1}>
        <Box width={"100%"} padding={1} margin={"auto"} className="home_title">
          <Typography
            sx={{
              color: "#ffffff",
            }}
            variant="h1"
            textAlign={"center"}
            className="font_style_title"
          >
            Inventory & Stock Management Solution
          </Typography>
        </Box>
        <Box width={"90%"} padding={1} margin={"auto"}>
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
        </Box>
        <Box
          margin={"auto"}
          marginTop={3}
          display={"flex"}
          width={"100%"}
          justifyContent={"center"}
          flexWrap={"wrap"}
          alignItems={"center"}
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
        </Box>
        <Box
          margin={"auto"}
          marginTop={5}
          display={"flex"}
          width={"70%"}
          justifyContent={"center"}
          flexWrap={"wrap"}
          alignItems={"center"}
        >
          <Footer />
        </Box>
      </Box>
    </>
  );
};

export default HomeCard;
