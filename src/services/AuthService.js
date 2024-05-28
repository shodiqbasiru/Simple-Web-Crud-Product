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

  const validate = async () => {
    const { data } = await axiosInstance.get("/auth/validate-token");
    return data.statusCode;
  }

  return {
    login,
    register,
    validate
  };
};

export default AuthService;
