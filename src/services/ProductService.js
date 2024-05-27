import axiosInstance from "../api/axiosInstance";

const ProductService = () => {
  const getAll = async () => {
    const { data } = await axiosInstance.get("/products");
    return data;
  };

  return {
    getAll,
  }
};

export default ProductService;