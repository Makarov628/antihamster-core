import User from "../entities/user.entity";
import Role from "../enums/role.enum";
import { ICreateUserDto } from "./dtos/user.dto";

abstract class UserRepository {
    abstract getListByRole(role: Role): Promise<User[]>;
    abstract getByNickname(nickname: string): Promise<User | undefined>
    abstract getAll(): Promise<User[]>;

    abstract create(user: ICreateUserDto): Promise<void>;
    abstract update(user: User): Promise<void>
    abstract delete(userId: string): Promise<void>;
}

export default UserRepository;