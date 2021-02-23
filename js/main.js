function categorySelect(event) {
  if (event.target.className === 'chars' || event.target.getAttribute('id') === 'chars') {
    console.log("you've selected characters");
  } else if (event.target.className === 'locations' || event.target.getAttribute('id') === 'locations') {
    console.log("you've selected locations");
  } else if (event.target.className === 'episodes' || event.target.getAttribute('id') === 'episodes') {
    console.log("you've selected episodes");
  } else if (event.target.className === 'favs' || event.target.getAttribute('id') === 'favs') {
    console.log("you've selected favorites");
  }
}

window.addEventListener('click', categorySelect);
