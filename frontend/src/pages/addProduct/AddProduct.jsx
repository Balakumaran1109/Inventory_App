import React from 'react'

const initialState = {
    name: "",
    category: "",
    quantity: ""
}
const AddProduct = () => {

const [products, setProducts] = useState(initialState)
const [productImage, setProductImage] = useState("")
const [imagePreview, setImagePreview] = useState(null)
const [description, setDescription] = useState("")

const isLoading = useSelector(select)

  return (
    <div>AddProduct</div>
  )
}

export default AddProduct