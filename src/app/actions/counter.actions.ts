import { Action } from '@ngrx/store';

export const increment = '[Counter Component] Increment';
export const decrement = '[Counter Component] Decrement';

export class decrementBase implements Action {
    readonly type = decrement;
    public constructor(public valor: number) { }
}

export class incrementBase implements Action {
    readonly type = increment;
    public constructor(public valor: number) { }
}

export type All = decrementBase | incrementBase;