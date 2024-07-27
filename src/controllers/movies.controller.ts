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
import { AuditoriumSerializer } from '../serializers/auditorium.serializer';
import { BookingSerializer } from '../serializers/booking.serializer';
import { MovieFunctionSerializer } from '../serializers/movie.function.serializer';
import { MovieSerializer } from '../serializers/movie.serializer';
import { PurchaseHistorySerializer } from '../serializers/purchase.history.serializer';
import { SeatSerializer } from '../serializers/seat.serializer';
import { MoviesService } from '../services/movies.service';
import { SuperController } from './super.controller';

@UseGuards(RolesGuard)
@Controller('movies')
export class MoviesController extends SuperController {
  constructor(private readonly moviesService: MoviesService) {
    super();
  }

  @Get()
  async findAll() {
    return super.success(await this.moviesService.findAll(), MovieSerializer);
  }

  @Get('/auditoriums')
  async findAllAuditoriums() {
    return super.success(
      await this.moviesService.findAllAuditoriums(),
      AuditoriumSerializer,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RoleEnum.Admin)
  @Post()
  async create(@Body() createMovieDto: CreateMovieDto, @Request() req?) {
    return super.success(
      await this.moviesService.create(req?.user?.id, createMovieDto),
      MovieSerializer,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RoleEnum.Admin)
  @Post('/auditorium')
  async createAuditorium(@Body() createAuditoriumDto: CreateAuditoriumDto) {
    return super.success(
      await this.moviesService.createAuditorium(createAuditoriumDto),
      AuditoriumSerializer,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Roles(RoleEnum.Admin)
  @Post('/function')
  async createMovieFunction(
    @Body() createMovieFunctionDto: CreateMovieFunctionDto,
  ) {
    return super.success(
      await this.moviesService.createMovieFunction(createMovieFunctionDto),
      MovieFunctionSerializer,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('seats/:movieFunctionId/:auditoriumId/:date')
  async getSeatsInfo(
    @Param('movieFunctionId', ParseIntPipe) movieFunctionId: number,
    @Param('auditoriumId', ParseIntPipe) auditoriumId: number,
    @Param('date') dateString: string,
  ) {
    return super.success(
      await this.moviesService.getSeatsInfo(
        movieFunctionId,
        auditoriumId,
        moment(dateString, 'DD-MM-YYYY').toDate(),
      ),
      SeatSerializer,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('seats/purchase')
  async postSeatsPurchase(
    @Request() req,
    @Body() movieSeatsPurchaseDto: MovieSeatsPurchaseDto,
  ) {
    return super.success(
      await this.moviesService.seatsPurchase(
        req.user.id,
        movieSeatsPurchaseDto,
      ),
      PurchaseHistorySerializer,
    );
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

  @UseGuards(JwtAuthGuard)
  @Get('booking/:id')
  async getBookingById(@Param('id') id: string) {
    return super.success(
      await this.moviesService.getBookingById(+id),
      BookingSerializer,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('purchase/:id')
  async getPurchaseId(@Request() req, @Param('id') id: string) {
    return super.success(
      await this.moviesService.getPurchaseById(req.user.id, id),
      PurchaseHistorySerializer,
    );
  }
}
