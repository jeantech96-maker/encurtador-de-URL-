<div align="center">

  <!-- Logo SVG -->
  <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect width="80" height="80" rx="20" fill="#0f172a"/>
    <path d="M28 36 L28 44 M32 36 L32 44 M36 36 L36 44" stroke="#3b82f6" stroke-width="3" stroke-linecap="round"/>
    <path d="M44 36 C48 36 48 44 44 44" stroke="#3b82f6" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M52 36 L56 36 M54 36 L54 44 M52 44 L56 44" stroke="#3b82f6" stroke-width="3" stroke-linecap="round"/>
  </svg>

  <h1>🔗 ShortLink</h1>

  <p><strong>Encurtador de Links Profissional</strong> — Links mais curtos, impacto maior.</p>

  <!-- Badges Shield -->
  <p>
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5"/>
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript"/>
    <img src="https://img.shields.io/badge/PHP-777BB4?style=flat-square&logo=php&logoColor=white" alt="PHP"/>
    <img src="https://img.shields.io/badge/Java-ED8B00?style=flat-square&logo=openjdk&logoColor=white" alt="Java"/>
    <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/>
  </p>

  <p>
    <img src="https://img.shields.io/badge/versão-1.0.0-0f172a?style=flat-square" alt="Version"/>
    <img src="https://img.shields.io/badge/licença-MIT-green?style=flat-square" alt="License"/>
    <img src="https://img.shields.io/badge/estado-✅%20pronto-success?style=flat-square" alt="Status"/>
  </p>

