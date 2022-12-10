import { Method } from '../types';

export const fetchData = async (path: string, method: Method, body?: any ) => {
    const headers: HeadersInit = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
    };

    const options: RequestInit = {
        method,
        headers,
        credentials: 'include'
    };

    if (body) options.body = JSON.stringify(body);
    
    const response = await fetch(path, options);
    const data = await response.json();

    return data;
}