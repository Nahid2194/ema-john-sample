import React from 'react';
import './ReviewItem.css';

const ReviewItem = (props) => {
    console.log(props);
    const { name, quantity } = props.product;
    return (
        <div className="container review-item">
            <h4>{name}</h4>
            <p>Quantity : {quantity}</p>
            <br />
            <button className="main-button">remove</button>

        </div>
    );
};

export default ReviewItem;