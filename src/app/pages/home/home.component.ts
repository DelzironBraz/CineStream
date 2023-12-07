import { Component, OnInit } from '@angular/core';
import { Banner } from 'src/interface/banner';
import { Movie } from 'src/interface/movie';
import { BannerData } from 'src/utils/banner-data';
import { moviesData } from 'src/utils/movie-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  banners: Banner[] = BannerData;
  movies: Movie[] = moviesData;
  moviesByGenre: { [genre: string]: Movie[] } = {};

  constructor() { }

  ngOnInit(): void {
    this.getMoviesByGenre();
  }

  getMoviesByGenre() {
    this.movies.forEach((movie) => {
      movie.genre.forEach((genre) => {
        if (!this.moviesByGenre[genre]) this.moviesByGenre[genre] = [];

        this.moviesByGenre[genre].push(movie);
      });
    });
  }

  getGenres(): string[] {
    return Object.keys(this.moviesByGenre);
  }

  getMoviesForGenre(genre: string): Movie[] {
    return this.moviesByGenre[genre] || [];
  }
}
