import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/auth/AuthSlice";
import { Box } from "@mui/system";
import { Button, Card, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateUser } from "../../services/AuthService";

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

  const saveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Handle Image upload
      let imageUrl;
      if (
        profileImg &&
        (profileImg.type === "image/jpeg" ||
          profileImg.type === "image/jpg" ||
          profileImg.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", profileImg);
        image.append("cloud_name", "balakumaran1109");
        image.append("upload_preset", "inventory_app_user_image");

        // Save image to cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/balakumaran1109/image/upload",
          { method: "post", body: image }
        );
        const imgData = await response.json();
        imageUrl = imgData.url.toString();
      }

      // Save Profile
      const formData = {
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
        photo: profileImg ? imageUrl : profile.photo,
      };

      const data = await updateUser(formData);
      console.log(data);
      toast.success("Profile Updated Successfully")
      navigate("/profile")
      setIsLoading(false);

    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

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
                textAlign: "center",
              }}
            >
              {" "}
              <Box sx={{ marginTop: 1, marginLeft: 5 }}>
                {" "}
                <code>Supported Formats: jpg, jpeg, png</code>
              </Box>
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
