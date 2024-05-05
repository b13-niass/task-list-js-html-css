const tasks = [
  {
    libelle: "ZTache numéro 1",
    completed: 1,
    date: "2024-05-02T16:45:30",
  },
  {
    libelle: "BTache numéro 2",
    completed: 0,
    date: "2024-05-02T22:45:30",
  },
  {
    libelle: "CTache numéro 3",
    completed: 0,
    date: "2024-05-02T06:45:30",
  },
  {
    libelle: "ATache numéro 4",
    completed: 0,
    date: "2024-05-02T16:45:30",
  },
  {
    libelle: "HTache numéro 5",
    completed: 0,
    date: "2024-05-02T19:45:30",
  },
];

let milieuMidListe = document.querySelector(".todo-list");
let closeModal = document.querySelector(".close-modal");
let btnAddTask = document.querySelector(".item2");
let btnDelete = document.querySelector(".item1");
let filterDate = document.querySelector("#filterDate");
let btnCancel = document.querySelector(".btn-cancel");
let modalElement = document.querySelector(".modal");
let addModal = document.querySelector(".add-modal");
let dateActu = document.querySelector(".dateActu");
let checkAll = document.querySelector("#checkAll");
let allTask = document.querySelector("#allTask");
let tasksFiltered = tasks;
let parNom = document.querySelector("#parNom");
let parStatus = document.querySelector("#parStatus");
let parHeure = document.querySelector("#parHeure");

dateActu.innerText = "All Date";

function loadData(tasksFiltered) {
  tasksFiltered.forEach((task) => {
    let date = new Date(task.date);
    let templateTodoList = `
      <div class="todo-item flex-row">
        <span class="list-check">
          <i class=""></i>
        </span>
        <span class="${task.completed ? "barrer" : ""}">${task.libelle}</span>
        <span class="hours">${date.getHours() + "H" + date.getMinutes()}</span>
      </div>
            `;
    milieuMidListe.insertAdjacentHTML("afterbegin", templateTodoList);
  });
}

function addNewData(task) {
  let templateTodoList = `
      <div class="todo-item flex-row">
        <span class="list-check ">
          <i class=""></i>
        </span>
        <span class="${task.completed ? "barrer" : ""}">${task.libelle}</span>
        <span class="hours">${
          task.date.getHours() + "H" + task.date.getMinutes()
        }</span>
      </div>
        `;

  milieuMidListe.insertAdjacentHTML("afterbegin", templateTodoList);
  let listCheck =
    milieuMidListe.firstElementChild.firstElementChild.nextElementSibling;
  let boxCheck = milieuMidListe.firstElementChild.firstElementChild;
  listCheck.addEventListener("click", function (e) {
    listCheck.classList.toggle("barrer");

    tasksFiltered.map((task) => {
      if (task.libelle == listCheck.textContent) {
        task.completed = task.completed ? 0 : 1;
        return task;
      }
    });
  });
  listCheck.addEventListener("dblclick", function (e) {
    listCheck.toggleAttribute("contenteditable");
  });
  boxCheck.addEventListener("click", function (e) {
    boxCheck.classList.toggle("check-back");
    let i_check = boxCheck.firstElementChild;
    checkAll.checked = false;
    i_check.classList.toggle("check-icon");
  });
}

loadData(tasksFiltered);

function listCheckCall() {
  let todoItems = document.querySelectorAll(".todo-item");

  todoItems.forEach((todoItem) => {
    let libelle_check = todoItem.firstElementChild.nextElementSibling;
    let boxCheck = todoItem.firstElementChild;
    libelle_check.addEventListener("click", function (e) {
      libelle_check.classList.toggle("barrer");
      tasksFiltered.map((task) => {
        if (task.libelle == libelle_check.textContent) {
          task.completed = task.completed ? 0 : 1;
          return task;
        }
      });
    });
    libelle_check.addEventListener("dblclick", function (e) {
      libelle_check.toggleAttribute("contenteditable");
    });
    boxCheck.addEventListener("click", function (e) {
      boxCheck.classList.toggle("check-back");
      let i_check = boxCheck.firstElementChild;
      checkAll.checked = false;
      i_check.classList.toggle("check-icon");
    });
  });
}

listCheckCall();

btnAddTask.addEventListener("click", function (e) {
  modalElement.classList.toggle("hidde");
});

closeModal.addEventListener("click", function (e) {
  modalElement.classList.toggle("hidde");
});

