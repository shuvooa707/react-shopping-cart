import React, { useState, componentWillReceiveProps, useEffect } from 'react';
import {
    faShoppingCart,
    faPlus,
    faMinus,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter, Route, Link, Switch, Routes, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  

export default function Navbar (props) {
    let {totalProduct, totalProductPrice} = props;
    let location = useLocation();
    return (
        <nav className="navbar">
            {
                location.pathname == "/CartPage" 
                ? 
                <Link to="/">
                    <button className='btn btn-danger'>Home</button>
                </Link> 
                :
                <Link to="/CartPage">
                    <button className='btn btn-success'>
                        <span className={`totalProduct ${!totalProduct ? 'hide' : ''}`}>
                            {totalProduct}
                        </span>
                        <FontAwesomeIcon icon={faShoppingCart} />
                        <span className="totalProductPrice">{totalProductPrice}$</span>
                    </button>
                </Link>
            }
		</nav>
    );
}