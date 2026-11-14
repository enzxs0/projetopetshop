
const Utils = (() => {
  const formatarMoeda = (v) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v || 0);

  const formatarData = (d) =>
    new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

  const formatarDataHora = (d) =>
    new Date(d).toLocaleString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });

  const sanitizar = (t) => {
    const d = document.createElement('div');
    d.textContent = t;
    return d.innerHTML;
  };

  const gerarId = () =>
    Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

  const validarEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const validarCPF = (cpf) => {
    const n = cpf.replace(/\D/g, '');
    if (n.length !== 11 || /^(\d)\1+$/.test(n)) return false;
    let s = 0;
    for (let i = 0; i < 9; i++) s += parseInt(n[i]) * (10 - i);
    let r = (s * 10) % 11;
    if (r === 10) r = 0;
    if (r !== parseInt(n[9])) return false;
    s = 0;
    for (let i = 0; i < 10; i++) s += parseInt(n[i]) * (11 - i);
    r = (s * 10) % 11;
    if (r === 10) r = 0;
    return r === parseInt(n[10]);
  };

  const validarSenha = (s) => s && s.length >= 6;

  const hashSimulado = (s) =>
    'hash_' + btoa(unescape(encodeURIComponent(s))).split('').reverse().join('');

  const debounce = (fn, d = 300) => {
    let t;
    return (...a) => {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, a), d);
    };
  };

  return {
    formatarMoeda, formatarData, formatarDataHora,
    sanitizar, gerarId, validarEmail, validarCPF,
    validarSenha, hashSimulado, debounce
  };
})();