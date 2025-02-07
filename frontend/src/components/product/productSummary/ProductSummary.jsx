import React, { useEffect } from "react";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { BsCart } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { BsCartX } from "react-icons/bs";
import { Box, Typography } from "@mui/material";
import InfoBox from "../../infoBox/infoBox";
import { BsCartCheck } from "react-icons/bs";
import {
  CALC_CATEGORY,
  CALC_OUTOFSTOCK,
  CALC_STORE_VALUE,
  selectCategory,
  selectOutOfStock,
  selectTotalStoreValue,
} from "../../../redux/features/product/ProductSlice";
import { useDispatch, useSelector } from "react-redux";

const rupeeIcon = <LiaRupeeSignSolid size={40} color="#fff" />;
const cartIcon = <BsCartCheck size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;
const outOfStockIcon = <BsCartX size={40} color="#fff" />;


// For formatting rupees
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ProductSummary = ({ products }) => {
  const dispatch = useDispatch();

  const totalStoreValue = useSelector(selectTotalStoreValue);

  const outOfStock = useSelector(selectOutOfStock);
  
  const category = useSelector(selectCategory);


  
  useEffect(() => {
    dispatch(CALC_STORE_VALUE(products));
    dispatch(CALC_OUTOFSTOCK(products));
    dispatch(CALC_CATEGORY(products));
  }, [dispatch, products]);

  return (
    <Box component={"div"} sx={{ width: "100%" }}>
      {/* <Typography sx={{textAlign: "center"}} variant="h5">Inventory Stats</Typography> */}
      <Box
        component={"div"}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: 5,
          marginBottom: 5,
        }}
      >
        <InfoBox
          icon={cartIcon}
          title={"Total Products"}
          count={products.length}
          bgColor={"#1b5e20"}
        />

        <InfoBox
          icon={rupeeIcon}
          title={"Total Store Value"}
          count={`${formatNumbers(totalStoreValue)}`}
          bgColor={"#0d47a1"}
        />

        <InfoBox
          icon={outOfStockIcon}
          title={"Out of Stock"}
          count={outOfStock}
          bgColor={"#d50000"}
        />

        <InfoBox
          icon={categoryIcon}
          title={"All Categories"}
          count={category}
          bgColor={"black"}
        />
      </Box>
    </Box>
  );
};

export default ProductSummary;
