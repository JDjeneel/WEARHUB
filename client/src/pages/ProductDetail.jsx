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
      <p><Link to="/">Back to catalog</Link></p>
      <article className="panel product-detail">
        <img src={product.imageUrl} alt={product.name} />
        <div>
          <h1>{product.name}</h1>
          <p className="muted">{product.category} - {product.color || '-'}</p>
          <p className="price">Rs. {product.price.toLocaleString('en-IN')}</p>
          <p><strong>Sizes:</strong> {product.sizes.join(', ') || '-'}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <h2>Description</h2>
          <p>{product.description || 'No description available.'}</p>
        </div>
      </article>
    </>
  );
}
