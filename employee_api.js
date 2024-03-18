const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost/employees', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const employeeSchema = new mongoose.Schema({
    name: String
});

const Employee = mongoose.model('Employee', employeeSchema);

// Get all employees
app.get('/employees', async (req, res) => {
    const employees = await Employee.find();
    res.send(employees);
});

// Get a specific employee
app.get('/employees/:id', async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).send('Employee not found');
    res.send(employee);
});

// Add a new employee
app.post('/employees', async (req, res) => {
    let employee = new Employee({ name: req.body.name });
    employee = await employee.save();
    res.send(employee);
});

// Update an existing employee
app.put('/employees/:id', async (req, res) => {
    const employee = await Employee.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });

    if (!employee) return res.status(404).send('Employee not found');
    res.send(employee);
});

// Delete an employee
app.delete('/employees/:id', async (req, res) => {
    const employee = await Employee.findByIdAndRemove(req.params.id);
    if (!employee) return res.status(404).send('Employee not found');
    res.send(employee);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));