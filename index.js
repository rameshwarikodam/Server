const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');


//middleware
app.use(cors());
app.use(express.json());

//Routes

//create a todo
app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo(description) values($1) RETURNING *", [description]);
        res.json(newTodo)
    } catch (err) {
        console.log(err.message);
    }
})

//GET todo
app.get("/todos", async (req, res) => {
    try {
        const allTodo = await pool.query("SELECT * FROM todo");
        res.json(allTodo.rows);
    } catch (err) {
        console.log(err.message);
    }
});

//Update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description=$1 where todo_id=$2", [description, id]);
        res.json("Todo was updated");
    } catch (err) {
        console.log(err.message);
    }
});

//Delete a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id=$1", [id]);
        res.json("Todo was deleted");
    } catch (err) {
        console.log(err.message);
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server has started on port ${port}`);
})