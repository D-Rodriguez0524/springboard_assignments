// id counter to keep track of what element to delete
let currentId = 0;

// keep an array of the movies in memory to sort
let movieList = [];

$(function () {
    //when you click on the delete button , it removes the movie from the list

    $('#movie-form').on('submit', function (e) {
        e.preventDefault();
        let title = $('#title').val();
        let rating = $('#rating').val();
        let movieData = { title, rating, currentId };
        const appendToHTML = createMovieDataHTML(movieData);

        currentId++;
        movieList.push(movieData);

        $('#table-body').append(appendToHTML);
        $('#movie-form').trigger('reset');

    });

    // removing the movie from the array when the delete button is clicked
    $('tbody').on('click', ".btn.btn-delete", function (e) {
        let removeIndex = movieList.findIndex(movie =>
            movie.currentId === +$(e.target).data('deleteId'));
        // removing from the array 
        movieList.splice(removeIndex, 1);

        // removing from the DOM
        $(e.target).closest('tr').remove();
    });

    //when the arrows are clicked
    $(".movie-th").on("click", function (e) {

        // // figure out what direction we are sorting and the key to sort by
        let direction = $(e.target).hasClass("movie-th-sort-down") ? "down" : "up";
        let keyToSortBy = $(e.target).attr("id");
        let sortedMovies = sortBy(moviesList, keyToSortBy, direction);

        // empty the table
        $("#table-body").empty();

        // loop over our object of sortedMovies and append a new row
        for (let movie of sortedMovies) {
            const appendToHTML = createMovieDataHTML(movie);
            $("#table-body").append(appendToHTML);
        }

        // // toggle the arrow
        $(e.target).toggleClass("sort-down");
        $(e.target).toggleClass("sort-up");
    });

});

/* accepts an array of objects and a key and sorts by that key */
function sortBy(array, keyToSortBy, direction) {
    return array.sort(function (a, b) {
        //converting the rating to a string
        if (keyToSortBy === "rating") {
            a[keyToSortBy] = +a[keyToSortBy];
            b[keyToSortBy] = +b[keyToSortBy];
        }
        if (a[keyToSortBy] > b[keyToSortBy]) {
            return direction === "up" ? 1 : -1;
        } else if (b[keyToSortBy] > a[keyToSortBy]) {
            return direction === "up" ? -1 : 1;
        }
        return 0;
    });
}


/* createMovieDataHTML accepts an object with title and rating keys and returns a string of HTML */
function createMovieDataHTML(data) {
    return `
    <tr>
      <td>${data.title}</td>
      <td>${data.rating}</td>
      <td>
        <button class="btn btn-delete" data-delete-id=${data.currentId}>
          Delete
        </button>
      </td>
    <tr>
  `;
}