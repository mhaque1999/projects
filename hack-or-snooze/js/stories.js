"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story, deleteButton = false) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        ${deleteButtonHTML(deleteButton)}
        ${favStarHTML(story)}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}


function favStarHTML(story){
  if(currentUser){
    if(isFavorite(story)){
      return `<span class="star"> <i class="fas fa-star"></i></span>`
    }
    else{
      return `<span class="star"> <i class="far fa-star"></i></span>`
    }
  }
  else{
    return ""
  }
  
}

function deleteButtonHTML(includeDelte){
  if(includeDelte) return `<span><i class="fas fa-trash"></i></span>`;
  else return "";
  
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

function putFavoriteStoriesOnPage(){
  $favStoriesList.empty();
  
  for (let story of currentUser.favorites){
    const $story = generateStoryMarkup(story);
    $favStoriesList.append($story);
  }

  $favStoriesList.show();
}

function putOwnStoriesOnPage(){
  $ownStoriesList.empty();

  for (let story of currentUser.ownStories){
    const $story = generateStoryMarkup(story,true);
    $ownStoriesList.append($story);
  }

  $ownStoriesList.show();
}

$("#submit-form").on("click","button", async ()=>{
  const author = $("#submit-form #create-author").val();
  const title = $("#submit-form #create-title").val();
  const url = $("#submit-form #create-url").val();

  //empty the input
  $("#submit-form #create-author").val("");
  $("#submit-form #create-title").val("");
  $("#submit-form #create-url").val("");

  await storyList.addStory(currentUser,{author,title,url});
  console.log("successfully added a story");

  putStoriesOnPage();

  //$signupForm.hide()
  $submitForm.hide();
  //$("#submit-form").css("display","none");
});

$("body").on("click",".fa-star",(event)=>{ //far is empty fas is filled
  const storyId = $(event.target).closest("li").attr('id');

  const story = storyList.stories.filter((savedStories)=>{
    return savedStories.storyId === storyId;
  });

  $(event.target).toggleClass("far fas");
  if($(event.target).hasClass("fas")){
    addFavorite(story[0]);
  }
  else{
    removeFavorite(story[0]);
  }
  
})

$ownStoriesList.on("click", ".fa-trash", async (event)=>{
  const storyId = $(event.target).closest("li").attr("id");
  console.log(storyId);
  await storyList.deleteStory(currentUser,storyId);

  putOwnStoriesOnPage();

})