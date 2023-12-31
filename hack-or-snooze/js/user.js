"use strict";

// global to hold the User instance of the currently-logged-in user
let currentUser;

/******************************************************************************
 * User login/signup/login
 */

/** Handle login form submission. If login ok, sets up the user instance */

async function login(evt) {
  console.debug("login", evt);
  evt.preventDefault();

  // grab the username and password
  const username = $("#login-username").val();
  const password = $("#login-password").val();

  // User.login retrieves user info from API and returns User instance
  // which we'll make the globally-available, logged-in user.
  try{
    currentUser = await User.login(username, password);
  } catch(err){
    alert("Incorrect Credentials");
    return null;
  }
  $loginForm.trigger("reset");

  saveUserCredentialsInLocalStorage();
  updateUIOnUserLogin();
  $loginForm.hide();
  $signupForm.hide();
  
}

$loginForm.on("submit", login);

/** Handle signup form submission. */

async function signup(evt) {
  console.debug("signup", evt);
  evt.preventDefault();

  const name = $("#signup-name").val();
  const username = $("#signup-username").val();
  const password = $("#signup-password").val();

  // User.signup retrieves user info from API and returns User instance
  // which we'll make the globally-available, logged-in user.
  try{
    currentUser = await User.signup(username, password, name);
  } catch(err){
    alert("Username has been taken");
    return null;
  }
  saveUserCredentialsInLocalStorage();
  updateUIOnUserLogin();

  $signupForm.trigger("reset");
  $loginForm.hide();
  $signupForm.hide();
}

$signupForm.on("submit", signup);

/** Handle click of logout button
 *
 * Remove their credentials from localStorage and refresh page
 */

function logout(evt) {
  console.debug("logout", evt);
  localStorage.clear();
  location.reload();
}

$navLogOut.on("click", logout);

/******************************************************************************
 * Storing/recalling previously-logged-in-user with localStorage
 */

/** If there are user credentials in local storage, use those to log in
 * that user. This is meant to be called on page load, just once.
 */

async function checkForRememberedUser() {
  console.debug("checkForRememberedUser");
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  if (!token || !username) return false;

  // try to log in with these credentials (will be null if login failed)
  currentUser = await User.loginViaStoredCredentials(token, username);
}

/** Sync current user information to localStorage.
 *
 * We store the username/token in localStorage so when the page is refreshed
 * (or the user revisits the site later), they will still be logged in.
 */

function saveUserCredentialsInLocalStorage() {
  console.debug("saveUserCredentialsInLocalStorage");
  if (currentUser) {
    localStorage.setItem("token", currentUser.loginToken);
    localStorage.setItem("username", currentUser.username);
  }
}

/**
 * 
 * Saves favorite stories 
 * 
 */

async function addFavorite(story){
  const response = await axios({
    url: `https://hack-or-snooze-v3.herokuapp.com/users/${currentUser.username}/favorites/${story.storyId}`,
    method: "POST",
    data: { token: currentUser.loginToken },
  });

  currentUser.favorites.push(story);
  console.log("added fav");
}

async function removeFavorite(story){
  const response = await axios({
    url: `https://hack-or-snooze-v3.herokuapp.com/users/${currentUser.username}/favorites/${story.storyId}`,
    method: "DELETE",
    data: { token: currentUser.loginToken },
  })

  currentUser.favorites = currentUser.favorites.filter((favoriteStory)=>{
    return favoriteStory.storyId !== story.storyId;
  });

  console.log("removed fav")
 
}

/******************************************************************************
 * General UI stuff about users
 */

/** When a user signs up or registers, we want to set up the UI for them:
 *
 * - show the stories list
 * - update nav bar options for logged-in user
 * - generate the user profile part of the page
 */

function updateUIOnUserLogin() {
  console.debug("updateUIOnUserLogin");

  putStoriesOnPage();
  $allStoriesList.show();
  updateNavOnLogin();
  $("#logged-navbar-links").css("display","block");
}

function isFavorite(story){
  return currentUser.favorites.some((favoriteStory)=>{
    return favoriteStory.storyId === story.storyId; 
  })
}

function isOwnStory(story){
  return currentUser.ownStories.some((ownStory)=>{
    return ownStory.storyId === story.storyId; 
  })
}