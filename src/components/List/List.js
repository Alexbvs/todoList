import React from 'react';
import classNames from 'classnames'
import removeSvg from '../../assets/img/remove.svg'

import './List.sass'
import Badge from '../Badge/Badge';

const List = ({ items, isRemovable, click, onRemove }) => {

    const removeList = (item) => {
        if (window.confirm('Are you sure you want to delete the list?')) {
            onRemove(item) 
        }
    }

    return <ul onClick={click} className='list'>
        {items.map((item, index) => (
            <li key={index}
                className={classNames(item.className, { 'active': item.active })}>
                <i>{item.icon ? item.icon : <Badge color={item.color} />}</i>

                <span>{item.name}</span>
                {isRemovable && <img className='list__remove-icon'
                    src={removeSvg}
                    alt='remove icon'
                    onClick={ () =>removeList(item)} />}
            </li>))}
    </ul>
}

export default List;