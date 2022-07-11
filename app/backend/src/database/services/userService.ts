import * as bcrypt from 'bcryptjs';
import Users from '../models/users';
import generateError from '../utils/generateError';

export default class UserService {
  public login = async (password: string, email: string) => {
    const user = await Users.findOne({ where: { email } });

    if (!user) throw generateError(401, 'incorrect email or password');

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) throw generateError(401, 'incorrect email or password');

    return user;
  };
}
