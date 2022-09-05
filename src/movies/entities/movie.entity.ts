import { model, Schema } from 'mongoose';

export class Movie {
  id: number;
  title: string;
  year: number;
  genres: string[];
}
