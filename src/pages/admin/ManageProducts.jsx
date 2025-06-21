import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { Eye, Edit, Trash2, Plus } from 'lucide-react';

const ManageProducts = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [viewingProduct, setViewingProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', image: '', description: '', price: '' });

  const handleAdd = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) return;
    addProduct({ ...newProduct, title: newProduct.name, category: 'Misc', description: newProduct.description || '', stock: 0 });
    setNewProduct({ name: '', image: '', description: '', price: '' });
    setShowAddForm(false);
  };

  const handleUpdate = () => {
    updateProduct(editingProduct);
    setEditingProduct(null);
  };

  const confirmDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Products</h2>
        <button onClick={() => setShowAddForm(!showAddForm)} className="flex items-center bg-primary-600 text-white px-4 py-2 rounded">
          <Plus className="mr-2" /> Add Product
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 bg-gray-100 p-4 rounded">
          <h3 className="font-semibold mb-2">Add New Product</h3>
          <div className="flex gap-2 flex-wrap">
            <input type="text" placeholder="Name" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} className="border px-2 py-1 rounded w-full" />
            <input type="text" placeholder="Image URL" value={newProduct.image} onChange={e => setNewProduct({ ...newProduct, image: e.target.value })} className="border px-2 py-1 rounded w-full" />
            <input type="text" placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} className="border px-2 py-1 rounded w-full" />
            <input type="number" placeholder="Price" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })} className="border px-2 py-1 rounded w-full" />
            <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2 rounded">Add</button>
          </div>
        </div>
      )}

      {/* Product Table */}
      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Sr. No.</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={p.id}>
              <td className="p-2 border">{i + 1}</td>
              <td className="p-2 border">{p.title}</td>
              <td className="p-2 border space-x-2">
                <button onClick={() => setViewingProduct(p)} className="text-blue-500"><Eye /></button>
                <button onClick={() => setEditingProduct({ ...p })} className="text-yellow-600"><Edit /></button>
                <button onClick={() => confirmDelete(p._id)} className="text-red-600"><Trash2 /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Modal */}
      {viewingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow w-96">
            <h3 className="text-lg font-bold mb-2">Product Details</h3>
            <img src={viewingProduct.image} alt={viewingProduct.title} className="w-full h-40 object-cover mb-2 rounded" />
            <p><strong>Name:</strong> {viewingProduct.title}</p>
            <p><strong>Price:</strong> ${viewingProduct.price}</p>
            <p><strong>Category:</strong> {viewingProduct.category}</p>
            <p><strong>Description:</strong> {viewingProduct.description}</p>
            <button onClick={() => setViewingProduct(null)} className="mt-4 bg-gray-700 text-white px-4 py-1 rounded">Close</button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow w-96">
            <h3 className="text-lg font-bold mb-2">Edit Product</h3>
            <img src={editingProduct.image} alt="Preview" className="w-full h-40 object-cover mb-3 rounded border" />
            <input type="text" value={editingProduct.title} onChange={e => setEditingProduct({ ...editingProduct, title: e.target.value })} className="border px-2 py-1 w-full mb-2 rounded" />
            <input type="text" value={editingProduct.image} onChange={e => setEditingProduct({ ...editingProduct, image: e.target.value })} className="border px-2 py-1 w-full mb-2 rounded" />
            <textarea value={editingProduct.description} onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })} className="border px-2 py-1 w-full mb-2 rounded" />
            <input type="number" value={editingProduct.price} onChange={e => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })} className="border px-2 py-1 w-full mb-2 rounded" />
            <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-1 rounded mr-2">Save</button>
            <button onClick={() => setEditingProduct(null)} className="bg-gray-600 text-white px-4 py-1 rounded">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
