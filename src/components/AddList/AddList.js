import React, { useState } from 'react';
import List from '../List/List';
import closeSvg from '../../assets/img/close.svg'

import './AddList.sass'
import Badge from '../Badge/Badge';

const AddList = ({ colors, onAdd }) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, selectColor] = useState(colors[0].id);
    const [inputValue, setInputValue] = useState('');

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
        const color = colors.filter(c => c.id === selectedColor)[0].name;
        onAdd({id: Math.random(), name: inputValue, color});
        onClose()
    }
    return (
        <div>
            <List
                click={() => setVisiblePopup(true)}
                items={[
                    {
                        className: 'list__add_button',
                        icon: (<svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                    {colors.map(color => {
                        return <Badge
                            onClick={() => selectColor(color.id)}
                            key={color.id}
                            color={color.name}
                            className={selectedColor === color.id && 'active'}
                        />
                    })}
                </div>

                <button className='button' onClick={addlist}>Add List</button>
            </div>}
        </div>
    )
}

export default AddList;