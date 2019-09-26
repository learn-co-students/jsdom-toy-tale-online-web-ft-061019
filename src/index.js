const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toysUrl = 'http://localhost:3000/toys'
let addToy = false
let divToys = document.querySelector('#toy-collection')

// YOUR CODE HERE
function getToys() {
  return fetch(toysUrl)
  .then(res => res.json())
  .then(allToys => processToys(allToys))
}

function processToys(allToys) {
  allToys.forEach(toy => toyCards(toy))
}

function postToy(toy_info){
  fetch('http://localhost:3000/toys', {
    method: 'POST', 
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

    body: JSON.stringify({
      "name": toy_info.name.value,
      "image": toy_info.image,
      "likes": 0
    })

  })
    .then(res => res.json())
    .then((obj_toy) => {
    let new_toy = toyCards(obj_toy)
    divToys.append(new_toy)
  })
}

function toyCards(toy) {
  let h2 = document.createElement('h2')
    h2.innerText = toy.name

  let img = document.createElement('img')
    img.setAttribute('src', toy.image)
    img.setAttribute('class', 'toy-avatar')

  let p = document.createElement('p')
    p.innerText = `${toy.likes} Likes`

  let btn = document.createElement('button')
    btn.setAttribute('class', 'like-btn')
    btn.setAttribute('id', toy.id)
    btn.innerText = "Like <3"
    btn.addEventListener("click", likeToy)

  let divCard = document.createElement('div')
    divCard.setAttribute('class', 'card')
    divCard.append(h2, img, p, btn)
    divToys.append(divCard)
}

function likeToy(event) {
  event.preventDefault()
  const toyId = this.getAttribute("id")
  const toyUrl = `${toysUrl}/${toyId}`

  const likeCountPTag = this.parentElement.getElementsByTagName("p")[0]
   // Get the current like count from the p tag in this card 
  let  likeCount = parseInt(likeCountPTag.textContent.split(" ")[0])
   // increment that like count
  likeCount++  
   // then I need to persist that like count to my server (PATCH) by toy id -- /toys/1 for Woody
  fetch(toyUrl, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }, 
    body: JSON.stringify({
      "likes": likeCount
    })
  })
   // if that is successful, then update the pTag to the new like count
   .then(res => res.json())
   .then((like_toy => { event.target.previousElementSibling.innerText = `${likeCount} Likes`;
  }))
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', event => {
      event.preventDefault()
      postToy(event.target)
    })
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!

document.addEventListener("DOMContentLoaded", function() {
  getToys()

})