import React, { useContext, useRef } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import CartContext from "../../store/cart-context";

const MedicineForm = () => {
  const cartCtx = useContext(CartContext);

  const mdNameRef = useRef(""),
    descriptionRef = useRef(""),
    priceRef = useRef(0),
    quantityRef = useRef(0);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const mdName = mdNameRef.current.value,
      description = descriptionRef.current.value,
      price = priceRef.current.value,
      quantity = quantityRef.current.value;

    cartCtx._currentValue.addItems({
      mdName: mdName,
      description: description,
      price: price,
      quantity: quantity,
    });
    
    mdNameRef.current.value = "";
    descriptionRef.current.value = "";
    priceRef.current.value = 0;
    quantityRef.current.value = 0;
  };

  return (
    <>
      <Form className="d-flex">
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Medicine Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter medicine name"
              ref={mdNameRef}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              ref={descriptionRef}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Price"
              ref={priceRef}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Quantity"
              ref={quantityRef}
            />
          </Form.Group>
        </Row>
        <Button
          variant="primary"
          type="submit"
          style={{ height: "2.5rem", marginTop: "2rem", marginLeft: "1rem" }}
          onClick={(e) => onSubmitHandler(e)}
        >
          Add to Cart
        </Button>
      </Form>
    </>
  );
};

export default MedicineForm;
