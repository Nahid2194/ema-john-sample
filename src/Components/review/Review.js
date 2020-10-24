import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart, setCart] = useState([])
    useEffect(() => {
        const savedData = getDatabaseCart();
        const productKeys = Object.keys(savedData);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedData[key];
            return product;
        }, [])
        setCart(cartProducts);
        //console.log(cartProducts);
    }, [])
    return (
        <div>
            <h1>Cart Items {cart.length}</h1>
            {
                cart.map(pd => <ReviewItem product={pd}></ReviewItem>)
            }
        </div>
    );
};

export default Review;