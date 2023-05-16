const $gifArea = $('#gif-Area');
const $userInput = $('#search');

function addGif(res) {
    let numResults = res.data.length;
    if (numResults) {
        let randomIndex = Math.floor(Math.random() * numResults);
        let $newCol = $("<div>", { class: "col-md-4 col-12 mb-4" });
        let $newGif = $("<img>", {
            src: res.data[randomIndex].images.original.url,
            class: "w-100"
        });
        $newCol.append($newGif);
        $gifArea.append($newCol);
    }
}


$("form").on("submit", async function (evt) {
    evt.preventDefault();

    let searchTerm = $userInput.val();
    $userInput.val("");

    const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
        params: {
            q: searchTerm,
            api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
        }
    });
    addGif(response.data);
});


$("#remove").on("click", function () {
    $gifArea.empty();
});

