# ESCOPO COMPLETO — E-COMMERCE PETSHOP (BRASIL)
**Documento:** Escopo Funcional, Técnico e Legal | **Projeto base:** PetAmigo (petshop/)
**Autor:** Gerência de Projetos E-commerce / UX-UI / Full-Stack | **Data:** 27/11/2026
**Legenda de Prioridade:** 🔴 MVP/Lançamento · 🟡 Fase 2 · 🟢 Futuro/Opcional

---

## 1. ARQUITETURA DA INFORMAÇÃO E PÁGINAS (SITEMAP)

### 1.1 Estrutura de Navegação Principal
| [ ] | Página / Seção | Conteúdo Obrigatório | Prioridade |
|---|---|---|---|
| [ ] | **Home** | Hero com promos sazonais; barra de navegação por espécie (Cachorro, Gato, Pássaro, Peixe, Roedor, Réptil); vitrines "Mais Vendidos", "Ofertas do Dia", "Recomendado para seu pet"; selos de confiança (frete grátis, parcelamento, nota fiscal); banner de Assinatura; blog em destaque | 🔴 |
| [ ] | **Página de Categoria (PLP)** | Grid de produtos; breadcrumbs; filtros laterais; ordenação (relevância, preço, novidade, mais vendidos); paginação/infinite scroll; descrição SEO da categoria no rodapé da lista; contagem de resultados | 🔴 |
| [ ] | **Subcategoria ex.: Cães > Alimentação > Rações** | Segmentação por Porte (mini/pequeno/médio/gande/gigante), Idade (filhote/adulto/sênior), Linha (Premium/Super Premium/Natural/Hipoalergênica), Sabor, Peso da embalagem | 🔴 |
| [ ] | **Página de Produto (PDP)** | Ver checklist detalhado abaixo | 🔴 |
| [ ] | **Carrinho (minicarrinho + página)** | Ver seção 2.1 | 🔴 |
| [ ] | **Checkout** | Ver seção 2.2 | 🔴 |
| [ ] | **Busca de Resultados** | Query, correção "você quis dizer", sugestões, filtros, estado vazio com recomendações | 🔴 |
| [ ] | **Minha Conta (área logada)** | Ver seção 2.3 | 🔴 |
| [ ] | **Lista de Desejos (Wishlist)** | Favoritos por usuário, compartilhar lista, mover para carrinho | 🟡 |
| [ ] | **Categoria Banho & Tosa / Serviços** | Agendamento de serviço com seleção de unidade, profissional e horário | 🔴 |
| [ ] | **Categoria Adoção** | Perfil de pets, formulário de adoção responsável (já existe `pets_adocao`) | 🟡 |
| [ ] | **Blog / Central de Conteúdo** | Posts por categoria (saúde, nutrição, comportamento), busca, tags | 🟡 |
| [ ] | **Institucional: Quem Somos** | História, missão, loja física(s), equipe veterinária/farmacêutica com CRM/CRF | 🔴 |
| [ ] | **Institucional: Trocas e Devoluções** | Política conforme CDC (art. 49), prazos, passos passo a passo | 🔴 |
| [ ] | **Institucional: Privacidade (LGPD)** | Ver seção 5.2 | 🔴 |
| [ ] | **Institucional: Termos de Uso** | Regras da plataforma, assinatura, marketplace | 🔴 |
| [ ] | **Institucional: Frete e Prazos** | Tabela de modalidades, áreas de entrega, frete grátis | 🔴 |
| [ ] | **Institucional: Formas de Pagamento** | Bandeiras aceitas, PIX, boleto, parcelamento, limite de juros | 🔴 |
| [ ] | **Trabalhe Conosco / Contato** | Formulário, canais, mapa, horários | 🔴 |
| [ ] | **Páginas Legais: Vendas de Medicamentos** | Termo de responsabilidade, exigência de receita, dados do vet/farmacêutico responsável | 🔴 |
| [ ] | **Página 404 / 500** | Busca sugerida, links úteis, mensagem amigável com identidade da marca | 🔴 |
| [ ] | **Landing Pages de Campanha** | URLs dedicadas p/ Black Friday, Natal, Aniversário do Pet, cupons de afiliados | 🟡 |

