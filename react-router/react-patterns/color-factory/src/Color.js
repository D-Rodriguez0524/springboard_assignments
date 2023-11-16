import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./Color.css"

const Color = ({ hex, color, history }) => {
    if (!hex) history.push("/colors");

    return (
        <div className="Color" style={{ backgroundColor: hex }} >
            <p>This is {color} </p>
            <p>mmmmm isnt it lovley</p>
            <p>
                <Link to="/colors" >Home</Link>
            </p>
        </div>
    )
}
export default Color;