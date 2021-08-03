let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetchToys()
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

// when the page loads, make a 'GET' request to fetch all the toy objects.
// with the response data, make a <div class="card"> for each toy and add it to the toy-collection div
function fetchToys() {
  return fetch("http://localhost:3000/toys")
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    renderToys(object)
    // console.log(object)
  })
  
}

function renderToys(toys) {
  const toyContainer = document.querySelector("#toy-collection")
  toys.forEach(toy => {
    // console.log(toy)
    const card = document.createElement('div')
    card.classList.add('card')
    const h2 = document.createElement('h2')
    h2.innerText = toy.name
    const img = document.createElement('img')
    img.classList.add('toy-avatar')
    img.src = toy.image
    const p = document.createElement('p')
    p.innerText = toy.likes 
    const button = document.createElement('button')
    button.classList.add('like-btn')
    card.appendChild(h2)
    card.appendChild(img)
    card.appendChild(p)
    card.appendChild(button)
    console.log(card)
    toyContainer.appendChild(card)
  })
}

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