### 1.2 Checklist Detalhado da Página de Produto (PDP)
| [ ] | Elemento | Detalhamento | Prioridade |
|---|---|---|---|
| [ ] | Galeria de imagens | Mín. 5 fotos (frente, verso, composição, uso), zoom, vídeo do produto, WebP/AVIF | 🔴 |
| [ ] | Nome + marca + linha | Ex.: "Ração Golden Formula Adultos Frango 15kg — Premier Pet" | 🔴 |
| [ ] | SKU e EAN/GTIN | Visível para reposição e busca interna | 🔴 |
| [ ] | Preço à vista (PIX) + parcelado | Destaque desconto PIX; tabela de parcelamento sem juros | 🔴 |
| [ ] | Indicador de estoque | "Em estoque / Últimas X unidades / Esgotado (avise-me)" | 🔴 |
| [ ] | **Data de validade / lote** | Crítico em rações e medicamentos: exibir validade mínima garantida na entrega | 🔴 |
| [ ] | Composição nutricional completa | Tabela levels garantidos, ingredientes, energia metabolizável (kcal/kg) | 🔴 |
| [ ] | Guia de alimentação / dosagem | Tabela por peso do animal + link para calculadora de dose | 🔴 |
| [ ] | Indicação por espécie/porte/fase | Ícones: cachorro, porte, filhote/adulto/sênior | 🔴 |
| [ ] | Níveis de garantia e registro MAPA | Nº de registro do produto no MAPA (obrigatório p/ ração e petiscos industriais) | 🔴 |
| [ ] | Restrições legais (medicamentos) | Aviso "Venda mediante receita"; campo de upload de receita na PDP | 🔴 |
| [ ] | Avaliações e perguntas | Estrelas, notas por critério (apetite, custo-benefício), fotos dos clientes, moderação | 🟡 |
| [ ] | Frete estimado pelo CEP | Cálculo em tempo real antes do checkout (Correios/transportadoras) | 🔴 |
| [ ] | Cross-sell contextual | "Quem comprou levou também", "Complete o kit" (seção 3.2) | 🟡 |
| [ ] | Botão comprar + assinatura | "Comprar avulso" vs "Assine e economize 10%" | 🔴 |
| [ ] | Descrição rica + ficha técnica | Abas: Descrição | Especificações | Avaliações | Recomendações | 🔴 |
| [ ] | Dados estruturados (Schema.org) | JSON-LD Product, Offer, AggregateRating, BreadcrumbList | 🔴 |
| [ ] | Compartilhar / WhatsApp | Botão de compartilhamento direto | 🟡 |

---

## 2. FUNCIONALIDADES CORE E FLUXO DE COMPRA

### 2.1 Carrinho
| [ ] | Requisito | Detalhe | Prioridade |
|---|---|---|---|
| [ ] | Minicarrinho (drawer) | Abrir sem sair da página; editar quantidade; remover; subtotal | 🔴 |
| [ ] | Persistência de carrinho | Login: sincronizar carrinho anônimo (localStorage/cookie) com conta | 🔴 |
| [ ] | Cupom de desconto no carrinho | Validação em tempo real, mensagem de erro específica, cumulatividade configurável | 🔴 |
| [ ] | Barra de progresso "Frete Grátis" | "Faltam R$ X para frete grátis" com threshold configurável | 🔴 |
| [ ] | Cálculo de frete por CEP no carrinho | Múltiplas modalidades (entrega padrão, expressa, retirada em loja) | 🔴 |
| [ ] | Produtos relacionados no carrinho | Upsell leve (petisco barato, sachê) | 🟡 |
| [ ] | Recuperação de carrinho abandonado | E-mail em 1h/24h + WhatsApp em 48h com cupom opcional | 🟡 |
| [ ] | Divisão do carrinho por pet | Agrupar itens por perfil de pet ("Ração do Thor", "Areia da Mel") | 🟢 |

