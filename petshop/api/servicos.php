<?php
// ============================================================
// API de Serviços
// GET    /api/servicos.php          → lista todos
// GET    /api/servicos.php?id=1     → um serviço
// POST   /api/servicos.php          → cria (admin)
// PUT    /api/servicos.php?id=1     → atualiza (admin)
// DELETE /api/servicos.php?id=1     → remove (admin)
// ============================================================
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/helpers/response.php';
require_once __DIR__ . '/helpers/auth.php';

$db = Database::getConexao();
$metodo = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? (int)$_GET['id'] : null;

switch ($metodo) {
    case 'GET':
        if ($id) {
            $stmt = $db->prepare('SELECT * FROM servicos WHERE id = :id AND ativo = 1');
            $stmt->execute([':id' => $id]);
            $servico = $stmt->fetch();
            if (!$servico) erro('Serviço não encontrado', 404);
            sucesso($servico);
        }

        $stmt = $db->query('SELECT id, nome, descricao, duracao_minutos, categoria,
                                   preco_pequeno, preco_medio, preco_grande, preco_unico
                            FROM servicos WHERE ativo = 1 ORDER BY id');
        sucesso($stmt->fetchAll());
        break;

    case 'POST':
        exigirAdmin();
        $d = lerJson();
        if (empty($d['nome']) || empty($d['duracao_minutos'])) {
            erro('Nome e duração são obrigatórios');
        }

        $stmt = $db->prepare('INSERT INTO servicos
            (nome, descricao, duracao_minutos, categoria, preco_pequeno, preco_medio, preco_grande, preco_unico)
            VALUES (:n, :d, :dur, :cat, :pp, :pm, :pg, :pu)');
        $stmt->execute([
            ':n'   => $d['nome'],
            ':d'   => $d['descricao'] ?? null,
            ':dur' => (int)$d['duracao_minutos'],
            ':cat' => $d['categoria'] ?? null,
            ':pp'  => $d['preco_pequeno'] ?? null,
            ':pm'  => $d['preco_medio'] ?? null,
            ':pg'  => $d['preco_grande'] ?? null,
            ':pu'  => $d['preco_unico'] ?? null
        ]);
        sucesso(['id' => $db->lastInsertId()], 'Serviço criado');
        break;

    case 'PUT':
        exigirAdmin();
        if (!$id) erro('ID obrigatório');
        $d = lerJson();
        $stmt = $db->prepare('UPDATE servicos SET
            nome=:n, descricao=:d, duracao_minutos=:dur, categoria=:cat,
            preco_pequeno=:pp, preco_medio=:pm, preco_grande=:pg, preco_unico=:pu
            WHERE id=:id');
        $stmt->execute([
            ':id'  => $id,
            ':n'   => $d['nome'],
            ':d'   => $d['descricao'] ?? null,
            ':dur' => (int)$d['duracao_minutos'],
            ':cat' => $d['categoria'] ?? null,
            ':pp'  => $d['preco_pequeno'] ?? null,
            ':pm'  => $d['preco_medio'] ?? null,
            ':pg'  => $d['preco_grande'] ?? null,
            ':pu'  => $d['preco_unico'] ?? null
        ]);
        sucesso([], 'Serviço atualizado');
        break;

    case 'DELETE':
        exigirAdmin();
        if (!$id) erro('ID obrigatório');
        $stmt = $db->prepare('UPDATE servicos SET ativo = 0 WHERE id = :id');
        $stmt->execute([':id' => $id]);
        sucesso([], 'Serviço removido');
        break;

    default:
        erro('Método não permitido', 405);
}