-- ============================================================
-- PETAMIGO - SCHEMA DE BANCO DE DADOS RELACIONAL
-- MySQL 8.0+ | InnoDB | UTF8MB4 | 3FN
-- ============================================================

DROP DATABASE IF EXISTS petamigo_db;
CREATE DATABASE petamigo_db 
    CHARACTER SET utf8mb4 
    COLLATE utf8mb4_unicode_ci;
USE petamigo_db;

-- ============================================================
-- 1. USUÁRIOS E AUTENTICAÇÃO
-- ============================================================

-- Papéis (roles)
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE,
    descricao VARCHAR(255),
    permissoes JSON NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Usuários
CREATE TABLE usuarios (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    uuid CHAR(36) NOT NULL UNIQUE DEFAULT (UUID()),
    email VARCHAR(180) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    nome VARCHAR(120) NOT NULL,
    role_id INT NOT NULL,
    status ENUM('ativo','inativo','suspenso','pendente') DEFAULT 'pendente',
    email_verificado BOOLEAN DEFAULT FALSE,
    email_verificacao_token VARCHAR(100) NULL,
    ultimo_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by BIGINT UNSIGNED NULL,
    updated_by BIGINT UNSIGNED NULL,
    CONSTRAINT fk_usuarios_role FOREIGN KEY (role_id) REFERENCES roles(id),
    INDEX idx_usuarios_status (status),
    INDEX idx_usuarios_email (email)
) ENGINE=InnoDB;

-- Perfis (dados complementares)
CREATE TABLE perfis (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    usuario_id BIGINT UNSIGNED NOT NULL UNIQUE,
    cpf CHAR(11) NULL UNIQUE,
    rg VARCHAR(20) NULL,
    data_nascimento DATE NULL,
    telefone VARCHAR(20) NULL,
    celular VARCHAR(20) NULL,
    genero ENUM('M','F','O','N') NULL,
    avatar_url VARCHAR(500) NULL,
    bio TEXT NULL,
    preferencias JSON NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_perfis_usuario FOREIGN KEY (usuario_id) 
        REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Endereços (1:N)
CREATE TABLE enderecos (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    usuario_id BIGINT UNSIGNED NOT NULL,
    apelido VARCHAR(50) DEFAULT 'Principal',
    cep CHAR(8) NOT NULL,
    logradouro VARCHAR(180) NOT NULL,
    numero VARCHAR(20) NOT NULL,
    complemento VARCHAR(100) NULL,
    bairro VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado CHAR(2) NOT NULL,
    pais CHAR(2) DEFAULT 'BR',
    latitude DECIMAL(10,7) NULL,
    longitude DECIMAL(10,7) NULL,
    principal BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by BIGINT UNSIGNED NULL,
    updated_by BIGINT UNSIGNED NULL,
    CONSTRAINT fk_enderecos_usuario FOREIGN KEY (usuario_id) 
        REFERENCES usuarios(id) ON DELETE CASCADE,
    INDEX idx_enderecos_usuario (usuario_id),
    INDEX idx_enderecos_cep (cep)
) ENGINE=InnoDB;

-- Sessões JWT
CREATE TABLE sessoes (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    usuario_id BIGINT UNSIGNED NOT NULL,
    token_jti CHAR(36) NOT NULL UNIQUE,
    refresh_token_hash VARCHAR(255) NULL,
    ip_address VARCHAR(45) NULL,
    user_agent VARCHAR(500) NULL,
    expira_em TIMESTAMP NOT NULL,
    revogado_em TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_sessoes_usuario FOREIGN KEY (usuario_id) 
        REFERENCES usuarios(id) ON DELETE CASCADE,
    INDEX idx_sessoes_token (token_jti),
    INDEX idx_sessoes_usuario (usuario_id)
) ENGINE=InnoDB;

-- ============================================================
-- 2. CATÁLOGO DE PRODUTOS
-- ============================================================

-- Categorias hierárquicas (self-reference)
CREATE TABLE categorias_produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    parent_id INT NULL,
    nome VARCHAR(100) NOT NULL,
    slug VARCHAR(120) NOT NULL UNIQUE,
    descricao TEXT NULL,
    icone VARCHAR(100) NULL,
    ordem INT DEFAULT 0,
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by BIGINT UNSIGNED NULL,
    updated_by BIGINT UNSIGNED NULL,
    CONSTRAINT fk_categorias_parent FOREIGN KEY (parent_id) 
        REFERENCES categorias_produtos(id) ON DELETE SET NULL,
    INDEX idx_categorias_parent (parent_id),
    INDEX idx_categorias_slug (slug)
) ENGINE=InnoDB;

