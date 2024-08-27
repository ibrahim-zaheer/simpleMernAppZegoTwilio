// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const UsersList = () => {
//   const [users, setUsers] = useState([]);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/users');
//         const data = await response.json();
//         setUsers(data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       await fetch('http://localhost:5000/add-user', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name, email }),
//       });
//       setName('');
//       setEmail('');
//       const response = await fetch('http://localhost:5000/users');
//       const data = await response.json();
//       setUsers(data);
//     } catch (error) {
//       console.error('Error adding user:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Users List</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Add User</button>
//       </form>
//       <ul>
//         {users.map((user) => (
//           <li key={user._id}>
//             {user.name} - {user.email}
//             <Link to={`/user/${user.email}`}> View Profile</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UsersList;












import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}
            <Link to={`/user/${user.email}`}>View Profile</Link>
            <Link to={`/user/${user.email}/call`}>Voice Call</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
