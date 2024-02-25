async function generateCupcakes(){
    console.log("Generating cupcakes")
    const response = await axios.get(`http://localhost:5000/api/cupcakes`);
    for (let cupcake of response.data.cupcakes){
        let cupcakeHTML = $(`<div id="${cupcake.id}">
            <img src="${cupcake.image}"></img>
            <li>
            <p class="flavor" contenteditable="true">${cupcake.flavor}</p>
            <p class="size" contenteditable="true">${cupcake.size}</p>
            <p class="rating" contenteditable="true">${cupcake.rating}</p>
            <button class="update">Update</button>
            <button class="delete">X</button>
            </li>
            </div>`)
        $("ul").append(cupcakeHTML);
        $("form").trigger("reset")
    }
}

$("form").on("submit", async function(event){
    event.preventDefault();

    const flavor = $("#cupcake_flavor").val();
    const size = $("#cupcake_size").val();
    const rating = $("#cupcake_rating").val();
    const image = $("#cupcake_image").val();

    const response = await axios.post("http://localhost:5000/api/cupcakes", {flavor:flavor, size:size, rating:rating, image:image });
    
    $("ul").empty();
    await generateCupcakes();
});

$("ul").on("click", ".delete", async function(event){
    const $cupCake = $(event.target).closest("div");
    let cupCakeId = $cupCake.attr("id");
    await axios.delete(`http://localhost:5000/api/cupcakes/${cupCakeId}`);
    $cupCake.remove();
})

$("ul").on("click", ".update", async function(event){
    event.preventDefault()
    const $cupCake = $(event.target).closest("div");
    let cupCakeId = $cupCake.attr("id");
    const $flavor = $(`ul [id=${cupCakeId}] li`).children(".flavor").text();
    const $size = $(`ul [id=${cupCakeId}] li`).children(".size").text();
    const $rating = $(`ul [id=${cupCakeId}] li`).children(".rating").text();
    const $image = $(`ul [id=${cupCakeId}] img`).attr("src");

    const response = await axios.patch(`/api/cupcakes/${cupCakeId}`, {flavor:$flavor, size:$size, rating:$rating, image:$image });
    $("ul").empty();
    await generateCupcakes();
});

generateCupcakes()
console.log("start")