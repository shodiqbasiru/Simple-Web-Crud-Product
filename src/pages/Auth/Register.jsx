import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import AuthService from "../../services/AuthService.js";
import { useNavigate } from "react-router-dom";
import IconRegister from "../../assets/register.svg";

const Register = () => {
  const { register, handleSubmit } = useForm({ mode: "onChange" });
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
              <input {...register("name")} type="text" id="name" />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email </label>
              <input {...register("email")} type="text" id="email" />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input {...register("phoneNumber")} type="text" id="phoneNumber" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input {...register("password")} type="password" id="password" />
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
