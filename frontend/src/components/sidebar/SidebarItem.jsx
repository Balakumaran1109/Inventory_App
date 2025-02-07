import { Box, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { NavLink } from "react-router-dom";

const SidebarItem = ({ item, isOpen }) => {
  const [expandMenu, setExpandMenu] = useState(false);
  const toggle = () => setExpandMenu(!expandMenu);

  const [activeStatus, setActiveStatus] = useState(false);

  const activeLink = ({ isActive }) =>
    isActive ? setActiveStatus(true) : setActiveStatus(false);

  return (
    <>
      <NavLink
        to={item.path}
        className={activeLink}
        style={{ textDecoration: "none" }}
      >
        <Box
          padding={1.5}
          bgcolor={activeStatus ? "#eee" : "white"}
          borderBottom={isOpen ? 2 : 1}
          borderColor={"black"}
          sx={{
            ":hover": {
              bgcolor: "#eee",
            },
          }}
        >
          <Box
            className={isOpen ? "sidebar_item_open" : "sidebar_item_close"}
            marginTop={0.5}
          >
            {item.icon && <Box>{item.icon}</Box>}

            {item.title && isOpen && <Box>{item.title}</Box>}
          </Box>
        </Box>
      </NavLink>
    </>
  );
};

export default SidebarItem;
