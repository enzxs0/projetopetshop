/* ============================================================
   agenda.js — Sistema de agendamento com controle de vagas
   Seg–Sex | 08:00 às 18:00 | Máx. 2 pets por slot
   ============================================================ */
const Agenda = (() => {

  const HORARIOS = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'];
  const DIAS_SEMANA = ['Segunda','Terça','Quarta','Quinta','Sexta'];
  const CAPACIDADE_POR_SLOT = 2;

  // Estado local
  let selecao = { dia: null, horario: null };
  let servicoAtual = null;

  /* ---------- HELPERS ---------- */

  // Próxima segunda-feira a partir de hoje
  const proximaSegunda = () => {
    const d = new Date();
    const dia = d.getDay(); // 0=dom, 1=seg...
    const diff = dia === 0 ? 1 : (dia === 1 ? 7 : 8 - dia);
    d.setDate(d.getDate() + diff);
    d.setHours(0,0,0,0);
    return d;
  };

  // Retorna data real da semana para um índice (0=Segunda)
  const dataDoDia = (indiceDia) => {
    const base = proximaSegunda();
    base.setDate(base.getDate() + indiceDia);
    return base;
  };

  // Formata data como "dd/mm"
  const formatarDDMM = (d) => {
    const dia = String(d.getDate()).padStart(2,'0');
    const mes = String(d.getMonth()+1).padStart(2,'0');
    return `${dia}/${mes}`;
  };

  /* ---------- CONSULTAR AGENDAMENTOS ---------- */
  const lerAgendamentos = () => Storage.ler('agendamentos', []);

  // Conta quantos pets estão agendados em um slot específico
  const contarVagas = (dataISO, horario, servicoId) => {
    const lista = lerAgendamentos();
    return lista.filter(a =>
      a.data === dataISO &&
      a.horario === horario &&
      a.servicoId === servicoId &&
      a.status !== 'cancelado'
    ).length;
  };

  // Verifica se o slot está totalmente livre, parcialmente ocupado ou lotado
  const statusSlot = (dataISO, horario, servicoId, indiceDia) => {
    // 1. Já passou?
    const agora = new Date();
    const dataSlot = new Date(dataISO + 'T' + horario + ':00');
    if (dataSlot < agora) return 'passado';

    // 2. Conta vagas
    const ocupados = contarVagas(dataISO, horario, servicoId);
    if (ocupados >= CAPACIDADE_POR_SLOT) return 'lotado';
    if (ocupados > 0) return 'parcial';
    return 'livre';
  };

  /* ---------- RENDERIZAR GRADE DESKTOP ---------- */
  const renderizarGrade = (servicoId) => {
    servicoAtual = servicoId;
    const grade = document.getElementById('agenda-grade');
    if (!grade) return;

    let html = '';

    // Cabeçalho: canto vazio + dias
    html += `<div class="agenda-cabecalho agenda-cabecalho--hora">Hora</div>`;
    DIAS_SEMANA.forEach((dia, i) => {
      const data = dataDoDia(i);
      html += `<div class="agenda-cabecalho">${dia}<br><small style="font-weight:400;opacity:.85">${formatarDDMM(data)}</small></div>`;
    });

    // Linhas: horário + 5 dias
    HORARIOS.forEach(horario => {
      html += `<div class="agenda-hora">${horario}</div>`;
      DIAS_SEMANA.forEach((dia, i) => {
        const data = dataDoDia(i);
        const dataISO = data.toISOString().split('T')[0];
        const status = statusSlot(dataISO, horario, servicoId, i);
        const ocupados = contarVagas(dataISO, horario, servicoId);
        const vagasLivres = CAPACIDADE_POR_SLOT - ocupados;

        const bloqueado = status === 'lotado' || status === 'passado';
        const classe = `agenda-slot agenda-slot--${status}`;
        const selecionado = selecao.dia === dataISO && selecao.horario === horario ? ' agenda-slot--selecionado' : '';
        const onclick = bloqueado ? '' : `onclick="Agenda.selecionar('${dataISO}', '${horario}')"`;

        html += `
          <div class="${classe}${selecionado}" ${onclick}
               data-data="${dataISO}" data-horario="${horario}"
               title="${bloqueado ? 'Indisponível' : `${vagasLivres} vaga(s) livre(s)`}">
            ${status === 'livre' ? '<i class="fas fa-check-circle" style="color:var(--cor-sucesso);font-size:.9rem"></i>' : ''}
            ${status === 'parcial' ? `<span style="font-size:.75rem;font-weight:700">${vagasLivres} vaga${vagasLivres>1?'s':''}</span>` : ''}
            ${status === 'lotado' ? '<i class="fas fa-times-circle" style="color:var(--cor-erro);font-size:.9rem"></i>' : ''}
            ${status === 'passado' ? '<i class="fas fa-clock" style="font-size:.8rem"></i>' : ''}
            ${selecionado ? '<span class="agenda-slot__check"><i class="fas fa-check"></i></span>' : ''}
          </div>`;
      });
    });

    grade.innerHTML = html;
  };

  /* ---------- RENDERIZAR MOBILE ---------- */
  let diaMobileAtivo = 0;

  const renderizarMobile = (servicoId) => {
    servicoAtual = servicoId;
    const wrapper = document.getElementById('agenda-mobile');
    if (!wrapper) return;

    // Botões de dias
    let html = '<div class="agenda-mobile__dias">';
    DIAS_SEMANA.forEach((dia, i) => {
      const data = dataDoDia(i);
      const ativo = i === diaMobileAtivo ? ' agenda-mobile__dia--ativo' : '';
      html += `<div class="agenda-mobile__dia${ativo}" onclick="Agenda.selecionarDiaMobile(${i})">
        ${dia}<br><small>${formatarDDMM(data)}</small>
      </div>`;
    });
    html += '</div>';

    // Slots do dia ativo
    const data = dataDoDia(diaMobileAtivo);
    const dataISO = data.toISOString().split('T')[0];
    html += '<div class="agenda-mobile__horarios">';
    HORARIOS.forEach(horario => {
      const status = statusSlot(dataISO, horario, servicoId, diaMobileAtivo);
      const ocupados = contarVagas(dataISO, horario, servicoId);
      const vagasLivres = CAPACIDADE_POR_SLOT - ocupados;
      const bloqueado = status === 'lotado' || status === 'passado';
      const selecionado = selecao.dia === dataISO && selecao.horario === horario ? ' agenda-mobile__slot--selecionado' : '';

      let subtexto = '';
      if (status === 'livre') subtexto = 'Disponível';
      else if (status === 'parcial') subtexto = `${vagasLivres} vaga${vagasLivres>1?'s':''}`;
      else if (status === 'lotado') subtexto = 'Lotado';
      else subtexto = 'Passou';

      html += `
        <div class="agenda-mobile__slot agenda-mobile__slot--${status}${selecionado}"
             ${bloqueado ? '' : `onclick="Agenda.selecionar('${dataISO}', '${horario}')"`}>
          ${horario}
          <small>${subtexto}</small>
        </div>`;
    });
    html += '</div>';

    wrapper.innerHTML = html;
  };

  /* ---------- SELEÇÃO ---------- */
  const selecionar = (dataISO, horario) => {
    selecao = { dia: dataISO, horario };
    renderizarGrade(servicoAtual);
    renderizarMobile(servicoAtual);
    mostrarResumo();
  };

  const selecionarDiaMobile = (indiceDia) => {
    diaMobileAtivo = indiceDia;
    renderizarMobile(servicoAtual);
  };

  /* ---------- RESUMO / CONFIRMAÇÃO ---------- */
  const mostrarResumo = () => {
    const resumo = document.getElementById('agenda-resumo');
    if (!resumo || !selecao.dia) return;

    const servicos = Storage.ler('servicos', []);
    const s = servicos.find(x => x.id === servicoAtual);
    const data = new Date(selecao.dia + 'T12:00:00');
    const dataFmt = data.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' });

    resumo.classList.add('agenda-resumo--visivel');
    resumo.innerHTML = `
      <div class="agenda-resumo__titulo"><i class="fas fa-check-circle"></i> Horário selecionado</div>
      <div class="agenda-resumo__info">
        <span><strong>Serviço:</strong> ${Utils.sanitizar(s?.nome || '—')}</span>
        <span><strong>Data:</strong> ${dataFmt}</span>
        <span><strong>Horário:</strong> ${selecao.horario}</span>
      </div>
      <button class="btn btn--primario" onclick="Agenda.confirmar()">
        <i class="fas fa-calendar-check"></i> Confirmar agendamento
      </button>
      <button class="btn btn--ghost" onclick="Agenda.limparSelecao()">Cancelar</button>
    `;
    resumo.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const limparSelecao = () => {
    selecao = { dia: null, horario: null };
    const resumo = document.getElementById('agenda-resumo');
    if (resumo) resumo.classList.remove('agenda-resumo--visivel');
    renderizarGrade(servicoAtual);
    renderizarMobile(servicoAtual);
  };

  /* ---------- CONFIRMAR AGENDAMENTO ---------- */
  const confirmar = () => {
    if (!selecao.dia || !selecao.horario) return;

    // Verifica novamente se ainda há vagas
    const ocupados = contarVagas(selecao.dia, selecao.horario, servicoAtual);
    if (ocupados >= CAPACIDADE_POR_SLOT) {
      UI.mostrarToast('Este horário acabou de lotar. Escolha outro.', 'erro');
      renderizarGrade(servicoAtual);
      renderizarMobile(servicoAtual);
      limparSelecao();
      return;
    }

    // Abre modal de confirmação com dados do cliente
    const servicos = Storage.ler('servicos', []);
    const s = servicos.find(x => x.id === servicoAtual);

    UI.abrirModal('Confirmar Agendamento', `
      <form id="form-agenda-confirmar">
        <p style="margin-bottom: var(--espaco-md); color: var(--cor-texto-suave);">
          <strong>${Utils.sanitizar(s?.nome)}</strong> — ${selecao.horario} em ${new Date(selecao.dia + 'T12:00:00').toLocaleDateString('pt-BR')}
        </p>
        <div class="form-group">
          <label class="form-label">Seu nome *</label>
          <input class="form-input" name="nome" required>
        </div>
        <div class="form-group">
          <label class="form-label">Telefone *</label>
          <input class="form-input" name="telefone" required>
        </div>
        <div class="form-group">
          <label class="form-label">Nome do pet *</label>
          <input class="form-input" name="pet" required>
        </div>
        <div class="form-group">
          <label class="form-label">Observações</label>
          <textarea class="form-textarea" name="obs"></textarea>
        </div>
        <div style="display: flex; gap: var(--espaco-sm); justify-content: flex-end;">
          <button type="button" class="btn btn--ghost" onclick="UI.fecharModal()">Cancelar</button>
          <button type="submit" class="btn btn--primario">Confirmar</button>
        </div>
      </form>
    `);

    setTimeout(() => {
      document.getElementById('form-agenda-confirmar')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const f = e.target;

        // Cria o agendamento
        const agendamentos = lerAgendamentos();
        agendamentos.push({
          id: Utils.gerarId(),
          servicoId: servicoAtual,
          servicoNome: s?.nome || '',
          data: selecao.dia,
          horario: selecao.horario,
          nome: f.nome.value,
          telefone: f.telefone.value,
          pet: f.pet.value,
          observacoes: f.obs.value,
          status: 'pendente',
          criadoEm: new Date().toISOString()
        });
        Storage.salvar('agendamentos', agendamentos);

        UI.fecharModal();
        UI.mostrarToast('Agendamento confirmado!', 'sucesso');
        limparSelecao();
        renderizarGrade(servicoAtual);
        renderizarMobile(servicoAtual);
      });
    }, 100);
  };

  /* ---------- INICIALIZAR NA PÁGINA ---------- */
  const inicializar = (servicoId) => {
    if (!servicoId) {
      const servicos = Storage.ler('servicos', []);
      servicoId = servicos[0]?.id;
    }
    renderizarGrade(servicoId);
    renderizarMobile(servicoId);
  };

  return {
    inicializar,
    selecionar,
    selecionarDiaMobile,
    confirmar,
    limparSelecao,
    renderizarGrade,
    renderizarMobile
  };
})();

window.Agenda = Agenda;