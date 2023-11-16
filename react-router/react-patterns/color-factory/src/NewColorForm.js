import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const NewColorForm = ({ addColor }) => {
    const INITIAL_STATE = {
        name: "",
        hex: "#ffffff"
    }

    const [formData, updateFormData] = useState(INITIAL_STATE);
    const history = useHistory();

    const handleChange = (evt) => {
        updateFormData(f => ({ ...f, [evt.target.name]: evt.target.value }));
    }

    const HandleSubmit = (evt) => {
        evt.preventDefault();
        addColor({ [formData.name]: formData.hex });
        history.push("/colors");
    }

    const { name, hex } = formData;

    return (
        <div className="NewColorForm">
            <form onSubmit={HandleSubmit}>
                <div>
                    <label htmlFor="name" >Color name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter color name"
                        onChange={handleChange}
                        value={name}
                    />
                </div>
                <div>
                    <label htmlFor="hex" >Hex value</label>
                    <input
                        type="color"
                        name="hex"
                        id="hex"
                        onChange={handleChange}
                        value={hex}
                    />
                </div>
                <button>Add Color</button>
            </form>
        </div>
    )
}

export default NewColorForm;