btnCancel.addEventListener("click", function (e) {
  modalElement.classList.toggle("hidde");
});

addModal.addEventListener("click", function (e) {
  let task = document.querySelector("#taskId");
  let date = document.querySelector("#dateId");
  if (task.value != "" && date.value != "") {
    let dateValue;
    if (filterDate.value == "") {
      dateValue = createDateWithHour(date.value);
    } else {
      dateValue = formatDate6(filterDate.value, date.value.split(":"));
    }
    let newTask = {
      libelle: task.value,
      completed: 0,
      date: new Date(dateValue),
    };
    addNewData(newTask);
    task.value = "";
    date.value = "";
    newTask.date = dateValue;
    // tasksFiltered.push(newTask);
    tasks.push(newTask);
  } else {
    console.log("vide");
  }
});

parNom.addEventListener("click", (e) => {
  if (
    !parNom.children[0].classList.contains("filter-color") &&
    !parNom.children[1].classList.contains("filter-color")
  ) {
    parNom.children[0].classList.add("filter-color");
    sortingTaskByLibelle("libelle", "asc");
    // console.log(tasksFiltered);
    removeListElement();
    loadData(tasksFiltered);
    listCheckCall();
  } else if (parNom.children[0].classList.contains("filter-color")) {
    parNom.children[0].classList.toggle("filter-color");
    parNom.children[1].classList.toggle("filter-color");
    sortingTaskByLibelle("libelle", "desc");
    removeListElement();
    loadData(tasksFiltered);
    listCheckCall();
  } else if (parNom.children[1].classList.contains("filter-color")) {
    parNom.children[0].classList.toggle("filter-color");
    parNom.children[1].classList.toggle("filter-color");
    sortingTaskByLibelle("libelle", "asc");
    removeListElement();
    loadData(tasksFiltered);
    listCheckCall();
  }
});

parStatus.addEventListener("click", (e) => {});
parHeure.addEventListener("click", (e) => {
  if (
    !parHeure.children[0].classList.contains("filter-color") &&
    !parHeure.children[1].classList.contains("filter-color")
  ) {
    parHeure.children[0].classList.add("filter-color");
    sortingTaskByLibelle("heure", "asc");
    removeListElement();
    loadData(tasksFiltered);
    listCheckCall();
  } else if (parHeure.children[0].classList.contains("filter-color")) {
    parHeure.children[0].classList.toggle("filter-color");
    parHeure.children[1].classList.toggle("filter-color");
    sortingTaskByLibelle("heure", "desc");
    removeListElement();
    loadData(tasksFiltered);
    listCheckCall();
  } else if (parHeure.children[1].classList.contains("filter-color")) {
    parHeure.children[0].classList.toggle("filter-color");
    parHeure.children[1].classList.toggle("filter-color");
    sortingTaskByLibelle("heure", "asc");
    removeListElement();
    loadData(tasksFiltered);
    listCheckCall();
  }
});

allTask.addEventListener("click", (e) => {
  tasksFiltered = tasks;
  filterDate.value = "";
  removeListElement();
  loadData(tasksFiltered);
  listCheckCall();
});

function createDateWithHour(hour) {
  let currentDate = new Date();

  let year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1; // Month is zero-based
  let day = currentDate.getDate();

  let dateString =
    year +
    "-" +
    (month < 10 ? "0" : "") +
    month +
    "-" +
    (day < 10 ? "0" : "") +
    day +
    "T" +
    hour +
    ":00";

  let newDate = new Date(dateString);

  return newDate;
}

checkAll.addEventListener("change", function (e) {
  let listChecks = document.querySelectorAll(".todo-item");
  if (e.target.checked == true) {
    listChecks.forEach((listCheck) => {
      if (!listCheck.firstElementChild.classList.contains("check-back")) {
        listCheck.firstElementChild.classList.add("check-back");
        let i_check = listCheck.firstElementChild.firstElementChild;
        i_check.classList.add("check-icon");
      }
    });
  } else {
    listChecks.forEach((listCheck) => {
      if (listCheck.firstElementChild.classList.contains("check-back")) {
        listCheck.firstElementChild.classList.remove("check-back");
        let i_check = listCheck.firstElementChild.firstElementChild;
        i_check.classList.remove("check-icon");
      }
    });
  }
});

