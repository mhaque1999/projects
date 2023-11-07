/*Selecting the section with an id of container*/
document.getElementById('container');

/*Selecting the section with an id of container with querySelector*/
document.querySelector('#container');

/*Select all of the list items with a class of “second”.*/
document.querySelectorAll('li.second')

/*Select a list item with a class of third, but only the list item inside of the ol tag.*/
document.querySelector('ol li.third')

/*Give the section with an id of container the text “Hello!”.*/
const container=document.querySelector('#container');
container.innerText='Hello!';

/*Add the class main to the div with a class of footer.*/
const divElement=document.querySelector('div.footer');
divElement.classList.add('main');

/*Remove the class main on the div with a class of footer.*/
divElement.classList.remove('main');

/*Create a new li element.*/
const liElement=document.createElement('li');

/*Giving li element the text 'four'*/
liElement.innerText='four';

/*Appending the li to the ul element */
docuement.querySelector('ul').append(liElement);

/*Loop over all of the lis inside the ol tag and give them a background color of “green"*/
let ol=document.querySelectorAll('ol li');
for(let newLi of ol){
    newLi.style.backgroundColor='green';
}

/*Remove the div with a class of footer*/
divElement.remove();