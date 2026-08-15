#!/bin/bash
# ShortLink - Script de Build
# Compila o componente Java e prepara o ambiente

set -e

echo "=========================================="
echo "  ShortLink - Script de Build"
echo "=========================================="
echo ""

# Verificar dependências
echo "[1/4] Verificando dependências..."

if ! command -v java &> /dev/null; then
    echo "❌ Java não encontrado. Instale o JDK 8+ para compilar o engine."
    echo "   O frontend funcionará normalmente sem o Java."
    exit 1
fi

JAVA_VERSION=$(java -version 2>&1 | head -n 1 | cut -d'"' -f2)
echo "✅ Java detectado: $JAVA_VERSION"

if ! command -v javac &> /dev/null; then
    echo "❌ javac não encontrado. Instale o JDK completo."
    exit 1
fi

echo "✅ javac detectado"

# Compilar Java
echo ""
echo "[2/4] Compilando ShortLinkEngine.java..."
javac -encoding UTF-8 ShortLinkEngine.java

if [ $? -eq 0 ]; then
    echo "✅ Compilação Java bem-sucedida"
else
    echo "❌ Falha na compilação Java"
    exit 1
fi

# Criar JAR
echo ""
echo "[3/4] Criando ShortLinkEngine.jar..."
jar cvfe ShortLinkEngine.jar ShortLinkEngine ShortLinkEngine.class

if [ -f ShortLinkEngine.jar ]; then
    echo "✅ JAR criado: ShortLinkEngine.jar"
else
    echo "❌ Falha ao criar JAR"
    exit 1
fi

# Testar
echo ""
echo "[4/4] Testando engine..."
SLUG=$(java -jar ShortLinkEngine.jar generate 8)
if [ -n "$SLUG" ] && [ ${#SLUG} -eq 8 ]; then
    echo "✅ Engine testado com sucesso"
    echo "   Slug gerado: $SLUG"
else
    echo "⚠️  Teste do engine falhou, mas o JAR foi criado"
fi

echo ""
echo "=========================================="
echo "  Build concluído! 🚀"
echo "=========================================="
echo ""
echo "Para iniciar o servidor:"
echo "  php -S localhost:8080"
echo ""
echo "Ou com Docker:"
echo "  docker-compose up -d"
echo ""
echo "Acesse: http://localhost:8080"
echo ""
