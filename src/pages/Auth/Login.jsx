import React, { useEffect, useMemo, useState } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthService from "../../services/AuthService.js";
import IconLogin from "../../assets/login.svg";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Popup from "./components/Popup.jsx";

const schema = z.object({
  emailOrPhone: z
    .string()
    .min(1, { message: "Email or Phone Number is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: zodResolver(schema) });
  const authService = useMemo(() => AuthService(), []);
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isValid, setIsValid] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await authService.login(data);
      if (response.statusCode === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", response.data.email);
        setIsValid(true);
        setPopupMessage("Login successfully");
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 ||
          error.response.data.message === "Bad credentials")
      ) {
        setIsValid(false);
        setPopupMessage("Email or password is incorrect");
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
      } else {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      if (localStorage.getItem("token")) {
        setIsValid(true);
        setPopupMessage("Login successfully");
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          navigate("/");
        }, 1000);
      }
    };
    checkToken();
  }, [navigate]);

  return (
    <div className="auth-form">
      {showPopup && (
        <Popup
          message={popupMessage}
          handleClose={() => setShowPopup(false)}
          isValid={isValid}
        />
      )}
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
            {errors.emailOrPhone && (
              <p className="error">{errors.emailOrPhone.message}</p>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              {...register("password")}
              type="password"
              id="password"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
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
