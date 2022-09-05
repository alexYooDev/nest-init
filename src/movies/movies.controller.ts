import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

/**Controllers
 * What controllers do : takes urls and executes function
 */
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  // @Get('search')
  // search(@Query('year') searchYear: string) {
  //   return `We are searching for a movie made after: ${searchYear}`;
  // }

  /** returns all the movies
   * @returns {Array} : array that contains movies object
   */

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  /** returns one of the movies
   * @param {id} : movie id
   * @returns {object} : movie object
   */
  @Get('/:id')
  getOne(@Param('id') id: string): Movie {
    return this.moviesService.getOne(id);
  }

  /**
   * add a movie object to the movies array
   */
  @Post()
  createOne(@Body() movieData: object) {
    return this.moviesService.createOne(movieData);
  }

  /**
   * Deletes one movie object from the movies array
   * @param {id} : movie id
   */
  @Delete('/:id')
  deleteOne(@Param('id') id: string) {
    return this.moviesService.deleteOne(id);
  }

  /** Updates one movie object
   * @param {id} : movie id
   */
  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateData: object) {
    return this.moviesService.updateOne(id, updateData);
  }
}
