import { useEffect, useState } from 'react';
import api, { errMsg } from '../api.js';

const empty = { name: '', category: 'Saree', price: '', sizes: '', color: '', imageUrl: '', stock: '', description: '' };

export default function Admin() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const load = () =>
    api.get('/products', { params: { limit: 50 } }).then((r) => setItems(r.data.items)).catch((e) => setError(errMsg(e)));

  useEffect(() => {
    api.get('/products/categories').then((r) => setCategories(r.data));
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError(''); setNotice('');
    const body = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock || 0),
      sizes: form.sizes.split(',').map((s) => s.trim()).filter(Boolean),
    };
    try {
      if (editId) await api.put(`/products/${editId}`, body);
      else await api.post('/products', body);
      setNotice(editId ? 'Product updated' : 'Product added');
      setForm(empty); setEditId(null);
      load();
    } catch (err) { setError(errMsg(err)); }
  };

  const edit = (p) => {
    setEditId(p._id);
    setForm({ ...p, sizes: p.sizes.join(', '), price: String(p.price), stock: String(p.stock) });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const remove = async (p) => {
    if (!window.confirm(`Delete "${p.name}"? This cannot be undone.`)) return;
    try { await api.delete(`/products/${p._id}`); load(); } catch (err) { setError(errMsg(err)); }
  };

  return (
    <>
      <h1>Manage products</h1>
      <form className="panel" onSubmit={submit}>
        <h2>{editId ? 'Edit product' : 'Add product'}</h2>
        <div className="row">
          <input placeholder="Name" value={form.name} onChange={set('name')} required />
          <select value={form.category} onChange={set('category')}>
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="row">
          <input type="number" min="0" placeholder="Price (Rs.)" value={form.price} onChange={set('price')} required />
          <input type="number" min="0" placeholder="Stock" value={form.stock} onChange={set('stock')} />
        </div>
        <div className="row">
          <input placeholder="Sizes (comma separated)" value={form.sizes} onChange={set('sizes')} />
          <input placeholder="Color" value={form.color} onChange={set('color')} />
        </div>
        <input placeholder="Image URL" value={form.imageUrl} onChange={set('imageUrl')} />
        <textarea placeholder="Description" rows="2" value={form.description} onChange={set('description')} />
        {error && <p className="error">{error}</p>}
        {notice && <p className="ok">{notice}</p>}
        <div className="row">
          <button className="primary" type="submit">{editId ? 'Save changes' : 'Add product'}</button>
          {editId && <button type="button" onClick={() => { setEditId(null); setForm(empty); }}>Cancel</button>}
        </div>
      </form>

      <table className="table">
        <thead><tr><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th></th></tr></thead>
        <tbody>
          {items.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td><td>{p.category}</td><td>Rs. {p.price}</td><td>{p.stock}</td>
              <td className="actions">
                <button onClick={() => edit(p)}>Edit</button>
                <button className="danger" onClick={() => remove(p)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
