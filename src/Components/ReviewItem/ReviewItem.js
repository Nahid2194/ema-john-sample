import React from 'react';
import './ReviewItem.css';

const ReviewItem = (props) => {
    //console.log(props);
    const { name, quantity, key, price } = props.product;

    return (
        <div className="container review-item">
            <h4>{name}</h4>
            <p>Quantity : {quantity}</p>
            <p>Price : {price}</p>
            <br />
            <button onClick={() => props.removeItem(key)}
                className="main-button">
                remove</button>

        </div>
    );
};

export default ReviewItem;