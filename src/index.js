const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

const toyUrl = 'http://localhost:3000/toys'
const parseJSON = response => response.json()
const toyCollection = document.querySelector("#toy-collection")

function fetchToys(){
  return fetch(toyUrl)
    .then(parseJSON)
  
}

function renderToys(toy){
  
    let h2 = document.createElement('h2')
    h2.innerHTML = `${toy.name}`

    let img = document.createElement('img')
    img.setAttribute('src', toy.image)
    img.setAttribute('class', 'toy-avatar')

    let p = document.createElement('p')
    p.innerText = `${toy.likes} likes`

    let likeBtn = document.createElement('button')
    likeBtn.setAttribute('class', 'like-btn')
    likeBtn.setAttribute('id', toy.id)
    likeBtn.innerText = 'Like <3'
    likeBtn.addEventListener('click', increaseLikes)

    

    let divCard = document.createElement('div')
    divCard.setAttribute('class', 'card')
    divCard.append(h2, img, p, likeBtn)
    toyCollection.append(divCard)
    
   
  }

function increaseLikes(event) {
  let increase = parseInt(event.target.previousElementSibling.innerText) + 1
  event.preventDefault()

  fetch(`http://localhost:3000/toys/${event.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },

    body: JSON.stringify({
      'likes': increase
    })
  })
  .then(response => response.json())
  .then((likeObj => {
    event.target.previousElementSibling.innerText = `${increase} likes`
  }))
}


function postToy(toyData) {
  let formData = {
    "name": toyData.name.value,
    "image": toyData.image.value,
    "likes": 0
  }

  let configObj = {
    method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
  }
  return fetch(toyUrl, configObj)
    .then(res => res.json())
    .then((objToy) => {
      let newToy = renderToys(objToy)
      toyCollection.append(newToy)
    })
}
  // function postToy(toyData) {
    
  //   fetch('http://localhost:3000/toys', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: "application/json"
  //       },
  //       body: JSON.stringify({
  //         "name": toyData.name.value,
  //         "image": toyData.image.value,
  //         "likes": 0
  
  //       })
  //     })
  //     .then(res => res.json())
  //     .then((objToy) => {
  //       let newToy = renderToys(objToy)
  //       toyCollection.append(newToy)
  //     })
  // }

  

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', e => {
      e.preventDefault()
      postToy(event.target)
    })
  } else {
    toyForm.style.display = 'none'
  }
})


  fetchToys().then(toys => {
    toys.forEach(toy => {
      renderToys(toy)
    })
  })
















































// const addBtn = document.querySelector('#new-toy-btn')
// const toyForm = document.querySelector('.container')
// let addToy = false
// const toyCollection = document.getElementById("toy-collection")
// // YOUR CODE HERE

// function getToys() {
//   fetch("http://localhost:3000/toys")
//     .then(response => response.json())
    
// }

// function postToy(toyData) {
//   fetch('http://localhost:3000/toys', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: "application/json"
//       },
//       body: JSON.stringify({
//         "name": toyData.name.value,
//         "image": toyData.image.value,
//         "likes": 0

//       })
//     })
//     .then(res => res.json())
//     .then((obj_toy) => {
//       let new_toy = renderToys(obj_toy)
//       toyCollection.append(new_toy)
//     })
// } 

// function likes(e) {
//   e.preventDefault()
//   let more = parseInt(e.target.previousElementSibling.innerText) + 1

//   fetch(`http://localhost:3000/toys/${e.target.id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"

//       },
//       body: JSON.stringify({
//         "likes": more
//       })
//     })
//     .then(res => res.json())
//     .then((like_obj => {
//       e.target.previousElementSibling.innerText = `${more} likes`;
//     }))
// }




// function renderToys() {
//   let h2 = document.createElement("h2")
//   h2.innerText = toy.name

//   let img = document.createElement("img")
//   img.setAttribute('src', toy_image_url)
//   img.setAttribute("class", "toy-avatar")

//   let p = document.createElement("p")
//   p.innerText = `${likes} Likes`

//   let likeBtn = document.createElement("button")
//   likeBtn.innerText = "Like"
//   likeBtn.setAttribute("class", "like-btn")

//   let divCard = document.createElement("div")
//   divCard.setAttribute("class", "card")
//   divCard.appendChild(h2, img, p, likeBtn)
//   toyCollection.appendChild(divCard)
// }


// addBtn.addEventListener('click', () => {
//   // hide & seek with the form
//   addToy = !addToy
//   if (addToy) {
//     toyForm.style.display = 'block'
//     toyForm.addEventListener('submit', event => {
//       event.preventDefault()
//       postToy(event.target)
//     })
//   } else {
//     toyForm.style.display = 'none'
//   }
// })

// // start by getting all toys

// getToys()
//   .then(toys => {
//   toys.forEach(toy => {
//     //function to render toys goes here or something
//     renderToys(toy)
//   })
// })

