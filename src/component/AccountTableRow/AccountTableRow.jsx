import React, { useState } from 'react';
import { dateToString } from '@util';
import './AccountTableRow.css';
import EditableCell from '@component/EditableCell';
import ActionBar from '@component/ActionBar';

const AccountTableRow = ({
    transaction,
    handleTransactionChange
}) => {
    const [editing, setEditing] = useState(false);
    console.log(transaction);
    const {date, store, total, left, right} = transaction;

    return (
        <tr className={left + right !== total ? 'RedRow': null}>
            <td>{dateToString(date)}</td>
            <td>{store}</td>
            <EditableCell 
                edit={editing} 
                setEdit={setEditing} 
                value={total} 
                setValue={v => handleTransactionChange({...transaction, total: v})}
                notOriginal={total !== transaction.original.total}
            />
            <EditableCell 
                edit={editing} 
                setEdit={setEditing} 
                value={left} 
                setValue={v => handleTransactionChange({...transaction, left: v})}
                notOriginal={left !== transaction.original.left}
            />
            <EditableCell 
                edit={editing} 
                setEdit={setEditing} 
                value={right} 
                setValue={v => handleTransactionChange({...transaction, right: v})}
                notOriginal={right !== transaction.original.right}
            />
            <td><ActionBar transaction={transaction} handleTransactionChange={handleTransactionChange}/></td>
        </tr>
    );
};

export default AccountTableRow;