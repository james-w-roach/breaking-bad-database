var $front = document.querySelector('#front-page');
var $ul = document.querySelector('ul');

function categorySelect(event) {
  if (event.target.className === 'chars' || event.target.getAttribute('id') === 'chars') {
    $front.className = 'hidden';
  } else if (event.target.className === 'locations' || event.target.getAttribute('id') === 'locations') {
    $front.className = 'hidden';
  } else if (event.target.className === 'episodes' || event.target.getAttribute('id') === 'episodes') {
    $front.className = 'hidden';
  } else if (event.target.className === 'favs' || event.target.getAttribute('id') === 'favs') {
    $front.className = 'hidden';
  }
}

window.addEventListener('click', categorySelect);

function createDOM(object) {
  var $li = document.createElement('li');
  $li.className = 'list-item';

  var $column25 = document.createElement('div');
  $column25.className = 'column-25';
  $li.appendChild($column25);

  var $img = document.createElement('img');
  $img.setAttribute('src', object.image);
  $img.className = 'list-img';
  $column25.appendChild($img);

  var $column75 = document.createElement('div');
  $column75.className = 'column-75';
  $li.appendChild($column75);

  var $character = document.createElement('h2');
  $character.className = 'character-name';
  $character.textContent = object.name;
  $column75.appendChild($character);

  return $li;
}
