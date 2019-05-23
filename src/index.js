import $ from 'jquery'

const baseUrl = "https://wordwatch-api.herokuapp.com/api/v1/"

$(document).ready(() => {
  document.getElementsByTagName("button")[0].addEventListener("click", function() {
    submitWords();
  });
  populateTopWord();
})

function populateTopWord() {
  let topWordCount = document.getElementsByClassName("word-count")[0];
  fetch(`${baseUrl}/top_word`)
  .then(response => response.json())
  .then(function(result) {
    let word = Object.getOwnPropertyNames(result.word)[0]
    let frequency = result.word[word]
    topWordCount.innerHTML = `<p>${word}! ${word} has occured ${frequency} times.</p>`
  })
}

function submitWords() {
  let topWordCount = document.getElementsByClassName("word-count")[0];
  topWordCount.innerHTML = `<p>Processing your submission...</p>`
  let textArea = document.getElementsByTagName("textarea")[0]
  let userText = textArea.value
  textArea.value = ""
  Promise.all(userText.split(" ").map(function(word) {
    return sendOneWord(word);
  }))
  .then(() => populateTopWord())
  .catch(() => alert("Unable to populate word"))
}

function sendOneWord(word) {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}/words`, {
      method: "POST",
      headers: {
            'Content-Type': 'application/json'
        },
      body: JSON.stringify({
        word: {
          value: word
        }
      })
    })
    .then(response => response.json())
    .then(result => resolve(result))
    .catch(error => reject(error))
  })
}
