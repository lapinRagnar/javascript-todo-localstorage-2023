const itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : []

console.log('items', itemsArray)

document.querySelector("#enter").addEventListener("click", () => {
  const item = document.querySelector("#item")
  createItem(item)
})

const displayItems = () => {
  let items = ""

  for (let i=0; i<itemsArray.length; i++){
    items += `
    <div class="item">
      <div class="input-controller">
        <textarea disabled>${itemsArray[i]} </textarea>
        <div class="edit-controller">
          <i class="fa-solid fa-trash-can deleteBtn" ></i>
          <i class="fa-solid fa-pen-to-square editBtn"></i>
        </div>
      </div>
      <div class="update-controller">
        <button class="saveBtn">Enregistrer</button>
        <button class="cancelBtn">Annuler</button>
      </div>
    </div>
    `

    document.querySelector(".todo-list").innerHTML = items

    activateDeleteListeners()
    activateEditListeners()
    activateSaveListeners()
    activateCanelListeners()

  }
}

const activateDeleteListeners = () => {
  let deleteBtn = document.querySelectorAll(".deleteBtn")
  deleteBtn.forEach((db, i) => {
    db.addEventListener("click", () => {
      deleteItem(i)
    })
  })
}

const deleteItem = (i) => {
  itemsArray.splice(i, 1)
  localStorage.setItem("items", JSON.stringify(itemsArray))
  location.reload()
}


const activateEditListeners = () => {
  const editBtn = document.querySelectorAll(".editBtn")
  const updateController = document.querySelectorAll(".update-controller")
  const inputs = document.querySelectorAll(".input-controller textarea")

  editBtn.forEach((eb, i) => {
    eb.addEventListener("click", () => {
      updateController[i].style.display = "block"
      // inputs[i].removeAttribute("disabled")
      inputs[i].disabled = false
      inputs[i].focus()
    })
  })
}

const activateSaveListeners = () => {
  const saveBtn = document.querySelectorAll(".saveBtn")
  const inputs = document.querySelectorAll(".input-controller textarea")

  saveBtn.forEach((sb, i) => {
    sb.addEventListener("click", () => {
      updateItem(inputs[i].value, i)
    })
  })
}

const updateItem = (text, i) => {
  itemsArray[i] = text
  localStorage.setItem("items", JSON.stringify(itemsArray))
  location.reload()
}

const activateCanelListeners = () => {
  const cancelBtn = document.querySelectorAll(".cancelBtn")
  const updateController = document.querySelectorAll(".update-controller")
  const inputs = document.querySelectorAll(".input-controller textarea")

  cancelBtn.forEach((cb, i) => {
    cb.addEventListener("click", () => {
      updateController[i].style.display = "none"
      inputs[i].disabled = true
    })
  })

}
const createItem = (item) => {
  itemsArray.push(item.value)
  localStorage.setItem("items", JSON.stringify(itemsArray))
  location.reload()
}

function displayDate(){
  let date = new Date()
  date = date.toString().split(" ")
  console.log(date)
  document.getElementById("date").innerHTML = date[2] + " " + date[1] + " " + date[3]
}

window.onload = function(){
  displayDate()
  displayItems()

}