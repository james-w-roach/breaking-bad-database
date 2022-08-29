var $front = document.querySelector('#front-page-grid');
var $ajaxList = document.querySelector('#ajax-list');
var $ul = document.querySelector('.ajax-ul');
var $entryPage = document.querySelector('#entry-page');
var $back = document.querySelector('#back-button');
var $arrows = document.querySelector('#arrow-row');
var $searchBar = document.querySelector('#search-bar');
var $seriesButtons = document.querySelector('#series-button-row');
var $titleRow = document.querySelector('#title-row');
var $pageTitle = document.querySelector('#page-title');
var $spoilerSwitch = document.querySelector('#spoiler-switch');
var $spoilerButton = document.querySelector('#spoiler-button');

var entryCounter = 0;
var maxEntries = 22;

function categorySelect(event) {
  if (event.target.className === 'main-img' || event.target.className === 'category-select') {
    $front.className = 'hidden';
    $ajaxList.className = 'ajax-list';
    $back.className = 'fas fa-arrow-left';
  }
  if (event.target.getAttribute('id') === 'chars-img' || event.target.getAttribute('id') === 'chars') {
    $ajaxList.setAttribute('data-view', 'character');
    showPageTitle();
    appendLoader();
    getAPIData('characters');
    $spoilerSwitch.className = 'spoiler-switch';
  } else if (event.target.getAttribute('id') === 'episodes-img' || event.target.getAttribute('id') === 'episodes') {
    $ajaxList.setAttribute('data-view', 'episode');
    $seriesButtons.className = 'series-button-row';
    showPageTitle();
    appendLoader();
    getAPIData('episodes?series=Breaking+Bad');
    $spoilerSwitch.className = 'spoiler-switch';
  } else if (event.target.getAttribute('id') === 'favs-img' || event.target.getAttribute('id') === 'favs') {
    $ajaxList.setAttribute('data-view', 'favorites');
    $searchBar.className = 'row nav-row dynamic';
    showPageTitle();
    loadFavorites();
    $spoilerSwitch.className = 'spoiler-switch';
  } else if (event.target.getAttribute('id') === 'about-img' || event.target.getAttribute('id') === 'about') {
    $ajaxList.setAttribute('data-view', 'about');
    $searchBar.className = 'row nav-row dynamic';
    $spoilerSwitch.className = 'hidden';
    showPageTitle();
    showAbout();
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
    if (category === 'characters') {
      $arrows.className = 'arrow-row';
    }
  });

  xhr.addEventListener('error', () => {
    loadFailed();
  });

  xhr.send();
}

function appendLoader() {
  var $loader = document.createElement('div');
  $loader.className = 'loader';
  $ul.appendChild($loader);
}

function showPageTitle() {
  $titleRow.className = 'title-row';
  $pageTitle.className = 'page-title';
  var dataView = $ajaxList.getAttribute('data-view');
  $pageTitle.textContent = `${dataView[0].toUpperCase()}${dataView.slice(1)}`;
  if (dataView === 'character' || dataView === 'episode') {
    $pageTitle.textContent += 's';
  }
}

function loadFailed() {
  removeChildren($ul);
  var $li = document.createElement('li');
  $li.className = 'entry';
  var $h2 = document.createElement('h2');
  $h2.textContent = 'Failed to load';
  $h2.className = 'entry-name';
  $li.appendChild($h2);
  var $p = document.createElement('p');
  $p.textContent = 'Please make sure you are connected to the internet.';
  $p.className = 'message';
  $li.appendChild($p);
  $ul.appendChild($li);
}

function spoilerSwitch(event) {
  var container = event.target.getAttribute('id') === 'spoiler-button-container';
  var button = event.target.getAttribute('id') === 'spoiler-button';
  if ((button || container) && data.spoilers === 'off') {
    $spoilerButton.className = 'spoiler-button on';
    $spoilerButton.textContent = 'On';
    data.spoilers = 'on';
  } else if ((button || container)) {
    $spoilerButton.className = 'spoiler-button';
    $spoilerButton.textContent = 'Off';
    data.spoilers = 'off';
  }
}

window.addEventListener('click', spoilerSwitch);

function loadDOM(event) {
  removeChildren($ul);
  for (var i = 0; i < xhr.response.length; i++) {
    var tree = createDOM(xhr.response[i]);
    $ul.appendChild(tree);
  }
}

