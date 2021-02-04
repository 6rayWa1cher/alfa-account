import { moneyRound } from './utils';

export const splitStrategies = {
    fullFirst: (total) => [total, 0],
    fullSecond: (total) => [0, total],
    half: (total) => {
        const left = moneyRound(total/2);
        const right = total - left;
        return [left, right];
    },
    default: (total) => [0, 0]
};

export const splitTransaction = (store, total) => {
    switch(store) {
        case "PEREKRESTOK":
        case "PYATEROCHKA":
        case "PYATEROCHKA 1":
        case "TRANSPORTTVER":
        case "APTECHNOE UCH":
        case "APTEKA":
        case "MODUS":
        case "KRASNOE BELOE":
            return splitStrategies.fullSecond(total);
        case "IP LINDIN YU":
        case "HYPE PLACE OL":
            return splitStrategies.fullFirst(total);
        case "HAPPY BURGER":
        case "CHICKEN HOUSE":
            return splitStrategies.half(total);
        default:
            return splitStrategies.default(total);
    }
};