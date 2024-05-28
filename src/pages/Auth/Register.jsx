import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import AuthService from "../../services/AuthService.js";
import { useNavigate } from "react-router-dom";
import IconRegister from "../../assets/register.svg";
import * as z  from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email" }),
  phoneNumber: z.string().min(1, { message: "Phone Number is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});
const Register = () => {
  const { register, handleSubmit,formState:{errors} } = useForm({ mode: "onChange",resolver:zodResolver(schema) });
  const authService = useMemo(() => AuthService(), []);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await authService.register(data);
      console.log(response);
      if (response.statusCode === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-logo">
          <Link to="/">
            <h1>Simple CRUD Product</h1>
          </Link>
          <img src={IconRegister} alt="" />
        </div>
        <div className="form-input">
          <h1>Register</h1>
          <div className="grid">
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input {...register("name")} type="text" id="name" placeholder="Enter your name" />
              {errors.name && <p className="error">{errors.name.message}</p>}

            </div>
            <div className="input-group">
              <label htmlFor="email">Email </label>
              <input {...register("email")} type="text" id="email" placeholder="Enter your email" />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input {...register("phoneNumber")} type="text" id="phoneNumber" placeholder="Enter your phone number" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input {...register("password")} type="password" id="password" placeholder="Enter your password" />
          </div>
          <button type="submit">Register</button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
