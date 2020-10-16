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
            <div className="count">
                <h2 className="text-danger">Order Summary</h2>
                <p>Items order :{cart.length}</p>
            </div>

            <table >

                <tr>
                    <td><p>Product Price :</p></td>
                    <td> ${totalFormate(total)}</td>
                </tr>
                <tr>
                    <td><p><small>Shipping Cost : </small></p></td>
                    <td> ${totalFormate(shipping)}</td>
                </tr>
                <tr>
                    <td><p>Tax + VAT :</p></td>
                    <td> ${totalFormate(tax)}</td>
                </tr>
                <tr className="total-row">
                    <h2>  <td>Order Total : </td>
                        <td> ${totalFormate(grandTotal)}</td></h2>
                </tr>

            </table>
            <div className="count">
                <button className="Main-button">Review your order</button>
            </div>




        </div>
    );
};

export default Cart;