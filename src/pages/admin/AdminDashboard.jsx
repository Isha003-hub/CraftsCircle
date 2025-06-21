import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import ProductManagement from './ManageProducts';
// import UserManagement from './ManageUsers';
import BuyerManagement from './ManageBuyers';
import AdminManagement from './ManageAdmins';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => (
  <div className="flex min-h-screen">
    <AdminSidebar />
    <div className="flex-1 p-8 bg-gray-50">
      <Outlet />
    </div>
  </div>
);

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route
          index
          element={
            <>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Welcome, {user?.name || 'Admin'}!
              </h1>
              <p className="text-gray-600">Use the sidebar to manage products and users.</p>
            </>
          }
        />
        <Route path="products" element={<ProductManagement />} />
        {/* <Route path="users" element={<UserManagement />} /> */}
        <Route path="buyers" element={<BuyerManagement />} />
        <Route path="admins" element={<AdminManagement />} />
      </Route>
    </Routes>
  );
};

export default AdminDashboard;
