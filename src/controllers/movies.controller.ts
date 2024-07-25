import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import * as moment from 'moment';
import { RoleEnum } from '../constants/role.enum';
import { Roles } from '../decorators/role.decorator';
import { CreateAuditoriumDto } from '../dto/movies/create.auditorium.dto';
import { CreateMovieDto } from '../dto/movies/create.movie.dto';
import { CreateMovieFunctionDto } from '../dto/movies/create.movie.function.dto';
import { MovieSeatsPurchaseDto } from '../dto/movies/movie.seats.purchase.dto';
import { JwtAuthGuard } from '../guards/jwt.auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { MovieSerializer } from '../serializers/movie.serializer';
import { MoviesService } from '../services/movies.service';
import { SuperController } from './super.controller';

@UseGuards(RolesGuard)
@Controller('movies')
export class MoviesController extends SuperController {
  constructor(private readonly moviesService: MoviesService) {
    super();
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RoleEnum.Admin)
  @Post()
  create(@Body() createMovieDto: CreateMovieDto, @Request() req?) {
    return this.moviesService.create(req?.user?.id, createMovieDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RoleEnum.Admin)
  @Post('/auditorium')
  createAuditorium(@Body() createAuditoriumDto: CreateAuditoriumDto) {
    return this.moviesService.createAuditorium(createAuditoriumDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RoleEnum.Admin)
  @Post('/function')
  createMovieFunction(@Body() createMovieFunctionDto: CreateMovieFunctionDto) {
    return this.moviesService.createMovieFunction(createMovieFunctionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('seats/:movieFunctionId/:auditoriumId/:date')
  getSeatsInfo(
    @Param('movieFunctionId', ParseIntPipe) movieFunctionId: number,
    @Param('auditoriumId', ParseIntPipe) auditoriumId: number,
    @Param('date') dateString: string,
  ) {
    return this.moviesService.getSeatsInfo(
      movieFunctionId,
      auditoriumId,
      moment(dateString, 'DD-MM-YYYY').toDate(),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('seats/purchase')
  postSeatsPurchase(
    @Request() req,
    @Body() movieSeatsPurchaseDto: MovieSeatsPurchaseDto,
  ) {
    return this.moviesService.seatsPurchase(req.user.id, movieSeatsPurchaseDto);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get('/auditoriums')
  findAllAuditoriums() {
    return this.moviesService.findAllAuditoriums();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getMovieData(@Param('id') id: string) {
    return super.success(
      await this.moviesService.getMovieData(+id),
      MovieSerializer,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RoleEnum.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }
}
