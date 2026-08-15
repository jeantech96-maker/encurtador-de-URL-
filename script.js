/**
 * ShortLink - Encurtador de Links Profissional
 * Frontend JavaScript com lógica completa de encurtamento,
 * histórico local, estatísticas, modo noturno e integração com API.
 */

// Estado da aplicação
const AppState = {
    links: JSON.parse(localStorage.getItem('shortlink_history') || '[]'),
    currentTab: 'shorten',
    baseUrl: window.location.origin + (window.location.pathname.replace('index.html', '')) || 'https://short.link/',
    darkMode: localStorage.getItem('shortlink_darkmode') === 'true'
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
    updateStats();
    renderHistory();
    setupEventListeners();
});

// Aplicar tema (claro/escuro)
function applyTheme() {
    const html = document.documentElement;
    const icon = document.getElementById('theme-icon');
    if (AppState.darkMode) {
        html.classList.add('dark');
        if (icon) icon.className = 'fa-solid fa-sun text-yellow-400 transition-colors';
    } else {
        html.classList.remove('dark');
        if (icon) icon.className = 'fa-solid fa-moon text-primary dark:text-yellow-400 transition-colors';
    }
}

// Alternar modo noturno
function toggleDarkMode() {
    AppState.darkMode = !AppState.darkMode;
    localStorage.setItem('shortlink_darkmode', AppState.darkMode);
    applyTheme();
    
    // Atualizar estilos de navegação
    updateNavStyles();
}

// Atualizar estilos da navegação conforme tema
function updateNavStyles() {
    ['shorten', 'history', 'api'].forEach(t => {
        const nav = document.getElementById(`nav-${t}`);
        if (nav) {
            if (AppState.currentTab === t) {
                nav.classList.remove('text-muted', 'dark:text-slate-400');
                nav.classList.add('text-primary', 'dark:text-blue-400', 'bg-slate-100', 'dark:bg-slate-800');
            } else {
                nav.classList.remove('text-primary', 'dark:text-blue-400', 'bg-slate-100', 'dark:bg-slate-800');
                nav.classList.add('text-muted', 'dark:text-slate-400');
            }
        }
    });
}

// Event Listeners
function setupEventListeners() {
    document.getElementById('originalUrl').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') shortenUrl();
    });
    document.getElementById('customSlug').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') shortenUrl();
    });
}

// Navegação entre abas
function switchTab(tab) {
    AppState.currentTab = tab;
    
    // Esconder todas as abas
    ['shorten', 'history', 'api'].forEach(t => {
        document.getElementById(`tab-${t}`).classList.add('hidden');
        const nav = document.getElementById(`nav-${t}`);
        if (nav) {
            nav.classList.remove('text-primary', 'dark:text-blue-400', 'bg-slate-100', 'dark:bg-slate-800');
            nav.classList.add('text-muted', 'dark:text-slate-400');
        }
    });
    
    // Mostrar aba ativa
    document.getElementById(`tab-${tab}`).classList.remove('hidden');
    const activeNav = document.getElementById(`nav-${tab}`);
    if (activeNav) {
        activeNav.classList.remove('text-muted', 'dark:text-slate-400');
        activeNav.classList.add('text-primary', 'dark:text-blue-400', 'bg-slate-100', 'dark:bg-slate-800');
    }
}

// Menu mobile
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// Validar URL
function isValidUrl(string) {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
        return false;
    }
}

