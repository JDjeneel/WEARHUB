import { useState } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import Catalog from './pages/Catalog.jsx';
import Login from './pages/Login.jsx';
import Admin from './pages/Admin.jsx';

export default function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'));
  const navigate = useNavigate();

  const onLogin = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    navigate(data.user.role === 'admin' ? '/admin' : '/');
  };
  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate('/');
  };

  return (
    <>
      <header className="nav">
        <Link to="/" className="brand">WearHub</Link>
        <nav>
          {user?.role === 'admin' && <Link to="/admin">Manage products</Link>}
          {user ? (
            <button className="link" onClick={logout}>Log out ({user.name})</button>
          ) : (
            <Link to="/login">Log in</Link>
          )}
        </nav>
      </header>
      <main className="wrap">
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/login" element={<Login onLogin={onLogin} />} />
          <Route path="/admin" element={user?.role === 'admin' ? <Admin /> : <Navigate to="/login" />} />
        </Routes>
      </main>
    </>
  );
}
