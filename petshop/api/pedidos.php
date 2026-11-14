<?php
// ============================================================
// API de Pedidos
// GET    /api/pedidos.php          → lista todos (admin)
// GET    /api/pedidos.php?id=1     → um pedido com itens
// POST   /api/pedidos.php          → cria pedido (checkout)
// PUT    /api/pedidos.php?id=1     → atualiza status (admin)
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
          $stmt = $db->prepare('SELECT p.*, u.nome AS cliente_nome, u.email AS cliente_email
                      FROM pedidos p
                      JOIN usuarios u ON u.id = p.usuario_id
                      WHERE p.id = :id');
$stmt->execute([':id' => $id]);
$pedido = $stmt->fetch();
            if (!$pedido) erro('Pedido não encontrado', 404);

            $stmt = $db->prepare('SELECT pi.*, pr.nome AS produto_nome, pr.imagem AS produto_imagem
                                  FROM pedidos_itens pi
                                  JOIN produtos pr ON pr.id = pi.produto_id
                                  WHERE pi.pedido_id = :id');
            $stmt->execute([':id' => $id]);
            $pedido['itens'] = $stmt->fetchAll();

            sucesso($pedido);
        }

        $stmt = $db->query('SELECT p.id, p.status, p.total, p.forma_pagamento,
                           p.cep, p.endereco_entrega, p.created_at,
                           u.nome AS cliente_nome
                    FROM pedidos p
                    JOIN usuarios u ON u.id = p.usuario_id
                    ORDER BY p.created_at DESC');
        sucesso($stmt->fetchAll());
        break;

    case 'POST':
        $d = lerJson();

        if (empty($d['itens']) || !is_array($d['itens'])) {
            erro('Itens do pedido obrigatórios');
        }

        $usuario_id = $d['usuario_id'] ?? 2;
        $forma_pagamento = $d['forma_pagamento'] ?? 'pix';

        // ---- Endereço completo ----
        $cep         = preg_replace('/\D/', '', $d['cep'] ?? '');
        $rua         = $d['rua'] ?? '';
        $numero      = $d['numero'] ?? '';
        $complemento = $d['complemento'] ?? '';
        $bairro      = $d['bairro'] ?? '';
        $cidade      = $d['cidade'] ?? '';
        $estado      = strtoupper($d['estado'] ?? '');

        // Valida CEP
        if (strlen($cep) !== 8) {
            erro('CEP inválido (deve ter 8 dígitos)');
        }

        $endereco_completo = $rua . ', ' . $numero;
        if ($complemento) $endereco_completo .= ' - ' . $complemento;
        if ($bairro)      $endereco_completo .= ' - ' . $bairro;
        $endereco_completo .= ' - ' . $cidade . '/' . $estado;
        $endereco_completo .= ' - CEP ' . substr($cep, 0, 5) . '-' . substr($cep, 5);

        try {
            $db->beginTransaction();

            // Calcula total
            $total = 0;
            $itensPreparados = [];

            foreach ($d['itens'] as $item) {
                $produto_id = (int)($item['produto_id'] ?? 0);
                $qtd = (int)($item['quantidade'] ?? 0);

                if ($produto_id <= 0 || $qtd <= 0) {
                    throw new Exception('Item inválido');
                }

                $stmt = $db->prepare('SELECT nome, preco, estoque FROM produtos WHERE id = :id AND ativo = 1');
                $stmt->execute([':id' => $produto_id]);
                $produto = $stmt->fetch();

                if (!$produto) throw new Exception("Produto $produto_id não encontrado");
                if ($produto['estoque'] < $qtd) throw new Exception("Estoque insuficiente para {$produto['nome']}");

                $subtotal = (float)$produto['preco'] * $qtd;
                $total += $subtotal;

                $itensPreparados[] = [
                    'produto_id' => $produto_id,
                    'quantidade' => $qtd,
                    'preco_unitario' => (float)$produto['preco']
                ];
            }

            // Insere pedido com endereço completo
            $stmt = $db->prepare('INSERT INTO pedidos
                (usuario_id, status, total, endereco_entrega, cep, numero, complemento, bairro, cidade, estado, forma_pagamento)
                VALUES (:u, "pago", :t, :e, :cep, :num, :compl, :b, :cid, :uf, :fp)');
            $stmt->execute([
                ':u'     => $usuario_id,
                ':t'     => $total,
                ':e'     => $endereco_completo,
                ':cep'   => $cep,
                ':num'   => $numero,
                ':compl' => $complemento,
                ':b'     => $bairro,
                ':cid'   => $cidade,
                ':uf'    => $estado,
                ':fp'    => $forma_pagamento
            ]);
            $pedido_id = $db->lastInsertId();

            // Insere itens
            $stmt = $db->prepare('INSERT INTO pedidos_itens
                (pedido_id, produto_id, quantidade, preco_unitario)
                VALUES (:p, :pr, :q, :pu)');
            foreach ($itensPreparados as $it) {
                $stmt->execute([
                    ':p'  => $pedido_id,
                    ':pr' => $it['produto_id'],
                    ':q'  => $it['quantidade'],
                    ':pu' => $it['preco_unitario']
                ]);
            }

            $db->commit();
            sucesso([
                'id' => $pedido_id,
                'total' => $total,
                'endereco' => $endereco_completo
            ], 'Pedido criado com sucesso');
        } catch (Exception $e) {
            $db->rollBack();
            erro($e->getMessage(), 400);
        }
        break;

    case 'PUT':
        exigirAdmin();
        if (!$id) erro('ID obrigatório');
        $d = lerJson();
        $status = $d['status'] ?? null;
        if (!in_array($status, ['pendente', 'pago', 'enviado', 'entregue', 'cancelado'])) {
            erro('Status inválido');
        }
        $stmt = $db->prepare('UPDATE pedidos SET status = :s WHERE id = :id');
        $stmt->execute([':s' => $status, ':id' => $id]);
        sucesso([], 'Status atualizado');
        break;

    default:
        erro('Método não permitido', 405);
}