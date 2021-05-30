//* Main
let items = [];

getItems();

function getItems() {
  items = JSON.parse(localStorage.getItem("items")) || [];
  const itemsDiv = document.getElementById("items");

  let itemsHtml = "";
  if (items.length) {
    items.forEach((item, index) => {
      itemsHtml += `
        <div id="item-${index}" class="flex item my-5 bg-base-200 p-3 rounded-box">
          <div class="flex-1 leading-10">          
            <p id="itemName-${index}" class="item-name">
              ${item} 
            </p>
          </div>
          <div class="justify-between">          
            <button class="btn btn-success" onclick="handleItemCompleted(${index})">
              <span class="material-icons text-base-content">
                  done
              </span>
            </button>
            <button id="${index}" class="btn btn-error" onclick="deleteItem(this.id)">
              <span class="material-icons text-base-content">
                delete
              </span>
            </button>
          </div>
        </div>
      `;
    });
  } else {
    itemsHtml += `
    <div class="empty text-center">
      <span class="material-icons text-7xl">
        inbox
      </span>
      <p class="text-lg">Your list is empty right now... Add some todos to get started!</p>
    </div>
    `;
  }

  itemsDiv.innerHTML = itemsHtml;
}

function saveItem() {
  const itemInputVal = document.getElementById("itemInput").value;
  if (!itemInputVal.length) {
    return handleMinCharsErr();
  }

  items.push(itemInputVal);
  localStorage.setItem("items", JSON.stringify(items));

  getItems();
  document.getElementById("itemInput").value = "";

  feather.replace();
}

function deleteItem(index) {
  items.splice(index, 1);
  localStorage.setItem("items", JSON.stringify(items));

  getItems();
  feather.replace();
}

function handleItemCompleted(index) {
  const itemName = document.getElementById("itemName-" + index);
  itemName.classList.toggle("line-through");
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

//* Feather
feather.replace();
