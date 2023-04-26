import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css'
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';

const Orders = () => {
    const saveCart = useLoaderData();
    const [cart, setCart] = useState(saveCart);

    const handelRemoveFromCart = (id) => {
        const remaining = cart.filter(product => product.id !== id);
        setCart(remaining);
        removeFromDb(id);
        
    }

    const handelClearCart = () =>{
        setCart([]);
        deleteShoppingCart();
    }
    //console.log(saveCart);
    return (
        <div className='shop-container'>
            <div className="review-container">
                {
                    cart.map(product => <ReviewItem
                        key={product.id}
                        product={product}
                        handelRemoveFromCart={handelRemoveFromCart}
                    ></ReviewItem>)
                }
            </div>
            <div className="saveCart-container">
                <Cart
                    cart={cart}
                    handelClearCart={handelClearCart}
                >
                    <Link className='proceed-link' to="/checkout">
                        <button className='btn-proceed'><span>Proceed Checkout</span>
                        <FontAwesomeIcon icon={faCreditCard} /></button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;