const express = require('express');
const url = require('url');
const todoApp = express();
const port = 4000;

let id = 0;
let task = [];

todoApp.use(express.json());


const getTask = (res) => {
    res.send(task);
}

const getTaskById = (res, index) => {
    const result = task.filter(data => data.id == index)
    res.send(result);
}

const postTask = (req, res) => {
    task.push({ ...req.body, id: id, isCompleted: false });
    id += 1;
    res.redirect('/tasks');
}

const putTask = (req, res, id) => {
    let newTask = (req.body);
    task = task.reduce((acc, ele) => {
        if (ele.id === Number(id)) {
            ele.name = newTask.name;
        }
        return [...acc, ele];
    }, [])
    res.redirect('/tasks');
}

const patchTask = (req, res, id) => {
    let newTask = (req.body);
    task = task.reduce((acc, ele) => {
        if (ele.id === Number(id)) {
            console.log("sindie");
            ele.isCompleted = newTask.isCompleted;
        }
        return [...acc, ele];
    }, [])
    res.redirect('/tasks');
}

const deleteTaskById = (res, index) => {
    task = task.filter(data => data.id != index);
    res.redirect('/tasks');
}

const deleteAll = (res) => {
    task = [];
    res.redirect('/tasks');
}


todoApp.route('/tasks')
    .get((req, res) => {
        getTask(res);
    })
    .post((req, res) => {
        postTask(req, res);
    })
    .delete((req, res) => {
        deleteAll(res);
    });

todoApp.route('/tasks/:id')
    .get((req, res) => {
        const { id } = (req.params);
        getTaskById(res, id);
    })
    .put((req, res) => {
        const { id } = (req.params);
        putTask(req, res, id);
    })
    .patch((req, res) => {
        const { id } = (req.params);
        patchTask(req, res, id);
    })
    .delete((req, res) => {
        const { id } = (req.params);
        deleteTaskById(res, id);
    })

todoApp.get('/', (req, res) => {
    res.send('ToDo List APIs Buddy, Nothing much');
})

todoApp.listen(port, () => {
    console.log(`Server running at port ${port}`)
})