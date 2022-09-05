import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import mongoose from 'mongoose';
import { CreateMovieDTO } from 'src/movies/dto/create-movie.dto';

const url = 'mongodb://localhost:27017';
const dbName = 'movies-db';

mongoose.connect(`${url}/${dbName}`);

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return [...this.movies];
  }

  getOne(id: number): Movie {
    const foundMovie = this.movies.find((movie) => movie.id === id);

    if (!foundMovie) {
      throw new NotFoundException(`Movie with ID: ${id} not found!`);
    }
    return foundMovie;
  }

  deleteOne(id: number): boolean {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
    return;
  }

  createOne(movieData: CreateMovieDTO) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  updateOne(id: number, updateData) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
