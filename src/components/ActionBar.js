import React from 'react';
import { splitStrategies } from '../config';

const ActionBar = ({
    transaction,
    handleTransactionChange
}) => {
    const splitAction = (func) => () => {
        const { total } = transaction;
        const [left, right] = func(total);
        handleTransactionChange({...transaction, left, right});
    };
    const reset = () => {
        handleTransactionChange({...transaction, ...transaction.original});
    };
    return (
        <>
            <input type='button' onClick={splitAction(splitStrategies.fullFirst)} value="<==" />
            <input type='button' onClick={splitAction(splitStrategies.half)} value="1/2" />
            <input type='button' onClick={splitAction(splitStrategies.fullSecond)} value="==>" />
            <input type='button' onClick={reset} value="reset" />
        </>
    );
};

export default ActionBar;