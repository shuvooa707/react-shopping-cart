import React, { useState, componentWillReceiveProps, useEffect, useMemo } from 'react';

import phones from './Phones.js';
import Product from './Product.js';
import Cart from './Cart.js';
import { CartContext } from './App.js';


export default function ProductsPage(props) {
    let {
        updateProduct, 
        removeProduct, 
        tingTing, 
        clearCart, 
        cartBellNode,
    } = props;
    // let [products, setProducts] = useState( phones.phones ); 

    let { cart, products } = React.useContext(CartContext);

	function getUniqKey() {
		return Date.now() + parseInt(Math.random() * Date.now());
	}
    
	function getProductTotal(pid) {
		if (cart[pid]) {
		    return parseInt(cart[pid]);
		}
		return 0;
	}



    return (
        <div className='container'>
            <Cart
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

