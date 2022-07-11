import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import IUser from '../interfaces/user';

export default class {
  private _secret = process.env.JWT_SECRET as string;

  private jwtConfig: jwt.SignOptions = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  public encode = (data: Omit<IUser, 'password'>): string => {
    const token = jwt.sign({ data }, this._secret, this.jwtConfig);
    return token;
  };

  public decode = (token: string): JwtPayload => {
    const decoded = jwt.verify(token, this._secret);

    return decoded as JwtPayload;
  };
}
