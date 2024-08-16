import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  LOGOUT_LOADING,
  selectName,
  SET_LOGIN,
} from "../../redux/features/auth/AuthSlice";
import { logoutUser } from "../../services/AuthService";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(selectName);

  const logout = async () => {
    Swal.fire({
      title: "Are you sure, Do you want to Logout?",
      showDenyButton: true,
      confirmButtonText: "Logout",
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        const handleLogout = async () => {
          await dispatch(LOGOUT_LOADING(true));
          const navigateToHome = async () => {
            await logoutUser();
            await dispatch(SET_LOGIN(false));
            navigate("/");
            await dispatch(LOGOUT_LOADING(false));
          };
          setTimeout(() => {
            navigateToHome();
          }, 3000);
        };

        handleLogout();
      } else {
        result.dismiss === Swal.DismissReason.cancel;
      }
    });
  };

  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography variant="h5" component={"h5"}>
              Welcome,
            </Typography>
            <Typography variant="h5" component={"h5"}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
          </Box>
          <Box>
            <Button onClick={() => logout()} variant="contained">
              Logout
            </Button>
          </Box>
        </Box>

        <hr />
      </Box>
    </>
  );
};

export default Header;
