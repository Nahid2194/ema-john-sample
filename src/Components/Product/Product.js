import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
    //console.log(props.product.key);
    const { name, img, price, seller, stock, key } = props.product;
    return (
        <div className="product">
            <div className="product-img">
                <img src={img} alt="" />
            </div>
            <div className="product-name">
                <h4><Link to={"/product/" + key}>{name}</Link></h4>
                <p><small>by : {seller}</small></p>
                <p>${price}</p>
                <p>only {stock} left in stock - order soon</p>

                {props.showAddToCart === true && <button className="main-button" onClick={() => props.handleAddProduct(props.product)}>
                    <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon> add to cart</button>}
            </div>

        </div>
    );
};

export default Product;