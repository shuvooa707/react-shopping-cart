import React, { useRef, useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Route, Link, Switch, Routes } from 'react-router-dom';
import Cart from './Cart.js';
import Navbar from './Navbar';
import CartPage from './CartPage.js';
import ProductsPage from './ProductsPage.js';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faShoppingCart,
	faPlus,
	faMinus,
	faTrash,
} from '@fortawesome/free-solid-svg-icons';


import phones from './Phones.js';

export const CartContext = React.createContext();

export default function App(props) {
	let [cart, setCart] = useState([]);
	let [totalProduct, setTotalProduct] = useState(0);
	let [totalProductPrice, setTotalProductPrice] = useState(0);
	let [products, setProducts] = useState(phones.phones);
	let cartBellNode = useRef();



	function tingTing() {
		cartBellNode.current();
	}

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
		return tmp;
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
		if (cart[pid] > 1) {
			cart[pid] -= 1;
			updateTotalProduct();
			updateTotalProductPrice();
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


	function clearCart() {
		setCart([]);
		setTotalProduct(0);
		setTotalProductPrice(0);
	}

	useEffect( () => {
	});



	return (
		<div className="container">
			<CartContext.Provider value={{cart, products}}>
				<BrowserRouter>
					<Navbar totalProductPrice={totalProductPrice} totalProduct={totalProduct} />
					<Routes>
						<Route path="/" element={<ProductsPage
							updateProduct={updateCart.bind(this)}
							removeProduct={removeProduct.bind(this)}
							tingTing={tingTing.bind(this)}
							cartBellNode={cartBellNode}
							getProductTotal={updateTotalProduct.bind(this)}
							clearCart={clearCart.bind(this)}
						/>} />
						<Route path="/CartPage" element={
						<CartPage
							cart={cart}
							clearCart={clearCart.bind(this)}

							updateProduct={updateCart.bind(this)}
							removeProduct={removeProduct.bind(this)}

							cartBellNode={cartBellNode}
							getProductTotal={updateTotalProduct.bind(this)}
							totalProductPrice={totalProductPrice}
							totalProduct={totalProduct}
							/>} />
					</Routes>
				</BrowserRouter>
			</CartContext.Provider>
		</div>
	);
}
