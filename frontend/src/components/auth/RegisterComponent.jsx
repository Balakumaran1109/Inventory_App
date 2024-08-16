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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser, validateEmail } from "../../services/AuthService";
import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/AuthSlice";
import Loader from "../loader/Loader";

const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

const RegisterComponent = () => {
  const defaultTheme = createTheme();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { name, email, password, password2 } = formData;

  const registerForm = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !password2) {
      return toast.error("Please fill in all required fields");
    }

    if (password.length < 6) {
      return toast.error("Password must be upto 6 characters");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    if (password !== password2) {
      return toast.error("Password does not Match");
    }

    const userData = {
      name,
      email,
      password,
    };

    setIsLoading(true);

    try {
      const data = await registerUser(userData);
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
          {" "}
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
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
                <Box component="form" onSubmit={registerForm} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="given-name"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        autoFocus
                        name="name"
                        value={name}
                        onChange={handleInputChange}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                      />
                    </Grid>
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
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        id="password2"
                        autoComplete="new-password"
                        name="password2"
                        value={password2}
                        onChange={handleInputChange}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>

                  <Box
                    sx={{
                      marginTop: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Link
                      to={"/"}
                      href="#"
                      variant="body2"
                      style={{ textDecoration: "none" }}
                    >
                      Already have an account? Sign in
                    </Link>
                  </Box>
                </Box>
            </Box>
          </Container>
        </ThemeProvider>
      )}
    </>
  );
};

export default RegisterComponent;
