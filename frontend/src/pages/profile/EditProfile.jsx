import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/auth/AuthSlice";
import { Box } from "@mui/system";
import { Button, Card, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(selectUser);
  const { email } = user;

  useEffect(() => {
    if (!email) {
      navigate("/profile");
    }
  }, [email, navigate]);

  const initialState = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    photo: user?.photo,
  };

  const [profile, setProfile] = useState(initialState);
  const [profileImg, setProfileImg] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    setProfileImg(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveProfile = (e) => {
    e.preventDefault();
  };

  //   useEffect(() => {}, [profile, user]);

  return (
    <>
      <Box sx={{ marginBottom: 5, display: "flex", justifyContent: "center" }}>
        <Card sx={{ width: "90%", padding: 1, border: 1, margin: 2 }}>
          <Box component="form" onSubmit={saveProfile}>
            <Box padding={1} marginTop={1}>
              <Typography
                variant="h1"
                textAlign={"center"}
                className="card_title_style"
              >
                Edit Profile
              </Typography>
            </Box>
            <Card
              sx={{
                margin: 2,
                padding: 5,
                border: 1,
                display: "flex",
                flexDirection: "column-reverse",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <label className="image_text">Change Image :</label>
                <input
                  className="image_input"
                  type="file"
                  name="image"
                  onChange={(e) => handleImageChange(e)}
                />
              </Box>
              <Box className="user_image">
                {imagePreview == null ? (
                  <div className="image-preview">
                    <img src={user.photo} alt="Profile_Image"></img>
                  </div>
                ) : (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Profile_Image"></img>
                  </div>
                )}
              </Box>
            </Card>
            <Card sx={{ margin: 2, padding: 5, border: 1 }}>
              <label className="forgot_text">Name :</label>
              <TextField
                margin="normal"
                required
                fullWidth
                placeholder="User Name"
                autoFocus
                name="name"
                type="text"
                value={profile?.name}
                onChange={(e) => handleInputChange()}
              />{" "}
              <br></br>
              <br></br>
              <label className="forgot_text">{`Email : (Email cannot be changed)`}</label>
              <TextField
                margin="normal"
                required
                fullWidth
                placeholder="Email"
                autoFocus
                name="email"
                value={profile?.email}
                disabled
              />
              <br></br>
              <br></br>
              <label className="forgot_text">Phone :</label>
              <TextField
                margin="normal"
                required
                fullWidth
                placeholder="Phone"
                autoFocus
                name="phone"
                // type="number"
                value={profile?.phone}
                onChange={(e) => handleInputChange()}
              />
              <br></br>
              <br></br>
              <label className="forgot_text">Bio :</label>
              <TextField
                margin="normal"
                required
                fullWidth
                placeholder="Bio"
                autoFocus
                name="bio"
                type="text"
                value={profile?.bio}
                onChange={(e) => handleInputChange()}
              />{" "}
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
                    Updating...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: "black" }}
                  >
                    Update Profile
                  </Button>
                )}
              </Box>
            </Card>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default EditProfile;
