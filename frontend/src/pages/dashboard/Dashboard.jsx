import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { selectIsLoggedIn } from "../../redux/features/auth/AuthSlice";
import { getProducts } from "../../redux/features/product/ProductSlice"
import ProductList from "../../components/product/productList/ProductList"

const Dashboard = () => {


const dispatch = useDispatch()

const isLoggedIn = useSelector(selectIsLoggedIn)

const {products, isLoading, isError, message} = useSelector((state) => state.product)


useEffect(() => {
  if(isLoggedIn){
    dispatch(getProducts())
  }

  if(isError){
    console.log(message);
    
  }
}, [isLoggedIn, isError, message, dispatch])


  return (
    <>
      <Box component={"div"}>
        <Typography component={"h2"} variant="h2">
          Dashboard
        </Typography>
        <ProductList products={products} isLoading={isLoading}/> 
      </Box>
    </>
  );
};

export default Dashboard;
