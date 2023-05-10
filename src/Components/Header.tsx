import Stack from 'react-bootstrap/Stack';
import './Header.css'
import { NavLink, useNavigate } from "react-router-dom"
import { IoIosLogOut } from "react-icons/io"
import logo from '../Assets/logo512.png';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN } from '../utilities/constants'
import React from "react";


const Header = () => {
    let hasTokenValue = Cookies.get(ACCESS_TOKEN) !== undefined;
    //console.log(hasTokenValue);
    const navigate = useNavigate();

    const logout = () =>
    {
        Cookies.remove(ACCESS_TOKEN);
        navigate('/');
    }

    return (
    <Stack direction="horizontal" gap={0} className="header">
            <div className="mx-2 logo">
                <img src={logo}></img>
            </div>
            { hasTokenValue &&
            <>
                <div className="ms-4">
                    <NavLink  className={({isActive}) => isActive? 'nav-item-active':'nav-item'} to="/Home">Home</NavLink>
                </div>

                <div className="ms-4">
                    <NavLink  className={({isActive}) => isActive? 'nav-item-active':'nav-item'} to="/Price">Price Estimate</NavLink>
                </div>
            </>
            }
            <div className="ms-auto login">
                <div className="px-5 login">
                    {!hasTokenValue && <NavLink  className={({isActive}) => isActive? 'nav-item-active':'nav-item'} to="/">Login</NavLink>}
                    {!hasTokenValue && <NavLink  className={({isActive}) => isActive? 'nav-item-active':'nav-item'} to="register">/Register</NavLink>}
                    { hasTokenValue && <IoIosLogOut aria-label='logout' className='user-icon' onClick={logout} />}
                </div>
            </div>
    </Stack>
    )
}

export default Header;
