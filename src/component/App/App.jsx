import React, { useState } from 'react';

import './App.css';
import AccountTable from '@component/AccountTable';
import TransactionLoader from '@component/TransactionLoader';
import TransactionStats from '@component/TransactionStats';

let defaultTransactions = [
    {id: 0, store: 'PEREKRESTOK', date: new Date(), total: -850.23, left: 0, right: -850.23,
    original: {id: 0, store: 'PEREKRESTOK', date: new Date(), total: -850.23, left: 0, right: -850.23}}
];

const App = () => {
    const [transactions, setTransations] = useState(defaultTransactions);

    const handleTransactionChange = (t) => {
        const newTransactions = transactions.map(t1 => t1.id === t.id ? t : t1);
        setTransations(newTransactions);
    };

    return (
        <div className='Container'>
            <div className='Top'>
                <TransactionStats transactions={transactions}/>
                <TransactionLoader setTransations={setTransations}/>
            </div>
            <div className='Content'>
                <AccountTable transactions={transactions} handleTransactionChange={handleTransactionChange}/>
            </div>
        </div>
    );
};

export default App;
