import React, { useState } from 'react';
import Cart from './Cart.js';
import Product from './Product.js';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart,
  faPlus,
  faMinus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import phones from './Phones.js';

export default function App() {
  let [cart, setCart] = useState([]);
  let [totalProduct, setTotalProduct] = useState(0);
  let [totalProductPrice, setTotalProductPrice] = useState(0);
  let [products, setProducts] = useState( phones.phones ); 


  function updateCart(product) {
    if (cart[product.id]) {
      cart[product.id] += 1;
    } else {
      cart[product.id] = 1;
    }

    let p,
      tmp = 0;
    for (let i in cart) {
      tmp += cart[i];
    }
    setTotalProduct(tmp);

    tmp = 0;
    for (let i in cart) {
      p = products.find((p) => {
        if (p.id == i) {
          return p;
        }
      });
      tmp += p.price * cart[i];
    }
    setTotalProductPrice(tmp);
  }

  function updateTotalProduct() {
    let tmp = 0;
    for (let i in cart) {
      tmp += cart[i];
    }
    setTotalProduct(tmp);
  }

  function updateTotalProductPrice() {
    let tmp = 0;
    for (let i in cart) {
      let p = products.find((p) => {
        if (p.id == i) {
          return p;
        }
      });
      tmp += p.price * cart[i];
    }
    setTotalProductPrice(tmp);
  }

  function removeProduct(pid) {
    console.log(cart);
    if (cart[pid] > 1) {
      cart[pid] -= 1;
      updateTotalProduct();
      updateTotalProductPrice();
      // console.log(cart);
      return;
    }
    if (!cart[pid]) {
      updateTotalProduct();
      updateTotalProductPrice();
      return;
    }
    if (cart[pid] == 1) {
      delete cart[pid];
      updateTotalProduct();
      updateTotalProductPrice();
      return;
    }
  }

  function getProductTotal(pid) {
    if (cart[pid]) {
      return parseInt(cart[pid]);
    }
    return 0;
  }

  function clearCart() {
    setCart([]);
    setTotalProduct(0);
    setTotalProductPrice(0);
    console.log(cart);
  }

  function getUniqKey() {
    return parseInt(Math.random() * Date.now());
  }

  return (
    <div className="container">
      <Cart 
        cart={ cart }
        clearCart={ clearCart.bind(this) }
        
      />
      <nav className="navbar">
        <span className={`totalProduct ${!totalProduct ? 'hide' : ''}`}>
          {totalProduct}
        </span>
        <FontAwesomeIcon icon={faShoppingCart} />
        <span className="totalProductPrice">{totalProductPrice} $</span>
      </nav>
      <div className="products">
        {products.map((p) => {
          return (
            <Product
              id={p.id}
              name={p.name}
              price={p.price}
              thumb={'dkcfdkfdk.src'}
              pTotal={getProductTotal(p.id)}
              updateProduct={updateCart.bind(this)}
              removeProduct={removeProduct.bind(this)}
              key={getUniqKey()}
            />
          );
        })}
      </div>
    </div>
  );
}
