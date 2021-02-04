import React from 'react';
import { moneyRound } from '../utils';

const TransactionStats = ({
    transactions
}) => {
    const leftSum = transactions.map(t => t.left).reduce((acc, curr) => moneyRound(acc + curr));
    const rightSum = transactions.map(t => t.right).reduce((acc, curr) => moneyRound(acc + curr));
    return (
        <>
            <div>
                <span>Личный</span>
                <span className="LeftSum">
                    {leftSum}
                </span>
            </div>
            
            <div>
                <span>Возвратный</span> 
                <span className="RightSum">
                    {rightSum}
                </span>
            </div>
        </>
    )
};

export default TransactionStats;