var $front = document.querySelector('#front-page');
var $ajaxList = document.querySelector('#ajax-list');
var $ul = document.querySelector('.ajax-ul');
var $entryPage = document.querySelector('#entry-page');
var $back = document.querySelector('#back-button');
var $arrows = document.querySelector('#arrow-row');
var $searchAndBack = document.querySelector('#searchAndBack');
var $seriesButtons = document.querySelector('#series-button-row');

var count = 0;

function categorySelect(event) {
  if (event.target.className === 'main-img' || event.target.className === 'button') {
    $front.className = 'hidden';
    $ajaxList.className = 'ajax-list';
    $back.className = 'fas fa-arrow-left';
  }
  if (event.target.getAttribute('id') === 'chars-img' || event.target.getAttribute('id') === 'chars') {
    $ajaxList.setAttribute('data-view', 'character');
    getAPIData('characters');
    $arrows.className = 'arrow-row';
  } else if (event.target.getAttribute('id') === 'episodes-img' || event.target.getAttribute('id') === 'episodes') {
    $ajaxList.setAttribute('data-view', 'episode');
    $seriesButtons.className = 'series-button-row';
    getAPIData('episodes?series=Breaking+Bad');
  } else if (event.target.getAttribute('id') === 'favs-img' || event.target.getAttribute('id') === 'favs') {
    $ajaxList.setAttribute('data-view', 'favorites');
    $arrows.className = 'hidden';
    loadFavorites();
  }
}

window.addEventListener('click', categorySelect);

var xhr;

function getAPIData(category) {
  xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.breakingbadapi.com/api/' + category);
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    loadDOM();
  });

  xhr.send();
}

function loadDOM(event) {
  for (var i = 0; i < xhr.response.length; i++) {
    var tree = createDOM(xhr.response[i]);
    $ul.appendChild(tree);
  }
}

function createDOM(object) {
  var $li = document.createElement('li');
  if (object.char_id > 21) {
    $li.className = 'list-item hidden';
  } else {
    $li.className = 'list-item';
  }

  if (object.img) {
    $li.setAttribute('id', object.char_id);

    var $column25 = document.createElement('div');
    $column25.className = 'column-25';
    $li.appendChild($column25);

    var $img = document.createElement('img');
    $img.setAttribute('src', object.img);
    $img.setAttribute('id', object.char_id);
    $img.setAttribute('data-category', 'characters');
    $img.className = 'list-img';
    $column25.appendChild($img);

    var $column75 = document.createElement('div');
    $column75.className = 'column-75';
    $column75.setAttribute('id', object.char_id);
    $column75.setAttribute('data-category', 'characters');
    $li.appendChild($column75);

    var $character = document.createElement('h2');
    $character.className = 'character-name';
    $character.textContent = object.name;
    $character.setAttribute('id', object.char_id);
    $character.setAttribute('data-category', 'characters');
    $column75.appendChild($character);
  } else if (object.air_date) {
    $li.setAttribute('id', object.episode_id);

    var $column = document.createElement('div');
    $column.className = 'column100';
    $column.setAttribute('id', object.episode_id);
    $column.setAttribute('data-category', 'episodes');
    $li.appendChild($column);

    var $name = document.createElement('h2');
    $name.className = 'name';
    $name.textContent = object.title;
    $name.setAttribute('id', object.episode_id);
    $name.setAttribute('data-category', 'episodes');
    $column.appendChild($name);
  }
  return $li;
}

