import Role from "../enums/role.enum";

class User {

    public readonly id: string;
    public readonly nickname: string;
    public firstName: string | null;
    public lastName: string | null;
    public avatarUrl: URL | null;
    public role: Role;

    constructor(
        _id: string,
        _nickname: string,
        _firstName: string | null,
        _lastName: string | null,
        _avatarUrl: URL | null, 
        _role: Role
    ) {
        this.id = _id == '' ? _nickname : _id
        this.nickname = _nickname
        this.firstName = _firstName
        this.lastName = _lastName
        this.avatarUrl = _avatarUrl
        this.role = _role
    }
}

export default User;