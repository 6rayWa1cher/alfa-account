import React, { useState } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import FileChooser from './FileChooser';
import { splitTransaction } from '../config';

import "../style/TransactionLoader.css";

const processFileContent = (fileText, dateFrom, dateTo) => {
    if (!fileText) {
        return;
    }
    console.log(fileText);
    const header = "Тип счёта;Номер счета;Валюта;Дата операции;Референс проводки;Описание операции;Приход;Расход;";
    const lines = fileText.split('\n');
    if (lines.length === 0) {
        alert("File content is empty!")
        return;
    }
    if (lines[0] !== header) {
        alert("Header didn't matched!");
        return;
    }
    const newTransactions = [];
    const descriptionRegexp = /^\d+\++\d+ +(?<store>[a-zA-Z0-9\\ ]+?) +(?<date1>\d\d\.\d\d\.\d\d) (?<date2>\d\d\.\d\d\.\d\d).+$/;
    const holdDescriptionRegexp = /^\d+ [a-zA-Z]+ (?<store>[a-zA-Z0-9\\ ]+?) \d+>[a-zA-Z ]+? (?<date1>\d\d\.\d\d\.\d\d) (?<date2>\d\d\.\d\d\.\d\d).+$/;
    lines.forEach(row => {
        if (header === row) return;
        const separated = row.split(';');
        delete separated[separated.length - 1];
        const [, , currency, , referrence, description, income, outcome] = separated;
        let m;
        if (referrence === 'HOLD') {
            m = holdDescriptionRegexp.exec(description);
        } else {
            m = descriptionRegexp.exec(description);
        }
        if (m === null) return;
        const {store, date2} = m.groups;
        const shortStore = store.substring(store.lastIndexOf('\\') + 1);
        const total = Math.round((parseFloat(income.replace(',', '.')) - parseFloat(outcome.replace(',', '.'))) * 100) / 100;
        const [left, right] = splitTransaction(shortStore, total);
        const [day, month, year] = date2.split('.');
        const newTransactionPart = {
            id: newTransactions.length,
            store: shortStore,
            date: new Date(+year + 2000, month - 1, day),
            total,
            currency,
            left,
            right
        };
        if (!(dateFrom <= newTransactionPart.date && newTransactionPart.date <= dateTo)) return;
        newTransactions.push({
            ...newTransactionPart,
            original: newTransactionPart
        });
    });
    newTransactions.sort((a, b) => -(a.date - b.date));
    return newTransactions;
};

const TransactionLoader = ({
    setTransations
}) => {
    const now = new Date();
    const [dateFrom, setDateFrom] = useState(new Date(now.getFullYear(), now.getMonth() - 1, now.getDay()));
    const [dateTo, setDateTo] = useState(now);

    const updateTransactions = (fileText) => {
        const nt = processFileContent(fileText, dateFrom, dateTo);
        setTransations(nt);
    }

    return (
        <div className="TransactionLoader">
            <div className="LeftPanel">
                <DateRangePicker value={[dateFrom, dateTo]} onChange={arr => {
                    const [from, to] = arr;
                    setDateFrom(from);
                    setDateTo(to);
                }}/>
            </div>
            <div className="RightPanel">
                <FileChooser updateTransactions={updateTransactions} />
            </div>
        </div>
    );
};

export default TransactionLoader;