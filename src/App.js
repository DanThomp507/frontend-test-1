import React, { useState } from "react";

import "./App.css";

import Autocomplete from "./components/Autocomplete";
import ProductDetail from "./components/ProductDetail";

const App = () => {
  const [productId, setProductId] = useState("");

  const getProductId = id => {
    setProductId(id);
  };

  return (
    <div className="App">
      <Autocomplete getProductId={getProductId} />
      <ProductDetail productId={productId} />
    </div>
  );
}

export default App;
