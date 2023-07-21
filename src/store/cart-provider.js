import React, { useEffect, useState } from "react";
import axios from "axios";
import CartContext from "./cart-context";

const CartProvider = (props) => {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [dummy, setDummy] = useState(0);

  const baseUrl = "https://crudcrud.com/api/d2cea1771c5340cf86c7c31cb3fde3a5/";

  const fetchMedicine = async () => {
    try {
      const response = await axios.get(`${baseUrl}medicine`);

      if (response.status === 200) {
        setItems(response.data);
        return response;
      } else {
        throw new Error("Somthing went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`${baseUrl}cart`);

      if (response.status === 200) {
        setCartItems(response.data);
        let totalAmount = response.data.reduce((sumOfPrice, cur) => {
          sumOfPrice = sumOfPrice + Number(cur.price);
          return sumOfPrice;
        }, 0);

        setTotalAmount(totalAmount);
        return response;
      } else {
        throw new Error("Somthing went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMedicine();
  }, [dummy]);

  useEffect(() => {
    fetchCartItems();
  }, [dummy]);

  const addItems = async (currItem) => {
    try {
      const medicineStock = await fetchMedicine();

      let updatedPrice, updatedQuantity, existingMedicineId;
      medicineStock.data.findIndex((item) => {
        if (item.name === currItem.mdName) {
          updatedQuantity = Number(item.quantity) + Number(currItem.quantity);
          updatedPrice = Number(currItem.price);
          existingMedicineId = item._id;
        }
      });
      console.log("esist", updatedPrice);

      if (existingMedicineId) {
        console.log("esist", updatedPrice);
        try {
          const updatedTotalMedicine = await axios.put(
            `${baseUrl}medicine/${existingMedicineId}`,
            {
              name: currItem.mdName,
              description: currItem.description,
              price: updatedPrice,
              quantity: updatedQuantity,
            }
          );

          if (updatedTotalMedicine.status === 200) {
            alert("Added successfully!");
          } else {
            throw new Error("Something went wrong!");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const response = await axios.post(`${baseUrl}medicine`, {
            name: currItem.mdName,
            description: currItem.description,
            price: currItem.price,
            quantity: currItem.quantity,
          });

          if (response.status === 201) {
            alert("Added successfully!");
          } else {
            throw new Error("Something went wrong!");
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }

    setDummy(dummy + 1);
  };

  const addToCart = async (currItem) => {
    try {
      const response = await fetchCartItems();

      let updatedPrice, updatedQuantity, existingMedicineId;
      response.data.findIndex((item) => {
        if (item.name === currItem.name) {
          updatedQuantity = item.quantity + 1;
          updatedPrice = Number(item.price) + Number(currItem.price);
          existingMedicineId = item._id;
        }
      });

      if (existingMedicineId) {
        console.log("aaaya", existingMedicineId);
        try {
          const response = await axios.put(
            `${baseUrl}cart/${existingMedicineId}`,
            {
              name: currItem.name,
              description: currItem.description,
              price: updatedPrice,
              quantity: updatedQuantity,
            }
          );

          const updatedTotalMedicine = await axios.put(
            `${baseUrl}medicine/${currItem._id}`,
            {
              name: currItem.name,
              description: currItem.description,
              price: currItem.price,
              quantity: Number(currItem.quantity) - 1,
            }
          );

          if (response.status === 200) {
            alert("Added successfully!");
          } else {
            throw new Error("Something went wrong!");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const response = await axios.post(`${baseUrl}cart`, {
            name: currItem.name,
            description: currItem.description,
            price: currItem.price,
            quantity: 1,
          });

          if (response.status === 201) {
            alert("Added successfully!");
          } else {
            throw new Error("Something went wrong!");
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }

    setDummy(dummy - 1);
  };

  const cartContext = React.createContext({
    items: items,
    cartItems: cartItems,
    totalAmount: totalAmount,
    addItems: addItems,
    addToCart: addToCart,
  });

  console.log(totalAmount);
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
