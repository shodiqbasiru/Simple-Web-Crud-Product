import React, { useState } from "react";
import "./index.css";

const ProductForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic here to handle the form submission
    // For example, you can make an API call to add the product to the database
    console.log("Name:", name);
    console.log("Price:", price);
  };

  return (
    <div className="product-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={handlePriceChange}
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
