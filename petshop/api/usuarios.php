<?php
// ============================================================
// API de Usuários (login, cadastro, perfil)
// POST /api/usuarios.php?acao=cadastro   → cria conta
// POST /api/usuarios.php?acao=login      → autentica
// POST /api/usuarios.php?acao=logout     → sai
// GET  /api/usuarios.php?acao=me         → dados do usuário logado
// ============================================================
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/helpers/response.php';
require_once __DIR__ . '/helpers/auth.php';

$db = Database::getConexao();
$acao = $_GET['acao'] ?? '';

switch ($acao) {
    case 'cadastro':
        $d = lerJson();
        if (!filter_var($d['email'] ?? '', FILTER_VALIDATE_EMAIL)) erro('E-mail inválido');
        if (strlen($d['senha'] ?? '') < 6) erro('Senha deve ter 6+ caracteres');

        // Verifica duplicidade
        $stmt = $db->prepare('SELECT id FROM usuarios WHERE email = :e');
        $stmt->execute([':e' => $d['email']]);
        if ($stmt->fetch()) erro('E-mail já cadastrado');

        // Hash seguro
        $hash = password_hash($d['senha'], PASSWORD_BCRYPT);

        $stmt = $db->prepare('INSERT INTO usuarios (nome, email, senha_hash, cpf, telefone)
                              VALUES (:n, :e, :h, :cpf, :tel)');
        $stmt->execute([
            ':n'   => $d['nome'],
            ':e'   => $d['email'],
            ':h'   => $hash,
            ':cpf' => $d['cpf'] ?? null,
            ':tel' => $d['telefone'] ?? null
        ]);
        sucesso(['id' => $db->lastInsertId()], 'Cadastro realizado');
        break;

    case 'login':
        $d = lerJson();
        $stmt = $db->prepare('SELECT * FROM usuarios WHERE email = :e AND ativo = 1');
        $stmt->execute([':e' => $d['email'] ?? '']);
        $u = $stmt->fetch();

        if (!$u || !password_verify($d['senha'] ?? '', $u['senha_hash'])) {
            erro('E-mail ou senha incorretos', 401);
        }

        $token = gerarToken($u['id']);
        sucesso([
            'token' => $token,
            'usuario' => [
                'id' => $u['id'],
                'nome' => $u['nome'],
                'email' => $u['email'],
                'tipo' => $u['tipo']
            ]
        ], 'Login realizado');
        break;

    case 'logout':
        $headers = getallheaders();
        if (preg_match('/Bearer (.+)/', $headers['Authorization'] ?? '', $m)) {
            $stmt = $db->prepare('DELETE FROM sessoes WHERE id = :id');
            $stmt->execute([':id' => $m[1]]);
        }
        sucesso([], 'Logout realizado');
        break;

    case 'me':
        $u = exigirLogin();
        sucesso($u);
        break;

    default:
        erro('Ação inválida', 400);
}