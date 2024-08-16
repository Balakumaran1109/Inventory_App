import { ThemeProvider } from "@emotion/react";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RiLockPasswordLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { resetPassword } from "../../services/AuthService";
import { FiArrowLeftCircle } from "react-icons/fi";
import ForgotLoader from "../loader/ForgotLoader";

const initialState = {
  password: "",
  password_2: "",
};

const content_1 = "Password changed successfully";
const content_2 = "Please Login";

const ResetComponent = () => {
  const defaultTheme = createTheme();

  const [formData, setFormData] = useState(initialState);

  const { password, password_2 } = formData;

  const { resettoken } = useParams();

  const [emailSent, setEmailSent] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      return toast.error("Password must be upto 6 characters");
    }
    if (password !== password_2) {
      return toast.error("Password does not Match");
    }

    const userData = {
      password,
      password_2,
    };
    try {
      const data = await resetPassword(userData, resettoken);
      if (data) {
        setEmailSent(true);
      }
    } catch (error) {
      toast.error("Please try again");
    }
  };

  return (
    <>
      {emailSent ? (
        <ForgotLoader content_1={content_1} content_2={content_2} />
      ) : (
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
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
                Reset Password
              </Typography>
              <Box component="form" onSubmit={formSubmit} sx={{ mt: 5 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="New Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      name="password"
                      value={password}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ marginTop: 2 }}>
                    <TextField
                      required
                      fullWidth
                      label="Confirm New Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      name="password_2"
                      value={password_2}
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

                <Box
                  sx={{
                    marginTop: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box marginTop={0.8}>
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
                      <Box> Back to Login</Box>
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      )}
    </>
  );
};

export default ResetComponent;
