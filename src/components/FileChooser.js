import React from 'react';

const loadFileContent = async (file) => new Promise((resolve, reject) => {
    if (!file) {
        resolve();
        return;
    }
    const fr = new FileReader();
    fr.onload = (event) => {
        resolve(event.target.result);
    };
    fr.onerror = (err) => {
        reject(err);
    };
    fr.readAsText(file, 'cp1251');
});


const FileChooser = ({
    updateTransactions
}) => {
    return (
        <input 
            type="file" 
            id="file-selector" 
            onChange={event => loadFileContent(event.target.files[0]).then(updateTransactions)}
        ></input>
    );
};

export default FileChooser;