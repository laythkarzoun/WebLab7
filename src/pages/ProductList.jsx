import { useSearchParams } from 'react-router';
import { fetchProducts } from '../api/productsApi';
import { useFetch } from '../hooks/useFetch';
import ProductCard from '../components/ProductCard';

export default function ProductList() {
  const { loading, error, data: products } = useFetch(fetchProducts, []);
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';

  function updateFilter(key, value) {
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);
      if (value) next.set(key, value);
      else next.delete(key);
      return next;
    }, { replace: true });
  }

  const categories = products ? [...new Set(products.map((product) => product.category))].sort() : [];
  const filtered = products ? products.filter((product) =>
    product.title.toLowerCase().includes(q.trim().toLowerCase()) &&
    (!category || product.category === category)
  ) : [];

  return <section>
    <div className="page-heading"><div><span className="eyebrow">Our collection</span><h1>Products</h1></div><p>Search by name or choose a category.</p></div>
    <div className="filters">
      <label>Search products<input type="search" value={q} onChange={(event) => updateFilter('q', event.target.value)} placeholder="e.g. mascara" /></label>
      <label>Category<select value={category} onChange={(event) => updateFilter('category', event.target.value)}>
        <option value="">All categories</option>
        {categories.map((name) => <option value={name} key={name}>{name}</option>)}
      </select></label>
    </div>
    {loading && <p role="status">Loading products…</p>}
    {error && <p role="alert" className="error">Could not load products: {error}</p>}
    {!loading && !error && <><p className="result-count">{filtered.length} matching products</p>
      {filtered.length === 0 ? <p>No products match these filters. Try a different search.</p>
        : <div className="product-grid">{filtered.map((product) => <ProductCard product={product} key={product.id} />)}</div>}
    </>}
  </section>;
}
