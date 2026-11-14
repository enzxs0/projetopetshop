<?php
// ============================================================
// Helpers de autenticação
// ============================================================
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/response.php';

session_start();

function gerarToken($usuarioId) {
    $token = bin2hex(random_bytes(32));
    $db = Database::getConexao();
    $stmt = $db->prepare('INSERT INTO sessoes (id, usuario_id, expires_at)
                          VALUES (:id, :uid, DATE_ADD(NOW(), INTERVAL 7 DAY))');
    $stmt->execute([':id' => $token, ':uid' => $usuarioId]);
    return $token;
}

function usuarioAtual() {
    $headers = getallheaders();
    $auth = $headers['Authorization'] ?? '';
    if (!preg_match('/Bearer (.+)/', $auth, $m)) return null;
    $token = $m[1];

    $db = Database::getConexao();
    $stmt = $db->prepare('SELECT u.id, u.nome, u.email, u.tipo
                          FROM sessoes s
                          JOIN usuarios u ON u.id = s.usuario_id
                          WHERE s.id = :id AND s.expires_at > NOW()');
    $stmt->execute([':id' => $token]);
    return $stmt->fetch() ?: null;
}

function exigirLogin() {
    $u = usuarioAtual();
    if (!$u) erro('Não autenticado', 401);
    return $u;
}

function exigirAdmin() {
    $u = exigirLogin();
    if ($u['tipo'] !== 'admin') erro('Acesso restrito a administradores', 403);
    return $u;
}