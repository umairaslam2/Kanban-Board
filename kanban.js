/* #############################################################################################
                                KANBAN BOARD SCRIPTING 
###############################################################################################
*/

let logout = document.querySelector(".navbar span");
let sliderBox = document.querySelector(".navbar button");

logout.addEventListener("click", () => {
  slideBox();
});

function slideBox() {
  if (sliderBox.style.display === "none") {
    sliderBox.style.display = "flex";
  } else {
    sliderBox.style.display = "none";
  }
}

sliderBox.addEventListener("click", () => {
  document.location.href = "./index.html";
});

// #################### for loading submit form ################## \\

let addBtn = document.querySelector("#addBtn");
let submitForm = document.querySelector(".startForm");
let loader = document.querySelector(".slider");

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loadSubmitForm();
});

function loadSubmitForm() {
  if ((submitForm.style.display = "none")) {
    addBtn.style.display = "none";
    loader.style.display = "flex";
    setTimeout(() => {
      submitForm.style.display = "flex";
      loader.style.display = "none";
    }, 1500);
  }
}

// ############### submit data in li of starter ################## \\

let submitData = document.querySelector("#submitData");

submitData.addEventListener("click", (e) => {
  e.preventDefault();
  transferData();
});

function transferData() {
  let title = document.querySelector("#titleValue").value.trim();
  let description = document.querySelector("#desValue").value.trim();
  let date = document.querySelector("#dateValue").value.trim();
  let list = document.querySelector("#startList");

  if (title === "" || description === "" || date === "") {
    swal.fire("please fill the field");
  } else {
    submitForm.style.display = "none";
    loader.style.display = "flex";
    setTimeout(() => {
      addBtn.style.display = "flex";
      loader.style.display = "none";
      function listAdd() {
        let li = document.createElement("li");
        let div = document.createElement("div");
        div.classList.add("valueBox");
        div.innerHTML = `<h1>${title}</h1>
                        <p>${description}</p>
                        <span>Date: ${date}</span>`;
        li.id = "task-" + new Date().getTime(); // Unique ID for each task
        li.draggable = true;
        li.ondragstart = drag;
        li.appendChild(div);
        list.appendChild(li);
      }
      listAdd();
    }, 1500);
  }
}

// ######################### DRAG AND DROP FUNCTIONALITY ######################### \\

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

function getDataFromElement(li) {
  const title = li.querySelector("h1").innerText;
  const description = li.querySelector("p").innerText;
  const date = li.querySelector("span").innerText.replace("Date: ", "");

  return { title, description, date, id: li.id };
}

function addToDOM(item, listId) {
  const list = document.getElementById(listId);
  let li = document.createElement("li");
  let div = document.createElement("div");
  div.classList.add("valueBox");
  div.innerHTML = `<h1>${item.title}</h1>
                  <p>${item.description}</p>
                  <span>Date: ${item.date}</span>`;
  li.id = item.id;
  li.draggable = true;
  li.ondragstart = drag;
  li.appendChild(div);
  list.appendChild(li);
}

// ###################  DELETE ITEM FROM LI  ############################# \\

let deleteBtn = document.querySelector("#deleteBtn");

deleteBtn.addEventListener("drop", (e) => {
  e.preventDefault();
  deleteItem(e);
});

deleteBtn.addEventListener("dragover", (e) => {
  e.preventDefault();
});

function deleteItem(e) {
  var data = e.dataTransfer.getData("text");
  var item = document.getElementById(data);
  if (item) {
    item.remove();
  }
}