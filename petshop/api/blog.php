<?php
// ============================================================
// API do Blog
// GET    /api/blog.php          → lista posts publicados
// GET    /api/blog.php?id=1     → um post
// POST   /api/blog.php          → cria (admin)
// PUT    /api/blog.php?id=1     → atualiza (admin)
// DELETE /api/blog.php?id=1     → despublica (admin)
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
            $stmt = $db->prepare('SELECT * FROM blog_posts WHERE id = :id AND publicado = 1');
            $stmt->execute([':id' => $id]);
            $post = $stmt->fetch();
            if (!$post) erro('Post não encontrado', 404);
            sucesso($post);
        }

        $stmt = $db->query('SELECT id, titulo, resumo, autor, categoria, imagem, created_at
                            FROM blog_posts
                            WHERE publicado = 1
                            ORDER BY created_at DESC');
        sucesso($stmt->fetchAll());
        break;

    case 'POST':
        exigirAdmin();
        $d = lerJson();
        if (empty($d['titulo']) || empty($d['conteudo'])) {
            erro('Título e conteúdo são obrigatórios');
        }

        $stmt = $db->prepare('INSERT INTO blog_posts
            (titulo, resumo, conteudo, autor, categoria, imagem, publicado)
            VALUES (:t, :r, :c, :a, :cat, :img, 1)');
        $stmt->execute([
            ':t'   => $d['titulo'],
            ':r'   => $d['resumo'] ?? null,
            ':c'   => $d['conteudo'],
            ':a'   => $d['autor'] ?? 'Equipe PetAmigo',
            ':cat' => $d['categoria'] ?? null,
            ':img' => $d['imagem'] ?? null
        ]);
        sucesso(['id' => $db->lastInsertId()], 'Post criado');
        break;

    case 'PUT':
        exigirAdmin();
        if (!$id) erro('ID obrigatório');
        $d = lerJson();
        $stmt = $db->prepare('UPDATE blog_posts SET
            titulo=:t, resumo=:r, conteudo=:c, autor=:a, categoria=:cat, imagem=:img
            WHERE id=:id');
        $stmt->execute([
            ':id'  => $id,
            ':t'   => $d['titulo'],
            ':r'   => $d['resumo'] ?? null,
            ':c'   => $d['conteudo'],
            ':a'   => $d['autor'] ?? 'Equipe PetAmigo',
            ':cat' => $d['categoria'] ?? null,
            ':img' => $d['imagem'] ?? null
        ]);
        sucesso([], 'Post atualizado');
        break;

    case 'DELETE':
        exigirAdmin();
        if (!$id) erro('ID obrigatório');
        $stmt = $db->prepare('UPDATE blog_posts SET publicado = 0 WHERE id = :id');
        $stmt->execute([':id' => $id]);
        sucesso([], 'Post despublicado');
        break;

    default:
        erro('Método não permitido', 405);
}