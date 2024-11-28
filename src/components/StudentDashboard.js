import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to calculate age from the date of birth
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();

    // Adjust if birthday hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  useEffect(() => {
    const fetchStudentProfile = async () => {
      const token = localStorage.getItem('accessToken'); // Access token stored in localStorage
      if (!token) {
        setError('No access token found. Please log in again.');
        return;
      }

      try {
        // Manual API call with fetch
        const response = await fetch('http://127.0.0.1:8000/myapp/student/profile/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the access token in the Authorization header
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch student profile');
        }

        const data = await response.json();
        console.log('Fetched student data:', data); // Log the data to verify subjects field
        setStudentData(data); // Update state with fetched student data
      } catch (err) {
        console.error('Error fetching student profile:', err);
        setError('Failed to fetch student profile. Please try again.');
      }
    };

    fetchStudentProfile();
  }, []);

  return (
    <div className="student-dashboard-container">
      <h2>Student Dashboard</h2>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
         <p><strong>User ID:</strong> {studentData.id}</p> {/* Display User ID */}
          <p><strong>Name:</strong> {studentData.first_name} {studentData.last_name}</p>
          <p><strong>Email:</strong> {studentData.email}</p>
          <p><strong>Username:</strong> {studentData.username}</p>
          <p><strong>Date of Birth:</strong> {studentData.dob}</p>
          <p><strong>Age:</strong> {studentData.dob ? calculateAge(studentData.dob) : 'N/A'}</p> {/* Display Age */}
          <p><strong>Gender:</strong> {studentData.gender === 'M' ? 'Male' : 'Female'}</p>
          <p><strong>Blood Group:</strong> {studentData.blood_group}</p>
          <p><strong>Contact Number:</strong> {studentData.contact_number}</p>
          <p><strong>Address:</strong> {studentData.address}</p>
          <p><strong>Subjects:</strong></p>
          {studentData.subjects?.length > 0 ? (
            <ul>
              {studentData.subjects.map((subject) => (
                <li key={subject.id}><p><strong>Subject_id:</strong> {subject.id}</p>{subject.name}</li>
              ))}
            </ul>
          ) : (
            <p>No subjects available.</p>  // Handle when subjects are not present
          )}
          <button className="btn btn-primary" onClick={() => navigate('/student-update')}>Update Profile</button> {/* Update button */}
        </>
      )}
    </div>
  );
};

export default StudentDashboard;
