const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')

const toyList = document.querySelector('div#toy-collection')
const toyUrl = 'http://localhost:3000/toys'
const toyName = document.querySelector('input[name="name"]')
const toyImage = document.querySelector('input[name="image"]')
let toys = [ ]

function postToy(info){
  let toy = {
    name: toyName.value,
    image: toyImage.value,
    likes: 0
  }

  fetch(url, {
    method: 'POST',
    headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
    },
    body: JSON.stringify(toy)
  })

  .then(response => response.json())
  .then(toy => {
    toyList.push(toy);
    displayToys();
  })
}

toyForm.addEventListener('submit', addToy)
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})
document.addEventListener('DOMContentLoaded', function(){
  fetch(url)
  .then(response => response.json())
  .then(addToy)
})

function addToys(data){
  toys = data;
  displayToys();
}

function displayToys(){
  toyList.innerHTML = " "
  toys.forEach(toy => formatElements(toy))
}

function formatElements(toy){
  let div = document.createElement('div');
  let h2 = document.createElement('h2');
  let img = document.createElement('img');
  let p = document.createElement('p');
  let button = document.createElement('button');

  div.className = 'card';
  h2.textContent = toy.name;
  p.textContent = toy.likes;

  img.src = toy.image;
  img.className = "toy-avatar";

  button.innerText = "Like";
  button.className = "like-btn";
  button.id = toy.id;
  button.addEventListener('click', incrementLikes);

  div.appendChild(h2);
  div.appendChild(img);
  div.appendChild(p);
  div.appendChild(button);

  toyList.appendChild(div);
}


function incrementLikes(toy){
  let toy = toys.find(toy => toy.id === id);
  toy.likes += 1;

  fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({likes: toy.likes})
  })
  .then(response => response.json)
  .then(json => displayToys)
}