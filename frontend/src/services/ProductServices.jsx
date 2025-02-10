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


// Delete a Product
const deleteProduct = async (id) => {
  const response = await axios.delete(`api/products/${id}`);

  return response.data;
};


// Get a Product
const getProduct = async (id) => {
  const response = await axios.get(`api/products/${id}`);

  return response.data;
};

// Update a Product
const updateProduct = async (id, formData) => {
  const response = await axios.patch(`api/products/${id}`, formData);

  return response.data;
};

const productService = {
  createProduct,
  getProducts,
  deleteProduct,
  getProduct,
  updateProduct
};

export default productService;
