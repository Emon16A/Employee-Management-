const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.post('/employees', (req, res) => {
    const { firstName, lastName, email, salary, date, isPermanent } = req.body;

    const query = `
        INSERT INTO employees (firstName, lastName, email, salary, date, isPermanent)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [firstName, lastName, email, salary, date, isPermanent], (err, results) => {
        if (err) {
            console.error('Error inserting employee:', err);
            return res.status(500).json({ error: 'Failed to add employee' });
        }
        res.status(201).json({ message: 'Employee added successfully' });
    });
});

router.get('/employees', (req, res) => {
    const query = 'SELECT * FROM employees';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching employees:', err);
            return res.status(500).json({ error: 'Failed to fetch employees' });
        }
        res.status(200).json(results);
    });
});

router.delete('/employees/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM employees WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error deleting employee:', err);
            return res.status(500).json({ error: 'Failed to delete employee' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully' });
    });
});

router.put('/employees/:id', (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, salary, date, isPermanent } = req.body;
    const query = `
        UPDATE employees
        SET firstName = ?, lastName = ?, email = ?, salary = ?, date = ?, isPermanent = ?
        WHERE id = ?
    `;

    db.query(query, [firstName, lastName, email, salary, date, isPermanent, id], (err, results) => {
        if (err) {
            console.error('Error updating employee:', err);
            return res.status(500).json({ error: 'Failed to update employee' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee updated successfully' });
    });
});

module.exports = router;
