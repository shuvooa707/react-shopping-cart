import React, { useState, componentWillReceiveProps } from 'react';
import './product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCoffee,
  faPlus,
  faMinus,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import Phones from "./Phones.js";


export default function Product(props) {
  let { id, name, price, thumb, updateProduct, removeProduct, pTotal} = props;
  // console.log(props.pTotal);

  let [total, setTotal] = useState(pTotal);

  function getPTotal() {
    // console.log(pTotal);
    // setTotal(pTotal);
    return total;
  }

  function incrementTotol() {
    setTotal(total + 1);
  }
  function decrementTotol() {
    if (total - 1 < 0) return;
    setTotal(total - 1);
  }


  

  return (
    <div className="product">
      <strong>{name}</strong>
      <br />
      <bold>${price}</bold>
      <br />
      <button
        onClick={(_) => {
          updateProduct({ id: id, name: name, price: price });
          incrementTotol();
        }}
        className="addToCart"
      >
        Add To Cart
      </button>
      <br />
      <div className={`add-cart-bar`}>
        <FontAwesomeIcon
          icon={faPlus}
          onClick={(_) => {
            incrementTotol();
            updateProduct({ id: id, name: name, price: price });
          }}
        />
        <span className={`total`}>{total}</span>
        <FontAwesomeIcon
          icon={faMinus}
          onClick={(_) => {
            decrementTotol();
            removeProduct(id);
          }}
        />
      </div>
    </div>
  );
}
