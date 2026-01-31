let targetDomain = "x.com";
let limitMs = 3 * 60 * 1000;    // 3 minutos
let blockMs = 1 * 60 * 60 * 1000; // 1 hora

let trackingInterval = null;

async function updateUsage() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.url) return;

    try {
        let url = new URL(tab.url);
        if (url.hostname === targetDomain || url.hostname.endsWith("." + targetDomain)) {
            let data = await chrome.storage.local.get(['usedTime', 'blockedUntil']);
            let now = Date.now();

            if (data.blockedUntil && now < data.blockedUntil) {
                chrome.tabs.update(tab.id, { url: chrome.runtime.getURL("blocked.html") });
                return;
            }

            let newTime = (data.usedTime || 0) + 1000;

            if (newTime >= limitMs) {
                await chrome.storage.local.set({ usedTime: 0, blockedUntil: now + blockMs });
                chrome.tabs.update(tab.id, { url: chrome.runtime.getURL("blocked.html") });
            } else {
                await chrome.storage.local.set({ usedTime: newTime });
            }
        }
    } catch (e) {
        // Ignorar URLs internas
    }
}

// Escuchar cambios de pestaña y actualizaciones
chrome.tabs.onActivated.addListener(updateUsage);
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') updateUsage();
});

// Intervalo de seguridad mientras la pestaña está activa
setInterval(updateUsage, 1000);
