import axios from "axios";

// Create New Product
const createProduct = async (formData) => {
  const response = await axios.post("api/products", formData);

  return response.data;
};

// Get All Products
const getProducts = async () => {
  const response = await axios.get("api/products");

  return response.data;
};

const productService = {
  createProduct,
  getProducts
};

export default productService;
