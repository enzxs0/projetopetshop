
const Paginas = (() => {

  /* ---------- HOME ---------- */
  const home = () => {
    const produtos = Storage.ler('produtos', []).slice(0, 4);
    const servicos = Storage.ler('servicos', []).slice(0, 3);
    return `
      <section class="hero">
        <div class="container">
          <h1>Bem-vindo ao PetAmigo 🐾</h1>
          <p>Seu petshop de confiança. Cuidado, carinho e qualidade para seu melhor amigo.</p>
          <div style="display: flex; gap: var(--espaco-md); justify-content: center; flex-wrap: wrap;">
            <a href="#servicos" class="btn btn--secundario btn--lg">Nossos Serviços</a>
            <a href="#produtos" class="btn btn--outline btn--lg" style="border-color: white; color: white;">Ver Produtos</a>
          </div>
        </div>
      </section>
      <section class="page-section">
        <div class="container">
          <h2 class="text-center">Por que escolher o PetAmigo?</h2>
          <div class="grid-cards">
            <div class="card" style="padding: var(--espaco-xl); text-align: center;">
              <i class="fas fa-heart" style="font-size: 3rem; color: var(--cor-destaque); margin-bottom: var(--espaco-md);"></i>
              <h3>Amor e Cuidado</h3>
              <p style="color: var(--cor-texto-suave);">Tratamos cada pet como se fosse nosso.</p>
            </div>
            <div class="card" style="padding: var(--espaco-xl); text-align: center;">
              <i class="fas fa-user-md" style="font-size: 3rem; color: var(--cor-primaria); margin-bottom: var(--espaco-md);"></i>
              <h3>Profissionais Qualificados</h3>
              <p style="color: var(--cor-texto-suave);">Equipe especializada e certificada.</p>
            </div>
            <div class="card" style="padding: var(--espaco-xl); text-align: center;">
              <i class="fas fa-clock" style="font-size: 3rem; color: var(--cor-aviso); margin-bottom: var(--espaco-md);"></i>
              <h3>Horário Flexível</h3>
              <p style="color: var(--cor-texto-suave);">Aberto de segunda a sábado, 8h às 20h.</p>
            </div>
          </div>
        </div>
      </section>
      <section class="page-section page-section--alt">
        <div class="container">
          <h2 class="text-center">Serviços em Destaque</h2>
          <div class="grid-cards">
            ${servicos.map(s => `
              <div class="card">
                <img src="${s.imagem}" alt="${Utils.sanitizar(s.nome)}" class="card__imagem" loading="lazy">
                <div class="card__conteudo">
                  <h3 class="card__titulo">${Utils.sanitizar(s.nome)}</h3>
                  <p class="card__texto">${Utils.sanitizar(s.descricao)}</p>
                  <p class="card__preco">A partir de ${Utils.formatarMoeda(Object.values(s.preco)[0])}</p>
                  <a href="#agendamento" class="btn btn--primario btn--sm" style="margin-top: var(--espaco-md);">Agendar</a>
                </div>
              </div>`).join('')}
          </div>
        </div>
      </section>
      <section class="page-section">
        <div class="container">
          <h2 class="text-center">Produtos em Destaque</h2>
          <div class="grid-cards">
            ${produtos.map(p => `
              <div class="card">
                <img src="${p.imagem}" alt="${Utils.sanitizar(p.nome)}" class="card__imagem" loading="lazy">
                <div class="card__conteudo">
                  <h3 class="card__titulo">${Utils.sanitizar(p.nome)}</h3>
                  <p class="card__texto">${Utils.sanitizar(p.marca)}</p>
                  <p class="card__preco">${Utils.formatarMoeda(p.preco)}</p>
                  <button class="btn btn--primario btn--sm" style="margin-top: var(--espaco-md);" onclick="adicionarCarrinho('${p.id}')">
                    <i class="fas fa-cart-plus" aria-hidden="true"></i> Adicionar
                  </button>
                </div>
              </div>`).join('')}
          </div>
          <div class="text-center" style="margin-top: var(--espaco-xl);">
            <a href="#produtos" class="btn btn--outline btn--lg">Ver Todos os Produtos</a>
          </div>
        </div>
      </section>
      <section class="page-section page-section--alt">
        <div class="container">
          <h2 class="text-center">O que nossos clientes dizem</h2>
          <div class="depoimentos">
            <div class="depoimento"><p class="depoimento__texto">Meu cachorro adora ir ao PetAmigo! A equipe é maravilhosa.</p><p class="depoimento__autor">— Maria Silva</p></div>
            <div class="depoimento"><p class="depoimento__texto">Produtos de qualidade e preços justos. Recomendo!</p><p class="depoimento__autor">— João Santos</p></div>
            <div class="depoimento"><p class="depoimento__texto">O melhor petshop da região. Atendimento excelente.</p><p class="depoimento__autor">— Ana Oliveira</p></div>
          </div>
        </div>
      </section>`;
  };

  /* ---------- SOBRE ---------- */
  const sobre = () => `
    <section class="hero" style="padding: var(--espaco-xl) 0;"><div class="container"><h1>Sobre o PetAmigo</h1><p>Conheça nossa história e equipe</p></div></section>
    <section class="page-section">
      <div class="container" style="max-width: 800px;">
        <h2>Nossa História</h2>
        <p style="margin: var(--espaco-md) 0; color: var(--cor-texto-suave);">O PetAmigo nasceu em 2015 da paixão de um grupo de amantes de animais. Começamos como uma pequena loja de bairro e nos tornamos referência em qualidade e atendimento.</p>
        <h2 style="margin-top: var(--espaco-2xl);">Nossa Equipe</h2>
        <div class="grid-cards">
          <div class="card" style="padding: var(--espaco-lg); text-align: center;"><i class="fas fa-user-md" style="font-size: 3rem; color: var(--cor-primaria); margin-bottom: var(--espaco-md);"></i><h3>Dra. Ana Costa</h3><p style="color: var(--cor-texto-suave);">Veterinária Chefe</p></div>
          <div class="card" style="padding: var(--espaco-lg); text-align: center;"><i class="fas fa-cut" style="font-size: 3rem; color: var(--cor-destaque); margin-bottom: var(--espaco-md);"></i><h3>Carlos Mendes</h3><p style="color: var(--cor-texto-suave);">Groomer Profissional</p></div>
          <div class="card" style="padding: var(--espaco-lg); text-align: center;"><i class="fas fa-dog" style="font-size: 3rem; color: var(--cor-aviso); margin-bottom: var(--espaco-md);"></i><h3>Pedro Alves</h3><p style="color: var(--cor-texto-suave);">Adestrador Certificado</p></div>
        </div>
        <h2 style="margin-top: var(--espaco-2xl);">Horário de Funcionamento</h2>
        <div style="background-color: var(--cor-fundo-card); padding: var(--espaco-lg); border-radius: var(--raio-md); margin-top: var(--espaco-md);">
          <p><strong>Segunda a Sexta:</strong> 8h às 20h</p>
          <p><strong>Sábado:</strong> 8h às 18h</p>
          <p><strong>Domingo:</strong> 9h às 14h</p>
        </div>
        <h2 style="margin-top: var(--espaco-2xl);">Localização</h2>
        <div class="mapa-container"><iframe src="https://www.openstreetmap.org/export/embed.html?bbox=-46.65%2C-23.56%2C-46.63%2C-23.54&layer=mapnik&marker=-23.5505,-46.6440" loading="lazy" title="Mapa"></iframe></div>
      </div>
    </section>`;

  /* ---------- SERVIÇOS ---------- */
  const servicos = () => {
    const s = Storage.ler('servicos', []);
    return `
      <section class="hero" style="padding: var(--espaco-xl) 0;"><div class="container"><h1>Nossos Serviços</h1><p>Cuidado completo para seu pet</p></div></section>
      <section class="page-section"><div class="container"><div class="grid-cards">
        ${s.map(x => `
          <div class="card">
            <img src="${x.imagem}" alt="${Utils.sanitizar(x.nome)}" class="card__imagem" loading="lazy">
            <div class="card__conteudo">
              <h3 class="card__titulo">${Utils.sanitizar(x.nome)}</h3>
              <p class="card__texto">${Utils.sanitizar(x.descricao)}</p>
              <p style="color: var(--cor-texto-suave); font-size: 0.9rem;"><i class="fas fa-clock" aria-hidden="true"></i> ${x.duracao >= 60 ? Math.floor(x.duracao/60)+'h' : x.duracao+'min'}</p>
              <div style="margin: var(--espaco-md) 0;">${Object.entries(x.preco).map(([p,v]) => `<p style="font-size: 0.9rem;"><strong>${p.charAt(0).toUpperCase()+p.slice(1)}:</strong> ${Utils.formatarMoeda(v)}</p>`).join('')}</div>
              <a href="#agendamento" class="btn btn--primario btn--sm">Agendar</a>
            </div>
          </div>`).join('')}
      </div></div></section>`;
  };

  /* ---------- PRODUTOS ---------- */
  const produtos = () => {
    const p = Storage.ler('produtos', []);
    return `
      <section class="hero" style="padding: var(--espaco-xl) 0;"><div class="container"><h1>Nossos Produtos</h1><p>Tudo que seu pet precisa</p></div></section>
      <section class="page-section"><div class="container">
        <div style="margin-bottom: var(--espaco-lg); display: flex; gap: var(--espaco-md); flex-wrap: wrap;">
          <input type="search" id="filtro-busca" placeholder="Buscar produtos..." class="form-input" style="max-width: 300px;">
          <select id="filtro-categoria" class="form-select" style="max-width: 200px;">
            <option value="">Todas categorias</option>
            <option value="racao">Ração</option>
            <option value="acessorio">Acessórios</option>
            <option value="higiene">Higiene</option>
            <option value="brinquedo">Brinquedos</option>
            <option value="petisco">Petiscos</option>
          </select>
          <select id="filtro-especie" class="form-select" style="max-width: 200px;">
            <option value="">Todas espécies</option>
            <option value="cao">Cães</option>
            <option value="gato">Gatos</option>
            <option value="ambos">Ambos</option>
          </select>
        </div>
        <div class="grid-cards" id="produtos-grid">
          ${p.map(x => `
            <div class="card produto-card" data-categoria="${x.categoria}" data-especie="${x.especie}" data-nome="${x.nome.toLowerCase()}">
              <img src="${x.imagem}" alt="${Utils.sanitizar(x.nome)}" class="card__imagem" loading="lazy">
              <div class="card__conteudo">
                <h3 class="card__titulo">${Utils.sanitizar(x.nome)}</h3>
                <p class="card__texto">${Utils.sanitizar(x.marca)}</p>
                <p class="card__preco">${Utils.formatarMoeda(x.preco)}</p>
                <p style="font-size: 0.85rem; color: ${x.estoque > 0 ? 'var(--cor-sucesso)' : 'var(--cor-erro)'};">${x.estoque > 0 ? `Em estoque: ${x.estoque}` : 'Indisponível'}</p>
                <button class="btn btn--primario btn--sm" style="margin-top: var(--espaco-md);" ${x.estoque === 0 ? 'disabled' : ''} onclick="adicionarCarrinho('${x.id}')">
                  <i class="fas fa-cart-plus" aria-hidden="true"></i> Adicionar
                </button>
              </div>
            </div>`).join('')}
        </div>
      </div></section>`;
  };

  /* ---------- ADOÇÃO ---------- */
  const adocao = () => {
    const p = Storage.ler('petsAdocao', []);
    return `
      <section class="hero" style="padding: var(--espaco-xl) 0;"><div class="container"><h1>Adote um Amigo 🐾</h1><p>Dê um lar cheio de amor</p></div></section>
      <section class="page-section"><div class="container">
        <div style="margin-bottom: var(--espaco-lg);">
          <select id="filtro-especie-adocao" class="form-select" style="max-width: 200px;">
            <option value="">Todas espécies</option>
            <option value="cao">Cães</option>
            <option value="gato">Gatos</option>
          </select>
        </div>
        <div class="grid-cards">
          ${p.map(x => `
            <div class="card pet-adocao-card" data-especie="${x.especie}">
              <img src="${x.imagem}" alt="${Utils.sanitizar(x.nome)}" class="card__imagem" loading="lazy">
              <div class="card__conteudo">
                <h3 class="card__titulo">${Utils.sanitizar(x.nome)}</h3>
                <p style="font-size: 0.9rem; color: var(--cor-texto-suave);"><i class="fas fa-paw" aria-hidden="true"></i> ${x.raca} | ${x.idade} | ${x.sexo}</p>
                <p class="card__texto">${Utils.sanitizar(x.descricao)}</p>
                <button class="btn btn--destaque btn--sm" onclick="interesseAdocao('${x.id}')"><i class="fas fa-heart" aria-hidden="true"></i> Tenho Interesse</button>
              </div>
            </div>`).join('')}
        </div>
      </div></section>`;
  };

  /* ---------- BLOG ---------- */
  const blog = () => {
    const p = Storage.ler('blog', []);
    return `
      <section class="hero" style="padding: var(--espaco-xl) 0;"><div class="container"><h1>Blog & Dicas</h1><p>Informações e cuidados</p></div></section>
      <section class="page-section"><div class="container"><div class="grid-cards">
        ${p.map(x => `
          <div class="card">
            <img src="${x.imagem}" alt="${Utils.sanitizar(x.titulo)}" class="card__imagem" loading="lazy">
            <div class="card__conteudo">
              <span style="font-size: 0.8rem; color: var(--cor-primaria); text-transform: uppercase; font-weight: 700;">${Utils.sanitizar(x.categoria)}</span>
              <h3 class="card__titulo" style="margin-top: var(--espaco-xs);">${Utils.sanitizar(x.titulo)}</h3>
              <p class="card__texto">${Utils.sanitizar(x.resumo)}</p>
              <p style="font-size: 0.85rem; color: var(--cor-texto-suave);"><i class="fas fa-user" aria-hidden="true"></i> ${Utils.sanitizar(x.autor)} | <i class="fas fa-calendar" aria-hidden="true"></i> ${Utils.formatarData(x.data)}</p>
              <button class="btn btn--outline btn--sm" style="margin-top: var(--espaco-md);" onclick="lerPost('${x.id}')">Ler mais</button>
            </div>
          </div>`).join('')}
      </div></div></section>`;
  };

  /* ---------- CONTATO ---------- */
  const contato = () => `
    <section class="hero" style="padding: var(--espaco-xl) 0;"><div class="container"><h1>Entre em Contato</h1><p>Estamos aqui para ajudar</p></div></section>
    <section class="page-section"><div class="container">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--espaco-xl);">
        <div>
          <h2>Informações</h2>
          <div style="margin-top: var(--espaco-lg);">
            <p style="margin-bottom: var(--espaco-md);"><i class="fas fa-map-marker-alt" style="color: var(--cor-primaria); margin-right: var(--espaco-sm);"></i> Rua dos Pets, 123 - São Paulo/SP</p>
            <p style="margin-bottom: var(--espaco-md);"><i class="fas fa-phone" style="color: var(--cor-primaria); margin-right: var(--espaco-sm);"></i> (11) 9999-9999</p>
            <p style="margin-bottom: var(--espaco-md);"><i class="fas fa-envelope" style="color: var(--cor-primaria); margin-right: var(--espaco-sm);"></i> contato@petamigo.com.br</p>
            <p style="margin-bottom: var(--espaco-md);"><i class="fas fa-clock" style="color: var(--cor-primaria); margin-right: var(--espaco-sm);"></i> Seg-Sáb: 8h às 20h</p>
          </div>
        </div>
        <div>
          <h2>Envie uma Mensagem</h2>
          <form id="form-contato" style="margin-top: var(--espaco-lg);">
            <div class="form-group"><label for="c-nome" class="form-label">Nome *</label><input type="text" id="c-nome" class="form-input" required></div>
            <div class="form-group"><label for="c-email" class="form-label">E-mail *</label><input type="email" id="c-email" class="form-input" required></div>
            <div class="form-group"><label for="c-tel" class="form-label">Telefone</label><input type="tel" id="c-tel" class="form-input"></div>
            <div class="form-group"><label for="c-msg" class="form-label">Mensagem *</label><textarea id="c-msg" class="form-textarea" required></textarea></div>
            <button type="submit" class="btn btn--primario btn--block">Enviar Mensagem</button>
          </form>
        </div>
      </div>
      <div class="mapa-container"><iframe src="https://www.openstreetmap.org/export/embed.html?bbox=-46.65%2C-23.56%2C-46.63%2C-23.54&layer=mapnik&marker=-23.5505,-46.6440" loading="lazy" title="Mapa"></iframe></div>
    </div></section>`;

  /* ---------- FAQ ---------- */
  const faq = () => `
    <section class="hero" style="padding: var(--espaco-xl) 0;"><div class="container"><h1>Perguntas Frequentes</h1></div></section>
    <section class="page-section"><div class="container" style="max-width: 800px;">
      ${[
        ['Quais formas de pagamento vocês aceitam?', 'Aceitamos cartões de crédito e débito, PIX, dinheiro e boleto bancário.'],
        ['Preciso agendar horário para banho e tosa?', 'Recomendamos agendar com antecedência, mas também atendemos por ordem de chegada.'],
        ['Vocês atendem emergências veterinárias?', 'Sim! Temos atendimento de emergência durante o horário de funcionamento.'],
        ['Como funciona o processo de adoção?', 'Preencha o formulário de interesse e nossa equipe entrará em contato.'],
        ['Vocês fazem entrega de produtos?', 'Sim! Entregas em toda São Paulo. Frete calculado no checkout.'],
        ['Qual a política de cancelamento?', 'Cancelamentos com até 2h de antecedência sem custos.']
      ].map(([q,a]) => `
        <div class="faq-item">
          <button class="faq-pergunta" onclick="toggleFaq(this)"><span>${q}</span><i class="fas fa-chevron-down" aria-hidden="true"></i></button>
          <div class="faq-resposta"><p>${a}</p></div>
        </div>`).join('')}
    </div></section>`;

  /* ---------- TERMOS ---------- */
  const termos = () => `
    <section class="hero" style="padding: var(--espaco-xl) 0;"><div class="container"><h1>Termos de Uso</h1><p>Última atualização: Janeiro 2024</p></div></section>
    <section class="page-section"><div class="container" style="max-width: 800px;">
      <h2>1. Aceitação dos Termos</h2><p style="margin: var(--espaco-md) 0; color: var(--cor-texto-suave);">Ao usar o site PetAmigo, você concorda com estes termos.</p>
      <h2>2. Uso do Site</h2><p style="margin: var(--espaco-md) 0; color: var(--cor-texto-suave);">Destinado ao uso pessoal e não comercial.</p>
      <h2>3. Cadastro</h2><p style="margin: var(--espaco-md) 0; color: var(--cor-texto-suave);">Você é responsável por manter a confidencialidade de suas credenciais.</p>
      <h2>4. Produtos e Serviços</h2><p style="margin: var(--espaco-md) 0; color: var(--cor-texto-suave);">Esforçamo-nos para manter informações atualizadas.</p>
      <h2>5. Agendamentos</h2><p style="margin: var(--espaco-md) 0; color: var(--cor-texto-suave);">Cancelamentos com 2h de antecedência.</p>
    </div></section>`;

  /* ---------- PRIVACIDADE ---------- */
  const privacidade = () => `
    <section class="hero" style="padding: var(--espaco-xl) 0;"><div class="container"><h1>Política de Privacidade</h1></div></section>
    <section class="page-section"><div class="container" style="max-width: 800px;">
      <h2>1. Coleta de Dados</h2><p style="margin: var(--espaco-md) 0; color: var(--cor-texto-suave);">Coletamos apenas informações fornecidas voluntariamente.</p>
      <h2>2. Uso das Informações</h2><p style="margin: var(--espaco-md) 0; color: var(--cor-texto-suave);">Para processar pedidos, agendamentos e comunicações.</p>
      <h2>3. Compartilhamento</h2><p style="margin: var(--espaco-md) 0; color: var(--cor-texto-suave);">Não vendemos seus dados a terceiros.</p>
      <h2>4. Segurança</h2><p style="margin: var(--espaco-md) 0; color: var(--cor-texto-suave);">Medidas de segurança contra acesso não autorizado.</p>
    </div></section>`;

  /* ---------- 404 ---------- */
  const erro404 = () => `
    <section class="erro-404"><div class="container">
      <div class="erro-404__numero">404</div>
      <h1>Página não encontrada</h1>
      <p class="erro-404__mensagem">Ops! Esta página se perdeu.</p>
      <a href="#home" class="btn btn--primario btn--lg"><i class="fas fa-home" aria-hidden="true"></i> Voltar para Home</a>
    </div></section>`;

  /* ---------- LOGIN ---------- */
  const login = () => `
    <section class="page-section"><div class="container" style="max-width: 500px;">
      <h1 class="text-center">Entrar</h1>
      <form id="form-login" style="margin-top: var(--espaco-xl);">
        <div class="form-group"><label for="l-email" class="form-label">E-mail *</label><input type="email" id="l-email" class="form-input" required></div>
        <div class="form-group"><label for="l-senha" class="form-label">Senha *</label><input type="password" id="l-senha" class="form-input" required></div>
        <button type="submit" class="btn btn--primario btn--block btn--lg">Entrar</button>
        <p class="text-center" style="margin-top: var(--espaco-md);"><a href="#cadastro">Criar conta</a></p>
        <div style="margin-top: var(--espaco-lg); padding: var(--espaco-md); background-color: var(--cor-fundo); border-radius: var(--raio-md); font-size: 0.9rem;">
        </div>
      </form>
    </div></section>`;

  /* ---------- CADASTRO ---------- */
  const cadastro = () => `
    <section class="page-section"><div class="container" style="max-width: 500px;">
      <h1 class="text-center">Criar Conta</h1>
      <form id="form-cadastro" style="margin-top: var(--espaco-xl);">
        <div class="form-group"><label for="c-nome" class="form-label">Nome *</label><input type="text" id="c-nome" class="form-input" required></div>
        <div class="form-group"><label for="c-email" class="form-label">E-mail *</label><input type="email" id="c-email" class="form-input" required></div>
        <div class="form-group"><label for="c-cpf" class="form-label">CPF</label><input type="text" id="c-cpf" class="form-input" placeholder="000.000.000-00"></div>
        <div class="form-group"><label for="c-tel" class="form-label">Telefone</label><input type="tel" id="c-tel" class="form-input"></div>
        <div class="form-group"><label for="c-senha" class="form-label">Senha * (mín. 6 caracteres)</label><input type="password" id="c-senha" class="form-input" required minlength="6"></div>
        <button type="submit" class="btn btn--primario btn--block btn--lg">Cadastrar</button>
        <p class="text-center" style="margin-top: var(--espaco-md);">Já tem conta? <a href="#login">Entrar</a></p>
      </form>
    </div></section>`;

  /* ---------- PERFIL ---------- */
  const perfil = () => {
    const u = Auth.getUsuario();
    if (!u) return login();
    return `
      <section class="page-section"><div class="container" style="max-width: 600px;">
        <h1>Meu Perfil</h1>
        <div class="card" style="padding: var(--espaco-lg); margin-top: var(--espaco-lg);">
          <p><strong>Nome:</strong> ${Utils.sanitizar(u.nome)}</p>
          <p><strong>E-mail:</strong> ${Utils.sanitizar(u.email)}</p>
          <p><strong>CPF:</strong> ${Utils.sanitizar(u.cpf || '—')}</p>
          <p><strong>Telefone:</strong> ${Utils.sanitizar(u.telefone || '—')}</p>
          <p><strong>Tipo:</strong> ${u.tipo === 'admin' ? 'Administrador' : 'Cliente'}</p>
        </div>
        <h2 style="margin-top: var(--espaco-2xl);">Meus Pets</h2>
        <div id="lista-pets" style="margin-top: var(--espaco-md);"></div>
        <button class="btn btn--primario mt-md" onclick="abrirFormPet()"><i class="fas fa-plus" aria-hidden="true"></i> Cadastrar Pet</button>
      </div></section>`;
  };

  /* ---------- CARRINHO ---------- */
  const carrinho = () => {
    const itens = Storage.ler('carrinho', []);
    if (itens.length === 0) return `
      <section class="page-section"><div class="container text-center">
        <h1>Seu Carrinho</h1>
        <div style="margin: var(--espaco-2xl) 0;">
          <i class="fas fa-shopping-cart" style="font-size: 5rem; color: var(--cor-borda);"></i>
          <p style="margin-top: var(--espaco-md); color: var(--cor-texto-suave);">Seu carrinho está vazio</p>
          <a href="#produtos" class="btn btn--primario btn--lg" style="margin-top: var(--espaco-lg);">Ver Produtos</a>
        </div>
      </div></section>`;

    const produtos = Storage.ler('produtos', []);
    let total = 0;
    return `
      <section class="page-section"><div class="container">
        <h1>Seu Carrinho</h1>
        <div style="margin-top: var(--espaco-xl);">
          ${itens.map(i => {
            const p = produtos.find(x => x.id === i.id);
            if (!p) return '';
            const sub = p.preco * i.quantidade;
            total += sub;
            return `
              <div class="card" style="display: flex; gap: var(--espaco-md); padding: var(--espaco-md); margin-bottom: var(--espaco-md); align-items: center; flex-wrap: wrap;">
                <img src="${p.imagem}" alt="${Utils.sanitizar(p.nome)}" style="width: 100px; height: 100px; object-fit: cover; border-radius: var(--raio-md);">
                <div style="flex: 1; min-width: 200px;"><h3 style="font-size: 1.1rem;">${Utils.sanitizar(p.nome)}</h3><p style="color: var(--cor-texto-suave);">${Utils.formatarMoeda(p.preco)}</p></div>
                <div style="display: flex; align-items: center; gap: var(--espaco-sm);">
                  <button class="btn btn--ghost btn--sm" onclick="alterarQuantidade('${i.id}', -1)">-</button>
                  <span style="font-weight: 700; min-width: 30px; text-align: center;">${i.quantidade}</span>
                  <button class="btn btn--ghost btn--sm" onclick="alterarQuantidade('${i.id}', 1)">+</button>
                </div>
                <div style="min-width: 100px; text-align: right;">
                  <p style="font-weight: 700;">${Utils.formatarMoeda(sub)}</p>
                  <button class="btn btn--ghost btn--sm" style="color: var(--cor-erro);" onclick="removerCarrinho('${i.id}')"><i class="fas fa-trash" aria-hidden="true"></i></button>
                </div>
              </div>`;
          }).join('')}
        </div>
        <div class="card" style="padding: var(--espaco-lg); margin-top: var(--espaco-xl); max-width: 400px; margin-left: auto;">
          <div style="display: flex; justify-content: space-between; margin-bottom: var(--espaco-md);"><span>Subtotal:</span><strong>${Utils.formatarMoeda(total)}</strong></div>
          <div style="display: flex; justify-content: space-between; margin-bottom: var(--espaco-lg); font-size: 1.25rem;"><span><strong>Total:</strong></span><strong style="color: var(--cor-primaria-escura);">${Utils.formatarMoeda(total)}</strong></div>
          <a href="#checkout" class="btn btn--primario btn--block btn--lg">Finalizar Compra</a>
        </div>
      </div></section>`;
  };

  /* ---------- CHECKOUT ---------- */
  const checkout = () => `
  <section class="page-section"><div class="container" style="max-width: 600px;">
    <h1>Finalizar Compra</h1>
    <form id="form-checkout" style="margin-top: var(--espaco-xl);">
      <h3 style="margin-bottom: var(--espaco-md);">Endereço de Entrega</h3>

      <div style="display: grid; grid-template-columns: 1fr 2fr; gap: var(--espaco-md);">
        <div class="form-group">
          <label for="ch-cep" class="form-label">CEP *</label>
          <input type="text" id="ch-cep" class="form-input" placeholder="00000-000" 
                 maxlength="9" required>
          <small id="ch-cep-status" style="font-size:0.8rem;color:var(--cor-texto-suave);"></small>
        </div>
        <div class="form-group" style="align-self:end;">
          <button type="button" class="btn btn--outline btn--sm" onclick="Checkout.buscarCep()">
            <i class="fas fa-search"></i> Buscar CEP
          </button>
        </div>
      </div>

      <div class="form-group">
        <label for="ch-rua" class="form-label">Rua *</label>
        <input type="text" id="ch-rua" class="form-input" required>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 2fr; gap: var(--espaco-md);">
        <div class="form-group">
          <label for="ch-num" class="form-label">Número *</label>
          <input type="text" id="ch-num" class="form-input" required>
        </div>
        <div class="form-group">
          <label for="ch-compl" class="form-label">Complemento</label>
          <input type="text" id="ch-compl" class="form-input" placeholder="Apto, bloco...">
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: var(--espaco-md);">
        <div class="form-group">
          <label for="ch-bairro" class="form-label">Bairro *</label>
          <input type="text" id="ch-bairro" class="form-input" required>
        </div>
        <div class="form-group">
          <label for="ch-cidade" class="form-label">Cidade *</label>
          <input type="text" id="ch-cidade" class="form-input" required>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 2fr; gap: var(--espaco-md);">
        <div class="form-group">
          <label for="ch-estado" class="form-label">UF *</label>
          <input type="text" id="ch-estado" class="form-input" maxlength="2" 
                 placeholder="SP" required style="text-transform:uppercase;">
        </div>
      </div>

      <h3 style="margin: var(--espaco-xl) 0 var(--espaco-md);">Pagamento</h3>
      <div class="form-group">
        <label class="form-label">Forma de Pagamento *</label>
        <div style="display: flex; flex-direction: column; gap: var(--espaco-sm);">
          <label style="display:flex;align-items:center;gap:var(--espaco-sm);cursor:pointer;">
            <input type="radio" name="pag" value="credito" required> Cartão de Crédito
          </label>
          <label style="display:flex;align-items:center;gap:var(--espaco-sm);cursor:pointer;">
            <input type="radio" name="pag" value="debito"> Cartão de Débito
          </label>
          <label style="display:flex;align-items:center;gap:var(--espaco-sm);cursor:pointer;">
            <input type="radio" name="pag" value="pix"> PIX
          </label>
        </div>
      </div>

      <button type="submit" class="btn btn--primario btn--block btn--lg" 
              style="margin-top: var(--espaco-xl);">
        <i class="fas fa-check"></i> Confirmar Pedido
      </button>
    </form>
  </div></section>`;

  /* ---------- AGENDAMENTO ---------- */
  const agendamento = () => {
  const servicos = Storage.ler('servicos', []);
  return `
    <section class="hero" style="padding: var(--espaco-xl) 0;">
      <div class="container"><h1>Agendar Serviço</h1><p>Escolha o serviço e o melhor horário</p></div>
    </section>
    <section class="page-section">
      <div class="container">
        <div class="agenda-wrapper">
          <div class="agenda-header">
            <div class="agenda-header__titulo">
              <i class="fas fa-calendar-week" aria-hidden="true"></i>
              Agenda semanal
            </div>
            <div style="min-width: 260px; flex: 1; max-width: 400px;">
              <label class="form-label" for="agenda-servico">Serviço</label>
              <select id="agenda-servico" class="form-select" onchange="Agenda.inicializar(this.value)">
                ${servicos.map(s => `<option value="${s.id}">${Utils.sanitizar(s.nome)}</option>`).join('')}
              </select>
            </div>
          </div>

          <div class="agenda-legenda">
            <div class="agenda-legenda__item"><span class="agenda-legenda__dot agenda-legenda__dot--livre"></span> Disponível</div>
            <div class="agenda-legenda__item"><span class="agenda-legenda__dot agenda-legenda__dot--parcial"></span> Parcialmente ocupado</div>
            <div class="agenda-legenda__item"><span class="agenda-legenda__dot agenda-legenda__dot--lotado"></span> Lotado</div>
            <div class="agenda-legenda__item"><span class="agenda-legenda__dot agenda-legenda__dot--passado"></span> Indisponível</div>
          </div>

          <div class="agenda-scroll">
            <div class="agenda-grade" id="agenda-grade"></div>
          </div>

          <div class="agenda-mobile" id="agenda-mobile"></div>

          <div class="agenda-resumo" id="agenda-resumo"></div>

          <p style="margin-top: var(--espaco-md); font-size: 0.85rem; color: var(--cor-texto-suave); text-align: center;">
            <i class="fas fa-info-circle"></i> Máximo de 2 pets por horário. Horários lotados ficam indisponíveis automaticamente.
          </p>
        </div>
      </div>
    </section>`;
};

  return {
    home, sobre, servicos, produtos, adocao, blog,
    contato, faq, termos, privacidade, erro404,
    login, cadastro, perfil, carrinho, checkout, agendamento
  };
})();
const politicaCookies = () => `
  <section class="hero" style="padding: var(--espaco-xl) 0;">
    <div class="container"><h1>Política de Cookies</h1><p>Última atualização: Janeiro 2024</p></div>
  </section>
  <section class="page-section"><div class="container" style="max-width: 800px;">

    <h2>1. O que são cookies?</h2>
    <p style="margin: var(--espaco-md) 0; color: var(--cor-texto-suave);">
      Cookies são pequenos arquivos de texto armazenados no seu navegador quando você visita um site. Eles permitem que o site "lembre" de suas ações e preferências por um período de tempo.
    </p>

    <h2>2. Tipos de cookies que utilizamos</h2>

    <h3 style="margin-top: var(--espaco-lg); color: var(--cor-primaria-escura);">2.1 Cookies Essenciais</h3>
    <p style="color: var(--cor-texto-suave);">Necessários para o funcionamento básico do site. Sem eles, login, carrinho de compras e agendamentos não funcionam. <strong>Não podem ser desativados.</strong></p>

    <h3 style="margin-top: var(--espaco-lg); color: var(--cor-primaria-escura);">2.2 Cookies Analíticos</h3>
    <p style="color: var(--cor-texto-suave);">Utilizamos para entender como os visitantes interagem com o site. As informações são anônimas e agregadas.</p>

    <h3 style="margin-top: var(--espaco-lg); color: var(--cor-primaria-escura);">2.3 Cookies de Marketing</h3>
    <p style="color: var(--cor-texto-suave);">Utilizados para exibir anúncios relevantes e medir campanhas. Podem ser compartilhados com parceiros de publicidade.</p>

    <h2 style="margin-top: var(--espaco-2xl);">3. Como gerenciar seus cookies</h2>
    <p style="color: var(--cor-texto-suave);">Você pode alterar suas preferências a qualquer momento clicando no botão abaixo:</p>
    <button class="btn btn--primario" style="margin-top: var(--espaco-md);" onclick="Cookies.abrirPreferencias()">
      <i class="fas fa-cog" aria-hidden="true"></i> Gerenciar preferências
    </button>

    <h2 style="margin-top: var(--espaco-2xl);">4. Cookies de terceiros</h2>
    <p style="color: var(--cor-texto-suave);">Alguns serviços incorporados (mapas, vídeos, redes sociais) podem definir seus próprios cookies. Consulte as políticas dos respectivos provedores.</p>

    <h2 style="margin-top: var(--espaco-2xl);">5. Duração dos cookies</h2>
    <ul style="color: var(--cor-texto-suave); padding-left: var(--espaco-lg);">
      <li><strong>Sessão:</strong> apagados ao fechar o navegador.</li>
      <li><strong>Persistentes:</strong> permanecem por até 12 meses.</li>
      <li><strong>Consentimento:</strong> armazenamos sua escolha por 6 meses.</li>
    </ul>

    <h2 style="margin-top: var(--espaco-2xl);">6. Seus direitos (LGPD)</h2>
    <p style="color: var(--cor-texto-suave);">Conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018), você tem direito a:</p>
    <ul style="color: var(--cor-texto-suave); padding-left: var(--espaco-lg);">
      <li>Confirmação da existência de tratamento de dados;</li>
      <li>Acesso aos dados;</li>
      <li>Correção de dados incompletos ou desatualizados;</li>
      <li>Revogação do consentimento a qualquer momento.</li>
    </ul>

    <h2 style="margin-top: var(--espaco-2xl);">7. Contato</h2>
    <p style="color: var(--cor-texto-suave);">
      Dúvidas sobre cookies e privacidade?<br>
      📧 privacidade@petamigo.com.br<br>
      📞 (11) 9999-9999
    </p>

  </div></section>`;