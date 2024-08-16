import { ThemeProvider } from "@emotion/react";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMail } from "react-icons/io5";
import { FiArrowLeftCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import { forgotPassword, validateEmail } from "../../services/AuthService";
import ForgotLoader from "../loader/ForgotLoader";

const content_1 = "Reset Email sent";
const content_2 = "Please check your Email";

const ForgotComponent = () => {
  const defaultTheme = createTheme();

  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Please enter the email");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
    };
    setEmail("");
    try {
      const data = await forgotPassword(userData);
      if (data.success) {
        setEmailSent(true)
      }
    } catch (error) {
      toast.error("Please try again")
    }
  };
  return (
    <>
      {emailSent ? (
        <ForgotLoader content_1={content_1} content_2={content_2}/>
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
                <IoMail />
              </Avatar>
              <Typography component="h1" variant="h5">
                Forgot Password
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <Box sx={{ mt: 3, mb: 3 }}>
                  <Typography className="forgot_text">
                    Please enter your Registered Email address. You will receive
                    a link to create a new password via email.
                  </Typography>
                </Box>

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
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Get Reset Email
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
                      Back to Login
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

export default ForgotComponent;
