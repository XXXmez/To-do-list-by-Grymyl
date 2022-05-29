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

//let a = localStorage.setItem('db', JSON.stringify(dd));
//console.log(JSON.parse(localStorage.getItem('db')));

const mainControlPlus = document.querySelector('.main-control-plus'),
    mainControlEdit = document.querySelector('.main-control-edit'),
    mainControlRemove = document.querySelector('.main-control-remove');

const projectsList = document.querySelector('.projects-list');

const buttonAddTheme = document.querySelector('.projects-title__add-theme');

const mainTitleH = document.querySelector('.main-title > h2');

const mainList = document.querySelector('.main-list');

let activeMenu = '';

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

        li.addEventListener('click', (e,i) => {
            const menu = document.querySelectorAll('.projects-items');
            menu.forEach((e) => {
                e.classList.remove('active');
            });
            li.classList.add('active');
            activeMenu = li.dataset.name;
            console.log(activeMenu);
            mainTitleH.textContent = this.name;

            mainList.innerHTML = '';
            console.log(dd);
            dd.forEach((e) => {
                if (e.theme == activeMenu) {
                    //console.log(e);
                    new createTask(e.title, e.importance, e.description).create()
                }
            })
        });
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

        mainList.append(li);
    }

    saveDB() {
        dd.push({
            chek: false,
            description: this.description,
            title: this.title,
            theme: activeMenu,
            importance: this.importance,
        });
    }
}

function addTheme () {
    console.log('Новая тема');
    new createTheme(prompt('Тема')).create()
}

buttonAddTheme.addEventListener('click', addTheme);

mainControlPlus.addEventListener('click', () => {
    new createTask('title new', 'red', 'new task new task new task new task new task new task new task new task').create();
    new createTask('title new', 'red', 'new task new task new task new task new task new task new task new task').saveDB();
});




// test 
new createTheme('work').create()
new createTheme('life').create()
new createTheme('sport').create()