</div>

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Screenshots](#-screenshots)
- [Instalação](#-instalação)
- [Uso](#-uso)
- [API REST](#-api-rest)
- [Arquitetura](#-arquitetura)
- [Segurança](#-segurança)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

---

## 🎯 Visão Geral

**ShortLink** é uma ferramenta utilitária completa que combina **lógica de programação sólida** e **interface amigável** para criar, gerenciar e rastrear links encurtados. Desenvolvido com as tecnologias mais modernas do mercado, oferece uma solução minimalista, segura e profissional para encurtamento de URLs.

### Por que ShortLink?

| Característica | Benefício |
|---------------|-----------|
| ⚡ **Rápido** | Geração instantânea de slugs com SecureRandom |
| 🔒 **Seguro** | Validação rigorosa, sem caracteres ambíguos |
| 📱 **Responsivo** | Funciona perfeitamente em desktop, tablet e mobile |
| 🎨 **Minimalista** | Design clean com glassmorphism e micro-animations |
| 🔌 **API REST** | Integração fácil com qualquer aplicação |
| 🐳 **Docker** | Deploy em segundos com Docker Compose |

---

## ✨ Funcionalidades

### 🪄 Encurtamento Inteligente
- **Slugs automáticos** — gerados criptograficamente com `SecureRandom` (Java)
- **Slugs personalizados** — `short.link/promo2024` ao seu gosto
- **Expiração programada** — defina prazo de validade (1h, 24h, 7d, 30d)
- **Validação em tempo real** — feedback instantâneo de erros

### 📊 Painel de Estatísticas
- Contador de **cliques** por link
- **Taxa de conversão** geral
- Data de **criação** e **expiração**
- Histórico completo com **persistência local**

### 🌐 API REST Completa
- `POST /api/shorten` — criar link curto
- `GET /{slug}` — redirecionar para URL original
- `GET /api/stats/{slug}` — estatísticas detalhadas
- `GET /api/list` — listar todos os links

---

## 🛠️ Tecnologias

```
┌─────────────────────────────────────────────────────────┐
│                    SHORTLINK STACK                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  🎨 FRONTEND              ⚙️ BACKEND       🐳 DEVOPS     │
│  ─────────────            ──────────      ────────      │
│  HTML5 Semântico          PHP 8.2+       Docker        │
│  JavaScript Vanilla       API REST        Apache       │
│  Tailwind CSS 3.0         JSON DB         mod_rewrite  │
│  Font Awesome 6           OpenAPI         GZIP         │
│  Google Fonts (Inter)     CORS            Cache        │
│                                                         │
│  ☕ ENGINE: Java 17 (SecureRandom + SHA-256)           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

| Camada | Tecnologia | Badge |
|--------|-----------|-------|
| **Frontend** | HTML5 | ![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) |
| **Frontend** | JavaScript (ES6+) | ![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) |
| **Frontend** | Tailwind CSS | ![Tailwind](https://img.shields.io/badge/-Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white) |
| **Frontend** | Font Awesome | ![FontAwesome](https://img.shields.io/badge/-Font%20Awesome-528DD7?style=flat-square&logo=fontawesome&logoColor=white) |
| **Backend** | PHP 8.2+ | ![PHP](https://img.shields.io/badge/-PHP-777BB4?style=flat-square&logo=php&logoColor=white) |
| **Engine** | Java 17 | ![Java](https://img.shields.io/badge/-Java-ED8B00?style=flat-square&logo=openjdk&logoColor=white) |
| **Servidor** | Apache 2.4 | ![Apache](https://img.shields.io/badge/-Apache-D22128?style=flat-square&logo=apache&logoColor=white) |
| **Container** | Docker | ![Docker](https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=docker&logoColor=white) |

---

## 📸 Screenshots

> Interface principal com design minimalista e profissional:

```
┌─────────────────────────────────────────┐
│  🔗 ShortLink          Encurtar  Hist   │
├─────────────────────────────────────────┤
│                                         │
│   Links mais curtos,                    │
│   impacto maior                         │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │ 🌐 https://exemplo.com/...      │   │
│   ├─────────────────────────────────┤   │
│   │ short.link/  [promo2024]   7d   │   │
│   └─────────────────────────────────┘   │
│                                         │
│   [✨ Encurtar Link]                    │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │ ✅ Link encurtado!              │   │
│   │ short.link/promo2024  [Copiar]  │   │
│   └─────────────────────────────────┘   │
│                                         │
│   ┌──────┐  ┌──────┐  ┌──────┐         │
│   │  15  │  │ 247  │  │  16% │         │
│   │ Links│  │Cliques│  │ Taxa │         │
│   └──────┘  └──────┘  └──────┘         │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🚀 Instalação

### Requisitos

| Requisito | Versão Mínima | Badge |
|-----------|--------------|-------|
| PHP | 7.4+ | ![PHP](https://img.shields.io/badge/PHP-7.4%2B-777BB4?style=flat-square&logo=php) |
| Java (opcional) | 8+ | ![Java](https://img.shields.io/badge/Java-8%2B-ED8B00?style=flat-square&logo=openjdk) |
| Apache/Nginx | 2.4+ | ![Apache](https://img.shields.io/badge/Apache-2.4%2B-D22128?style=flat-square&logo=apache) |
| Docker (opcional) | 20.10+ | ![Docker](https://img.shields.io/badge/Docker-20.10%2B-2496ED?style=flat-square&logo=docker) |

### Método 1: PHP Built-in Server (Rápido)

```bash
# Clone ou extraia o projeto
cd link-shortener

# Iniciar servidor PHP
php -S localhost:8080

# 🌐 Acesse: http://localhost:8080
```

### Método 2: Docker Compose (Recomendado)

```bash
# Clone ou extraia o projeto
cd link-shortener

# Compilar Java Engine (opcional)
docker-compose --profile build run --rm java-builder

# Iniciar stack
docker-compose up -d

# 🌐 Acesse: http://localhost:8080
```

### Método 3: Compilar Java Engine

```bash
cd link-shortener

# Compilar automaticamente
./build.sh

# Ou manualmente
javac ShortLinkEngine.java
jar cvfe ShortLinkEngine.jar ShortLinkEngine ShortLinkEngine.class

# Testar
java -jar ShortLinkEngine.jar generate 8
# Output: abc12345
```

---

## 📡 Uso

### Interface Web

1. Acesse a página inicial
2. Cole sua URL longa no campo **"URL original"**
3. (Opcional) Defina um **slug personalizado** e prazo de **expiração**
4. Clique em **"Encurtar Link"**
5. Copie o link curto e compartilhe!

### Linha de Comando (Java Engine)

```bash
# Gerar slug aleatório
java -jar ShortLinkEngine.jar generate 8
# abc12345

# Gerar hash de URL
java -jar ShortLinkEngine.jar hash "https://exemplo.com"
# a1b2c3d4

# Verificar validade de slug
java -jar ShortLinkEngine.jar verify "promo2024"
# VALID

# Informações do engine
java -jar ShortLinkEngine.jar info
```

---

## 🔌 API REST

### `POST /api/shorten` — Criar Link Curto

```bash
curl -X POST http://localhost:8080/api.php/api/shorten \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://exemplo.com/pagina/muito-longa-com-titulo-grande",
    "slug": "promo24",
    "expires": "7d"
  }'
```

**Resposta `200 OK`:**
```json
{
  "success": true,
  "shortUrl": "http://localhost:8080/promo24",
  "slug": "promo24",
  "originalUrl": "https://exemplo.com/pagina/muito-longa-com-titulo-grande",
  "createdAt": "2024-01-15T10:30:00+00:00",
  "expiresAt": "2024-01-22T10:30:00+00:00",
  "clicks": 0
}
```

### `GET /{slug}` — Redirecionar

```bash
# Acessar o slug redireciona automaticamente
curl -L http://localhost:8080/promo24
# → 302 Redirect → https://exemplo.com/pagina/muito-longa...
```

### `GET /api/stats/{slug}` — Estatísticas

```bash
curl http://localhost:8080/api.php/api/stats/promo24
```

**Resposta:**
```json
{
  "success": true,
  "slug": "promo24",
  "originalUrl": "https://exemplo.com/...",
  "createdAt": "2024-01-15T10:30:00+00:00",
  "expiresAt": "2024-01-22T10:30:00+00:00",
  "clicks": 42,
  "expired": false
}
```

### `GET /api/list` — Listar Todos

```bash
curl http://localhost:8080/api.php/api/list
```

---

## 🏗️ Arquitetura

```
┌────────────────────────────────────────────────────────────┐
│                         CLIENTE                            │
│    ┌──────────┐  ┌──────────┐  ┌──────────┐                │
│    │  Navegador │  │   cURL   │  │  Mobile  │                │
│    └────┬─────┘  └────┬─────┘  └────┬─────┘                │
│         │            │            │                         │
│         └────────────┴────────────┘                         │
│                      │                                     │
│              ┌───────┴───────┐                            │
│              │  Apache/Nginx  │  ← mod_rewrite             │
│              │   (VirtualHost)│  ← .htaccess               │
│              └───────┬───────┘                            │
│                      │                                     │
│         ┌────────────┼────────────┐                        │
│         │            │            │                        │
│    ┌────┴────┐  ┌───┴────┐  ┌────┴────┐                 │
│    │index.html│  │api.php │  │{slug}   │                 │
│    │ (Static) │  │ (API)  │  │(Redirect)│                 │
│    └──────────┘  └───┬────┘  └─────────┘                 │
│                      │                                     │
│              ┌───────┴───────┐                            │
│              │  PHP Backend  │                            │
│              │  ┌─────────┐  │                            │
│              │  │JSON DB  │  │ ← links.db                 │
│              │  │CORS/Auth│  │                            │
│              │  │Validação│  │                            │
│              │  └─────────┘  │                            │
│              │       │       │                            │
│              │  ┌────┴────┐  │                            │
│              │  │Java JAR │  │ ← ShortLinkEngine.jar      │
│              │  │SecureRandom│                            │
│              │  │SHA-256    │                            │
│              │  └─────────┘  │                            │
│              └───────────────┘                            │
└────────────────────────────────────────────────────────────┘
```

### Fluxo de Dados

```
1. Usuário insere URL → [Frontend JS] valida formato
2. JS envia POST → [PHP api.php] processa requisição
3. PHP chama → [Java JAR] gera slug criptograficamente seguro
4. PHP salva → [JSON links.db] persiste dados
5. PHP responde → [JSON] com shortUrl
6. Usuário acessa /slug → [PHP] redireciona com 302
7. Clique incrementado → [PHP] atualiza contador
```

---

## 🔒 Segurança

| Camada | Medida | Implementação |
|--------|--------|---------------|
| **Validação** | URL segura | Apenas `http://` e `https://` |
| **Sanitização** | Slug limpo | Regex: `^[a-zA-Z0-9-]+$` |
| **Aleatoriedade** | Slug único | `SecureRandom` (Java) / `random_int` (PHP) |
| **Ambiguidade** | Caracteres seguros | Sem `0`, `O`, `1`, `l`, `I` |
| **Expiração** | Links temporários | Verificação `strtotime()` no PHP |
| **Arquivos** | Proteção de dados | `.htaccess` nega acesso a `links.db` |
| **CORS** | Cross-origin seguro | Headers configurados no PHP |

---

## 📁 Estrutura de Arquivos

```
link-shortener/
├── 📄 index.html              # Interface principal (18KB)
├── 📄 script.js               # Lógica frontend completa (15KB)
├── 📄 api.php                 # Backend PHP REST (6KB)
├── ☕ ShortLinkEngine.java    # Engine Java (6KB)
├── 📦 ShortLinkEngine.jar     # JAR executável
├── ⚙️ .htaccess               # Regras Apache rewrite
├── 🐳 docker-compose.yml      # Orquestração Docker
├── 🔧 build.sh                # Script de build automatizado
├── 🎨 tailwind.config.js      # Config tema Tailwind
├── 🚫 .gitignore              # Exclusões Git
└── 📖 README.md               # Documentação (você está aqui!)
```

---

## 🤝 Contribuição

Contribuições são bem-vindas! Siga os passos:

1. **Fork** o projeto
2. Crie uma **branch** (`git checkout -b feature/nova-funcionalidade`)
3. **Commit** suas mudanças (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. **Push** para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um **Pull Request**

### Ideias para Contribuir

- [ ] Tema escuro / Dark Mode
- [ ] Geração de QR Code para cada link
- [ ] Autenticação de usuários (JWT)
- [ ] Analytics avançado (geolocalização, dispositivos)
- [ ] Painel administrativo
- [ ] Rate limiting na API
- [ ] Banco de dados MySQL/PostgreSQL

---

## 📄 Licença

```
MIT License

Copyright (c) 2024 ShortLink

Permissão é concedida, gratuitamente, a qualquer pessoa que obtenha uma cópia
deste software e dos arquivos de documentação associados (o "Software"), para
lidarem no Software sem restrição, incluindo, sem limitação, os direitos de
usar, copiar, modificar, mesclar, publicar, distribuir, sublicenciar e/ou vender
cópias do Software, e para permitir que as pessoas a quem o Software é
fornecido o façam, desde que as seguintes condições sejam atendidas:

A notificação de copyright acima e esta notificação de permissão devem ser
incluídas em todas as cópias ou partes substanciais do Software.

O SOFTWARE É FORNECIDO "NO ESTADO EM QUE SE ENCONTRA", SEM GARANTIA DE
QUALQUER TIPO, EXPRESSA OU IMPLÍCITA, INCLUINDO, MAS NÃO SE LIMITANDO ÀS
GARANTIAS DE COMERCIALIZAÇÃO, ADEQUAÇÃO A UM DETERMINADO FIM E NÃO VIOLAÇÃO.
```

---

<div align="center">

  **Feito com ❤️ e muitas linhas de código.**

  <br>

  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white" alt="PHP"/>
  <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/>

  <br><br>

  <sub>ShortLink — Links mais curtos, impacto maior. 🔗</sub>

</div>
