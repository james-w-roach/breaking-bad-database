/* exported data */
var data = {
  current: {},
  series: 'Breaking Bad',
  spoilers: 'off',
  characters: [],
  episodes: []
};

var localStorageJSON = localStorage.getItem('Data');

if (localStorageJSON) {
  data.characters = JSON.parse(localStorageJSON).characters;
  data.episodes = JSON.parse(localStorageJSON).episodes;
}

function beforeUnload(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('Data', dataJSON);
}

window.addEventListener('beforeunload', beforeUnload);
