import React, { useEffect, useMemo, useState } from "react";
import "./index.css";
import ProductService from "../../../services/ProductService.js";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const productService = useMemo(() => ProductService(), []);
  const baseImgUrl = "http://localhost:8080";
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await productService.getAll();
      setProducts(data);
    };

    setIsLogin(!!localStorage.getItem("token"));

    fetchData();
  }, [productService]);

  const handleAddProduct = async () => {
    navigate("/add");
  };

  return (
    <>
      {isLogin && <button onClick={handleAddProduct}>Add Product</button>}
      <div className="products">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <div className="card-header">
              {product.images.length > 0 && (
                <img
                  src={baseImgUrl + product.images[0].url}
                  alt={product.name}
                  key={product.images[0].url}
                />
              )}
            </div>

            <div className="card-body">
              <h3>{product.productName}</h3>
              <p>Rp {product.price}</p>
            </div>
            <div className="card-footer">
              {isLogin && (
                <>
                  <button>Edit</button>
                  <button>View</button>
                  <button>Delete</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductList;