function createDOM(object) {
  var $li = document.createElement('li');
  if ($ajaxList.getAttribute('data-view') !== 'favorites' && object.char_id > 22) {
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

  var $entryTitle = document.createElement('div');
  $entryTitle.className = 'entry-title';
  $entry.appendChild($entryTitle);

  $entryTitle.appendChild(createEntryBack());

  var $title = document.createElement('h1');
  $title.className = 'entry-name';
  if (object.name) {
    $title.textContent = object.name;
  } else {
    $title.textContent = object.title;
  }
  $entryTitle.appendChild($title);

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
    $appears.textContent = 'Season Appearances:';
    if (data.spoilers === 'off') {
      $appears.className = 'hidden';
    } else {
      $appears.className = 'appearances';
    }
    $charList.appendChild($appears);

    if (object.appearance[0]) {
      var $breakingBad = document.createElement('li');
      if (data.spoilers === 'on') {
        $breakingBad.className = 'series';
      } else {
        $breakingBad.className = 'hidden';
      }
      $breakingBad.textContent = '- Breaking Bad: ';
      for (var j = 0; j < object.appearance.length; j++) {
        if (j !== object.appearance.length - 1) {
          $breakingBad.textContent += object.appearance[j] + ', ';
        } else {
          $breakingBad.textContent += object.appearance[j];
        }
      }
      $charList.appendChild($breakingBad);
    }

    if (object.better_call_saul_appearance[0]) {
      var $betterCallSaul = document.createElement('li');
      if (data.spoilers === 'on') {
        $betterCallSaul.className = 'series';
      } else {
        $betterCallSaul.className = 'hidden';
      }
      $betterCallSaul.textContent = '- Better Call Saul: ';
      for (var k = 0; k < object.better_call_saul_appearance.length; k++) {
        if (k !== object.better_call_saul_appearance.length - 1) {
          $betterCallSaul.textContent += object.better_call_saul_appearance[k] + ', ';
        } else {
          $betterCallSaul.textContent += object.better_call_saul_appearance[k];
        }
      }
      $charList.appendChild($betterCallSaul);
    }

    var $actor = document.createElement('li');
    $actor.className = 'char-actor';
    $actor.textContent = 'Portrayed by: ' + object.portrayed;
    $charList.appendChild($actor);

    var $status = document.createElement('li');
    if (data.spoilers === 'on') {
      $status.className = 'char-status';
    } else {
      $status.className = 'hidden';
    }
    $status.textContent = 'Status: ' + object.status;
    $charList.appendChild($status);
  } else {
    category = data.episodes;
    name = 'title';

    var $epList = document.createElement('ul');
    $epList.className = 'episode-entry';
    $details.appendChild($epList);

    var $season = document.createElement('li');
    $season.className = 'season';
    $season.textContent = 'Season: ' + object.season;
    $epList.appendChild($season);

    var $episode = document.createElement('li');
    $episode.className = 'episode';
    $episode.textContent = 'Episode: ' + object.episode;
    $epList.appendChild($episode);

    var $date = document.createElement('li');
    $date.className = 'episode-date';
    $date.textContent = 'Air date: ' + object.air_date;
    $epList.appendChild($date);

    var $characters = document.createElement('li');
    $characters.className = 'characters';
    $characters.textContent = 'Characters featured: ';
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
        if (id > 100) {
          entryTree = createEntryDOM(xhr.response[(id - 55)]);
          data.current = xhr.response[id - 55];
        } else {
          entryTree = createEntryDOM(xhr.response[(id - 1)]);
          data.current = xhr.response[id - 1];
        }
      }
      $searchBar.className = 'row entry-back';
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
    if ($ajaxList.getAttribute('data-view') === 'favorites') {
      $entryPage.className = 'entry-page fav-entry';
    } else {
      $entryPage.className = 'entry-page';
    }
    $entryPage.appendChild(entryTree);
    $ajaxList.className = 'ajax-list hidden';
    $arrows.className = 'hidden';
    $titleRow.className = 'hidden';
  }
}

$ul.addEventListener('click', showEntry);

