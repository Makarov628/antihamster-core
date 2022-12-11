import UserRepository from "../domain/repositories/user.repository";
import MarketSubscriptionRepository from "../domain/repositories/market-subscription.repository";
import { UserInfo } from "../infrastructure/user/info";
import Role from "../domain/enums/role.enum";
import User from "../domain/entities/user.entity";

class UserService {

    constructor(
        private userRepository: UserRepository,
        private marketSubscriptionRepository: MarketSubscriptionRepository,
        private userInfo: UserInfo
    ) { }

    private async addNewUser(nickname: string, role: Role): Promise<User> {
        const userInfo = await this.userInfo.getUserInfo(nickname)
        await this.userRepository.create({
            nickname,
            firstName: userInfo.lastName,
            lastName: userInfo.firstName,
            avatarUrl: userInfo.avatarUrl,
            role
        })

        // emit 'new_user'

        return (await this.userRepository.getByNickname(nickname))!
    }

    private async update(user: User): Promise<void> {
        await this.userRepository.update(user);
    }

    private async getBy(nickname: string): Promise<User | undefined> {
        return this.userRepository.getByNickname(nickname);
    }

    async signIn(nickname: string): Promise<User> {
        const user = await this.getBy(nickname)

        if (user !== undefined) {
            return user
        }

        return await this.addNewUser(nickname, Role.Guest)
    }

    async registerWithRole(nickname: string, role: Role): Promise<void> {
        const user = await this.getBy(nickname)

        if (user === undefined) {
            await this.addNewUser(nickname, role)
            return
        }

        if (user.role != role) {
            user.role = role;
            await this.update(user)
            // emit 'update_role'
        }
    }




    // TODO

    // get
    // getAllByRole
    // delete
    // findInfo

    // getSubscribers(market: Market)
    // subscribeTo(market: Market)
    // unsubscribeFrom(market: Market)
    

}

export { UserService }