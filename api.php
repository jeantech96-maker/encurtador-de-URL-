<?php
/**
 * ShortLink API - Backend PHP
 * Endpoints: POST /api/shorten, GET /{slug}, GET /api/stats/{slug}
 * Integra com componente Java via exec() para geração de slugs únicos.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Configurações
define('DB_FILE', __DIR__ . '/links.db');
define('BASE_URL', (isset($_SERVER['HTTPS']) ? 'https://' : 'http://') . $_SERVER['HTTP_HOST'] . dirname($_SERVER['SCRIPT_NAME']) . '/');

// Inicializar "banco" SQLite-like (JSON file)
function getDb() {
    if (!file_exists(DB_FILE)) {
        file_put_contents(DB_FILE, json_encode([]));
    }
    $content = file_get_contents(DB_FILE);
    return json_decode($content, true) ?: [];
}

function saveDb($data) {
    file_put_contents(DB_FILE, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
}

// Gerar slug via Java (fallback para PHP nativo)
function generateSlug($length = 6) {
    $jarPath = __DIR__ . '/ShortLinkEngine.jar';
    
    // Tentar componente Java primeiro
    if (file_exists($jarPath)) {
        $output = [];
        $returnCode = 0;
        exec("java -jar " . escapeshellarg($jarPath) . " generate " . intval($length) . " 2>&1", $output, $returnCode);
        if ($returnCode === 0 && !empty($output[0])) {
            return trim($output[0]);
        }
    }
    
    // Fallback PHP
    $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    $slug = '';
    for ($i = 0; $i < $length; $i++) {
        $slug .= $chars[random_int(0, strlen($chars) - 1)];
    }
    return $slug;
}

// Validar URL
function isValidUrl($url) {
    return filter_var($url, FILTER_VALIDATE_URL) !== false && 
           (strpos($url, 'http://') === 0 || strpos($url, 'https://') === 0);
}

// Sanitizar slug
function sanitizeSlug($slug) {
    return preg_replace('/[^a-z0-9-]/', '-', strtolower($slug));
}

// Calcular expiração
function getExpiration($value) {
    if (!$value) return null;
    $map = ['1h' => 1, '24h' => 24, '7d' => 168, '30d' => 720];
    $hours = $map[$value] ?? 0;
    if (!$hours) return null;
    return date('c', strtotime("+{$hours} hours"));
}

// Roteamento
$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = str_replace(dirname($_SERVER['SCRIPT_NAME']), '', $uri);
$uri = trim($uri, '/');

// POST /api/shorten
if ($method === 'POST' && $uri === 'api/shorten') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (empty($input['url'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'URL é obrigatória']);
        exit;
    }
    
    $url = $input['url'];
    if (!isValidUrl($url)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'URL inválida']);
        exit;
    }
    
    $db = getDb();
    $customSlug = !empty($input['slug']) ? sanitizeSlug($input['slug']) : null;
    
    // Verificar slug customizado duplicado
    if ($customSlug && isset($db[$customSlug])) {
        http_response_code(409);
        echo json_encode(['success' => false, 'message' => 'Slug já está em uso']);
        exit;
    }
    
    $slug = $customSlug ?: generateSlug();
    
    // Garantir unicidade
    while (isset($db[$slug]) && !$customSlug) {
        $slug = generateSlug();
    }
    
    $linkData = [
        'slug' => $slug,
        'originalUrl' => $url,
        'createdAt' => date('c'),
        'expiresAt' => getExpiration($input['expires'] ?? ''),
        'clicks' => 0,
        'custom' => !!$customSlug
    ];
    
    $db[$slug] = $linkData;
    saveDb($db);
    
    echo json_encode([
        'success' => true,
        'shortUrl' => BASE_URL . $slug,
        'slug' => $slug,
        'originalUrl' => $url,
        'createdAt' => $linkData['createdAt'],
        'expiresAt' => $linkData['expiresAt'],
        'clicks' => 0
    ]);
    exit;
}

// GET /api/stats/{slug}
if ($method === 'GET' && preg_match('/^api\/stats\/([a-zA-Z0-9-]+)$/', $uri, $matches)) {
    $slug = $matches[1];
    $db = getDb();
    
    if (!isset($db[$slug])) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Link não encontrado']);
        exit;
    }
    
    $link = $db[$slug];
    
    // Verificar expiração
    $isExpired = $link['expiresAt'] && strtotime($link['expiresAt']) < time();
    
    echo json_encode([
        'success' => true,
        'slug' => $slug,
        'originalUrl' => $link['originalUrl'],
        'createdAt' => $link['createdAt'],
        'expiresAt' => $link['expiresAt'],
        'clicks' => $link['clicks'],
        'expired' => $isExpired
    ]);
    exit;
}

// GET /api/list - Listar todos os links
if ($method === 'GET' && $uri === 'api/list') {
    $db = getDb();
    $links = array_values($db);
    echo json_encode(['success' => true, 'links' => $links, 'count' => count($links)]);
    exit;
}

// GET /{slug} - Redirecionar
if ($method === 'GET' && preg_match('/^([a-zA-Z0-9-]+)$/', $uri, $matches)) {
    $slug = $matches[1];
    
    // Ignorar arquivos estáticos
    if (file_exists(__DIR__ . '/' . $slug) || $slug === 'api.php' || $slug === 'index.html' || $slug === 'script.js') {
        // Deixa o servidor web lidar
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Not found']);
        exit;
    }
    
    $db = getDb();
    
    if (!isset($db[$slug])) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Link não encontrado']);
        exit;
    }
    
    $link = $db[$slug];
    
    // Verificar expiração
    if ($link['expiresAt'] && strtotime($link['expiresAt']) < time()) {
        http_response_code(410);
        echo json_encode(['success' => false, 'message' => 'Link expirado']);
        exit;
    }
    
    // Incrementar cliques
    $db[$slug]['clicks']++;
    saveDb($db);
    
    // Redirecionar
    header('Location: ' . $link['originalUrl'], true, 302);
    exit;
}

// Fallback
http_response_code(404);
echo json_encode(['success' => false, 'message' => 'Endpoint não encontrado']);
