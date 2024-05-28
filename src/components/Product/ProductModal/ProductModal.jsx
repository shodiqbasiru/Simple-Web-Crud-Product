import React from 'react';
import './index.css';

const ProductModal = ({ isOpen, onClose, product }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Product Detail</h3>
                </div>
                <img src={product.image.url} alt={product.productName} />
                <h2>{product.productName}</h2>

                <p>SKU Code: {product.skuCode}</p>
                <p>Price: {product.price}</p>
                <p>Stock: {product.qty}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default ProductModal;