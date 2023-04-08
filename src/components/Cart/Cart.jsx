import React from 'react';
import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Cart = ({ cart, handelClearCart,children }) => {
    // console.log(cart);
    let total = 0;
    let shippingCost = 0;
    let quantity = 0;
    for (const product of cart) {
        // product.quantity = product.quantity ||1;
        total = total + product.price * product.quantity;
        shippingCost = shippingCost + product.shipping;
        quantity = quantity + product.quantity;
    }
    const tax = (total * (7 / 100));
    const grandTotal = (total + tax + shippingCost);
    return (
        <div className='cart'>
            <h2>Order Summary</h2>
            <p>Selected Item: {quantity}</p>
            <p>Total price: ${total}</p>
            <p>Total Shipping: ${shippingCost}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <h6>Grand Total: ${grandTotal.toFixed(2)}</h6>
            <button onClick={handelClearCart} className='btn-clear-cart'>
                <span>Clear Cart</span>
                <FontAwesomeIcon icon={faTrashAlt} />
            </button>
            {children}
        </div>
    );
};

export default Cart;