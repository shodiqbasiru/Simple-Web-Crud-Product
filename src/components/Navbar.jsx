import "./index.css";
import {Link} from "react-router-dom";


const Navbar = () => {
    return (
        <nav>
            <h1>Web Crud Product</h1>
            <div className="links">
                <Link to={"/"}>Home</Link>
                <Link to={"/login"}>Login</Link>
            </div>
        </nav>
    );
};

export default Navbar;