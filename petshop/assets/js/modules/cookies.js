/* ============================================================
   cookies.js — Gestão de consentimento de cookies (LGPD)
   Versão corrigida
   ============================================================ */
const Cookies = (() => {
  const VERSAO = '1.0';

  const lerConsentimento = () => Storage.ler('cookiesConsent', null);

  const jaConsentiu = () => {
    const c = lerConsentimento();
    return c && c.versao === VERSAO;
  };

  const salvarConsentimento = (prefs) => {
    const dados = {
      essenciais: true,
      analiticos: !!prefs.analiticos,
      marketing: !!prefs.marketing,
      versao: VERSAO,
      data: new Date().toISOString()
    };
    Storage.salvar('cookiesConsent', dados);
    return dados;
  };

  const aceitarTodos = () => salvarConsentimento({ analiticos: true, marketing: true });
  const recusarTodos = () => salvarConsentimento({ analiticos: false, marketing: false });

  /* ---------- FECHAR BANNER ---------- */
  const fecharBanner = () => {
    const b = document.getElementById('cookies-banner');
    if (!b) return;
    b.classList.remove('cookies-banner--visivel');
    setTimeout(() => {
      if (b.parentNode) b.parentNode.removeChild(b);
    }, 400);
  };

  /* ---------- MOSTRAR BANNER ---------- */
  const mostrarBanner = () => {
    if (jaConsentiu()) return;
    if (document.getElementById('cookies-banner')) return; // já está aberto

    const banner = document.createElement('div');
    banner.className = 'cookies-banner';
    banner.id = 'cookies-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Aviso de cookies');
    banner.innerHTML =
      '<div class="cookies-banner__container">' +
        '<i class="fas fa-cookie-bite cookies-banner__icone" aria-hidden="true"></i>' +
        '<div class="cookies-banner__texto">' +
          '<h3>🍪 Nós usamos cookies</h3>' +
          '<p>Utilizamos cookies para melhorar sua experiência. Ao continuar, você concorda com nossa ' +
            '<a href="#politica-cookies">Política de Cookies</a>.</p>' +
        '</div>' +
        '<div class="cookies-banner__acoes">' +
          '<button type="button" class="btn btn--ghost btn--sm" id="ck-recusar">Recusar</button>' +
          '<button type="button" class="btn btn--outline btn--sm" id="ck-prefs">Preferências</button>' +
          '<button type="button" class="btn btn--primario btn--sm" id="ck-aceitar">Aceitar todos</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(banner);

    // Animação de entrada
    requestAnimationFrame(() => {
      banner.classList.add('cookies-banner--visivel');
    });

    // ============================================================
    // LISTENERS — capturam clique de forma robusta
    // ============================================================
    const btnAceitar = document.getElementById('ck-aceitar');
    const btnRecusar = document.getElementById('ck-recusar');
    const btnPrefs = document.getElementById('ck-prefs');

    if (btnAceitar) {
      btnAceitar.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        aceitarTodos();
        fecharBanner();
        if (window.UI && UI.mostrarToast) {
          UI.mostrarToast('Cookies aceitos. Obrigado!', 'sucesso');
        }
        aplicarConsentimento();
      });
    }

    if (btnRecusar) {
      btnRecusar.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        recusarTodos();
        fecharBanner();
        if (window.UI && UI.mostrarToast) {
          UI.mostrarToast('Cookies recusados.', 'info');
        }
        aplicarConsentimento();
      });
    }

    if (btnPrefs) {
      btnPrefs.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        abrirPreferencias();
      });
    }
  };

  /* ---------- MODAL DE PREFERÊNCIAS ---------- */
  const abrirPreferencias = () => {
    if (!window.UI || !UI.abrirModal) {
      console.error('❌ UI.abrirModal não disponível');
      return;
    }

    const atual = lerConsentimento() || { analiticos: false, marketing: false };

    let html = '';
    html += '<p style="color: var(--cor-texto-suave); margin-bottom: var(--espaco-md);">';
    html += 'Escolha quais categorias de cookies você permite. Os cookies essenciais não podem ser desativados.';
    html += '</p>';
    html += '<div class="cookies-prefs">';

    // Essenciais (sempre ativo)
    html += '<div class="cookies-prefs__item">';
    html += '<div class="cookies-prefs__cabecalho">';
    html += '<div class="cookies-prefs__titulo">Cookies Essenciais <span class="cookies-badge">Sempre ativo</span></div>';
    html += '<label class="cookies-toggle"><input type="checkbox" checked disabled><span class="cookies-toggle__slider"></span></label>';
    html += '</div>';
    html += '<p class="cookies-prefs__descricao">Necessários para login, carrinho e segurança.</p>';
    html += '</div>';

    // Analíticos
    html += '<div class="cookies-prefs__item">';
    html += '<div class="cookies-prefs__cabecalho">';
    html += '<div class="cookies-prefs__titulo">Cookies Analíticos</div>';
    html += '<label class="cookies-toggle"><input type="checkbox" id="ck-analiticos" ' + (atual.analiticos ? 'checked' : '') + '><span class="cookies-toggle__slider"></span></label>';
    html += '</div>';
    html += '<p class="cookies-prefs__descricao">Ajudam a entender como os visitantes usam o site.</p>';
    html += '</div>';

    // Marketing
    html += '<div class="cookies-prefs__item">';
    html += '<div class="cookies-prefs__cabecalho">';
    html += '<div class="cookies-prefs__titulo">Cookies de Marketing</div>';
    html += '<label class="cookies-toggle"><input type="checkbox" id="ck-marketing" ' + (atual.marketing ? 'checked' : '') + '><span class="cookies-toggle__slider"></span></label>';
    html += '</div>';
    html += '<p class="cookies-prefs__descricao">Usados para anúncios e campanhas.</p>';
    html += '</div>';

    html += '</div>'; // fecha cookies-prefs
    html += '<div style="display: flex; gap: var(--espaco-sm); justify-content: space-between; flex-wrap: wrap;">';
    html += '<button type="button" class="btn btn--ghost" id="ck-recusar-modal">Recusar todos</button>';
    html += '<div style="display: flex; gap: var(--espaco-sm);">';
    html += '<button type="button" class="btn btn--outline" id="ck-cancelar">Cancelar</button>';
    html += '<button type="button" class="btn btn--primario" id="ck-salvar">Salvar preferências</button>';
    html += '</div>';
    html += '</div>';

    UI.abrirModal('Preferências de Cookies', html, true);

    setTimeout(() => {
      const btnSalvar = document.getElementById('ck-salvar');
      const btnRecusar = document.getElementById('ck-recusar-modal');
      const btnCancelar = document.getElementById('ck-cancelar');

      if (btnSalvar) {
        btnSalvar.addEventListener('click', () => {
          const prefs = {
            analiticos: document.getElementById('ck-analiticos').checked,
            marketing: document.getElementById('ck-marketing').checked
          };
          salvarConsentimento(prefs);
          UI.fecharModal();
          fecharBanner();
          UI.mostrarToast('Preferências salvas!', 'sucesso');
          aplicarConsentimento();
        });
      }

      if (btnRecusar) {
        btnRecusar.addEventListener('click', () => {
          recusarTodos();
          UI.fecharModal();
          fecharBanner();
          UI.mostrarToast('Cookies recusados.', 'info');
          aplicarConsentimento();
        });
      }

      if (btnCancelar) {
        btnCancelar.addEventListener('click', () => {
          UI.fecharModal();
        });
      }
    }, 100);
  };

  /* ---------- APLICAR CONSENTIMENTO ---------- */
  const aplicarConsentimento = () => {
    const c = lerConsentimento();
    if (!c) return;
    if (c.analiticos) console.log('🔍 Cookies analíticos ATIVADOS');
    if (c.marketing) console.log('📢 Cookies de marketing ATIVADOS');
  };

  /* ---------- INICIALIZAR ---------- */
  const inicializar = () => {
    // Só mostra o banner 1 segundo depois, para não travar o load
    setTimeout(mostrarBanner, 1000);
    aplicarConsentimento();
  };

  return {
    inicializar: inicializar,
    mostrarBanner: mostrarBanner,
    fecharBanner: fecharBanner,
    abrirPreferencias: abrirPreferencias,
    aceitarTodos: aceitarTodos,
    recusarTodos: recusarTodos,
    lerConsentimento: lerConsentimento
  };
})();

window.Cookies = Cookies;