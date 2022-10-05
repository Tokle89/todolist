const textArea = document.querySelector("textarea");
const button = document.querySelector("button");
const listContainer = document.querySelector(".list-container");

// initialize the todos from local storage
let todoList = getFromStorage();
textArea.value = "";
// push the list item to Storage, and create the html
button.onclick = function () {
  const listItem = {
    title: textArea.value,
  };
  if (textArea.value) {
    todoList.push(listItem);
    addToStorage(todoList);

    createHtml(todoList);
  }
};

// add to Storage, and stringify the data
function addToStorage(items) {
  const stringify = JSON.stringify(items);
  localStorage.setItem("list", stringify);
}

// retrive from Storage, and parse the array
function getFromStorage() {
  const data = localStorage.getItem("list");
  if (!data) return [];
  const unstringified = JSON.parse(data);
  return unstringified;
}

// create the html function
const createHtml = (data) => {
  const createDeleteButton = `<button class="remove">Delete</button>`;

  listContainer.innerHTML = "";
  data.forEach((item) => {
    listContainer.innerHTML += `<div class="list-item"><p>${item.title}</p>${createDeleteButton}</div>`;
    return listContainer.innerHTML;
  });
  const deleteButton = document.querySelector(".remove");
  const item = document.querySelector("div .list-item");
  item.appendChild(deleteButton);
  deleteButton.addEventListener("click", () => item.parentNode.removeChild(item));
};

// when the page is loaded, this displays the todos that are in local storage

window.onload = function () {
  createHtml(todoList);
};

// const deleteButton = document.createElement(`button`);
//   deleteButton.className = "remove";
//   deleteButton.dataset.id = `${id}`;
//   deleteButton.innerText = "Delete";
//   console.log(deleteButton);
