import React from "react";
import { NavLink } from "react-router-dom";
import "../Navbar.css"
import "../img.css"

const Chips = () => {
    const imgUrl = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.meijer.com%2Fcontent%2Fdam%2Fmeijer%2Fproduct%2F0002%2F84%2F0064%2F22%2F0002840064225_1_A1C1_0600.png&f=1&nofb=1&ipt=603d7038a399c354652656e95a2efaf3b1b6763f959a7650d0278d76e59a6872&ipo=images";
    return (
        <div>

            <div className="Navbar">
                <NavLink to='/'> Vending Machine </NavLink>
            </div>
            <div>
                <h1>You must be hungry for some Doritos <small><i>Spicy Sweet Chili</i></small></h1>
                <img className="img" src={imgUrl} alt="doritos" />
            </div>

        </div>
    )
}

export default Chips;