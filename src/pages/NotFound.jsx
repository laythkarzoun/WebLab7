import { Link } from 'react-router';
export default function NotFound() { return <section className="empty-state"><span className="eyebrow">404 error</span><h1>Page not found</h1><p>The page you requested does not exist.</p><Link className="button" to="/">Back to home</Link></section>; }
