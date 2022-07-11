import * as bcrypt from 'bcryptjs';
import Users from '../models/users';
import generateError from '../utils/generateError';
import Jwt from '../utils/jwt';

export default class UserService {
  private _jwt = new Jwt();

  public login = async (password: string, email: string) => {
    const user = await Users.findOne({ where: { email } });

    if (!user) throw generateError(401, 'Incorrect email or password');

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) throw generateError(401, 'Incorrect email or password');

    const { id, username, role } = user;

    const token = this._jwt.encode({ id, username, email, role });

    return token;
  };
}
