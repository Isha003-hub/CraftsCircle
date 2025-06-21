// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Edit, Trash2 } from 'lucide-react';

// const ManageUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [editingUser, setEditingUser] = useState(null);

//   const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/api/users`);
//       setUsers(res.data);
//     } catch (err) {
//       console.error('Failed to fetch users:', err);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleUpdate = async () => {
//     try {
//       await axios.put(`${API_BASE}/api/users/${editingUser._id}`, editingUser);
//       setEditingUser(null);
//       fetchUsers();
//     } catch (err) {
//       console.error('Failed to update user:', err);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       try {
//         await axios.delete(`${API_BASE}/api/users/${id}`);
//         fetchUsers();
//       } catch (err) {
//         console.error('Failed to delete user:', err);
//       }
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
//       <table className="w-full border text-left">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-2 border">Name</th>
//             <th className="p-2 border">Email</th>
//             <th className="p-2 border">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user._id}>
//               <td className="p-2 border">{user.name}</td>
//               <td className="p-2 border">{user.email}</td>
//               <td className="p-2 border space-x-2">
//                 <button onClick={() => setEditingUser(user)} className="text-yellow-600"><Edit size={18} /></button>
//                 <button onClick={() => handleDelete(user._id)} className="text-red-600"><Trash2 size={18} /></button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Edit Modal */}
//       {editingUser && (
//         <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
//           <div className="bg-white p-4 rounded shadow w-96">
//             <h3 className="text-lg font-bold mb-2">Edit User</h3>
//             <input
//               type="text"
//               value={editingUser.name}
//               onChange={e => setEditingUser({ ...editingUser, name: e.target.value })}
//               className="border px-2 py-1 w-full mb-2 rounded"
//               placeholder="Name"
//             />
//             <input
//               type="email"
//               value={editingUser.email}
//               onChange={e => setEditingUser({ ...editingUser, email: e.target.value })}
//               className="border px-2 py-1 w-full mb-2 rounded"
//               placeholder="Email"
//             />
//             <select
//               value={editingUser.role}
//               onChange={e => setEditingUser({ ...editingUser, role: e.target.value })}
//               className="border px-2 py-1 w-full mb-2 rounded"
//             >
//               <option value="buyer">Buyer</option>
//               <option value="admin">Admin</option>
//             </select>
//             <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-1 rounded mr-2">Save</button>
//             <button onClick={() => setEditingUser(null)} className="bg-gray-600 text-white px-4 py-1 rounded">Cancel</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageUsers;
