import { Controller, Get, Post, Body, } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/signin-auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/signin')
  signin(@Body() createAuthDto: SignInDTO) {
    return
  }
  @Post('/signup')
  signup(@Body() createAuthDto: SignInDTO) {
    return
  }
  @Post('/signout')
  signout(@Body() createAuthDto: SignInDTO) {
    return
  }
  @Get('/me')
  getMe(@Body() createAuthDto: SignInDTO) {
    return
  }
  @Post('/changepassword')
  changePassword(@Body() createAuthDto: SignInDTO) {
    return
  }


}
