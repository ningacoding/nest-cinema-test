import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import Auditorium from '../entities/auditorium.entity';
import Booking from '../entities/booking.entity';
import Movie from '../entities/movie.entity';
import MovieFunction from '../entities/movie.function.entity';
import Role from '../entities/role.entity';
import Seat from '../entities/seat.entity';
import User from '../entities/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        models: [Role, Movie, Auditorium, User, Booking, Seat, MovieFunction],
        logQueryParameters: true,
        ssl: true,
        dialectOptions: {
          ssl: {
            ca: configService.get<string>('database.cert'),
          },
        },
      });
      await sequelize.sync();
      return sequelize;
    },
  },
];
