// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import './StudentUpdate.css';

// // const StudentUpdate = () => {
// //   const [formData, setFormData] = useState({});
// //   const [error, setError] = useState(null);
// //   const [success, setSuccess] = useState(null);
// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value,
// //     });
// //   };

// //   const handleUpdate = async (e) => {
// //     e.preventDefault();
// //     const token = localStorage.getItem('accessToken');
// //     if (!token) {
// //       setError('No access token found. Please log in again.');
// //       return;
// //     }

// //     try {
// //       const response = await fetch('http://127.0.0.1:8000/myapp/student/update-profile/', {
// //         method: 'PATCH',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${token}`,
// //         },
// //         body: JSON.stringify(formData),
// //       });

// //       if (!response.ok) {
// //         throw new Error('Failed to update profile');
// //       }

// //       setSuccess('Profile updated successfully!');
// //       setTimeout(() => {
// //         navigate('/student-dashboard'); // Navigate back to the dashboard
// //       }, 2000);
// //     } catch (err) {
// //       console.error('Error updating profile:', err);
// //       setError('Failed to update profile. Please try again.');
// //     }
// //   };

// //   return (
// //     <div className="student-update-form-container">
// //       <h2>Update Profile</h2>
// //       {error && <p className="error-message">{error}</p>}
// //       {success && <p className="success-message">{success}</p>}

