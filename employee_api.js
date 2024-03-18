const express = require('express');
const app = express();
app.use(express.json());

let employees = [];

// Get all employees
app.get('/employees', (req, res) => {
    res.json(employees);
});

// Get a specific employee
app.get('/employees/:id', (req, res) => {
    const employee = employees.find(emp => emp.id === parseInt(req.params.id));
    if (!employee) return res.status(404).send('Employee not found');
    res.json(employee);
});

// Add a new employee
app.post('/employees', (req, res) => {
    const employee = {
        id: employees.length + 1,
        name: req.body.name
    };
    employees.push(employee);
    res.json(employee);
});

// Update an existing employee
app.put('/employees/:id', (req, res) => {
    const employee = employees.find(emp => emp.id === parseInt(req.params.id));
    if (!employee) return res.status(404).send('Employee not found');
    employee.name = req.body.name;
    res.json(employee);
});

// Delete an employee
app.delete('/employees/:id', (req, res) => {
    const employee = employees.find(emp => emp.id === parseInt(req.params.id));
    if (!employee) return res.status(404).send('Employee not found');
    const index = employees.indexOf(employee);
    employees.splice(index, 1);
    res.json(employee);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));