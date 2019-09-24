// Actually leaving this code in here would have made my life easier but I ended up doing this myself after figuring out the container was hidden #facepalm
// const addBtn = document.querySelector('#new-toy-btn')
// const toyForm = document.querySelector('.container')
// let addToy = false

// // YOUR CODE HERE

// addBtn.addEventListener('click', () => {
//   // hide & seek with the form
//   addToy = !addToy
//   if (addToy) {
//     toyForm.style.display = 'block'
//   } else {
//     toyForm.style.display = 'none'
//   }
// })

const addToyForm = document.querySelector("#add-toy-form")
const toyCollectionDiv = document.querySelector("#toy-collection")
const divWithForm = document.querySelector(".container")

// Need to see if this gives me what i want - form name input
const newToyName = document.getElementById("toyName")
const newToyImage = document.getElementById("toyImage")
const toysUrl = "http://localhost:3000/toys"


function fetchAllToys() {
  fetch(toysUrl)
    .then(resp => resp.json())
    .then(toys => processToys(toys))
    .catch(error => console.log(error.message))
}

function processToys(toyArr) {
  toyArr.forEach(toy => createToyCard(toy))
}

function createToyCard(toyObj) {
  const newToyHtml = document.createElement("div")
  newToyHtml.className = "card"
  newToyHtml.setAttribute("id", `${toyObj.id}`)
  const toyQuickHtml = `
    <h2>${toyObj.name}</h2>
    <img src="${toyObj.image}" class="toy-avatar" />
    <p>${toyObj.likes} Likes </p>
    `
  newToyHtml.innerHTML = toyQuickHtml

  const likeButton = document.createElement("button")
  likeButton.className = "like-btn"
  likeButton.innerText = "Like <3"
  likeButton.addEventListener("click", addLike)

  newToyHtml.appendChild(likeButton)
  //this next part adds the toyHtml to the toyCollectionDiv
  toyCollectionDiv.appendChild(newToyHtml)
}

function addLike(event) {
  event.preventDefault()
  console.log("You clicked on like")
  const likeCountPTag = this.parentElement.querySelector("p")
  
  let likeCount = parseInt(likeCountPTag.textContent.split(" ")[0])
  likeCount++
  
  const fetchPatchOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": likeCount // this needs to be defined upon clicking the like button; the fn fired by that event listener should take the existing like value and increment it then save it to newLikeNumber variable before this. 
    })
  }

  const toyId = this.parentElement.getAttribute("id")
  const specificToyUrl = `${toysUrl}/${toyId}`
  
  fetch(specificToyUrl, fetchPatchOptions)
    .then(resp => resp.json())
    .then(updatedToyObj => updateToyLikes(updatedToyObj))
    .catch(error => console.log(error.message))

  function updateToyLikes(updatedToyObj) {
    likeCountPTag.textContent = `${updatedToyObj.likes} likes`
  }
}


function showCreateToyForm(event) {
  divWithForm.style.display = "block"
}

function createNewToy(event) {
  event.preventDefault()
  const fetchPostNewOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": newToyName.value, // this will come from the value of the text input field on the form. 
      "image": newToyImage.value, //this will come from the value of the new image text input field on the form. 
      "likes": 0
    })
  }

  fetch(toysUrl, fetchPostNewOptions)
    .then(resp => resp.json())
    .then(newToy => newToyActions(newToy))
    .catch(error => console.log(error.message))
}

function newToyActions(newToy) {
  // hide the create toy form
  hideNewToyForm()
  // then add the new toy card 
  createToyCard(newToy)
}

function hideNewToyForm() {
  divWithForm.style.display = "none"
}

document.addEventListener("DOMContentLoaded", function() {
   fetchAllToys()
   const addNewToyBtn = document.querySelector("#new-toy-btn")
   addNewToyBtn.addEventListener("click", showCreateToyForm)

   addToyForm.addEventListener("submit", createNewToy)
});