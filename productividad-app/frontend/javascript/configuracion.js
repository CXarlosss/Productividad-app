// @ts-check

document.addEventListener("DOMContentLoaded", () => {
    /** @type {HTMLSelectElement | null} */
    const temaEl = /** @type {HTMLSelectElement | null} */(document.getElementById("tema"));
    /** @type {HTMLSelectElement | null} */
    const formatoFechaEl =  /** @type {HTMLSelectElement | null} */(document.getElementById("formatoFecha"));
    /** @type {HTMLInputElement | null} */
    const sonidoNotificacionesEl = /** @type {HTMLInputElement | null} */(document.getElementById("sonidoNotificaciones"));
    /** @type {HTMLInputElement | null} */
    const notificacionesEl = /** @type {HTMLInputElement | null} */ (document.getElementById("notificaciones"));
    /** @type {HTMLSelectElement | null} */
    const idiomaEl =/** @type {HTMLSelectElement | null} */( document.getElementById("idioma"));
    /** @type {HTMLButtonElement | null} */
    const exportarDatosBtn =  /** @type {HTMLButtonElement | null} */ (document.getElementById("exportarDatos"));
    /** @type {HTMLButtonElement | null} */
    const restablecerDatosBtn = /** @type {HTMLButtonElement | null} */(document.getElementById("restablecerDatos"));

    // 🚀 Recuperar configuraciones almacenadas
    
    console.log("🔄 Cargando preferencias...");

    // 🚀 Recuperar configuraciones almacenadas
    cargarPreferencias();

    // 🎨 Cambiar tema
    temaEl?.addEventListener("change", () => {
        console.log(`🎨 Tema cambiado a: ${temaEl.value}`);
        aplicarTema(temaEl.value);
        guardarPreferencias();
    });

    // 📅 Cambiar formato de fecha
    formatoFechaEl?.addEventListener("change", () => {
        console.log(`📅 Formato de fecha cambiado a: ${formatoFechaEl.value}`);
        guardarPreferencias();
    });

    // 🔊 Activar/Desactivar sonido
    sonidoNotificacionesEl?.addEventListener("change", () => {
        console.log(`🔊 Sonido de notificaciones: ${sonidoNotificacionesEl.checked}`);
        guardarPreferencias();
    });

    // 🔔 Activar/Desactivar notificaciones
    notificacionesEl?.addEventListener("change", () => {
        console.log(`🔔 Notificaciones: ${notificacionesEl.checked}`);
        guardarPreferencias();
    });

    // 🌍 Cambiar idioma
    idiomaEl?.addEventListener("change", () => {
        console.log(`🌍 Idioma cambiado a: ${idiomaEl.value}`);
        guardarPreferencias();
    });

    // 📤 Exportar datos
    exportarDatosBtn?.addEventListener("click", () => {
        exportarDatos();
    });

    // ⚠️ Restablecer datos
    restablecerDatosBtn?.addEventListener("click", () => {
        if (confirm("⚠️ ¿Estás seguro de que quieres restablecer los datos? Esta acción no se puede deshacer.")) {
            localStorage.clear();
            location.reload();
        }
    });

    // 📌 Función para guardar preferencias
    function guardarPreferencias() {
        const preferencias = {
            tema: temaEl?.value || "azul",
            formatoFecha: formatoFechaEl?.value || "dd/mm/yyyy",
            sonidoNotificaciones: sonidoNotificacionesEl?.checked || false,
            notificaciones: notificacionesEl?.checked || false,
            idioma: idiomaEl?.value || "es"
        };

        console.log("💾 Guardando preferencias...", preferencias);
        localStorage.setItem("preferenciasUsuario", JSON.stringify(preferencias));
    }

    // 📌 Función para cargar preferencias al inicio
    function cargarPreferencias() {
        const preferencias = JSON.parse(localStorage.getItem("preferenciasUsuario") || "{}");

        console.log("📂 Preferencias cargadas:", preferencias);

        if (temaEl) temaEl.value = preferencias.tema || "azul";
        if (formatoFechaEl) formatoFechaEl.value = preferencias.formatoFecha || "dd/mm/yyyy";
        if (sonidoNotificacionesEl) sonidoNotificacionesEl.checked = preferencias.sonidoNotificaciones || false;
        if (notificacionesEl) notificacionesEl.checked = preferencias.notificaciones || false;
        if (idiomaEl) idiomaEl.value = preferencias.idioma || "es";

        aplicarTema(preferencias.tema || "azul");
    }

    // 🎨 Aplicar tema dinámicamente
    function aplicarTema(tema) {
        console.log(`🖌 Aplicando tema: ${tema}`);
        document.body.classList.remove("tema-azul", "tema-morado", "tema-verde", "tema-rojo");
        document.body.classList.add(`tema-${tema}`);
    }

    // 📤 Función para exportar datos como JSON
    function exportarDatos() {
        const datos = {
            preferencias: JSON.parse(localStorage.getItem("preferenciasUsuario") || "{}"),
            tareas: JSON.parse(localStorage.getItem("tareas") || "[]"),
            eventos: JSON.parse(localStorage.getItem("eventos") || "[]")
        };

        console.log("📤 Exportando datos...", datos);

        const blob = new Blob([JSON.stringify(datos, null, 2)], { type: "application/json" });
        const enlace = document.createElement("a");
        enlace.href = URL.createObjectURL(blob);
        enlace.download = "mis_datos.json";
        enlace.click();
    }
});