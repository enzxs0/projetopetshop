/* ============================================================
   app.js — Roteador, eventos globais e inicialização
   Versão corrigida
   ============================================================ */
const Router = (() => {
  const rotasPublicas = {
    'home': Paginas.home,
    'sobre': Paginas.sobre,
    'servicos': Paginas.servicos,
    'produtos': Paginas.produtos,
    'adocao': Paginas.adocao,
    'blog': Paginas.blog,
    'contato': Paginas.contato,
    'faq': Paginas.faq,
    'termos': Paginas.termos,
    'privacidade': Paginas.privacidade,
    'politica-cookies': Paginas.politicaCookies,
    'login': Paginas.login,
    'cadastro': Paginas.cadastro,
    'perfil': Paginas.perfil,
    'carrinho': Paginas.carrinho,
    'checkout': Paginas.checkout,
    'agendamento': Paginas.agendamento
  };

  const rotasAdmin = {
    'admin': Admin.dashboard,
    'admin/produtos': Admin.crudProdutos,
    'admin/servicos': Admin.crudServicos,
    'admin/adocao': Admin.crudAdocao,
    'admin/blog': Admin.crudBlog,
    'admin/usuarios': Admin.crudUsuarios,
    'admin/agendamentos': Admin.listaAgendamentos,
    'admin/pedidos': Admin.listaPedidos
  };

  const navegar = () => {
    const hash = window.location.hash.slice(1) || 'home';
    const main = document.getElementById('main-content');
    if (!main) return;

    // Rotas admin
    if (hash.startsWith('admin')) {
      const bloqueio = Auth.requerAdmin(hash);
      if (bloqueio) { window.location.hash = bloqueio; return; }
      const pagina = rotasAdmin[hash] || Paginas.erro404;
      main.innerHTML = '<div class="container" style="padding-top: var(--espaco-lg);"><div class="admin-layout">' + pagina() + '</div></div>';
      Header.renderizar(hash);
      window.scrollTo(0, 0);
      return;
    }

    // Rotas que exigem login
    if (hash === 'perfil') {
      const bloqueio = Auth.requerLogin(hash);
      if (bloqueio) { window.location.hash = bloqueio; return; }
    }

    const pagina = rotasPublicas[hash] || Paginas.erro404;
    main.innerHTML = pagina();
    Header.renderizar(hash);
    window.scrollTo(0, 0);
    attachPageEvents(hash);
  };

  const attachPageEvents = (rota) => {
    if (rota === 'contato') {
      const f = document.getElementById('form-contato');
      if (f) f.addEventListener('submit', (e) => {
        e.preventDefault();
        UI.mostrarToast('Mensagem enviada! Entraremos em contato.', 'sucesso');
        f.reset();
      });
    }

    if (rota === 'produtos') {
      const b = document.getElementById('filtro-busca');
      const c = document.getElementById('filtro-categoria');
      const e = document.getElementById('filtro-especie');
      const filtrar = () => {
        const t = (b ? b.value : '').toLowerCase();
        const cat = c ? c.value : '';
        const esp = e ? e.value : '';
        document.querySelectorAll('.produto-card').forEach(card => {
          const ok = (!t || card.dataset.nome.includes(t)) &&
                     (!cat || card.dataset.categoria === cat) &&
                     (!esp || card.dataset.especie === esp);
          card.style.display = ok ? 'block' : 'none';
        });
      };
      if (b) b.addEventListener('input', filtrar);
      if (c) c.addEventListener('change', filtrar);
      if (e) e.addEventListener('change', filtrar);
    }

    if (rota === 'adocao') {
      const e = document.getElementById('filtro-especie-adocao');
      if (e) e.addEventListener('change', () => {
        const v = e.value;
        document.querySelectorAll('.pet-adocao-card').forEach(c => {
          c.style.display = (!v || c.dataset.especie === v) ? 'block' : 'none';
        });
      });
    }

    if (rota === 'login') {
      const f = document.getElementById('form-login');
      if (f) f.addEventListener('submit', (e) => {
        e.preventDefault();
        const r = Auth.login(
          document.getElementById('l-email').value,
          document.getElementById('l-senha').value
        );
        if (r.ok) {
          UI.mostrarToast('Bem-vindo, ' + r.usuario.nome + '!', 'sucesso');
          window.location.hash = r.usuario.tipo === 'admin' ? '#admin' : '#home';
        } else {
          UI.mostrarToast(r.msg, 'erro');
        }
      });
    }

    if (rota === 'cadastro') {
      const f = document.getElementById('form-cadastro');
      if (f) f.addEventListener('submit', (e) => {
        e.preventDefault();
        const r = Auth.cadastrar({
          nome: document.getElementById('c-nome').value,
          email: document.getElementById('c-email').value,
          cpf: document.getElementById('c-cpf').value,
          telefone: document.getElementById('c-tel').value,
          senha: document.getElementById('c-senha').value
        });
        UI.mostrarToast(r.msg, r.ok ? 'sucesso' : 'erro');
        if (r.ok) setTimeout(() => window.location.hash = '#login', 1000);
      });
    }

    if (rota === 'checkout') {
      const f = document.getElementById('form-checkout');
      if (f) f.addEventListener('submit', (e) => {
        e.preventDefault();
        const carrinho = Storage.ler('carrinho', []);
        const produtos = Storage.ler('produtos', []);
        let total = 0;
        carrinho.forEach(i => {
          const p = produtos.find(x => x.id === i.id);
          if (p) total += p.preco * i.quantidade;
        });
        const u = Auth.getUsuario();
        const pedido = {
          id: Utils.gerarId(),
          cliente: u ? u.nome : 'Convidado',
          total: total,
          status: 'pago',
          endereco: document.getElementById('ch-rua').value + ', ' +
                    document.getElementById('ch-num').value + ' - ' +
                    document.getElementById('ch-bairro').value,
          pagamento: (document.querySelector('input[name="pag"]:checked') || {}).value,
          data: new Date().toISOString()
        };
        const pedidos = Storage.ler('pedidos', []);
        pedidos.push(pedido);
        Storage.salvar('pedidos', pedidos);
        Storage.salvar('carrinho', []);
        UI.mostrarToast('Pedido finalizado com sucesso!', 'sucesso');
        setTimeout(() => window.location.hash = '#home', 1500);
      });
    }

    if (rota === 'agendamento') {
      setTimeout(() => {
        if (typeof Agenda !== 'undefined' && Agenda.inicializar) {
          Agenda.inicializar();
        } else {
          console.warn('⚠️ Agenda não carregado');
        }
      }, 100);
    }
  };

  

  const iniciar = () => {
    window.addEventListener('hashchange', navegar);
    navegar();
  };

  return { iniciar, navegar };
})();

