let addToy = false;
let toys = []

document.addEventListener("DOMContentLoaded", () => {
  fetchToys()
  addNewToy()
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
    img.alt = toy.name
    const p = document.createElement('p')
    p.classList.add('likes')
    p.innerText = `${toy.likes} Likes`
    const button = document.createElement('button')
    button.id = toy.id
    button.innerText = "Like Me!"
    button.classList.add('like-btn')
    button.addEventListener("click", function(event) {
      addLikes(event)
    })
    card.appendChild(h2)
    card.appendChild(img)
    card.appendChild(p)
    card.appendChild(button)
    // console.log(card)
    toyContainer.appendChild(card)
  })
}

// add the toy to my toys array
function addToys(name, image) {
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name,
      image,
      "likes": 0
    })
  };
  return fetch("http://localhost:3000/toys", configObj)
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    toys.push(object)
    renderToys(toys)
  })
}

function addNewToy() {
  const submit = document.querySelector(".submit")
  submit.addEventListener("click", function(e){
    e.preventDefault();
    const formElements = e.target.parentElement
    const name = formElements[0].value
    const img = formElements[1].value
    // debugger
    addToys(name, img)
  })
}

function addLikes(event) {
  let likeToAdd = document.getElementById(event.target.id)
  let unformattedInt = parseInt(likeToAdd.previousSibling.innerText[0])
  let int = pad(unformattedInt, 2)
  console.log(int)
  let numToUpdate = int + 1
  console.log("int", int)
  event.preventDefault()
  // debugger;
   fetch(`http://localhost:3000/toys/${int}`, {
    method: "PATCH",
    headers: 
    {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }, 
    body: JSON.stringify({
      "likes": numToUpdate
    })
  })
  .then(response => response.json())
  .then(json =>  {likeToAdd.previousSibling.innerText = `${json.likes} likes`})
}

function pad(number, length) {
  var str = '' + number;
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
}