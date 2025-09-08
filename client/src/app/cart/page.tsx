"use client";

import { getCart } from "@/api/cart/get-cart";
import { removeProduct } from "@/api/cart/remove-product";
import { updateCartQuantity } from "@/api/cart/update-product-quantity";
import { Button } from "@/components/shadcn/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";

const userId = "3b05679a-f145-4594-ad38-9fbfc6dc571b"

export default function CartPage() {
  const queryClient = useQueryClient();

  const { data: cart, isLoading } = useQuery({
    queryKey: ["get-cart", userId],
    queryFn: () => getCart(userId),
  });

  const updateQuantityMutation = useMutation({
    mutationFn: ({ cartId, productId, quantity }: { cartId: string; productId: string; quantity: number }) =>
      updateCartQuantity(cartId, {userId, productId, quantity}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-cart", userId] });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: ({ cartId, productId }: { cartId: string; productId: string }) =>
      removeProduct(cartId, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-cart", userId] });
    },
  });

  const handleRemoveItem = (productId: string) => {
    if (!cart) return;
    removeItemMutation.mutate({ cartId: cart.id, productId });
  };

  const handleClickUpdateItem = (productId: string, quantity: number) => {
    if (!cart) return;
    updateQuantityMutation.mutate({ cartId: cart.id, productId, quantity });
  };

  if (isLoading || !cart || cart.items.length === 0) {
    return (
      <div className="p-6 pt-20 lg:pt-6">
        <div className="text-center py-12">
          <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Carrinho vazio</h3>
          <p className="mt-1 text-sm text-gray-500">
            Adicione produtos através da busca ou converse com o assistente
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 pt-20 lg:pt-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Meu Carrinho</h1>
        <p className="text-gray-600 mt-2">Revise seus itens antes de finalizar</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div>
                  <span>{cart.store.name}</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                          if (item.quantity > 1) {
                            handleClickUpdateItem(item.product.id, item.quantity - 1);
                          } else {
                            handleRemoveItem(item.product.id);
                          }
                        }}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                          handleClickUpdateItem(item.product.id, item.quantity + 1);
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-gray-900">R$ {((item.product.price / 100) * item.quantity).toFixed(2)}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.product.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">R$ {(cart.total/100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxa de entrega:</span>
                  <span className="font-medium">R$ 5,90</span>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <p>• {cart.items.length} itens no carrinho</p>
              </div>

              <Button className="w-full" size="lg">
                Finalizar Pedido
              </Button>

              <Button variant="outline" className="w-full">
                Continuar Comprando
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}