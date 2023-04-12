import {Dropdown} from 'react-bootstrap'
import './Header.css'
import { Fragment } from 'react';
import { FaBars, FaUserCircle } from "react-icons/fa";

const Header = () => {
    return (
    <div className="header">
        <Dropdown className="nav-bar">
            <Dropdown.Toggle variant="success" >
            <FaBars size={40} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item className='nav-item' href="./">Get Price Estimate</Dropdown.Item>
                <Dropdown.Item href="./register">Submit Request</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
        <FaUserCircle className="user-icon" size={70}/>
        </Dropdown>
    </div>
    )
}

export default Header;