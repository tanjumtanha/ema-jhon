import React, { useContext } from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProviders';

const Header = () => {
    const {user,logOut} = useContext(AuthContext);
    const handelLogOut = () =>{
        logOut()
        .then(result=>{

        })
        .catch(error =>{
            console.error(error);
        })
    }

    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div className='header-title'>
                <Link to="/">Shop</Link>
                <Link to="/orders">Order</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
                {user && <span className='text-white'>Welcome<Link onClick={handelLogOut}>Log out</Link></span>}
            </div>
        </nav>
    );
};

export default Header;