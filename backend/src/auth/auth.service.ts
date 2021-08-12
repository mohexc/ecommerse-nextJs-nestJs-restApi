import { Injectable } from '@nestjs/common';
import { SignInDTO } from './dto/signin-auth.dto';

@Injectable()
export class AuthService {
  signin(createAuthDto: SignInDTO) {
    return 'This action adds a new auth';
  }
  signup(createAuthDto: SignInDTO) {
    return 'This action adds a new auth';
  }
  signout(createAuthDto: SignInDTO) {
    return 'This action adds a new auth';
  }
  getProfile(createAuthDto: SignInDTO) {
    return 'This action adds a new auth';
  }
  changePassword(createAuthDto: SignInDTO) {
    return 'This action adds a new auth';
  }
}
