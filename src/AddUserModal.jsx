import React, { useState, useEffect } from 'react';

function AddUserModal({ isOpen, setUserModalOpen, onSubmit, initialData, isEditMode }) {
  const [userData, setUserData] = useState({
    username: '',
    age: '',
    weight: '',
    height: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData) {
      setUserData(initialData);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await onSubmit(userData);
      setUserModalOpen(false);
      setUserData({ username: '', age: '', weight: '', height: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>{isEditMode ? 'Edit User' : 'Add New User'}</h2>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={userData.username} onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" value={userData.age} onChange={handleChange} required />
        <input type="number" name="weight" placeholder="Weight" value={userData.weight} onChange={handleChange} required />
        <input type="number" name="height" placeholder="Height" value={userData.height} onChange={handleChange} required />
        <button type="submit" disabled={loading}>{isEditMode ? 'Update User' : 'Add User'}</button>
      </form>
      <button onClick={() => setUserModalOpen(false)}>Close</button>
    </div>
  );
}

export default AddUserModal;
