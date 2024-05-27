import {createBrowserRouter} from "react-router-dom";
import Home from "../pages/Home.jsx";
import  ProductForm  from "../components/Product/ProductForm/ProductForm.jsx";
import ProductList from "../components/Product/ProductList/ProductList.jsx";
import Login from "../pages/Auth/Login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <ProductList />,
      },
      {
        path: "add",
        element: <ProductForm />,
      },
      {
        path: "edit/:id",
        element: <ProductForm />,
      },
    
    ]
  },

  {
    path: "/login",
    element: <Login />,
  }
   
]);

export default router;
