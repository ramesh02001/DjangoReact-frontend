import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import FacultyDashboard from './components/FacultyDashboard';
import FacultyCreateStudent from './components/FacultyCreateStudent';
import FacultyUpdateStudent from './components/FacultyUpdateStudent';
import StudentDashboard from './components/StudentDashboard';
import StudentUpdate from './components/StudentUpdate';
import Userlist from './components/Userlist';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
        <Route path="/faculty-create-student" element={<FacultyCreateStudent />} />
        <Route path="/faculty-user" element={<Userlist/>} />
        <Route path="/faculty-update-student/:studentId" element={<FacultyUpdateStudent />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/student-update" element={<StudentUpdate />} />
      </Routes>
    </div>
  );
}

export default App;
