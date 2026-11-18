import { useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { fetchProduct } from '../api/productsApi';
import { useFetch } from '../hooks/useFetch';
import { useCartStore } from '../store/cartStore';

export default function ProductDetail() {
  const { id } = useParams(); // Route parameters are strings.
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const fetcher = useCallback((signal) => fetchProduct(id, signal), [id]);
  const { loading, error, data: product } = useFetch(fetcher, [id]);

  return <section>
    <button className="back" onClick={() => navigate('/products')}>← Back to products</button>
    {loading && <p role="status">Loading product…</p>}
    {error && <div role="alert" className="error"><h2>{error === 'Product not found' ? 'Product not found' : 'Unable to load product'}</h2><p>{error}</p><Link to="/products">Browse all products</Link></div>}
    {!loading && !error && product && <div className="detail">
      <div className="detail-image"><img src={product.thumbnail} alt={product.title} /></div>
      <div><span className="eyebrow">{product.category}</span><h1>{product.title}</h1>
        <p>{product.description}</p><p className="detail-price">${product.price.toFixed(2)}</p>
        <button className="primary" onClick={() => addItem(product)}>Add to cart</button>
      </div>
    </div>}
  </section>;
}