### 2.2 Checkout
| [ ] | Requisito | Detalhe | Prioridade |
|---|---|---|---|
| [ ] | Checkout transparente / one-page | Menos cliques possível; opcionalmente guest checkout (sem cadastro obrigatório) | 🔴 |
| [ ] | Identificação (e-mail/CPF) | Validação de CPF (dígitos verificadores) e formato de e-mail | 🔴 |
| [ ] | Seleção/preenchimento de endereço | Autocomplete de CEP (ViaCEP/API própria), complemento, referência de entrega | 🔴 |
| [ ] | Entrega vs Retirada em loja | Escolher unidade, horário de retirada, documento do retirante | 🟡 |
| [ ] | Data/hora de entrega agendada | Opção "entregar quando eu viajar" / presente | 🟢 |
| [ ] | Meios de pagamento | PIX (QR dinâmico + copia-e-cola, expiração), Cartão crédito (tokenização), Débito online, Boleto, carteira digital (Apple/Google Pay) | 🔴 |
| [ ] | Parcelamento claro | Simulador com juros transparentes (CDC: informar CET) | 🔴 |
| [ ] | Voucher/cartão-presente | Aplicação e saldo parcial | 🟡 |
| [ ] | Consentimentos LGPD no checkout | Opt-in marketing separado do aceite de termos (não pré-marcado) | 🔴 |
| [ ] | Upload de receita veterinary | Bloqueio de finalização se item controlado sem receita aprovada | 🔴 |
| [ ] | Resumo do pedido | Itens, frete, descontos, prazo estimado, CNPJ/Merchant ID visível | 🔴 |
| [ ] | Confirmação + e-mail transacional | Pedido recebido, pagamento aprovado, enviado, entregue (HTML responsivo, SPF/DKIM/DMARC) | 🔴 |
| [ ] | Anti-fraude | Análise de risco, 3DS2, blocklist, revisão manual de pedidos acima de ticket | 🔴 |
| [ ] | Reembolso/estorno autoatendimento | Portal de devolução com geração de etiqueta | 🟡 |

### 2.3 Conta do Cliente
| [ ] | Requisito | Detalhe | Prioridade |
|---|---|---|---|
| [ ] | Cadastro/Login | E-mail+senha (hash bcrypt/argon2), login social (Google/Apple), recuperação de senha | 🔴 |
| [ ] | 2FA opcional (TOTP/SMS) | Para alteração de dados sensíveis | 🟡 |
| [ ] | **Perfil do(s) Pet(s)** | Nome, espécie, raça, porte, data de nascimento (cálculo automático de idade/fase), peso atual, esterilizado, alergias/restrições, foto. Base para personalização e assinatura | 🔴 |
| [ ] | Histórico de pedidos | Status em tempo real, recompute "comprar novamente" 1-clique | 🔴 |
| [ ] | Gestão de assinaturas | Pausar, adiar, trocar produto, alterar frequência, cancelar (autoatendimento) | 🔴 |
| [ ] | Carnê de endereços | Múltiplos endereços + apelido ("Casa", "Casa da praia") | 🔴 |
| [ ] | Wishlist | Ver 1.1 | 🟡 |
| [ ] | Cupons e cashback do cliente | Carteira de benefícios | 🟡 |
| [ ] | Programa de fidelidade | Pontos por compra/avaliação/aniversário do pet; resgate | 🟡 |
| [ ] | Download de NF-e | Acesso às notas fiscais emitidas (XML/PDF-DANFE) | 🔴 |
| [ ] | Exclusão de conta (LGPD) | Direito ao esquecimento com anonimização | 🔴 |

