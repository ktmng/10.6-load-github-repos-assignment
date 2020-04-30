'use strict';

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    getGithubHandle();
  });
}

function getGithubHandle() {
  //get value of user's input (inputted handle)
  const userInput = $('input[name="handle"]').val();
  console.log(userInput);
  //get user's inputted handle with custom endpoint
  fetch(`https://api.github.com/users/${userInput}/repos`)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    .catch(error => alert('Looks like we can\'t find that GitHub Handle. Check spelling and try again!'));
}

function displayResults(responseJson) {
  const userInput = $('input[name="handle"]').val();
  //clear any existing repositories list
  console.log(responseJson);
  $("#repo-list").empty();
  $('#repos-for-user').empty();
  //display github handle
  $('#repos-for-user').append(`${userInput}'s Repositories`);
  //for each repo found: 
  // -get and display the repo name
  // -get and display the repo link
  responseJson.forEach(userRepo => {
    $('#repo-list').append(
      `
      <li class="each-repo-result">
      <h3 class="repo-name">${userRepo.name}</h3>
      <a class="repo-link" href="${userRepo.html_url}" target="_blank">Link</a>
      </li>
      `
    )
  });
  //clear input after results load
    $('#search-input').val('');
}