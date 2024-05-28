import { useContext, useEffect, useMemo, useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext.jsx";
import Popup from "../../pages/Auth/components/Popup.jsx";
import AuthService from "../../services/AuthService.js";

const Navbar = () => {
  const { isLogin, setIsLogin } = useContext(AuthContext);

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [name, setName] = useState("");

  const authService = useMemo(() => AuthService(), []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setIsValid(true);
    setPopupMessage("Logout successfully");
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      setIsLogin(false);
      setName("");
    }, 1000);
  };

  useEffect(() => {
    const checkEmail = async () => {
      const emailStorage = localStorage.getItem("email");
      const response = await authService.findByEmail(emailStorage);
      setName(response.data.name);
    };
    checkEmail();
  }, [authService]);

  return (
    <nav>
      {showPopup && (
        <Popup
          message={popupMessage}
          handleClose={() => setShowPopup(false)}
          isValid={isValid}
        />
      )}
      <h1>Web Crud Product</h1>
      {name !== "" && <h2>Welcome, {name}</h2>}
      <div className="links">
        <Link to={"/"}>Home</Link>
        {isLogin ? (
          <Link onClick={handleLogout}>Logout</Link>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