function createEntryDOM(object) {
  var $entry = document.createElement('div');
  $entry.className = 'entry';

  var $title = document.createElement('h1');
  $title.className = 'entry-name';
  if (object.name) {
    $title.textContent = object.name;
  } else {
    $title.textContent = object.title;
  }
  $entry.appendChild($title);

  var $content = document.createElement('div');
  $content.className = 'content';
  $entry.appendChild($content);

  if (object.img) {
    var $img = document.createElement('img');
    $img.setAttribute('src', object.img);
    $img.className = 'entry-img';
    $content.appendChild($img);
  }

  var $details = document.createElement('div');
  $details.className = 'details';
  $content.appendChild($details);

  if (object.occupation) {
    var category = data.characters;
    var name = 'name';

    var $charList = document.createElement('ul');
    $charList.className = 'char-entry';
    $details.appendChild($charList);

    var $occupation = document.createElement('li');
    $occupation.className = 'char-occ';
    $occupation.textContent = 'Occupation: ';
    for (var i = 0; i < object.occupation.length; i++) {
      $occupation.textContent += object.occupation[i];
      if (i !== object.occupation.length - 1) {
        $occupation.textContent += ', ';
      }
    }
    $charList.appendChild($occupation);

    if (object.birthday !== 'Unknown') {
      var $birthday = document.createElement('li');
      $birthday.className = 'char-birthday';
      $birthday.textContent = 'Birthday: ' + object.birthday;
      $charList.appendChild($birthday);
    }

    var $nickname = document.createElement('li');
    $nickname.className = 'char-nickname';
    $nickname.textContent = 'Nickname: ' + object.nickname;
    $charList.appendChild($nickname);

    var $appears = document.createElement('li');
    $appears.textContent = 'Appears in:';
    $charList.appendChild($appears);

    if (object.appearance) {
      var $breakingBad = document.createElement('li');
      $breakingBad.className = 'series';
      $breakingBad.textContent = 'Breaking Bad: Seasons ';
      for (var j = 0; j < object.appearance.length; j++) {
        if (j !== object.appearance.length - 1) {
          $breakingBad.textContent += object.appearance[j] + ', ';
        } else {
          $breakingBad.textContent += ' and ' + object.appearance[j];
        }
      }
      $charList.appendChild($breakingBad);
    }

    if (!object.better_call_saul_appearance) {
      var $betterCallSaul = document.createElement('li');
      $betterCallSaul.className = 'series';
      $betterCallSaul.textContent = 'Better Call Saul: Seasons ';
      for (var k = 0; k < object.better_call_saul_appearance.length; k++) {
        if (k !== object.better_call_saul_appearance.length - 1) {
          $betterCallSaul.textContent += object.better_call_saul_appearance[k] + ', ';
        } else {
          $betterCallSaul.textContent += ', and ' + object.better_call_saul_appearance[k];
        }
      }
      $charList.appendChild($betterCallSaul);
    }

    var $actor = document.createElement('li');
    $actor.className = 'char-actor';
    $actor.textContent = 'Protrayed by: ' + object.portrayed;
    $charList.appendChild($actor);

    var $status = document.createElement('li');
    $status.className = 'char-status';
    $status.textContent = 'Status: ' + object.status;
    $charList.appendChild($status);
  } else {
    category = data.episodes;
    name = 'title';

    var $epList = document.createElement('ul');
    $epList.className = 'episode-entry';
    $details.appendChild($epList);

    var $date = document.createElement('li');
    $date.className = 'episode-date';
    $date.textContent = 'Air date: ' + object.air_date;
    $epList.appendChild($date);

    var $episode = document.createElement('li');
    $episode.className = 'episode';
    $episode.textContent = 'Episode #: ' + object.episode;
    $epList.appendChild($episode);

    var $characters = document.createElement('li');
    $characters.className = 'characters';
    $characters.textContent = 'Characters involved: ';
    for (var m = 0; m < object.characters.length; m++) {
      if (m !== object.characters.length - 1) {
        $characters.textContent += object.characters[m] + ', ';
      } else {
        $characters.textContent += object.characters[m];
      }
    }
    $epList.appendChild($characters);

  }
  if (!category[0]) {
    var save = createSaveButton();
    $entry.appendChild(save);
  } else {
    for (var l = 0; l < category.length; l++) {
      if (category[l][name] === object[name]) {
        if ($ajaxList.getAttribute('data-view') === 'favorites') {
          var deleteButton = createDeleteButton();
          $entry.appendChild(deleteButton);
        }
        return $entry;
      }
    }
    save = createSaveButton();
    $entry.appendChild(save);
  }
  return $entry;
}

