import React, { createContext, useContext, useEffect, useState } from "react";
import data from "./data.json";

const GLOBAL_CONTEXT = createContext("");

export const useGlobalState = () => {
  return useContext(GLOBAL_CONTEXT);
};

export default function StateProvider(props) {
  const [products, setProducts] = useState([]);
  const [booked, setBooked] = useState({});

  const storeInBookedList = (product, from, totalDays) => {
    const bookObj = {};
    let fromDate = from.subtract(1, "day");

    for (let index = 0; index < totalDays; index++) {
      fromDate = fromDate.add(1, "day");
      let formatedDate = fromDate.format("DD/MM/YYYY");
      bookObj[formatedDate] = true;
    }

    if (booked[product.code]) {
      setBooked({
        ...booked,
        [product.code]: {
          ...booked[product.code],
          bookObj,
        },
      });
    } else {
      setBooked({ ...booked, [product.code]: bookObj });
    }
  };

  useEffect(() => {
    setProducts(data.filter((product) => product.availability));
  }, []);

  console.log(booked);
  return (
    <GLOBAL_CONTEXT.Provider value={{ booked, products, storeInBookedList }}>
      {props.children}
    </GLOBAL_CONTEXT.Provider>
  );
}
