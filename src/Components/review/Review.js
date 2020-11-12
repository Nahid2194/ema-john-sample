import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImg from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const removeItem = productKey => {
        console.log("remove Item", productKey);
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey);

    }
    const history = useHistory();
    const handleProceedCheckout = () => {
        history.push('/shipment')
    }
    let happyImage;
    if (orderPlaced) {
        happyImage = <img src={happyImg} />
    }

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
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem
                        key={pd.key}
                        removeItem={removeItem}
                        product={pd}></ReviewItem>)
                }
                {
                    happyImage
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    {
                        <button onClick={handleProceedCheckout} className="main-button">Proceed Checkout</button>
                    }
                </Cart>
            </div>

        </div>
    );
};

export default Review;