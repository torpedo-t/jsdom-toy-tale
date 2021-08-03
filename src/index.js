let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function addToys(name, image) {
  let formData = {
    name: name,
    image: image
  };
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  return fetch("http://localhost:3000/toys", configObj)
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {

  })
}



// define a function that fetches all the toy objects
// with the response data, make a <div class="card"> for each toy and add it to the toy-collection div
// each card should have h2 tag with the toy's name 
// img tag with the src of the toy's image attribute and the class name "toy-avatar" 
// p tag with how many likes that toy has
// button tag with a class "like-btn"
// call this function under DOM content loaded event listener
