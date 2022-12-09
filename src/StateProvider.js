import React, { createContext, useContext, useEffect, useState } from "react";
import data from "./data.json";

const STATE_CONTEXT = createContext("");

export const useGlobalState = () => {
  return useContext(STATE_CONTEXT);
};

export default function StateProvider(props) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(data.filter((product) => product.availability));
  }, []);
  console.log(products);
  return (
    <STATE_CONTEXT.Provider value={products}>
      {props.children}
    </STATE_CONTEXT.Provider>
  );
}
