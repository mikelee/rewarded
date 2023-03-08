import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './sort.styles.scss';

import { Dispatch } from 'redux';

import { getSort } from '../../redux/menu/menu.selectors';
import { setSort } from '../../redux/menu/menu.actions';

export type SortOrder = 'Newest First' | 'Oldest First' | 'A-Z' | 'Z-A';

interface OwnProps {
    sortOrders: SortOrder[]
}

interface StateProps {
    sort: SortOrder
}

interface DispatchProps {
    setSort: (sortOrder: SortOrder) => void
}

type Props = OwnProps & StateProps & DispatchProps;

const Sort: React.FC<Props> = ({ sortOrders, sort, setSort }) => {

    const changeSortOrder = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const sortOrder = (e.target as HTMLButtonElement).name;

        setSort((sortOrder as SortOrder));;
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

const mapStateToProps = createStructuredSelector({
    sort: getSort
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setSort: (sortOrder: SortOrder) => dispatch(setSort(sortOrder))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sort);