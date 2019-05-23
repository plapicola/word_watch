import $ from 'jquery'

$(document).ready(() => {
  populateTopWord();
})

function populateTopWord() {
  let topWordCount = document.getElementsByClassName("word-count")[0];
  fetch("http://localhost:3000/api/v1/top_word")
  .then(response => response.json())
  .then(function(result) {
    let word = Object.getOwnPropertyNames(result.word)[0]
    let frequency = result.word[word]
    topWordCount.innerHTML = `<p>${word}! ${word} has occured ${frequency} times.</p>`
  })
}
