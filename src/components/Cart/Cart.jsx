import React from 'react';
import './Cart.css'
const Cart = (props) => {
    const {cart} = props;
    // console.log(cart);
    let total =0;
    let shippingCost = 0;
    for(const product of cart){
        total=total + product.price;
        shippingCost = shippingCost + product.shipping;
    }
    const tax = (total*(7/100));
    const grandTotal = (total + tax + shippingCost);
    return (
        <div className='cart'>
            <h2>Order Summary</h2>
            <p>Selected Item: {cart.length}</p>
            <p>Total price: ${total}</p>
            <p>Total Shipping: ${shippingCost}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <h6>Grand Total: ${grandTotal.toFixed(2)}</h6>
        </div>
    );
};

export default Cart;