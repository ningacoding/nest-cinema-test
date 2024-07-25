import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import configuration from '../config/configuration';
import { AppController } from '../controllers/app.controller';
import { UsersController } from '../controllers/users.controller';
import { DatabaseModule } from '../dababase/database.module';
import { AppService } from '../services/app.service';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { LocalStrategy } from '../strategies/local.strategy';
import { AuthModule } from './auth.module';
import { MoviesModule } from './movies.module';
import { UsersModule } from './users.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    MoviesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, AuthService, UsersService, LocalStrategy, JwtService],
})
export class AppModule {}
