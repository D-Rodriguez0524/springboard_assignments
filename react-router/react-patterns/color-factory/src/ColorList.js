import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./ColorList.css"

const ColorList = ({ colors }) => {

    const colorLinks = Object.keys(colors).map(colorName => (
        <li key={colorName}>
            <Link to={`/colors/${colorName}`}> {colorName} </Link>
        </li>
    ));

    console.log(colors);
    console.log(colorLinks);


    return (
        <div className="ColorList">

            <h1 className="ColorList-title"> Welcome to the color picker </h1>
            <h3 >
                <Link className="ColorList-form-link" to="/colors/new" >Add Color</Link>
            </h3>

            <div >
                <p>Please Select a color</p>
                <ul>{colorLinks}</ul>
            </div>

        </div>
    )
}

export default ColorList;