import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart,
  faPlus,
  faMinus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import phones from './Phones.js';
export default function Cart(props) {
  let { cart, clearCart } = props;
  let [products, setProducts] = useState(phones.phones);  

  let [cartContainerVisibility, setCartContainerVisibility] = useState(0);

  function showCart() {
    setCartContainerVisibility(!cartContainerVisibility);
  }

  return (
    <div
      className={`cart-container ${
        !cartContainerVisibility ? 'hide-cart' : ''
      }`}
    >
      <div
        className={`cart-show-button`}
        onClick={_ => {
          showCart();
        }}
      >
        <FontAwesomeIcon icon={faShoppingCart} />
      </div>
      <div className="cart-header">
        <div>
          <FontAwesomeIcon icon={faShoppingCart} /> Cart
        </div>
        <div>
          <FontAwesomeIcon
            icon={faTrash}
            onClick={(_) => {
              clearCart();
            }}
          />
        </div>
      </div>
      <div className={`cart-product-list`}>
        <table className={`cart-product-table`}>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Count</th>
              <th>Total</th>
            </tr>
          </tbody>
          <tbody>
            {Object.keys(cart).map((pid) => {
              let p = products.find((p) => p.id == pid);
              return (
                <tr>
                  <td>{p.name}</td>
                  <td>{p.price}</td>
                  <td>
                    <div className={`add-cart-bar`}>
                      <FontAwesomeIcon icon={faPlus} onClick={(_) => {}} />
                      <span className={`total`}>{cart[pid]}</span>
                      <FontAwesomeIcon icon={faMinus} onClick={(_) => {}} />
                    </div>
                  </td>
                  <td>{p.price * cart[pid]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
