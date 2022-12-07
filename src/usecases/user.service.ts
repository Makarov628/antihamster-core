import UserRepository from "../domain/repositories/user.repository";
import MarketSubscriptionRepository from "../domain/repositories/market-subscription.repository";
import { UserInfo } from "../infrastructure/user/info";
import Role from "../domain/enums/role.enum";

class UserService {

    constructor(
        private userRepository: UserRepository,
        private marketSubscriptionRepository: MarketSubscriptionRepository,
        private userInfo: UserInfo
    ) { }

    private async addNewUser(nickname: string, role: Role): Promise<void> {
        const userInfo = await this.userInfo.getUserInfo(nickname)
        await this.userRepository.create({
            nickname,
            firstName: userInfo.lastName,
            lastName: userInfo.firstName,
            avatarUrl: userInfo.avatarUrl,
            role
        })
    }
    
    // TODO

    // get
    // findInfo

    // registerGuest -> if new, emit 'NEW GUEST'
    // registerSubscriber
    // registerAdministrator
}

export { UserService }