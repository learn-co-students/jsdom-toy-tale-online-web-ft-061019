const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toysUrl = 'http://localhost:3000/toys'
let div = document.querySelector('#toy-collection')

function getToys() {
  return fetch(toysUrl)
  .then(resp => resp.json())
  .then(alltoys => processToys(allToys))
}

function configureToys(allToys){
  allToys.forEach(toy => toyCards(toy))
}

function postToy(toy_info){
  fetch('http://localhost:3000/toys', {method: 'POST', headers: {'Content-Type': 'application/json',
  'Accept': 'appication/json'},
  body: JSON.stringify({ 'name': toy_info.name.value, 'image': toy_info.image, 'likes': 0
  })

})
 .then(resp => resp.json())
 .then((obj_toy) => {
   let addAToy = toyCards(obj_toy)
   divToys.append(addAToy)
  })
}

function toyCards(toy) {
  let element = document.createElement("h2")
  element.innerText = toy.name

  let image = document.createElement('img')
  image.setAttribute('src', toy.image)
  image.setAttribute('class', 'toy-avatar')

  let p = document.createElement("p")
  p.innerText = `${toy.likes} Likes`
  
  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = "Like!"
  btn.addEventListener('click', likeToy)

  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.append(element, image, p, btn)
  divToys.append(divCard)
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
