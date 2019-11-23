var inquirer = require("inquirer");
var fs = require('fs');
const generateHTML = require("./generateHTML");



inquirer.prompt([
    {
        type: "input",
        name: "userName",
        message: "What is your github username?"
    },
    {
        type: "list",
        message: "What is your favorite color?",
        name: "color",
        choices: [
            "green",
            "blue",
            "pink",
            "red",
        ]
    }
]).then(function (data) {
    const url = `https://api.github.com/users/${userName}`

    axios.get(url)
    .then (response => {
        generateHTML();
    })








})


function writeToFile(fileName, data) {

}

function init() {

}
init();
