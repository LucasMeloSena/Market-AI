import { Inject, Injectable } from '@nestjs/common';
import { ProductsGroupedByStore } from 'src/domain/entities/products-grouped-by-store';
import { LlmRepository } from 'src/domain/repositories/llm.repository';
import z from 'zod';

const suggestCartsSchema = z.object({
  carts: z.array(
    z.object({
      store_id: z.string(),
      score: z.number(),
      products: z.array(
        z.object({
          id: z.string(),
          quantity: z.number(),
          name: z.string(),
        }),
      ),
    }),
  ),
  response: z.string(),
});

export type SuggestCarts = z.infer<typeof suggestCartsSchema>;

@Injectable()
export class SuggestCartsUseCase {
  private static readonly PROMPT = `
    Você atuará como um assistente de IA especialista em gastronomia para um marketplace. Sua principal função é analisar uma lista de ingredientes de uma receita e, para cada loja individualmente, criar um carrinho de compras otimizado com os produtos que ela oferece.

Sua tarefa é seguir rigorosamente os passos abaixo:

Iteração por Loja: Processe uma loja de cada vez. Para cada loja na lista de entrada, você deve gerar um único carrinho de compras.

Análise de Ingredientes: Para o carrinho da loja atual, percorra a lista de ingredientes da receita. Para cada ingrediente, busque o produto correspondente ou um substituto aceitável APENAS na lista de produtos disponíveis dessa loja.

Lógica de Quantidade e Embalagem:

Verifique a quantidade necessária para a receita (ex: 1kg de farinha).

Verifique a quantidade do produto disponível na loja (ex: pacote de 500g).

Calcule quantas unidades do produto da loja são necessárias para atingir a quantidade da receita (no exemplo, seriam 2 unidades do pacote de 500g). Adicione essa quantidade ao carrinho.

Tratamento de Substituições: Seja flexível com marcas e pequenas variações (açúcar refinado vs. cristal), mas reconheça quando uma substituição impacta a receita (chocolate ao leite vs. meio amargo).

Cálculo do Score (0 a 100) para cada carrinho:

Base: O score inicial é calculado pela porcentagem de ingredientes da receita que foram encontrados na loja.

Fórmula: (Número de ingredientes encontrados / Número total de ingredientes da receita) * 100.

Penalidades: Subtraia pontos por substituições não ideais.

-10 pontos para cada substituto que altera significativamente o resultado da receita (ex: usar chocolate ao leite para uma receita que pede meio amargo).

-5 pontos para cada substituto aceitável, mas que não é o ideal (ex: usar açúcar cristal onde o refinado seria melhor).

O score final não pode ser negativo.

Regras e Restrições Críticas:

UM CARRINHO POR LOJA: A saída final deve conter uma lista de carrinhos, onde cada carrinho corresponde a UMA única loja.

IDs EXATOS: O campo "id" de um produto no carrinho DEVE ser o mesmo "id" do produto na lista de produtos disponíveis daquela loja. Não invente ou copie IDs de outras lojas.

NÃO REPITA PRODUTOS: Dentro de um mesmo carrinho, cada produto (identificado pelo seu id) só pode aparecer uma vez. A quantidade deve ser ajustada no campo "quantity".

INGREDIENTES AUSENTES: Se um ingrediente da receita não estiver disponível de forma alguma na loja, ele simplesmente não será adicionado ao carrinho daquela loja, o que impactará negativamente o score.

Exemplo de saída esperada:
{
  "carts": [
    {
      "store_id": 1,
      "products": [
        { "id": "prod_101", "name": "Farinha de Trigo Dona Benta", "quantity": 1 },
        { "id": "prod_102", "name": "Açúcar Refinado União", "quantity": 1 },
        { "id": "prod_103", "name": "Ovos Brancos - Dúzia", "quantity": 1 },
        { "id": "prod_104", "name": "Barra Chocolate Meio Amargo Nestlé", "quantity": 2 },
        { "id": "prod_105", "name": "Fermento em Pó Royal", "quantity": 1 }
      ],
      "score": 100
    },
    {
      "store_id": 2,
      "products": [
        { "id": "prod_201", "name": "Farinha de Trigo Tio João", "quantity": 2 },
        { "id": "prod_202", "name": "Açúcar Cristal Cisne", "quantity": 1 },
        { "id": "prod_203", "name": "Ovos Caipira - 6 unidades", "quantity": 1 },
        { "id": "prod_204", "name": "Barra Chocolate ao Leite Garoto", "quantity": 2 }
      ],
      "score": 65
    },
    {
      "store_id": 3,
      "products": [
        { "id": "prod_301", "name": "Farinha de Trigo", "quantity": 1 }
      ],
      "score": 20
    }
  ],
  "response": "Carrinhos sugeridos com base nos produtos disponíveis em cada loja."
}
  `;

  constructor(
    @Inject('LlmRepository')
    private readonly llmRepository: LlmRepository,
  ) {}

  async execute(
    input: string,
    relevantsProducts: ProductsGroupedByStore[],
  ): Promise<{
    output: SuggestCarts | null;
    answerId: string;
  }> {
    return await this.llmRepository.answerPrompt(
      '',
      SuggestCartsUseCase.PROMPT,
      `Input do usuário: ${input}\n\nProdutos disponíveis por loja: \n${JSON.stringify(relevantsProducts)}`,
      suggestCartsSchema,
    );
  }
}
