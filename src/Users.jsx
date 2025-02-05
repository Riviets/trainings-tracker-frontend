import React, { useState, useEffect } from 'react';
import { fetchUsers, addUser, getUserInfoById, updateUser, deleteUser } from './services/userService';
import AddUserModal from './AddUserModal';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewUserInfo = async (userId) => {
    try {
      const userInfo = await getUserInfoById(userId);
      setSelectedUser(userInfo);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditUser = async (user) => {
    setEditingUser(user);
    setIsEditMode(true);
    setUserModalOpen(true);
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setIsEditMode(false);
    setUserModalOpen(true);
  };

  const handleUserSubmit = async (userData) => {
    try {
      if (isEditMode) {
        const updatedUser = await updateUser(editingUser.id, userData);
        setUsers(users.map(user => (user.id === editingUser.id ? updatedUser : user)));
      } else {
        const newUser = await addUser(userData);
        setUsers([...users, newUser]);
      }
      setUserModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <button onClick={() => handleViewUserInfo(user.id)}>{user.username}, {user.age}</button>
            <button onClick={() => handleEditUser(user)}>Edit</button>
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddUser}>Add User</button>

      {isUserModalOpen && (
        <AddUserModal
          isOpen={isUserModalOpen}
          setUserModalOpen={setUserModalOpen}
          onSubmit={handleUserSubmit}
          initialData={editingUser}
          isEditMode={isEditMode}
        />
      )}

      {selectedUser && (
        <div>
          <h2>User Info</h2>
          <p><strong>Username:</strong> {selectedUser.username}</p>
          <p><strong>Age:</strong> {selectedUser.age}</p>
          <p><strong>Weight:</strong> {selectedUser.weight}</p>
          <p><strong>Height:</strong> {selectedUser.height}</p>
          <button onClick={() => setSelectedUser(null)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default UsersList;
