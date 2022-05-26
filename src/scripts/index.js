import '../styles/style.scss';

let a = localStorage.setItem('db', JSON.stringify({1:[1,2,3], 2: [4,5,6], 3: [7,8,9]}));

console.log(JSON.parse(localStorage.getItem('db')));