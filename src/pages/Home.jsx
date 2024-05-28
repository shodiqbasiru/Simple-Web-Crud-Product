import Navbar from "../components/Navbar.jsx";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import Footer from "../components/Footer/Footer.jsx";

const Home = () => {
  return (
    <AuthProvider>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
      <Footer/>
    </AuthProvider>
  );
};

export default Home;
