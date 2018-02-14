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
  // console.log(data);
  const response = data.response.docs;
  // console.log(response);
  for (var i = 4; i < response.length; i++) {
//llamo imagen
    let element = response[i];
    const img = element.multimedia[0].url;
    const linkImg = `https://cdn1.nyt.com/${img}`;
    console.log(linkImg);

    const snippet = element.snippet;
    const title = element.headline.main;


    let div = document.createElement('div');
    div.className = 'col-md-4 img-responsive';
    let imgP = document.createElement('img');
    imgP.setAttribute('src', linkImg);
    div.appendChild(imgP);

    let hFour = document.createElement('h4');
    hFour.innerText = title;
    div.appendChild(hFour);

    let paragraf = document.createElement('p');
    paragraf.innerHTML = snippet;

    div.appendChild(paragraf);
    responseContainer.appendChild(div);
  };

  /* console.log(data);
    console.log(response)
    const article = data.response.docs[0];
    const title = article.headline.main;
    const snippet=article.snippet;*/
}
