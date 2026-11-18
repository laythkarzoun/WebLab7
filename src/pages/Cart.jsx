import { Link } from 'react-router';
import { useCartStore } from '../store/cartStore';

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const clear = useCartStore((state) => state.clear);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return <section><div className="page-heading"><div><span className="eyebrow">Your selection</span><h1>Shopping cart</h1></div></div>
    {items.length === 0 ? <div className="empty-state"><h2>Your cart is empty</h2><p>Discover products and add something you like.</p><Link className="button" to="/products">Browse products</Link></div> : <>
      <div className="cart-list">{items.map((item) => <div className="cart-row" key={item.id}>
        <div><Link to={`/products/${item.id}`}><strong>{item.title}</strong></Link><p>${item.price.toFixed(2)} each</p></div>
        <div className="quantity"><button aria-label={`Decrease ${item.title}`} onClick={() => setQuantity(item.id, item.quantity - 1)}>−</button><span>{item.quantity}</span><button aria-label={`Increase ${item.title}`} onClick={() => setQuantity(item.id, item.quantity + 1)}>+</button></div>
        <strong>${(item.price * item.quantity).toFixed(2)}</strong>
        <button onClick={() => removeItem(item.id)}>Remove</button>
      </div>)}</div>
      <div className="cart-summary"><h2>Total: ${total.toFixed(2)}</h2><button onClick={clear}>Clear cart</button></div>
    </>}
  </section>;
}
