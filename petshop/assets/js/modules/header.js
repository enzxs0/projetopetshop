
const Header = (() => {
  const menuItems = [
    { label: 'Home', rota: 'home' },
    { label: 'Sobre', rota: 'sobre' },
    { label: 'Serviços', rota: 'servicos' },
    { label: 'Produtos', rota: 'produtos' },
    { label: 'Adoção', rota: 'adocao' },
    { label: 'Blog', rota: 'blog' },
    { label: 'Contato', rota: 'contato' }
  ];

  const renderizar = (rotaAtual) => {
    const header = document.getElementById('header');
    if (!header) return;

    const carrinho = Storage.ler('carrinho', []);
    const totalItens = carrinho.reduce((s, i) => s + i.quantidade, 0);
    const usuario = Auth.getUsuario();
    const temaAtual = document.documentElement.getAttribute('data-tema');

    header.innerHTML = `
      <div class="container header__container">
        <a href="#home" class="header__logo" aria-label="PetAmigo - Página inicial">
          <i class="fas fa-paw" aria-hidden="true"></i>
          <span>PetAmigo</span>
        </a>
        <nav class="header__nav" aria-label="Menu principal">
          <ul class="header__menu" id="header-menu" role="menubar">
            ${menuItems.map(i => `<li role="none"><a href="#${i.rota}" role="menuitem" ${i.rota === rotaAtual ? 'aria-current="page"' : ''}>${i.label}</a></li>`).join('')}
            ${usuario && usuario.tipo === 'admin' ? `<li role="none"><a href="#admin" role="menuitem" ${rotaAtual === 'admin' ? 'aria-current="page"' : ''} style="color: var(--cor-destaque);">Admin</a></li>` : ''}
          </ul>
        </nav>
        <div class="header__acoes">
          <button class="header__btn" id="btn-tema" aria-label="Alternar tema">
            <i class="fas fa-${temaAtual === 'escuro' ? 'sun' : 'moon'}" aria-hidden="true"></i>
          </button>
          <a href="#carrinho" class="header__btn" aria-label="Carrinho">
            <i class="fas fa-shopping-cart" aria-hidden="true"></i>
            ${totalItens > 0 ? `<span class="header__carrinho-contador">${totalItens}</span>` : ''}
          </a>
          ${usuario
            ? `<a href="#perfil" class="header__btn" aria-label="Perfil"><i class="fas fa-user" aria-hidden="true"></i></a>
               <button class="header__btn" id="btn-logout" aria-label="Sair"><i class="fas fa-sign-out-alt" aria-hidden="true"></i></button>`
            : `<a href="#login" class="btn btn--primario btn--sm">Entrar</a>`
          }
          <button class="header__hamburguer" id="btn-hamburguer" aria-label="Abrir menu" aria-expanded="false">
            <i class="fas fa-bars" aria-hidden="true"></i>
          </button>
        </div>
      </div>`;

    const btnH = document.getElementById('btn-hamburguer');
    const menu = document.getElementById('header-menu');
    if (btnH && menu) btnH.addEventListener('click', () => {
      const a = menu.classList.toggle('header__menu--ativo');
      btnH.setAttribute('aria-expanded', a);
    });

    const btnT = document.getElementById('btn-tema');
    if (btnT) btnT.addEventListener('click', () => {
      const n = UI.toggleTema();
      btnT.querySelector('i').className = `fas fa-${n === 'escuro' ? 'sun' : 'moon'}`;
    });

    const btnL = document.getElementById('btn-logout');
    if (btnL) btnL.addEventListener('click', () => {
      Auth.logout();
      window.location.hash = '#home';
    });
  };

  return { renderizar };
})();