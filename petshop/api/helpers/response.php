<?php

function responder($dados, $status = 200) {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($dados, JSON_UNESCAPED_UNICODE);
    exit;
}

function sucesso($dados = [], $msg = 'OK') {
    responder(['ok' => true, 'msg' => $msg, 'dados' => $dados]);
}

function erro($msg = 'Erro', $status = 400) {
    responder(['ok' => false, 'erro' => $msg], $status);
}

function lerJson() {
    return json_decode(file_get_contents('php://input'), true) ?: [];
}