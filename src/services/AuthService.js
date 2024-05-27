import axiosInstance from "../api/axiosInstance";

const AuthService = () => {
  const login = async (payload) => {
    const { data } = await axiosInstance.post("/auth/login", payload);
    return data;
  };

  const register = async (payload) => {
    const { data } = await axiosInstance.post("/auth/register", payload);
    return data;
  }

  return {
    login,
    register,
  };
};

export default AuthService;
