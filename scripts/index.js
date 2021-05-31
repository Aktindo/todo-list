//* Main
let items = [];

getItems();

document.getElementById("itemInput").addEventListener("keyup", function (e) {
  if (e.code == "Enter") {
    document.getElementById("itemAddBtn").click();
  }
});

function getItems() {
  items = JSON.parse(localStorage.getItem("items")) || [];
  const itemsDiv = document.getElementById("items");

  let itemsHtml = "";
  if (items.length) {
    items.forEach((item, index) => {
      itemsHtml += `
      <div id="item-${index}" class="flex item my-5 bg-base-200 p-3 rounded-box opacity-100 ${
        item.completed && "item-completed"
      }">
        <div class="flex-1 leading-10">          
          <p id="itemName-${index}" class="item-name">
            ${item.content} 
          </p>
        </div>
        <div class="justify-between">          
          <button class="btn btn-success" onclick="handleItemCompleted(${index}); getItems()">
            <span class="material-icons text-white">
              done
            </span>
          </button>
          <button id="${index}" class="btn btn-error" onclick="deleteItem(this.id);">
            <span class="material-icons text-white">
              delete
            </span>
          </button>
        </div>
      </div>
      `;
    });

    itemsHtml += `
    <p id="pendingTodos" class="m-auto text-center my-8"></p>
    <div class="flex justify-center">
      <div class="refresh-btn mr-2">
        <button class="btn btn-primary btn-outline" onclick="window.location.reload()">Refresh</button>
      </div>
      <div class="delete-btn">
        <label for="my-modal-2" class="btn btn-error modal-button text-white">Delete All Todos</label> 
        <input type="checkbox" id="my-modal-2" class="modal-toggle"> 
        <div class="modal">
          <div class="modal-box">
            <p>Are you sure you want to clear all your todos?.</p> 
            <div class="modal-action">
              <label for="my-modal-2" class="btn btn-primary" onclick="deleteAllItems()">Yeah!</label> 
              <label for="my-modal-2" class="btn" onclick="getItems();">No, take me back!</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  } else {
    itemsHtml += `
    <div class="empty text-center">
      <span class="material-icons text-7xl">
        inbox
      </span>
      <p class="text-lg">Your list is empty right now... Add some todos to get started!</p>
      <div class="flex justify-center my-4">
        <div class="refresh-btn">
          <button class="btn btn-primary btn-outline" onclick="window.location.reload()">Refresh</button>
        </div>
      </div>
    </div>
    `;
  }

  itemsDiv.innerHTML = itemsHtml;
  getAllPendingTodos();
}

function saveItem() {
  const itemInputVal = document.getElementById("itemInput").value;
  if (!itemInputVal.length) {
    return handleMinCharsErr();
  }

  items.push({ content: itemInputVal, completed: false });
  localStorage.setItem("items", JSON.stringify(items));

  getItems();
  document.getElementById("itemInput").value = "";
}

function getAllPendingTodos() {
  const pendingTodos = document.getElementById("pendingTodos");

  items && items.filter((item) => !item.completed).length
    ? (pendingTodos.innerHTML = `You have a total of ${
        items.filter((item) => !item.completed).length
      } todo${items.length === 1 ? "" : "s"} pending!`)
    : "";
}

function deleteItem(index) {
  const itemDiv = document.getElementById("item-" + index);
  itemDiv.classList.add("fall");

  itemDiv.addEventListener("transitionend", function () {
    items.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(items));

    getItems();
  });
}

function deleteAllItems() {
  items = [];
  localStorage.setItem("items", JSON.stringify(items));

  getItems();
}

function handleItemCompleted(index) {
  const itemDiv = document.getElementById("item-" + index);
  itemDiv.classList.toggle("item-completed");

  items[index].completed = !items[index].completed;
  localStorage.setItem("items", JSON.stringify(items));
}

function handleMinCharsErr() {
  const errorsDiv = document.getElementById("errors");

  errorsDiv.innerHTML = `
  <div class="alert alert-error m-4 bounce-in">
    <div class="flex-1">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#ff5722" class="w-6 h-6 mx-2"><!----> <!----> <!----> <!----> 
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!---->
      </svg> 
      <label>Please provide a todo of more than 0 characters!</label>
    </div>
  </div>
  `;

  setTimeout(() => {
    errorsDiv.innerHTML = "";
  }, 10 * 1000);
}

//* Theme
let theme;

updateTheme();

function updateTheme() {
  theme = localStorage.getItem("theme") || "light";

  document.getElementById("themeIcon").innerHTML =
    theme === "light" ? "dark_mode" : "light_mode";
  document.querySelector("html").setAttribute("data-theme", theme);
}

function changeTheme() {
  if (theme === "light") {
    theme = "dark";
  } else {
    theme = "light";
  }

  document.getElementById("themeIcon").innerHTML =
    theme === "light" ? "dark_mode" : "light_mode";

  document.querySelector("html").setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  updateTheme();
}
