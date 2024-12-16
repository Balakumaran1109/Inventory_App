import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "@mui/material/Card";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../../../redux/features/product/ProductSlice";

const ProductForm = ({
  product,
  productImage,
  imagePreview,
  handleInputChange,
  handleImageChange,
  saveProduct,
}) => {
  const isLoading = useSelector(selectIsLoading);

  return (
    <>
      <Box sx={{ marginBottom: 5, display: "flex", justifyContent: "center" }}>
        <Card sx={{ width: "95%", padding: 1, border: 1, margin: 2 }}>
          <Box component="form" onSubmit={saveProduct}>
            <Box padding={1} marginTop={1}>
              <Typography
                variant="h1"
                textAlign={"center"}
                className="card_title_style"
              >
                Please fill the below details to create a new product
              </Typography>
            </Box>
            <Card sx={{ margin: 2, padding: 2, border: 1 }}>
              <label className="image_text">Product Image :</label>
              <code>Supported Formats: jpg, jpeg, png</code>
              <input
                className="image_input"
                type="file"
                name="image"
                onChange={(e) => handleImageChange(e)}
              />
              {imagePreview != null ? (
                <div className="image-preview">
                  <img src={imagePreview} alt="product"></img>
                </div>
              ) : (
                <p className="forgot_text">No image set for this product</p>
              )}
            </Card>
            <Card sx={{ margin: 2, padding: 2, border: 1 }}>
              <label className="forgot_text">Product Name :</label>
              <TextField
                margin="normal"
                required
                fullWidth
                placeholder="Product Name"
                autoFocus
                name="name"
                value={product?.name}
                onChange={handleInputChange}
              />{" "}
              <br></br>
              <br></br>
              <label className="forgot_text">Product Category :</label>
              <TextField
                margin="normal"
                required
                fullWidth
                placeholder="Product Category"
                autoFocus
                name="category"
                value={product?.category}
                onChange={handleInputChange}
              />
              <br></br>
              <br></br>
              <label className="forgot_text">Product Price :</label>
              <TextField
                margin="normal"
                required
                fullWidth
                placeholder="Product Price"
                autoFocus
                name="price"
                value={product?.price}
                onChange={handleInputChange}
              />
              <br></br>
              <br></br>
              <label className="forgot_text">Product Quantity :</label>
              <TextField
                margin="normal"
                required
                fullWidth
                placeholder="Product Quantity"
                autoFocus
                name="quantity"
                value={product?.quantity}
                onChange={handleInputChange}
              />{" "}
              <br></br>
              <br></br>
              <label className="forgot_text">Product Description :</label>
              <TextField
                margin="normal"
                multiline
                rows={4}
                required
                fullWidth
                placeholder="Product Description"
                autoFocus
                name="description"
                value={product?.description}
                onChange={handleInputChange}
              />{" "}
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
                    Saving...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: "black" }}
                  >
                    Save Product
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

export default ProductForm;
