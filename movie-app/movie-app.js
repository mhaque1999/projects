const $movieForm = $("#movie-form");
const $movieTitle = $(".movie-title");
const $movieRating = $(".movie-rating");
const $sortByButton = $("button");

const movieList = [];

$movieForm.on("submit",(event) =>{
    event.preventDefault();
    const movieTitle = $movieTitle.val();
    console.log(movieTitle);
    const movieRating = $movieRating.val();
    const movieData = {movieTitle, movieRating};
    movieList.push(movieData); 
    const movieRow = createTableRow(movieData);
    $("tbody").append(movieRow);
})

function createTableRow(movie){
    return `
    <tr>
      <td>${movie.movieTitle}</td>
      <td>${movie.movieRating}</td>
      <td>
        <button class="btn">
          Delete
        </button>
      </td>
    <tr>
  `;
}

$sortByButton.on("click", () =>{
    const liOrganized = [];
    switch($("#sorting-type").val()){
        case "alphabetically":
            movieList.sort((a,b) =>{
                if(a.movieTitle < b.movieTitle){
                    return -1;
                }
                if(a.movieTitle > b.movieTitle){
                    return 1;
                }
                return 0;
            });

            break;
        case "rating-lowest-to-highest":
            movieList.sort((a,b) =>{
                if(parseInt(a.movieRating) < parseInt(b.movieRating)){
                    return -1;
                }
                if(parseInt(a.movieRating) > parseInt(b.movieRating)){
                    return 1;
                }
                return 0;
            });

            break;
        case "rating-highest-to-lowest":
            movieList.sort((a,b) =>{
                if(parseInt(a.movieRating) > parseInt(b.movieRating)){
                    return -1;
                }
                if(parseInt(a.movieRating) < parseInt(b.movieRating)){
                    return 1;
                }
                return 0;
            });

            break;
    }

    $("td").remove()

    movieList.forEach((movie) =>{
        let movieRow = createTableRow(movie);
        $("tbody").append(movieRow);
    });
    
    

})

$("table").on("click",".btn",(event) =>{
    const tableRow = event.target.closest("tr");
    console.log($(tableRow).children().get(0).innerText);
    const movieTitle = $(tableRow).children().get(0).innerText;
    const movieRating = $(tableRow).children().get(1).innerText;
    const movieData = {movieTitle,movieRating};
    const index = movieList.map(movie => movie.movieTitle).indexOf(movieTitle);
    console.log($(tableRow));
    tableRow.remove();
    console.log(movieData);
    //const movieIndex = movieList.indexOf(movieData);
    //console.log(movieIndex);
    movieList.splice(index,1);
    //movieList
})
