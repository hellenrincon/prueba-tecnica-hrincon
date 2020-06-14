import { environment } from 'src/environments/environment';
import *as actionCountBase from './../actions/counter.actions';


export const initialState = 0;
const newState = (state, newData) => {
  return Object.assign({}, state, newData);
}


export type Action = actionCountBase.All;
export const defaulValue: any = { valor: environment.baseDia };

export function counterReducer(state: any = defaulValue, action: Action) {
  switch (action.type) {
    case actionCountBase.decrement:
      return newState(state, { valor: (state.valor - action.valor) });
    case actionCountBase.increment:
      return newState(state, { valor: (state.valor + action.valor) });
    default:
      break;
  }
}
