import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { errMsg } from '../api.js';

export default function Catalog() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ items: [], pages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/products/categories').then((r) => setCategories(['All', ...r.data])).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    setError('');
    const t = setTimeout(() => {
      api
        .get('/products', { params: { category, search, page } })
        .then((r) => setData(r.data))
        .catch((e) => setError(errMsg(e)))
        .finally(() => setLoading(false));
    }, 250);
    return () => clearTimeout(t);
  }, [category, search, page]);

  const pick = (c) => { setCategory(c); setPage(1); };

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">A little something, just for you</p>
          <h1>Dress the way<br />you feel.</h1>
          <p>Considered pieces for everyday moments and everything worth celebrating.</p>
          <button
            className="primary hero-button"
            onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Shop the collection
          </button>
        </div>
        <div className="hero-art" aria-hidden="true">
          <span className="hero-orbit hero-orbit-one" />
          <span className="hero-orbit hero-orbit-two" />
          <span className="hero-mark">W</span>
        </div>
      </section>

      <section id="collection" className="collection">
        <div className="collection-heading">
          <div>
            <p className="eyebrow">Find your favorite</p>
            <h2>Clothing & accessories</h2>
          </div>
          <input
            className="search"
            placeholder="Search by product name"
            aria-label="Search by product name"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <div className="chips">
          {categories.map((c) => (
            <button key={c} className={c === category ? 'chip on' : 'chip'} onClick={() => pick(c)}>{c}</button>
          ))}
        </div>

      {error && <p className="error">{error}</p>}
      {loading && <p className="muted">Loading products...</p>}
      {!loading && !error && data.items.length === 0 && <p className="muted">No products match this search.</p>}

      <div className="grid">
        {data.items.map((p) => (
          <article key={p._id} className="card">
            <Link to={`/product/${p._id}`} className="product-card-link">
              <div className="product-image">
                <img src={p.imageUrl} alt={p.name} />
                {p.stock === 0 && <span className="stock-badge">Out of stock</span>}
              </div>
              <div className="info">
                <h3>{p.name}</h3>
                <p className="muted">{p.category} - {p.color}</p>
                <p className="price">Rs. {p.price.toLocaleString('en-IN')}</p>
                <p className="muted small">Sizes: {p.sizes.join(', ') || '-'}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {data.pages > 1 && (
        <div className="pager">
          <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
          <span>Page {page} of {data.pages}</span>
          <button disabled={page >= data.pages} onClick={() => setPage(page + 1)}>Next</button>
        </div>
      )}
      </section>
    </>
  );
}
