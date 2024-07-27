import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { CreateAuditoriumDto } from '../dto/movies/create.auditorium.dto';
import { CreateMovieDto } from '../dto/movies/create.movie.dto';
import { CreateMovieFunctionDto } from '../dto/movies/create.movie.function.dto';
import { CreateSeatDto } from '../dto/movies/create.seat.dto';
import { MovieSeatsPurchaseDto } from '../dto/movies/movie.seats.purchase.dto';
import Auditorium from '../entities/auditorium.entity';
import Booking from '../entities/booking.entity';
import Movie from '../entities/movie.entity';
import MovieFunction from '../entities/movie.function.entity';
import Seat from '../entities/seat.entity';
import User from '../entities/user.entity';

@Injectable()
export class MoviesService {
  /**
   * Método para crear una película
   * @param userId
   * @param createProductDto
   */
  create(userId: number, createProductDto: CreateMovieDto) {
    const createProduct = createProductDto as any;
    createProduct.userId = userId;
    return Movie.create(createProduct);
  }

  /**
   * Método para crear un Auditorium
   * @param createAuditoriumDto
   */
  createAuditorium(createAuditoriumDto: CreateAuditoriumDto) {
    return Auditorium.create(createAuditoriumDto as any);
  }

  /**
   * Método para crear una función de película
   * @param createMovieFunctionDto
   */
  createMovieFunction(createMovieFunctionDto: CreateMovieFunctionDto) {
    return MovieFunction.create(createMovieFunctionDto as any);
  }

  /**
   * Método para obtener todas las películas
   */
  async findAll() {
    const moviesIds = await Movie.findAll({
      attributes: ['id'],
    });
    return await Promise.all(
      moviesIds.map((movie) => this.getMovieData(movie.id)),
    );
  }

  /**
   * Método para obtener una película por ID
   * @param id
   */
  findOne(id: number) {
    return Movie.findByPk(id, {
      raw: true,
    });
  }

  /**
   * Método para obtener todos los Auditoriums
   */
  findAllAuditoriums() {
    return Auditorium.findAll({
      raw: true,
    });
  }

  /**
   * Método para eliminar una película por id
   * @param id
   */
  remove(id: number) {
    return Movie.destroy({
      where: {
        id,
      },
    });
  }

  /**
   * Método para crear un Seat
   * @param seatDto
   */
  async createSeat(seatDto: CreateSeatDto) {
    return Seat.create(seatDto as any);
  }

  /**
   * Método para obtener todos los Seats,
   * dependiendo si están disponibles o no,
   * Si un Bookings ya está asociado a un Seat,
   * eso define si un Seat está ocupado o no.
   */
  async getSeatsInfo(
    movieFunctionId: number,
    auditoriumId: number,
    scheduledDate: Date,
  ) {
    const seats = await Seat.findAll({
      where: {
        auditoriumId,
      },
      include: [
        {
          model: Auditorium,
          attributes: ['name'],
        },
      ],
    });
    const bookings = await Booking.findAll({
      where: {
        scheduledDate,
        movieFunctionId,
      },
      include: [
        {
          model: Seat,
          where: {
            auditoriumId,
          },
        },
      ],
    });
    return seats.map((seat) => {
      const booking = bookings.find((b) => b.seatId === seat.id);
      return {
        ...seat.toJSON(),
        auditoriumName: seat.auditorium.name,
        available: !booking,
      };
    });
  }

  /**
   * Método para obtener un solo Seat,
   * dependiendo si están disponibles o no,
   * Si un Bookings ya está asociado a un Seat,
   * eso define si un Seat está ocupado o no.
   */
  async getSeatInfo(id: number) {
    const seat = await Seat.findByPk(id);
    const booking = await Booking.findOne({
      where: {
        seatId: id,
      },
    });
    return {
      ...seat.toJSON(),
      available: !booking,
    };
  }

  /**
   * Método para comprar un Seat disponible
   * @param userId
   * @param movieFunctionId
   * @param seatId
   */
  async purchaseAvailableSeatById(
    userId: number,
    movieFunctionId: number,
    seatId: number,
  ) {
    const seat = await this.getSeatInfo(seatId);
    if (!seat.available) {
      throw new Error('Seat is not available');
    }
    return Booking.create({
      userId,
      movieFunctionId,
      seatId,
    });
  }

  /**
   * Método para comprar varios Seats disponibles
   * @param userId
   * @param movieSeatsPurchaseDto
   */
  async seatsPurchase(
    userId: number,
    movieSeatsPurchaseDto: MovieSeatsPurchaseDto,
  ) {
    const scheduledDateMoment = moment(
      movieSeatsPurchaseDto.scheduledDate,
      'DD-MM-YYYY',
    );
    if (!scheduledDateMoment.isValid()) {
      throw new Error('Invalid scheduledDate');
    }
    const scheduledDate = scheduledDateMoment.toDate();
    const bulkCreate = [];
    for (const seatId of movieSeatsPurchaseDto.seatsIds) {
      bulkCreate.push({
        scheduledDate,
        movieFunctionId: movieSeatsPurchaseDto.movieFunctionId,
        userId,
        seatId,
      });
    }
    return Booking.bulkCreate(bulkCreate);
  }

  /**
   * obtiene los datos de la Movie incluyendo las funciones de MovieFunction
   * @param movieId
   */
  async getMovieData(movieId: number) {
    const movie = await Movie.findByPk(movieId);
    const movieFunctions = await MovieFunction.findAll({
      where: {
        movieId,
      },
    });
    return {
      ...movie.toJSON(),
      movieFunctions: movieFunctions.map((mf) => mf.toJSON()),
    };
  }

  /**
   * Obtiene la información de Booking por su ID
   * @param bookingId
   */
  async getBookingById(bookingId: number) {
    const booking = await Booking.findByPk(bookingId, {
      include: [
        {
          model: User,
          as: 'booker',
        },
        {
          model: Seat,
          include: [
            {
              model: Auditorium,
            },
          ],
        },
        {
          model: MovieFunction,
          include: [
            {
              model: Movie,
            },
          ],
        },
      ],
    });
    return booking.toJSON();
  }
}
