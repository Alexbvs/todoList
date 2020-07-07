import React from 'react';
import classNames from 'classnames'
import removeSvg from '../../assets/img/remove.svg'

import './List.sass'
import Badge from '../Badge/Badge';
import axios from 'axios';
import { instance } from '../../api/api';


const List = ({ items, isRemovable, click,  onRemove, onClickItem, activeItem }) => {

    const removeList = (item) => {
        if (window.confirm('Are you sure you want to delete the list?')) {
            instance.delete('lists/' + item.id).then(() => {
                onRemove(item.id)
            })
        }
    }
    return <ul onClick={click} className='list'>
        {items.map((item, index) => (
            <li key={index}
                className={classNames(item.className, {
                    active: item.active
                        ? item.active
                        : activeItem && activeItem.id === item.id
                })}
                onClick={onClickItem ? () => onClickItem(item) : null}>
                <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>

                <span className='list__name'>
                    {item.name}
                    <span className='list__length'>
                    {item.tasks && ` (${item.tasks.length})`}
                    </span>
                </span>
                {isRemovable && <img className='list__remove-icon'
                    src={removeSvg}
                    alt='remove icon'
                    onClick={() => removeList(item)} />}
            </li>))}
    </ul>
}

export default List;