import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api, { errMsg } from '../api.js';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    api
      .get(`/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((e) => setError(errMsg(e)))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="muted">Loading product...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!product) return <p className="muted">Product not found.</p>;

  return (
    <>
      <p className="back-link"><Link to="/">← Back to collection</Link></p>
      <article className="panel product-detail">
        <div className="detail-image">
          <img src={product.imageUrl} alt={product.name} />
          {product.stock === 0 && <span className="stock-badge">Out of stock</span>}
        </div>
        <div className="detail-copy">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="muted">Color: {product.color || '-'}</p>
          <p className="detail-price">Rs. {product.price.toLocaleString('en-IN')}</p>
          <div className="detail-sizes">
            <h2>Available sizes</h2>
            <div className="size-options">
              {product.sizes.length > 0
                ? product.sizes.map((size) => <span className="size-option" key={size}>{size}</span>)
                : <span className="muted">No sizes listed</span>}
            </div>
          </div>
          <p className={product.stock > 0 ? 'stock-status in-stock' : 'stock-status out-of-stock'}>
            <span aria-hidden="true" />{product.stock > 0 ? `In stock · ${product.stock} available` : 'Currently out of stock'}
          </p>
          <div className="detail-description">
            <h2>About this piece</h2>
            <p>{product.description || 'No description available.'}</p>
          </div>
        </div>
      </article>
    </>
  );
}
