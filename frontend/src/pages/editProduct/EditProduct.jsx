import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProduct,
  getProducts,
  selectIsLoading,
  selectProduct,
  updateProduct,
} from "../../redux/features/product/ProductSlice";
import ProductForm from "../../components/product/productForm/ProductForm";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(selectIsLoading);
  const productEdit = useSelector(selectProduct);

  const [product, setProduct] = useState(productEdit);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    setProduct(productEdit);

    setImagePreview(
      productEdit && productEdit.image ? `${productEdit.image.filePath}` : null
    );
  }, [productEdit]);


  const saveProduct = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", product?.name);
      formData.append("category", product?.category);
      formData.append("quantity", product?.quantity);
      formData.append("price", product?.price);
      formData.append("description", product?.description);
      if(productImage){

          formData.append("image", productImage);
      }
  
  
      await dispatch(updateProduct({id, formData}));
      await dispatch(getProducts());
  
      navigate("/dashboard");
    };

  return( <div>
  <ProductForm
    product={product}
    productImage={productImage}
    imagePreview={imagePreview}
    handleInputChange={handleInputChange}
    handleImageChange={handleImageChange}
    saveProduct={saveProduct}
    title = "Update Product"
  />
</div>)
};

export default EditProduct;
