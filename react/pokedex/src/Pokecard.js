import React from "react";
import "./Pokecard.css"

/** Individual Pokemon card.
 *
 * Props:
 * - name
 * - image
 * - type
 * - exp: (number of experience points)
 *
 * */
const Pokecard = ({ id, exp, name, type }) => {
    let img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

    return (
        <div className="Pokecard">
            <img className="Pokecard-img" src={img} alt={name} />
            <div className="Pokecard-name">Name: {name} </div>
            <div className="Pokecard-data" >Type: {type} </div>
            <div className="Pokecard-data" >EXP: {exp} </div>
        </div>
    );
}

export default Pokecard;