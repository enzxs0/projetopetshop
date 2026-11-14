
const UI = (() => {
  const mostrarToast = (msg, tipo = 'sucesso', dur = 3000) => {
    const c = document.getElementById('toast-container');
    if (!c) return;
    const t = document.createElement('div');
    t.className = `toast toast--${tipo}`;
    const icons = {
      sucesso: 'check-circle', erro: 'exclamation-circle',
      aviso: 'exclamation-triangle', info: 'info-circle'
    };
    t.innerHTML = `<i class="fas fa-${icons[tipo] || 'info-circle'}" aria-hidden="true"></i><span>${Utils.sanitizar(msg)}</span>`;
    c.appendChild(t);
    setTimeout(() => {
      t.style.opacity = '0';
      t.style.transform = 'translateX(100%)';
      setTimeout(() => t.remove(), 300);
    }, dur);
  };

  const abrirModal = (titulo, html, grande = false) => {
    const o = document.getElementById('modal-overlay');
    const b = document.getElementById('modal-box');
    document.getElementById('modal-titulo').textContent = titulo;
    document.getElementById('modal-conteudo').innerHTML = html;
    b.classList.toggle('modal--lg', grande);
    o.classList.add('modal-overlay--ativo');
    document.body.style.overflow = 'hidden';
  };

  const fecharModal = () => {
    document.getElementById('modal-overlay').classList.remove('modal-overlay--ativo');
    document.body.style.overflow = '';
  };

  const confirmar = (msg) => {
    return new Promise((resolve) => {
      abrirModal('Confirmação', `
        <p style="margin-bottom: var(--espaco-lg);">${Utils.sanitizar(msg)}</p>
        <div style="display: flex; gap: var(--espaco-sm); justify-content: flex-end;">
          <button type="button" class="btn btn--ghost" id="modal-nao">Não</button>
          <button type="button" class="btn btn--primario" id="modal-sim">Sim</button>
        </div>`);
      setTimeout(() => {
        document.getElementById('modal-nao')?.addEventListener('click', () => { fecharModal(); resolve(false); });
        document.getElementById('modal-sim')?.addEventListener('click', () => { fecharModal(); resolve(true); });
      }, 50);
    });
  };

  const toggleTema = () => {
    const a = document.documentElement.getAttribute('data-tema');
    const n = a === 'escuro' ? 'claro' : 'escuro';
    document.documentElement.setAttribute('data-tema', n);
    Storage.salvar('tema', n);
    return n;
  };

  const carregarTema = () => {
    const t = Storage.ler('tema', 'claro');
    document.documentElement.setAttribute('data-tema', t);
  };

  document.addEventListener('DOMContentLoaded', () => {
  UI.carregarTema();
  Seed.inicializar();
  Footer.renderizar();
  Cookies.inicializar();
  Router.iniciar();

  // ============================================================
  // Fechar modal clicando no overlay (fora da caixa)
  // ============================================================
  const overlay = document.getElementById('modal-overlay');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        UI.fecharModal();
      }
    });
  }

  // ============================================================
  // Fechar modal com a tecla ESC
  // ============================================================
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      UI.fecharModal();
    }
  });
});


  return { mostrarToast, abrirModal, fecharModal, confirmar, toggleTema, carregarTema };
})();