/* ============================================================
   FUNÇÕES GLOBAIS (onclick inline)
   ============================================================ */

window.adicionarCarrinho = (id) => {
  const produtos = Storage.ler('produtos', []);
  const p = produtos.find(x => x.id === id);
  if (!p || p.estoque === 0) { UI.mostrarToast('Produto indisponível', 'erro'); return; }
  const carrinho = Storage.ler('carrinho', []);
  const item = carrinho.find(i => i.id === id);
  if (item) {
    if (item.quantidade < p.estoque) item.quantidade++;
    else { UI.mostrarToast('Estoque máximo atingido', 'aviso'); return; }
  } else {
    carrinho.push({ id: id, quantidade: 1 });
  }
  Storage.salvar('carrinho', carrinho);
  UI.mostrarToast(p.nome + ' adicionado', 'sucesso');
  Header.renderizar(window.location.hash.slice(1) || 'home');
};

window.alterarQuantidade = (id, d) => {
  const carrinho = Storage.ler('carrinho', []);
  const item = carrinho.find(i => i.id === id);
  if (!item) return;
  const p = Storage.ler('produtos', []).find(x => x.id === id);
  item.quantidade += d;
  if (item.quantidade <= 0) {
    const i = carrinho.findIndex(x => x.id === id);
    carrinho.splice(i, 1);
  } else if (p && item.quantidade > p.estoque) {
    item.quantidade = p.estoque;
    UI.mostrarToast('Estoque máximo', 'aviso');
  }
  Storage.salvar('carrinho', carrinho);
  window.location.hash = '#carrinho';
};

window.removerCarrinho = (id) => {
  Storage.salvar('carrinho', Storage.ler('carrinho', []).filter(i => i.id !== id));
  UI.mostrarToast('Item removido', 'info');
  window.location.hash = '#carrinho';
};

window.interesseAdocao = (id) => {
  const pets = Storage.ler('petsAdocao', []);
  const p = pets.find(x => x.id === id);
  if (!p) return;

  let html = '';
  html += '<p style="margin-bottom: var(--espaco-lg);">Interesse em adotar <strong>' + Utils.sanitizar(p.nome) + '</strong>?</p>';
  html += '<form id="f-adocao-interesse">';
  html += '<div class="form-group"><label class="form-label">Nome *</label><input class="form-input" required></div>';
  html += '<div class="form-group"><label class="form-label">E-mail *</label><input type="email" class="form-input" required></div>';
  html += '<div class="form-group"><label class="form-label">Telefone *</label><input type="tel" class="form-input" required></div>';
  html += '<div class="form-group"><label class="form-label">Por que deseja adotar?</label><textarea class="form-textarea"></textarea></div>';
  html += '<div style="display:flex;gap:.5rem;justify-content:flex-end;">';
  html += '<button type="button" class="btn btn--ghost" data-fechar-modal>Cancelar</button>';
  html += '<button type="submit" class="btn btn--destaque">Enviar Interesse</button>';
  html += '</div>';
  html += '</form>';

  UI.abrirModal('Interesse em Adoção', html);

  setTimeout(() => {
    const form = document.getElementById('f-adocao-interesse');
    if (form) form.addEventListener('submit', (e) => {
      e.preventDefault();
      UI.fecharModal();
      UI.mostrarToast('Interesse em ' + p.nome + ' registrado!', 'sucesso');
    });
  }, 100);
};

