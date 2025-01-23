import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './EmployeeList.css';


const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/employees');
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };
        fetchEmployees();
    }, []);

    const handleEdit = (employee) => {
        setEditingEmployee(employee);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/employees/${id}`);
            if (response.status === 200) {
                alert('Employee removed successfully!');
                setEmployees(employees.filter(emp => emp.id !== id));
            } else {
                console.error('Error deleting employee:', response.data.error);
                alert('Error deleting employee.');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    alert('Employee not found.');
                } else {
                    console.error('Error deleting employee:', error.response.data.error);
                    alert('Error deleting employee.');
                }
            } else {
                console.error('Error deleting employee:', error.message);
                alert('Error deleting employee.');
            }
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedEmployee = {
                ...editingEmployee,
                firstName: e.target.firstName.value,
                lastName: e.target.lastName.value,
                email: e.target.email.value,
                salary: e.target.salary.value,
                date: e.target.date.value,
                isPermanent: e.target.isPermanent.checked,
            };

            await axios.put(`http://localhost:8080/api/employees/${editingEmployee.id}`, updatedEmployee);
            setEmployees(employees.map(emp => emp.id === editingEmployee.id ? updatedEmployee : emp));
            setShowModal(false);
            setEditingEmployee(null);
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    return (
        <div className="table-container">
            <h1>Employee Management Software</h1>
            <div className="left-align">
                <a href="/add-employee" className="add-btn">Add Employee</a>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Salary</th>
                        <th>Date</th>
                        <th>Permanent?</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => {
                        const formattedDate = new Date(employee.date).toISOString().split('T')[0];
                        return (
                            <tr key={employee.id}>
                                <td>{index + 1}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>${employee.salary}</td>
                                <td>{formattedDate}</td>
                                <td>{employee.isPermanent ? 'Yes' : 'No'}</td>
                                <td>
                                    <button className="edit-btn" onClick={() => handleEdit(employee)}>Edit</button>
                                    <button className="delete-btn" onClick={() => handleDelete(employee.id)}>Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        <h2>Edit Employee</h2>
                        <form onSubmit={handleUpdate}>
                            <label>First Name:</label>
                            <input type="text" name="firstName" defaultValue={editingEmployee.firstName} required />

                            <label>Last Name:</label>
                            <input type="text" name="lastName" defaultValue={editingEmployee.lastName} required />

                            <label>Email:</label>
                            <input type="email" name="email" defaultValue={editingEmployee.email} required />

                            <label>Salary:</label>
                            <input type="number" name="salary" defaultValue={editingEmployee.salary} required />

                            <label>Date:</label>
                            <input type="date" name="date" defaultValue={editingEmployee.date} required />

                            <label>
                                <input type="checkbox" name="isPermanent" defaultChecked={editingEmployee.isPermanent} />
                                Is Permanent?
                            </label>

                            <button type="submit" className="save-btn">Save</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeList;
