<?php
// ============================================================
// API de Agendamentos
// GET    /api/agendamentos.php           → lista todos (admin)
// GET    /api/agendamentos.php?id=1      → um agendamento
// GET    /api/agendamentos.php?data=...&servico_id=... → disponibilidade
// POST   /api/agendamentos.php           → cria (cliente)
// PUT    /api/agendamentos.php?id=1      → atualiza status (admin)
// DELETE /api/agendamentos.php?id=1      → cancela
// ============================================================
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/helpers/response.php';
require_once __DIR__ . '/helpers/auth.php';

$db = Database::getConexao();
$metodo = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? (int)$_GET['id'] : null;
$acao = $_GET['acao'] ?? '';

// ---------------- DISPONIBILIDADE ----------------
if ($metodo === 'GET' && $acao === 'disponibilidade') {
    $data = $_GET['data'] ?? null;
    $servico_id = isset($_GET['servico_id']) ? (int)$_GET['servico_id'] : null;

    if (!$data || !$servico_id) erro('Data e serviço obrigatórios');

    $stmt = $db->prepare('SELECT TIME(data_hora) AS hora, COUNT(*) AS ocupados
                          FROM agendamentos
                          WHERE DATE(data_hora) = :d
                            AND servico_id = :s
                            AND status != "cancelado"
                          GROUP BY TIME(data_hora)');
    $stmt->execute([':d' => $data, ':s' => $servico_id]);
    sucesso($stmt->fetchAll());
}

switch ($metodo) {
    case 'GET':
        if ($id) {
            $stmt = $db->prepare('SELECT a.*, s.nome AS servico_nome
                                  FROM agendamentos a
                                  JOIN servicos s ON s.id = a.servico_id
                                  WHERE a.id = :id');
            $stmt->execute([':id' => $id]);
            $ag = $stmt->fetch();
            if (!$ag) erro('Agendamento não encontrado', 404);
            sucesso($ag);
        }

        $stmt = $db->query('SELECT a.id, a.data_hora, a.status, a.nome_cliente,
                                   a.telefone_cliente, a.nome_pet, a.observacoes,
                                   s.nome AS servico_nome
                            FROM agendamentos a
                            JOIN servicos s ON s.id = a.servico_id
                            ORDER BY a.data_hora DESC');
        sucesso($stmt->fetchAll());
        break;

    case 'POST':
        $d = lerJson();

        // Validações
        if (empty($d['servico_id']) || empty($d['data_hora'])) {
            erro('Serviço e data/hora são obrigatórios');
        }
        if (empty($d['nome_cliente']) || empty($d['nome_pet'])) {
            erro('Nome do cliente e do pet são obrigatórios');
        }

        // 1. Verifica limite de 2 pets por horário
        $stmt = $db->prepare('SELECT COUNT(*) AS total FROM agendamentos
                              WHERE data_hora = :dh
                                AND servico_id = :s
                                AND status != "cancelado"');
        $stmt->execute([':dh' => $d['data_hora'], ':s' => (int)$d['servico_id']]);
        if ($stmt->fetch()['total'] >= 2) {
            erro('Horário lotado (máximo 2 pets)', 409);
        }

        // 2. Verifica pet duplicado no mesmo dia
        $stmt = $db->prepare('SELECT id FROM agendamentos
                              WHERE DATE(data_hora) = DATE(:dh)
                                AND LOWER(TRIM(nome_pet)) = LOWER(TRIM(:pet))
                                AND REPLACE(REPLACE(REPLACE(telefone_cliente, " ", ""), "-", ""), "(", "") =
                                    REPLACE(REPLACE(REPLACE(:tel, " ", ""), "-", ""), "(", "")
                                AND status != "cancelado"');
        $stmt->execute([
            ':dh'  => $d['data_hora'],
            ':pet' => $d['nome_pet'],
            ':tel' => $d['telefone_cliente'] ?? ''
        ]);
        if ($stmt->fetch()) {
            erro('Este pet já possui agendamento neste dia', 409);
        }

        // 3. Insere
        $usuario_id = $d['usuario_id'] ?? 2; // cliente demo por padrão
        $stmt = $db->prepare('INSERT INTO agendamentos
            (usuario_id, servico_id, data_hora, nome_cliente, telefone_cliente, nome_pet, observacoes, status)
            VALUES (:u, :s, :dh, :nc, :tc, :np, :obs, "pendente")');
        $stmt->execute([
            ':u'   => $usuario_id,
            ':s'   => (int)$d['servico_id'],
            ':dh'  => $d['data_hora'],
            ':nc'  => $d['nome_cliente'],
            ':tc'  => $d['telefone_cliente'] ?? null,
            ':np'  => $d['nome_pet'],
            ':obs' => $d['observacoes'] ?? null
        ]);
        sucesso(['id' => $db->lastInsertId()], 'Agendamento criado');
        break;

    case 'PUT':
        exigirAdmin();
        if (!$id) erro('ID obrigatório');
        $d = lerJson();
        $status = $d['status'] ?? null;
        if (!in_array($status, ['pendente', 'confirmado', 'concluido', 'cancelado'])) {
            erro('Status inválido');
        }
        $stmt = $db->prepare('UPDATE agendamentos SET status = :s WHERE id = :id');
        $stmt->execute([':s' => $status, ':id' => $id]);
        sucesso([], 'Status atualizado');
        break;

    case 'DELETE':
        if (!$id) erro('ID obrigatório');
        $stmt = $db->prepare('UPDATE agendamentos SET status = "cancelado" WHERE id = :id');
        $stmt->execute([':id' => $id]);
        sucesso([], 'Agendamento cancelado');
        break;

    default:
        erro('Método não permitido', 405);
}