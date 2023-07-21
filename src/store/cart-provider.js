import React, { useEffect, useState } from "react";
import axios from "axios";
import CartContext from "./cart-context";

const CartProvider = (props) => {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [dummy, setDummy] = useState(0);

  const baseUrl =
    "https://crudcrud.com/api/ceed74a1b4454ed89a7a7cfa49a6646d/";

  const fetchMedicine = async () => {
    try {
      const response = await axios.get(`${baseUrl}medicine`);

      if (response.status === 200) {
        setItems(response.data);
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
  },[dummy])

  useEffect(() => {
    fetchCartItems();
  },[dummy])

  const addItems = async (item) => {
    try {
      const response = await axios.post(`${baseUrl}medicine`, {
        name: item.mdName,
        description: item.description,
        price: item.price,
        quantity: item.quantity,
      });

      if (response.status === 201) {
        alert("Added successfully!");
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }

    setDummy(dummy + 1);
  };

  const addToCart = async(currItem) => {
    
    try {

      const response = await fetchCartItems();

      let updatedPrice, updatedQuantity, existingMedicineId;
      response.data.findIndex((item) => {
        console.log(item._id +"=== "+currItem._id)
        if(item.name === currItem.name){
          updatedQuantity = item.quantity + 1;
          updatedPrice = Number(item.price) + Number(currItem.price);
          existingMedicineId = item._id;
        } 
      })

      if(existingMedicineId){
        console.log('aaaya', existingMedicineId)
        try {
          const response = await axios.put(`${baseUrl}cart/${existingMedicineId}`, {
            name: currItem.name,
            description: currItem.description,
            price: updatedPrice,
            quantity: updatedQuantity,
          });

         const updatedTotalMedicine = await axios.put(`${baseUrl}medicine/${currItem._id}`, {
            name: currItem.name,
            description: currItem.description,
            price: currItem.price,
            quantity: Number(currItem.quantity) -1,
          });
    
          if (response.status === 200) {
            alert("Added successfully!");
          } else {
            throw new Error("Something went wrong!");
          }
        } catch (error) {
          console.log(error);
        }
      } else{
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
  }

  const cartContext = React.createContext({
    items: items,
    cartItems: cartItems,
    totalAmount : totalAmount,
    addItems: addItems,
    addToCart: addToCart
  });

  console.log(totalAmount)
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
