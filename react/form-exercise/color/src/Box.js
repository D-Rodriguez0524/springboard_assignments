import React from "react";

const Box = ({
    id,
    handleRemove,
    width,
    height,
    backgroundColor }) => {
    const remove = () => handleRemove(id);
    return (
        <div>
            <div
                style={{
                    width: `${width}em`,
                    height: `${height}em`,
                    backgroundColor
                }} />
            <button onClick={remove}>Remove the box </button>
        </div>
    )
}

export default Box;