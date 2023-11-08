import React from "react";
import { NavLink } from "react-router-dom";
import "../Navbar.css"
import "../img.css"

const Fish = () => {
    const imgUrl = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fnorcalwater.org%2Fwp-content%2Fuploads%2Flarge.salmon.Ken-Davis.png&f=1&nofb=1&ipt=637f35a92ced5e08dedd4131e66e28654fbb7087b0ccf495dfde86533cb7a7f6&ipo=images";
    return (
        <div>

            <div className="Navbar">
                <NavLink to='/'> Vending Machine </NavLink>
            </div>
            <div>
                <h1>You must be a hungry BEAR!</h1>
                <img className="img" src={imgUrl} alt="fish" />
            </div>

        </div>
    )
}

export default Fish;