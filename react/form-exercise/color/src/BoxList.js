import React, { useState } from "react";
import Box from "./Box";
import NewBoxForm from "./NewBoxForm";

const BoxList = () => {
    const [boxList, setBoxList] = useState([]);

    const add = box => {
        setBoxList(boxList => [...boxList, box]);
    };

    const remove = id => {
        setBoxList(boxList => boxList.filter(box => box.id !== id));
    };

    const boxComponents = boxList.map(box => (
        <Box
            key={box.id}
            id={box.id}
            handleRemove={remove}
            width={box.width}
            height={box.height}
            backgroundColor={box.backgroundColor}
        />
    ));

    return (
        <div>
            <NewBoxForm createBox={add} />
            {boxComponents}
        </div>
    )
}

export default BoxList;