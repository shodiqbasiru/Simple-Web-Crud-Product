import Navbar from "../components/Navbar.jsx";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";

const Home = () => {
  return (
    <AuthProvider>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </AuthProvider>
  );
};

export default Home;
