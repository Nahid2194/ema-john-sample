import React from 'react';
import './Cart.css';
const Cart = (props) => {
    const cart = props.cart;
    console.log(props);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const element = cart[i];
        total = total + element.price;

    }
    let shipping = 0;
    if (total > 35) {
        shipping = 0;

    } else if (total > 15) {
        shipping = 4.99;
    } else if (total > 0) {
        shipping = 12.99;
    }
    let tax = 0;
    tax = total * 0.05;
    const totalFormate = (num) => {
        const precision = num.toFixed(2);
        return Number(precision);
    }
    const grandTotal = total + shipping + tax;
    return (
        <div className="cart-item">
            <h2>Order Summary</h2>
            <p>Items order : {cart.length}</p>
            <p>Product Price : ${totalFormate(total)}</p>
            <p><small>Shipping Cost : ${totalFormate(shipping)} </small></p>
            <p>Tax + VAT : ${totalFormate(tax)}</p>
            <h2>Total Price : ${totalFormate(grandTotal)}</h2>
        </div>
    );
};

export default Cart;