<?php
// ============================================================
// API de Pets para Adoção
// GET    /api/pets_adocao.php          → lista disponíveis
// GET    /api/pets_adocao.php?id=1     → um pet
// POST   /api/pets_adocao.php          → cria (admin)
// PUT    /api/pets_adocao.php?id=1     → atualiza (admin)
// DELETE /api/pets_adocao.php?id=1     → remove (admin)
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
            $stmt = $db->prepare('SELECT * FROM pets_adocao WHERE id = :id');
            $stmt->execute([':id' => $id]);
            $pet = $stmt->fetch();
            if (!$pet) erro('Pet não encontrado', 404);
            sucesso($pet);
        }

        $stmt = $db->query('SELECT id, nome, especie, raca, idade, sexo, porte,
                                   descricao, imagem, status
                            FROM pets_adocao
                            WHERE status = "disponivel"
                            ORDER BY id DESC');
        sucesso($stmt->fetchAll());
        break;

    case 'POST':
        exigirAdmin();
        $d = lerJson();
        if (empty($d['nome']) || empty($d['especie'])) {
            erro('Nome e espécie são obrigatórios');
        }

        $stmt = $db->prepare('INSERT INTO pets_adocao
            (nome, especie, raca, idade, sexo, porte, descricao, imagem, status)
            VALUES (:n, :e, :r, :i, :s, :p, :d, :img, :st)');
        $stmt->execute([
            ':n'   => $d['nome'],
            ':e'   => $d['especie'],
            ':r'   => $d['raca'] ?? null,
            ':i'   => $d['idade'] ?? null,
            ':s'   => $d['sexo'] ?? null,
            ':p'   => $d['porte'] ?? null,
            ':d'   => $d['descricao'] ?? null,
            ':img' => $d['imagem'] ?? null,
            ':st'  => $d['status'] ?? 'disponivel'
        ]);
        sucesso(['id' => $db->lastInsertId()], 'Pet cadastrado');
        break;

    case 'PUT':
        exigirAdmin();
        if (!$id) erro('ID obrigatório');
        $d = lerJson();
        $stmt = $db->prepare('UPDATE pets_adocao SET
            nome=:n, especie=:e, raca=:r, idade=:i, sexo=:s,
            porte=:p, descricao=:d, imagem=:img, status=:st
            WHERE id=:id');
        $stmt->execute([
            ':id'  => $id,
            ':n'   => $d['nome'],
            ':e'   => $d['especie'],
            ':r'   => $d['raca'] ?? null,
            ':i'   => $d['idade'] ?? null,
            ':s'   => $d['sexo'] ?? null,
            ':p'   => $d['porte'] ?? null,
            ':d'   => $d['descricao'] ?? null,
            ':img' => $d['imagem'] ?? null,
            ':st'  => $d['status'] ?? 'disponivel'
        ]);
        sucesso([], 'Pet atualizado');
        break;

    case 'DELETE':
        exigirAdmin();
        if (!$id) erro('ID obrigatório');
        $stmt = $db->prepare('UPDATE pets_adocao SET status = "adotado" WHERE id = :id');
        $stmt->execute([':id' => $id]);
        sucesso([], 'Pet marcado como adotado');
        break;

    default:
        erro('Método não permitido', 405);
}