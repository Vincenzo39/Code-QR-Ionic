import { User } from './User';
import { CodeQR } from './CodeQR';

export class ScanQR {
    
    private _IdUser: number;
    get IdUser(): number {
        return this._IdUser;
    }
    set IdUser(newIdUser: number) {
        this._IdUser = newIdUser;
    }

    private _IdCodeQR: number;
    get IdCodeQR(): number {
        return this._IdCodeQR;
    }
    set IdCodeQR(newIdCodeQR: number) {
        this._IdCodeQR = newIdCodeQR;
    }

    private _Date: Date;
    get Date(): Date {
        return this._Date;
    }
    set Date(newDate: Date) {
        this._Date = newDate;
    }

    private _Data: string;
    get Data(): string {
        return this._Data;
    }
    set Data(newData: string) {
        this._Data = newData;
    }

    private _User: User;
    get User(): User {
        return this._User;
    }
    set User(newUser: User) {
        this._User = newUser;
    }

    private _CodeQR: CodeQR;
    get CodeQR(): CodeQR {
        return this._CodeQR;
    }
    set CodeQR(newCodeQR: CodeQR) {
        this._CodeQR = newCodeQR;
    }
}