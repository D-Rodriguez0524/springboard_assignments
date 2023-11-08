import React from "react";
import { NavLink } from "react-router-dom";
import "../Navbar.css"
import "../img.css"

const Soda = () => {
    const imgUrl = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Famericanfizz.co.uk%2Fimage%2Fcache%2Fcatalog%2Famerican-soda%2Fbig-red%2Fbig-red-soda-can-800x800.jpg&f=1&nofb=1&ipt=5bd1f3071f2fa8c1b8fb01a9294bc0986cef2ff4f9da804130dda813f4d0ce69&ipo=images";
    return (
        <div>

            <div className="Navbar">
                <NavLink to='/'> Vending Machine </NavLink>
            </div>
            <div>
                <h1>You must be thirsty for some BIG RED!</h1>
                <img className="img" src={imgUrl} alt="big red" />
            </div>

        </div>
    )
}

export default Soda;