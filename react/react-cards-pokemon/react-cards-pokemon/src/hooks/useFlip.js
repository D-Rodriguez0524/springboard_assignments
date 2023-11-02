import { useState } from "react";

const useFlip = () => {
    const [state, setState] = useState(true);

    const toggleFlip = () => {
        setState(state => !state);
    }
    return [state, toggleFlip];
}


export default useFlip;