-- Marcas
CREATE TABLE marcas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(120) NOT NULL UNIQUE,
    logo_url VARCHAR(500) NULL,
    site_oficial VARCHAR(500) NULL,
    descricao TEXT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by BIGINT UNSIGNED NULL,
    updated_by BIGINT UNSIGNED NULL
) ENGINE=InnoDB;

-- Produtos
CREATE TABLE produtos (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    sku VARCHAR(50) NOT NULL UNIQUE,
    nome VARCHAR(180) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    descricao_curta VARCHAR(500) NULL,
    descricao_longa TEXT NULL,
    categoria_id INT NOT NULL,
    marca_id INT NULL,
    especie ENUM('cao','gato','ave','peixe','roedor','reptil','outro','todos') DEFAULT 'todos',
    preco_custo DECIMAL(10,2) NULL,
    preco DECIMAL(10,2) NOT NULL,
    preco_promocional DECIMAL(10,2) NULL,
    peso_gramas INT NULL,
    dimensoes VARCHAR(50) NULL,
    destaque BOOLEAN DEFAULT FALSE,
    ativo BOOLEAN DEFAULT TRUE,
    meta_title VARCHAR(180) NULL,
    meta_description VARCHAR(300) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by BIGINT UNSIGNED NULL,
    updated_by BIGINT UNSIGNED NULL,
    CONSTRAINT fk_produtos_categoria FOREIGN KEY (categoria_id) 
        REFERENCES categorias_produtos(id),
    CONSTRAINT fk_produtos_marca FOREIGN KEY (marca_id) 
        REFERENCES marcas(id) ON DELETE SET NULL,
    INDEX idx_produtos_categoria (categoria_id),
    INDEX idx_produtos_marca (marca_id),
    INDEX idx_produtos_especie (especie),
    INDEX idx_produtos_ativo (ativo),
    FULLTEXT idx_produtos_busca (nome, descricao_curta, descricao_longa)
) ENGINE=InnoDB;

-- Imagens dos produtos
CREATE TABLE imagens_produtos (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    produto_id BIGINT UNSIGNED NOT NULL,
    url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(180) NULL,
    ordem INT DEFAULT 0,
    principal BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_imagens_produto FOREIGN KEY (produto_id) 
        REFERENCES produtos(id) ON DELETE CASCADE,
    INDEX idx_imagens_produto (produto_id)
) ENGINE=InnoDB;

-- Atributos (tamanho, cor, sabor, etc)
CREATE TABLE atributos_produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(80) NOT NULL UNIQUE,
    tipo ENUM('texto','numero','selecao','booleano') DEFAULT 'texto',
    opcoes JSON NULL,
    unidade VARCHAR(20) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Variações de produtos (P/M/G com preços diferentes)
CREATE TABLE variacoes_produtos (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    produto_id BIGINT UNSIGNED NOT NULL,
    sku VARCHAR(50) NOT NULL UNIQUE,
    nome VARCHAR(120) NOT NULL,
    preco_adicional DECIMAL(10,2) DEFAULT 0,
    estoque INT NOT NULL DEFAULT 0,
    estoque_minimo INT DEFAULT 5,
    peso_gramas INT NULL,
    atributos JSON NULL,
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_variacoes_produto FOREIGN KEY (produto_id) 
        REFERENCES produtos(id) ON DELETE CASCADE,
    CONSTRAINT chk_variacoes_estoque CHECK (estoque >= 0),
    INDEX idx_variacoes_produto (produto_id)
) ENGINE=InnoDB;

-- ============================================================
-- 3. SERVIÇOS
-- ============================================================

CREATE TABLE categorias_servicos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(120) NOT NULL UNIQUE,
    descricao TEXT NULL,
    icone VARCHAR(100) NULL,
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE servicos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categoria_id INT NOT NULL,
    nome VARCHAR(120) NOT NULL,
    slug VARCHAR(140) NOT NULL UNIQUE,
    descricao TEXT NULL,
    duracao_minutos INT NOT NULL DEFAULT 60,
    preco_base DECIMAL(10,2) NOT NULL,
    requer_agendamento BOOLEAN DEFAULT TRUE,
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by BIGINT UNSIGNED NULL,
    updated_by BIGINT UNSIGNED NULL,
    CONSTRAINT fk_servicos_categoria FOREIGN KEY (categoria_id) 
        REFERENCES categorias_servicos(id),
    INDEX idx_servicos_categoria (categoria_id)
) ENGINE=InnoDB;

