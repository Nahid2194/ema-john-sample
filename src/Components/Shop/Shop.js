import React, { useEffect } from 'react';
import { useState } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);
    //console.log(products);
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productkey = Object.keys(savedCart);
        const previousCart = productkey.map(pdkey => {
            const product = fakeData.find(product => product.key === pdkey);
            product.quantity = savedCart[pdkey];
            return product;
        })
        setCart(previousCart);

    }, []);
    const handleAddProduct = (product) => {
        // console.log("Product Added", product);
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        } else {
            product.quantity = 1;
            newCart = [...cart, product];
        }

        setCart(newCart);

        addToDatabaseCart(product.key, count);
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                <ul>
                    {

                        products.map(product => <Product
                            key={product.key}
                            handleAddProduct={handleAddProduct}
                            showAddToCart={true}
                            product={product}
                        ></Product>)
                    }
                </ul>
            </div>
            <div className="cart-container">

                <Cart cart={cart}>
                    <div className="count">
                        <Link to="/review"><button className="Main-button">Review your order</button></Link>
                    </div>
                </Cart>
            </div>


        </div>
    );
};

export default Shop;