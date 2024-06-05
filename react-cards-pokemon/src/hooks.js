import { useState } from "react";
import axios from "axios";
import {v1 as uuid} from "uuid";

function useFlip(initialFlip = true) {
  const [isFlipped, setFlipped] = useState(initialFlip);

  const flip = () => {
    setFlipped(isUp => !isUp);
  };

  return [isFlipped, flip];
}

function useAxios(baseURL) {
  const [data, setData] = useState([]);

  const addData = async (endpoint = "") => {
    try {
    const response = await axios.get(`${baseURL}${endpoint}`);
    setData(data => [...data, { ...response.data, id: uuid() }]);
    }
    catch(error){
        console.log(error)
    }
  };

  return [data, addData];
}

export { useFlip, useAxios };
