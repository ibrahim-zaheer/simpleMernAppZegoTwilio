import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UsersList from './Userslist'; // Your existing component
import UserProfile from './UserProfile'; // Import the new component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UsersList />} />
          <Route path="/user/:email" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
