import { Injectable } from '@angular/core'

import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class MoviesService {

  constructor(private http: HttpClient){

  }
  // server movies url
  moviesurl = 'https://movies-web.herokuapp.com/movies'

  // getting data from server
  movies = this.http.get(this.moviesurl)

  getMovie(id){
    console.log(id)
    let movie = this.http.get(`https://movies-web.herokuapp.com/${id}`)
    if(movie){
      return movie
    }
}

  addMovie(title,genre,length,photo){
    let newMovie = {
        name: title.value,
        genre: genre.value,
        length: length.value,
        image: '../../assets/images/' + photo.files[0].name
      }

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'my-auth-token'
        })
      };

      // server movies add url
      const addmoviesurl = 'https://movies-web.herokuapp.com/addMovie'

      this.http.post(addmoviesurl,newMovie, httpOptions) .subscribe(data => {
        console.log(data);
      });

      window.location.reload();

      title.value = ''
      genre.value = ''
      length.value = ''
      photo.value = ''
  }

  updateMovie(movie){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };

    const updateMovieUrl = `https://movies-web.herokuapp.com/${movie._id}`

    this.http.put(updateMovieUrl,movie, httpOptions) .subscribe(data => {
      console.log(data);
    });

    window.location.reload();
  }

  deleteMovie(movie){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };

    // server movies add url
    const deleteMovie = `https://movies-web.herokuapp.com/${movie._id}`

    this.http.delete(deleteMovie, httpOptions) .subscribe(data => {
      console.log(data);
    });

    window.location.reload();

  }
}