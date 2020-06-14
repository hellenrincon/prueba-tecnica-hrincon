export interface IRequestCredit {
    id?: string,
    idUser: number,
    value: number,
    state: string,
    datePay: Date,
    dateRequeste: Date,
    pay: boolean,
    approved?:boolean
}