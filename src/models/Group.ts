import { UserGroup } from './UserGroup';
import { User } from './User';
import { CodeQR } from './CodeQR';

export class Group {
    
    private _Id: number;
    get Id(): number {
        return this._Id;
    }
    set Id(newId: number) {
        this._Id = newId;
    }

    private _Name: string;
    get Name(): string {
        return this._Name;
    }
    set Name(newName: string) {
        this._Name = newName;
    }

    private _Description: string;
    get Description(): string {
        return this._Description;
    }
    set Description(newDescription: string) {
        this._Description = newDescription;
    }

    private _IdUserOwner: number;
    get IdUserOwner(): number {
        return this._IdUserOwner;
    }
    set IdUserOwner(newIdUserOwner: number) {
        this._IdUserOwner = newIdUserOwner;
    }

    private _IdCodeQR: number;
    get IdCodeQR(): number {
        return this._IdCodeQR;
    }
    set IdCodeQR(newIdCodeQR: number) {
        this._IdCodeQR = newIdCodeQR;
    }

    private _LstUser: UserGroup[];
    get LstUser(): UserGroup[] {
        return this._LstUser;
    }
    set LstUser(newLstUser: UserGroup[]) {
        this._LstUser = newLstUser;
    }

    private _UserOwner: User;
    get UserOwner(): User {
        return this._UserOwner;
    }
    set UserOwner(newUserOwner: User) {
        this._UserOwner = newUserOwner;
    }

    private _CodeQR: CodeQR;
    get CodeQR(): CodeQR {
        return this._CodeQR;
    }
    set CodeQR(newCodeQR: CodeQR) {
        this._CodeQR = newCodeQR;
    }
}