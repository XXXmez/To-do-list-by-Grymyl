import "../styles/style.scss";

document.addEventListener("DOMContentLoaded", () => {
  const dataLists = [
    {
      chek: false,
      theme: "theme1",
      importance: "important",
      title: "1 task",
      description:
        "For some people there is nothing so exciting as traveling, and I'm not an exception. And I'm happy that I have traveled",
    },
    {
      chek: false,
      theme: "theme1",
      importance: "important",
      title: "2 task",
      description:
        "For some people there is nothing so exciting as traveling, and I'm not an exception. And I'm happy that I have traveled",
    },
    {
      chek: false,
      theme: "theme1",
      importance: "important",
      title: "3 task",
      description:
        "For some people there is nothing so exciting as traveling, and I'm not an exception. And I'm happy that I have traveled",
    },
    {
      chek: false,
      theme: "theme1",
      importance: "important",
      title: "4 task",
      description:
        "For some people there is nothing so exciting as traveling, and I'm not an exception. And I'm happy that I have traveled",
    },
    {
      chek: false,
      theme: "theme1",
      importance: "important",
      title: "5 task",
      description:
        "For some people there is nothing so exciting as traveling, and I'm not an exception. And I'm happy that I have traveled",
    },
    {
      chek: false,
      theme: "theme1",
      importance: "important",
      title: "6 task",
      description:
        "For some people there is nothing so exciting as traveling, and I'm not an exception. And I'm happy that I have traveled",
    },
    {
      chek: false,
      theme: "theme2",
      importance: "important",
      title: "7 task",
      description:
        "For some people there is nothing so exciting as traveling, and I'm not an exception. And I'm happy that I have traveled",
    },
    {
      chek: false,
      theme: "theme2",
      importance: "important",
      title: "8 task",
      description:
        "For some people there is nothing so exciting as traveling, and I'm not an exception. And I'm happy that I have traveled",
    },
    {
      chek: false,
      theme: "theme3",
      importance: "important",
      title: "9 task",
      description:
        "For some people there is nothing so exciting as traveling, and I'm not an exception. And I'm happy that I have traveled",
    },
    {
      chek: false,
      theme: "theme3",
      importance: "important",
      title: "10 task",
      description:
        "For some people there is nothing so exciting as traveling, and I'm not an exception. And I'm happy that I have traveled",
    },
    {
      chek: false,
      theme: "theme3",
      importance: "important",
      title: "11 task",
      description:
        "For some people there is nothing so exciting as traveling, and I'm not an exception. And I'm happy that I have traveled",
    },
  ];
  const dataThems = [
    {
      name: "work",
      id: 1,
    },
    {
      name: "sport",
      id: 2,
    },
    {
      name: "other",
      id: 3,
    },
  ];

  function checkData() {
    if (!localStorage.getItem("Grymyl_Theme_lists")) {
      localStorage.setItem("Grymyl_Theme_lists", JSON.stringify(dataLists));
    }
    if (!localStorage.getItem("Grymyl_Theme_Name")) {
      localStorage.setItem("Grymyl_Theme_Name", JSON.stringify(dataThems));
    }
  }
  checkData();

  const mainControlPlus = document.querySelector(".main-control-plus"); // добавить задание в текущий раздел
  const mainControlEdit = document.querySelector(".main-control-edit"); // редактировать раздел
  const mainControlRemove = document.querySelector(".main-control-remove"); // удалить раздел

  const projectsList = document.querySelector(".projects-list"); // разделы

  const buttonAddTheme = document.querySelector(".projects-title__add-theme"); // добавить раздел

  const mainTitleH = document.querySelector(".main-title > h2"); // главный титл

  const mainList = document.querySelector(".main-list"); // доска заданий

  let activeMenu = ""; // активный раздел
  let activeMenuElem = ""; // активный элемент меню

  class createTheme {
    constructor(name, id) {
      this.name = name;
      this.id = id;
    }

    create() {
      const li = document.createElement("li");
      li.className = "projects-items item";
      li.dataset.name = `theme${this.id}`;
      li.dataset.id = `${this.id}`;
      li.innerHTML = `
            <div class="item-icon"><i class="fa-solid fa-list-check"></i></div>
            <div class="item-name">${this.name}</div>
            <div class="item-count">0</div>
        `;
      projectsList.append(li);

      li.addEventListener("click", (e) => {
        activatePartition(e.currentTarget, this.name);
        console.log("e.currentTarget: ", e.currentTarget);
      });
      taskCounter(`theme${this.id}`);
    }

    saveDB() {
      const i = JSON.parse(localStorage.getItem("Grymyl_Theme_Name")) || [];
      i.push({
        name: this.name,
        id: this.id,
      });
      localStorage.setItem("Grymyl_Theme_Name", JSON.stringify(i));
    }
  }

  class createTask {
    constructor(title, importance, description, id) {
      this.title = title;
      this.importance = importance;
      this.description = description;
      this.id = id;
    }

    create() {
      const li = document.createElement("li");
      const divTask = document.createElement("div");
      li.className = "main-item";
      divTask.className = "task";
      divTask.innerHTML = `
            <div class="task-chek"><i class="fa-solid fa-check"></i></div>
            <div class="task-content red">
            <div class="task-header">
                <div class="task-title">
                <h3>${this.title}</h3>
                </div>
                <div class="controls">
                <div class="controls-item control-edit fa-solid fa-pen"></div>
                <div class="controls-item control-remove fa-solid fa-trash-can"></div>
                </div>
            </div>
            <div class="task-desc">
                <p>${this.description}</p>
            </div>
            </div>
        `;
      li.append(divTask);

      mainList.prepend(li);

      const controlRemove = divTask.querySelector(".control-remove");
      controlRemove.addEventListener("click", () => {
        const i = JSON.parse(localStorage.getItem("Grymyl_Theme_lists"));
        i.splice(this.id, 1);
        localStorage.setItem("Grymyl_Theme_lists", JSON.stringify(i));
        li.remove(li);
        taskCounter(activeMenu);
      });

      const controlEdit = divTask.querySelector(".control-edit");
      const taskDescP = divTask.querySelector(".task-desc > p");
      controlEdit.addEventListener("click", () => {
        const i = JSON.parse(localStorage.getItem("Grymyl_Theme_lists"));
        const af = prompt("Редактировать на - ");
        i[this.id].description = af;
        taskDescP.textContent = af;
        localStorage.setItem("Grymyl_Theme_lists", JSON.stringify(i));
      });
    }

    saveDB() {
      const i = JSON.parse(localStorage.getItem("Grymyl_Theme_lists")) || [];
      i.push({
        chek: false,
        description: this.description,
        title: this.title,
        theme: activeMenu,
        importance: this.importance,
      });
      localStorage.setItem("Grymyl_Theme_lists", JSON.stringify(i));
    }
  }

  // функция считает возвращает нужный id для меню
  function idsMenu() {
    const projectsItems = document.querySelectorAll(".projects-items");
    const lastItem = projectsItems[projectsItems.length - 1] || 0;
    if (lastItem != 0) return +lastItem.dataset.id + 1;
    return 1;
  }

  // функция счетчик задач в разделе
  function taskCounter(project) {
    const projectsItems = document.querySelectorAll(".projects-items");
    let numberTasks = 0;

    JSON.parse(localStorage.getItem("Grymyl_Theme_lists")).forEach((e) => {
      if (e && e.theme == project) {
        numberTasks++;
      }
    });

    projectsItems.forEach((e) => {
      if (e.dataset.name == project) {
        e.querySelector(".item-count").textContent = numberTasks;
      }
    });
  }

  // функция активации раздела
  function activatePartition(elMenu, name) {
    const menu = document.querySelectorAll(".projects-items");

    menu.forEach((e) => {
      e.classList.remove("active");
    });

    elMenu.classList.add("active");

    activeMenu = elMenu.dataset.name;

    mainTitleH.textContent = name;

    mainList.innerHTML = "";

    JSON.parse(localStorage.getItem("Grymyl_Theme_lists")).forEach((e, i) => {
      if (e && e.theme == activeMenu) {
        new createTask(e.title, e.importance, e.description, i).create();
      }
    });

    activeMenuElem = elMenu;
    console.log("activeMenuElem: ", activeMenuElem);

    mainControlPlus.style.display = "block";
    mainControlEdit.style.display = "block";
    mainControlRemove.style.display = "block";
  }

  // функция добавления раздела
  function addTheme() {
    const a = prompt("Тема");
    const id = idsMenu();
    new createTheme(a, id).create();
    new createTheme(a, id).saveDB();
    const projectsItem = document.querySelectorAll(".projects-items");
    const projectsItemLast = projectsItem[projectsItem.length - 1];
    activatePartition(
      projectsItemLast,
      projectsItemLast.querySelector(".item-name").textContent
    );
  }

  // добавить раздел
  buttonAddTheme.addEventListener("click", addTheme);

  // добавить задачу
  mainControlPlus.addEventListener("click", () => {
    const title = "title new";
    const inc = "red";
    const desc = "new task new task new task new task new task new task new task new task";

    const lengthId = JSON.parse(localStorage.getItem("Grymyl_Theme_lists")).length;

    new createTask(title, inc, desc, lengthId).create();
    new createTask(title, inc, desc, lengthId).saveDB();

    taskCounter(activeMenu);
  });

  // удалить раздел и задачи раздела
  mainControlRemove.addEventListener("click", () => {
    console.log("Удалить раздел :", activeMenu);
    const i = JSON.parse(localStorage.getItem("Grymyl_Theme_lists")) || [];
    i.forEach((e, f) => {
      if (e && e.theme == activeMenu) {
        delete i[f];
      }
    });
    const result = i.filter((item) => item);
    localStorage.setItem("Grymyl_Theme_lists", JSON.stringify(result));

    const projectsItems = activeMenuElem.dataset.id;

    const ii = JSON.parse(localStorage.getItem("Grymyl_Theme_Name")) || [];
    ii.forEach((e, i) => {
      if (e.id == projectsItems) ii.splice(i, 1);
    });
    localStorage.setItem("Grymyl_Theme_Name", JSON.stringify(ii));

    // удаление раздела из верстки
    activeMenuElem.remove(activeMenuElem);

    activeFirstSection()
  });

  // Вывод разделов
  function sectionOutput() {
    const base = JSON.parse(localStorage.getItem("Grymyl_Theme_Name"));
    if (base) {
      base.forEach((e) => {
        new createTheme(e.name, e.id).create();
      });
    }
  }
  sectionOutput();

  // активация первого раздела
  function activeFirstSection() {
    if (document.querySelectorAll(".projects-items").length > 0) {
      activatePartition(
        document.querySelectorAll(".projects-items")[0],
        document.querySelectorAll(".projects-items")[0].querySelector(".item-name").textContent
      );
    } else {
      mainList.innerHTML = "";
      mainTitleH.textContent = "Раздела нет";
      activeMenu = "";
      mainControlPlus.style.display = "none";
      mainControlEdit.style.display = "none";
      mainControlRemove.style.display = "none";
    }
  }
  activeFirstSection();
});