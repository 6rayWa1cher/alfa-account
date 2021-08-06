import { moneyRound } from './util';

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
        case "PEREKRESTOK B":
        case "BISTRO ARZI 1":
            return splitStrategies.fullSecond(total);
        case "IP LINDIN YU":
        case "HYPE PLACE OL":
        case "YM ozon":
        case "STEAMGAMES CO":
            return splitStrategies.fullFirst(total);
        case "HAPPY BURGER":
        case "CHICKEN HOUSE":
        case "MCDONALDS 245":
        case "OOO OBED":
        case "BREAKFAST BAN":
        case "O ESKIMO":
            return splitStrategies.half(total);
        default:
            return splitStrategies.default(total);
    }
};
