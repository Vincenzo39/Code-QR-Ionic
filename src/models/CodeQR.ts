import { User } from './User';

export class CodeQR {
    
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

    private _Data: string;
    get Data(): string {
        return this._Data;
    }
    set Data(newData: string) {
        this._Data = newData;
    }

    private _Width: number;
    get Width(): number {
        return this._Width;
    }
    set Width(newWidth: number) {
        this._Width = newWidth;
    }

    private _Height: number;
    get Height(): number {
        return this._Height;
    }
    set Height(newHeight: number) {
        this._Height = newHeight;
    }

    private _IdGroup: number;
    get IdGroup(): number {
        return this._IdGroup;
    }
    set IdGroup(newIdGroup: number) {
        this._IdGroup = newIdGroup;
    }

    private _IdUserCreator: number;
    get IdUserCreator(): number {
        return this._IdUserCreator;
    }
    set IdUserCreator(newIdUserCreator: number) {
        this._IdUserCreator = newIdUserCreator;
    }

    private _UserCreator: User;
    get UserCreator(): User {
        return this._UserCreator;
    }
    set UserCreator(newUserCreator: User) {
        this._UserCreator = newUserCreator;
    }

    private _CodeQR_Base64: string;
    get CodeQR_Base64(): string {
        return this._CodeQR_Base64;
    }
    set CodeQR_Base64(newCodeQR_Base64: string) {
        this._CodeQR_Base64 = newCodeQR_Base64;
    }
}