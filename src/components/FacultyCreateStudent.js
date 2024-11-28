import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FacultyCreateStudent.css';

const FacultyCreateStudent = () => {
  const [formData, setFormData] = useState({
    user: '', // User ID (e.g., faculty or student)
    first_name: '',
    last_name: '',
    dob: '',
    gender: '',
    blood_group: '',
    contact_number: '',
    address: '',
    subjects: []  // Array of subject IDs
  });
  
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // State to hold subjects fetched from /myapp/student/subjects/
  const [subjects, setSubjects] = useState([]);

  // Fetch available subjects from the API
  useEffect(() => {
    const fetchSubjects = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('No access token found. Please log in again.');
        return;
      }

      try {
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
        setSubjects(subjectsData);  // Store subjects in state
      } catch (err) {
        console.error(err);
        setError('Failed to fetch subjects. Please try again.');
      }
    };

    fetchSubjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'subjects') {
      // Handle multi-select for subjects
      const selectedSubjects = Array.from(e.target.selectedOptions, option => option.value);
      setFormData((prevData) => ({
        ...prevData,
        [name]: selectedSubjects,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      setError('No access token found. Please log in again.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/myapp/faculty/create-student/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to create student');
        return;
      }

      navigate('/faculty-dashboard'); // Redirect after successful creation
    } catch (err) {
      setError('Error creating student. Please try again.');
    }
  };
  const handleUser = () => {
    navigate('/faculty-user');
  };
  return (
    <div className="faculty-create-student-container">
    <button onClick={handleUser} className="create-student-button">
        ListUser
      </button>
      <h2>Create New Student</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          User ID:
          <input
            type="number"
            name="user"
            value={formData.user}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          First Name:
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Gender:
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </label>
        <label>
          Blood Group:
          <input
            type="text"
            name="blood_group"
            value={formData.blood_group}
            onChange={handleChange}
          />
        </label>
        <label>
          Contact Number:
          <input
            type="text"
            name="contact_number"
            value={formData.contact_number}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Address:
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Subjects:
          <select
            name="subjects"
            multiple
            value={formData.subjects}
            onChange={handleChange}
            required
          >
            {subjects.map(subject => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" >Create Student</button>
      </form>

      <div>
        <h3>Student Details Preview</h3>
        <p><strong>User ID:</strong> {formData.user}</p>
        <p><strong>Name:</strong> {formData.first_name} {formData.last_name}</p>
        <p><strong>Date of Birth:</strong> {formData.dob}</p>
        <p><strong>Gender:</strong> {formData.gender === 'M' ? 'Male' : 'Female'}</p>
        <p><strong>Blood Group:</strong> {formData.blood_group}</p>
        <p><strong>Contact Number:</strong> {formData.contact_number}</p>
        <p><strong>Address:</strong> {formData.address}</p>
        <p><strong>Subjects:</strong> {formData.subjects.length > 0 ? formData.subjects.join(', ') : 'No subjects selected'}</p>
      </div>
      <button type="submit" onClick={()=>navigate("/faculty-dashboard")}>GO TO Bcak</button>

    </div>
  );
};

export default FacultyCreateStudent;
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './FacultyCreateStudent.css';

// const FacultyCreateStudent = () => {
//   const [formData, setFormData] = useState({
//     user: '',
//     first_name: '',
//     last_name: '',
//     dob: '',
//     gender: '',
//     blood_group: '',
//     contact_number: '',
//     address: '',
//     subjects: [],
//   });

//   const [profilePic, setProfilePic] = useState(null); // State for the file
//   const [imagePreview, setImagePreview] = useState(null); // State for the preview
//   const [subjects, setSubjects] = useState([]);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSubjects = async () => {
//       const token = localStorage.getItem('accessToken');
//       if (!token) {
//         setError('No access token found. Please log in again.');
//         return;
//       }

//       try {
//         const response = await fetch('http://127.0.0.1:8000/myapp/student/subjects/', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch available subjects.');
//         }

//         const subjectsData = await response.json();
//         setSubjects(subjectsData);
//       } catch (err) {
//         console.error(err);
//         setError('Failed to fetch subjects. Please try again.');
//       }
//     };

//     fetchSubjects();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === 'subjects') {
//       const selectedSubjects = Array.from(e.target.selectedOptions, (option) => option.value);
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: selectedSubjects,
//       }));
//     } else {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     }
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
//     form.append('user', formData.user);
//     form.append('first_name', formData.first_name);
//     form.append('last_name', formData.last_name);
//     form.append('dob', formData.dob);
//     form.append('gender', formData.gender);
//     form.append('blood_group', formData.blood_group);
//     form.append('contact_number', formData.contact_number);
//     form.append('address', formData.address);
//     formData.subjects.forEach((subject) => form.append('subjects', subject));
//     if (profilePic) {
//       form.append('profile_pic', profilePic); // Include profile picture in the form data
//     }

//     try {
//       const response = await fetch('http://127.0.0.1:8000/myapp/faculty/create-student/', {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: form,
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         setError(errorData.error || 'Failed to create student');
//         return;
//       }

//       navigate('/faculty-dashboard');
//     } catch (err) {
//       console.error(err);
//       setError('Error creating student. Please try again.');
//     }
//   };

//   const handleUser = () => {
//     navigate('/faculty-user');
//   };

//   return (
//     <div className="faculty-create-student-container">
//       <button onClick={handleUser} className="create-student-button">
//         List User
//       </button>
//       <h2>Create New Student</h2>
//       {error && <p className="error-message">{error}</p>}

//       <form onSubmit={handleSubmit}>
//         <label>
//           User ID:
//           <input type="number" name="user" value={formData.user} onChange={handleChange} required />
//         </label>
//         <label>
//           First Name:
//           <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
//         </label>
//         <label>
//           Last Name:
//           <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
//         </label>
//         <label>
//           Date of Birth:
//           <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
//         </label>
//         <label>
//           Gender:
//           <select name="gender" value={formData.gender} onChange={handleChange} required>
//             <option value="">Select Gender</option>
//             <option value="M">Male</option>
//             <option value="F">Female</option>
//           </select>
//         </label>
//         <label>
//           Blood Group:
//           <input type="text" name="blood_group" value={formData.blood_group} onChange={handleChange} />
//         </label>
//         <label>
//           Contact Number:
//           <input
//             type="text"
//             name="contact_number"
//             value={formData.contact_number}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <label>
//           Address:
//           <textarea name="address" value={formData.address} onChange={handleChange} required />
//         </label>
//         <label>
//           Subjects:
//           <select name="subjects" multiple value={formData.subjects} onChange={handleChange} required>
//             {subjects.map((subject) => (
//               <option key={subject.id} value={subject.id}>
//                 {subject.name}
//               </option>
//             ))}
//           </select>
//         </label>
//         <label>
//           Profile Picture:
//           <input type="file" onChange={handleFileChange} accept="image/*" />
//         </label>

//         {imagePreview && <img src={imagePreview} alt="Profile Preview" className="circular-image" />}

//         <button type="submit">Create Student</button>
//       </form>
//     </div>
//   );
// };

// export default FacultyCreateStudent;
