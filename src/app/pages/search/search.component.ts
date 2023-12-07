import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Movie } from 'src/interface/movie';
import { moviesData } from 'src/utils/movie-data';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  movies: Movie[] = moviesData;

  searchForm = new FormGroup({
    'title': new FormControl('')
  });

  constructor() { }

  ngOnInit(): void { }

  submitForm() {
    const titleControl = this.searchForm.get('title');

    if (titleControl && titleControl.value !== null) {
      const searchTerm = titleControl.value.toLowerCase();

      if (searchTerm) {
        this.movies = moviesData.filter(
          (movie) => movie.title.toLowerCase().includes(searchTerm)
        );
      } else {
        this.movies = moviesData;
      }
    }
  }


}
