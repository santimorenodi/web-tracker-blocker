const targetDomain = "x.com";
const limitMs = 3 * 60 * 1000;    // 3 minutos
const blockMs = 1 * 60 * 60 * 1000; // 1 hora

async function checkAndTrack() {
    try {
        // En Firefox Android, active: true es la forma más fiable de pillar la pestaña actual
        let tabs = await browser.tabs.query({ active: true });
        if (tabs.length === 0 || !tabs[0].url) return;

        let tab = tabs[0];
        let url;
        try {
            url = new URL(tab.url);
        } catch (e) {
            return;
        }

        // Comprobación de dominio más robusta (incluye subdominios)
        const isTarget = url.hostname === targetDomain || url.hostname.endsWith("." + targetDomain);

        if (isTarget) {
            let data = await browser.storage.local.get(['usedTime', 'blockedUntil']);
            let now = Date.now();

            // 1. Verificar si estamos en periodo de bloqueo
            if (data.blockedUntil && now < data.blockedUntil) {
                // Solo actualizamos si no estamos ya en la página de bloqueo
                if (!tab.url.includes("blocked.html")) {
                    await browser.tabs.update(tab.id, { url: browser.runtime.getURL("blocked.html") });
                }
                return;
            }

            // 2. Incrementar tiempo de uso
            let newTime = (data.usedTime || 0) + 1000;

            if (newTime >= limitMs) {
                await browser.storage.local.set({
                    usedTime: 0,
                    blockedUntil: now + blockMs
                });
                await browser.tabs.update(tab.id, { url: browser.runtime.getURL("blocked.html") });
            } else {
                await browser.storage.local.set({ usedTime: newTime });
            }
        }
    } catch (error) {
        console.error("Error en el tracker:", error);
    }
}

// Escuchar eventos de navegación habituales
browser.tabs.onActivated.addListener(checkAndTrack);
browser.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (changeInfo.status === 'complete' || changeInfo.url) {
        checkAndTrack();
    }
});

// webNavigation es mucho más fiable para el botón "Atrás/Adelante" y SPAs
if (browser.webNavigation) {
    browser.webNavigation.onCommitted.addListener((details) => {
        if (details.frameId === 0) checkAndTrack();
    });
    browser.webNavigation.onHistoryStateUpdated.addListener((details) => {
        if (details.frameId === 0) checkAndTrack();
    });
}

// Mantener el conteo activo cada segundo
setInterval(checkAndTrack, 1000);
