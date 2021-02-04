import React from 'react';
import AccountTableRow from '@component/AccountTableRow';
import './AccountTable.css';

const AccountTable = ({
    transactions,
    handleTransactionChange
}) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Дата</th>
                    <th>Магазин</th>
                    <th>Сумма</th>
                    <th>Личный</th>
                    <th>Возвратный</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map(t => (
                    <AccountTableRow 
                        key={t.id} 
                        transaction={t} 
                        handleTransactionChange={handleTransactionChange} />
                ))}
            </tbody>
        </table>
    );
};

export default AccountTable;