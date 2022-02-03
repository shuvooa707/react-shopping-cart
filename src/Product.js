import React, { useState, componentWillReceiveProps, useEffect } from 'react';
import './product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCoffee,
  faPlus,
  faMinus,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';

import {
    Button,
    Backdrop,
    CircularProgress
} from '@mui/material';


import Phones from "./Phones.js";


export default function Product(props) {
  let { id, name, price, thumb, updateProduct, removeProduct, pTotal, tingTing } = props;
  // console.log(props.pTotal);

  let [total, setTotal] = useState(pTotal);


  function getPTotal() {
    return total;
  }

  function incrementTotol() {
    updateProduct({ id: id, name: name, price: price });
    setTotal(total + 1);
	tingTing();
  }
  function decrementTotol() {
    if (total - 1 < 0) return;
    setTotal(total - 1);
    removeProduct(id);
  }


  function decideUpdateProduct(e) {
	//   console.log(e);
	  let v = e.value;
	  if ( total < v ) {
		console.log(v);
	  } 
	  if ( total > v ) {
		console.log(v);
	  }
  }

  

  return (
    <div className="product">
		<div className='thumbnail' >
			<img src='/img/product/iphone13.png' height={`180px`} />
		</div>
		<br />
		<strong className='product-name mt-2'>{name}</strong>
		<br />
		<bold className={`old-price`}>${price - (price*.05)}</bold>
		<bold className={`new-price`}>${price}</bold>
		<br />
		<button
			onClick={(_) => {
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
			}}
		/>
		<input type={"number"} min={0} onInput={decideUpdateProduct} className={`total`} value={total} />
		<FontAwesomeIcon
			icon={faMinus}
			onClick={(_) => {
			decrementTotol();
			}}
		/>
		</div>
    </div>
  );
}
