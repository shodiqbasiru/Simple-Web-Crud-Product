import axiosInstance from "../api/axiosInstance";

const ProductService = () => {
  const getAll = async () => {
    const { data } = await axiosInstance.get("/products");
    return data;
  };

  const getById = async (id) => {
    const { data } = await axiosInstance.get(`/products/${id}`);
    return data;
  };

  const create = async (payload) => {
    const { data } = await axiosInstance.post("/products", payload);
    return data;
  };

  const update = async (payload) => {
    const { data } = await axiosInstance.put(`/products`, payload);
    return data;
  };

  const remove = async (id) => {
    const { data } = await axiosInstance.delete(`/products/${id}`);
    return data;
  };

  return {
    getAll,
    getById,
    create,
    update,
    remove,
  };
};

export default ProductService;
