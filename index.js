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
if (answers.menu === "Add role") {
  // const sql = `SELECT * FROM role`;
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "newRole",
      message: "What is the new role?"
    }
  ])
  db.query(`INSERT INTO role (title, salary, department_id) VALUES (?)`, [answers.newRole] , (err, result) => {
    if (err) throw err
    console.table (result)
    promptManager();
  });
}
if (answers.menu === "Add employee") {
  // const sql = `SELECT * FROM role`;
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "newEmployee",
      message: "What is the new employee?"
    }
  ])
  db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?)`, [answers.newEmployee] , (err, result) => {
    if (err) throw err
    console.table (result)
    promptManager();
  });
}

if (answers.menu === "Update an employees' role") {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "updateEmployee",
      message: "What is the employees' ID?"
    },
    {
      type: "input",
      name: "updateRole",
      message: "What is the role ID?"
    }
  ])
  db.query(`UPDATE employee SET role_id = ? WHERE id = ?` , [answers.updateRole, answers.updateEmployee] ,  (err, result) => {
    if (err) throw err
    console.table (result)
    promptManager();
  }) 
}
}

db.connect(err => {
  if (err) throw err
  promptManager();
})