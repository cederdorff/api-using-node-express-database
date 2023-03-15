// ========== config & consts ========== //
//==> config og variabler -- det behøver du som sådan ikke forholde dig til
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv");
const mysqlConnection = require("./database");
const port = 3000;

// Your github page origin has to be written EXACTLY like this! https://behu-kea.github.io
const URL_FOR_FRONTEND = "YOUR_GITHUB_PAGE_ORIGIN_HERE";

app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

// If the application is running localhost allow all requests,
// otherwise add cors for specific website
// Remember to add the NODE_ENV="prod" on server!
const cors_url = process.env.NODE_ENV === "prod" ? URL_FOR_FRONTEND : "*";
app.use(
    cors({
        origin: cors_url
    })
);

//==> det vigtige begynder her

// ========== routes & endpoints ========== //

// GET Route "/"
app.get("/", (request, response) => {
    response.send("Node Express Users API! Read users from at http://localhost:3000/users"); // det her vises hvis du kører http://localhost:3000 i browser. Vi bruger den som sådan ikke til noget :)
});

// GET Route "/users"
// get all users from database
app.get("/users", (request, response) => {
    const query = "SELECT * FROM users_data;"; // sql query to select all from the table users_data
    mysqlConnection.query(query, (error, results, fields) => {
        if (error) {
            console.log(error);
        } else {
            response.json({ users: results });
        }
    });
});

// GET Route "/users"
// get all users from database
app.get("/products", (request, response) => {
    const query = "SELECT * FROM products;"; // sql query to select all from the table users_data
    mysqlConnection.query(query, (error, results, fields) => {
        if (error) {
            console.log(error);
        } else {
            response.json({ products: results });
        }
    });
});

// GET Route "/users/:id"
// get one user from database by given id
app.get("/users/:id", (request, response) => {
    const id = request.params.id;
    const query = `SELECT * FROM users_data WHERE id=${id};`; // sql query

    mysqlConnection.query(query, (error, results, fields) => {
        console.log(results);
        if (error) {
            console.log(error);
        } else {
            response.json(results[0]);
        }
    });
});

// POST Route "/users"
// create user
app.post("/users", (request, response) => {
    const newUser = request.body;
    const query = `INSERT INTO users_data(firstName, lastName, image, age, email, gender) values("${newUser.firstName}", "${newUser.lastName}", "${newUser.image}", "${newUser.age}", "${newUser.email}", "${newUser.gender}");`; // sql query

    mysqlConnection.query(query, (error, results, fields) => {
        if (error) {
            console.log(error);
        } else {
            response.json({ users: results });
        }
    });
});

// PUT Route "/users/:id"
// update existing user by given id
app.put("/users/:id", (request, response) => {
    const id = request.params.id;
    const user = request.body;
    const query = `UPDATE users_data SET name="${user.name}", mail="${user.mail}", title="${user.title}", image="${user.image}" WHERE id=${id};`; // sql query

    mysqlConnection.query(query, (error, results, fields) => {
        if (error) {
            console.log(error);
        } else {
            response.json({ users: results });
        }
    });
});

// DELETE Route "/users/:id"
// delete user by given id
app.delete("/users/:id", (request, response) => {
    const id = request.params.id;
    const query = `DELETE FROM users_data WHERE id=${id};`; // sql query

    mysqlConnection.query(query, (error, results, fields) => {
        if (error) {
            console.log(error);
        } else {
            response.json({ users: results });
        }
    });
});

// binds and listens for connections on the specified host and port
app.listen(port, () => {
    console.log(`Node.js REST API listening at http://localhost:${port}`);
});
