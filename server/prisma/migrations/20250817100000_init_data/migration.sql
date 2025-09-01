INSERT INTO public."Store" (id, name) VALUES
  ('1a701cdc-b617-495e-aae6-1c9f68a7cabb', 'Supermercado Central'),
  ('2a030b13-b9b8-4fb0-8d06-1ebd379acc07', 'Mercado Econômico'),
  ('c49a4a00-57b0-4f49-aa7c-ca8f1e7ca169', 'SuperShop Express');

INSERT INTO public."Product" (id, name, price, "storeId") VALUES
-- Loja 1
('6c41bdfd-1e9e-4bbf-a8f4-36f6b4de8b47', 'Feijão preto - 1kg', 799, '1a701cdc-b617-495e-aae6-1c9f68a7cabb'),
('d5a1796a-84dd-46a2-9474-b2032c8855f6', 'Arroz branco - 1kg', 599, '1a701cdc-b617-495e-aae6-1c9f68a7cabb'),
('e20cf005-dfb0-4b08-8cb5-02e7ab29e1e4', 'Farinha de mandioca - 500g', 425, '1a701cdc-b617-495e-aae6-1c9f68a7cabb'),
('73c07126-ecbe-4c4e-8a70-47207ac2b826', 'Linguiça calabresa - 500g', 1190, '1a701cdc-b617-495e-aae6-1c9f68a7cabb'),
('e7736d14-2c8f-4cf2-83c4-4e9c16af2453', 'Costelinha suína - 1kg', 1890, '1a701cdc-b617-495e-aae6-1c9f68a7cabb'),
('7bb5114d-f273-41a8-817f-bb5cb6d17029', 'Macarrão espaguete - 500g', 399, '1a701cdc-b617-495e-aae6-1c9f68a7cabb'),
('a9a07f6f-8dd7-41c0-96b5-85843210f4d4', 'Peito de frango - 1kg', 1290, '1a701cdc-b617-495e-aae6-1c9f68a7cabb'),
('f63e6d94-4ef5-44b0-8e87-f037f5b59ec4', 'Creme de leite - 200g', 299, '1a701cdc-b617-495e-aae6-1c9f68a7cabb'),
('d3064101-3d89-48d7-8cf2-35b09e793bf7', 'Queijo mussarela - 200g', 690, '1a701cdc-b617-495e-aae6-1c9f68a7cabb'),
('c3a9158f-9868-44bb-9c10-7ed6b67c5d61', 'Cenoura - 1kg', 449, '1a701cdc-b617-495e-aae6-1c9f68a7cabb'),
('13e37261-45fb-4c8b-9f4d-c3906400a915', 'Ovos - dúzia', 999, '1a701cdc-b617-495e-aae6-1c9f68a7cabb'),
('2786018f-bb46-4f41-80f0-8e1d4357ef18', 'Açúcar refinado - 1kg', 549, '1a701cdc-b617-495e-aae6-1c9f68a7cabb'),
('514cae4c-9a0b-41b7-a3c3-44f77b7b7c57', 'Chocolate em pó - 200g', 679, '1a701cdc-b617-495e-aae6-1c9f68a7cabb'),
('0ab74841-5808-4e4a-802d-54d0628f8e89', 'Fermento químico - 100g', 299, '1a701cdc-b617-495e-aae6-1c9f68a7cabb'),
('b91e367e-7f72-4b3e-94f5-580f3c7eddfc', 'Óleo de soja - 900ml', 649, '1a701cdc-b617-495e-aae6-1c9f68a7cabb'),

