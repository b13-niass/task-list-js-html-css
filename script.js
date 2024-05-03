const tasks = [
  {
    libelle: "Tache numéro 1",
    completed: 1,
    date: "2024-05-02T16:45:30",
  },
  {
    libelle: "Tache numéro 2",
    completed: 0,
    date: "2024-05-02T22:45:30",
  },
  {
    libelle: "Tache numéro 3",
    completed: 0,
    date: "2024-05-02T06:45:30",
  },
  {
    libelle: "Tache numéro 4",
    completed: 0,
    date: "2021-02-01T16:45:30",
  },
  {
    libelle: "Tache numéro 5",
    completed: 0,
    date: "2024-02-01T19:45:30",
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

dateActu.innerText = "All Date"; //formatDate1(new Date());
// filterDate.value = formatDate4(formatDate1(new Date()));

function loadData(tasks) {
  tasks.forEach((task) => {
    let date = new Date(task.date);
    let templateTodoList = `
      <div class="todo-item flex-row">
        <span class="list-check ${task.completed ? "check-back" : ""}">
          <i class="${task.completed ? "check-icon" : ""}"></i>
        </span>
        <span class="${task.completed ? "barrer" : ""}">${task.libelle}</span>
        <span class="hours">${date.getHours() + "H" + date.getMinutes()}</span>
      </div>
            `;
    milieuMidListe.insertAdjacentHTML("afterbegin", templateTodoList);
  });
}

function addNewData(task) {
  // let date = createDateWithHour(task.date);
  let templateTodoList = `
      <div class="todo-item flex-row">
        <span class="list-check ${task.completed ? "check-back" : ""}">
          <i class="${task.completed ? "check-icon" : ""}"></i>
        </span>
        <span class="${task.completed ? "barrer" : ""}">${task.libelle}</span>
        <span class="hours">${
          task.date.getHours() + "H" + task.date.getMinutes()
        }</span>
      </div>
        `;

  milieuMidListe.insertAdjacentHTML("afterbegin", templateTodoList);
  let listCheck = milieuMidListe.firstElementChild;
  console.log(listCheck);
  listCheck.addEventListener("click", function (e) {
    listCheck.firstElementChild.classList.toggle("check-back");
    let i_check = listCheck.firstElementChild.firstElementChild;
    let libelle_check = listCheck.firstElementChild.nextElementSibling;
    i_check.classList.toggle("check-icon");
    libelle_check.classList.toggle("barrer");

    tasks.map((task) => {
      if (task.libelle == libelle_check.textContent) {
        task.completed = task.completed ? 0 : 1;
        return task;
      }
    });
  });
}

loadData(tasks);

function listCheckCall() {
  let listChecks = document.querySelectorAll(".todo-item");

  listChecks.forEach((listCheck) => {
    listCheck.addEventListener("click", function (e) {
      listCheck.firstElementChild.classList.toggle("check-back");
      let i_check = listCheck.firstElementChild.firstElementChild;
      let libelle_check = listCheck.firstElementChild.nextElementSibling;
      i_check.classList.toggle("check-icon");
      libelle_check.classList.toggle("barrer");

      tasks.map((task) => {
        if (task.libelle == libelle_check.textContent) {
          task.completed = task.completed ? 0 : 1;
          return task;
        }
      });
      // console.log(tasks);
    });
    listCheck.addEventListener("dblclick", function () {
      console.log("ok");
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
    let dateValue = createDateWithHour(date.value);
    console.log(date.value);
    let newTask = {
      libelle: task.value,
      completed: 0,
      date: dateValue,
    };
    addNewData(newTask);
  } else {
    console.log("vide");
  }
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
  if (e.target.toggleAttribute("checked")) {
    listChecks.forEach((listCheck) => {
      if (!listCheck.firstElementChild.classList.contains("check-back")) {
        listCheck.firstElementChild.classList.add("check-back");
        let i_check = listCheck.firstElementChild.firstElementChild;
        let libelle_check = listCheck.firstElementChild.nextElementSibling;
        i_check.classList.add("check-icon");
        libelle_check.classList.add("barrer");

        tasks.map((task) => {
          if (task.libelle == libelle_check.textContent) {
            task.completed = 1;
            return task;
          }
        });
      }
    });
  } else {
    listChecks.forEach((listCheck) => {
      if (listCheck.firstElementChild.classList.contains("check-back")) {
        listCheck.firstElementChild.classList.remove("check-back");
        let i_check = listCheck.firstElementChild.firstElementChild;
        let libelle_check = listCheck.firstElementChild.nextElementSibling;
        i_check.classList.remove("check-icon");
        libelle_check.classList.remove("barrer");

        tasks.map((task) => {
          if (task.libelle == libelle_check.textContent) {
            task.completed = task.completed ? 0 : 1;
            return task;
          }
        });
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
    tasks.filter((task) => {
      if (task.libelle != libelle_check.textContent) {
        return true;
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

function filtrerParDate(dateToFiltre) {
  let tasks_filter = new Array();
  tasks.filter(function (task) {
    if (formatDate5(task.date) == dateToFiltre) {
      tasks_filter.push(task);
      return true;
    } else {
      return false;
    }
  });
  return tasks_filter;
}
