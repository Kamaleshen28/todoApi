let id=0;
let task=[];


const getTask = (req, res) => {
    res.send(task);
}

const getTaskById = (req, res) => {
    const {id} = req.params
    const result = task.filter(data => data.id == id)
    res.send(result);
}

const postTask = (req, res) => {
    task.push({ ...req.body, id: id, isCompleted: false });
    id += 1;
    res.redirect('/tasks');
}

const putTask = (req, res) => {
    let newTask = (req.body);
    const {id} = req.params;
    task = task.reduce((acc, ele) => {
        if (ele.id === Number(id)) {
            ele.name = newTask.name;
        }
        return [...acc, ele];
    }, [])
    res.redirect('/tasks');
}

const patchTask = (req, res) => {
    const { id } = (req.params);
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

const deleteTaskById = (req, res) => {
    const { id } = (req.params);
    task = task.filter(data => data.id != id);
    res.redirect('/tasks');
}

const deleteAll = (req, res) => {
    task = [];
    res.redirect('/tasks');
}

module.exports = {
    getTask,
    getTaskById,
    postTask,
    putTask,
    patchTask,
    deleteTaskById,
    deleteAll
}