-- Loja 2
('29554c0c-6afc-4f02-9fd4-7b0a283ffb87', 'Feijão preto - 1kg', 749, '2a030b13-b9b8-4fb0-8d06-1ebd379acc07'),
('03c02db0-2146-43e7-80f9-67192ddbe105', 'Arroz branco - 1kg', 579, '2a030b13-b9b8-4fb0-8d06-1ebd379acc07'),
('4c949a0b-6a40-499f-84f8-17ac7a535e9f', 'Linguiça calabresa - 500g', 1090, '2a030b13-b9b8-4fb0-8d06-1ebd379acc07'),
('a28c5052-68c3-4074-bf06-f6c544fb1a1b', 'Costelinha suína - 1kg', 1790, '2a030b13-b9b8-4fb0-8d06-1ebd379acc07'),
('6ff179af-3f91-4c49-b23f-21db278c2d8f', 'Macarrão espaguete - 500g', 419, '2a030b13-b9b8-4fb0-8d06-1ebd379acc07'),
('e83f25a8-bcaf-4034-98e2-9a4d6580116d', 'Peito de frango - 1kg', 1240, '2a030b13-b9b8-4fb0-8d06-1ebd379acc07'),
('0b193d5b-f5cd-4899-80dc-c14c2c25f266', 'Creme de leite - 200g', 289, '2a030b13-b9b8-4fb0-8d06-1ebd379acc07'),
('eb7e2c28-207f-43a2-9320-d62c14212df1', 'Cenoura - 1kg', 429, '2a030b13-b9b8-4fb0-8d06-1ebd379acc07'),
('c91a1df9-b4c8-4a15-b0b0-fc987dfb256c', 'Ovos - dúzia', 959, '2a030b13-b9b8-4fb0-8d06-1ebd379acc07'),
('cfa2e5ae-cf3d-49ff-bf84-c5877a946a0d', 'Chocolate em pó - 200g', 659, '2a030b13-b9b8-4fb0-8d06-1ebd379acc07'),
('ed7db5a7-7f4e-4c26-83c6-15926895c586', 'Fermento químico - 100g', 289, '2a030b13-b9b8-4fb0-8d06-1ebd379acc07'),

-- Loja 3
('e3b5e1e0-bfd0-41c0-9489-0ab0f1a3f9e5', 'Farinha de mandioca - 500g', 399, 'c49a4a00-57b0-4f49-aa7c-ca8f1e7ca169'),
('72d9a3a7-94c1-4668-947c-30cd95a6c2c7', 'Linguiça calabresa - 500g', 1150, 'c49a4a00-57b0-4f49-aa7c-ca8f1e7ca169'),
('a6b0f066-c527-42d2-9f64-1f52c7d412b4', 'Peito de frango - 1kg', 1350, 'c49a4a00-57b0-4f49-aa7c-ca8f1e7ca169'),
('b9b10af8-79c8-4892-91a5-c5ff98d1c5c7', 'Creme de leite - 200g', 319, 'c49a4a00-57b0-4f49-aa7c-ca8f1e7ca169'),
('6f832421-9082-4f3d-bef3-c6f55d0eb4a9', 'Queijo mussarela - 200g', 729, 'c49a4a00-57b0-4f49-aa7c-ca8f1e7ca169'),
('5022446e-9e92-4d15-87d9-b52cd9a9a5ce', 'Cenoura - 1kg', 469, 'c49a4a00-57b0-4f49-aa7c-ca8f1e7ca169'),
('16b509a8-9f72-4d5a-82c6-70c54a34b3d6', 'Ovos - dúzia', 1020, 'c49a4a00-57b0-4f49-aa7c-ca8f1e7ca169'),
('d37a0a1d-0d44-42e2-b3f2-66a9d10e646f', 'Açúcar refinado - 1kg', 569, 'c49a4a00-57b0-4f49-aa7c-ca8f1e7ca169'),
('bd0c49a7-d63d-4a86-9f38-5c3140a5a828', 'Chocolate em pó - 200g', 699, 'c49a4a00-57b0-4f49-aa7c-ca8f1e7ca169'),
('4270f43c-03cb-4c9f-8921-1d4dc65a1a60', 'Fermento químico - 100g', 319, 'c49a4a00-57b0-4f49-aa7c-ca8f1e7ca169');
