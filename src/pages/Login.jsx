import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { login } from '../api/authApi';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { user, signIn } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;
  const destination = from ? `${from.pathname}${from.search || ''}${from.hash || ''}` : '/';

  if (user) return <Navigate to={destination} replace />;

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const signedInUser = await login(username, password);
      signIn(signedInUser);
      navigate(destination, { replace: true });
    } catch (failure) { setError(failure.message); }
    finally { setLoading(false); }
  }

  return <section className="login-page"><form onSubmit={handleSubmit} className="login-card">
    <span className="eyebrow">Welcome back</span><h1>Sign in</h1>
    <p>Use your student email and the demo password.</p>
    <label>Student email<input type="email" value={username} onChange={(event) => setUsername(event.target.value)} required autoComplete="username" /></label>
    <label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password" /></label>
    {error && <p role="alert" className="error">{error}</p>}
    <button className="primary" disabled={loading} type="submit">{loading ? 'Signing in…' : 'Login'}</button>
  </form></section>;
}
