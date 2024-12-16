import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { RiMenuFoldFill, RiMenuUnfoldFill } from "react-icons/ri";
import SidebarItem from "./SidebarItem";
import menu from "../data/SidebarData";
import { useSelector } from "react-redux";
import {
  logoutLoadingStatus,
  selectIsLoggedIn,
} from "../../redux/features/auth/AuthSlice";
import Loader from "../loader/Loader";
import SessionExpiredLoader from "../loader/SessionExpiredLoader";

const content_1 = "Session Expired...";
const content_2 = "Please Login to Continue";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const isLoading = useSelector(logoutLoadingStatus);
  const loggedIn = useSelector(selectIsLoggedIn);

  

  return (
    <>
      {(!loggedIn && (
        <SessionExpiredLoader content_1={content_1} content_2={content_2} />
      )) || (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <Box display={"flex"}>
              <Box
                className={isOpen ? "sidebar_open" : "sidebar_close"}
                position={"fixed"}
                width={isOpen ? "13%" : "5%"}
                height={"100%"}
                bgcolor={"white"}
                overflow={"auto"}
                borderRight={2}
              >
                <Box bgcolor={"white"} borderBottom={2}>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    padding={1.5}
                    bgcolor={"black"}
                    color={"white"}
                  >
                    {isOpen && (
                      <RiMenuFoldFill
                        size={35}
                        style={{ cursor: "pointer" }}
                        onClick={() => toggle()}
                      />
                    )}

                    {!isOpen && (
                      <RiMenuUnfoldFill
                        size={30}
                        style={{ cursor: "pointer" }}
                        onClick={() => toggle()}
                      />
                    )}
                  </Box>
                </Box>
                {menu.map((item, index) => {
                  return (
                    <SidebarItem key={index} item={item} isOpen={isOpen} />
                  );
                })}
              </Box>
              <Box
                component={"main"}
                width={"100%"}
                paddingLeft={isOpen ? 27 : 10}
                style={{ transition: "all .5s" }}
              >
                {children}
              </Box>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default Sidebar;
