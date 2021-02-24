var $front = document.querySelector('#front-page');
var $ajaxList = document.querySelector('#ajax-list');
var $ul = document.querySelector('ul');

function categorySelect(event) {
  if (event.target.getAttribute('id') === 'chars-img' || event.target.getAttribute('id') === 'chars') {
    $front.className = 'hidden';
    $ajaxList.className = 'ajax-list';
    var char = 'character';
    getAPIData(char);
  } else if (event.target.getAttribute('id') === 'locations-img' || event.target.getAttribute('id') === 'locations') {
    $front.className = 'hidden';
    $ajaxList.className = 'ajax-list';
    var location = 'location';
    getAPIData(location);
  } else if (event.target.getAttribute('id') === 'episodes-img' || event.target.getAttribute('id') === 'episodes') {
    $front.className = 'hidden';
    $ajaxList.className = 'ajax-list';
    var episode = 'episode';
    getAPIData(episode);
  } else if (event.target.getAttribute('id') === 'favs-img' || event.target.getAttribute('id') === 'favs') {
    $front.className = 'hidden';
  }
}

window.addEventListener('click', categorySelect);

var xhr;

function getAPIData(category) {
  xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://rickandmortyapi.com/api/' + category);
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    loadDOM();
    window.addEventListener('DOMContentLoaded', loadDOM);
  });

  xhr.send();
}

function loadDOM(event) {
  for (var i = 0; i < xhr.response.results.length; i++) {
    var tree = createDOM(xhr.response.results[i]);
    $ul.appendChild(tree);
  }
}

function createDOM(object) {
  var $li = document.createElement('li');
  $li.className = 'list-item';

  if (object.image) {
    var $column25 = document.createElement('div');
    $column25.className = 'column-25';
    $li.appendChild($column25);

    var $img = document.createElement('img');
    $img.setAttribute('src', object.image);
    $img.className = 'list-img';
    $column25.appendChild($img);
  }

  var $column75 = document.createElement('div');
  $column75.className = 'column-75';
  $li.appendChild($column75);

  var $character = document.createElement('h2');
  $character.className = 'character-name';
  $character.textContent = object.name;
  $column75.appendChild($character);

  return $li;
}
