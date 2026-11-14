
const Admin = (() => {

  const sidebar = (ativa) => `
    <aside class="admin-sidebar">
      <h3><i class="fas fa-shield-alt" aria-hidden="true"></i> Admin</h3>
      <ul>
        <li><a href="#admin" ${ativa==='dashboard'?'aria-current="page"':''}><i class="fas fa-chart-line" aria-hidden="true"></i> Dashboard</a></li>
        <li><a href="#admin/produtos" ${ativa==='produtos'?'aria-current="page"':''}><i class="fas fa-box" aria-hidden="true"></i> Produtos</a></li>
        <li><a href="#admin/servicos" ${ativa==='servicos'?'aria-current="page"':''}><i class="fas fa-concierge-bell" aria-hidden="true"></i> Serviços</a></li>
        <li><a href="#admin/adocao" ${ativa==='adocao'?'aria-current="page"':''}><i class="fas fa-paw" aria-hidden="true"></i> Adoção</a></li>
        <li><a href="#admin/blog" ${ativa==='blog'?'aria-current="page"':''}><i class="fas fa-newspaper" aria-hidden="true"></i> Blog</a></li>
        <li><a href="#admin/usuarios" ${ativa==='usuarios'?'aria-current="page"':''}><i class="fas fa-users" aria-hidden="true"></i> Usuários</a></li>
        <li><a href="#admin/agendamentos" ${ativa==='agendamentos'?'aria-current="page"':''}><i class="fas fa-calendar" aria-hidden="true"></i> Agendamentos</a></li>
        <li><a href="#admin/pedidos" ${ativa==='pedidos'?'aria-current="page"':''}><i class="fas fa-shopping-bag" aria-hidden="true"></i> Pedidos</a></li>
      </ul>
    </aside>`;

  /* ---------- DASHBOARD ---------- */
  const dashboard = () => {
    const produtos = Storage.ler('produtos', []);
    const agendamentos = Storage.ler('agendamentos', []);
    const pedidos = Storage.ler('pedidos', []);
    const baixoEstoque = produtos.filter(p => p.estoque < 10);
    return `
      ${sidebar('dashboard')}
      <div class="admin-main">
        <h1>Dashboard</h1>
        <div class="admin-stats" style="margin-top: var(--espaco-lg);">
          <div class="stat-card"><div class="stat-card__valor">${produtos.length}</div><div class="stat-card__label">Produtos cadastrados</div></div>
          <div class="stat-card"><div class="stat-card__valor">${agendamentos.length}</div><div class="stat-card__label">Agendamentos</div></div>
          <div class="stat-card"><div class="stat-card__valor">${pedidos.length}</div><div class="stat-card__label">Pedidos</div></div>
          <div class="stat-card"><div class="stat-card__valor" style="color: ${baixoEstoque.length > 0 ? 'var(--cor-erro)' : 'var(--cor-sucesso)'};">${baixoEstoque.length}</div><div class="stat-card__label">Estoque baixo</div></div>
        </div>
        ${baixoEstoque.length > 0 ? `
          <div class="card" style="padding: var(--espaco-lg);">
            <h3><i class="fas fa-exclamation-triangle" style="color: var(--cor-aviso);" aria-hidden="true"></i> Alertas de Estoque Baixo</h3>
            <ul style="margin-top: var(--espaco-md); padding-left: var(--espaco-lg);">
              ${baixoEstoque.map(p => `<li><strong>${Utils.sanitizar(p.nome)}</strong> — ${p.estoque} unidades</li>`).join('')}
            </ul>
          </div>` : ''}
      </div>`;
  };

  /* ---------- CRUD PRODUTOS ---------- */
  const crudProdutos = () => {
    const produtos = Storage.ler('produtos', []);
    return `
      ${sidebar('produtos')}
      <div class="admin-main">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--espaco-lg);">
          <h1>Produtos</h1>
          <button class="btn btn--primario" onclick="adminFormProduto()"><i class="fas fa-plus" aria-hidden="true"></i> Novo Produto</button>
        </div>
        <div style="overflow-x: auto;">
          <table class="admin-table">
            <thead><tr><th>Nome</th><th>Categoria</th><th>Preço</th><th>Estoque</th><th>Ações</th></tr></thead>
            <tbody>
              ${produtos.map(p => `
                <tr>
                  <td>${Utils.sanitizar(p.nome)}</td>
                  <td>${Utils.sanitizar(p.categoria)}</td>
                  <td>${Utils.formatarMoeda(p.preco)}</td>
                  <td><span class="badge ${p.estoque < 10 ? 'badge--aviso' : 'badge--sucesso'}">${p.estoque}</span></td>
                  <td>
                    <button class="btn btn--ghost btn--sm" onclick="adminFormProduto('${p.id}')"><i class="fas fa-edit" aria-hidden="true"></i></button>
                    <button class="btn btn--ghost btn--sm" style="color: var(--cor-erro);" onclick="adminExcluirProduto('${p.id}')"><i class="fas fa-trash" aria-hidden="true"></i></button>
                  </td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  };

  /* ---------- CRUD SERVIÇOS ---------- */
  const crudServicos = () => {
    const servicos = Storage.ler('servicos', []);
    return `
      ${sidebar('servicos')}
      <div class="admin-main">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--espaco-lg);">
          <h1>Serviços</h1>
          <button class="btn btn--primario" onclick="adminFormServico()"><i class="fas fa-plus" aria-hidden="true"></i> Novo Serviço</button>
        </div>
        <div style="overflow-x: auto;">
          <table class="admin-table">
            <thead><tr><th>Nome</th><th>Duração</th><th>Categoria</th><th>Preço base</th><th>Ações</th></tr></thead>
            <tbody>
              ${servicos.map(s => `
                <tr>
                  <td>${Utils.sanitizar(s.nome)}</td>
                  <td>${s.duracao}min</td>
                  <td>${Utils.sanitizar(s.categoria)}</td>
                  <td>${Utils.formatarMoeda(Object.values(s.preco)[0])}</td>
                  <td>
                    <button class="btn btn--ghost btn--sm" onclick="adminFormServico('${s.id}')"><i class="fas fa-edit" aria-hidden="true"></i></button>
                    <button class="btn btn--ghost btn--sm" style="color: var(--cor-erro);" onclick="adminExcluirServico('${s.id}')"><i class="fas fa-trash" aria-hidden="true"></i></button>
                  </td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  };

  /* ---------- CRUD ADOÇÃO ---------- */
  const crudAdocao = () => {
    const pets = Storage.ler('petsAdocao', []);
    return `
      ${sidebar('adocao')}
      <div class="admin-main">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--espaco-lg);">
          <h1>Pets para Adoção</h1>
          <button class="btn btn--primario" onclick="adminFormAdocao()"><i class="fas fa-plus" aria-hidden="true"></i> Novo Pet</button>
        </div>
        <div style="overflow-x: auto;">
          <table class="admin-table">
            <thead><tr><th>Nome</th><th>Espécie</th><th>Raça</th><th>Idade</th><th>Status</th><th>Ações</th></tr></thead>
            <tbody>
              ${pets.map(p => `
                <tr>
                  <td>${Utils.sanitizar(p.nome)}</td>
                  <td>${Utils.sanitizar(p.especie)}</td>
                  <td>${Utils.sanitizar(p.raca)}</td>
                  <td>${Utils.sanitizar(p.idade)}</td>
                  <td><span class="badge badge--sucesso">Disponível</span></td>
                  <td>
                    <button class="btn btn--ghost btn--sm" onclick="adminFormAdocao('${p.id}')"><i class="fas fa-edit" aria-hidden="true"></i></button>
                    <button class="btn btn--ghost btn--sm" style="color: var(--cor-erro);" onclick="adminExcluirAdocao('${p.id}')"><i class="fas fa-trash" aria-hidden="true"></i></button>
                  </td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  };

  /* ---------- CRUD BLOG ---------- */
  const crudBlog = () => {
    const posts = Storage.ler('blog', []);
    return `
      ${sidebar('blog')}
      <div class="admin-main">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--espaco-lg);">
          <h1>Blog</h1>
          <button class="btn btn--primario" onclick="adminFormPost()"><i class="fas fa-plus" aria-hidden="true"></i> Novo Post</button>
        </div>
        <div style="overflow-x: auto;">
          <table class="admin-table">
            <thead><tr><th>Título</th><th>Autor</th><th>Categoria</th><th>Data</th><th>Ações</th></tr></thead>
            <tbody>
              ${posts.map(p => `
                <tr>
                  <td>${Utils.sanitizar(p.titulo)}</td>
                  <td>${Utils.sanitizar(p.autor)}</td>
                  <td>${Utils.sanitizar(p.categoria)}</td>
                  <td>${Utils.formatarData(p.data)}</td>
                  <td>
                    <button class="btn btn--ghost btn--sm" onclick="adminFormPost('${p.id}')"><i class="fas fa-edit" aria-hidden="true"></i></button>
                    <button class="btn btn--ghost btn--sm" style="color: var(--cor-erro);" onclick="adminExcluirPost('${p.id}')"><i class="fas fa-trash" aria-hidden="true"></i></button>
                  </td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  };

  /* ---------- USUÁRIOS ---------- */
  const crudUsuarios = () => {
    const usuarios = Storage.ler('usuarios', []);
    return `
      ${sidebar('usuarios')}
      <div class="admin-main">
        <h1>Usuários</h1>
        <div style="overflow-x: auto; margin-top: var(--espaco-lg);">
          <table class="admin-table">
            <thead><tr><th>Nome</th><th>E-mail</th><th>Tipo</th><th>CPF</th></tr></thead>
            <tbody>
              ${usuarios.map(u => `
                <tr>
                  <td>${Utils.sanitizar(u.nome)}</td>
                  <td>${Utils.sanitizar(u.email)}</td>
                  <td><span class="badge ${u.tipo === 'admin' ? 'badge--info' : 'badge--sucesso'}">${u.tipo}</span></td>
                  <td>${Utils.sanitizar(u.cpf || '—')}</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  };

  /* ---------- AGENDAMENTOS ---------- */
  const listaAgendamentos = () => {
    const ag = Storage.ler('agendamentos', []);
    return `
      ${sidebar('agendamentos')}
      <div class="admin-main">
        <h1>Agendamentos</h1>
        ${ag.length === 0 ? '<p style="margin-top: var(--espaco-lg); color: var(--cor-texto-suave);">Nenhum agendamento ainda.</p>' : `
        <div style="overflow-x: auto; margin-top: var(--espaco-lg);">
          <table class="admin-table">
            <thead><tr><th>Serviço</th><th>Data/Hora</th><th>Cliente</th><th>Status</th><th>Ações</th></tr></thead>
            <tbody>
              ${ag.map(a => `
                <tr>
                  <td>${Utils.sanitizar(a.servicoNome)}</td>
                  <td>${Utils.sanitizar(a.data)} ${Utils.sanitizar(a.horario)}</td>
                  <td>${Utils.sanitizar(a.nome)}</td>
                  <td><span class="badge badge--info">${a.status || 'pendente'}</span></td>
                  <td>
                    <button class="btn btn--ghost btn--sm" onclick="adminMudarStatusAg('${a.id}')"><i class="fas fa-check" aria-hidden="true"></i></button>
                    <button class="btn btn--ghost btn--sm" style="color: var(--cor-erro);" onclick="adminCancelarAg('${a.id}')"><i class="fas fa-times" aria-hidden="true"></i></button>
                  </td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>`}
      </div>`;
  };

  /* ---------- PEDIDOS ---------- */
  const listaPedidos = () => {
    const pedidos = Storage.ler('pedidos', []);
    return `
      ${sidebar('pedidos')}
      <div class="admin-main">
        <h1>Pedidos</h1>
        ${pedidos.length === 0 ? '<p style="margin-top: var(--espaco-lg); color: var(--cor-texto-suave);">Nenhum pedido ainda.</p>' : `
        <div style="overflow-x: auto; margin-top: var(--espaco-lg);">
          <table class="admin-table">
            <thead><tr><th>ID</th><th>Cliente</th><th>Total</th><th>Status</th><th>Data</th></tr></thead>
            <tbody>
              ${pedidos.map(p => `
                <tr>
                  <td>#${p.id.slice(-6).toUpperCase()}</td>
                  <td>${Utils.sanitizar(p.cliente)}</td>
                  <td>${Utils.formatarMoeda(p.total)}</td>
                  <td><span class="badge badge--sucesso">${p.status}</span></td>
                  <td>${Utils.formatarData(p.data)}</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>`}
      </div>`;
  };

  /* ---------- FORMULÁRIOS ---------- */
  const formProduto = (id) => {
    const produtos = Storage.ler('produtos', []);
    const p = id ? produtos.find(x => x.id === id) : null;
    UI.abrirModal(p ? 'Editar Produto' : 'Novo Produto', `
      <form id="f-produto">
        <div class="form-group"><label class="form-label">Nome *</label><input class="form-input" name="nome" value="${p ? Utils.sanitizar(p.nome) : ''}" required></div>
        <div class="form-group"><label class="form-label">Categoria *</label>
          <select class="form-select" name="categoria" required>
            ${['racao','acessorio','higiene','brinquedo','petisco','saude'].map(c => `<option value="${c}" ${p && p.categoria===c?'selected':''}>${c}</option>`).join('')}
          </select>
        </div>
        <div class="form-group"><label class="form-label">Espécie *</label>
          <select class="form-select" name="especie" required>
            ${['cao','gato','ambos'].map(e => `<option value="${e}" ${p && p.especie===e?'selected':''}>${e}</option>`).join('')}
          </select>
        </div>
        <div class="form-group"><label class="form-label">Marca</label><input class="form-input" name="marca" value="${p ? Utils.sanitizar(p.marca||'') : ''}"></div>
        <div class="form-group"><label class="form-label">Preço *</label><input type="number" step="0.01" class="form-input" name="preco" value="${p ? p.preco : ''}" required></div>
        <div class="form-group"><label class="form-label">Estoque *</label><input type="number" class="form-input" name="estoque" value="${p ? p.estoque : 0}" required></div>
        <div class="form-group"><label class="form-label">Descrição</label><textarea class="form-textarea" name="descricao">${p ? Utils.sanitizar(p.descricao||'') : ''}</textarea></div>
        <div style="display: flex; gap: var(--espaco-sm); justify-content: flex-end;">
          <button type="button" class="btn btn--ghost" onclick="UI.fecharModal()">Cancelar</button>
          <button type="submit" class="btn btn--primario">Salvar</button>
        </div>
      </form>`, true);
    setTimeout(() => {
      document.getElementById('f-produto').addEventListener('submit', (e) => {
        e.preventDefault();
        const f = e.target;
        const dados = {
          id: p ? p.id : Utils.gerarId(),
          nome: f.nome.value,
          categoria: f.categoria.value,
          especie: f.especie.value,
          marca: f.marca.value,
          preco: parseFloat(f.preco.value),
          estoque: parseInt(f.estoque.value),
          descricao: f.descricao.value,
          imagem: p ? p.imagem : `https://placehold.co/400x300/7a9e7e/fff?text=${encodeURIComponent(f.nome.value.slice(0,10))}`
        };
        const lista = Storage.ler('produtos', []);
        if (p) { const i = lista.findIndex(x => x.id === p.id); lista[i] = dados; }
        else lista.push(dados);
        Storage.salvar('produtos', lista);
        UI.fecharModal();
        UI.mostrarToast('Produto salvo!', 'sucesso');
        window.location.hash = '#admin/produtos';
      });
    }, 100);
  };

  const formServico = (id) => {
    const servicos = Storage.ler('servicos', []);
    const s = id ? servicos.find(x => x.id === id) : null;
    UI.abrirModal(s ? 'Editar Serviço' : 'Novo Serviço', `
      <form id="f-servico">
        <div class="form-group"><label class="form-label">Nome *</label><input class="form-input" name="nome" value="${s ? Utils.sanitizar(s.nome) : ''}" required></div>
        <div class="form-group"><label class="form-label">Descrição</label><textarea class="form-textarea" name="descricao">${s ? Utils.sanitizar(s.descricao||'') : ''}</textarea></div>
        <div class="form-group"><label class="form-label">Duração (minutos) *</label><input type="number" class="form-input" name="duracao" value="${s ? s.duracao : 60}" required></div>
        <div class="form-group"><label class="form-label">Categoria *</label>
          <select class="form-select" name="categoria" required>
            ${['estetica','veterinario','hospedagem','adestramento'].map(c => `<option value="${c}" ${s && s.categoria===c?'selected':''}>${c}</option>`).join('')}
          </select>
        </div>
        <div class="form-group"><label class="form-label">Preço Pequeno</label><input type="number" step="0.01" class="form-input" name="pp" value="${s && s.preco.pequeno ? s.preco.pequeno : ''}"></div>
        <div class="form-group"><label class="form-label">Preço Médio</label><input type="number" step="0.01" class="form-input" name="pm" value="${s && s.preco.medio ? s.preco.medio : ''}"></div>
        <div class="form-group"><label class="form-label">Preço Grande</label><input type="number" step="0.01" class="form-input" name="pg" value="${s && s.preco.grande ? s.preco.grande : ''}"></div>
        <div class="form-group"><label class="form-label">Preço Único (se aplicável)</label><input type="number" step="0.01" class="form-input" name="pu" value="${s && s.preco.unico ? s.preco.unico : ''}"></div>
        <div style="display: flex; gap: var(--espaco-sm); justify-content: flex-end;">
          <button type="button" class="btn btn--ghost" onclick="UI.fecharModal()">Cancelar</button>
          <button type="submit" class="btn btn--primario">Salvar</button>
        </div>
      </form>`, true);
    setTimeout(() => {
      document.getElementById('f-servico').addEventListener('submit', (e) => {
        e.preventDefault();
        const f = e.target;
        const preco = {};
        if (f.pp.value) preco.pequeno = parseFloat(f.pp.value);
        if (f.pm.value) preco.medio = parseFloat(f.pm.value);
        if (f.pg.value) preco.grande = parseFloat(f.pg.value);
        if (f.pu.value) preco.unico = parseFloat(f.pu.value);
        const dados = {
          id: s ? s.id : Utils.gerarId(),
          nome: f.nome.value,
          descricao: f.descricao.value,
          duracao: parseInt(f.duracao.value),
          categoria: f.categoria.value,
          preco,
          imagem: s ? s.imagem : `https://placehold.co/400x300/a8c5ab/2d3a2e?text=${encodeURIComponent(f.nome.value.slice(0,10))}`
        };
        const lista = Storage.ler('servicos', []);
        if (s) { const i = lista.findIndex(x => x.id === s.id); lista[i] = dados; }
        else lista.push(dados);
        Storage.salvar('servicos', lista);
        UI.fecharModal();
        UI.mostrarToast('Serviço salvo!', 'sucesso');
        window.location.hash = '#admin/servicos';
      });
    }, 100);
  };

  const formAdocao = (id) => {
    const pets = Storage.ler('petsAdocao', []);
    const p = id ? pets.find(x => x.id === id) : null;
    UI.abrirModal(p ? 'Editar Pet' : 'Novo Pet para Adoção', `
      <form id="f-adocao">
        <div class="form-group"><label class="form-label">Nome *</label><input class="form-input" name="nome" value="${p ? Utils.sanitizar(p.nome) : ''}" required></div>
        <div class="form-group"><label class="form-label">Espécie *</label>
          <select class="form-select" name="especie" required>${['cao','gato'].map(e => `<option value="${e}" ${p && p.especie===e?'selected':''}>${e}</option>`).join('')}</select>
        </div>
        <div class="form-group"><label class="form-label">Raça</label><input class="form-input" name="raca" value="${p ? Utils.sanitizar(p.raca||'') : ''}"></div>
        <div class="form-group"><label class="form-label">Idade</label><input class="form-input" name="idade" value="${p ? Utils.sanitizar(p.idade||'') : ''}"></div>
        <div class="form-group"><label class="form-label">Sexo</label>
          <select class="form-select" name="sexo">${['Macho','Fêmea'].map(s => `<option value="${s}" ${p && p.sexo===s?'selected':''}>${s}</option>`).join('')}</select>
        </div>
        <div class="form-group"><label class="form-label">Porte</label>
          <select class="form-select" name="porte">${['Pequeno','Médio','Grande'].map(s => `<option value="${s}" ${p && p.porte===s?'selected':''}>${s}</option>`).join('')}</select>
        </div>
        <div class="form-group"><label class="form-label">Descrição</label><textarea class="form-textarea" name="descricao">${p ? Utils.sanitizar(p.descricao||'') : ''}</textarea></div>
        <div style="display: flex; gap: var(--espaco-sm); justify-content: flex-end;">
          <button type="button" class="btn btn--ghost" onclick="UI.fecharModal()">Cancelar</button>
          <button type="submit" class="btn btn--primario">Salvar</button>
        </div>
      </form>`, true);
    setTimeout(() => {
      document.getElementById('f-adocao').addEventListener('submit', (e) => {
        e.preventDefault();
        const f = e.target;
        const dados = {
          id: p ? p.id : Utils.gerarId(),
          nome: f.nome.value, especie: f.especie.value, raca: f.raca.value,
          idade: f.idade.value, sexo: f.sexo.value, porte: f.porte.value,
          descricao: f.descricao.value,
          imagem: p ? p.imagem : `https://placehold.co/400x300/d4c5a9/2d3a2e?text=${encodeURIComponent(f.nome.value.slice(0,10))}`
        };
        const lista = Storage.ler('petsAdocao', []);
        if (p) { const i = lista.findIndex(x => x.id === p.id); lista[i] = dados; }
        else lista.push(dados);
        Storage.salvar('petsAdocao', lista);
        UI.fecharModal();
        UI.mostrarToast('Pet salvo!', 'sucesso');
        window.location.hash = '#admin/adocao';
      });
    }, 100);
  };

  const formPost = (id) => {
    const posts = Storage.ler('blog', []);
    const p = id ? posts.find(x => x.id === id) : null;
    UI.abrirModal(p ? 'Editar Post' : 'Novo Post', `
      <form id="f-post">
        <div class="form-group"><label class="form-label">Título *</label><input class="form-input" name="titulo" value="${p ? Utils.sanitizar(p.titulo) : ''}" required></div>
        <div class="form-group"><label class="form-label">Resumo *</label><textarea class="form-textarea" name="resumo" required>${p ? Utils.sanitizar(p.resumo||'') : ''}</textarea></div>
        <div class="form-group"><label class="form-label">Conteúdo *</label><textarea class="form-textarea" name="conteudo" style="min-height: 150px;" required>${p ? Utils.sanitizar(p.conteudo||'') : ''}</textarea></div>
        <div class="form-group"><label class="form-label">Autor *</label><input class="form-input" name="autor" value="${p ? Utils.sanitizar(p.autor||'') : ''}" required></div>
        <div class="form-group"><label class="form-label">Categoria *</label>
          <select class="form-select" name="categoria" required>${['cuidados','alimentacao','saude','adestramento'].map(c => `<option value="${c}" ${p && p.categoria===c?'selected':''}>${c}</option>`).join('')}</select>
        </div>
        <div style="display: flex; gap: var(--espaco-sm); justify-content: flex-end;">
          <button type="button" class="btn btn--ghost" onclick="UI.fecharModal()">Cancelar</button>
          <button type="submit" class="btn btn--primario">Salvar</button>
        </div>
      </form>`, true);
    setTimeout(() => {
      document.getElementById('f-post').addEventListener('submit', (e) => {
        e.preventDefault();
        const f = e.target;
        const dados = {
          id: p ? p.id : Utils.gerarId(),
          titulo: f.titulo.value, resumo: f.resumo.value, conteudo: f.conteudo.value,
          autor: f.autor.value, categoria: f.categoria.value,
          data: p ? p.data : new Date().toISOString().split('T')[0],
          imagem: p ? p.imagem : `https://placehold.co/600x400/7a9e7e/fff?text=${encodeURIComponent(f.titulo.value.slice(0,10))}`
        };
        const lista = Storage.ler('blog', []);
        if (p) { const i = lista.findIndex(x => x.id === p.id); lista[i] = dados; }
        else lista.push(dados);
        Storage.salvar('blog', lista);
        UI.fecharModal();
        UI.mostrarToast('Post salvo!', 'sucesso');
        window.location.hash = '#admin/blog';
      });
    }, 100);
  };

  /* ---------- EXCLUSÕES ---------- */
  const excluirProduto = async (id) => {
    if (!await UI.confirmar('Excluir este produto?')) return;
    Storage.salvar('produtos', Storage.ler('produtos', []).filter(x => x.id !== id));
    UI.mostrarToast('Produto excluído', 'info');
    window.location.hash = '#admin/produtos';
  };
  const excluirServico = async (id) => {
    if (!await UI.confirmar('Excluir este serviço?')) return;
    Storage.salvar('servicos', Storage.ler('servicos', []).filter(x => x.id !== id));
    UI.mostrarToast('Serviço excluído', 'info');
    window.location.hash = '#admin/servicos';
  };
  const excluirAdocao = async (id) => {
    if (!await UI.confirmar('Excluir este pet?')) return;
    Storage.salvar('petsAdocao', Storage.ler('petsAdocao', []).filter(x => x.id !== id));
    UI.mostrarToast('Pet excluído', 'info');
    window.location.hash = '#admin/adocao';
  };
  const excluirPost = async (id) => {
    if (!await UI.confirmar('Excluir este post?')) return;
    Storage.salvar('blog', Storage.ler('blog', []).filter(x => x.id !== id));
    UI.mostrarToast('Post excluído', 'info');
    window.location.hash = '#admin/blog';
  };

  /* ---------- AÇÕES AGENDAMENTOS ---------- */
  const mudarStatusAg = (id) => {
    const lista = Storage.ler('agendamentos', []);
    const i = lista.findIndex(x => x.id === id);
    if (i >= 0) {
      lista[i].status = 'confirmado';
      Storage.salvar('agendamentos', lista);
      UI.mostrarToast('Agendamento confirmado', 'sucesso');
      window.location.hash = '#admin/agendamentos';
    }
  };
  const cancelarAg = async (id) => {
    if (!await UI.confirmar('Cancelar este agendamento?')) return;
    const lista = Storage.ler('agendamentos', []);
    const i = lista.findIndex(x => x.id === id);
    if (i >= 0) {
      lista[i].status = 'cancelado';
      Storage.salvar('agendamentos', lista);
      UI.mostrarToast('Agendamento cancelado', 'info');
      window.location.hash = '#admin/agendamentos';
    }
  };

  return {
    dashboard, crudProdutos, crudServicos, crudAdocao, crudBlog,
    crudUsuarios, listaAgendamentos, listaPedidos,
    formProduto, formServico, formAdocao, formPost,
    excluirProduto, excluirServico, excluirAdocao, excluirPost,
    mudarStatusAg, cancelarAg
  };
})();