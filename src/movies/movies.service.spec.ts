import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();

      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie object', () => {
      service.createOne({
        title: 'test',
        year: 2022,
        genres: ['test'],
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
      expect(movie.title).toEqual('test');
      expect(movie.year).toEqual(2022);
      expect(movie.genres).toContain('test');
    });
    it('should throw 404 error', () => {
      try {
        service.getOne(111);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('Movie with ID: 111 not found!');
      }
    });
  });

  describe('deleteOne', () => {
    it('should delete one specified Movie object from the array', () => {
      service.createOne({
        title: 'test',
        year: 2022,
        genres: ['test'],
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;

      expect(afterDelete).toBeLessThan(beforeDelete);
    });
    it('should return a 404', () => {
      try {
        service.deleteOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('createOne', () => {
    it('should create one Movie object in the movies array', () => {
      service.createOne({
        title: 'test',
        year: 2022,
        genres: ['test'],
      });
      const createdMovie = service.getOne(1);
      expect(createdMovie).toBeDefined();
      expect(createdMovie.title).toEqual('test');
      expect(createdMovie.year).toEqual(2022);
      expect(createdMovie.genres).toContain('test');
    });
    it('should return a 404 error', () => {
      try {
        service.getOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('updateOne', () => {
    it('should update one specified movie object in the array', () => {
      service.createOne({
        title: 'test',
        year: 2022,
        genres: ['test'],
      });
      service.updateOne(1, { title: 'test movie' });

      const updatedMovie = service.getOne(1);
      expect(updatedMovie.title).toEqual('test movie');
    });
    it('should throw a 404 error', () => {
      try {
        service.updateOne(999, { title: 'new title' });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
