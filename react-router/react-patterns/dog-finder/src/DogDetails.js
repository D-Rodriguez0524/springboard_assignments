import React from "react";
import { Link, Redirect } from "react-router-dom";

const DogDetails = ({ dogs }) => {
    if (!dogs) return <Redirect to="/dogs" />

    return (
        <div className="DogDetails">
            <img src={dogs.src} alt={dogs.name} />
            <h2> {dogs.name} </h2>
            <h3> {dogs.age} years old</h3>
            <ul>
                {dogs.facts.map((fact, i) => (
                    <li key={i}> {fact} </li>
                ))}
            </ul>
            <Link to="/dogs" >Home</Link>
        </div>
    )
}

export default DogDetails;