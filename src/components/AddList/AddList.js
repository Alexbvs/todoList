import React, { useState, useEffect } from 'react';
import List from '../List/List';
import closeSvg from '../../assets/img/close.svg'

import './AddList.sass'
import Badge from '../Badge/Badge';
import axios from 'axios';

const AddList = ({ colors, onAdd }) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, selectColor] = useState(3);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (Array.isArray(colors)) {
            selectColor(colors[0].id)
        }
    }, [colors])

    const onClose = () => {
        setVisiblePopup(false);
        setInputValue('');
        selectColor(colors[0].id);
    };

    const addlist = () => {
        if (!inputValue) {
            alert('no');
            return
        }
        setIsLoading(true);

        axios.post('http://localhost:3001/lists', {
            name: inputValue,
            colorId: selectedColor
          })
          .then(({ data }) => {
            const color = colors.filter(c => c.id === selectedColor)[0];
            const listObj = { ...data, color, tasks: [] };
            onAdd(listObj);
            onClose();
          })
          .catch(() => {
            alert('Error adding list!');
          })
          .finally(() => {
            setIsLoading(false);
            });

    }
    return (
        <div>
            <List
                click={() => setVisiblePopup(true)}
                items={[
                    {
                        className: 'list__add_button',
                        icon: (<svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>),
                        name: 'Add list'
                    }
                ]} />

            {visiblePopup && <div className="add-list__popup">
                <img src={closeSvg} alt='close button'
                    className="add-list__popup-close"
                    onClick={onClose} />

                <input value={inputValue}
                    onChange={event => setInputValue(event.target.value)}
                    className='field' type="text" placeholder='List Name' />

                <div className="add-list__popup-colors">
                    {colors.map(color => ( <Badge
                            onClick={() => selectColor(color.id)}
                            key={color.id}
                            color={color.name}
                            className={selectedColor === color.id && 'active'}
                        />
                    ))}
                </div>

                <button className='button' onClick={addlist}>{isLoading ? 'Adding...' : 'Add list'}</button>
            </div>}
        </div>
    )
}

export default AddList;