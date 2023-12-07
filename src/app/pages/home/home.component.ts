import { Component, OnInit } from '@angular/core';
import { WatchlistService } from 'src/app/service/watchlist.service';
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
  watchlist: Movie[] | undefined;

  constructor(private watchlistService: WatchlistService) { }

  ngOnInit(): void {
    this.getMoviesByGenre();
    this.sortedMoviesData();
    this.watchlist = this.watchlistService.getWatchlist();
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

  compareByReleaseDate = (a: Movie, b: Movie) => {
    const dateA = new Date(a.releasedDate);
    const dateB = new Date(b.releasedDate);

    return dateA.getTime() - dateB.getTime();
  };

  sortedMoviesData() {
    return this.movies.sort(this.compareByReleaseDate)
  };

  isWatchlistEmpty(): boolean {
    return this.watchlistService.isWatchlistEmpty();
  }
}
