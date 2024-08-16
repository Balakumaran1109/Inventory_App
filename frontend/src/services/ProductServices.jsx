import axios from "axios";

// Create New Product
const createProduct = async (formData) => {
  const response = await axios.post("api/products", formData);

  return response.data;
};

const productService = {
  createProduct,
};

export default productService;
