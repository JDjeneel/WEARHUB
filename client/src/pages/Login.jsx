import { useState } from 'react';
import api, { errMsg } from '../api.js';

export default function Login({ onLogin }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await api.post(`/auth/${mode}`, form);
      onLogin(data);
    } catch (err) {
      setError(errMsg(err));
    }
  };

  return (
    <form className="panel narrow login-card" onSubmit={submit}>
      <p className="eyebrow">Welcome to WearHub</p>
      <h1>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1>
      <p className="login-intro">A lovely wardrobe starts here.</p>
      {mode === 'register' && <input placeholder="Name" value={form.name} onChange={set('name')} required />}
      <input type="email" placeholder="Email" value={form.email} onChange={set('email')} required />
      <input type="password" placeholder="Password (6+ characters)" value={form.password} onChange={set('password')} required />
      {error && <p className="error">{error}</p>}
      <button className="primary login-submit" type="submit">{mode === 'login' ? 'Log in' : 'Create account'}</button>
      <button type="button" className="link" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
        {mode === 'login' ? 'New here? Create an account' : 'Already registered? Log in'}
      </button>
    </form>
  );
}
