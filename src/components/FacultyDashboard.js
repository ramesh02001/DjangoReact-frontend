import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation to update page
import './FacultyDashboard.css';

const FacultyDashboard = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use navigate for redirecting

  // Fetch all students from the backend
  useEffect(() => {
    const fetchStudents = async () => {
      const token = localStorage.getItem('accessToken'); // Access token from localStorage
      if (!token) {
        setError('No access token found. Please log in again.');
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:8000/myapp/faculty/students/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the token in headers
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }

        const data = await response.json();
        setStudents(data); // Set fetched student data
      } catch (err) {
        console.error('Error fetching students:', err);
        setError('Failed to fetch students. Please try again.');
      }
    };

    fetchStudents();
  }, []);

  // Function to handle navigating to the student update page
  const handleUpdate = (studentId) => {
    navigate(`/faculty-update-student/${studentId}`);
  };
  const handleCreateStudent = () => {
    navigate('/faculty-create-student');
  };
  return (
    <div className="faculty-dashboard-container">
      <h2>Faculty Dashboard</h2>
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleCreateStudent} className="create-student-button">
        Create New Student
      </button>
      {students.length > 0 ? (
        <div>
          <h3>All Students</h3>
          <ul>
            {students.map((student) => (
              <li key={student.id}>
              <p><strong>Student ID:</strong> {student.id}</p> {/* Display User ID */}
              <p><strong>User ID:</strong> {student.user}</p> {/* Display User ID */}

                <p><strong>Name:</strong> {student.first_name} {student.last_name}</p>
                <p><strong>Date of Birth:</strong> {student.dob}</p>
                <p><strong>Gender:</strong> {student.gender === 'M' ? 'Male' : 'Female'}</p>
                <p><strong>Blood Group:</strong> {student.blood_group}</p>
                <p><strong>Contact Number:</strong> {student.contact_number}</p>
                <p><strong>Address:</strong> {student.address}</p>
                <p><strong>Subjects:</strong> 
                  {student.subjects.length > 0 
                    ? student.subjects.join(', ') 
                    : 'No subjects assigned'}
                </p>
                <button onClick={() =>handleUpdate(student.id)}>Update Student</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No students available.</p>
      )}
    </div>
  );
};

export default FacultyDashboard;
