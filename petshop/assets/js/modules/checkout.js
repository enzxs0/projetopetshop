/* ============================================================
   checkout.js — Validação de CEP e envio de pedido
   ============================================================ */
const Checkout = (() => {

  /* ---------- MÁSCARA DE CEP ---------- */
  const mascararCep = (valor) => {
    let v = valor.replace(/\D/g, '').slice(0, 8);
    if (v.length > 5) v = v.slice(0, 5) + '-' + v.slice(5);
    return v;
  };

  /* ---------- BUSCAR CEP NA API VIACEP ---------- */
  const buscarCep = async () => {
    const input = document.getElementById('ch-cep');
    const status = document.getElementById('ch-cep-status');
    const cep = input.value.replace(/\D/g, '');

    if (cep.length !== 8) {
      status.textContent = '⚠️ CEP incompleto';
      status.style.color = 'var(--cor-erro)';
      return;
    }

    status.textContent = '🔍 Buscando...';
    status.style.color = 'var(--cor-info)';

    try {
      const r = await fetch('https://viacep.com.br/ws/' + cep + '/json/');
      const data = await r.json();

      if (data.erro) {
        status.textContent = '❌ CEP não encontrado';
        status.style.color = 'var(--cor-erro)';
        return;
      }

      // Preenche os campos
      document.getElementById('ch-rua').value    = data.logradouro || '';
      document.getElementById('ch-bairro').value = data.bairro || '';
      document.getElementById('ch-cidade').value = data.localidade || '';
      document.getElementById('ch-estado').value = data.uf || '';

      status.textContent = '✅ Endereço preenchido';
      status.style.color = 'var(--cor-sucesso)';

      // Foca no número
      document.getElementById('ch-num').focus();
    } catch (e) {
      status.textContent = '❌ Erro ao buscar CEP';
      status.style.color = 'var(--cor-erro)';
      console.error(e);
    }
  };

  /* ---------- INICIALIZAR EVENTOS ---------- */
  const inicializar = () => {
    const cepInput = document.getElementById('ch-cep');
    if (!cepInput) return;

    // Máscara ao digitar
    cepInput.addEventListener('input', (e) => {
      e.target.value = mascararCep(e.target.value);
    });

    // Busca automática ao completar 8 dígitos
    cepInput.addEventListener('blur', () => {
      const cep = cepInput.value.replace(/\D/g, '');
      if (cep.length === 8) buscarCep();
    });

    // Enter no campo CEP busca
    cepInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        buscarCep();
      }
    });

    // UF em maiúsculas
    const ufInput = document.getElementById('ch-estado');
    if (ufInput) {
      ufInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.toUpperCase().replace(/[^A-Z]/g, '');
      });
    }
  };

  /* ---------- COLETAR DADOS DO FORMULÁRIO ---------- */
  const coletarDados = () => {
    return {
      cep: document.getElementById('ch-cep').value,
      rua: document.getElementById('ch-rua').value,
      numero: document.getElementById('ch-num').value,
      complemento: document.getElementById('ch-compl').value,
      bairro: document.getElementById('ch-bairro').value,
      cidade: document.getElementById('ch-cidade').value,
      estado: document.getElementById('ch-estado').value,
      forma_pagamento: (document.querySelector('input[name="pag"]:checked') || {}).value
    };
  };

  return {
    inicializar,
    buscarCep,
    mascararCep,
    coletarDados
  };
})();

window.Checkout = Checkout;