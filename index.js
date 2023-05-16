const mysql = require('mysql2');
const inquirer = require("inquirer");

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Hockeypro37!',
    database: 'employeeTracker_db'
  },
  console.log(`Connected to the employeeTracker_db database.`)
);

async function promptManager() {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "menu",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add department",
        "Add role",
        "Add employee",
        "Update an employees' role"
      ]
    }
]);

if (answers.menu === "View all departments") {
  // const sql = `SELECT * FROM department`;
  db.query(`SELECT * FROM department`, (err, result) => {
    if (err) throw err
    console.table (result)
    promptManager();
  });
}
if (answers.menu === "View all roles") {
  // const sql = `SELECT * FROM role`;
  db.query(`SELECT * FROM role`, (err, result) => {
    if (err) throw err
    console.table (result)
    promptManager();
  });
}
if (answers.menu === "View all employees") {
  // const sql = `SELECT * FROM role`;
  db.query(`SELECT * FROM employee`, (err, result) => {
    if (err) throw err
    console.table (result)
    promptManager();
  });
}
if (answers.menu === "Add department") {
  // const sql = `SELECT * FROM role`;
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "newDepartment",
      message: "What is the new department?"
    }
  ])
  db.query(`INSERT INTO department (department_name) VALUES (?)`, [answers.newDepartment] , (err, result) => {
    if (err) throw err
    console.table (result)
    promptManager();
  });
}

  // const sql = `SELECT * FROM department`;

  // db.query(`SELECT * FROM department`, (err, result) => {
  //   if (err) throw err
  //   console.table (result)
  //   promptManager();
  // });
}

db.connect(err => {
  if (err) throw err
  promptManager();
})


  //   {
  //     type: "input",
  //     name: "allDepartments",
  //     message: "View all departments",
  //     validate: (answer) => answer !== "",
  //   },
  //   {
  //     type: "input",
  //     name: "allRoles",
  //     message: "View all roles",
  //     validate: (answer) => answer !== "",
  //   },
  //   {
  //     type: "input",
  //     name: "allEmployees",
  //     message: "View all employees",
  //     validate: (answer) => answer !== "",
  //   },
  //   {
  //     type: "input",
  //     name: "addDepartment",
  //     message: "Add department",
  //     validate: (answer) => answer !== "",
  //   },
  //   {
  //     type: "input",
  //     name: "addRole",
  //     message: "Add role",
  //     validate: (answer) => answer !== "",
  //   },
  //   {
  //     type: "input",
  //     name: "addEmployee",
  //     message: "Add employee",
  //     validate: (answer) => answer !== "",
  //   },
  //   {
  //     type: "input",
  //     name: "updateRole",
  //     message: "Update an employees' role",
  //     validate: (answer) => answer !== "",
  //   },