function showEntry(event) {
  if (event.target.getAttribute('id') !== null) {
    if ($ajaxList.getAttribute('data-view') !== 'favorites') {
      var id = event.target.getAttribute('id');
      if (data.series === 'Better Call Saul') {
        var entryTree = createEntryDOM(xhr.response[id - 63]);
        data.current = xhr.response[id - 63];
      } else {
        entryTree = createEntryDOM(xhr.response[(id - 1)]);
        data.current = xhr.response[id - 1];
      }
    } else {
      var category = event.target.getAttribute('data-category');
      if (category === 'episodes') {
        var idType = 'episode_id';
      } else {
        idType = 'char_id';
      }
      for (var i = 0; i < data[category].length; i++) {
        if (data[category][i][idType].toString() === event.target.getAttribute('id')) {
          entryTree = createEntryDOM(data[category][i]);
          data.current = data[category][i];
        }
      }
    }
    $entryPage.appendChild(entryTree);
    $ajaxList.className = 'ajax-list hidden';
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
    count = 0;
    data.current = {};
    data.series = 'Breaking Bad';
    $seriesButtons.children[0].className = 'active-category';
    $seriesButtons.children[1].className = 'inactive';
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
      if ($ajaxList.getAttribute('data-view') === 'favorites') {
        $arrows.className = 'hidden';
      } else {
        $arrows.className = 'arrow-row';
      }
      $searchAndBack.className = 'row nav-row';
      data.current = {};
    } else if ($entryPage.className === 'entry-page search') {
      $front.className = 'front-page';
      $entryPage.className = 'entry-page hidden';
      removeChildren($entryPage);
      $back.className = 'hidden';
    } else if ($ajaxList.className === 'ajax-list') {
      $entryPage.className = 'entry-page hidden';
      $ajaxList.className = 'ajax-list hidden';
      $front.className = 'front-page';
      removeChildren($ul);
      $back.className = 'hidden';
      count = 0;
      $arrows.className = 'hidden';
      $seriesButtons.className = 'hidden';
      data.series = 'Breaking Bad';
      $seriesButtons.children[0].className = 'active-category';
      $seriesButtons.children[1].className = 'inactive';
    }
  }
}

window.addEventListener('click', goBack);

function switchList(event) {
  if (event.target.getAttribute('id') === 'right' || event.target.getAttribute('id') === 'right-arrow') {
    if (count !== 42) {
      count += 21;
    }
  }
  if (event.target.getAttribute('id') === 'left' || event.target.getAttribute('id') === 'left-arrow') {
    if (count !== 0) {
      count -= 21;
    }
  }
  for (var i = 0; i < $ul.children.length; i++) {
    if (count === 0) {
      $ul.children[0].className = 'list-item';
    }
    if (i <= count || i > (count + 20)) {
      $ul.children[i].className = 'hidden';
    } else {
      $ul.children[i].className = 'list-item';
    }
  }
}

$arrows.addEventListener('click', switchList);

function saveEntry(event) {
  if (event.target.getAttribute('id') === 'save-button') {
    if (data.current.name) {
      data.characters.push(data.current);
    } else if (data.current.air_date) {
      data.episodes.push(data.current);
    }
    event.target.className = 'hidden';
  }
}

$entryPage.addEventListener('click', saveEntry);

function loadFavorites() {
  for (var key in data) {
    if (key !== 'current' && key !== 'series') {
      var cat = document.createElement('li');
      cat.textContent = keyToString(key);
      cat.className = 'fav-category';
      $ul.appendChild(cat);
      if (!data[key][0]) {
        var $message = document.createElement('li');
        $message.textContent = 'No Favorites Added Yet';
        $message.className = 'no-favs';
        $ul.appendChild($message);
      } else {
        for (var i = 0; i < data[key].length; i++) {
          var favDOM = createDOM(data[key][i]);
          $ul.appendChild(favDOM);
        }
      }
    }
  }
}

function createSaveButton() {
  var $saveButton = document.createElement('button');
  $saveButton.className = 'save-button';
  $saveButton.setAttribute('id', 'save-button');
  $saveButton.textContent = 'Save to Favorites';
  return $saveButton;
}

function createDeleteButton() {
  var $deleteButton = document.createElement('button');
  $deleteButton.className = 'delete-button';
  $deleteButton.setAttribute('id', 'delete-button');
  $deleteButton.textContent = 'Remove from Favorites';
  return $deleteButton;
}

