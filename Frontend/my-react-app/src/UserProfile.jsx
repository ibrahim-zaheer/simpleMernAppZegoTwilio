import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ZegoCall from './ZegoCall'; // Import the ZegoCall component
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import CallInvitationComponent from './CallInvitationComponent';
const UserProfile = () => {
  const { email } = useParams(); // Get email from URL parameters
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]); // To fetch all users
  const zeroCloudInstance = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user/${email}`);
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);

          // Log in the user to Zego
          initializeZego(userData._id, userData.name);
        } else {
          console.error('User not found');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [email]);

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

  const initializeZego = (userId, userName) => {
    const appID = 1423329821;
    const serverSecret = "321b87cbaeaabbc39837cc015aed0cf4";

    const KitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      null,
      userId,
      userName
    );

    zeroCloudInstance.current = ZegoUIKitPrebuilt.create(KitToken);

    // You don't need to call login explicitly. The instance should be ready to use.
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  // Filter out the current user from the list
  const otherUsers = users.filter(u => u.email !== user.email);

  return (
    <div>
      <h1>User Profile</h1>
      <p><strong>ID:</strong> {user._id}</p>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <h2>Call Other Users</h2>
      {otherUsers.map(otherUser => (
        <div key={otherUser._id}>
          <p><strong>{otherUser.name}</strong> - {otherUser.email}</p>
          <ZegoCall userId={user._id} userName={user.name} calleeId={otherUser._id} />
        </div>
      ))}
      <h3>Using ZegoCall Component</h3>
      <CallInvitationComponent userId={user._id} userName={"user_" + user._id} />
    </div>
  );
};

export default UserProfile;
