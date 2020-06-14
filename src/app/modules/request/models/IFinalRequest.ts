import { IUser } from 'src/app/models/iuser';

export interface IFinalRequest {
    request: number;
    user: IUser,
    dateRequest: Date;
    datePay?: Date;
    status: string
}