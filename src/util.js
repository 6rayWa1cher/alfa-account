export const dateToString = (dateIn) => {
    const yyyy = dateIn.getFullYear();
    const mm = dateIn.getMonth() + 1;
    const dd = dateIn.getDate();
    let out = '';
    out += dd < 10 ? '0' + dd : dd;
    out += '-';
    out += mm < 10 ? '0' + mm : mm;
    out += '-';
    out += yyyy;
    return out;
};

export const moneyRound = (amount) => Math.round(amount * 100) / 100;