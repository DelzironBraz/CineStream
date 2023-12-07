import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/interface/movie';
import { moviesData } from 'src/utils/movie-data';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movieDetails: Movie | undefined;

  constructor(private router: ActivatedRoute) { }

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
}
