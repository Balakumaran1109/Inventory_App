import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../../../redux/features/product/ProductSlice";
import { selectIsLoggedIn } from "../../../redux/features/auth/AuthSlice";
import { Box, Card, Typography } from "@mui/material";
import Loader from "../../loader/Loader";
import SessionExpiredLoader from "../../loader/SessionExpiredLoader";

const ProductDetail = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { id } = useParams();

  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  const content_1 = "Session Expired...";
  const content_2 = "Please Login to Continue";

  const stockCheck = (quantity) => {
    if (quantity < 1) {
      return (
        <Box component={"span"} sx={{ color: "red" }}>
          Out of Stock
        </Box>
      );
    }
    return (
      <Box component={"span"} sx={{ color: "green" }}>
        In Stock
      </Box>
    );
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getProduct(id));
      console.log(product);
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, message, dispatch]);

  return (
    <>
      {(!isLoggedIn && (
        <SessionExpiredLoader content_1={content_1} content_2={content_2} />
      )) || (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <Box width={"100%"} padding={1} margin={"auto"}>
              <Typography sx={{ textAlign: "center" }} variant="h5">
                Product Details
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
                    {product?.image ? (
                      <img
                        src={product.image.filePath}
                        alt={product.image.fileName}
                        className="product_img"
                      ></img>
                    ) : (
                      <p>No image set for this Product</p>
                    )}
                  </Box>
                  <Typography variant="h5" sx={{ marginBottom: 3 }}>
                    Product Availability: {stockCheck(product?.quantity)}
                  </Typography>
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
                  className="products_details"
                >
                  <Typography variant="h6">
                    <b>Name :</b> &nbsp;
                    <Box component={"span"} sx={{ color: "green" }}>
                      {product?.name}
                    </Box>
                  </Typography>
                  <br />

                  <Typography variant="p">
                    <b>Category :</b> &nbsp;{product?.category}
                  </Typography>
                  <br />
                  <Typography variant="p">
                    <b>Price :</b> &nbsp;{product?.price}
                  </Typography>
                  <br />
                  <Typography variant="p">
                    <b>Quantity in Stock :</b> &nbsp;{product?.quantity}
                  </Typography>
                  <br />
                  <Typography variant="p">
                    <b>Total Value in Stock :</b> &nbsp;
                    {product?.price * product?.quantity}
                  </Typography>
                  <br />
                  <Typography variant="p">
                    <b>Description :</b> &nbsp;
                    {product?.description}
                  </Typography>
                  <br />
                  <Typography variant="p">
                    <b>SKU :</b> &nbsp;{product?.sku}
                  </Typography>
                  <br />
                  <code>
                    Product Created: &nbsp;
                    {product?.createdAt.toString().split("T")[0]} |{" "}
                    {product?.createdAt.toString().split("T")[1].split(".")[0]}
                  </code>

                  <code>
                    Last Updated At: &nbsp;
                    {product?.updatedAt.toString().split("T")[0]} |{" "}
                    {product?.updatedAt.toString().split("T")[1].split(".")[0]}
                  </code>
                </Card>
              </Card>
            </Box>
          )}
        </>
      )}
    </>
  );
};
export default ProductDetail;
