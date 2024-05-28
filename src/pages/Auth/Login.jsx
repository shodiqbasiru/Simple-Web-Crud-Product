import React from "react";
import { useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import AuthService from "../../services/AuthService.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import IconLogin from "../../assets/login.svg";
import * as z   from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  emailOrPhone: z.string().min(1, { message: "Email or Phone Number is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const Login = () => {
  const { register, handleSubmit,formState:{errors}} = useForm({ mode: "onChange",resolver: zodResolver(schema) });
  const authService = useMemo(() => AuthService(), []);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await authService.login(data);
      if (response.statusCode === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      if (localStorage.getItem("token")) {
        navigate("/");
      }
    };
    checkToken();
  });

  return (
    <div className="auth-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-logo">
          <Link to="/">
            <h1>Simple CRUD Product</h1>
          </Link>
          <img src={IconLogin} alt="" />
        </div>
        <div className="form-input">
          <h1>Login</h1>
          <div className="input-group">
            <label htmlFor="emailOrPhone">Email / Phone Number</label>
            <input
              {...register("emailOrPhone")}
              type="text"
              id="emailOrPassword"
              placeholder="Enter your email or phone number"
            />
            {errors.emailOrPhone && <p className="error">{errors.emailOrPhone.message}</p>}
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              {...register("password")}
              type="password"
              id="password"
              placeholder="Enter your password"
            />
            {errors.password && <p className="error">{errors.password.message}</p>}
          </div>
          <button type="submit">Login</button>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
