/* exported data */
var data = {
  current: {},
  Characters: [],
  Locations: [],
  Episodes: []
};

var localStorageJSON = localStorage.getItem('C-137 Data');

if (localStorageJSON) {
  data = JSON.parse(localStorageJSON);
}

function beforeUnload(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('C-137 Data', dataJSON);
}

window.addEventListener('beforeunload', beforeUnload);
