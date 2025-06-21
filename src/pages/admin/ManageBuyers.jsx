// ManageBuyers.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Edit, Trash2 } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

const ManageBuyers = () => {
  const [buyers, setBuyers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/users`);
        const buyerUsers = res.data.filter(user => user.role === 'buyer');
        setBuyers(buyerUsers);
      } catch (err) {
        console.error('Failed to load buyers:', err);
      }
    };
    fetchBuyers();
  }, []);

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_BASE}/api/users/${editingUser._id}`, editingUser);
      setBuyers(prev => prev.map(user => user._id === editingUser._id ? editingUser : user));
      setEditingUser(null);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`${API_BASE}/api/users/${id}`);
      setBuyers(prev => prev.filter(user => user._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Buyers</h2>
      <table className="w-full border text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Sr. No.</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {buyers.map((user, index) => (
            <tr key={user._id}>
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">
                <button onClick={() => setEditingUser(user)} className="text-yellow-500 mr-2"><Edit /></button>
                <button onClick={() => handleDelete(user._id)} className="text-red-600"><Trash2 /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h3 className="font-semibold mb-2">Edit Buyer</h3>
          <input type="text" value={editingUser.name} onChange={e => setEditingUser({ ...editingUser, name: e.target.value })} className="border p-1 w-full mb-2 rounded" />
          <input type="email" value={editingUser.email} onChange={e => setEditingUser({ ...editingUser, email: e.target.value })} className="border p-1 w-full mb-2 rounded" />
          <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-1 rounded mr-2">Update</button>
          <button onClick={() => setEditingUser(null)} className="bg-gray-600 text-white px-4 py-1 rounded">Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ManageBuyers;
