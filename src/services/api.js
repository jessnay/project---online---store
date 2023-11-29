export async function getCategories() {
  const API_URL = 'https://api.mercadolibre.com/sites/MLB/categories';
  const request = await fetch(API_URL);
  const response = request.json();
  return response;
}

export async function getProductFromId(productId) {
  const API_URL = `https://api.mercadolibre.com/items/${productId}`;
  const request = await fetch(API_URL);
  const response = request.json();
  return response;
}

export async function getProductsFromQuery(query) {
  const API_URL = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const request = await fetch(API_URL);
  const response = request.json();
  return response;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const API_URL = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const request = await fetch(API_URL);
  const response = request.json();
  return response;
}
