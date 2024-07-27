import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from '../../src/config/configuration';
import { MoviesController } from '../../src/controllers/movies.controller';
import { DatabaseModule } from '../../src/dababase/database.module';
import { CreateAuditoriumDto } from '../../src/dto/movies/create.auditorium.dto';
import { CreateMovieDto } from '../../src/dto/movies/create.movie.dto';
import { CreateMovieFunctionDto } from '../../src/dto/movies/create.movie.function.dto';
import { CreateSeatDto } from '../../src/dto/movies/create.seat.dto';
import Movie from '../../src/entities/movie.entity';
import { AuthModule } from '../../src/modules/auth.module';
import { MoviesService } from '../../src/services/movies.service';

describe('ProductsController', () => {
  let moviesController: MoviesController;
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

    moviesController = module.get<MoviesController>(MoviesController);
    moviesService = module.get<MoviesService>(MoviesService);
  });

  it('should create A,B,C auditoriums', async () => {
    const newAuditoriumA = new CreateAuditoriumDto();
    newAuditoriumA.name = 'Sala A';
    const resultAuditoriumA = await moviesController.createAuditorium(
      newAuditoriumA,
    );
    const newAuditoriumB = new CreateAuditoriumDto();
    newAuditoriumB.name = 'Sala B';
    const resultAuditoriumB = await moviesController.createAuditorium(
      newAuditoriumB,
    );
    const newAuditoriumC = new CreateAuditoriumDto();
    newAuditoriumC.name = 'Sala C';
    const resultAuditoriumC = await moviesController.createAuditorium(
      newAuditoriumC,
    );
    expect(
      !!resultAuditoriumA.data.id &&
        !!resultAuditoriumB.data.id &&
        !!resultAuditoriumC.data.id,
    ).toBeTruthy();
  });

  it('should create a new movie', async () => {
    const newMovie = new CreateMovieDto();
    newMovie.name = 'Mi pobre angelito';
    newMovie.coverImageUrl = `https://picsum.photos/600`;
    newMovie.durationInMinutes = 60 * 1.5;
    const result = await moviesController.create(newMovie);
    expect(result.data.id).toBeDefined();
  });

  it('should create required movie functions', async () => {
    const createMovieFunction15HrsDto = new CreateMovieFunctionDto();
    const mainMovie = await Movie.findOne();
    createMovieFunction15HrsDto.movieId = mainMovie.id;
    createMovieFunction15HrsDto.shownAt24HoursFormat = 15;
    const result15Hrs = await moviesController.createMovieFunction(
      createMovieFunction15HrsDto,
    );
    const createMovieFunction17HrsDto = Object.assign(
      {},
      createMovieFunction15HrsDto,
    );
    createMovieFunction17HrsDto.shownAt24HoursFormat = 17;
    const result17Hrs = await moviesController.createMovieFunction(
      createMovieFunction17HrsDto,
    );
    const createMovieFunction19HrsDto = Object.assign(
      {},
      createMovieFunction15HrsDto,
    );
    createMovieFunction19HrsDto.shownAt24HoursFormat = 19;
    const result19Hrs = await moviesController.createMovieFunction(
      createMovieFunction19HrsDto,
    );
    expect(
      !!result15Hrs.data.id && !!result17Hrs.data.id && !!result19Hrs.data.id,
    ).toBeTruthy();
  });

  it('should create required available seats', async () => {
    let createdObjects = 0;
    const availableAuditoriums = await moviesService.findAllAuditoriums();
    for (const auditorium of availableAuditoriums) {
      for (let i = 1; i < (auditorium.id === 3 ? 31 : 21); i++) {
        const seatDto = new CreateSeatDto();
        seatDto.auditoriumId = auditorium.id;
        seatDto.seatNumber = i;
        await moviesService.createSeat(seatDto);
        createdObjects++;
      }
    }
    expect(createdObjects).toEqual(60);
  });

  it('should purchase an available seat', async () => {
    const seatId = 25;
    const movieFunctionId = 1;
    const userId = 2;
    const result = await moviesService.purchaseAvailableSeatById(
      userId,
      movieFunctionId,
      seatId,
    );
    expect(result).toBeDefined();
  });
});
