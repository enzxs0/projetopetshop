
const Storage = (() => {
  const PREFIX = 'petamigo_';

  const salvar = (chave, dados) => {
    try { localStorage.setItem(PREFIX + chave, JSON.stringify(dados)); return true; }
    catch (e) { console.error('Erro ao salvar:', e); return false; }
  };

  const ler = (chave, padrao = null) => {
    try {
      const item = localStorage.getItem(PREFIX + chave);
      return item ? JSON.parse(item) : padrao;
    } catch (e) { return padrao; }
  };

  const remover = (chave) => localStorage.removeItem(PREFIX + chave);

  const limpar = () => Object.keys(localStorage)
    .filter(k => k.startsWith(PREFIX))
    .forEach(k => localStorage.removeItem(k));

  return { salvar, ler, remover, limpar };
})();