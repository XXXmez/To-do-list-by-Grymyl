import '../styles/style.scss';

const dd = [
    {
        chek: false,
        theme: 'theme1',
        importance: 'important',
        title: '1 task',
        description: 'For some people there is nothing so exciting as traveling, and I\'m not an exception. And I\'m happy that I have traveled',
    },
    {
        chek: false,
        theme: 'theme1',
        importance: 'important',
        title: '2 task',
        description: 'For some people there is nothing so exciting as traveling, and I\'m not an exception. And I\'m happy that I have traveled',
    },
    {
        chek: false,
        theme: 'theme1',
        importance: 'important',
        title: '3 task',
        description: 'For some people there is nothing so exciting as traveling, and I\'m not an exception. And I\'m happy that I have traveled',
    },
    {
        chek: false,
        theme: 'theme1',
        importance: 'important',
        title: '4 task',
        description: 'For some people there is nothing so exciting as traveling, and I\'m not an exception. And I\'m happy that I have traveled',
    },
    {
        chek: false,
        theme: 'theme1',
        importance: 'important',
        title: '5 task',
        description: 'For some people there is nothing so exciting as traveling, and I\'m not an exception. And I\'m happy that I have traveled',
    },
    {
        chek: false,
        theme: 'theme1',
        importance: 'important',
        title: '6 task',
        description: 'For some people there is nothing so exciting as traveling, and I\'m not an exception. And I\'m happy that I have traveled',
    },
    {
        chek: false,
        theme: 'theme2',
        importance: 'important',
        title: '7 task',
        description: 'For some people there is nothing so exciting as traveling, and I\'m not an exception. And I\'m happy that I have traveled',
    },
    {
        chek: false,
        theme: 'theme2',
        importance: 'important',
        title: '8 task',
        description: 'For some people there is nothing so exciting as traveling, and I\'m not an exception. And I\'m happy that I have traveled',
    },
    {
        chek: false,
        theme: 'theme3',
        importance: 'important',
        title: '9 task',
        description: 'For some people there is nothing so exciting as traveling, and I\'m not an exception. And I\'m happy that I have traveled',
    },
    {
        chek: false,
        theme: 'theme3',
        importance: 'important',
        title: '10 task',
        description: 'For some people there is nothing so exciting as traveling, and I\'m not an exception. And I\'m happy that I have traveled',
    },
    {
        chek: false,
        theme: 'theme3',
        importance: 'important',
        title: '11 task',
        description: 'For some people there is nothing so exciting as traveling, and I\'m not an exception. And I\'m happy that I have traveled',
    },
];
const grThemeName = ["work","live","sport"];

if (!localStorage.getItem('db')) {
    localStorage.setItem('db', JSON.stringify(dd));
}
if (!localStorage.getItem('Grymyl_Theme_Name')) {
    localStorage.setItem('Grymyl_Theme_Name', JSON.stringify(grThemeName));
}

// localStorage.setItem('db', JSON.stringify(dd));
//console.log(JSON.parse(localStorage.getItem('db')));

const mainControlPlus = document.querySelector('.main-control-plus'),               // добавить задание в текущий раздел
    mainControlEdit = document.querySelector('.main-control-edit'),                 // редактировать раздел
    mainControlRemove = document.querySelector('.main-control-remove');             // удалить раздел

const projectsList = document.querySelector('.projects-list');                      // разделы

const buttonAddTheme = document.querySelector('.projects-title__add-theme');        // добавить раздел

const mainTitleH = document.querySelector('.main-title > h2');                      // главный титл

const mainList = document.querySelector('.main-list');                              // доска заданий

let activeMenu = '';                                                                // активный раздел

class createTheme {
    constructor(name) {
        this.name = name;
        this.id = document.querySelectorAll('.projects-items').length + 1;
    }

    create() {
        let li = document.createElement('li');
        li.className = 'projects-items item';
        li.dataset.name = `theme${this.id}`;
        li.innerHTML = `
            <div class="item-icon"><i class="fa-solid fa-list-check"></i></div>
            <div class="item-name">${this.name}</div>
            <div class="item-count">0</div>
        `;
        projectsList.append(li);

        li.addEventListener('click', (e) => {
            //console.log(e.currentTarget, li);
            activeMenu1(e.currentTarget, this.name);
        });
    }
    saveDB() {
        let i = JSON.parse(localStorage.getItem('Grymyl_Theme_Name')) || [];
        //console.log(i);
        i.push(this.name);
        localStorage.setItem('Grymyl_Theme_Name', JSON.stringify(i));
    }
}

class createTask {
    constructor(title, importance, description) {
        this.title = title;
        this.importance = importance;
        this.description = description;
    }

    create() {
        let li = document.createElement('li');
        let divTask = document.createElement('div');
        li.className = 'main-item';
        divTask.className = 'task';
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
    }

    saveDB() {
        let i = JSON.parse(localStorage.getItem('db'));
        i.push({
            chek: false,
            description: this.description,
            title: this.title,
            theme: activeMenu,
            importance: this.importance,
        });
        localStorage.setItem('db', JSON.stringify(i));
    }
}

function activeMenu1(elMenu, name) {
    const menu = document.querySelectorAll('.projects-items');
    menu.forEach((e) => {
        e.classList.remove('active');
    });
    elMenu.classList.add('active');
    activeMenu = elMenu.dataset.name;
    //console.log(activeMenu);
    mainTitleH.textContent = name;

    mainList.innerHTML = '';
    //console.log(JSON.parse(localStorage.getItem('db')));
    JSON.parse(localStorage.getItem('db')).forEach((e) => {
        if (e.theme == activeMenu) {
            //console.log(e);
            new createTask(e.title, e.importance, e.description).create()
        }
    })
}

function addTheme() {
    //console.log('Новая тема');
    let a = prompt('Тема')
    new createTheme(a).create()
    new createTheme(a).saveDB()
}

buttonAddTheme.addEventListener('click', addTheme);

mainControlPlus.addEventListener('click', () => {
    new createTask('title new', 'red', 'new task new task new task new task new task new task new task new task').create();
    new createTask('title new', 'red', 'new task new task new task new task new task new task new task new task').saveDB();
});




// test
JSON.parse(localStorage.getItem('Grymyl_Theme_Name')).forEach((e) => {
    new createTheme(e).create()
});
activeMenu1(
    document.querySelectorAll('.projects-items')[0],
    document.querySelectorAll('.projects-items')[0].querySelector('.item-name').textContent
)