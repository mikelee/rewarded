import { sortNewest, sortOldest, sortAZ, sortZA } from './sort';

import { Method } from '../types';
import { SortOrder } from './components/sort/sort.component';

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
    
    const response = await fetch('https://server.rewarded.dev' + path, options);
    const data = await response.json();

    return data;
}

export function sortItems<T extends { completed: boolean, text: string, timestamp: string }>(items: T[], sort: SortOrder) {
    switch (sort) {
        case 'Newest First':
            return sortNewest(items);
        case 'Oldest First':
            return sortOldest(items);
        case 'A-Z':
            return sortAZ(items);
        case 'Z-A':
            return sortZA(items);
        default:
            return items;
    }
}