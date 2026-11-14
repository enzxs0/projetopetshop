
const Auth = (() => {
  const cadastrar = (dados) => {
    if (!Utils.validarEmail(dados.email)) return { ok: false, msg: 'E-mail inválido' };
    if (!Utils.validarSenha(dados.senha)) return { ok: false, msg: 'Senha deve ter no mínimo 6 caracteres' };
    const usuarios = Storage.ler('usuarios', []);
    if (usuarios.some(u => u.email === dados.email)) return { ok: false, msg: 'E-mail já cadastrado' };

    const novo = {
      id: Utils.gerarId(),
      nome: dados.nome,
      email: dados.email,
      senha_hash: Utils.hashSimulado(dados.senha),
      cpf: dados.cpf || '',
      telefone: dados.telefone || '',
      tipo: 'cliente',
      created_at: new Date().toISOString()
    };
    usuarios.push(novo);
    Storage.salvar('usuarios', usuarios);
    return { ok: true, msg: 'Cadastro realizado com sucesso!' };
  };

  const login = (email, senha) => {
    const usuarios = Storage.ler('usuarios', []);
    const hash = Utils.hashSimulado(senha);
    const u = usuarios.find(x => x.email === email && x.senha_hash === hash);
    if (!u) return { ok: false, msg: 'E-mail ou senha incorretos' };
    Storage.salvar('usuarioLogado', u);
    return { ok: true, usuario: u };
  };

  const logout = () => {
    Storage.remover('usuarioLogado');
    UI.mostrarToast('Você saiu da sua conta', 'info');
  };

  const getUsuario = () => Storage.ler('usuarioLogado');
  const isAdmin = () => { const u = getUsuario(); return u && u.tipo === 'admin'; };

  const requerLogin = () => {
    if (!getUsuario()) {
      UI.mostrarToast('Faça login para acessar esta área', 'aviso');
      return '#login';
    }
    return null;
  };

  const requerAdmin = () => {
    if (!getUsuario()) {
      UI.mostrarToast('Faça login para acessar', 'aviso');
      return '#login';
    }
    if (!isAdmin()) {
      UI.mostrarToast('Acesso restrito a administradores', 'erro');
      return '#home';
    }
    return null;
  };

  return { cadastrar, login, logout, getUsuario, isAdmin, requerLogin, requerAdmin };
})();