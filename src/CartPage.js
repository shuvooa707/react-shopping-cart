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
import { Modal, Button as BSButton  } from 'react-bootstrap';
import {
    Button,
    Backdrop,
    CircularProgress
} from '@mui/material';



import phones from './Phones.js';
export default function CartPage(props) {
    let { cart, clearCart, updateProduct, removeProduct, cartBellNode, getProductTotal, totalProductPrice, totalProduct } = props;
    let [products, setProducts] = useState(phones.phones);

    let [cartContainerVisibility, setCartContainerVisibility] = useState(0);
    let [cartVisible, setCartVisible] = useState(0);
    let [totalProductOnCart, setTotalProductOnCart] = useState(0);
    let bellClear = null;
    let [show, setShow] = useState(false);
    let [backDropOpen, setBackDropOpen] = useState(false);

    useEffect(_ => {
        cartBellNode.current = tingTing;
        setTotalProductOnCart(getProductTotal());
    })

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
        <div className={`container mt-5`}>
            <div className='row mt-5 justify-content-between'>
                <div className='col-lg-5 mt-5'>
                    <table className='table table-striped'  style={{boxShadow: "2px 2px 10px #aaa"}}>
                        <thead>
                            <tr className='bg-info text-white'>
                                <td>Name</td>
                                <td>Price</td>
                                <td>Count</td>
                                <td>Total</td>
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
                <div className='col-lg-4 mt-5'>
                    <div className='card'>
                        <div className='card-header bg-dark text-white'>
                            Total
                        </div>
                        <div className='card-body text-end'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <td className='text-start'>Items</td>
                                        <td>{totalProduct}</td>
                                    </tr>
                                    <tr>
                                        <td className='text-start'>Vat</td>
                                        <td>10%</td>
                                    </tr>
                                    <tr>
                                        <td className='text-start'>Discount</td>
                                        <td>10%</td>
                                    </tr>
                                    <tr>
                                        <td className='text-start'>Sub Totol</td>
                                        <td>{totalProductPrice}$</td>
                                    </tr>
                                </thead>
                            </table>
                            <Button variant="contained" className='w-100' onClick={_ => { setShow(!show) }}>Confirm</Button>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={show}>
                <div className='modal-header bg-dark text-white d-flex justify-content-between'>
                    <span>Payment Form</span>
                    <FontAwesomeIcon icon={faTimes} style={{cursor:"pointer"}} onClick={_=> setShow(!show) }/>
                </div>
                <Modal.Body>
                    <div className='form-group mt-2'>
                        <label >Name : </label>
                        <input type={'text'} name='name' className='form-control' />
                    </div>
                    <div className='form-group mt-2'>
                        <label >Phone : </label>
                        <input type={'text'} name='phone' className='form-control' />
                    </div>
                    <div className='form-group mt-2'>
                        <label >Address : </label>
                        <textarea className='form-control'></textarea>
                    </div>
                    <div className='form-group mt-2'>
                        <Button variant="contained" color='error' className='w-100' onClick={ _ => { setBackDropOpen(!backDropOpen) } }>Confirm</Button>
                    </div>
                </Modal.Body>
            </Modal>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backDropOpen}
                onClick={ _ => { setBackDropOpen(!backDropOpen) } }
                >
                <CircularProgress color="inherit" />
                <h3 className='text-white mx-4'>Processing...</h3>
            </Backdrop>
        </div>
    );
}
