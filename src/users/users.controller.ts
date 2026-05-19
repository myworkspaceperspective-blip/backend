import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtPayload } from '../auth/strategies/jwt.strategy';
import { Role } from '@prisma/client';

interface RequestWithUser extends Request {
  user: JwtPayload;
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}

  @Get('me')
  getMe(@Req() req: RequestWithUser) {
    return this.users.findById(req.user.sub);
  }

  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.users.findAll();
  }

  @Roles(Role.ADMIN)
  @Get('stats')
  async getStats() {
    const [total, admins] = await Promise.all([
      this.users.totalCount(),
      this.users.countByRole(Role.ADMIN),
    ]);
    return { total, admins };
  }
}
