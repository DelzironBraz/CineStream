import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WatchlistService } from 'src/app/service/watchlist.service';
import { Movie } from 'src/interface/movie';
import { moviesData } from 'src/utils/movie-data';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movieDetails: Movie | undefined;

  constructor(
    private router: ActivatedRoute,
    private watchlistService: WatchlistService
  ) { }

  ngOnInit(): void {
    this.getMovieDetails()
  }

  getMovieDetails() {
    const getParamId = this.router.snapshot.paramMap.get('id');

    if (getParamId) {
      const movieId = parseInt(getParamId, 10);

      this.movieDetails = moviesData.find((movie) => movie.id === movieId);
      console.info(this.movieDetails)
    }
  }

  addToWatchlist(movie: Movie): void {
    this.watchlistService.addToWatchlist(movie);
  }

  isMovieInWatchlist(movie: Movie): boolean {
    const watchlist = this.watchlistService.getWatchlist();
    return watchlist.some((watchlistMovie) => watchlistMovie.id === movie.id);
  }

  toggleWatchlist(movie: Movie): void {
    if (this.isMovieInWatchlist(movie)) {
      // Se o filme já está na watchlist, remova-o
      this.watchlistService.removeFromWatchlist(movie);
    } else {
      // Se o filme não está na watchlist, adicione-o
      this.watchlistService.addToWatchlist(movie);
    }
  }
}
