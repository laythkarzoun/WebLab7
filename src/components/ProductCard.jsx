import { Link } from 'react-router';
import { useCartStore } from '../store/cartStore';

export default function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);
  return <article className="product-card">
    <Link to={`/products/${product.id}`} className="product-image"><img src={product.thumbnail} alt={product.title} loading="lazy" /></Link>
    <div className="product-content">
      <span className="category">{product.category}</span>
      <h3><Link to={`/products/${product.id}`}>{product.title}</Link></h3>
      <div className="price-row"><strong>${product.price.toFixed(2)}</strong><button onClick={() => addItem(product)}>Add to cart</button></div>
    </div>
  </article>;
}
