import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/users`);
        const onlyAdmins = res.data.filter(user => user.role === 'admin');
        setAdmins(onlyAdmins);
      } catch (err) {
        console.error('Failed to fetch admins:', err);
      }
    };
    fetchAdmins();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Admins (Read-Only)</h2>
      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Sr. No.</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin, index) => (
            <tr key={admin._id}>
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{admin.name}</td>
              <td className="p-2 border">{admin.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageAdmins;
