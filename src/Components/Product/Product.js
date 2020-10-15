import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {
    // console.log(props);
    const { name, img, price, seller, stock } = props.product;
    return (
        <div className="product">
            <div className="product-img">
                <img src={img} alt="" />
            </div>
            <div className="product-name">
                <h4>{name}</h4>
                <p><small>by : {seller}</small></p>
                <p>${price}</p>
                <p>only {stock} left in stock - order soon</p>
                <button className="main-button" onClick={() => props.handleAddProduct(props.product)}>
                    <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon> add to cart</button>
            </div>

        </div>
    );
};

export default Product;