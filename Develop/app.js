const Manager = require("./lib/Manager");  //
const Engineer = require("./lib/Engineer");  //
const Intern = require("./lib/Intern"); //
const inquirer = require("inquirer");  //
const path = require("path");
const fs = require("fs");

const createCards = require("./lib/createCards");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const createRender = require("./lib/htmlRenderer");

const managerArray = [];
const engineerArray = [];
const internArray = [];

const createManager = () => {

    return inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "Enter the name of a Manager:"
        },
        {
            type: "input",
            name: "managerId",
            message: "Enter the ID of the Manager:"
        },
        {
            type: "input",
            name: "managerEmail",
            message: "Enter the email of the Manager:"
        },
        {
            type: "input",
            name: "managerOffice",
            message: "Enter the office number of the Manager:"
        }
    ])
    .then(function({ managerName, managerId, managerEmail, managerOffice }){
        const manager = new Manager(managerName, managerId, managerEmail, managerOffice);
        managerArray.push(manager)
        createTeam();
    });
}

createManager();

function createTeam() {

    inquirer.prompt([
      {
        type: "list",
        name: "teamMember",
        message: "Would you like to add an Engineer or Intern?",
        choices: [
          "Engineer",
          "Intern",
          "Don't add any more team members"
        ]
      }
    ]).then(answer => {
      switch(answer.teamMember) {
        case "Engineer":
            createEngineer();
            break;
        case "Intern":
            createIntern();
            break;
        default:
            createCards(managerArray, engineerArray, internArray);
      }
    });

}

function createEngineer() {

    return inquirer.prompt([
        {
            type: "input",
            name: "engineerName",
            message: "Enter the name of a engineer:"
        },
        {
            type: "input",
            name: "engineerId",
            message: "Enter the ID of the engineer:"
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "Enter the email of the engineer:"
        },
        {
            type: "input",
            name: "engineerGithub",
            message: "Enter the Github username of the engineer:"
        }
    ]).then(function({ engineerName, engineerId, engineerEmail, engineerGithub }) {
        const engineer = new Engineer(engineerName, engineerId, engineerEmail, engineerGithub);
        engineerArray.push(engineer);
        createTeam();
    });

}

function createIntern() {

    return inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "Enter the name of a intern:"
        },
        {
            type: "input",
            name: "internId",
            message: "Enter the ID of the intern:"
        },
        {
            type: "input",
            name: "internEmail",
            message: "Enter the email of the intern:"
        },
        {
            type: "input",
            name: "internSchool",
            message: "Enter the school the intern is attending:"
        }
    ]).then(function({ internName, internId, internEmail, internSchool }) {
        const intern = new Intern(internName, internId, internEmail, internSchool);
        internArray.push(intern);
        createTeam();
    });

}


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
