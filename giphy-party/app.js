const apiKey = "7tPOoMCNb6uLki7klTuLRCadbdtk0UfE";
const searchButton = document.querySelector("#search");
const deleteButton = document.querySelector("#remove-images");
const imageContainer = document.querySelector(".img_group");

searchButton.addEventListener("click", async (event) =>{
    event.preventDefault();
    const userInput = document.querySelector("input").value;
    try{
        const gif = await getImage(userInput);
        const imgDiv = document.createElement("div");
        const newGif = document.createElement("img");

        newGif.src = gif.url;

        imgDiv.classList.add("img_div");
        imgDiv.append(newGif);
    
        imageContainer.append(imgDiv);
        document.querySelector("input").value = "";
    }
    catch(error){
        console.log(error);
    }
    
});

deleteButton.addEventListener("click", ()=>{
    imageContainer.innerHTML = "";
});

async function getImage(userInput){
    try{
        const gif = await axios.get("https://api.giphy.com/v1/gifs/search",{params: { q: userInput, api_key: apiKey} });
    //const userInput = document.querySelector("input").value;
        console.log("Let's get this party started!");
        randomImageIndex = Math.floor(Math.random()*(gif.data.data.length-1));
        return gif.data.data[randomImageIndex].images.downsized_medium;
    }
    catch(error){
        alert("Image not found");
    }
    
}

//getImage("cheeseburgers");