// Gerar slug aleatório
function generateSlug(length = 6) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Sanitizar slug customizado
function sanitizeSlug(slug) {
    return slug.toLowerCase()
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

// Calcular data de expiração
function getExpirationDate(value) {
    if (!value) return null;
    const now = new Date();
    const map = { '1h': 1, '24h': 24, '7d': 168, '30d': 720 };
    const hours = map[value] || 0;
    if (!hours) return null;
    return new Date(now.getTime() + hours * 60 * 60 * 1000);
}

// Encurtar URL
async function shortenUrl() {
    const urlInput = document.getElementById('originalUrl');
    const slugInput = document.getElementById('customSlug');
    const expirationSelect = document.getElementById('expiration');
    const btn = document.getElementById('btn-shorten');
    const errorDiv = document.getElementById('url-error');
    
    const url = urlInput.value.trim();
    const customSlug = slugInput.value.trim();
    const expiration = expirationSelect.value;
    
    // Validar URL
    if (!url || !isValidUrl(url)) {
        errorDiv.classList.remove('hidden');
        urlInput.classList.add('border-red-300', 'focus:ring-red-200', 'focus:border-red-400');
        urlInput.classList.remove('focus:ring-accent/30', 'focus:border-accent');
        return;
    }
    
    errorDiv.classList.add('hidden');
    urlInput.classList.remove('border-red-300', 'focus:ring-red-200', 'focus:border-red-400');
    urlInput.classList.add('focus:ring-accent/30', 'focus:border-accent');
    
    // Loading state
    btn.disabled = true;
    const originalBtnContent = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i><span>Encurtando...</span>';
    
    try {
        // Tentar API PHP primeiro, fallback para local
        let result;
        try {
            const response = await fetch('api.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    url: url,
                    slug: customSlug || undefined,
                    expires: expiration || undefined
                })
            });
            if (response.ok) {
                result = await response.json();
            } else {
                throw new Error('API offline');
            }
        } catch (apiError) {
            // Fallback: gerar localmente
            const slug = customSlug ? sanitizeSlug(customSlug) : generateSlug();
            const baseUrl = AppState.baseUrl;
            
            result = {
                success: true,
                shortUrl: baseUrl + slug,
                slug: slug,
                originalUrl: url,
                createdAt: new Date().toISOString(),
                expiresAt: getExpirationDate(expiration)?.toISOString() || null,
                clicks: 0
            };
        }
        
        if (result.success) {
            // Salvar no histórico
            const linkData = {
                id: Date.now().toString(),
                shortUrl: result.shortUrl,
                slug: result.slug,
                originalUrl: result.originalUrl,
                createdAt: result.createdAt || new Date().toISOString(),
                expiresAt: result.expiresAt || null,
                clicks: 0
            };
            
            AppState.links.unshift(linkData);
            localStorage.setItem('shortlink_history', JSON.stringify(AppState.links));
            
            // Mostrar resultado
            showResult(linkData);
            updateStats();
            renderHistory();
            
            // Limpar inputs
            urlInput.value = '';
            slugInput.value = '';
            expirationSelect.value = '';
        } else {
            throw new Error(result.message || 'Erro ao encurtar');
        }
        
    } catch (error) {
        alert('Erro: ' + error.message);
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalBtnContent;
    }
}

// Mostrar resultado
function showResult(link) {
    const resultArea = document.getElementById('result-area');
    const shortUrlInput = document.getElementById('shortUrl');
    const originalSpan = document.getElementById('result-original');
    const clicksSpan = document.getElementById('result-clicks');
    const dateSpan = document.getElementById('result-date');
    
    shortUrlInput.value = link.shortUrl;
    originalSpan.textContent = link.originalUrl;
    clicksSpan.textContent = link.clicks + ' cliques';
    dateSpan.textContent = formatDate(link.createdAt);
    
    resultArea.classList.remove('hidden');
    resultArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Copiar para clipboard
function copyToClipboard() {
    const input = document.getElementById('shortUrl');
    input.select();
    navigator.clipboard.writeText(input.value).then(() => {
        const btn = document.getElementById('btn-copy');
        btn.classList.add('copied');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Copiado';
        
        setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = originalHTML;
        }, 2000);
    });
}

// Compartilhar link
function shareLink() {
    const url = document.getElementById('shortUrl').value;
    if (navigator.share) {
        navigator.share({
            title: 'ShortLink',
            text: 'Confira este link:',
            url: url
        });
    } else {
        copyToClipboard();
    }
}

