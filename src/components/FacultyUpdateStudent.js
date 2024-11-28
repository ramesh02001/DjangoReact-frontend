import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './FacultyUpdateStudent.css';

const FacultyUpdateStudent = () => {
  const { studentId } = useParams(); // Get student ID from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch the student's current data
  useEffect(() => {
    const fetchStudent = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('No access token found. Please log in again.');
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:8000/myapp/faculty/students/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch student details.');
        }

        const data = await response.json();
        const studentDetails = data.find((s) => s.id === parseInt(studentId));
        if (studentDetails) {
          setFormData(studentDetails);
        } else {
          setError('Student not found.');
        }
      } catch (err) {
        console.error('Error fetching student details:', err);
        setError('Failed to fetch student details. Please try again.');
      }
    };

    fetchStudent();
  }, [studentId]);

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission to update student data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setError('No access token found. Please log in again.');
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/myapp/faculty/update-student/${studentId}/`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update student.');
      }

      const data = await response.json();
      setSuccessMessage(data.message);
      navigate('/faculty-dashboard'); // Redirect back to the dashboard after successful update
    } catch (err) {
      console.error('Error updating student:', err);
      setError('Failed to update student. Please try again.');
    }
  };

  if (!formData.id && !error) return <p>Loading student details...</p>; // Loading state

  return (
    <div className="update-student-container">
      <h2>Update Student Details</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender || ''}
            onChange={handleChange}
            required
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
        <div>
          <label>Blood Group:</label>
          <input
            type="text"
            name="blood_group"
            value={formData.blood_group || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Contact Number:</label>
          <input
            type="text"
            name="contact_number"
            value={formData.contact_number || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address || ''}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Student</button>
      </form>
    </div>
  );
};

export default FacultyUpdateStudent;
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import './FacultyUpdateStudent.css';

// const FacultyUpdateStudent = () => {
//   const { studentId } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({});
//   const [profilePic, setProfilePic] = useState(null); // State for the uploaded file
//   const [imagePreview, setImagePreview] = useState(null); // State for the image preview
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);

//   useEffect(() => {
//     const fetchStudent = async () => {
//       const token = localStorage.getItem('accessToken');
//       if (!token) {
//         setError('No access token found. Please log in again.');
//         return;
//       }

//       try {
//         const response = await fetch(`http://127.0.0.1:8000/myapp/faculty/students/`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch student details.');
//         }

//         const data = await response.json();
//         const studentDetails = data.find((s) => s.id === parseInt(studentId));
//         if (studentDetails) {
//           setFormData(studentDetails);
//           setImagePreview(studentDetails.profile_pic); // Assuming the API provides an image URL
//         } else {
//           setError('Student not found.');
//         }
//       } catch (err) {
//         console.error('Error fetching student details:', err);
//         setError('Failed to fetch student details. Please try again.');
//       }
//     };

//     fetchStudent();
//   }, [studentId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setProfilePic(file); // Store the file for submission

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result); // Update the image preview
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('accessToken');
//     if (!token) {
//       setError('No access token found. Please log in again.');
//       return;
//     }

//     const form = new FormData();
//     Object.keys(formData).forEach((key) => {
//       form.append(key, formData[key]);
//     });

//     if (profilePic) {
//       form.append('profile_pic', profilePic); // Include the profile picture
//     }

//     try {
//       const response = await fetch(
//         `http://127.0.0.1:8000/myapp/faculty/update-student/${studentId}/`,
//         {
//           method: 'PATCH',
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           body: form, // Use FormData to send multipart/form-data
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to update student.');
//       }

//       const data = await response.json();
//       setSuccessMessage(data.message);
//       navigate('/faculty-dashboard');
//     } catch (err) {
//       console.error('Error updating student:', err);
//       setError('Failed to update student. Please try again.');
//     }
//   };

//   if (!formData.id && !error) return <p>Loading student details...</p>;

//   return (
//     <div className="update-student-container">
//       <h2>Update Student Details</h2>
//       {error && <p className="error-message">{error}</p>}
//       {successMessage && <p className="success-message">{successMessage}</p>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>First Name:</label>
//           <input
//             type="text"
//             name="first_name"
//             value={formData.first_name || ''}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Last Name:</label>
//           <input
//             type="text"
//             name="last_name"
//             value={formData.last_name || ''}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Date of Birth:</label>
//           <input
//             type="date"
//             name="dob"
//             value={formData.dob || ''}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Gender:</label>
//           <select
//             name="gender"
//             value={formData.gender || ''}
//             onChange={handleChange}
//             required
//           >
//             <option value="M">Male</option>
//             <option value="F">Female</option>
//           </select>
//         </div>
//         <div>
//           <label>Blood Group:</label>
//           <input
//             type="text"
//             name="blood_group"
//             value={formData.blood_group || ''}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Contact Number:</label>
//           <input
//             type="text"
//             name="contact_number"
//             value={formData.contact_number || ''}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Address:</label>
//           <input
//             type="text"
//             name="address"
//             value={formData.address || ''}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Profile Picture:</label>
//           <input type="file" onChange={handleFileChange} accept="image/*" />
//         </div>
//         {imagePreview && (
//           <div>
//             <img src={imagePreview} alt="Profile Preview" className="circular-image" />
//           </div>
//         )}
//         <button type="submit">Update Student</button>
//       </form>
//     </div>
//   );
// };

// export default FacultyUpdateStudent;
