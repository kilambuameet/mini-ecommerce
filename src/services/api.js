const BASE_URL = "https://fakestoreapi.com";

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
      throw new Error("Failed to fetch prodcuts");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProductCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products/categories`);
    if (!response.ok) {
      throw new Error("Failed to fetch product categories");
    }
    return await response.json();
  } catch (error) {
    console, error("Error fetching product categories:", error);
    throw error;
  }
};
