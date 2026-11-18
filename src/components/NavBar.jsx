import { NavLink } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useCartStore } from '../store/cartStore';

export default function NavBar({ theme, onToggleTheme }) {
  const { user, signOut } = useAuth();
  const count = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));
  return <header className="header"><nav className="container nav" aria-label="Main navigation">
    <NavLink to="/" end className="brand">Mini Shop</NavLink>
    <div className="nav-links">
      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/cart">Cart ({count})</NavLink>
      {user ? <><span className="username" title={user.username}>{user.username}</span><button onClick={signOut}>Logout</button></> : <NavLink to="/login">Login</NavLink>}
      <button onClick={onToggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
        {theme === 'light' ? 'Dark mode' : 'Light mode'}
      </button>
    </div>
  </nav></header>;
}
