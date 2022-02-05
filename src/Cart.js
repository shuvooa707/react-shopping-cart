import React, { useState, useEffect, useMemo } from 'react';
import "./css/cart.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faShoppingCart,
	faPlus,
	faMinus,
	faTrash,
	faTimes
} from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter, Route, Link, Switch, Routes, useLocation } from 'react-router-dom';
import { Modal as BSModal, Button as BSButton  } from 'react-bootstrap';
import { Button, Backdrop, CircularProgress } from '@mui/material';


import { CartContext } from './App';
export default function Cart(props) {
	let { clearCart, updateProduct, removeProduct, cartBellNode, getProductTotal } = props;
	let [cartContainerVisibility, setCartContainerVisibility] = useState(0);
	let [cartVisible, setCartVisible] = useState(0);
	let [totalProductOnCart, setTotalProductOnCart] = useState(0);
	let bellClear = null;

    let {cart, products} = React.useContext(CartContext);

	useEffect(_ => {
		cartBellNode.current = tingTing;
		setTotalProductOnCart(getTotalProduct());
	});

	function getTotalProduct() {
		let tmp = 0;
		for (let i in cart) {
			tmp += cart[i];
		}
		return tmp;
	}

	function tingTing() {
		if (bellClear) {
			clearTimeout(bellClear);
		}
		console.log("Ting Ting");
		let cartIcon = document.querySelector(".cart-icon");
		cartIcon.classList.add("ting-bell");

		bellClear = setTimeout(() => {
			cartIcon.classList.remove("ting-bell");
			bellClear = null;
		}, 4000);
	}

	function showCart() {
		setCartContainerVisibility(!cartContainerVisibility);
		setCartVisible(!cartVisible);
	}


	function incrementTotal(id, name, price) {

		// increments products in the cart
		updateProduct({ id: id, name: name, price: price });

	}

	function decrementTotal(id, name, price) {

		// decrements products in the cart
		removeProduct(id);
	}

	return (
		<div
			className={`cart-container ${!cartContainerVisibility ? 'hide-cart' : ''}`}
		>
			<div
				className={`cart-show-button`}
				onClick={_ => {
					showCart();
				}}
			>
				<FontAwesomeIcon icon={faShoppingCart} className={`cart-icon ${!cartVisible ? "" : "hide"}`} />
				<FontAwesomeIcon icon={faTimes} className={`cart-close-icon ${cartVisible ? "" : "hide"}`} />
				<span id='cart-item-count' className={`${totalProductOnCart ? "" : "hide"}`}>{totalProductOnCart}</span>
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
					<thead>
						<tr>
							<th>Name</th>
							<th>Price</th>
							<th>Count</th>
							<th>Total</th>
						</tr>
					</thead>
					<tbody>
						{
							Object.keys(cart).map((pid) => {
								let p = products.find((p) => p.id == pid);
								return (
									<tr>
										<td>{p.name}</td>
										<td>{p.price}</td>
										<td>
											<div className={`add-cart-bar`}>
												<FontAwesomeIcon icon={faPlus} onClick={(_) => { incrementTotal(p.id, p.name, p.price) }} />
												<span className={`total`}>{cart[pid]}</span>
												<FontAwesomeIcon icon={faMinus} onClick={(_) => { decrementTotal(p.id, p.name, p.price) }} />
											</div>
										</td>
										<td>{p.price * cart[pid]}</td>
									</tr>
								);
							})
						}
					</tbody>
				</table>
			</div>
				<Link to="/CartPage" className='w-100' style={{position:"absolute", bottom: "0px", width: "100%"}}>
					<Button variant="contained" color='error' className='w-100' >Checkout</Button>
                </Link>
		</div>
	);
}

// a b 