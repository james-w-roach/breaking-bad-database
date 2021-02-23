function categorySelect(event) {
  if (event.target.className === 'chars' || event.target.getAttribute('id') === 'chars') {
    event.target.className = 'chars';
  } else if (event.target.className === 'locations' || event.target.getAttribute('id') === 'locations') {
    event.target.className = 'locations';
  } else if (event.target.className === 'episodes' || event.target.getAttribute('id') === 'episodes') {
    event.target.className = 'episodes';
  } else if (event.target.className === 'favs' || event.target.getAttribute('id') === 'favs') {
    event.target.className = 'favs';
  }
}

window.addEventListener('click', categorySelect);
