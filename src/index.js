const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const url = 'http://localhost:3000/toys'
let addToy = false
let divToy = document.querySelector('#toy-collection')

// YOUR CODE HERE
function getToys(){
  return fetch(url)
  .then(response => response.json())
  .then(allToys = > processToys(allToys))
}

function processToys(allToys){
  allToys.forEach(toy => toyCards(toy))
}

function postToy(aboutToy){
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

    body: JSON.stringify({
      "name": aboutToy.name.value,
      "image": aboutToy.image,
      "likes": 0
    })
  }
  .then(response => response.json())
  .then(objToy) => {
    let newToy = toyCards(objToy)
    divToy.append(newToy)
  })
}


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