-- Tabela de preços por porte do pet
CREATE TABLE tabela_precos_porte (
    id INT AUTO_INCREMENT PRIMARY KEY,
    servico_id INT NOT NULL,
    porte ENUM('P','M','G','GG') NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    duracao_minutos INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_servico_porte (servico_id, porte),
    CONSTRAINT fk_precos_servico FOREIGN KEY (servico_id) 
        REFERENCES servicos(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Profissionais (funcionários)
CREATE TABLE profissionais (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    usuario_id BIGINT UNSIGNED NOT NULL UNIQUE,
    especialidades JSON NULL,
    bio TEXT NULL,
    foto_url VARCHAR(500) NULL,
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_profissionais_usuario FOREIGN KEY (usuario_id) 
        REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Serviços que cada profissional executa
CREATE TABLE profissionais_servicos (
    profissional_id BIGINT UNSIGNED NOT NULL,
    servico_id INT NOT NULL,
    PRIMARY KEY (profissional_id, servico_id),
    CONSTRAINT fk_ps_profissional FOREIGN KEY (profissional_id) 
        REFERENCES profissionais(id) ON DELETE CASCADE,
    CONSTRAINT fk_ps_servico FOREIGN KEY (servico_id) 
        REFERENCES servicos(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Grade de horários por profissional
CREATE TABLE horarios_disponiveis (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    profissional_id BIGINT UNSIGNED NOT NULL,
    dia_semana TINYINT NOT NULL COMMENT '0=Dom ... 6=Sáb',
    hora_inicio TIME NOT NULL,
    hora_fim TIME NOT NULL,
    intervalo_minutos INT DEFAULT 30,
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_horarios_profissional FOREIGN KEY (profissional_id) 
        REFERENCES profissionais(id) ON DELETE CASCADE,
    CONSTRAINT chk_horarios_dia CHECK (dia_semana BETWEEN 0 AND 6),
    CONSTRAINT chk_horarios_horas CHECK (hora_fim > hora_inicio),
    INDEX idx_horarios_profissional (profissional_id)
) ENGINE=InnoDB;

-- ============================================================
-- 4. COMERCIAL - PEDIDOS E PAGAMENTOS
-- ============================================================

CREATE TABLE cupons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(50) NOT NULL UNIQUE,
    descricao VARCHAR(255) NULL,
    tipo ENUM('percentual','fixo','frete_gratis') NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    valor_minimo_pedido DECIMAL(10,2) DEFAULT 0,
    limite_uso_total INT NULL,
    limite_uso_por_cliente INT DEFAULT 1,
    usos_atuais INT DEFAULT 0,
    valido_de TIMESTAMP NOT NULL,
    valido_ate TIMESTAMP NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by BIGINT UNSIGNED NULL,
    updated_by BIGINT UNSIGNED NULL,
    CONSTRAINT chk_cupons_validade CHECK (valido_ate > valido_de),
    CONSTRAINT chk_cupons_valor CHECK (valor > 0),
    INDEX idx_cupons_codigo (codigo),
    INDEX idx_cupons_ativo (ativo)
) ENGINE=InnoDB;

CREATE TABLE fretes (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    cep_origem CHAR(8) NOT NULL,
    cep_destino CHAR(8) NOT NULL,
    transportadora VARCHAR(100) NULL,
    servico VARCHAR(100) NULL,
    prazo_dias INT NULL,
    valor DECIMAL(10,2) NOT NULL,
    peso_calculado INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_fretes_cep_destino (cep_destino)
) ENGINE=InnoDB;

CREATE TABLE pedidos (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    numero VARCHAR(30) NOT NULL UNIQUE,
    usuario_id BIGINT UNSIGNED NOT NULL,
    endereco_entrega_id BIGINT UNSIGNED NULL,
    cupom_id INT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    desconto DECIMAL(10,2) DEFAULT 0,
    valor_frete DECIMAL(10,2) DEFAULT 0,
    total DECIMAL(10,2) NOT NULL,
    status ENUM('pendente','pago','preparando','enviado','entregue','cancelado','reembolsado') DEFAULT 'pendente',
    observacoes TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by BIGINT UNSIGNED NULL,
    updated_by BIGINT UNSIGNED NULL,
    CONSTRAINT fk_pedidos_usuario FOREIGN KEY (usuario_id) 
        REFERENCES usuarios(id),
    CONSTRAINT fk_pedidos_endereco FOREIGN KEY (endereco_entrega_id) 
        REFERENCES enderecos(id) ON DELETE SET NULL,
    CONSTRAINT fk_pedidos_cupom FOREIGN KEY (cupom_id) 
        REFERENCES cupons(id) ON DELETE SET NULL,
    CONSTRAINT chk_pedidos_total CHECK (total >= 0),
    INDEX idx_pedidos_usuario (usuario_id),
    INDEX idx_pedidos_status (status),
    INDEX idx_pedidos_numero (numero)
) ENGINE=InnoDB;

CREATE TABLE pedidos_itens (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    pedido_id BIGINT UNSIGNED NOT NULL,
    produto_id BIGINT UNSIGNED NOT NULL,
    variacao_id BIGINT UNSIGNED NULL,
    nome_produto VARCHAR(180) NOT NULL COMMENT 'snapshot',
    sku VARCHAR(50) NOT NULL COMMENT 'snapshot',
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_itens_pedido FOREIGN KEY (pedido_id) 
        REFERENCES pedidos(id) ON DELETE CASCADE,
    CONSTRAINT fk_itens_produto FOREIGN KEY (produto_id) 
        REFERENCES produtos(id),
    CONSTRAINT fk_itens_variacao FOREIGN KEY (variacao_id) 
        REFERENCES variacoes_produtos(id) ON DELETE SET NULL,
    CONSTRAINT chk_itens_quantidade CHECK (quantidade > 0),
    INDEX idx_itens_pedido (pedido_id)
) ENGINE=InnoDB;

CREATE TABLE pagamentos (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    pedido_id BIGINT UNSIGNED NOT NULL,
    metodo ENUM('cartao_credito','cartao_debito','pix','boleto','dinheiro','transferencia') NOT NULL,
    gateway VARCHAR(50) NULL,
    transacao_id VARCHAR(100) NULL,
    valor DECIMAL(10,2) NOT NULL,
    parcelas INT DEFAULT 1,
    status ENUM('pendente','aprovado','recusado','estornado','cancelado') DEFAULT 'pendente',
    payload_gateway JSON NULL,
    pago_em TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_pagamentos_pedido FOREIGN KEY (pedido_id) 
        REFERENCES pedidos(id) ON DELETE CASCADE,
    INDEX idx_pagamentos_pedido (pedido_id),
    INDEX idx_pagamentos_status (status)
) ENGINE=InnoDB;

CREATE TABLE cupons_usos (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    cupom_id INT NOT NULL,
    usuario_id BIGINT UNSIGNED NOT NULL,
    pedido_id BIGINT UNSIGNED NOT NULL,
    valor_desconto DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_usos_cupom FOREIGN KEY (cupom_id) 
        REFERENCES cupons(id),
    CONSTRAINT fk_usos_usuario FOREIGN KEY (usuario_id) 
        REFERENCES usuarios(id),
    CONSTRAINT fk_usos_pedido FOREIGN KEY (pedido_id) 
        REFERENCES pedidos(id) ON DELETE CASCADE,
    INDEX idx_usos_cupom (cupom_id),
    INDEX idx_usos_usuario (usuario_id)
) ENGINE=InnoDB;

-- ============================================================
-- 5. AGENDAMENTOS
-- ============================================================

CREATE TABLE agendamentos (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    usuario_id BIGINT UNSIGNED NOT NULL,
    profissional_id BIGINT UNSIGNED NOT NULL,
    servico_id INT NOT NULL,
    pet_id BIGINT UNSIGNED NULL,
    data_hora_inicio DATETIME NOT NULL,
    data_hora_fim DATETIME NOT NULL,
    preco_cobrado DECIMAL(10,2) NOT NULL,
    status ENUM('agendado','confirmado','em_andamento','concluido','cancelado','no_show') DEFAULT 'agendado',
    observacoes TEXT NULL,
    motivo_cancelamento VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by BIGINT UNSIGNED NULL,
    updated_by BIGINT UNSIGNED NULL,
    CONSTRAINT fk_agend_usuario FOREIGN KEY (usuario_id) 
        REFERENCES usuarios(id),
    CONSTRAINT fk_agend_profissional FOREIGN KEY (profissional_id) 
        REFERENCES profissionais(id),
    CONSTRAINT fk_agend_servico FOREIGN KEY (servico_id) 
        REFERENCES servicos(id),
    CONSTRAINT chk_agend_horas CHECK (data_hora_fim > data_hora_inicio),
    INDEX idx_agend_usuario (usuario_id),
    INDEX idx_agend_profissional_data (profissional_id, data_hora_inicio),
    INDEX idx_agend_status (status)
) ENGINE=InnoDB;

CREATE TABLE agendamentos_status_log (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    agendamento_id BIGINT UNSIGNED NOT NULL,
    status_anterior VARCHAR(30) NULL,
    status_novo VARCHAR(30) NOT NULL,
    alterado_por BIGINT UNSIGNED NULL,
    motivo VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_status_log_agend FOREIGN KEY (agendamento_id) 
        REFERENCES agendamentos(id) ON DELETE CASCADE,
    INDEX idx_status_log_agend (agendamento_id)
) ENGINE=InnoDB;

-- ============================================================
-- 6. PETS
-- ============================================================

CREATE TABLE pets_cliente (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    usuario_id BIGINT UNSIGNED NOT NULL,
    nome VARCHAR(80) NOT NULL,
    especie ENUM('cao','gato','ave','peixe','roedor','reptil','outro') NOT NULL,
    raca VARCHAR(100) NULL,
    porte ENUM('P','M','G','GG') NULL,
    sexo ENUM('M','F') NULL,
    data_nascimento DATE NULL,
    peso_kg DECIMAL(5,2) NULL,
    cor VARCHAR(50) NULL,
    castrado BOOLEAN DEFAULT FALSE,
    microchip VARCHAR(50) NULL UNIQUE,
    foto_url VARCHAR(500) NULL,
    observacoes TEXT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by BIGINT UNSIGNED NULL,
    updated_by BIGINT UNSIGNED NULL,
    CONSTRAINT fk_pets_cliente_usuario FOREIGN KEY (usuario_id) 
        REFERENCES usuarios(id) ON DELETE CASCADE,
    INDEX idx_pets_cliente_usuario (usuario_id),
    INDEX idx_pets_cliente_especie (especie)
) ENGINE=InnoDB;

-- FK após criar pets_cliente (agendamentos referencia)
ALTER TABLE agendamentos 
    ADD CONSTRAINT fk_agend_pet FOREIGN KEY (pet_id) 
    REFERENCES pets_cliente(id) ON DELETE SET NULL;

CREATE TABLE pets_adocao (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(80) NOT NULL,
    especie ENUM('cao','gato','ave','peixe','roedor','reptil','outro') NOT NULL,
    raca VARCHAR(100) NULL,
    porte ENUM('P','M','G','GG') NULL,
    sexo ENUM('M','F') NULL,
    idade_estimada_meses INT NULL,
    castrado BOOLEAN DEFAULT FALSE,
    vacinado BOOLEAN DEFAULT FALSE,
    descricao TEXT NULL,
    historia TEXT NULL,
    foto_principal VARCHAR(500) NULL,
    status ENUM('disponivel','em_processo','adotado','indisponivel') DEFAULT 'disponivel',
    data_resgate DATE NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by BIGINT UNSIGNED NULL,
    updated_by BIGINT UNSIGNED NULL,
    INDEX idx_adocao_status (status),
    INDEX idx_adocao_especie (especie)
) ENGINE=InnoDB;

CREATE TABLE vacinas (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    pet_cliente_id BIGINT UNSIGNED NULL,
    pet_adocao_id BIGINT UNSIGNED NULL,
    nome_vacina VARCHAR(120) NOT NULL,
    data_aplicacao DATE NOT NULL,
    data_proxima_dose DATE NULL,
    veterinario VARCHAR(120) NULL,
    lote VARCHAR(50) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_vacinas_pet_cliente FOREIGN KEY (pet_cliente_id) 
        REFERENCES pets_cliente(id) ON DELETE CASCADE,
    CONSTRAINT fk_vacinas_pet_adocao FOREIGN KEY (pet_adocao_id) 
        REFERENCES pets_adocao(id) ON DELETE CASCADE,
    CONSTRAINT chk_vacinas_um_pet CHECK (
        (pet_cliente_id IS NOT NULL AND pet_adocao_id IS NULL) OR
        (pet_cliente_id IS NULL AND pet_adocao_id IS NOT NULL)
    ),
    INDEX idx_vacinas_pet_cliente (pet_cliente_id),
    INDEX idx_vacinas_pet_adocao (pet_adocao_id)
) ENGINE=InnoDB;

CREATE TABLE adocao_interesses (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    pet_adocao_id BIGINT UNSIGNED NOT NULL,
    usuario_id BIGINT UNSIGNED NOT NULL,
    mensagem TEXT NULL,
    status ENUM('pendente','em_analise','aprovado','rejeitado','concluido') DEFAULT 'pendente',
    respondido_por BIGINT UNSIGNED NULL,
    respondido_em TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_interesses_pet FOREIGN KEY (pet_adocao_id) 
        REFERENCES pets_adocao(id) ON DELETE CASCADE,
    CONSTRAINT fk_interesses_usuario FOREIGN KEY (usuario_id) 
        REFERENCES usuarios(id) ON DELETE CASCADE,
    UNIQUE KEY uk_interesse_pet_usuario (pet_adocao_id, usuario_id),
    INDEX idx_interesses_status (status)
) ENGINE=InnoDB;

-- ============================================================
-- 7. CONTEÚDO (BLOG)
-- ============================================================

CREATE TABLE blog_categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(120) NOT NULL UNIQUE,
    descricao TEXT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE blog_posts (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    categoria_id INT NULL,
    autor_id BIGINT UNSIGNED NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    slug VARCHAR(220) NOT NULL UNIQUE,
    resumo VARCHAR(500) NULL,
    conteudo LONGTEXT NOT NULL,
    imagem_destaque VARCHAR(500) NULL,
    meta_title VARCHAR(180) NULL,
    meta_description VARCHAR(300) NULL,
    status ENUM('rascunho','publicado','arquivado') DEFAULT 'rascunho',
    publicado_em TIMESTAMP NULL,
    visualizacoes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by BIGINT UNSIGNED NULL,
    updated_by BIGINT UNSIGNED NULL,
    CONSTRAINT fk_posts_categoria FOREIGN KEY (categoria_id) 
        REFERENCES blog_categorias(id) ON DELETE SET NULL,
    CONSTRAINT fk_posts_autor FOREIGN KEY (autor_id) 
        REFERENCES usuarios(id),
    INDEX idx_posts_status (status),
    INDEX idx_posts_publicado (publicado_em)
) ENGINE=InnoDB;

CREATE TABLE blog_tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(60) NOT NULL UNIQUE,
    slug VARCHAR(80) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE blog_post_tags (
    post_id BIGINT UNSIGNED NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (post_id, tag_id),
    CONSTRAINT fk_pt_post FOREIGN KEY (post_id) 
        REFERENCES blog_posts(id) ON DELETE CASCADE,
    CONSTRAINT fk_pt_tag FOREIGN KEY (tag_id) 
        REFERENCES blog_tags(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE comentarios_blog (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    post_id BIGINT UNSIGNED NOT NULL,
    usuario_id BIGINT UNSIGNED NOT NULL,
    parent_id BIGINT UNSIGNED NULL,
    conteudo TEXT NOT NULL,
    aprovado BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_coment_post FOREIGN KEY (post_id) 
        REFERENCES blog_posts(id) ON DELETE CASCADE,
    CONSTRAINT fk_coment_usuario FOREIGN KEY (usuario_id) 
        REFERENCES usuarios(id) ON DELETE CASCADE,
    CONSTRAINT fk_coment_parent FOREIGN KEY (parent_id) 
        REFERENCES comentarios_blog(id) ON DELETE CASCADE,
    INDEX idx_coment_post (post_id)
) ENGINE=InnoDB;

-- ============================================================
-- 8. ENGAJAMENTO
-- ============================================================

CREATE TABLE avaliacoes (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    produto_id BIGINT UNSIGNED NOT NULL,
    usuario_id BIGINT UNSIGNED NOT NULL,
    pedido_id BIGINT UNSIGNED NULL COMMENT 'compra verificada',
    nota TINYINT NOT NULL,
    titulo VARCHAR(150) NULL,
    comentario TEXT NULL,
    aprovado BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_aval_produto FOREIGN KEY (produto_id) 
        REFERENCES produtos(id) ON DELETE CASCADE,
    CONSTRAINT fk_aval_usuario FOREIGN KEY (usuario_id) 
        REFERENCES usuarios(id) ON DELETE CASCADE,
    CONSTRAINT fk_aval_pedido FOREIGN KEY (pedido_id) 
        REFERENCES pedidos(id) ON DELETE SET NULL,
    CONSTRAINT chk_aval_nota CHECK (nota BETWEEN 1 AND 5),
    UNIQUE KEY uk_aval_produto_usuario (produto_id, usuario_id),
    INDEX idx_aval_produto (produto_id),
    INDEX idx_aval_nota (nota)
) ENGINE=InnoDB;

CREATE TABLE favoritos (
    usuario_id BIGINT UNSIGNED NOT NULL,
    produto_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (usuario_id, produto_id),
    CONSTRAINT fk_fav_usuario FOREIGN KEY (usuario_id) 
        REFERENCES usuarios(id) ON DELETE CASCADE,
    CONSTRAINT fk_fav_produto FOREIGN KEY (produto_id) 
        REFERENCES produtos(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE notificacoes (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    usuario_id BIGINT UNSIGNED NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    titulo VARCHAR(180) NOT NULL,
    mensagem TEXT NOT NULL,
    link VARCHAR(500) NULL,
    lida BOOLEAN DEFAULT FALSE,
    lida_em TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_notif_usuario FOREIGN KEY (usuario_id) 
        REFERENCES usuarios(id) ON DELETE CASCADE,
    INDEX idx_notif_usuario_lida (usuario_id, lida)
) ENGINE=InnoDB;

CREATE TABLE newsletter_inscritos (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(180) NOT NULL UNIQUE,
    nome VARCHAR(120) NULL,
    confirmado BOOLEAN DEFAULT FALSE,
    token_confirmacao VARCHAR(100) NULL,
    ip_origem VARCHAR(45) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP NULL
) ENGINE=InnoDB;

-- ============================================================
-- 9. ADMINISTRATIVO
-- ============================================================

CREATE TABLE logs_auditoria (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    usuario_id BIGINT UNSIGNED NULL,
    acao VARCHAR(100) NOT NULL,
    entidade VARCHAR(100) NOT NULL,
    entidade_id BIGINT UNSIGNED NULL,
    dados_anteriores JSON NULL,
    dados_novos JSON NULL,
    ip_address VARCHAR(45) NULL,
    user_agent VARCHAR(500) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_logs_usuario FOREIGN KEY (usuario_id) 
        REFERENCES usuarios(id) ON DELETE SET NULL,
    INDEX idx_logs_entidade (entidade, entidade_id),
    INDEX idx_logs_usuario (usuario_id),
    INDEX idx_logs_data (created_at)
) ENGINE=InnoDB;

CREATE TABLE configuracoes_sistema (
    chave VARCHAR(80) PRIMARY KEY,
    valor TEXT NULL,
    tipo ENUM('texto','numero','booleano','json') DEFAULT 'texto',
    descricao VARCHAR(255) NULL,
    publico BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by BIGINT UNSIGNED NULL
) ENGINE=InnoDB;

CREATE TABLE banners (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(180) NULL,
    subtitulo VARCHAR(255) NULL,
    imagem_url VARCHAR(500) NOT NULL,
    link_url VARCHAR(500) NULL,
    posicao VARCHAR(50) DEFAULT 'home_topo',
    ordem INT DEFAULT 0,
    ativo BOOLEAN DEFAULT TRUE,
    data_inicio TIMESTAMP NULL,
    data_fim TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by BIGINT UNSIGNED NULL,
    updated_by BIGINT UNSIGNED NULL
) ENGINE=InnoDB;

CREATE TABLE depoimentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id BIGINT UNSIGNED NULL,
    nome_autor VARCHAR(120) NOT NULL,
    texto TEXT NOT NULL,
    nota TINYINT DEFAULT 5,
    foto_url VARCHAR(500) NULL,
    aprovado BOOLEAN DEFAULT FALSE,
    ordem INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_depoimento_usuario FOREIGN KEY (usuario_id) 
        REFERENCES usuarios(id) ON DELETE SET NULL,
    CONSTRAINT chk_depoimento_nota CHECK (nota BETWEEN 1 AND 5)
) ENGINE=InnoDB;

-- ============================================================
-- 10. TRIGGERS DE REGRAS DE NEGÓCIO
-- ============================================================

DELIMITER //

-- 10.1 Baixa de estoque após item de pedido
CREATE TRIGGER trg_baixa_estoque_pedido
AFTER INSERT ON pedidos_itens
FOR EACH ROW
BEGIN
    IF NEW.variacao_id IS NOT NULL THEN
        UPDATE variacoes_produtos
        SET estoque = estoque - NEW.quantidade
        WHERE id = NEW.variacao_id AND estoque >= NEW.quantidade;
    END IF;
END//

-- 10.2 Impede estoque negativo
CREATE TRIGGER trg_estoque_nao_negativo
BEFORE UPDATE ON variacoes_produtos
FOR EACH ROW
BEGIN
    IF NEW.estoque < 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Estoque não pode ser negativo';
    END IF;
END//

-- 10.3 Incrementa uso do cupom
CREATE TRIGGER trg_cupom_incrementa_uso
AFTER INSERT ON cupons_usos
FOR EACH ROW
BEGIN
    UPDATE cupons 
    SET usos_atuais = usos_atuais + 1 
    WHERE id = NEW.cupom_id;
END//

-- 10.4 Log automático de mudança de status do agendamento
CREATE TRIGGER trg_agend_status_log
AFTER UPDATE ON agendamentos
FOR EACH ROW
BEGIN
    IF OLD.status <> NEW.status THEN
        INSERT INTO agendamentos_status_log 
            (agendamento_id, status_anterior, status_novo, alterado_por, motivo)
        VALUES 
            (NEW.id, OLD.status, NEW.status, NEW.updated_by, NEW.motivo_cancelamento);
    END IF;
END//

DELIMITER ;

-- ============================================================
-- 11. VIEWS ÚTEIS
-- ============================================================

-- Produtos com estoque total
CREATE VIEW vw_produtos_estoque AS
SELECT 
    p.id,
    p.sku,
    p.nome,
    p.preco,
    c.nome AS categoria,
    m.nome AS marca,
    COALESCE(SUM(v.estoque), 0) AS estoque_total,
    p.ativo
FROM produtos p
LEFT JOIN categorias_produtos c ON p.categoria_id = c.id
LEFT JOIN marcas m ON p.marca_id = m.id
LEFT JOIN variacoes_produtos v ON v.produto_id = p.id AND v.ativo = 1
GROUP BY p.id;

-- Média de avaliações por produto
CREATE VIEW vw_produtos_avaliacoes AS
SELECT 
    p.id,
    p.nome,
    COUNT(a.id) AS total_avaliacoes,
    ROUND(AVG(a.nota), 2) AS media_nota
FROM produtos p
LEFT JOIN avaliacoes a ON a.produto_id = p.id AND a.aprovado = 1
GROUP BY p.id;

-- Próximos agendamentos
CREATE VIEW vw_agendamentos_futuros AS
SELECT 
    a.id,
    u.nome AS cliente,
    s.nome AS servico,
    prof.usuario_id AS profissional_id,
    a.data_hora_inicio,
    a.data_hora_fim,
    a.status
FROM agendamentos a
JOIN usuarios u ON a.usuario_id = u.id
JOIN servicos s ON a.servico_id = s.id
JOIN profissionais prof ON a.profissional_id = prof.id
WHERE a.data_hora_inicio >= NOW()
  AND a.status IN ('agendado','confirmado')
ORDER BY a.data_hora_inicio;

-- ============================================================
-- 12. DADOS INICIAIS
-- ============================================================

-- Roles
INSERT INTO roles (nome, descricao, permissoes) VALUES
('admin', 'Administrador total', JSON_ARRAY('*')),
('cliente', 'Cliente comum', JSON_ARRAY('pedidos.criar','perfil.editar','agendamentos.criar')),
('profissional', 'Profissional de serviços', JSON_ARRAY('agendamentos.ver_proprios'));

-- Usuário admin (senha: Admin@2026)
INSERT INTO usuarios (email, senha_hash, nome, role_id, status, email_verificado)
VALUES (
    'admin@petamigo.com.br',
    '$2y$10$e0MYzXyjpJS7Pd0RVvHwHe1HlCS4bZJ18JuywdB4F5cU/2F5FqZzG',
    'Administrador PetAmigo',
    1,
    'ativo',
    TRUE
);

-- Categorias de produtos
INSERT INTO categorias_produtos (nome, slug, descricao) VALUES
('Rações', 'racoes', 'Alimentos para cães, gatos e outros pets'),
('Brinquedos', 'brinquedos', 'Brinquedos e acessórios de diversão'),
('Higiene', 'higiene', 'Produtos de limpeza e higiene'),
('Acessórios', 'acessorios', 'Coleiras, camas, comedouros'),
('Medicamentos', 'medicamentos', 'Medicamentos e suplementos');

-- Categorias de serviços
INSERT INTO categorias_servicos (nome, slug) VALUES
('Banho e Tosa', 'banho-tosa'),
('Veterinário', 'veterinario'),
('Adestramento', 'adestramento'),
('Hospedagem', 'hospedagem');

-- Serviços
INSERT INTO servicos (categoria_id, nome, slug, preco_base, duracao_minutos) VALUES
(1, 'Banho', 'banho', 50.00, 60),
(1, 'Tosa Higiênica', 'tosa-higienica', 60.00, 45),
(1, 'Banho + Tosa', 'banho-tosa', 90.00, 90);

-- Preços por porte
INSERT INTO tabela_precos_porte (servico_id, porte, preco) VALUES
(1, 'P', 50.00), (1, 'M', 65.00), (1, 'G', 85.00),
(2, 'P', 60.00), (2, 'M', 75.00), (2, 'G', 95.00),
(3, 'P', 90.00), (3, 'M', 120.00), (3, 'G', 150.00);

-- Cupom de exemplo
INSERT INTO cupons (codigo, descricao, tipo, valor, valor_minimo_pedido, 
                    limite_uso_total, valido_de, valido_ate) VALUES
('BEMVINDO10', 'Desconto de boas-vindas', 'percentual', 10.00, 50.00, 
 1000, NOW(), DATE_ADD(NOW(), INTERVAL 90 DAY));

-- Configurações padrão
INSERT INTO configuracoes_sistema (chave, valor, tipo, descricao, publico) VALUES
('site_nome', 'PetAmigo', 'texto', 'Nome do site', TRUE),
('site_email', 'contato@petamigo.com.br', 'texto', 'E-mail de contato', TRUE),
('frete_gratis_acima', '200.00', 'numero', 'Frete grátis acima deste valor', TRUE),
('cancelamento_horas', '2', 'numero', 'Horas mínimas para cancelar agendamento', FALSE),
('manutencao', 'false', 'booleano', 'Site em manutenção', FALSE);

-- ============================================================
-- FIM DO SCHEMA
-- ============================================================