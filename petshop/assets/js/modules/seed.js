
const Seed = (() => {
  const inicializar = () => {
    if (!Storage.ler('produtos')) {
      Storage.salvar('produtos', [
        { id: 'p1', nome: 'Ração Premium Cães Adultos 15kg', categoria: 'racao', especie: 'cao', marca: 'Royal Canin', preco: 189.90, estoque: 25, descricao: 'Ração super premium para cães adultos de porte médio.', imagem: 'https://placehold.co/400x300/d4c5a9/2d3a2e?text=Racao+Premium' },
        { id: 'p2', nome: 'Ração Gatos Castrados 10kg', categoria: 'racao', especie: 'gato', marca: 'Whiskas', preco: 129.90, estoque: 18, descricao: 'Ração específica para gatos castrados.', imagem: 'https://placehold.co/400x300/a8c5ab/2d3a2e?text=Racao+Gatos' },
        { id: 'p3', nome: 'Coleira Antipulgas', categoria: 'acessorio', especie: 'cao', marca: 'Scalibor', preco: 79.90, estoque: 40, descricao: 'Coleira protetora contra pulgas e carrapatos.', imagem: 'https://placehold.co/400x300/c97b5a/fff?text=Coleira' },
        { id: 'p4', nome: 'Shampoo Pet Neutro 500ml', categoria: 'higiene', especie: 'ambos', marca: 'Pet Clean', preco: 24.90, estoque: 60, descricao: 'Shampoo suave para banho frequente.', imagem: 'https://placehold.co/400x300/7a9e7e/fff?text=Shampoo' },
        { id: 'p5', nome: 'Brinquedo Mordedor Resistente', categoria: 'brinquedo', especie: 'cao', marca: 'Kong', preco: 49.90, estoque: 35, descricao: 'Brinquedo de borracha natural ultra resistente.', imagem: 'https://placehold.co/400x300/d4c5a9/2d3a2e?text=Brinquedo' },
        { id: 'p6', nome: 'Areia Higiênica Gatos 4kg', categoria: 'higiene', especie: 'gato', marca: 'Chococat', preco: 34.90, estoque: 50, descricao: 'Areia sanitária com controle de odor.', imagem: 'https://placehold.co/400x300/a8c5ab/2d3a2e?text=Areia' },
        { id: 'p7', nome: 'Cama Pet Confort P', categoria: 'acessorio', especie: 'ambos', marca: 'PetLove', preco: 89.90, estoque: 15, descricao: 'Cama macia e confortável tamanho P.', imagem: 'https://placehold.co/400x300/c97b5a/fff?text=Cama+Pet' },
        { id: 'p8', nome: 'Petisco Natural Frango 200g', categoria: 'petisco', especie: 'cao', marca: 'Natural Pet', preco: 19.90, estoque: 100, descricao: 'Petisco 100% natural de frango desidratado.', imagem: 'https://placehold.co/400x300/7a9e7e/fff?text=Petisco' }
      ]);
    }

    if (!Storage.ler('servicos')) {
      Storage.salvar('servicos', [
        { id: 's1', nome: 'Banho', descricao: 'Banho completo com shampoo específico', duracao: 60, preco: { pequeno: 50, medio: 70, grande: 90 }, categoria: 'estetica', imagem: 'https://placehold.co/400x300/7a9e7e/fff?text=Banho' },
        { id: 's2', nome: 'Tosa', descricao: 'Tosa higiênica ou completa', duracao: 90, preco: { pequeno: 60, medio: 85, grande: 110 }, categoria: 'estetica', imagem: 'https://placehold.co/400x300/a8c5ab/2d3a2e?text=Tosa' },
        { id: 's3', nome: 'Banho e Tosa', descricao: 'Combo completo de banho e tosa', duracao: 120, preco: { pequeno: 90, medio: 130, grande: 170 }, categoria: 'estetica', imagem: 'https://placehold.co/400x300/d4c5a9/2d3a2e?text=Banho+Tosa' },
        { id: 's4', nome: 'Consulta Veterinária', descricao: 'Consulta clínica geral', duracao: 30, preco: { unico: 150 }, categoria: 'veterinario', imagem: 'https://placehold.co/400x300/c97b5a/fff?text=Veterinario' },
        { id: 's5', nome: 'Vacinação', descricao: 'Aplicação de vacinas', duracao: 20, preco: { unico: 80 }, categoria: 'veterinario', imagem: 'https://placehold.co/400x300/7a9e7e/fff?text=Vacinacao' },
        { id: 's6', nome: 'Hotelzinho', descricao: 'Hospedagem diária com cuidados', duracao: 1440, preco: { pequeno: 80, medio: 100, grande: 130 }, categoria: 'hospedagem', imagem: 'https://placehold.co/400x300/a8c5ab/2d3a2e?text=Hotelzinho' },
        { id: 's7', nome: 'Adestramento', descricao: 'Sessão individual de adestramento', duracao: 60, preco: { unico: 120 }, categoria: 'adestramento', imagem: 'https://placehold.co/400x300/c97b5a/fff?text=Adestramento' }
      ]);
    }

    if (!Storage.ler('petsAdocao')) {
      Storage.salvar('petsAdocao', [
        { id: 'a1', nome: 'Thor', especie: 'cao', raca: 'SRD', idade: '2 anos', sexo: 'Macho', porte: 'Grande', descricao: 'Thor é um cão muito brincalhão e carinhoso.', imagem: 'images/fagundes.jpg' },
        { id: 'a2', nome: 'Luna', especie: 'gato', raca: 'SRD', idade: '1 ano', sexo: 'Fêmea', porte: 'Pequeno', descricao: 'Luna é uma gatinha dócil e muito elegante.', imagem: 'images/cuzinhp.jpg' },
        { id: 'a3', nome: 'Max', especie: 'cao', raca: 'Labrador', idade: '3 anos', sexo: 'Macho', porte: 'Grande', descricao: 'Max é um labrador muito obediente e ama nadar.', imagem: 'images/roges.jpg' },
        { id: 'a4', nome: 'Mimi', especie: 'gato', raca: 'Persa', idade: '4 anos', sexo: 'Fêmea', porte: 'Pequeno', descricao: 'Mimi é uma persa muito calma e carinhosa.', imagem: 'images/demonio.jpg' },
        { id: 'a5', nome: 'Bob', especie: 'cao', raca: 'Beagle', idade: '5 meses', sexo: 'Macho', porte: 'Médio', descricao: 'Bob é um filhote muito alegre e curioso.', imagem: 'images/cachorrofei.jpg' }
      ]);
    }
    const petsAdocao = Storage.ler('petsAdocao', []);
    const thor = petsAdocao.find(pet => pet.id === 'a1');
    if (thor && thor.imagem !== 'images/fagundes.jpg') {
      thor.imagem = 'images/fagundes.jpg';
      Storage.salvar('petsAdocao', petsAdocao);
    }
    const max = petsAdocao.find(pet => pet.id === 'a3');
    if (max && max.imagem !== 'images/roges.jpg') {
      max.imagem = 'images/roges.jpg';
      Storage.salvar('petsAdocao', petsAdocao);
    }

    if (!Storage.ler('blog')) {
      Storage.salvar('blog', [
        { id: 'b1', titulo: 'Como cuidar do seu filhote', resumo: 'Dicas essenciais para os primeiros meses do seu pet.', conteudo: 'Os primeiros meses são fundamentais para o desenvolvimento do filhote. Certifique-se de fornecer alimentação adequada, vacinas em dia e muito carinho.', autor: 'Dra. Ana', data: '2024-01-15', imagem: 'https://placehold.co/600x400/7a9e7e/fff?text=Filhotes', categoria: 'cuidados' },
        { id: 'b2', titulo: 'Alimentação saudável para cães', resumo: 'Saiba como escolher a melhor ração.', conteudo: 'A alimentação é a base da saúde do seu pet. Escolha rações de qualidade, respeite as porções indicadas e evite alimentos humanos.', autor: 'Dr. Pedro', data: '2024-01-20', imagem: 'https://placehold.co/600x400/a8c5ab/2d3a2e?text=Alimentacao', categoria: 'alimentacao' },
        { id: 'b3', titulo: 'Vacinas essenciais', resumo: 'Calendário de vacinação do seu pet.', conteudo: 'Mantenha a carteira de vacinação sempre atualizada. As vacinas V8/V10 para cães e V3 para gatos são indispensáveis.', autor: 'Dra. Ana', data: '2024-02-01', imagem: 'https://placehold.co/600x400/d4c5a9/2d3a2e?text=Vacinas', categoria: 'saude' }
      ]);
    }

    if (!Storage.ler('usuarios')) {
      Storage.salvar('usuarios', [
        { id: 'u1', nome: 'Administrador', email: 'admin@petamigo.com', senha_hash: Utils.hashSimulado('admin123'), cpf: '111.111.111-11', telefone: '(11) 99999-0000', tipo: 'admin' },
        { id: 'u2', nome: 'Cliente Demo', email: 'cliente@petamigo.com', senha_hash: Utils.hashSimulado('cliente123'), cpf: '222.222.222-22', telefone: '(11) 98888-0000', tipo: 'cliente' }
      ]);
    }

    if (!Storage.ler('carrinho')) Storage.salvar('carrinho', []);
    if (!Storage.ler('favoritos')) Storage.salvar('favoritos', []);
    if (!Storage.ler('pedidos')) Storage.salvar('pedidos', []);
    if (!Storage.ler('agendamentos')) Storage.salvar('agendamentos', []);
    if (!Storage.ler('petsCliente')) Storage.salvar('petsCliente', []);
  };

  return { inicializar };
})();