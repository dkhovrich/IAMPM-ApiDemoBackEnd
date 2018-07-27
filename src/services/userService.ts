import BaseService from './baseService';
import { IUserDto, UserDto, User, IUserModel } from '../models/userModel';

class UserService extends BaseService {
    async login(email: string): Promise<IUserDto> {
        return await this.handleConnection<IUserDto>(async () => {
            let user: IUserModel = await User.findOne({ email });
            if (!user) {
                user = await User.create({ email });
            }

            return UserDto.create(user);
        });
    }
}

export default new UserService();