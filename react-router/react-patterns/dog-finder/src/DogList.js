import React from "react";
import { Link } from "react-router-dom";

const DogList = ({ dogs }) => {
    return (
        <div className="DogList">
            <h1>Hello! We have a selection of friendly doggos. Click on Links for more info</h1>

            <div>
                {dogs.map(dog => (
                    <div>
                        <img src={dog.src} alt={dog.name} />
                        <Link to={`/dogs/${dog.name.toLowerCase()}`}> {dog.name} </Link>
                    </div>
                )
                )}
            </div>
        </div>
    )
}

export default DogList;