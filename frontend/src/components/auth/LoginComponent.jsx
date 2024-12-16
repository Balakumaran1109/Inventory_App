import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import HomeCard from "../cards/HomeCard";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { toast } from "react-toastify";
import { loginUser, validateEmail } from "../../services/AuthService";
import Loader from "../loader/Loader";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/AuthSlice";

const initialState = {
  email: "",
  password: "",
};

const LoginComponent = () => {
  const defaultTheme = createTheme();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { email, password } = formData;

  const loginForm = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Please fill in all required fields");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
      password,
    };

    setIsLoading(true);

    try {
      const data = await loginUser(userData);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      navigate("/dashboard");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ThemeProvider theme={defaultTheme}>
          <Grid container  >
            <CssBaseline />
            <Grid
              item
              className="home-grid"
              sm={12}
              md={6}
              sx={{
                backgroundColor: "#002984",
                backgroundSize: "cover",
                backgroundPosition: "left",
                paddingBottom: 9
              }}
            >
              <HomeCard />
            </Grid>

            <Grid item sm={12} md={6} square>
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box component="form" sx={{ mt: 1 }} onSubmit={loginForm}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    autoComplete="email"
                    autoFocus
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                  />
                  <Box sx={{ mt: 3, mb: 2 }}>
                    <Link
                      to={"/forgot"}
                      href="#"
                      variant="body2"
                      style={{ textDecoration: "none" }}
                    >
                      Forgot password?
                    </Link>
                  </Box>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      mt: 3,
                      mb: 2,
                    }}
                  >
                    <Link
                      to={"/register"}
                      href="#"
                      variant="body2"
                      style={{ textDecoration: "none" }}
                    >
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      )}
    </>
  );
};

export default LoginComponent;
