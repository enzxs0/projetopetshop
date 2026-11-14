/* ============================================================
   api.js — Camada de comunicação com o backend PHP
   Substitui o Storage (localStorage) por chamadas HTTP
   ============================================================ */
const API = (() => {
  // Detecta automaticamente o caminho base
  // Ex: se o site está em http://localhost/petshop/, o base será /petshop/api
  const BASE = (() => {
    const path = window.location.pathname;
    // Remove "index.html" se estiver presente
    const dir = path.replace(/\/index\.html$/, '/').replace(/\/[^\/]*$/, '/');
    return dir + 'api';
  })();

  const TOKEN_KEY = 'petamigo_token';

  /* ---------- TOKEN ---------- */
  const getToken = () => localStorage.getItem(TOKEN_KEY);
  const setToken = (t) => localStorage.setItem(TOKEN_KEY, t);
  const clearToken = () => localStorage.removeItem(TOKEN_KEY);
  const temToken = () => !!getToken();

  /* ---------- REQUISIÇÃO GENÉRICA ---------- */
  const request = async (endpoint, options = {}) => {
    const headers = { 'Content-Type': 'application/json' };

    const token = getToken();
    if (token) headers['Authorization'] = 'Bearer ' + token;

    try {
      const resp = await fetch(BASE + endpoint, {
        ...options,
        headers: { ...headers, ...(options.headers || {}) }
      });

      const texto = await resp.text();
      let data;
      try {
        data = JSON.parse(texto);
      } catch (e) {
        console.error('❌ Resposta não é JSON:', texto.substring(0, 200));
        throw new Error('Resposta inválida do servidor');
      }

      if (!resp.ok || data.ok === false) {
        throw new Error(data.erro || 'Erro na requisição (' + resp.status + ')');
      }

      return data.dados !== undefined ? data.dados : data;
    } catch (e) {
      console.error('❌ API erro [' + endpoint + ']:', e.message);
      throw e;
    }
  };

  /* ============================================================
     PRODUTOS
     ============================================================ */
  const listarProdutos = () => request('/produtos.php');
  const obterProduto = (id) => request('/produtos.php?id=' + id);
  const criarProduto = (d) => request('/produtos.php', {
    method: 'POST',
    body: JSON.stringify(d)
  });
  const atualizarProduto = (id, d) => request('/produtos.php?id=' + id, {
    method: 'PUT',
    body: JSON.stringify(d)
  });
  const excluirProduto = (id) => request('/produtos.php?id=' + id, {
    method: 'DELETE'
  });

  /* ============================================================
     SERVIÇOS
     ============================================================ */
  const listarServicos = () => request('/servicos.php');
  const obterServico = (id) => request('/servicos.php?id=' + id);
  const criarServico = (d) => request('/servicos.php', {
    method: 'POST',
    body: JSON.stringify(d)
  });
  const atualizarServico = (id, d) => request('/servicos.php?id=' + id, {
    method: 'PUT',
    body: JSON.stringify(d)
  });
  const excluirServico = (id) => request('/servicos.php?id=' + id, {
    method: 'DELETE'
  });

  /* ============================================================
     PETS PARA ADOÇÃO
     ============================================================ */
  const listarPetsAdocao = () => request('/pets_adocao.php');
  const obterPetAdocao = (id) => request('/pets_adocao.php?id=' + id);
  const criarPetAdocao = (d) => request('/pets_adocao.php', {
    method: 'POST',
    body: JSON.stringify(d)
  });
  const atualizarPetAdocao = (id, d) => request('/pets_adocao.php?id=' + id, {
    method: 'PUT',
    body: JSON.stringify(d)
  });
  const excluirPetAdocao = (id) => request('/pets_adocao.php?id=' + id, {
    method: 'DELETE'
  });

  /* ============================================================
     BLOG
     ============================================================ */
  const listarPosts = () => request('/blog.php');
  const obterPost = (id) => request('/blog.php?id=' + id);
  const criarPost = (d) => request('/blog.php', {
    method: 'POST',
    body: JSON.stringify(d)
  });
  const atualizarPost = (id, d) => request('/blog.php?id=' + id, {
    method: 'PUT',
    body: JSON.stringify(d)
  });
  const excluirPost = (id) => request('/blog.php?id=' + id, {
    method: 'DELETE'
  });

  /* ============================================================
     AGENDAMENTOS
     ============================================================ */
  const listarAgendamentos = () => request('/agendamentos.php');
  const obterAgendamento = (id) => request('/agendamentos.php?id=' + id);
  const criarAgendamento = (d) => request('/agendamentos.php', {
    method: 'POST',
    body: JSON.stringify(d)
  });
  const atualizarStatusAgendamento = (id, status) => request('/agendamentos.php?id=' + id, {
    method: 'PUT',
    body: JSON.stringify({ status })
  });
  const cancelarAgendamento = (id) => request('/agendamentos.php?id=' + id, {
    method: 'DELETE'
  });

  const verificarDisponibilidade = (data, servicoId) =>
    request('/agendamentos.php?acao=disponibilidade&data=' + data + '&servico_id=' + servicoId);

  /* ============================================================
     PEDIDOS
     ============================================================ */
  const listarPedidos = () => request('/pedidos.php');
  const obterPedido = (id) => request('/pedidos.php?id=' + id);
  const criarPedido = (d) => request('/pedidos.php', {
    method: 'POST',
    body: JSON.stringify(d)
  });
  const atualizarStatusPedido = (id, status) => request('/pedidos.php?id=' + id, {
    method: 'PUT',
    body: JSON.stringify({ status })
  });

  /* ============================================================
     LOGIN / USUÁRIOS
     ============================================================ */
  const cadastrar = (d) => request('/usuarios.php?acao=cadastro', {
    method: 'POST',
    body: JSON.stringify(d)
  });

  const login = async (email, senha) => {
  const r = await request('/usuarios.php?acao=login', {
    method: 'POST',
    body: JSON.stringify({ email, senha })
  });

  // r = { token: '...', usuario: { id, nome, email, tipo } }
  if (r && r.token) {
    setToken(r.token);
    localStorage.setItem('petamigo_usuario', JSON.stringify(r.usuario));
  }

  return r.usuario || r;   // retorna o usuário (sem token, mas o token já está salvo no localStorage)
};

  const logout = async () => {
    try {
      await request('/usuarios.php?acao=logout', { method: 'POST' });
    } catch (e) {
      // Ignora erro no logout
    }
    clearToken();
    localStorage.removeItem('petamigo_usuario');
  };

  const me = () => request('/usuarios.php?acao=me');
  const getUsuario = () => {
    const u = localStorage.getItem('petamigo_usuario');
    return u ? JSON.parse(u) : null;
  };

  /* ============================================================
     HEALTH CHECK — útil para debug
     ============================================================ */
  const health = async () => {
    try {
      const r = await request('/produtos.php');
      return { ok: true, produtos: r.length };
    } catch (e) {
      return { ok: false, erro: e.message };
    }
  };

  /* ---------- API PÚBLICA ---------- */
  return {
    BASE,
    getToken, setToken, clearToken, temToken,

    // Produtos
    listarProdutos, obterProduto, criarProduto, atualizarProduto, excluirProduto,
    // Serviços
    listarServicos, obterServico, criarServico, atualizarServico, excluirServico,
    // Adoção
    listarPetsAdocao, obterPetAdocao, criarPetAdocao, atualizarPetAdocao, excluirPetAdocao,
    // Blog
    listarPosts, obterPost, criarPost, atualizarPost, excluirPost,
    // Agendamentos
    listarAgendamentos, obterAgendamento, criarAgendamento,
    atualizarStatusAgendamento, cancelarAgendamento, verificarDisponibilidade,
    // Pedidos
    listarPedidos, obterPedido, criarPedido, atualizarStatusPedido,
    // Usuários
    cadastrar, login, logout, me, getUsuario,

    // Debug
    health
  };
})();

window.API = API;
console.log('🔌 Módulo API carregado. Base:', API.BASE);