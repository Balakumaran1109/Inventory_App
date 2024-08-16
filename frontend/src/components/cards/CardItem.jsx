import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";

const CardItem = ({ img, content, title }) => {
  return (
    <Card
      sx={{
        margin: 1,
        width: 180,
        height: 250,
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Box
          sx={{
            paddingBottom: 0,
          }}
        >
          <Typography
            gutterBottom
            className="card_title_style"
            variant="h2"
            component="div"
            textAlign={"center"}
          >
            {title}
          </Typography>
        </Box>

        <Box
          sx={{
            width: 160,
            height: 90,
          }}
        >
          <img height={"100%"} width={"100%"} src={img} alt={"inventory_app"} />
        </Box>
        <Box
          sx={{
            marginTop: 1,
          }}
        >
          <Typography
            textAlign={"left"}
            className="card_text_style"
            variant="h6"
          >
            {content}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardItem;
