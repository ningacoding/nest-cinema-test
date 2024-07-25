import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersController } from '../controllers/users.controller';
import { DatabaseModule } from '../dababase/database.module';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtService],
  exports: [UsersService],
})
export class UsersModule {}
