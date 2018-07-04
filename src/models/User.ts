import { UserGroup } from './UserGroup';

export class User {
    
    private _Id: number;
    get Id(): number {
        return this._Id;
    }
    set Id(newId: number) {
        this._Id = newId;
    }

    private _FirstName: string;
    get FirstName(): string {
        return this._FirstName;
    }
    set FirstName(newFirstName: string) {
        this._FirstName = newFirstName;
    }

    private _LastName: string;
    get LastName(): string {
        return this._LastName;
    }
    set LastName(newLastName: string) {
        this._LastName = newLastName;
    }

    private _Email: string;
    get Email(): string {
        return this._Email;
    }
    set Email(newEmail: string) {
        this._Email = newEmail;
    }

    private _Password: string;
    get Password(): string {
        return this._Password;
    }
    set Password(newPassword: string) {
        this._Password = newPassword;
    }

    private _ConfirmPassword: string;
    get ConfirmPassword(): string {
        return this._ConfirmPassword;
    }
    set ConfirmPassword(newConfirmPassword: string) {
        this._ConfirmPassword = newConfirmPassword;
    }

    private _Token: string;
    get Token(): string {
        return this._Token;
    }
    set Token(newToken: string) {
        this._Token = newToken;
    }

    private _LstGroup: UserGroup[];
    get LstGroup(): UserGroup[] {
        return this._LstGroup;
    }
    set LstGroup(newLstGroup: UserGroup[]) {
        this._LstGroup = newLstGroup;
    }
}