import React, { useState } from 'react';

import '../style/EditableCell.css';

const EditableCell = ({
    edit,
    setEdit,
    value,
    setValue,
    notOriginal
}) => {
    const [innerValue, setInnerValue] = useState("" + value);

    const className = notOriginal ? "ChangedCell" : "";
    if (edit) {
        return (
            <td className={className}>
                <input 
                    type="text" 
                    onChange={evt => {
                        const val = evt.target.value.replace(',', '.');
                        if (/^-?\d+(\.\d?\d?)?$/.test(val)) {
                            setInnerValue(val);
                            setValue(parseFloat(val));
                        }
                    }} 
                    value={innerValue}
                    onKeyUp={evt => {
                        if (evt.key === 'Enter') setEdit(false);
                    }}/>
            </td>
        );
    } else {
        return (
            <td 
                className={className} 
                onClick={() => {
                    setInnerValue(value);
                    setEdit(true);
                }}
            >
                {value}
            </td>
        );
    }
};

export default EditableCell;