import { useState } from "react";
import { v4 as uuid } from 'uuid';
import axios from "axios";

const useAxios = (url) => {
    const [state, setState] = useState([]);

    const fetchData = async (info = null) => {
        if (info) {
            const response = await axios.get(`${url}${info}`)
            setState(state => [...state, { ...response.data, id: uuid() }])
        }
        else {
            const response = await axios.get(url)
            setState(state => [...state, { ...response.data, id: uuid() }])
        }

    }

    return [state, fetchData];
}


export default useAxios;
