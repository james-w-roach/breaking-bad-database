var $front = document.querySelector('#front-page');
var $ajaxList = document.querySelector('#ajax-list');
var $ul = document.querySelector('ul');
var $entryPage = document.querySelector('#entry-page');
var $back = document.querySelector('#back-button');
var $arrows = document.querySelector('#arrow-row');
var $searchAndBack = document.querySelector('#searchAndBack');

var count = 1;

function categorySelect(event) {
  if (event.target.className === 'main-img' || event.target.className === 'button') {
    $front.className = 'hidden';
    $ajaxList.className = 'ajax-list';
    $back.className = 'fas fa-arrow-left';
    $arrows.className = 'arrow-row';
  }
  if (event.target.getAttribute('id') === 'chars-img' || event.target.getAttribute('id') === 'chars') {
    $ajaxList.setAttribute('data-view', 'character');
    getAPIData('character');
  } else if (event.target.getAttribute('id') === 'locations-img' || event.target.getAttribute('id') === 'locations') {
    $ajaxList.setAttribute('data-view', 'location');
    getAPIData('location');
  } else if (event.target.getAttribute('id') === 'episodes-img' || event.target.getAttribute('id') === 'episodes') {
    $ajaxList.setAttribute('data-view', 'episode');
    getAPIData('episode');
  } else if (event.target.getAttribute('id') === 'favs-img' || event.target.getAttribute('id') === 'favs') {
    $ajaxList.setAttribute('data-view', 'favorites');
    loadFavorites();
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

  var $content = document.createElement('div');
  $content.className = 'content';
  $entry.appendChild($content);

  if (object.image) {
    var $img = document.createElement('img');
    $img.setAttribute('src', object.image);
    $img.className = 'entry-img';
    $content.appendChild($img);
  }

  var $details = document.createElement('div');
  $details.className = 'details';
  $content.appendChild($details);

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

  var $saveButton = document.createElement('button');
  $saveButton.className = 'save-button';
  $saveButton.setAttribute('id', 'save-button');
  $saveButton.textContent = 'Save to Favorites';
  $entry.appendChild($saveButton);

  return $entry;
}

function showEntry(event) {
  if (event.target.getAttribute('id') !== null) {
    $ajaxList.className = 'ajax-list hidden';
    var id = event.target.getAttribute('id');
    if (id < 21) {
      var entryTree = createEntryDOM(xhr.response.results[(id - 1)]);
      data.current = xhr.response.results[id - 1];
    } else {
      id = id - (((xhr.response.info.prev[xhr.response.info.prev.length - 1]) * 20) + 1);
      entryTree = createEntryDOM(xhr.response.results[id]);
      data.current = xhr.response.results[id];
    }
    $entryPage.appendChild(entryTree);
    $entryPage.className = 'entry-page';
    $arrows.className = 'hidden';
    $searchAndBack.className = 'row entry-back';
  }
}

$ul.addEventListener('click', showEntry);

function showFrontPage(event) {
  if (event.target.className === 'main-header') {
    $front.className = 'front-page';
    $ajaxList.className = 'ajax-list hidden';
    removeChildren($ul);
    removeChildren($entryPage);
    $entryPage.className = 'entry-page hidden';
    $back.className = 'hidden';
    $arrows.className = 'hidden';
    count = 1;
    data.current = {};
  }
}

window.addEventListener('click', showFrontPage);

function removeChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function goBack(event) {
  if (event.target.getAttribute('id') === 'back-button') {
    if ($entryPage.className === 'entry-page') {
      $entryPage.className = 'entry-page hidden';
      $ajaxList.className = 'ajax-list';
      removeChildren($entryPage);
      $arrows.className = 'arrow-row';
      $searchAndBack.className = 'row nav-row';
      data.current = {};
    } else if ($ajaxList.className === 'ajax-list') {
      $entryPage.className = 'entry-page hidden';
      $ajaxList.className = 'ajax-list hidden';
      $front.className = 'front-page';
      removeChildren($ul);
      $back.className = 'hidden';
      count = 1;
      $arrows.className = 'hidden';
    }
  }
}

window.addEventListener('click', goBack);

function switchList(event) {
  if (event.target.getAttribute('id') === 'right' || event.target.getAttribute('id') === 'right-arrow') {
    removeChildren($ul);
    count++;
    var current = determineView() + count;
    getAPIData(current);
  } if (event.target.getAttribute('id') === 'left' || event.target.getAttribute('id') === 'left-arrow') {
    removeChildren($ul);
    count--;
    current = determineView() + count;
    getAPIData(current);
  }
}

function determineView() {
  if ($ajaxList.getAttribute('data-view') === 'character') {
    return 'character/?page=';
  } else if ($ajaxList.getAttribute('data-view') === 'location') {
    return 'location/?page=';
  } else if ($ajaxList.getAttribute('data-view') === 'episode') {
    return 'episode/?page=';
  }
}

window.addEventListener('click', switchList);

function saveEntry(event) {
  if (event.target.getAttribute('id') === 'save-button') {
    if (data.current.species) {
      data.characters.push(data.current);
    } else if (data.current.air_date) {
      data.episodes.push(data.current);
    } else {
      data.locations.push(data.current);
    }
    event.target.textContent = 'Saved to Favorites!';
  }
}

$entryPage.addEventListener('click', saveEntry);

function loadFavorites() {
  if (Boolean(data.characters[0]) === false && Boolean(data.locations[0]) === false && Boolean(data.episodes[0]) === false) {
    var $message = document.createElement('li');
    $message.textContent = 'No Favorites Added Yet';
    $ul.appendChild($message);
  } else {
    for (var i = 0; i < data.characters.length; i++) {
      var favDOM = createDOM(data.characters[i]);
      $ul.appendChild(favDOM);
    }
  }
}
