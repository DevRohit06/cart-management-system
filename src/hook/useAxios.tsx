"use client";
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useAxios = (params: string) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const [loading, setloading] = useState(true);

    axios.defaults.baseURL = 'https://fakestoreapi.com/';
    const fetchData = async(params: string) => {
        try{
            setloading(true);
            const result = await axios(params);
            setResponse(result.data);
        } catch(error: any){
            setError(error);
        } finally {
            setloading(false);
        }
    }

    useEffect(() => {
        fetchData(params);
    }, [params]);

    return {response, error, loading};
}

export default useAxios;