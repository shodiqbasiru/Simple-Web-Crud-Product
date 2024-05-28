import React, { useEffect, useMemo, useState } from "react";
import "./index.css";
import ProductService from "../../../services/ProductService.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaEdit, FaPlus, FaSearch } from "react-icons/fa";
import { FaEye, FaTrash } from "react-icons/fa6";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext.jsx";
import ProductModal from "../ProductModal/ProductModal.jsx";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const productService = useMemo(() => ProductService(), []);
  const baseImgUrl = "http://localhost:8080";
  const { isLogin, setIsLogin } = useContext(AuthContext);

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
  
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatRupiah = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    })
      .format(price)
      .slice(0, -3);
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenDeleteModal = (id) => {
    setProductToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteProduct = async (id) => {
    await productService.remove(id);
    const { data } = await productService.getAll();
    setProducts(data);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="list-component">
      <h1>Product List</h1>
      <div className="header-list">
        {isLogin && (
          <>
            <button onClick={handleAddProduct} className="add-product">
              <FaPlus />
              <span>Add Product</span>
            </button>
            <div className="search-input">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <FaSearch className="search-icon" />
            </div>
          </>
        )}
      </div>
      <div className="products">
        {filteredProducts.length > 0 &&
          filteredProducts.map((product) => (
            <div className="card" key={product.id}>
              <div className="card-header">
                <img
                  src={baseImgUrl + product.image.url}
                  alt={product.name}
                  key={product.image.url}
                />
              </div>
              <div className="card-body">
                <h3>{product.productName}</h3>
                <small>{product.skuCode}</small>
                <p className="price"> {formatRupiah(product.price)}</p>
              </div>
              <div className="card-footer">
                {isLogin && (
                  <div className="action">
                    <Link to={`/edit/${product.id}`} className="action-edit">
                      <FaEdit />
                    </Link>
                    <Link onClick={() => handleOpenModal(product)} className="action-detail">
                      <FaEye/>
                    </Link>
                    <Link onClick={() => handleOpenDeleteModal(product.id)} className="action-delete">
                      <FaTrash/>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
      {filteredProducts.length === 0 && (
        <div className="empty-product">
          <h3>There are no product found,</h3>
          <p>Let's add product</p>
        </div>
      )}
      <ProductModal isOpen={isModalOpen} onClose={handleCloseModal} product={selectedProduct} />
      {isDeleteModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Confirm Delete</h2>
              <p>Are you sure you want to delete this product?</p>
              <button onClick={() => handleDeleteProduct(productToDelete)}>Yes</button>
              <button onClick={handleCloseDeleteModal} className="cancel">No</button>
            </div>
          </div>
      )}
    </div>
  );
};

export default ProductList;
