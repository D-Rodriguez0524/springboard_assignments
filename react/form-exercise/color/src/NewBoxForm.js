import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

const NewBoxForm = ({ createBox }) => {

    const INITIAL_STATE = {
        width: "",
        height: "",
        backgroundColor: ""
    };

    const [boxForm, setBoxFormData] = useState(INITIAL_STATE);

    const handleChange = e => {
        const { name, value } = e.target;
        setBoxFormData(fData => ({
            ...fData,
            [name]: value
        }));
    }

    const handleSubmit = e => {
        e.preventDefault();
        createBox({ ...boxForm, id: uuid() });
        setBoxFormData(INITIAL_STATE);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor='width'>Width: </label>
                    <input
                        id='width'
                        type="number"
                        placeholder="Enter Width"
                        name='width'
                        value={boxForm.width}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor='height'>Height: </label>
                    <input
                        id='height'
                        type="number"
                        placeholder="Enter Height"
                        name='height'
                        value={boxForm.height}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor='backgroundColor'>Background Color: </label>
                    <input
                        id='backgroundColor'
                        type="text"
                        placeholder="Enter background color"
                        name='backgroundColor'
                        value={boxForm.backgroundColor}
                        onChange={handleChange}
                    />
                </div>
                <button id='boxButton'>Add Style</button>

            </form>
        </div>
    )
}

export default NewBoxForm;