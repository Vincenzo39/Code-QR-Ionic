import { User } from './User';
import { Group } from './Group';

export class UserGroup {
    
    private _IdUser: number;
    get IdUser(): number {
        return this._IdUser;
    }
    set IdUser(newIdUser: number) {
        this._IdUser = newIdUser;
    }

    private _IdGroup: number;
    get IdGroup(): number {
        return this._IdGroup;
    }
    set IdGroup(newIdGroup: number) {
        this._IdGroup = newIdGroup;
    }

    private _User: User;
    get User(): User {
        return this._User;
    }
    set User(newUser: User) {
        this._User = newUser;
    }

    private _Group: Group;
    get Group(): Group {
        return this._Group;
    }
    set Group(newGroup: Group) {
        this._Group = newGroup;
    }
}