// Renderizar histórico
function renderHistory() {
    const container = document.getElementById('history-list');
    
    if (AppState.links.length === 0) {
        container.innerHTML = `
            <div class="p-8 text-center text-muted dark:text-slate-400 transition-colors">
                <div class="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-700/30 flex items-center justify-center mx-auto mb-3 transition-colors">
                    <i class="fa-solid fa-link-slash text-slate-300 dark:text-slate-500 text-xl transition-colors"></i>
                </div>
                <p class="text-sm">Nenhum link encurtado ainda.</p>
                <button onclick="switchTab('shorten')" class="mt-3 text-accent text-sm font-medium hover:underline">Criar primeiro link</button>
            </div>`;
        return;
    }
    
    container.innerHTML = AppState.links.map((link, index) => {
        const isExpired = link.expiresAt && new Date(link.expiresAt) < new Date();
        return `
        <div class="link-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4 ${isExpired ? 'opacity-60' : ''}">
            <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                    <a href="${link.shortUrl}" target="_blank" class="text-accent font-semibold text-sm hover:underline truncate">
                        ${link.shortUrl}
                    </a>
                    ${isExpired ? '<span class="px-2 py-0.5 rounded-md bg-red-100 dark:bg-red-500/15 text-red-600 dark:text-red-400 text-xs font-medium">Expirado</span>' : ''}
                    ${link.expiresAt && !isExpired ? '<span class="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 text-xs font-medium">Expira ' + formatDate(link.expiresAt) + '</span>' : ''}
                </div>
                <p class="text-xs text-muted dark:text-slate-400 truncate transition-colors">${link.originalUrl}</p>
                <div class="flex items-center gap-3 mt-2 text-xs text-muted dark:text-slate-400 transition-colors">
                    <span class="flex items-center gap-1"><i class="fa-solid fa-calendar text-slate-400 dark:text-slate-500"></i> ${formatDate(link.createdAt)}</span>
                    <span class="flex items-center gap-1"><i class="fa-solid fa-mouse-pointer text-slate-400 dark:text-slate-500"></i> ${link.clicks} cliques</span>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <button onclick="copyHistoryLink('${link.shortUrl}')" class="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-600 text-muted dark:text-slate-400 hover:text-primary dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-500 transition-colors flex items-center justify-center" title="Copiar">
                    <i class="fa-regular fa-copy text-sm"></i>
                </button>
                <button onclick="incrementClicks(${index})" class="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-600 text-muted dark:text-slate-400 hover:text-primary dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-500 transition-colors flex items-center justify-center" title="Simular clique">
                    <i class="fa-solid fa-arrow-up-right-from-square text-sm"></i>
                </button>
                <button onclick="deleteLink(${index})" class="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-600 text-muted dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-400/50 transition-colors flex items-center justify-center" title="Excluir">
                    <i class="fa-regular fa-trash-can text-sm"></i>
                </button>
            </div>
        </div>`;
    }).join('');
}

// Copiar link do histórico
function copyHistoryLink(url) {
    navigator.clipboard.writeText(url).then(() => {
        // Toast simples
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-4 left-1/2 -translate-x-1/2 bg-primary dark:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg z-50 animate-slide-up transition-colors';
        toast.innerHTML = '<i class="fa-solid fa-check mr-2"></i> Link copiado!';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    });
}

// Incrementar cliques (simulação)
function incrementClicks(index) {
    AppState.links[index].clicks++;
    localStorage.setItem('shortlink_history', JSON.stringify(AppState.links));
    updateStats();
    renderHistory();
    
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 left-1/2 -translate-x-1/2 bg-primary dark:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg z-50 animate-slide-up transition-colors';
    toast.innerHTML = '<i class="fa-solid fa-arrow-up-right-from-square mr-2"></i> Clique registrado!';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

// Excluir link
function deleteLink(index) {
    if (confirm('Tem certeza que deseja excluir este link?')) {
        AppState.links.splice(index, 1);
        localStorage.setItem('shortlink_history', JSON.stringify(AppState.links));
        updateStats();
        renderHistory();
    }
}

// Limpar histórico
function clearHistory() {
    if (AppState.links.length === 0) return;
    if (confirm('Tem certeza que deseja limpar todo o histórico?')) {
        AppState.links = [];
        localStorage.removeItem('shortlink_history');
        updateStats();
        renderHistory();
    }
}

// Atualizar estatísticas
function updateStats() {
    const totalLinks = AppState.links.length;
    const totalClicks = AppState.links.reduce((sum, link) => sum + (link.clicks || 0), 0);
    const clickRate = totalLinks > 0 ? Math.round((totalClicks / totalLinks) * 10) / 10 : 0;
    
    animateNumber('stat-links', totalLinks);
    animateNumber('stat-clicks', totalClicks);
    document.getElementById('stat-rate').textContent = clickRate + '%';
}

// Animar número
function animateNumber(elementId, target) {
    const element = document.getElementById(elementId);
    const current = parseInt(element.textContent) || 0;
    if (current === target) return;
    
    const duration = 500;
    const start = performance.now();
    
    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const value = Math.round(current + (target - current) * eased);
        element.textContent = value;
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

// Formatar data
function formatDate(isoString) {
    if (!isoString) return '-';
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'agora';
    if (diffMins < 60) return `${diffMins} min atrás`;
    if (diffHours < 24) return `${diffHours}h atrás`;
    if (diffDays < 7) return `${diffDays}d atrás`;
    
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' });
}
