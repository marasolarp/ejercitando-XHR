/* llamamos loselementos a utilizar*/
const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchedForText;

/* agregamos el evento submit y lo que ejecutaremos*/

form.addEventListener('submit', function(e) {
  e.preventDefault();
  responseContainer.innerHTML = '';
  searchForText = searchField.value;
  getNews();
});
function getNews() {
  const articleRequest = new XMLHttpRequest();
  articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchForText}&api-key=74bc8da33f524959b94e458549675d65`);
  articleRequest.onload = addNews;
  articleRequest.onerror = handleError;
  articleRequest.send();
}
function handleError() {
  console.log('Se ha presentado un error');
}

function addNews() {
  const data = JSON.parse(this.responseText);
  const response = data.response.docs;
  response.forEach(function(element) {
    console.log(element);
    const snippet = element.snippet;
    let li = document.createElement('li');
    li.className = 'articleClass';
    li.innerText = snippet;

    responseContainer.appendChild(li);
  });
  /* console.log(data);
    console.log(response)
    const article = data.response.docs[0];
    const title = article.headline.main;;*/
}
