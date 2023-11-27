function createInstructor(firstName, lastName){
    return {
      firstName: firstName,
      lastName: lastName
    }
  }

function createInstructorRefactored(firstName, lastName){
    return {firstName,lastName};
}

/*
var favoriteNumber = 42;

var instructor = {
  firstName: "Colt"
}

instructor[favoriteNumber] = "That is my favorite!"
*/

const favoriteNumber = 42;
const instructor1 = {
    firstName: "Colt",
    [favoriteNumber]: "This is my favorite!"
};

/*
var instructor = {
  firstName: "Colt",
  sayHi: function(){
    return "Hi!";
  },
  sayBye: function(){
    return this.firstName + " says bye!";
  }
}
*/

const instructor2 = {
    firstName: "Colt",
    sayHi(){
        return "Hi!";
    },
    sayBye(){
        return this.firstName + " says bye!";
    }
};

function createAnimal(species, verb, noise){
    return {
        species,
        [verb](){
            return noise;
        }
    }
};