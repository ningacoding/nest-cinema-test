import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from '../../src/config/configuration';
import { MoviesController } from '../../src/controllers/movies.controller';
import { DatabaseModule } from '../../src/dababase/database.module';
import { AuthModule } from '../../src/modules/auth.module';
import { MoviesService } from '../../src/services/movies.service';

describe('ProductsService', () => {
  let moviesService: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        DatabaseModule,
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration],
        }),
        MoviesService,
      ],
      controllers: [MoviesController],
      providers: [MoviesService],
    }).compile();

    moviesService = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(moviesService).toBeDefined();
  });
});
