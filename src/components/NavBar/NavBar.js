import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../Resurses/movies-icon.jpg'

import './Navbar.css';

export default function NavBar() {
    return (
        <header className="navbar">
            <div>
              <NavLink exact to="/" >
                <img id="logoHenry" src={Logo} width="40" height="40" className="d-inline-block align-top" alt="" />
              </NavLink>
            </div>
            <nav>
                <ul className="list">
                    <li className="list-item">
                        <NavLink exact to="/" >Home</NavLink>
                        <NavLink to="/favs" >Favoritas</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}