// //       <form onSubmit={handleUpdate}>
// //         <label>
// //           First Name:
// //           <input
// //             type="text"
// //             name="first_name"
// //             value={formData.first_name || ''}
// //             onChange={handleChange}
// //             required
// //           />
// //         </label>
// //         <label>
// //           Last Name:
// //           <input
// //             type="text"
// //             name="last_name"
// //             value={formData.last_name || ''}
// //             onChange={handleChange}
// //             required
// //           />
// //         </label>
// //         <label>
// //           Date of Birth:
// //           <input
// //             type="date"
// //             name="dob"
// //             value={formData.dob || ''}
// //             onChange={handleChange}
// //             required
// //           />
// //         </label>
// //         <label>
// //           Gender:
// //           <select
// //             name="gender"
// //             value={formData.gender || ''}
// //             onChange={handleChange}
// //             required
// //           >
// //             <option value="M">Male</option>
// //             <option value="F">Female</option>
// //           </select>
// //         </label>
// //         <label>
// //           Blood Group:
// //           <input
// //             type="text"
// //             name="blood_group"
// //             value={formData.blood_group || ''}
// //             onChange={handleChange}
// //           />
// //         </label>
// //         <label>
// //           Contact Number:
// //           <input
// //             type="text"
// //             name="contact_number"
// //             value={formData.contact_number || ''}
// //             onChange={handleChange}
// //             required
// //           />
// //         </label>
// //         <label>
// //           Address:
// //           <textarea
// //             name="address"
// //             value={formData.address || ''}
// //             onChange={handleChange}
// //           ></textarea>
// //         </label>
// //         <button type="submit" className="btn btn-primary">Update</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default StudentUpdate;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const StudentUpdate = () => {
//   const [formData, setFormData] = useState({});
//   const [subjects, setSubjects] = useState([]); // To hold the available subjects
//   const [selectedSubjects, setSelectedSubjects] = useState([]); // To hold the selected subjects
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchStudentData = async () => {
//       const token = localStorage.getItem('accessToken');
//       if (!token) {
//         setError('No access token found. Please log in again.');
//         return;
//       }

//       try {
//         // Fetch current student data
//         const response = await fetch('http://127.0.0.1:8000/myapp/student/profile/', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch student profile');
//         }

//         const data = await response.json();
//         setFormData(data);
//         setSelectedSubjects(data.subjects.map(subject => subject.id)); // Pre-select current subjects

//         // Fetch available subjects for the student to choose from
//         const subjectResponse = await fetch('http://127.0.0.1:8000/myapp/student/subjects/', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//         });

//         if (!subjectResponse.ok) {
//           throw new Error('Failed to fetch subjects');
//         }

//         const subjectData = await subjectResponse.json();
//         setSubjects(subjectData); // Set available subjects for selection
//       } catch (err) {
//         console.error('Error fetching data:', err);
//         setError('Failed to load data. Please try again.');
//       }
//     };

//     fetchStudentData();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubjectChange = (e) => {
//     const value = Array.from(e.target.selectedOptions, option => option.value);
//     setSelectedSubjects(value);
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('accessToken');
//     if (!token) {
//       setError('No access token found. Please log in again.');
//       return;
//     }

//     try {
//       // Send update request with the selected subjects included
//       const response = await fetch('http://127.0.0.1:8000/myapp/student/update-profile/', {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           ...formData,
//           subjects: selectedSubjects, // Include selected subjects (IDs)
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         setError(errorData.error || 'Failed to update profile');
//         return;
//       }

//       setSuccess('Profile updated successfully!');
//       setTimeout(() => {
//         navigate('/student-dashboard'); // Navigate back to the dashboard
//       }, 2000);
//     } catch (err) {
//       console.error('Error updating profile:', err);
//       setError('Failed to update profile. Please try again.');
//     }
//   };

//   return (
//     <div className="student-update-form-container">
//       <h2>Update Profile</h2>
//       {error && <p className="error-message">{error}</p>}
//       {success && <p className="success-message">{success}</p>}

//       <form onSubmit={handleUpdate}>
//         <label>
//           First Name:
//           <input
//             type="text"
//             name="first_name"
//             value={formData.first_name || ''}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <label>
//           Last Name:
//           <input
//             type="text"
//             name="last_name"
//             value={formData.last_name || ''}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <label>
//           Date of Birth:
//           <input
//             type="date"
//             name="dob"
//             value={formData.dob || ''}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <label>
//           Gender:
//           <select
//             name="gender"
//             value={formData.gender || ''}
//             onChange={handleChange}
//             required
//           >
//             <option value="M">Male</option>
//             <option value="F">Female</option>
//           </select>
//         </label>
//         <label>
//           Blood Group:
//           <input
//             type="text"
//             name="blood_group"
//             value={formData.blood_group || ''}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Contact Number:
//           <input
//             type="text"
//             name="contact_number"
//             value={formData.contact_number || ''}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <label>
//           Address:
//           <textarea
//             name="address"
//             value={formData.address || ''}
//             onChange={handleChange}
//           ></textarea>
//         </label>
//         <label>
//           Subjects:
//           <select
//             name="subjects"
//             multiple
//             value={selectedSubjects}
//             onChange={handleSubjectChange}
//           >
//             {subjects.map(subject => (
//               <option key={subject.id} value={subject.id}>
//                 {subject.name}
//               </option>
//             ))}
//           </select>
//         </label>
//         <button type="submit" className="btn btn-primary">Update</button>
//       </form>
//     </div>
//   );
// };

// export default StudentUpdate;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentUpdate.css'
const StudentUpdate = () => {
  const [formData, setFormData] = useState({});
  const [subjects, setSubjects] = useState([]); // Available subjects
  const [selectedSubjects, setSelectedSubjects] = useState([]); // Selected subjects
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentData = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('No access token found. Please log in again.');
        return;
      }

      try {
        // Fetch student profile
        const profileResponse = await fetch('http://127.0.0.1:8000/myapp/student/profile/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!profileResponse.ok) {
          throw new Error('Failed to fetch student profile');
        }

        const profileData = await profileResponse.json();
        setFormData(profileData);
        setSelectedSubjects(profileData.subjects.map((subject) => subject.id)); // Pre-select subjects

        // Fetch available subjects
        const subjectsResponse = await fetch('http://127.0.0.1:8000/myapp/student/subjects/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!subjectsResponse.ok) {
          throw new Error('Failed to fetch available subjects');
        }

        const subjectsData = await subjectsResponse.json();
        setSubjects(subjectsData);
      } catch (err) {
        console.error(err);
        setError('Failed to load data. Please try again.');
      }
    };

    fetchStudentData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubjectChange = (e) => {
    const values = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedSubjects(values);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setError('No access token found. Please log in again.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/myapp/student/update-profile/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          subjects: selectedSubjects, // Include selected subjects
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to update profile');
        return;
      }

      setSuccess('Profile updated successfully!');
      setTimeout(() => {
        navigate('/student-dashboard');
      }, 2000);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="student-update-form-container">
    <h2 className="form-title">Update Profile</h2>
    {error && <p className="error-message">{error}</p>}
    {success && <p className="success-message">{success}</p>}
  
    <form onSubmit={handleUpdate} className="update-form">
      <div>
        <label htmlFor="first_name">First Name:</label>
        <input
          type="text"
          name="first_name"
          id="first_name"
          value={formData.first_name || ''}
          onChange={handleChange}
          required
          className="form-input"
        />
      </div>
      <div>
        <label htmlFor="last_name">Last Name:</label>
        <input
          type="text"
          name="last_name"
          id="last_name"
          value={formData.last_name || ''}
          onChange={handleChange}
          required
          className="form-input"
        />
      </div>
      <div>
        <label htmlFor="dob">Date of Birth:</label>
        <input
          type="date"
          name="dob"
          id="dob"
          value={formData.dob || ''}
          onChange={handleChange}
          required
          className="form-input"
        />
      </div>
      <div>
        <label htmlFor="gender">Gender:</label>
        <select
          name="gender"
          id="gender"
          value={formData.gender || ''}
          onChange={handleChange}
          required
          className="form-select"
        >
          <option value="">Select Gender</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
      </div>
      <div>
        <label htmlFor="blood_group">Blood Group:</label>
        <input
          type="text"
          name="blood_group"
          id="blood_group"
          value={formData.blood_group || ''}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div>
        <label htmlFor="contact_number">Contact Number:</label>
        <input
          type="text"
          name="contact_number"
          id="contact_number"
          value={formData.contact_number || ''}
          onChange={handleChange}
          required
          className="form-input"
        />
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <textarea
          name="address"
          id="address"
          value={formData.address || ''}
          onChange={handleChange}
          className="form-textarea"
        />
      </div>
      <div>
        <label htmlFor="subjects">Subjects:</label>
        <select
            name="subjects"
            id="subjects"
            multiple
            value={selectedSubjects}
            onChange={handleSubjectChange}
            className="form-select-multiple"
        >
            {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                    {subject.name}
                </option>
            ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        Update
      </button>
    </form>
  </div>
  );
};

export default StudentUpdate;
