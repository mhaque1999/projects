"use strict";

const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");


/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm( showTitle) {
  // ADD: Remove placeholder & make request to TVMaze search shows API.
  const showList = [];
  const show = await axios.get("http://api.tvmaze.com/search/shows",{params: {q:showTitle}});
  //console.log(show.data);
  for (let showObject of show.data){
    showList.push(showObject.show);
  }
  console.log(showList);
  return showList;

  /*return [
    {
      id: 1767,
      name: "The Bletchley Circle",
      summary:
        `<p><b>The Bletchley Circle</b> follows the journey of four ordinary
           women with extraordinary skills that helped to end World War II.</p>
         <p>Set in 1952, Susan, Millie, Lucy and Jean have returned to their
           normal lives, modestly setting aside the part they played in
           producing crucial intelligence, which helped the Allies to victory
           and shortened the war. When Susan discovers a hidden code behind an
           unsolved murder she is met by skepticism from the police. She
           quickly realises she can only begin to crack the murders and bring
           the culprit to justice with her former friends.</p>`,
      image:
        "http://static.tvmaze.com/uploads/images/medium_portrait/147/369403.jpg"
    }
  ];*/
}


/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
  $showsList.empty();

  for (let show of shows) {
    let showImg = "";

    if (!(show.image)) showImg = "https://tinyurl.com/tv-missing";
    else showImg = show.image.medium;

    const $show = $(
      `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
         <img class="card-img-top" src="${showImg}">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>
       </div>
      `);
    $showsList.append($show);
    getEpisodesOfShow(show.id);
}
  }
  
/*
<img
              src="http://static.tvmaze.com/uploads/images/medium_portrait/160/401704.jpg"
              alt="Bletchly Circle San Francisco"
              class="w-25 me-3"></img>*/

/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $("#searchForm-term").val();
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  //const showTitle = document.querySelector("#searchForm-term").value;
  await searchForShowAndDisplay();
});

$showsList.on("click",".btn-sm", async (event)=>{
  //console.log("Hi");
  const id = $(event.target).closest("div").parent().parent().data("show-id");
  const episodeList = await getEpisodesOfShow(id);
  populateEpisodes(episodeList);
  console.log(id);
  //const episodes = await getEpisodesOfShow(id);
  //populateEpisodes(episodes);
})

/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id) { 
  const episodeList = [];
  const episodes = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);
  //console.log(episodes.data);
  return episodes.data;
}

/** Write a clear docstring for this function... */

function populateEpisodes(episodes) {
  //todo: add other show details
  $episodesArea.empty();
  $episodesArea.css("display", "none");
  for (let episode of episodes){
    const $episode = $(`<li>${episode.name} (season: ${episode.season} number: ${episode.number})</li>`);
    $episodesArea.append($episode);
  }
  $episodesArea.css("display", "block");
  
}

