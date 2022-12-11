
interface IUserInfo {
    nickname: string;
    firstName: string | null;
    lastName: string | null;
    avatarUrl: URL | null;
}

abstract class UserInfo {
    abstract getUserInfo(nickname: string) : Promise<IUserInfo>
}

export { UserInfo, IUserInfo }
