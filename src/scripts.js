
//const userData = require('../data/users');

//let usersData = require("../data/users");

//~~~~~~~~~~~~~~~~~~QUERY SELECTORS~~~~~~~~~~~~~~~~~~~~~~~~~~

const usersDropDown = document.querySelector('.users');

window.addEventListener('load', loadUsers());

function createUsers() {
  let userNames = usersData.map(user => {
    //console.log(user.name)
    return user.name;
  })
  return userNames;
}
  
function loadUsers() {
    let users = createUsers();
     console.log(users);
      users.forEach(user => {
      return usersDropDown.innerHTML += `<option value=${user}>${user}</option>`
  })
}
