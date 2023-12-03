const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

function search(str) {
	//let results = [];
	let results = fruit.filter((fruitString) => {
		let lowerCaseFruit = fruitString.toLowerCase();
		let lowerCaseStr = str.toLowerCase();
		if (lowerCaseFruit.includes(lowerCaseStr)){
			return fruitString;
		}
	})

	// TODO
	console.log(results);
	return results;
}

// should call search with the string that is currently types in the input box
function searchHandler(e) {
	// TODO
	const inputString = e.target.value.toLowerCase().trim();
	const results = search(e.target.value);
	showSuggestions(results, inputString);
	//console.log(input.value)
	console.log(inputString);
	console.log(results);
}

// creates a dropdown of the suggested results
function showSuggestions(results, inputVal) {
	// TODO
	suggestions.innerHTML = "";
	if(input.value === "") return;
	/* for (let fruit of results){
		let lowerCaseFruit = fruit.toLowerCase();
		let suggestionLI = document.createElement("li");
		let leftFruitSplitIndex = lowerCaseFruit.indexOf(inputVal);
		let rightFruitSplitIndex = lowerCaseFruit.indexOf(inputVal) + inputVal.length;
		let leftSplitFruitString = fruit.slice(0,leftFruitSplitIndex);
		let middleSplitFruitString = fruit.slice(leftFruitSplitIndex,rightFruitSplitIndex);
		let rightSplitFruitString = fruit.slice(rightFruitSplitIndex);

		suggestionLI.innerHTML = `${leftSplitFruitString}<b>${middleSplitFruitString}</b>${rightSplitFruitString}`;
		suggestionLI.setAttribute("name",fruit);
		suggestions.append(suggestionLI);
	} */

	for (let fruitIndex = 0; fruitIndex < 6; fruitIndex++){

		if(!results[fruitIndex]) return; //if there is less than 6 suggestions the function will stop running

		let fruit = results[fruitIndex];
		let lowerCaseFruit = fruit.toLowerCase();
		let suggestionLI = document.createElement("li");
		let leftFruitSplitIndex = lowerCaseFruit.indexOf(inputVal);
		let rightFruitSplitIndex = lowerCaseFruit.indexOf(inputVal) + inputVal.length;
		let leftSplitFruitString = fruit.slice(0,leftFruitSplitIndex);
		let middleSplitFruitString = fruit.slice(leftFruitSplitIndex,rightFruitSplitIndex);
		let rightSplitFruitString = fruit.slice(rightFruitSplitIndex);

		suggestionLI.innerHTML = `${leftSplitFruitString}<b>${middleSplitFruitString}</b>${rightSplitFruitString}`;
		suggestionLI.setAttribute("name",fruit);
		suggestions.append(suggestionLI);
	}

}

// puts the clicked suggested into the input box
function useSuggestion(e) {
	// TODO
	let clickedSuggestion = e.target.closest("li");
	console.log(clickedSuggestion);
	input.value = clickedSuggestion.getAttribute("name");
	suggestions.innerHTML = "";
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);