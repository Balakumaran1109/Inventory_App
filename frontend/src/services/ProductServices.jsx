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


const productService = {
  createProduct,
  getProducts,
  deleteProduct
};

export default productService;
