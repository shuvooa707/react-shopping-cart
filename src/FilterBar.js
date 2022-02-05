import React, { useState } from 'react';
import {Input,OutlinedInput, FormControl,InputLabel,Select, MenuItem } from '@mui/material';
import phones from "./Phones.js";

export default function FilterBar(props) {
    let { products } = props;

    let brands = [...new Set(phones.phones.map(p => p.brand))];

    console.log(brands);


    function filterPipeline() {
        this.filterProduct = function () {
            let keyword = document.querySelector("#product-search-keyword").value;
            let products = [...document.querySelectorAll(".product")];
            if ( !keyword.length ) {
                products.forEach(p => {
                    p.classList.remove("hide");
                });
                return;
            }
            products.forEach(p => {
                if ( p.innerText.toLowerCase().includes(keyword.toLowerCase()) ) {
                    p.classList.remove("hide");
                } else {
                    p.classList.add("hide");
                }
            });
        }
        this.filterByBrand = function() {
            let brand = document.querySelector("#product-search-brand").value;
        }
    }
    return (
        <div className="filter-bar mt-5">
            <br />
            <div className="card mt-5" style={{borderTop:"2px solid black"}}>
                <div className="card-body shadow shadow-sm">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="form-group">
                                <FormControl>
                                    <InputLabel htmlFor="product-search-keyword">Name</InputLabel>
                                    <OutlinedInput
                                        sx={{ width: '100%' }}
                                        id="product-search-keyword"
                                        label="Name"
                                        onInput={e => {  } }
                                    />
                                </FormControl>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="form-group">
                                <FormControl fullWidth>
                                    <InputLabel id="product-search-brand">Brand</InputLabel>
                                    <Select
                                        labelId="product-search-brand"
                                        id="product-search-brand"
                                        label="brand"
                                        onChange={ e => {  }}
                                    >
                                        {
                                            brands.map(brand => {
                                                return <MenuItem value={brand}>{brand}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className="col-lg-4"></div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}