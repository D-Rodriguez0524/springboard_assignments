const BASE_URL = "http://localhost:5000/api";

function cupcakeHTML(cupcake) {
    return
    `<div data-cupcake-id="${cupcake.id}" >
        <li>
            ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
            <button class="delete=btn"></button>
        </li>
        <img src="${cupcake.image}" class="cupcake-img">
    </div>`;
}


async function showCupcakes() {
    const response = await axios.get("/api/cupcakes");

    for (let cupcakeData of response.data.cupcakes) {
        let newCupcake = $(cupcakeHTML(cupcakeData));
        $("#cupcakes-list").append(newCupcake);
    }
}

$("#new-cupcake-form").on("submit", async function (evt) {
    evt.preventDefault();

    let flavor = $("#form-flavor").val();
    let rating = $("#form-rating").val();
    let size = $("#form-size").val();
    let image = $("#form-image").val();

    const newCupcakeResponse = await axios.post(`/api/cupcakes`, {
        flavor,
        rating,
        size, image
    });

    let newCupcake = $(cupcakeHTML(newCupcakeResponse.data.cupcakes));
    $("#cupcakes-list").append(newCupcake);
    $("#new-cupcake-form").trigger("reset");
});

$('#edit-cupcake').on('submit', editCupcake);

async function editCupcake(evt) {
    evt.preventDefault();

    let cupcakeID = $('.edit-btn').data('id');
    let flavor = $('#flavor').val();
    let size = $('#size').val();
    let rating = $('#rating').val();
    let image = $('#image').val();

    let resp = await axios.post(`/api/cupcakes/${cupcakeID}`, {
        flavor,
        size,
        rating,
        image
    });

    let editedCupcake = resp.data.cupcakes;

    $('.image').attr('src', editedCupcake.image);
    $('.flavor').text(editedCupcake.flavor.toUpperCase());
    $('.rating').text(editedCupcake.rating);
    $('.size').text(editedCupcake.size);
}


$("#cupcakes-list").on("click", ".delete-btn", async function (evt) {
    evt.preventDefault();

    let = $cupcake = $(evt.target).closest("<div>");
    let cupcakeId = $cupcake.attr("data-cupcake-id");

    await async.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
    $cupcake.remove();
});

$(showCupcakes);