const main = document.querySelector(".main")

fetchGenresList()

function fetchGenresList() {
  const url = genres_list_http + new URLSearchParams({
    api_key: api_key
  })

  fetch(url)
    .then(res => res.json())
    .then(data => {
      data.genres.forEach(item => {
        fetchMoviesListByGenres(item.id, item.name)
      });
    })
    .catch(err => console.log(err))
}

const fetchMoviesListByGenres = (id, genres) => {
  const url = movie_genres_http + new URLSearchParams({
    api_key: api_key,
    with_genres: id,
    page: Math.floor(Math.random() * 3) + 1
  })

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const category = genres.replace("_", " ")
      makeCategoryElement(category, data.results)
    })
    .catch(err => console.log(err))
}

const makeCategoryElement = (category, data) => {
  const categoryHTML = `
  <div class="movie-list">

    <button class="pre-btn">
      <img src="images/prev.png" alt="previous button">
    </button>

    <h1 class="movie-category">${category.replace("_", " ")}</h1>
    
    <div class="movie-container" id="${category}">

    </div>

    <button class="next-btn">
      <img src="images/next.png" alt="next button">
    </button>

  </div>
  
  `
  main.innerHTML += categoryHTML
  makeCards(category, data)
}

const makeCards = (category, data) => {
  const movieContainer = document.getElementById(category.replace(" ", "_"));

  data.forEach((item, index) => {
    if (!item.backdrop_path) {
      item.backdrop_path = item.poster_path

      if (!item.backdrop_path) {
        return
      }
    }

    const movieHTML = `
    <div class="movie">
      <img src="${img_url}${item.backdrop_path}" alt="poster">
      <p class="movie-title">${item.title}</p>
    </div>
    `
    movieContainer.innerHTML += movieHTML

    if (index == data.length - 1) {
      setTimeout(() => {
        setupScrooling()
      }, 100)
    }

  })
}