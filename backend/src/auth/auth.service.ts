import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInDTO } from './dto/signin-auth.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

}
