import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="Navbar">
            <NavLink exact to="/chips">Chips</NavLink>
            <NavLink exact to="/fish">Fish</NavLink>
            <NavLink exact to="/soda">Soda</NavLink>
        </nav>
    )
}

export default Navbar;