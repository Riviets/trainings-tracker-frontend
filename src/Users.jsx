import React, { useState, useEffect } from 'react'
import { fetchUsers, addUser, getUserInfoById } from './services/userService'
import AddUserModal from './AddUserModal';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({ username: '', age: '', weight: '', height: '' });
  const [selectedUser, setSelectedUser] = useState(null);
  const [userModalVisible, setUserModalVisible] = useState(false)

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdUser = await addUser(newUser);
      setUsers([...users, createdUser]);
      setNewUser({ username: '', age: '', weight: '', height: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddUser = async () => {
    try{
      setUserModalVisible(true)
    }
    catch(err){
      setError(err.message)
    }
  }

  const handleViewUserInfo = async (userId) => {
    try {
      const userInfo = await getUserInfoById(userId);
      setSelectedUser(userInfo);
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
            <button onClick={() => handleViewUserInfo(user.id)}>{user.username}, {user.age} </button>
          </li>
        ))}
      </ul>

        <button onClick={handleAddUser}>Add user</button>

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

      {userModalVisible && <AddUserModal/>}
    </div>
  );
}

export default UsersList;
