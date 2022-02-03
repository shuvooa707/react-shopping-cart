import React, { useState, componentWillReceiveProps, useEffect, useMemo } from 'react';

import phones from './Phones.js';
import Product from './Product.js';
import Cart from './Cart.js';

export default function ProductsPage(props) {
    let {
        cart,
        updateProduct, 
        removeProduct, 
        tingTing, 
        clearCart, 
        cartBellNode,
    } = props;
    let [products, setProducts] = useState( phones.phones ); 
	let [x, setX] = useState(1);


	function getUniqKey() {
		return Date.now() + parseInt(Math.random() * Date.now());
	}
    
	function getProductTotal(pid) {
		if (cart[pid]) {
		    return parseInt(cart[pid]);
		}
		return 0;
	}

	useMemo( () => {
		setX(x+1);
		console.log(x);
	},[props]);


    return (
        <div className='container'>
            <Cart
			cart={ cart }
			clearCart={clearCart}

			updateProduct={updateProduct}
			removeProduct={removeProduct}
			
			cartBellNode={ cartBellNode }
			getProductTotal={getProductTotal}
		/>
            <div className="products">
                {products.map((p) => {
                    return (
                    <Product
                        id={p.id}
                        name={p.name}
                        price={p.price}
                        thumb={'dkcfdkfdk.src'}
                        pTotal={getProductTotal(p.id)}
                        updateProduct={updateProduct}
                        removeProduct={removeProduct}
                        key={getUniqKey()}
                        tingTing={tingTing}
                    />
                    );
                })}
            </div>
        
        </div>
    );
}

