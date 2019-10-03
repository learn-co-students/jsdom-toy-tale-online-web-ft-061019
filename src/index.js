const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyList = document.querySelector('div#toy-collection')
let showForm = false

let toys = [];

let headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

// YOUR CODE HERE

const getToyName = () => document.querySelector('input[name="name"]')
const getToyImage = () => document.querySelector('input[name="image"]')

const addToy = e => {
  e.preventDefault();
  let toy = {
    name: getToyName().value,
    image: getToyImage().value,
    likes: 0
  }

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers,
    body: JSON.stringify(toy)
  })
  .then(parseJson)
  .then(toy => {
    toys.push(toy);
    renderToys();
  })
}

toyForm.addEventListener('submit', addToy)

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  showForm = !showForm
  if (showForm) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
document.addEventListener('DOMContentLoaded', function() {
  fetchToys();
})

const fetchToys = () => {
  fetch('http://localhost:3000/toys')
  .then(parseJson)
  .then(addToys)
}

const parseJson = resp => resp.json();

const addToys = (data) => {
  toys = data;
  renderToys();
}

const renderToys = () => {
  toyList.innerHTML = ''
  toys.forEach(toy => renderToy(toy))
}

const renderToy = toy => {
  let div = document.createElement('div')
  div.className = 'card'

  let h2 = document.createElement('h2');
  h2.textContent = toy.name;
  div.appendChild(h2);

  let img = document.createElement('img');
  img.src = toy.image;
  img.className = "toy-avatar"
  div.appendChild(img);

  let p = document.createElement('p');
  p.textContent = toy.likes;
  div.appendChild(p);

  let button = document.createElement('button');
  button.innerText = 'Like <3'
  button.className = 'like-btn'
  button.id = toy.id
  button.addEventListener('click', upvote);
  div.appendChild(button)

  toyList.appendChild(div);
}

const upvote = e => {
  let id = parseInt(e.target.id, 10);
  let toy = toys.find(toy => toy.id === id);
  toy.likes += 1;
  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({likes: toy.likes})
  })
  .then(parseJson)
  .then(json => renderToys())
}