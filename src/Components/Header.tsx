import Stack from 'react-bootstrap/Stack';
import './Header.css'
import { NavLink, useNavigate } from "react-router-dom"
import { IoIosLogOut } from "react-icons/io"
import logo from '../Assets/logo512.png';
import Cookies from 'js-cookie';

const Header = () => {
    let hasTokenValue = Cookies.get('access_token') !== undefined;
    //console.log(hasTokenValue);
    const navigate = useNavigate();

    const logout = () =>  
    {
        Cookies.remove('access_token');
        navigate("/");
    
    }
    return (
    <Stack direction="horizontal" gap={5} className="header">
            <div>
                <img src={logo}></img>
            </div>
            <div>
                { hasTokenValue &&<NavLink  className={({isActive}) => isActive? 'nav-item-active':'nav-item'} to="/Price">Price Estimate</NavLink>}
            </div>
            <div className="ms-auto">
                {!hasTokenValue && <NavLink  className={({isActive}) => isActive? 'nav-item-active':'nav-item'} to="/">Login/Register</NavLink>}
            </div>
            <div>
                { hasTokenValue && <IoIosLogOut aria-label='logout' className='user-icon' onClick={logout} />}
            </div>
    </Stack>
    )
}

export default Header;