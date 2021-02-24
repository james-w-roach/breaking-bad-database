var $front = document.querySelector('#front-page');
var $ajaxList = document.querySelector('#ajax-list');
var $ul = document.querySelector('ul');
var $entryPage = document.querySelector('#entry-page');

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
    $img.setAttribute('id', object.id);
    $img.className = 'list-img';
    $column25.appendChild($img);

    var $column75 = document.createElement('div');
    $column75.className = 'column-75';
    $column75.setAttribute('id', object.id);
    $li.appendChild($column75);

    var $character = document.createElement('h2');
    $character.className = 'character-name';
    $character.textContent = object.name;
    $character.setAttribute('id', object.id);
    $column75.appendChild($character);
  } else {
    var $column = document.createElement('div');
    $column.className = 'column100';
    $column.setAttribute('id', object.id);
    $li.appendChild($column);

    var $name = document.createElement('h2');
    $name.className = 'name';
    $name.textContent = object.name;
    $name.setAttribute('id', object.id);
    $column.appendChild($name);
  }

  return $li;
}

function createEntryDOM(object) {
  var $entry = document.createElement('div');
  $entry.className = 'entry';

  var $title = document.createElement('h1');
  $title.className = 'entry-name';
  $title.textContent = object.name;
  $entry.appendChild($title);

  if (object.image) {
    var $img = document.createElement('img');
    $img.setAttribute('src', object.image);
    $img.className = 'entry-img';
    $entry.appendChild($img);
  }

  var $details = document.createElement('div');
  $details.className = 'details';
  $entry.appendChild($details);

  if (object.species) {
    var $charList = document.createElement('ul');
    $charList.className = 'char-entry';
    $details.appendChild($charList);

    var $loc = document.createElement('li');
    $loc.className = 'char-location';
    $loc.textContent = 'Location: ' + object.location.name;
    $charList.appendChild($loc);

    var $origin = document.createElement('li');
    $origin.className = 'char-origin';
    $origin.textContent = 'Origin: ' + object.origin.name;
    $charList.appendChild($origin);

    var $species = document.createElement('li');
    $species.className = 'char-species';
    $species.textContent = 'Species: ' + object.species;
    $charList.appendChild($species);

    if (object.type) {
      var $subSpecies = document.createElement('li');
      $subSpecies.className = 'char-type';
      $subSpecies.textContent = 'Info: ' + object.type;
      $charList.appendChild($subSpecies);
    }

    var $gender = document.createElement('li');
    $gender.className = 'char-gender';
    $gender.textContent = 'Gender: ' + object.gender;
    $charList.appendChild($gender);

    var $status = document.createElement('li');
    $status.className = 'char-status';
    $status.textContent = 'Status: ' + object.status;
    $charList.appendChild($status);
  } else if (object.residents) {
    var $locList = document.createElement('ul');
    $locList.className = 'location-entry';
    $details.appendChild($locList);

    var $dimension = document.createElement('li');
    $dimension.className = 'location-dimension';
    $dimension.textContent = 'Dimension: ' + object.dimension;
    $locList.appendChild($dimension);

    var $type = document.createElement('li');
    $type.className = 'location-type';
    $type.textContent = 'Type: ' + object.type;
    $locList.appendChild($type);
  } else {
    var $epList = document.createElement('ul');
    $epList.className = 'episode-entry';
    $details.appendChild($epList);

    var $date = document.createElement('li');
    $date.className = 'episode-date';
    $date.textContent = 'Air date: ' + object.air_date;
    $epList.appendChild($date);

    var $episode = document.createElement('li');
    $episode.className = 'episode';
    $episode.textContent = 'Episode: ' + object.episode;
    $epList.appendChild($episode);
  }

  return $entry;
}

function showEntry(event) {
  if (event.target.getAttribute('id') !== null) {
    $ajaxList.className = 'ajax-list hidden';
    var entryTree = createEntryDOM(xhr.response.results[(event.target.getAttribute('id') - 1)]);
    $entryPage.appendChild(entryTree);
    $entryPage.className = 'entry-page';
  }
}

$ul.addEventListener('click', showEntry);
