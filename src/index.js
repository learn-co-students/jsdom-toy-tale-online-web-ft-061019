const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyList = document.querySelector('div#toy-collection')
const toyUrl = 'http://localhost:3000/toys'
// YOUR CODE HERE

const toyName = document.querySelector('input[name="name"]')
const toyImage = document.querySelector('input[name="image"]')

function postToy(info){
  let toy = {
    name: toyName.value,
    image: toyImage.value,
    likes: 0
  }

  fetch(url, {
    method: 'POST',
    "Content-Type": "application/json",
    "Accept": "application/json"

    body: JSON.stringify(toy)
  })

  .then(response => response.json())
  .then(likeObj => {
    event.target
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
