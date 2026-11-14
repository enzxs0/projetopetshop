CREATE DATABASE IF NOT EXISTS petamigo
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE petamigo;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nome VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL,
  senha_hash VARCHAR(255) NOT NULL,
  cpf VARCHAR(14) NULL,
  telefone VARCHAR(25) NULL,
  tipo ENUM('admin', 'cliente') NOT NULL DEFAULT 'cliente',
  ativo TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_usuarios_email (email),
  UNIQUE KEY uq_usuarios_cpf (cpf)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS sessoes (
  id CHAR(64) NOT NULL,
  usuario_id INT UNSIGNED NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_sessoes_usuario (usuario_id),
  KEY idx_sessoes_expiracao (expires_at),
  CONSTRAINT fk_sessoes_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS produtos (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nome VARCHAR(180) NOT NULL,
  categoria VARCHAR(60) NULL,
  especie VARCHAR(20) NOT NULL DEFAULT 'ambos',
  marca VARCHAR(100) NULL,
  preco DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  estoque INT UNSIGNED NOT NULL DEFAULT 0,
  descricao TEXT NULL,
  imagem VARCHAR(500) NULL,
  ativo TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_produtos_ativo (ativo),
  KEY idx_produtos_categoria (categoria)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS servicos (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nome VARCHAR(150) NOT NULL,
  descricao TEXT NULL,
  duracao_minutos SMALLINT UNSIGNED NOT NULL,
  categoria VARCHAR(60) NULL,
  preco_pequeno DECIMAL(10,2) NULL,
  preco_medio DECIMAL(10,2) NULL,
  preco_grande DECIMAL(10,2) NULL,
  preco_unico DECIMAL(10,2) NULL,
  ativo TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_servicos_ativo (ativo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS pets_adocao (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  especie VARCHAR(30) NOT NULL,
  raca VARCHAR(100) NULL,
  idade VARCHAR(60) NULL,
  sexo VARCHAR(30) NULL,
  porte VARCHAR(30) NULL,
  descricao TEXT NULL,
  imagem VARCHAR(500) NULL,
  status ENUM('disponivel', 'adotado') NOT NULL DEFAULT 'disponivel',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_pets_adocao_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS blog_posts (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(200) NOT NULL,
  resumo VARCHAR(500) NULL,
  conteudo MEDIUMTEXT NOT NULL,
  autor VARCHAR(120) NOT NULL DEFAULT 'Equipe PetAmigo',
  categoria VARCHAR(80) NULL,
  imagem VARCHAR(500) NULL,
  publicado TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_blog_publicado_data (publicado, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS agendamentos (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  usuario_id INT UNSIGNED NOT NULL,
  servico_id INT UNSIGNED NOT NULL,
  data_hora DATETIME NOT NULL,
  nome_cliente VARCHAR(120) NOT NULL,
  telefone_cliente VARCHAR(25) NULL,
  nome_pet VARCHAR(100) NOT NULL,
  observacoes TEXT NULL,
  status ENUM('pendente', 'confirmado', 'concluido', 'cancelado') NOT NULL DEFAULT 'pendente',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_agendamentos_horario_servico (data_hora, servico_id, status),
  KEY idx_agendamentos_usuario (usuario_id),
  CONSTRAINT fk_agendamentos_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
    ON DELETE RESTRICT,
  CONSTRAINT fk_agendamentos_servico
    FOREIGN KEY (servico_id) REFERENCES servicos (id)
    ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS pedidos (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  usuario_id INT UNSIGNED NOT NULL,
  status ENUM('pendente', 'pago', 'enviado', 'entregue', 'cancelado') NOT NULL DEFAULT 'pendente',
  total DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  endereco_entrega VARCHAR(600) NOT NULL,
  cep CHAR(8) NOT NULL,
  numero VARCHAR(30) NOT NULL,
  complemento VARCHAR(120) NULL,
  bairro VARCHAR(120) NOT NULL,
  cidade VARCHAR(120) NOT NULL,
  estado CHAR(2) NOT NULL,
  forma_pagamento VARCHAR(40) NOT NULL DEFAULT 'pix',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_pedidos_usuario_data (usuario_id, created_at),
  KEY idx_pedidos_status (status),
  CONSTRAINT fk_pedidos_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
    ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS pedidos_itens (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  pedido_id INT UNSIGNED NOT NULL,
  produto_id INT UNSIGNED NOT NULL,
  quantidade INT UNSIGNED NOT NULL,
  preco_unitario DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (id),
  KEY idx_pedidos_itens_pedido (pedido_id),
  KEY idx_pedidos_itens_produto (produto_id),
  CONSTRAINT fk_pedidos_itens_pedido
    FOREIGN KEY (pedido_id) REFERENCES pedidos (id)
    ON DELETE CASCADE,
  CONSTRAINT fk_pedidos_itens_produto
    FOREIGN KEY (produto_id) REFERENCES produtos (id)
    ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO usuarios (id, nome, email, senha_hash, cpf, telefone, tipo) VALUES
  (1, 'Administrador', 'admin@petamigo.com',
   '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi',
   NULL, NULL, 'admin'),
  (2, 'Cliente Demo', 'cliente@petamigo.com',
   '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi',
   NULL, NULL, 'cliente');

INSERT IGNORE INTO produtos
  (id, nome, categoria, especie, marca, preco, estoque, descricao, imagem) VALUES
  (1, 'Ração Premium Cães Adultos 15kg', 'racao', 'cao', 'Royal Canin', 189.90, 25, 'Ração super premium para cães adultos de porte médio.', 'https://placehold.co/400x300/d4c5a9/2d3a2e?text=Racao+Premium'),
  (2, 'Ração Gatos Castrados 10kg', 'racao', 'gato', 'Whiskas', 129.90, 18, 'Ração específica para gatos castrados.', 'https://placehold.co/400x300/a8c5ab/2d3a2e?text=Racao+Gatos'),
  (3, 'Coleira Antipulgas', 'acessorio', 'cao', 'Scalibor', 79.90, 40, 'Coleira protetora contra pulgas e carrapatos.', 'https://placehold.co/400x300/c97b5a/fff?text=Coleira'),
  (4, 'Shampoo Pet Neutro 500ml', 'higiene', 'ambos', 'Pet Clean', 24.90, 60, 'Shampoo suave para banho frequente.', 'https://placehold.co/400x300/7a9e7e/fff?text=Shampoo'),
  (5, 'Brinquedo Mordedor Resistente', 'brinquedo', 'cao', 'Kong', 49.90, 35, 'Brinquedo de borracha natural ultra resistente.', 'https://placehold.co/400x300/d4c5a9/2d3a2e?text=Brinquedo'),
  (6, 'Areia Higiênica Gatos 4kg', 'higiene', 'gato', 'Chococat', 34.90, 50, 'Areia sanitária com controle de odor.', 'https://placehold.co/400x300/a8c5ab/2d3a2e?text=Areia'),
  (7, 'Cama Pet Confort P', 'acessorio', 'ambos', 'PetLove', 89.90, 15, 'Cama macia e confortável tamanho P.', 'https://placehold.co/400x300/c97b5a/fff?text=Cama+Pet'),
  (8, 'Petisco Natural Frango 200g', 'petisco', 'cao', 'Natural Pet', 19.90, 100, 'Petisco 100% natural de frango desidratado.', 'https://placehold.co/400x300/7a9e7e/fff?text=Petisco');

INSERT IGNORE INTO servicos
  (id, nome, descricao, duracao_minutos, categoria, preco_pequeno, preco_medio, preco_grande, preco_unico) VALUES
  (1, 'Banho', 'Banho completo com shampoo específico', 60, 'estetica', 50.00, 70.00, 90.00, NULL),
  (2, 'Tosa', 'Tosa higiênica ou completa', 90, 'estetica', 60.00, 85.00, 110.00, NULL),
  (3, 'Banho e Tosa', 'Combo completo de banho e tosa', 120, 'estetica', 90.00, 130.00, 170.00, NULL),
  (4, 'Consulta Veterinária', 'Consulta clínica geral', 30, 'veterinario', NULL, NULL, NULL, 150.00),
  (5, 'Vacinação', 'Aplicação de vacinas', 20, 'veterinario', NULL, NULL, NULL, 80.00),
  (6, 'Hotelzinho', 'Hospedagem diária com cuidados', 1440, 'hospedagem', 80.00, 100.00, 130.00, NULL),
  (7, 'Adestramento', 'Sessão individual de adestramento', 60, 'adestramento', NULL, NULL, NULL, 120.00);

INSERT IGNORE INTO pets_adocao
  (id, nome, especie, raca, idade, sexo, porte, descricao, imagem, status) VALUES
  (1, 'Thor', 'cao', 'SRD', '2 anos', 'Macho', 'Grande', 'Thor é um cão muito brincalhão e carinhoso.', 'images/fagundes.jpg', 'disponivel'),
  (2, 'Luna', 'gato', 'SRD', '1 ano', 'Fêmea', 'Pequeno', 'Luna é uma gatinha dócil e muito elegante.', 'images/cuzinhp.jpg', 'disponivel'),
  (3, 'Max', 'cao', 'Labrador', '3 anos', 'Macho', 'Grande', 'Max é um labrador muito obediente e ama nadar.', 'images/roges.jpg', 'disponivel'),
  (4, 'Mimi', 'gato', 'Persa', '4 anos', 'Fêmea', 'Pequeno', 'Mimi é uma persa muito calma e carinhosa.', 'images/demonio.jpg', 'disponivel'),
  (5, 'Bob', 'cao', 'Beagle', '5 meses', 'Macho', 'Médio', 'Bob é um filhote muito alegre e curioso.', 'images/cachorrofei.jpg', 'disponivel');

INSERT IGNORE INTO blog_posts
  (id, titulo, resumo, conteudo, autor, categoria, imagem, publicado, created_at) VALUES
  (1, 'Como cuidar do seu filhote', 'Dicas essenciais para os primeiros meses do seu pet.', 'Os primeiros meses são fundamentais para o desenvolvimento do filhote. Certifique-se de fornecer alimentação adequada, vacinas em dia e muito carinho.', 'Dra. Ana', 'cuidados', 'https://placehold.co/600x400/7a9e7e/fff?text=Filhotes', 1, '2024-01-15 12:00:00'),
  (2, 'Alimentação saudável para cães', 'Saiba como escolher a melhor ração.', 'A alimentação é a base da saúde do seu pet. Escolha rações de qualidade, respeite as porções indicadas e evite alimentos humanos.', 'Dr. Pedro', 'alimentacao', 'https://placehold.co/600x400/a8c5ab/2d3a2e?text=Alimentacao', 1, '2024-01-20 12:00:00'),
  (3, 'Vacinas essenciais', 'Calendário de vacinação do seu pet.', 'Mantenha a carteira de vacinação sempre atualizada. As vacinas V8/V10 para cães e V3 para gatos são indispensáveis.', 'Dra. Ana', 'saude', 'https://placehold.co/600x400/d4c5a9/2d3a2e?text=Vacinas', 1, '2024-02-01 12:00:00');
