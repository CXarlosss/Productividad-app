// @ts-check

document.addEventListener("DOMContentLoaded", () => {
    /** @type {HTMLSpanElement | null} */
    const tareasCompletadasEl = document.getElementById("tareasCompletadas");
    /** @type {HTMLSpanElement | null} */
    const horasEnfoqueEl = document.getElementById("horasEnfoque");
    /** @type {HTMLSpanElement | null} */
    const eventosProgramadosEl = document.getElementById("eventosProgramados");
    /** @type {HTMLCanvasElement | null} */
    const tareasChartEl = /** @type {HTMLCanvasElement | null} */(document.getElementById("tareasChart"));
    /** @type {HTMLCanvasElement | null} */
    const enfoqueChartEl = /** @type {HTMLCanvasElement | null} */(document.getElementById("enfoqueChart"));

    // 🚀 Inicializar valores en `localStorage` si no existen
    if (!localStorage.getItem("tareasCompletadas")) localStorage.setItem("tareasCompletadas", "0");
    if (!localStorage.getItem("eventosProgramados")) localStorage.setItem("eventosProgramados", "0");

    // ✅ Obtener datos desde `localStorage`
    const tareasCompletadas = parseInt(localStorage.getItem("tareasCompletadas") || "0", 10);
    const eventosProgramados = parseInt(localStorage.getItem("eventosProgramados") || "0", 10);

    // 📅 Obtener datos de horas de enfoque por día (Últimos 7 días)
    let historialEnfoque = JSON.parse(localStorage.getItem("historialEnfoque") || "[]");

    // Si no hay historial, generar valores de ejemplo
    if (historialEnfoque.length === 0) {
        historialEnfoque = [
            { dia: "Lunes", horas: 2 },
            { dia: "Martes", horas: 3 },
            { dia: "Miércoles", horas: 1 },
            { dia: "Jueves", horas: 4 },
            { dia: "Viernes", horas: 2 },
            { dia: "Sábado", horas: 5 },
            { dia: "Domingo", horas: 1 }
        ];
        localStorage.setItem("historialEnfoque", JSON.stringify(historialEnfoque));
    }

    // Obtener total de horas de enfoque en la semana
    const totalHorasEnfoque = historialEnfoque.reduce((sum, dia) => sum + dia.horas, 0);

    // ✅ Mostrar valores en la UI si los elementos existen
    if (tareasCompletadasEl) tareasCompletadasEl.innerText = `${tareasCompletadas}`;
    if (horasEnfoqueEl) horasEnfoqueEl.innerText = `${totalHorasEnfoque}h`;
    if (eventosProgramadosEl) eventosProgramadosEl.innerText = `${eventosProgramados}`;

    // 📊 Gráfico de Tareas Completadas
    if (tareasChartEl) {
        const ctxTareas = tareasChartEl.getContext("2d");
        if (ctxTareas) {
           
            // @ts-ignore
            new Chart(ctxTareas, {
                type: "doughnut",
                data: {
                    labels: ["Tareas Completadas", "Eventos Programados", "Horas de Enfoque"],
                    datasets: [{
                        data: [tareasCompletadas, eventosProgramados, totalHorasEnfoque],
                        backgroundColor: ["#3b82f8", "#8b5cf6", "#16a34a"],
                        hoverOffset: 10
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: { color: "#ffffff" }
                        }
                    }
                }
            });
        }
    }

    // 📊 Gráfico de Enfoque Semanal (Línea)
    if (enfoqueChartEl) {
        const ctxEnfoque = enfoqueChartEl.getContext("2d");
        if (ctxEnfoque) {
            // @ts-ignore
            new Chart(ctxEnfoque, {
                type: "line",
                data: {
                    labels: historialEnfoque.map(dia => dia.dia),
                    datasets: [{
                        label: "Horas de Enfoque",
                        data: historialEnfoque.map(dia => dia.horas),
                        borderColor: "#f59e0b",
                        backgroundColor: "rgba(245, 158, 11, 0.2)",
                        borderWidth: 2,
                        pointRadius: 5,
                        pointBackgroundColor: "#f59e0b",
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            suggestedMax: 6
                        }
                    },
                    plugins: {
                        legend: { display: false }
                    }
                }
            });
        } else {
            console.error("⚠️ No se pudo obtener el contexto 2D del canvas #enfoqueChart.");
        }
    } else {
        console.error("⚠️ El elemento canvas #enfoqueChart no se encontró en el DOM.");
    }
 
    
});