### 2.4 Busca e Filtros Avançados (Motor: Algolia/Elasticsearch)
| [ ] | Requisito | Detalhe | Prioridade |
|---|---|---|---|
| [ ] | Autocomplete com produtos/categorias | Typo tolerance, sinônimos ("ração filhote" = "ração filhotes puppy"), histórico | 🔴 |
| [ ] | Filtro por **espécie** | Cachorro, gato, ave, peixe, roedor, réptil | 🔴 |
| [ ] | Filtro por **porte** | Mini, pequeno, médio, grande, gigante | 🔴 |
| [ ] | Filtro por **fase/idade** | Filhote, adulto, sênier, gestante/lactante | 🔴 |
| [ ] | Filtro por **necessidade específica** | Sensibilidade alimentar, pele sensível, controle de tártaro, renal, urinário, castrado, obésidade | 🔴 |
| [ ] | Filtro por ingrediente/dieta | Sem grãos (grain free), natural, hipoalergênica, proteínas específicas | 🟡 |
| [ ] | Filtro por marca, faixa de preço, peso/volume | Padrão | 🔴 |
| [ ] | Filtro "Indicado por Veterinário" | Badge editorial | 🟡 |
| [ ] | Filtro por avaliação mínima | 4★+ etc. | 🔴 |
| [ ] | Busca facial por imagem | Foto do rótulo → encontra a ração | 🟢 |
| [ ] | Redirecionamento inteligente | "Estou procurando por..." persona wizard (dono de novo filhote?) | 🟢 |

---

## 3. DIFERENCIAIS DO NICHO PET (RETENÇÃO E CONVERSÃO)

### 3.1 "Assine e Economize" (Compras Recorrentes)
| [ ] | Requisito | Detalhe | Prioridade |
|---|---|---|---|
| [ ] | Frequências configuráveis | 15, 30, 45, 60 dias — sugeridas automaticamente pela calculadora de consumo (kg ÷ dose diária) | 🔴 |
| [ ] | Desconto progressivo por recorrência | Ex.: 5% na 1ª, 10% recorrente; badge na PDP | 🔴 |
| [ ] | Cobrança recorrente via gateway | Tokenização de cartão (Stripe/Braintree/Pagar.me/Asaas subscriptions), retry inteligente de cobrança falha | 🔴 |
| [ ] | Notificações pré-cobrança | E-mail/WhatsApp 3 dias antes ("sua próxima entrega chega em breve — gerenciar") | 🔴 |
| [ ] | Autoatendimento total | Pausar, pular ciclo, trocar sabor, alterar endereço, cancelar sem contato humano | 🔴 |
| [ ] | Alerta de validade no reabastecimento | Nunca enviar produto com <X meses de validade | 🔴 |
| [ ] | Kit de boas-vindas do assinante | Brinde/petisco na primeira caixa | 🟡 |
| [ ] | Dashboard LTV/churn do assinante (admin) | Métricas de retenção por coorte | 🟡 |

### 3.2 Cross-sell e Up-sell Específicos do Nicho
| [ ] | Tática | Regra de Negócio | Prioridade |
|---|---|---|---|
| [ ] | **"Comprou ração → sugira"** | Petiscos, sachês, comedouro, tapete higiênico, vermífugo (com receita) | 🔴 |
| [ ] | **Kit "Mudança de Ração"** | Transição gradual (7 dias) + guia impresso/digital | 🟡 |
| [ ] | **Bundle econômico** | Combo ração 15kg + petisco + brinquedo com desconto (SKU virtual) | 🟡 |
| [ ] | **Up-sell de linha** | Ao ver ração Standard, sugerir Super Premium com comparativo de nutrientes | 🟡 |
| [ ] | **Cross-sell por fase de vida** | Pet filhote cadastrado → perto dos 12 meses, sugerir transição p/ adulto | 🟢 |
| [ ] | **Aniversário do pet** | Cupom automático 7 dias antes via e-mail/WhatsApp | 🟡 |
| [ ] | **Reposição preditiva** | "Seu pacote de areia costuma durar 28 dias. Reabastecer agora?" | 🟡 |
| [ ] | **Upsell no checkout** | Add-on de baixo ticket (<R$ 25): antipulgas, osso de couro | 🔴 |
| [ ] | **Pós-compra (thank you page)** | Indique um amigo / avalie após 15 dias | 🟡 |

