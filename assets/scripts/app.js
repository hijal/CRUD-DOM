const addMovieModal = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddModelButton = addMovieModal.querySelector('.btn--passive');
const successAddModelButton = cancelAddModelButton.nextElementSibling;
const userInput = addMovieModal.querySelectorAll('input');
const entryText = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
};


const updateIU = () => {
    if (movies.length === 0) {
        entryText.style.display = 'block';
    } else {
        entryText.style.display = 'none';
    }
};

const closeMovieDeletionModal = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible');
};

const deleteMovie = movieId => {
    let movieIndex = 0;
    for (const movie of movies) {
        if (movie.id === movieId) {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const movieList = document.getElementById('movie-list');
    movieList.children[movieIndex].remove();
    closeMovieDeletionModal();
    updateIU();
};

const deleteMovieHandler = (movieId) => {
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();
    const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
    let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

    confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));
    confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

    cancelDeletionButton.removeEventListener('click', closeMovieDeletionModal);
    cancelDeletionButton.addEventListener('click', closeMovieDeletionModal);
    confirmDeletionButton.addEventListener('click', deleteMovie.bind(null, movieId));
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element'
    newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${imageUrl}" alt="${title}" />
        </div>
        <div class="movie-element__info">
            <h2>${title}</h2>
            <p> ${rating} / 5 starts </p>
        </div>
    `;
    newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id));
    const movieList = document.getElementById('movie-list');
    movieList.appendChild(newMovieElement);
};


const closeMovieModal = () => {
    addMovieModal.classList.remove('visible');
};

const showMovieModal = () => {
    addMovieModal.classList.add('visible');
    toggleBackdrop();
};

const backdropClickHandler = () => {
    closeMovieModal();
    clearMovieInput();
    closeMovieDeletionModal();
};

const cancelAddModelHandler = () => {
    closeMovieModal();
    clearMovieInput();
    toggleBackdrop();
};

const clearMovieInput = () => {
    for (usrInput of userInput) {
        usrInput.value = '';
    }
};

const successAddModelHandler = () => {
    const titleValue = userInput[0].value;
    const imageValue = userInput[1].value;
    const ratingValue = userInput[2].value;

    if (titleValue.trim() === '' || imageValue.trim() === '' || ratingValue.trim() === '' || +ratingValue < 1 || +ratingValue > 5) {
        alert('Please enter a valid rating (1 to 5)!');
        return;
    }
    const newMovies = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageValue,
        rating: ratingValue
    }
    movies.push(newMovies);
    console.log(movies);
    closeMovieModal();
    toggleBackdrop();
    clearMovieInput();
    renderNewMovieElement(newMovies.id, newMovies.title, newMovies.image, newMovies.rating);
    updateIU();
};

startAddMovieButton.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddModelButton.addEventListener('click', cancelAddModelHandler);
successAddModelButton.addEventListener('click', successAddModelHandler);