function showFrontPage(event) {
  if (event.target.className === 'main-header') {
    $front.className = 'front-page-visible';
    $ajaxList.className = 'ajax-list hidden';
    removeChildren($ul);
    removeChildren($entryPage);
    $entryPage.className = 'entry-page hidden';
    $searchBar.className = 'row nav-row';
    $seriesButtons.className = 'hidden';
    $back.className = 'hidden';
    $titleRow.className = 'hidden';
    $arrows.className = 'hidden';
    entryCounter = 0;
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

function createEntryBack() {
  var $entryBack = document.createElement('button');
  $entryBack.setAttribute('id', 'entry-back');
  $entryBack.className = 'fas fa-arrow-left';
  return $entryBack;
}

function goBack(event) {
  var id = event.target.getAttribute('id');
  if (id === 'back-button') {
    if ($ajaxList.className === 'ajax-list') {
      $entryPage.className = 'entry-page hidden';
      $ajaxList.className = 'ajax-list hidden';
      $front.className = 'front-page-visible';
      removeChildren($ul);
      $back.className = 'hidden';
      $titleRow.className = 'hidden';
      entryCounter = 0;
      $arrows.className = 'hidden';
      $seriesButtons.className = 'hidden';
      data.series = 'Breaking Bad';
      $seriesButtons.children[0].className = 'active-category';
      $seriesButtons.children[1].className = 'inactive';
      $searchBar.className = 'row nav-row';
    }
  } else if (id === 'entry-back') {
    if ($entryPage.className === 'entry-page' || $entryPage.className === 'entry-page fav-entry') {
      $entryPage.className = 'entry-page hidden';
      $ajaxList.className = 'ajax-list';
      removeChildren($entryPage);
      if ($ajaxList.getAttribute('data-view') === 'character') {
        $arrows.className = 'arrow-row';
      } else {
        $arrows.className = 'hidden';
      }
      if ($ajaxList.getAttribute('data-view') !== 'favorites') {
        $searchBar.className = 'row nav-row';
      }
      data.current = {};
      showPageTitle();
    } else if ($entryPage.className === 'entry-page search') {
      $front.className = 'front-page-visible';
      $entryPage.className = 'entry-page hidden';
      removeChildren($entryPage);
      $back.className = 'hidden';
    } else if ($ajaxList.getAttribute('data-view') === 'about') {
      $ajaxList.className = 'ajax-list hidden';
      $front.className = 'front-page-visible';
      removeChildren($ul);
    }
  }
}

window.addEventListener('click', goBack);

function switchList(event) {
  if (event.target.getAttribute('id') === 'right' || event.target.getAttribute('id') === 'right-arrow') {
    if (entryCounter !== 44) {
      entryCounter += maxEntries;
    }
  }
  if (event.target.getAttribute('id') === 'left' || event.target.getAttribute('id') === 'left-arrow') {
    if (entryCounter !== 0) {
      entryCounter -= maxEntries;
    }
  }
  for (var i = 0; i < $ul.children.length; i++) {
    if (entryCounter === 0) {
      $ul.children[0].className = 'list-item';
    }
    if (i < entryCounter || i >= (entryCounter + 22)) {
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

function showAbout() {
  var $li = document.createElement('li');
  $li.className = 'entry';

  var $message = document.createElement('p');
  $message.className = 'message';
  $message.textContent = `A database including all of the characters and episodes
  from the hit TV shows Breaking Bad and Better Call Saul. Each episode and character
   has its own page containing various tidbits of information. Pages can be accessed by clicking
   on a category from the home page or by using the search bar. Every page can be saved to your
   Favorites list for future reference. To prevent plot details such as character status and season
   appearances from being spoiled, set the Spoilers button to 'Off' in the top right corner. All of
   the information and most of the images on this site are provided by the Breaking Bad API.`;
  $li.appendChild($message);

  var $link = document.createElement('a');
  $link.textContent = 'Breaking Bad API';
  $link.setAttribute('href', 'https://breakingbadapi.com/');
  $li.appendChild($link);

  $ul.appendChild($li);
}

function loadFavorites() {
  for (var key in data) {
    if (key !== 'current' && key !== 'series' && key !== 'spoilers') {
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
    showPageTitle();
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
    appendLoader();
    getAPIData('episodes?series=Better+Call+Saul');
  } else if (event.target.className === 'inactive' && event.target.textContent === 'Breaking Bad') {
    event.target.className = 'active-category';
    $seriesButtons.children[1].className = 'inactive';
    data.series = 'Breaking Bad';
    removeChildren($ul);
    appendLoader();
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
    removeChildren($ul);
    $entryPage.className = 'entry-page search';
    $back.className = 'fas fa-arrow-left';
    $titleRow.className = 'hidden';
    $entryPage.appendChild(entryTree);
    data.current = xhr.response[0];
    $front.className = 'hidden';
    $arrows.className = 'hidden';
    $seriesButtons.className = 'hidden';
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
      }
    }
    $searchInput.value = '';
    removeChildren($entryPage);
    removeChildren($ul);
    $entryPage.className = 'entry-page search';
    $back.className = 'fas fa-arrow-left';
    $titleRow.className = 'hidden';
    $front.className = 'hidden';
    $arrows.className = 'hidden';
    $seriesButtons.className = 'hidden';
    if (entryTree) {
      $entryPage.appendChild(entryTree);
    } else {
      entryTree = createErrorMessage();
      $entryPage.appendChild(entryTree);
    }
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
  $message.textContent = 'Please check if the correct category is selected. If you are looking for a character, simply type their first name or full name into the search bar and press enter. Also make sure to check for spelling errors and include spaces where needed.';
  $content.appendChild($message);

  return $entry;
}
