const express = require('express');
const server = express();
server.use(express.json());

const projects = [];
let cont = 0;

server.use((req, res, next) => {
    console.log(`Number of Requisitions: ${cont += 1}`);
    next();
});

function checkProjectExist(req, res, next) {
    const index = req.params.id;
    if (!projects[index]) {
        return res.status(400).json({error: 'Project not exist'});
    }

    req.index = index;

    return next();
}

server.post('/projects', (req, res) => {
    const {id} = req.body;
    const {title} = req.body;

    projects.push({id, title, task: []});

    return res.json(projects);
});

server.get('/projects', (req, res) => {
    return res.json(projects);
});

server.put('/projects/:id', checkProjectExist, (req, res) => {
    const {title} = req.body;

    projects[req.index].title = title;

    return res.json(projects);
});

server.delete('/projects/:id', checkProjectExist, (req, res) => {
    projects.splice(req.index, 1);

    return res.send();
});

server.post('/projects/:id/tasks', checkProjectExist, (req, res) => {
    const {title} = req.body;

    projects[req.index].task.push(title);

    return res.json(projects);
});

server.listen(3000);
