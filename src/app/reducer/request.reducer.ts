import * as requestAntion from './../actions/request.action';
import { IRequest } from '../models/IRequest';

export type Action = requestAntion.All;
export const defaultIRequest: IRequest = { valor: 0 };

const newState = (state, newData) => {
    return Object.assign({}, state, newData);
}

export function creditReducer(state: IRequest = defaultIRequest, action: Action) {
    switch (action.type) {
        case requestAntion.ADD:
            return newState(state, { valor: action.valor });
        default:
            break;
    }
}

