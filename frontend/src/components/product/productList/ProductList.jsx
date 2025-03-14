import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Typography } from "@mui/material";
import SortDropdown from "../../dropdowns/SortDropdown";
import SearchDropdown from "../../dropdowns/SearchDropdown";
import Loader from "../../loader/Loader";
import CategoryDropdown from "../../dropdowns/CategoryDropdown";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import {
  CATEGORY_FILTER,
  SEARCH_FILTER,
  selectCategoryFilter,
  selectFilteredData,
  selectSearchProduct,
  selectSortFilter,
  SORT_PRODUCTS,
} from "../../../redux/features/product/FilterSlice";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteProduct,
  getProducts,
} from "../../../redux/features/product/ProductSlice";
import { Link } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables({ products, isLoading }) {
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const delProduct = async (id) => {
    await dispatch(deleteProduct(id));
    await dispatch(getProducts());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure you want to delete this product ?",
      buttons: [
        {
          label: "Delete",
          onClick: () => delProduct(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  const [searchValue, setSearchValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [sortData, setSortData] = useState("");

  const handleCategoryValue = (input) => {
    setCategoryValue(input);
  };

  const handleSortData = (input) => {
    setSortData(input);
  };

  const categoryProducts = useSelector(selectCategoryFilter);

  const searchedData = useSelector(selectSearchProduct);

  const sortedProducts = useSelector(selectSortFilter);

  const filteredData = useSelector(selectFilteredData);

  const dispatch = useDispatch();

  // Pagination Begins

  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 5;

  const lastIndex = currentPage * recordsPerPage;

  const firstIndex = lastIndex - recordsPerPage;

  const records = filteredData.slice(firstIndex, lastIndex);

  const npage = Math.ceil(filteredData.length / recordsPerPage);

  const numbers = [...Array(npage + 1).keys()].slice(1);

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changePage = (id) => {
    setCurrentPage(id);
  };

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Pagination Ends

  const productsWithId = products.map((product, index) => ({
    product_id: index + 1, // Generate product_id from 1 to n
    ...product,
  }));

  useEffect(() => {
    dispatch(SEARCH_FILTER({ searchValue, products }));

    dispatch(CATEGORY_FILTER({ categoryValue }));

    dispatch(SORT_PRODUCTS({ sortData }));
  }, [searchValue, products, dispatch, categoryValue, sortData]);

  return (
    <>
      <Box>
        <Box width={"100%"} padding={1} margin={"auto"}>
          {/* <Typography
            color={"black"}
            variant="h5"
            textAlign={"center"}
            className="loading_text"
            marginBottom={2}
          >
            Inventory Items
          </Typography> */}
        </Box>

        <Box
          component={"div"}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "90%",
            margin: "auto",
            // paddingTop: 6,
            paddingRight: 5,
            alignItems: "center",
          }}
        >
          <Box>
            <CategoryDropdown handleCategoryValue={handleCategoryValue} />
          </Box>

          <Box>
            <SearchDropdown
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Box>
          <Box>
            <SortDropdown handleSortData={handleSortData} />
          </Box>
        </Box>

        {isLoading ? (
          <Box className="tableLoader">
            {" "}
            <Loader />{" "}
          </Box>
        ) : (
          <TableContainer
            component={Paper}
            sx={{ maxWidth: "98%", marginTop: 2 }}
          >
            {!isLoading && records.length == 0 ? (
              <p>No Product found, please add a product... </p>
            ) : (
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">S/N</StyledTableCell>
                    <StyledTableCell align="center">
                      Product Name
                    </StyledTableCell>
                    <StyledTableCell align="center">Category</StyledTableCell>
                    <StyledTableCell align="center">Price</StyledTableCell>
                    <StyledTableCell align="center">Quantity</StyledTableCell>
                    <StyledTableCell align="center">Value</StyledTableCell>
                    <StyledTableCell align="center">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {records.length &&
                    records.map((product, index) => (
                      <StyledTableRow key={product._id}>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          align="center"
                        >
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {shortenText(product.name, 16)}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {product.category}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {product.price}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {product.quantity}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {product.price * product.quantity}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-around",
                            }}
                          >
                            <Link to={`/product-detail/${product._id}`}>
                              <GrView size={25} color="black" />
                            </Link>

                            <Link to={`/edit-product/${product._id}`}>
                              {" "}
                              <FaEdit size={25} color="black" />
                            </Link>

                            <Box sx={{ cursor: "pointer" }}>
                              <RiDeleteBin2Fill
                                size={25}
                                color="black"
                                onClick={() => confirmDelete(product._id)}
                              />
                            </Box>
                          </Box>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        )}
      </Box>

      <nav>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 3,
            gap: 4,
          }}
        >
          <Button
            disabled={currentPage === 1}
            sx={{
              border: 1,
              color: "black",
              ":hover": {
                bgcolor: "black",
                color: "white",
              },
            }}
            onClick={prevPage}
          >
            Prev
          </Button>

          {numbers.map((num, index) => (
            <Button
              sx={{
                border: 1,
                bgcolor: currentPage == num ? "black" : "white",
                color: currentPage == num ? "white" : "black",
                ":hover": {
                  bgcolor: "black",
                  color: "white",
                },
              }}
              key={index}
              onClick={() => changePage(num)}
            >
              {" "}
              {num}
            </Button>
          ))}

          <Button
            disabled={currentPage >= npage || filteredData.length < 6}
            sx={{
              border: 1,
              color: "black",
              ":hover": {
                bgcolor: "black",
                color: "white",
              },
            }}
            onClick={nextPage}
          >
            Next
          </Button>
        </Box>
      </nav>
    </>
  );
}
