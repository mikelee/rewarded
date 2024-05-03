import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../utils';

import './sort.styles.scss';

import { getSort } from '../../redux/menu/menu.selectors';
import { sortSet } from '../../redux/slices/menuSlice';

export type SortOrder = 'Newest First' | 'Oldest First' | 'A-Z' | 'Z-A';

interface Props {
    sortOrders: SortOrder[]
}

const Sort: React.FC<Props> = ({ sortOrders }) => {
    const sort = useSelector(getSort);

    const dispatch = useDispatch();

    const changeSortOrder = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const sortOrder = (e.target as HTMLButtonElement).name;

        try {
            const path = '/api/settings/sort/update';
            const method = 'PUT';
            const body = { sort: sortOrder };

            await fetchData(path, method, body);

            dispatch(sortSet((sortOrder as SortOrder)));
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className='sort'>
            {
                sortOrders.map(sortOrder =>
                    <button
                        key={sortOrder}
                        className={`sort-order ${sort === sortOrder ? 'selected' : ''}`}
                        name={sortOrder}
                        onClick={(e) => changeSortOrder(e)}
                    >{sortOrder}</button>)
            }
        </div>
    );
}

export default Sort;