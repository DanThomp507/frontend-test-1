import React, { useState, useEffect } from "react";

import { fetchProductDetail } from "../utils/api";

import "../styles/ProductDetail.css";

const ProductDetail = ({ productId }) => {
  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    if (!productId) return;

    fetchProductDetail(productId).then((productInfo) =>
      setProductInfo(productInfo)
    );
  }, [productId]);

  const truncate = input => (input.length > 45 ? `${input.substring(0, 45)}...` : input);

  const renderProductInfo = () => {
    return (
      <div className="detail-container">
        <div className="row">
          <img src={productInfo.image} alt={productInfo.image} className="product-image" />
        </div>
        <div className="row">
          <div className="row-title">{productInfo.title}</div>
        </div>
        <div className="row">
          <div className="row-body">{truncate(productInfo.description)}</div>
        </div>
        <div className="row">
          <div className="row-title">{`£${productInfo.price}`}</div>
        </div>
      </div>
    );
  };

  return productInfo && renderProductInfo();
}

export default ProductDetail;
