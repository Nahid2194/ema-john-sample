import React from 'react';
import { useState } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);
    //console.log(products);
    const handleAddProduct = (product) => {
        // console.log("Product Added", product);
        const newCart = [...cart, product];
        setCart(newCart);
        const sameProduct = newCart.filter(pd => pd.key === product.key);
        const count = sameProduct.length;
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

                <Cart cart={cart}></Cart>
            </div>


        </div>
    );
};

export default Shop;