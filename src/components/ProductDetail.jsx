import React, { useState, useEffect } from "react";
import { fetchProductDetail } from "../utils/api";
import { truncate } from "../utils/text-utils";
import "../styles/ProductDetail.css";

const ProductDetail = ({ productId }) => {
  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    const getProductDetail = async () => {
      if (!productId) return;
      try {
        const productInfo = await fetchProductDetail(productId);
        setProductInfo(productInfo);
      } catch (e) {
        console.error(e);
      }
    }
    getProductDetail();
  }, [productId]);


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