### 3.3 Conteúdo e Utilitários
| [ ] | Recurso | Detalhe | Prioridade |
|---|---|---|---|
| [ ] | **Calculadora de dose de ração** | Inputs: peso, idade, atividade, ração escolhida → g/dia e duração do pacote; CTA "assinar no ritmo certo" | 🔴 |
| [ ] | **Calculadora de água/calorias** | Extras engajamento | 🟢 |
| [ ] | **Consultor por WhatsApp** | Nutricionista/veterinário tira-dúvidas (com disclaimer: não substitui consulta) | 🟡 |
| [ ] | Blog com SEO programático | "Melhor ração para golden retriever filhote", guias por raça | 🟡 |
| [ ] | Vídeos curtos (Reels/TikTok embed) | Rotina, unboxing, dicas de adestramento | 🟢 |
| [ ] | Comunidade "Pet Influencer" | Fotos de clientes, UGC nas PDPs | 🟢 |
| [ ] | Lembretes de saúde | Vacina, vermífugo, antipulgas — calendário no app/conta | 🟡 |

---

## 4. SEGURANÇA, INFRAESTRUTURA E PERFORMANCE

### 4.1 Segurança
| [ ] | Requisito | Detalhe | Prioridade |
|---|---|---|---|
| [ ] | **SSL/TLS** em todo o domínio | TLS 1.2+, HSTS, redirect 301 http→https, certificado gerenciado (Let's Encrypt/ACM) | 🔴 |
| [ ] | **WAF + Anti-DDoS** | Cloudflare/AWS WAF com regras OWASP Core, rate limiting em login/checkout | 🔴 |
| [ ] | **PCI-DSS SAQ-A** | Nunca armazenar PAN; tokenização via gateway (iframe/fields hospedados); escaneamento quarterly ASV | 🔴 |
| [ ] | Senhas seguras | Argon2id/bcrypt, política mínima, blocklist de senhas vazadas (haveibeenpwned API) | 🔴 |
| [ ] | 2FA para administradores | Obrigatório no painel admin/backoffice | 🔴 |
| [ ] | Proteção OWASP Top 10 | SQLi (prepared statements — já usar PDO na API PHP atual), XSS (CSP header), CSRF tokens, SSRF | 🔴 |
| [ ] | Headers de segurança | CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy | 🔴 |
| [ ] | Backups automatizados | Banco diário (retenção ≥30d), semanal off-site (S3 versionado), teste de restore documentado RPO≤24h/RTO≤4h | 🔴 |
| [ ] | Logs e monitoramento | Auditoria de acesso admin, alertas Sentry/Datadog, uptime monitoring (UptimeRobot/Better Stack) | 🔴 |
| [ ] | Gestão de segredos | Variáveis de ambiente/.env fora do Git; rotacionar chaves de API | 🔴 |
| [ ] | Pentest pré-lançamento | Teste de intrusão externo antes do go-live | 🟡 |
| [ ] | Vulnerability scanning CI | Dependabot/Snyper nas dependências JS e Composer | 🟡 |

### 4.2 Performance & Infraestrutura
| [ ] | Requisito | Meta | Prioridade |
|---|---|---|---|
| [ ] | **Core Web Vitals** | LCP ≤ 2,5s · INP ≤ 200ms · CLS ≤ 0,1 (medir via CrUX/PageSpeed Insights) | 🔴 |
| [ ] | CDN global de assets | Imagens, CSS, JS via CloudFront/Cloudflare; cache-control imutável com hash no nome | 🔴 |
| [ ] | Otimização de imagens | WebP/AVIF, srcset responsivo, lazy-load abaixo da dobra, preconnect no hero | 🔴 |
| [ ] | Cache de aplicação | Redis para sessão/cache de catálogo; HTML cacheado (edge/full-page cache para anônimos) | 🔴 |
| [ ] | Code splitting + minificação | Bundle JS por rota; tree-shaking; CSS crítico inline | 🔴 |
| [ ] | Fontes otimizadas | font-display: swap, subset, preload (Roboto já usado no projeto) | 🔴 |
| [ ] | Banco dimensionado | Índices em produtos(categoria,marca,status), pedidos(usuario_id,created_at); réplica de leitura se necessário | 🔴 |
| [ ] | Ambiente escalável | Containers/K8s ou PaaS; auto-scaling para BF; blue-green deploy | 🟡 |
| [ ] | Search e media externalizadas | Elasticsearch/Algolia; vídeos via Bunny/YouTube embed | 🟡 |
| [ ] | Acessibilidade WCAG 2.1 AA | Contraste, navegação por teclado, labels ARIA, foco visível | 🟡 |
| [ ] | Mobile-first | Responsivo completo; PWA instalável com push notification | 🟡 |

---

## 5. CONFORMIDADE LEGAL E REGULATÓRIA (BRASIL)

### 5.1 Código de Defesa do Consumidor + Marco Civil
| [ ] | Requisito | Detalhe | Prioridade |
|---|---|---|---|
| [ ] | **Identificação da empresa** | Razão social, CNPJ, endereço físico e e-mail/telefone visíveis no rodapé e no checkout | 🔴 |
| [ ] | **Direito de arrependimento (art. 49)** | 7 dias corridos pós-recebimento para compras online; fluxo de devolução com reembolso integral (inclusive frete) | 🔴 |
| [ ] | Política de trocas clara | Prazos, produtos vedados (medicamentos abertos, itens de higiene pessoal), logística reversa | 🔴 |
| [ ] | Informação de preço completa | À vista + parcelas + presença/ausência de juros (Lei 14.649/DECON); nada de "preço na loja é menor" | 🔴 |
| [ ] | Prazo de entrega informado | Estimativa contratual + aviso de atraso; multa por descumprimento configurável | 🔴 |
| [ ] | Nota Fiscal Eletrônica (NF-e) | Emissão automática para toda venda (consumidor final e destinatário contribuinte); XML disponível ao cliente | 🔴 |
| [ ] | SAC / atendimento canal direto | Exigência Decreto 11.034/2022 (horários, canais, protocolo) | 🔴 |
| [ ] | Livro de Reclamações digital | Link conforme legislação estadual aplicável | 🟢 |
| [ ] | Terms de marketplace (se houver sellers) | Responsabilidade solidária, curadoria de registros | 🟢 |
| [ ] | Conformidade Procon/consumidor.gov.br | Processo de resposta a reclamações formalizadas | 🟡 |

### 5.2 LGPD (Lei 13.709/2018)
| [ ] | Requisito | Detalhe | Prioridade |
|---|---|---|---|
| [ ] | Banner de cookies com granularidade | Aceitar/rejeitar por categoria (estritamente necessários, analytics, marketing); **sem pré-marcar**; bloqueio de scripts até consentimento | 🔴 |
| [ ] | Política de Privacidade dedicada | Base legal por tratamento, finalidade, tempo de retenção, compartilhamento com gateways/transportadoras | 🔴 |
| [ ] | Opt-in explícito de marketing | Separação de consentimentos (e-mail, SMS, WhatsApp, push); gestão de preferências na conta | 🔴 |
| [ ] | Direitos do titular | Portal para acesso, correção, portabilidade, eliminação, revogação (resposta em ≤15 dias conforme art. 18) | 🔴 |
| [ ] | Encarregado (DPO) | Nome/contato publicado; registrar no ANPD | 🔴 |
| [ ] | Minimização e anonimização | Coletar só o necessário; logs e backups com retenção definida; anonimizar conta excluída | 🔴 |
| [ ] | RIPD (Relatório de Impacto) | Documentar tratamentos de risco (dados de saúde de pets donos? histórico de compra) | 🟡 |
| [ ] | Incidente de segurança | Plano de resposta + notificação ANPD/titulares (art. 48) | 🔴 |
| [ ] | Transferência internacional | Cláusulas p/ ferramentas estrangeiras (GA4, Stripe etc.) | 🟡 |
| [ ] | Cookies de terceiros auditados | Tag governance (GTM) revisado trimestralmente | 🟡 |

### 5.3 Regulamentação Específica Pet (Anvisa / MAPA / CFMV)
| [ ] | Requisito | Detalhe | Prioridade |
|---|---|---|---|
| [ ] | **Medicamentos veterinários controlados** | Venda apenas mediante **receita veterinária** válida; fluxo de upload + validação manual antes do faturamento; registro do CRM do veterinário prescritor | 🔴 |
| [ ] | Farmacêutico/Veterinário Responsável | Exibir nome e nº de registro (CRF/CRMV) da loja na home/rodapé (exigência sanitária para farmácia veterinária); RT junto ao CRMV local | 🔴 |
| [ ] | Produtos sujeitos a receita especial | Antimicrobianos e controlados (Portarias Anvisa 344/98 correlatas): bloqueio de venda sem prescrição, rastreabilidade de lote | 🔴 |
| [ ] | Alimentos para animais (ração/petisco) | Conformidade **MAPA** (Decreto 5.053/2004 / RIISPOA): rotulagem com registro, validade, níveis de garantia; proibição de alegações terapêuticas não autorizadas | 🔴 |
| [ ] | Permissibilidade de venda online | Verificar licenças municipais/estaduais e vigilância sanitária local; AVA/CNAE adequados (4771-7/04 - pet shop online) | 🔴 |
| [ ] | Produtos de origem animal (matracas/chew treats) | SIF/SIE nº de serviço de inspeção federal/estadual no rótulo e PDP | 🟡 |
| [ ] | Publicidade (Conar + CDC) | Claims de "melhor ração" com lastro; reviews reais e identificáveis | 🔴 |
| [ ] | Adoção responsável | Lei estadual applicable; contrato de adoção, termo de guarda responsável (evitar comercialização de fauna silvestre — IBAMA) | 🟡 |
| [ ] | Impostos e ST | Configuração tributária: ICMS-ST, FCP, diferencial de alíquota no ERP/emissor | 🔴 |

---

## 6. INTEGRAÇÕES E BACK-OFFICE

| [ ] | Integração | Detalhe / Critérios de Escolha | Prioridade |
|---|---|---|---|
| [ ] | **Gateway de pagamento** | PIX + cartão + boleto: Pagar.me, Asaas, Mercado Pago, Stripe ou AppMax; suporte a **assinatura/recorrência** e split (se marketplace); antifraude embutido ou Konduto/Fortnox | 🔴 |
| [ ] | **Logística / Frete** | Melhor caminho: **Melhor Envio** ou KanguRu (multicarrier) + Correios (CWS), Jadlog, Loggi, Total Express; cálculo multi-operadora no checkout | 🔴 |
| [ ] | **Etiquetas e rastreio** | Geração de PL/etiqueta, tracking unificado (MailerLite/Gateede/Track.co) com notificações automáticas | 🔴 |
| [ ] | **ERP** | TOTVS, Omie, Bling ou Tiny: sincronizar estoque bidirecional (evitar oversell), produtos, clientes, financeiro | 🔴 |
| [ ] | **Emissor de NF-e/NFS-e** | Bling/Omie/Focus NFe integrados ao pedido aprovado; contingência e carta de correção | 🔴 |
| [ ] | **WhatsApp Business API** | Twilio/Z-API/Chatwoot/Botmaker: status do pedido, receita pendente, recuperação de carrinho, atendimento humano | 🔴 |
| [ ] | **E-mail transacional + marketing** | Resend/SES + RD Station/Brevo: automações (boas-vindas, aniversário do pet, churn de assinatura) | 🔴 |
| [ ] | **Analytics & atribuição** | GA4 + Server-side tagging, Meta Pixel/TikTok, Hotjar/Clarity, catálogo dinâmico p/ Shopping (feed XML) | 🔴 |
| [ ] | **Marketplace feeds** | Shopee/Mercado Livre/Amazon (se estratégia multicanal) via Plugg.to/Hub | 🟡 |
| [ ] | **Search service** | Algolia/Elasticsearch Typesense com sinônimos pet | 🟡 |
| [ ] | **Reviews nativo/integrado** | Trustvox, Okkervix ou módulo próprio com coleta pós-entrega | 🟡 |
| [ ] | **Agendamento de serviços** | Módulo atual (`agendamentos`) integrado a agenda de tosaidores + lembrete WhatsApp | 🟡 |
| [ ] | **Back-office/Admin** | Painel com papéis (superadmin, editor blog, atendente, farmacêutico valida receita, estoquista); fila de receitas pendentes; gestão de cupons, banners, bundles, assinaturas | 🔴 |
| [ ] | **API atual (PHP) → produção** | Migrar auth de localStorage para JWT/httpOnly cookie; validar schema.sql (usuarios, produtos, pedidos, pedidos_itens) + criar tabelas: `assinaturas`, `enderecos`, `pets`, `receitas`, `reviews`, `cupons`, `estoque_mov` | 🔴 |
| [ ] | **CI/CD** | GitHub Actions: lint, testes, deploy automatizado com rollback | 🟡 |
| [ ] | **Staging + feature flags** | Ambiente espelho com dados mascarados | 🟡 |

---

## 7. PÓS-VENDA E ATENDIMENTO

| [ ] | Canal / Ferramenta | Detalhe | Prioridade |
|---|---|---|---|
| [ ] | Chat in-app / on-site | Zendesk Chat / JivoChat / Crisp com bot de triagem (status pedido via número) | 🔴 |
| [ ] | WhatsApp oficial | Horário definido + fallback bot 24/7; SLA de resposta humana | 🔴 |
| [ ] | Central de ajuda (FAQ) | Base de conhecimento pesquisável: rastreio, troca, receita, assinatura | 🔴 |
| [ ] | Rastreamento self-service | Página "Meus pedidos" com timeline e mapa; link direto no e-mail | 🔴 |
| [ ] | Ouvidoria / Protocolos | Registro e acompanhamento de reclamações (Decreto 11.034) | 🔴 |
| [ ] | Fluxo de RMA | Abertura de troca/devolução, aprovação, etiqueta reversa, reembolso no mesmo meio (prazo máx. 7 dias p/ estorno) | 🔴 |
| [ ] | Pesquisa NPS pós-entrega | Disparo automático 3 dias após entrega; segmentar por categoria | 🟡 |
| [ ] | Gestão de avaliações | Solicitação automática + resposta a reviews negativos em 24h | 🟡 |
| [ ] | Telefone/SAC | Número fixo + celular, custos claros (Procon) | 🔴 |
| [ ] | Atendimento veterinário básico | Triagem "meu pet passou mal" com encaminhamento p/ parceiro (disclaimer legal) | 🟢 |
| [ ] | Garantia estendida / seguro de produtos | Ex.: quebrado no transporte — reposição rápida | 🟢 |
| [ ] | Playbook de incidentes | Comunicação em recall de ração (MAPA), indisponibilidade, vazamento LGPD | 🔴 |

---

## 8. RECOMENDAÇÃO DE ROADMAP (RESUMO EXECUTIVO)

| Fase | Escopo | Objetivo |
|---|---|---|
| **Fase 1 — MVP (8–12 semanas)** | Catálogo + PDP completa, busca com filtros por espécie/porte/idade, carrinho e checkout transparente (PIX/cartão/boleto), conta + endereço, NF-e, frete multicarrier, LGPD (banner + políticas), fluxo de receita veterinária, WhatsApp transacional, SSL/WAF/backups, CWV atingidos | Vender online em conformidade |
| **Fase 2 (+8 semanas)** | Assine e Economize com recorrência no gateway, reviews, cross-sell/bundles, blog + calculadora de dose, fidelidade, recuperação de carrinho, PWA, RMA self-service, agendamento de banho & tosa | Retenção e conversão |
| **Fase 3 (contínuo)** | Marketplace, busca visual, comunidade UGC, programa indicação, BI de LTV/churn, pentests periódicos | Expansão e maturidade |

> **Nota de implementação (projeto atual):** o frontend demo usa `localStorage`; o plano exige migrar autenticação, sessões e pedidos para a API PHP (`api/*.php`) sobre MySQL (`database/schema.sql`), adicionando as tabelas citadas em 6. Antes do go-live: trocar credenciais demo (admin@petamigo.com/password), ativar HTTPS real e revisar `api/helpers/auth.php` contra OWASP.
