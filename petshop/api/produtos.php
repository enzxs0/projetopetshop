<?php

require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/helpers/response.php';
require_once __DIR__ . '/helpers/auth.php';

$db = Database::getConexao();
$metodo = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? (int)$_GET['id'] : null;

switch ($metodo) {
    case 'GET':
        if ($id) {
            $stmt = $db->prepare('SELECT * FROM produtos WHERE id = :id AND ativo = 1');
            $stmt->execute([':id' => $id]);
            $produto = $stmt->fetch();
            if (!$produto) erro('Produto não encontrado', 404);
            sucesso($produto);
        }
        $stmt = $db->query('SELECT id, nome, categoria, especie, marca, preco, estoque, descricao, imagem
                            FROM produtos WHERE ativo = 1 ORDER BY id');
        sucesso($stmt->fetchAll());
        break;

    case 'POST':
        exigirAdmin();
        $dados = lerJson();
        if (empty($dados['nome']) || !isset($dados['preco'])) erro('Nome e preço obrigatórios');
        $stmt = $db->prepare('INSERT INTO produtos (nome, categoria, especie, marca, preco, estoque, descricao, imagem)
                              VALUES (:nome, :cat, :esp, :marca, :preco, :estoque, :desc, :img)');
        $stmt->execute([
            ':nome'    => $dados['nome'],
            ':cat'     => $dados['categoria'] ?? null,
            ':esp'     => $dados['especie'] ?? 'ambos',
            ':marca'   => $dados['marca'] ?? null,
            ':preco'   => $dados['preco'],
            ':estoque' => $dados['estoque'] ?? 0,
            ':desc'    => $dados['descricao'] ?? null,
            ':img'     => $dados['imagem'] ?? null
        ]);
        sucesso(['id' => $db->lastInsertId()], 'Produto criado');
        break;

    case 'PUT':
        exigirAdmin();
        if (!$id) erro('ID obrigatório');
        $dados = lerJson();
        $stmt = $db->prepare('UPDATE produtos SET nome=:nome, categoria=:cat, especie=:esp,
                              marca=:marca, preco=:preco, estoque=:estoque, descricao=:desc
                              WHERE id=:id');
        $stmt->execute([
            ':id'      => $id,
            ':nome'    => $dados['nome'],
            ':cat'     => $dados['categoria'] ?? null,
            ':esp'     => $dados['especie'] ?? 'ambos',
            ':marca'   => $dados['marca'] ?? null,
            ':preco'   => $dados['preco'],
            ':estoque' => $dados['estoque'] ?? 0,
            ':desc'    => $dados['descricao'] ?? null
        ]);
        sucesso([], 'Produto atualizado');
        break;

    case 'DELETE':
        exigirAdmin();
        if (!$id) erro('ID obrigatório');
        $stmt = $db->prepare('UPDATE produtos SET ativo = 0 WHERE id = :id');
        $stmt->execute([':id' => $id]);
        sucesso([], 'Produto removido');
        break;

    default:
        erro('Método não permitido', 405);
}