function deleteEntry(event) {
  if (event.target.className === 'delete-button') {
    if (data.current.occupation) {
      var category = 'characters';
      var id = 'char_id';
    } else if (data.current.air_date) {
      category = 'episodes';
      id = 'episode_id';
    }
    for (var i = 0; i < data[category].length; i++) {
      if (data.current[id] === data[category][i][id]) {
        data[category].splice(i, 1);
      }
    }
    removeChildren($entryPage);
    removeChildren($ul);
    data.current = {};
    loadFavorites();
    $entryPage.className = 'hidden';
    $ajaxList.className = 'ajax-list';
  }
}

$entryPage.addEventListener('click', deleteEntry);

function keyToString(key) {
  var string = key.toString();
  var string2 = '';
  string2 += string[0].toUpperCase();
  for (var i = 1; i < string.length; i++) {
    string2 += string[i];
  }
  return string2;
}

function changeSeries(event) {
  if (event.target.className === 'inactive' && event.target.textContent === 'Better Call Saul') {
    event.target.className = 'active-category';
    $seriesButtons.children[0].className = 'inactive';
    data.series = 'Better Call Saul';
    removeChildren($ul);
    getAPIData('episodes?series=Better+Call+Saul');
  } else if (event.target.className === 'inactive' && event.target.textContent === 'Breaking Bad') {
    event.target.className = 'active-category';
    $seriesButtons.children[1].className = 'inactive';
    data.series = 'Breaking Bad';
    removeChildren($ul);
    getAPIData('episodes?series=Breaking+Bad');
  }
}

$seriesButtons.addEventListener('click', changeSeries);

var $searchInput = document.querySelector('#search');
var $categoryInput = document.querySelector('#category-selector');

function searchAPI(event) {
  event.preventDefault();
  var newString = convertStringToAPI($searchInput.value);
  if ($categoryInput.value === 'characters') {
    loadCharEntry('characters?name=' + newString);
  } else if ($categoryInput.value === 'breaking-bad-episodes') {
    loadEpEntry('episodes?series=Breaking+Bad', newString);
  } else if ($categoryInput.value === 'better-call-saul-episodes') {
    loadEpEntry('episodes?series=Better+Call+Saul', newString);
  }
}

window.addEventListener('submit', searchAPI);

function convertStringToAPI(string) {
  var APIString = '';
  for (var i = 0; i < string.length; i++) {
    if (i === 0 || (string[i - 1]) === ' ') {
      APIString += string[i].toUpperCase();
    } else if (string[i] === ' ') {
      APIString += '+';
    } else {
      APIString += string[i].toLowerCase();
    }
  }
  return APIString;
}

function loadCharEntry(category) {
  xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.breakingbadapi.com/api/' + category);
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    if (xhr.response[0]) {
      var entryTree = createEntryDOM(xhr.response[0]);
    } else {
      entryTree = createErrorMessage();
    }
    $searchInput.value = '';
    removeChildren($entryPage);
    $entryPage.className = 'entry-page search';
    $back.className = 'fas fa-arrow-left';
    $entryPage.appendChild(entryTree);
    $front.className = 'hidden';
  });

  xhr.send();
}

function loadEpEntry(series, episode) {
  xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.breakingbadapi.com/api/' + series);
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    for (var i = 0; i < xhr.response.length; i++) {
      if (xhr.response[i].title === episode) {
        var entryTree = createEntryDOM(xhr.response[i]);
        data.current = xhr.response[i];
      } else {
        entryTree = createErrorMessage();
      }
    }
    $searchInput.value = '';
    removeChildren($entryPage);
    $entryPage.className = 'entry-page search';
    $back.className = 'fas fa-arrow-left';
    $entryPage.appendChild(entryTree);
    $front.className = 'hidden';
  });

  xhr.send();
}

function createErrorMessage() {
  var $entry = document.createElement('div');
  $entry.className = 'entry';

  var $title = document.createElement('h1');
  $title.className = 'entry-name';
  $title.textContent = 'No matching results';
  $entry.appendChild($title);

  var $content = document.createElement('div');
  $content.className = 'content';
  $entry.appendChild($content);

  var $message = document.createElement('p');
  $message.className = 'message';
  $message.textContent = 'Please ensure the correct category is selected. Also make sure to check for spelling errors and to include spaces.';
  $content.appendChild($message);

  return $entry;
}
