import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import DogDetails from "./DogDetails";

const FindDog = ({ dogs }) => {
    const { name } = useParams();
    if (name) {
        const currentDog = dogs.find(
            dog => dog.name.toLowerCase() === name.toLowerCase()
        );
        return <DogDetails dogs={currentDog} />
    }
    return null;
}

export default FindDog;