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

/**Controllers
 * What controllers do : takes urls and executes function
 */
@Controller('movies')
export class MoviesController {
  @Get('search')
  search(@Query('year') searchYear: string) {
    return `We are searching for a movie made after: ${searchYear}`;
  }

  /** returns all the movies
   * @returns {Array} : array that contains movies object
   */

  @Get()
  getAll() {
    return 'This will return all movies';
  }

  /** returns one of the movies
   * @param {id} : movie id
   * @returns {object} : movie object
   */
  @Get('/:id')
  getOne(@Param('id') id: string) {
    return `This will return one of the movies with id: ${id}`;
  }

  /**
   * add a movie object to the movies array
   */
  @Post()
  create(@Body() movieData: JSON) {
    return movieData;
  }

  /**
   * Deletes one movie object from the movies array
   * @param {id} : movie id
   */
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return `This will delete a movie with id : ${id}`;
  }

  /** Updates one movie object
   * @param {id} : movie id
   */
  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateData: JSON) {
    return {
      updateMovie: id,
      ...updateData,
    };
  }
}
