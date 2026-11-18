const BASE_URL = 'https://dummyjson.com/products';

async function request(url, signal) {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(response.status === 404 ? 'Product not found' : `Request failed (${response.status})`);
  }
  return response.json();
}

export async function fetchProducts(signal) {
  const result = await request(`${BASE_URL}?limit=100`, signal);
  return result.products;
}

export function fetchProduct(id, signal) {
  return request(`${BASE_URL}/${encodeURIComponent(id)}`, signal);
}
