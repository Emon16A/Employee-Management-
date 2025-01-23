
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddEmployee from './components/AddEmployee';
import EmployeeList from './components/EmployeeList';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route exact path="/" element={<EmployeeList />} />
                    <Route path="/add-employee" element={<AddEmployee />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
