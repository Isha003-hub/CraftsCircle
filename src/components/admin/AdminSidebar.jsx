import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const { pathname } = useLocation();
  const isActive = pathname === '/admin/products';

  return (
    <aside className="w-64 bg-white shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">Admin</h2>
      <ul className="space-y-2">
        <li>
          <Link
            to="/admin/products"
            className={`block px-4 py-2 rounded hover:bg-blue-100 ${
              isActive ? 'bg-blue-200 font-semibold' : ''
            }`}
          >
            Manage Products
          </Link>
        </li>

        <li>
          <Link
            to="/admin/buyers"
            className={`block px-4 py-2 rounded hover:bg-blue-100 ${
              isActive ? 'bg-blue-200 font-semibold' : ''
            }`}
          >
            Manage Buyers
          </Link>
        </li>

        <li>
          <Link
            to="/admin/admins"
            className={`block px-4 py-2 rounded hover:bg-blue-100 ${
              isActive ? 'bg-blue-200 font-semibold' : ''
            }`}
          >
            Manage Admins
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;
