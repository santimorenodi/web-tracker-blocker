async function updateCountdown() {
    try {
        // Compatibilidad entre navegadores
        const api = typeof browser !== 'undefined' ? browser : chrome;

        const data = await api.storage.local.get('blockedUntil');
        const countdownElement = document.getElementById('countdown');

        if (data.blockedUntil) {
            const now = Date.now();
            const diff = data.blockedUntil - now;

            if (diff <= 0) {
                countdownElement.innerText = "¡Ya puedes volver!";
                countdownElement.style.color = "#10b981"; // Verde éxito
            } else {
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                // Formatear con ceros a la izquierda para que no "salte" el texto
                const hDisplay = hours > 0 ? `${hours}h ` : "";
                const mDisplay = minutes < 10 && hours > 0 ? `0${minutes}m ` : `${minutes}m `;
                const sDisplay = seconds < 10 ? `0${seconds}s` : `${seconds}s`;

                countdownElement.innerText = `Desbloqueo en: ${hDisplay}${mDisplay}${sDisplay}`;
            }
        } else {
            countdownElement.innerText = "No hay bloqueos activos";
        }
    } catch (e) {
        console.error("Error actualizando contador:", e);
    }
}

// Actualizar cada segundo para un efecto fluido
setInterval(updateCountdown, 1000);
updateCountdown();
