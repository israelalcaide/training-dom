window.addEventListener("load", () => {
  const app = new App();
  app.start();
});

class App {
  constructor() {
    this.moviesContainer = document.querySelector("section.movies");
    this.searchText = "";
    this.searchInput = document.querySelector('#search input[name="search"]');
    this.searchButton = document.querySelector("#search button");
    document.addEventListener("keydown", (e) => {
      if (e.code === "Enter" || e.code === "NumpadEnter") {
        e.preventDefault();
      }
    });
    this.searchButton.addEventListener("click", (e) => {
      e.preventDefault();
      if (this.searchInput.value.trim() === "") {
        return;
      }
      this.searchText = this.searchInput.value.trim();
      //URL de búsqueda
      this.SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${this.API_KEY}&language=en-US&query=${this.searchText}&page=1&include_adult=false`;
      this.fetchAllMovies();
    });
    this.API_KEY = `94fb32b1efffd3ba2fdc15889599eced`;
    this.BASE_URL = `https://api.themoviedb.org/3/movie/`;
    this.IMG_PATH = `https://image.tmdb.org/t/p/w300_and_h450_bestv2`;
    this.GENRES_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.API_KEY}&language=en-US`;
    this.SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${this.API_KEY}language=en-US&query=${this.searchText}&page=1&include_adult=false`;
  }
  start = async () => {
    try {
      this.genresList = await this.getAllGenres();
      console.log(this.genresList);
      const movie = await this.fetchMovie();
      this.processMovieData(movie);
    } catch (error) {
      // TODO: SHOW ERROR MESSAGE
    }
  };
  fetchMovie = async (id) => {
    const response = await this.fetchMovie(
      `${this.BASE_URL}${id}?api_key=${this.API_KEY}`
    );
    console.log(response);
    if (!response.ok) {
      throw new Error("Failing fetch");
    }
    const data = await response.json();
    return data;
  };
  fetchAllMovies = async () => {
    const response = await fetch(this.SEARCH_URL);
    if (!response.ok) {
      throw new Error("Failing fetch");
    }
    const data = await response.json();
    this.moviesContainer.innerHTML = "";
    data.results.forEach((movie) => {
      this.processMovieData(movie);
    });
  };
  generateCard = (img_path, img_alt, movie_title, year, genres, overview) => {
    const template = document.createElement("template");

    // Obtener el contenido del <template> (un solo elemento) y agregarlo como un hijo de la sección
    let card = `<div class="card">
    <div class="img">
    <img src="${img_path}" alt="${img_alt}">
    </div>
    <div class="body">
    <h2>${movie_title} <span class="year">(${year})</span></h2>
    <ul>${genres}</ul>
    <p>${this.stringLimit(overview)}</p>
    </div>
    </div>`;
    template.innerHTML = card;
    console.log("template", template.content.firstChild);

    return template.content.firstChild;
  };
  processMovieData = (movie) => {
    let title = movie.title;
    let img = movie.poster_path;
    img = `${this.IMG_PATH}${img}`;
    let alt = `${title} poster`;
    let year = movie.release_date.split("-")[0];
    let overview = movie.overview;
    let genres = null;
    if (movie.hasOwnProperty("genres")) {
      genres = movie.genres.map((genre) => {
        let li = document.createElement("li");
        li.textContent = genre.name;
        return li.outerHTML;
      });
    } else {
      genres = movie.genre_ids.map((id) => {
        let li = document.createElement("li");
        li.textContent = this.genresList.genres.find(
          (obj) => obj.id === id
        ).name;
        return li.outerHTML;
      });
    }
    genres = genres.slice(0, 3);
    genres = genres.join("\n<span class='separator'>|</span>\n");
    let newCard = this.generateCard(img, alt, title, year, genres, overview);
    this.moviesContainer.appendChild(newCard);
  };
  stringLimit = (string, limit = 35) => {
    if (string.lenght > limit) {
      return `${string.split("").slice(0, limit).join(" ")}...`;
    }
    return string;
  };
  getAllGenres = async () => {
    const response = await fetch(this.GENRES_URL);
    if (!response.ok) {
      throw new Error("Failing fetch");
    }
    const data = await response.json();
    return data;
  };
}
