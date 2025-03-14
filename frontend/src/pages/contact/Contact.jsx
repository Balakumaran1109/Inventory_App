import { Box, Button, Card, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { CiMail } from "react-icons/ci";
import { TbWorld } from "react-icons/tb";
import { IoLocationOutline } from "react-icons/io5";
import { contactUs } from "../../services/AuthService";
import { toast } from "react-toastify";

const Contact = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const data = { subject, message };

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await contactUs(data);
    toast.success(response.message);
    setIsLoading(false);
    setSubject("")
    setMessage("")
  };
  return (
    <>
      <Box
        sx={{
          marginBottom: 5,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card sx={{ width: "90%", padding: 1, border: 1, margin: 2 }}>
          <Box padding={1} marginTop={1}>
            <Typography
              variant="h1"
              textAlign={"center"}
              className="card_title_style"
            >
              Support Center
            </Typography>
          </Box>
          <Box
            component="form"
            onSubmit={sendEmail}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Card sx={{ margin: 2, padding: 5, border: 1, width: "80%" }}>
              <label className="forgot_text">Subject :</label>
              <TextField
                margin="normal"
                required
                fullWidth
                placeholder="Subject"
                autoFocus
                name="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />{" "}
              <br></br>
              <br></br>
              <label className="forgot_text">Message :</label>
              <TextField
                margin="normal"
                type="text"
                name="message"
                placeholder="Message"
                required
                fullWidth
                autoFocus
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <br></br>
              <br></br>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 2,
                  marginTop: 7,
                }}
              >
                {isLoading ? (
                  <Button
                    variant="contained"
                    style={{ color: "grey" }}
                    disabled
                  >
                    Sending...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: "black" }}
                  >
                    Send Message
                  </Button>
                )}
              </Box>
            </Card>
            <Card
              sx={{
                margin: 2,
                padding: 2,
                backgroundColor: "#002984",
              }}
            >
              <Typography
                sx={{
                  color: "#ffffff",
                  margin: 1,
                }}
                variant="h5"
                textAlign={"center"}
              >
                Contact Us{" "}
              </Typography>
              <Box sx={{ marginTop: 3 }}>
                <Typography
                  sx={{
                    color: "#ffffff",
                    fontFamily: "Poppins",
                  }}
                  variant="p"
                  textAlign={"center"}
                >
                  Users can reach out to us by filling out the form on this
                  page.
                  <br /> Or contact us using the details below.
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 3,
                  gap: 2,
                }}
              >
                <CiMail size={25} color="white" />{" "}
                <Box sx={{ fontFamily: "Poppins" }}>
                  <a
                    href="mailto:inventoryapp07@gmail.com"
                    style={{ color: "white" }}
                  >
                    inventoryapp07@gmail.com
                  </a>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 2,
                  marginTop: 3,
                }}
              >
                <TbWorld size={25} color="white" />
                <Box sx={{ fontFamily: "Poppins" }}>
                  <a
                    href="https://balakumaran1109.netlify.app"
                    style={{ color: "white" }}
                    target="_blank"
                  >
                    balakumaran1109.netlify.app
                  </a>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 2,
                  marginTop: 3,
                }}
              >
                <IoLocationOutline size={25} color="white" />
                <Typography sx={{ fontFamily: "Poppins", color: "white" }}>
                  Chennai, India
                </Typography>
              </Box>
            </Card>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default Contact;
