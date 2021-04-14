let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetchToys()
  newToy()
});

const fetchToys = () => {
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(toys => toys.forEach(renderCard))
}

const renderCard = (toy) => {
  console.log(toy)
  const toyCollection = document.getElementById('toy-collection')
  const toyCard = document.createElement('div')
  toyCard.className = 'card'

  const name = document.createElement('h2')
  name.innerText = toy.name

  const avatar = document.createElement('img')
  avatar.src = toy.image
  avatar.className = 'toy-avatar'

  const likes = document.createElement('p')
  likes.innerText = toy.likes + ' likes'

  const likeButton = document.createElement('button')
  likeButton.innerText = 'Like!'

  likeButton.addEventListener('click', (e) => {
    e.preventDefault()
    likes.innerText = `${++toy.likes} likes`
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({likes: toy.likes})
    })
  })

  toyCard.append(name, avatar, likes, likeButton)
  toyCollection.append(toyCard)
}

const newToy = () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const createBtn = document.querySelector(".add-toy-form")

  createBtn.addEventListener('submit', (e) => {
    e.preventDefault()
    
    let toyName = e.target[0].value
    let toyImage = e.target[1].value

    let newToy = {
      name: toyName,
      image: toyImage,
      likes: 0
    }

    let reqPackage = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newToy)
    }

    fetch('http://localhost:3000/toys', reqPackage)
    .then(resp => resp.json())
    .then(newToy => renderCard(newToy))
  })

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
}