btnDelete.addEventListener("click", function () {
  let listChecks = document.querySelectorAll(".todo-item");
  listChecks.forEach((listCheck) => {
    let libelle_check = listCheck.firstElementChild.nextElementSibling;
    if (listCheck.firstElementChild.classList.contains("check-back")) {
      listCheck.remove();
    }
    tasksFiltered.forEach((task, index) => {
      if (task.libelle != libelle_check.textContent) {
        tasksFiltered.splice(index, 1);
      }
    });
  });
});

function formatDate1(date) {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let formattedDay = (day < 10 ? "0" : "") + day;
  let formattedMonth = (month < 10 ? "0" : "") + month;

  return formattedDay + "/" + formattedMonth + "/" + year;
}

// YYYY/MM/DD format to 2022-02-01T16:45:30
function formatDate2(originalDate) {
  // Split the original date string by "/"
  let parts = originalDate.split("/");

  // Extract day, month, and year
  let day = parts[0];
  let month = parts[1];
  let year = parts[2];

  // Create a new date object
  let dateObj = new Date(year, month - 1, day); // Note: Month is zero-based in JavaScript

  // Extract hours, minutes, and seconds (assuming they are 16:45:30)
  let hours = "16";
  let minutes = "45";
  let seconds = "30";

  // Format the date object into desired format
  let formattedDate =
    dateObj.getFullYear() +
    "-" +
    ("0" + (dateObj.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + dateObj.getDate()).slice(-2) +
    "T" +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;

  return formattedDate;
}

// 2024-05-02 to 02/05/2024
function formatDate3(originalDate) {
  let dateObj = new Date(originalDate);

  let day = ("0" + dateObj.getDate()).slice(-2);
  let month = ("0" + (dateObj.getMonth() + 1)).slice(-2); // Month is zero-based
  let year = dateObj.getFullYear();

  let formattedDate = day + "/" + month + "/" + year;

  return formattedDate;
}

// 02/05/2024 to 2024-05-02

function formatDate4(originalDate) {
  // Split the original date string by "/"
  let parts = originalDate.split("/");

  // Extract day, month, and year
  let day = parts[0];
  let month = parts[1];
  let year = parts[2];

  // Format the date components into the desired format
  let formattedDate =
    year + "-" + ("0" + month).slice(-2) + "-" + ("0" + day).slice(-2);

  return formattedDate;
}

// 2022-02-01T16:45:30 to 2024-05-02

function formatDate5(originalDate) {
  let dateObj = new Date(originalDate);

  let year = dateObj.getFullYear();
  let month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
  let day = ("0" + dateObj.getDate()).slice(-2);

  let formattedDate = year + "-" + month + "-" + day;

  return formattedDate;
}

// YYYY-MM-DD format to 2022-02-01T16:45:30
function formatDate6(originalDate, heureChoisit) {
  let parts = originalDate.split("-");
  let year = parts[0];
  let month = parts[1];
  let day = parts[2];

  let dateObj = new Date(year, month - 1, day);

  let hours = heureChoisit[0];
  let minutes = heureChoisit[1];
  let seconds = "00";

  let formattedDate =
    dateObj.getFullYear() +
    "-" +
    ("0" + (dateObj.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + dateObj.getDate()).slice(-2) +
    "T" +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;

  return formattedDate;
}

filterDate.addEventListener("change", function (e) {
  let dateHier = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  if (new Date(filterDate.value) <= new Date(dateHier)) {
    btnAddTask.classList.add("disabled-btn");
  } else {
    btnAddTask.classList.remove("disabled-btn");
  }
  removeListElement();
  loadData(filtrerParDate(filterDate.value));
  dateActu.innerText = formatDate3(filterDate.value);
});

function removeListElement() {
  let listChecks = document.querySelectorAll(".todo-item");
  listChecks.forEach((listCheck) => {
    listCheck.remove();
  });
}

function sortingTaskByLibelle(param, order) {
  if (param == "libelle") {
    if (order == "asc") {
      tasksFiltered.sort((a, b) => b.libelle.localeCompare(a.libelle));
    }
    if (order == "desc") {
      tasksFiltered.sort((a, b) => a.libelle.localeCompare(b.libelle));
    }
  } else if (param == "heure") {
    if (order == "asc") {
      tasksFiltered.sort((a, b) => new Date(a.date) - new Date(b.date));
      // console.log(tasksFiltered);
    }
    if (order == "desc") {
      tasksFiltered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  }
}

function filtrerParDate(dateToFiltre) {
  tasksFiltered = [];
  tasks.forEach(function (task) {
    if (formatDate5(task.date) == dateToFiltre) {
      tasksFiltered.push(task);
    }
  });
  return tasksFiltered;
}
