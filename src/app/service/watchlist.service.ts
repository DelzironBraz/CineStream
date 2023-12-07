// watchlist.service.ts
import { Injectable } from '@angular/core';
import { Movie } from '../../interface/movie';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  private watchlistKey = 'watchlist';

  addToWatchlist(movie: Movie): void {
    const watchlist = this.getWatchlist();
    watchlist.push(movie);
    this.updateWatchlist(watchlist);
  }

  removeFromWatchlist(movie: Movie): void {
    let watchlist = this.getWatchlist();
    watchlist = watchlist.filter((watchlistMovie) => watchlistMovie.id !== movie.id);
    this.updateWatchlist(watchlist);
  }

  getWatchlist(): Movie[] {
    const watchlistData = localStorage.getItem(this.watchlistKey);
    return watchlistData ? JSON.parse(watchlistData) : [];
  }

  private updateWatchlist(watchlist: Movie[]): void {
    localStorage.setItem(this.watchlistKey, JSON.stringify(watchlist));
  }

  isWatchlistEmpty(): boolean {
    const watchlist = this.getWatchlist();
    return watchlist.length === 0;
  }
}
