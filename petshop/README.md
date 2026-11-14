<!--
============================================================
  README.md — PetAmigo v2.0 (Refatorado)
============================================================

ESTRUTURA DE PASTAS (virtual, simulada neste single-file):

  /projeto
  ├── index.html                  ← Este arquivo (entry point)
  ├── README.md                   ← Este bloco de comentário
  ├── /assets
  │   ├── /css
  │   │   ├── base.css            ← Reset + variáveis + tema
  │   │   ├── components.css      ← Botões, cards, forms, modal
  │   │   ├── layout.css          ← Header, footer, grid
  │   │   └── pages.css           ← Estilos específicos de página
  │   ├── /js
  │   │   ├── modules/
  │   │   │   ├── storage.js      ← Camada de persistência
  │   │   │   ├── utils.js        ← Utilitários
  │   │   │   ├── ui.js           ← Componentes de UI
  │   │   │   └── auth.js         ← Autenticação
  │   │   ├── components/
  │   │   │   ├── header.js       ← Header dinâmico
  │   │   │   └── footer.js       ← Footer dinâmico
  │   │   ├── pages/              ← Renderização de páginas
  │   │   └── admin/              ← Painel administrativo
  │   ├── /images                 ← Placeholders via placehold.co
  │   └── /fonts                  ← Roboto (fontsource CDN)
  ├── /database
  │   └── schema.sql              ← Schema completo (ver abaixo)
  └── /admin                      ← Rotas admin (hash #admin/*)

JUSTIFICATIVA DA ORGANIZAÇÃO:
  - Separação por responsabilidade (CSS base/componentes/páginas)
  - Módulos JS isolados facilitam migração futura para backend real
  - /database/schema.sql documenta o modelo relacional alvo
  - /admin separado do público para clareza de permissões

MAPEAMENTO DE ARQUIVOS (antigo → novo):
  - index.html (monolítico) → index.html (organizado com seções)
  - CSS inline → seções: base / components / layout / pages
  - JS inline → módulos: Storage, Utils, UI, Auth, Router, Pages, Admin
  - localStorage → mantém (preparado para migrar para schema.sql)

CREDENCIAIS DEMO DA API:
  E-mail: admin@petamigo.com
  Senha:  password
  E-mail: cliente@petamigo.com
  Senha:  password
  Troque essas senhas antes de publicar o site. O frontend com localStorage
  continua usando os dados de demonstração definidos em assets/js/modules/seed.js.

COMO IMPORTAR O BANCO (quando migrar para backend real):
  1. No phpMyAdmin do XAMPP, importe database/schema.sql; ou use:
     mysql -u root -p < database/schema.sql
  2. A API já aponta para localhost, banco petamigo, usuário root e senha vazia
     em api/config/database.php (padrão do XAMPP). Ajuste para seu ambiente.
  3. O SQL cria as tabelas usadas pelas APIs e carrega dados iniciais para
     produtos, serviços, adoção e blog. As contas de demonstração são apenas
     para desenvolvimento e usam a senha password.

PASSO A PASSO DE DEPLOY:
  1. Hospedar em servidor com PHP 8+ / Node 18+ / Python 3.11+
  2. Configurar variáveis de ambiente (DB_HOST, DB_USER, DB_PASS)
  3. Configurar o frontend para usar as chamadas à API REST
  4. Habilitar HTTPS e headers de segurança (CSP, X-Frame-Options)
  5. Configurar cron para limpeza de sessões expiradas

SCHEMA SQL:
  database/schema.sql
============================================================
-->
// ============================================================
// API de Produtos
// GET  /api/produtos.php          → lista todos
// GET  /api/produtos.php?id=1     → um produto
// POST /api/produtos.php          → cria (admin)
// PUT  /api/produtos.php?id=1     → atualiza (admin)
// DELETE /api/produtos.php?id=1   → remove (admin)
// ============================================================