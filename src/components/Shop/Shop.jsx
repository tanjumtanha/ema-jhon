import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        // console.log('products', products)
        const storedCart = getShoppingCart();
        const saveCart = [];
        // step 1: get id
        for (const id in storedCart) {
            // console.log(id);
            //step 2: get the product by using id
            const addedProduct = products.find(product => product.id === id)
            // console.log(saveProduct)
            // step 3:get quantity of the product
            if (addedProduct) {
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                saveCart.push(addedProduct);
            }
            console.log(addedProduct)
        }
        // step5: set the cart
        setCart(saveCart);
    }, [products])

    const handelAddToCart = (product) => {
        let newCart = [];
        // const newCart = [...cart, product];
    //    if product does not exists in the cart then set quantity = 1
    // if exists update the quantity by 1 
       const exists = cart.find(pd => pd.id ===product.id);
       if(!exists){
        product.quantity = 1;
        newCart = [...cart, product];
       }
       else{
        exists.quantity = exists.quantity +1;
        const remaining = cart.filter(pd => pd.id !== product.id)
        newCart = [...remaining, exists]
       }
        setCart(newCart);
        addToDb(product.id);
    }

    const handelClearCart = () =>{
        setCart([]);
        deleteShoppingCart();
    }
    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handelAddToCart={handelAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}
                handelClearCart={handelClearCart}
                >
                    <Link className='proceed-link' to="/orders">
                        <button className='btn-proceed'>
                            <span>Review Order</span>
                            <FontAwesomeIcon icon={faArrowAltCircleRight} /></button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;