import { Controller } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('me')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
