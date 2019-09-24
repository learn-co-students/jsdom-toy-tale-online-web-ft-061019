NOTES.md
/*
DONE 1. need to fetch all the toys from localhost:3000/toys
DONE 2. need to add each of them as a <div class="card"></div> to the div with id of toy-collection
DONE 3. within this card div, (just add this using .innerHTML) it should have the following:
  -h2 with toy's name
  -img tag with the src of the image and class name of toy-avatar
  -p tag with how many likes that toy has
  -button tag with class "like-btn"
  finished Example:
  <div class="card">
    <h2>Woody</h2>
    <img src=toy_image_url class="toy-avatar" />
    <p>4 Likes </p>
    <button class="like-btn">Like <3</button>
  </div>

DONE 4. Adding a new toy - when user clicks on the add new toy button, a POST request is sent to localhost:3000/toys and a new toy is added to Andy's toy collection
DONE 5. This new toy should conditionally render to the page
DONE 6. to accomplish 4, need to give fetch a 2nd arg with options for the method and the headers and the JSONified data from the input. 
  Example: 
  POST http://localhost:3000/toys
headers: 
{
  "Content-Type": "application/json",
  Accept: "application/json"
}
 
body:
{
  "name": "Jessie",
  "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
  "likes": 0
}
DONE 7. When a user clicks on a toy's like button, two things should happen
  a. conditional increase to the toyss like count
  b. a patch request sent to its restful route /toys/:id to update the number of likes that the toy has
  Example Headers to accomplish this: 
    PATCH http://localhost:3000/toys/:id
headers: 
{
  "Content-Type": "application/json",
  Accept: "application/json"
}
 
body:
{
  "likes": <new number>
}
