import { Box } from "@mui/material";
import React from "react";
import { FiArrowLeftCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FcExpired } from "react-icons/fc";

const SessionExpiredLoader = ({ content_1, content_2 }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginTop: 25,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          p: 1,
          m: 1,
          gap: 3,
        }}
      >
        <Box
          className="loading_text"
          sx={{
            color: "black",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            {content_1}
            <Box marginTop={0.5}>
              <FcExpired color="black" />{" "}
            </Box>
          </Box>
          <Box>{content_2}</Box>
        </Box>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box marginTop={0.7}>
            <Link to={"/"}>
              <FiArrowLeftCircle size={20} />
            </Link>
          </Box>
          <Box>
            <Link
              to={"/"}
              style={{ textDecoration: "none" }}
              className="forgot_text_2"
            >
              {" "}
              Back to Login
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SessionExpiredLoader;
