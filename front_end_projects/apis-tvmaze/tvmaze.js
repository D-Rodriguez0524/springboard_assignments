"use strict";

const TVMAZE_API_URL = "http://api.tvmaze.com/";
const missing_url_image = "https://tinyurl.com/tv-missing";

const $showsList = $("#showsList");
const $episodesList = $("#episodesList");
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");


/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(term) {
    const response = await axios({
        baseURL: TVMAZE_API_URL,
        url: "search/shows",
        method: "GET",
        params: {
            q: term,
        },
    });

    return response.data.map(result => {
        const show = result.show;
        return {
            id: show.id,
            name: show.name,
            summary: show.summary,
            image: show.image ? show.image.medium : missing_url_image,
        };
    });
}


/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
    $showsList.empty();

    for (let show of shows) {
        const $show = $(
            `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img
              src="${show.image}"
              alt="${show.name}"
              class="w-25 me-3">
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
    }
}


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
    await searchForShowAndDisplay();
});


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id) {
    const response = await axios({
        baseURL: TVMAZE_API_URL,
        url: `shows/${id}/episodes`,
        method: "GET",
    });

    return response.data.map(ep => ({
        id: ep.id,
        name: ep.name,
        season: ep.season,
        number: ep.number,
    }));
}


function populateEpisodes(episodes) {
    $episodesList.empty();

    for (let episode of episodes) {
        const $epLI = $(
            `<li>
        ${episode.name}
        (season ${episode.season}, episode ${episode.number})
      </li>
      `);
        $episodesList.append($epLI);
    }
    $episodesArea.show();
}

// handle click on episode button and to display them to the user 
async function getEpisodesAndDisplay(evt) {
    // searching for the "closest" ancester with the class of .show with the .data-show-id attribute
    const showID = $(evt.target).closest(".Show").data("show-id");

    const episodes = await getEpisodesOfShow(showID);
    populateEpisodes(episodes);
}

$showsList.on("click", ".Show-getEpisodes", getEpisodesAndDisplay);