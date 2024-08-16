import { Box, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { NavLink } from "react-router-dom";

const SidebarItem = ({ item, isOpen }) => {
  const [expandMenu, setExpandMenu] = useState(false);
  const toggle = () => setExpandMenu(!expandMenu);

  const [activeStatus, setActiveStatus] = useState(false);
  const [activeSubStatus, setActiveSubStatus] = useState(false);

  const activeLink = ({ isActive }) =>
    isActive ? setActiveStatus(true) : setActiveStatus(false);

  const activeSubLink = ({ isActive }) =>
    isActive ? setActiveSubStatus(true) : setActiveSubStatus(false);

  if (item.children) {
    return (
      <>
        <Box
          padding={1.5}
          // bgcolor={activeSubStatus ? "#eee" : "white"}
          borderBottom={isOpen ? 2 : 1}
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
            {isOpen && <Box>{item.title}</Box>}
            {expandMenu && (
              <Box>
                <MdKeyboardArrowRight
                  size={25}
                  onClick={() => toggle()}
                  style={{ cursor: "pointer" }}
                />
              </Box>
            )}

            {!expandMenu && isOpen && (
              <Box>
                <MdKeyboardArrowDown
                  size={25}
                  onClick={() => toggle()}
                  style={{ cursor: "pointer" }}
                />
              </Box>
            )}
          </Box>

          {/* Sidebar children */}
          {expandMenu && isOpen && (
            <Box margin={1.5}>
              {item.children.map((child, index) => {
                return (
                  <Box
                    key={index}
                    marginTop={2}
                    bgcolor={activeSubStatus ? "#eee" : "white"}
                  >
                    <NavLink
                      to={child.path}
                      style={{ textDecoration: "none" }}
                      className={activeSubLink}
                    >
                      <Box id="sidebar_item" margin={1.5}>
                        {child.icon && <Box>{child.icon}</Box>}
                        {child.title && <Box>{child.title}</Box>}
                      </Box>
                    </NavLink>
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>
      </>
    );
  } else {
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
  }
};

export default SidebarItem;
