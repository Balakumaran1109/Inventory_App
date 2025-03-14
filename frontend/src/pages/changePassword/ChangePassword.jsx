import { ThemeProvider } from "@emotion/react";
import {
  Avatar,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { FiArrowLeftCircle } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { changePassword } from "../../services/AuthService";
import { toast } from "react-toastify";


const initialState = {
    oldPassword: "",
    newPassword: "",
    newPassword2: "",
  }
const ChangePassword = () => {
  const defaultTheme = createTheme();

  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const {oldPassword, newPassword, newPassword2} = formData;

  const formSubmit = async (e) => {
    e.preventDefault();

    const data = {
      oldPassword,
      newPassword,
    };
    

    
    if (newPassword !== newPassword2) {
      return toast.error("New Passwords does not match");
    }

    const response = await changePassword(data);
    toast.success(response);
    navigate("/")
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <RiLockPasswordLine />
          </Avatar>
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
          <Box component="form" onSubmit={formSubmit} sx={{ mt: 5 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Old Password"
                  type="password"
                  id="oldPassword"
                  autoComplete="new-password"
                  name="oldPassword"
                  value={oldPassword}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sx={{ marginTop: 2 }}>
                <TextField
                  required
                  fullWidth
                  label="New Password"
                  type="password"
                  id="newPassword"
                  autoComplete="new-password"
                  name="newPassword"
                  value={newPassword}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sx={{ marginTop: 2 }}>
                <TextField
                  required
                  fullWidth
                  label="Confirm New Password"
                  type="password"
                  id="newPassword2"
                  autoComplete="new-password"
                  name="newPassword2"
                  value={newPassword2}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 4, mb: 2 }}
            >
              Reset Password
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ChangePassword;
