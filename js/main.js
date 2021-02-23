var $front = document.querySelector('#front-page');

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
