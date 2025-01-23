import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddEmployee.css';

const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        email: '',
        salary: '',
        date: '',
        isPermanent: false,
    });

    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEmployee({
            ...employee,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/employees', employee);
            setSuccessMessage('Employee added successfully!');
            setTimeout(() => {
                setSuccessMessage('');
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    const handleCancel = () => {
        setEmployee({
            firstName: '',
            lastName: '',
            email: '',
            salary: '',
            date: '',
            isPermanent: false,
        });
        navigate('/');
    };

    return (
        <div className="add-employee-container">
            <h1>Add Employee</h1>
            {successMessage && (
                <div className="success-popup">
                    <p>{successMessage}</p>
                </div>
            )}
            <form className="add-employee-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={employee.firstName}
                        onChange={handleChange}
                        placeholder="e.g., John"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={employee.lastName}
                        onChange={handleChange}
                        placeholder="e.g., Doe"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={employee.email}
                        onChange={handleChange}
                        placeholder="e.g., john.doe@example.com"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="salary">Salary ($)</label>
                    <input
                        type="number"
                        id="salary"
                        name="salary"
                        value={employee.salary}
                        onChange={handleChange}
                        placeholder="e.g., 50000"
                        required
                    />
                </div>
                <div className="form-group-row">
                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={employee.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group checkbox-group">
                        <input
                            type="checkbox"
                            id="isPermanent"
                            name="isPermanent"
                            checked={employee.isPermanent}
                            onChange={handleChange}
                        />
                        <label htmlFor="isPermanent">Is Permanent?</label>
                    </div>
                </div>
                <div className="button-group">
                    <button type="submit" className="add-btn">Add</button>
                    <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
                </div>
            </form>


        </div>
    );
};

export default AddEmployee;
