import React, { useState, useEffect } from 'react';

const Userlist = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStudentData = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          setError('No access token found. Please log in again.');
          return;
        }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch('http://127.0.0.1:8000/myapp/faculty/user/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setStudents(data);
        } else {
          const errorData = await response.json();
          setError(errorData.error || 'Failed to fetch students');
        }
      } catch (error) {
        setError('An error occurred while fetching students');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []); // Empty dependency array ensures the effect runs only once on mount.

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f4f6f9',
        minHeight: '100vh',
      }}
    >
      <h1 style={{ color: '#333', marginBottom: '20px' }}>Faculty Dashboard</h1>

      {loading && <p style={{ color: '#007bff', fontSize: '16px' }}>Loading...</p>}

      {error && (
        <p style={{ color: 'red', fontSize: '16px', marginTop: '10px' }}>
          {error}
        </p>
      )}

      <div style={{ marginTop: '20px' }}>
        {students.length === 0 && !loading && !error && (
          <p style={{ color: '#555', fontSize: '16px' }}>No students found.</p>
        )}

        {students.map((student) => (
          <div
            key={student.id}
            style={{
              backgroundColor: '#fff',
              padding: '15px',
              marginBottom: '10px',
              borderRadius: '5px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              textAlign: 'left',
              maxWidth: '400px',
              margin: '10px auto',
            }}
          >
            <p style={{ margin: '5px 0', fontSize: '16px' }}>
              <strong style={{ color: '#333' }}>User ID:</strong> {student.id}
            </p>
            <p style={{ margin: '5px 0', fontSize: '16px' }}>
              <strong style={{ color: '#333' }}>Username:</strong> {student.username}
            </p>
            <p style={{ margin: '5px 0', fontSize: '16px' }}>
              <strong style={{ color: '#333' }}>Email:</strong> {student.email}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Userlist;
