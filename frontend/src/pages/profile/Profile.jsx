import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../services/AuthService";
import { SET_NAME, SET_USER } from "../../redux/features/auth/AuthSlice";
import Loader from "../../components/loader/Loader";
import { Box, Button, Card, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    async function getUserData() {
      const data = await getUser();
      console.log(data);

      setProfile(data);
      setIsLoading(false);

      await dispatch( SET_USER(data));
      await dispatch(SET_NAME(data.name));
    }
    getUserData();
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Box width={"100%"} padding={1} margin={"auto"}>
          <Typography sx={{ textAlign: "center" }} variant="h5">
            My Profile
          </Typography>
          <Card
            sx={{
              width: "95%",
              height: "75vh",
              padding: 1,
              margin: 2,
              display: "flex",
              border: 1,
              borderColor: "grey.500",
            }}
          >
            <Card
              sx={{
                width: "100%",
                height: "90%",
                margin: 2,
                border: 1,
                borderColor: "grey.500",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "95%",
                  height: "80%",
                  margin: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={profile?.photo}
                  alt={"Profile Photo"}
                  className="product_img"
                ></img>
              </Box>
            </Card>

            <Card
              sx={{
                width: "100%",
                height: "83%",
                margin: 2,
                padding: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
                border: 1,
                borderColor: "grey.500",
              }}
              className="user_details"
            >
              <Typography variant="h6">
                <b>Name :</b> &nbsp;
                <Box component={"span"} >
                  {profile?.name.toUpperCase()}
                </Box>
              </Typography>
              <br />

              <Typography variant="p">
                <b>Email :</b> &nbsp;{profile?.email}
              </Typography>
              <br />
              <Typography variant="p">
                <b>Phone :</b> &nbsp;{profile?.phone}
              </Typography>

              <br />
              <Typography variant="p">
                <b>Bio :</b> &nbsp;{profile?.bio}
              </Typography>
              <br />
              <br />
              
              <br /><Box
                sx={{ borderTop: 1, width: "100%", color: "grey.500" }}
              ></Box>
              <br />
              <br />

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "end"
                
                }}
              >
                <Link to="/edit-profile">
                  <Button variant="contained" sx={{ bgcolor: "#002984" }}>
                    Edit Profile
                  </Button>
                </Link>

                <Link to="/change-password">
                  <Button variant="contained" sx={{ bgcolor: "#1b5e20" }}>
                    Change Password
                  </Button>
                </Link>
              </Box>
            </Card>
          </Card>
        </Box>
      )}
    </>
  );
};

export default Profile;
