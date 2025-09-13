"use client";

import { Bot, Check, ShoppingCart, User } from "lucide-react";
import { Card, CardContent } from "./shadcn/card";
import { Button } from "./shadcn/button";
import { Badge } from "./shadcn/badge";
import { ChatMessage as ChatMessageModel } from "@/models/chat-message";
import { MessageType } from "@/enums/message-type";

interface ChatMessageProps {
  message: ChatMessageModel;
  onConfirmAction: (actionId: string) => void;
  onApplyCart: (cartId: string) => void;
}

export default function ChatMessage({ message, onConfirmAction, onApplyCart }: ChatMessageProps) {
  const isUser = message.sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`max-w-xs lg:max-w-md ${isUser ? "order-2" : "order-1"} ${message.messageType === MessageType.SUGGESTION ? "w-full max-w-2xl" : "max-w-xs lg:max-w-md"}`}>
        <div className={`px-4 py-2 rounded-lg ${isUser ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"}`}>
          <div className="flex items-center space-x-2 mb-1">
            {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            <span className="text-xs opacity-75">{new Date(message.createdAt).toLocaleTimeString()}</span>
          </div>
          {message.messageType !== MessageType.SUGGESTION && <p className="text-sm">{message.content}</p>}
        </div>

        {message.messageType === MessageType.SUGGESTION && message.carts && (
          <div className="mt-3 space-y-3">
            {message.carts.map((cart, index: number) => (
              <Card key={cart.store.id} className={index === 0 ? "w-full border-green-500 border-2" : "w-full"}>
                <CardContent className="p-3">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div>
                          <h5 className="font-medium text-sm">{cart.store.name}</h5>
                        </div>
                      </div>
                      {index === 0 && <Badge className="bg-green-500">Melhor opção</Badge>}
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Relevância: {cart.score.toFixed(0)}%</span>
                      <span className="font-bold text-green-600">R$ {(cart.total / 100).toFixed(2)}</span>
                    </div>

                    <Button
                      size="sm"
                      className="w-full"
                      variant={index === 0 ? "default" : "outline"}
                      onClick={() => onApplyCart?.(cart.id)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Aplicar este carrinho
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        {message.chatMessageActions && message.chatMessageActions.length > 0 && (
          <div className="mt-3">
            <Button
              size="sm"
              disabled={Boolean(message.chatMessageActions[0].confirmedAt)}
              className="w-full bg-green-500 hover:bg-green-500 flex items-center justify-center"
              onClick={async () => {
                onConfirmAction(message.chatMessageActions![0].id!);
              }}
            >
              <Check />
              Confirmar ação
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}