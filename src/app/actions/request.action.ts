import { Action } from '@ngrx/store';

export const ADD = '[IRequest] Edit';
export const MODIFY = '[IRequest] Modify';
export const RESET = '[IRequest] Reset';


export class Add implements Action {
    readonly type = ADD;
    public constructor(public valor: any) { }
}

export class Modify implements Action {
    readonly type = MODIFY;
}

export class Reset implements Action {
    readonly type = RESET;
}

export type All = Add | Modify | Reset;