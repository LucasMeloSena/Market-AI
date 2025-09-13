import { SuggestCarts } from '../../domain/usecases/llm/suggest-carts';

export function sanitizeSuggestedCarts(suggestedCarts: SuggestCarts) {
  const sanitizedCarts = suggestedCarts.carts.map((cart) => {
    const productMap = new Map<
      string,
      { id?: string; quantity?: number; name?: string }
    >();

    for (const product of cart.products) {
      if (productMap.has(product.id)) {
        const existingProduct = productMap.get(product.id);
        existingProduct.quantity += product.quantity;
      } else {
        productMap.set(product.id, { ...product });
      }
    }

    const uniqueProducts = Array.from(productMap.values());

    return { ...cart, products: uniqueProducts };
  });

  return { ...suggestedCarts, carts: sanitizedCarts };
}
