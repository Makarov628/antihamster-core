import Role from "../../enums/role.enum";

interface ICreateUserDto {
    nickname: string;
    firstName: string | null;
    lastName: string | null;
    avatarUrl: URL | null;
    role: Role;
}

export {
    ICreateUserDto
}