window.lerPost = (id) => {
  const p = Storage.ler('blog', []).find(x => x.id === id);
  if (!p) return;

  let html = '';
  html += '<img src="' + p.imagem + '" alt="' + Utils.sanitizar(p.titulo) + '" style="width:100%;border-radius:var(--raio-md);margin-bottom:var(--espaco-md);">';
  html += '<p style="font-size:.9rem;color:var(--cor-texto-suave);margin-bottom:var(--espaco-md);">';
  html += '<i class="fas fa-user"></i> ' + Utils.sanitizar(p.autor) + ' | ';
  html += '<i class="fas fa-calendar"></i> ' + Utils.formatarData(p.data);
  html += '</p>';
  html += '<p>' + Utils.sanitizar(p.conteudo) + '</p>';
  html += '<div style="margin-top:var(--espaco-lg);text-align:right;">';
  html += '<button type="button" class="btn btn--primario" data-fechar-modal>Fechar</button>';
  html += '</div>';

  UI.abrirModal(p.titulo, html, true);
};

window.toggleFaq = (btn) => btn.parentElement.classList.toggle('faq-item--ativo');

window.abrirFormPet = () => {
  let html = '';
  html += '<form id="f-pet">';
  html += '<div class="form-group"><label class="form-label">Nome *</label><input class="form-input" name="nome" required></div>';
  html += '<div class="form-group"><label class="form-label">Espécie</label><input class="form-input" name="especie"></div>';
  html += '<div class="form-group"><label class="form-label">Raça</label><input class="form-input" name="raca"></div>';
  html += '<div class="form-group"><label class="form-label">Idade</label><input class="form-input" name="idade"></div>';
  html += '<div class="form-group"><label class="form-label">Peso (kg)</label><input type="number" step="0.1" class="form-input" name="peso"></div>';
  html += '<div class="form-group"><label class="form-label">Alergias</label><textarea class="form-textarea" name="alergias"></textarea></div>';
  html += '<div style="display:flex;gap:.5rem;justify-content:flex-end;">';
  html += '<button type="button" class="btn btn--ghost" data-fechar-modal>Cancelar</button>';
  html += '<button type="submit" class="btn btn--primario">Salvar</button>';
  html += '</div>';
  html += '</form>';

  UI.abrirModal('Cadastrar Pet', html);

  setTimeout(() => {
    const form = document.getElementById('f-pet');
    if (form) form.addEventListener('submit', (e) => {
      e.preventDefault();
      const f = e.target;
      const pets = Storage.ler('petsCliente', []);
      const u = Auth.getUsuario();
      pets.push({
        id: Utils.gerarId(),
        usuarioId: u ? u.id : null,
        nome: f.nome.value,
        especie: f.especie.value,
        raca: f.raca.value,
        idade: f.idade.value,
        peso: f.peso.value,
        alergias: f.alergias.value
      });
      Storage.salvar('petsCliente', pets);
      UI.fecharModal();
      UI.mostrarToast('Pet cadastrado!', 'sucesso');
      window.location.hash = '#perfil';
    });
  }, 100);
};

/* Admin exposto globalmente */
window.adminFormProduto = (id) => Admin.formProduto(id);
window.adminExcluirProduto = (id) => Admin.excluirProduto(id);
window.adminFormServico = (id) => Admin.formServico(id);
window.adminExcluirServico = (id) => Admin.excluirServico(id);
window.adminFormAdocao = (id) => Admin.formAdocao(id);
window.adminExcluirAdocao = (id) => Admin.excluirAdocao(id);
window.adminFormPost = (id) => Admin.formPost(id);
window.adminExcluirPost = (id) => Admin.excluirPost(id);
window.adminMudarStatusAg = (id) => Admin.mudarStatusAg(id);
window.adminCancelarAg = (id) => Admin.cancelarAg(id);

/* ============================================================
   INICIALIZAÇÃO
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  UI.carregarTema();
  Seed.inicializar();
  Footer.renderizar();

  if (typeof Cookies !== 'undefined' && Cookies.inicializar) {
    Cookies.inicializar();
  }

  Router.iniciar();

  // ============================================================
  // FECHAR MODAL — listener global
  // ============================================================
  const overlay = document.getElementById('modal-overlay');

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      const alvoFechar = e.target.closest('.modal__fechar') ||
                         e.target.closest('[data-fechar-modal]');

      if (alvoFechar) {
        e.preventDefault();
        e.stopPropagation();
        UI.fecharModal();
        return;
      }

      if (e.target === overlay) {
        UI.fecharModal();
      }
    });
  }

  // Fecha com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') UI.fecharModal();
  });

  console.log('🐾 PetAmigo v2.0 carregado');
  console.log('📋 Admin: admin@petamigo.com / admin123');
  console.log('📋 Cliente: cliente@petamigo.com / cliente123');
});