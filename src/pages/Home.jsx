import { Link } from 'react-router';
export default function Home() {
  return <section className="hero"><span className="eyebrow">Welcome to Mini Shop</span>
    <h1>Find something you love.</h1>
    <p>Explore products, filter by category, and keep your favourites in a persistent cart.</p>
    <Link className="button" to="/products">Browse products</Link>
  </section>;
}
