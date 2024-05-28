import { useContext } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext.jsx";

const Navbar = () => {
  const {isLogin,setIsLogin} = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
  }

  return (
    <nav>
      <h1>Web Crud Product</h1>
      <div className="links">
        <Link to={"/"}>Home</Link>
        {isLogin ? <Link onClick={handleLogout}>Logout</Link> : <Link to={"/login"}>Login</Link>}
      </div>
    </nav>
  );
};

export default Navbar;
