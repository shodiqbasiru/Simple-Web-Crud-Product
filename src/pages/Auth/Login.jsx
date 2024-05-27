import React from "react";
import { useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import AuthService from "../../services/AuthService.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm({ mode: "onChange" });
  const authService = useMemo(() => AuthService(), []);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await authService.login(data);
      if (response.statusCode === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("storeId", response.data.storeId);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input {...register("username")} type="text" id="username" />
        </div>
        <div className="input-group">
          <label htmlFor="price">Password</label>
          <input {...register("password")} type="password" id="password" />
        </div>
        <button type="submit">Login</button>
        <p>
          {" "}
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
