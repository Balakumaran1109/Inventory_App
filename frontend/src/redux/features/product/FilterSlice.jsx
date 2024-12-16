import { createSlice } from "@reduxjs/toolkit";
import { original } from "immer";

const initialState = {
  categoryFilter: [],
  searchFilter: [],
  sortFilter: [],
  filteredData: [],
};

const FilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    SEARCH_FILTER(state, action) {
      const { searchValue, products } = action.payload;

      const matchingProducts = products?.filter((product) => {
        const productName = product.name;
        return productName.includes(searchValue);
      });

      matchingProducts.length !== 0
        ? (state.filteredData = matchingProducts)
        : (state.filteredData = products);
    },

    CATEGORY_FILTER(state, action) {
      const { categoryValue } = action.payload;

      const previousData = state.filteredData;

      const matchingProducts = previousData?.filter((product) => {
        const productCategory = product.category;
        return productCategory.includes(categoryValue);
      });

      matchingProducts.length !== 0
        ? (state.filteredData = matchingProducts)
        : (state.filteredData = previousData);
    },

    SORT_PRODUCTS(state, action) {
      const { sortData } = action.payload;
      function checkProduct() {
        switch (sortData) {
          case "LtoH":
            {
              let lowerPrice = state.filteredData.sort((a, b) => {
                return a.price - b.price;
              });
              lowerPrice.length !== 0
                ? (state.filteredData = lowerPrice)
                : state.filteredData;
            }
            break;

          case "HtoL":
            {
              let higherPrice = state.filteredData.sort((a, b) => {
                return b.price - a.price;
              });
              higherPrice.length !== 0
                ? (state.filteredData = higherPrice)
                : state.filteredData;
            }
            break;

          case "OS":
            {
              let outOfStock = state.filteredData.filter((product) => {
                return product.quantity == 0;
              });

              outOfStock.length !== 0
                ? (state.filteredData = outOfStock)
                : state.filteredData;
            }
            break;

          case "LtoG":
            {
              let lowerQuantity = state.filteredData.sort((a, b) => {
                return a.quantity - b.quantity;
              });
              lowerQuantity.length !== 0
                ? (state.filteredData = lowerQuantity)
                : state.filteredData;
            }
            break;

          case "GtoL":
            {
              let greaterValue = state.filteredData.sort((a, b) => {
                return b.quantity - a.quantity;
              });

              greaterValue.length !== 0
                ? (state.filteredData = greaterValue)
                : state.filteredData;
            }
            break;

          default:
            console.log(state.categoryFilter);
            break;
        }
      }

      checkProduct();
    },
  },
});

export const { SEARCH_FILTER, CATEGORY_FILTER, SORT_PRODUCTS } =
  FilterSlice.actions;

export const selectCategoryFilter = (state) => state.filter.categoryFilter;

export const selectSearchProduct = (state) => state.filter.searchFilter;

export const selectSortFilter = (state) => state.filter.sortFilter;

export const selectFilteredData = (state) => state.filter.filteredData;

export default FilterSlice.reducer;
