// @ts-check

document.addEventListener("DOMContentLoaded", () => {
    /** @type {HTMLHeadingElement | null} */
    const mesActual = /** @type {HTMLHeadingElement | null} */( document.getElementById("mes-actual"));

    /** @type {HTMLDivElement | null} */
    const calendarioBody =    /** @type {HTMLDivElement | null} */
    (document.getElementById("calendario-body"));

    /** @type {HTMLButtonElement | null} */
    const prevMonthBtn =    /** @type {HTMLButtonElement | null} */
    (document.getElementById("prevMonth"));

    /** @type {HTMLButtonElement | null} */
    const nextMonthBtn =    /** @type {HTMLButtonElement | null} */
    (document.getElementById("nextMonth"));

    /** @type {HTMLInputElement | null} */
    const fechaEventoInput =    /** @type {HTMLInputElement | null} */
    (document.getElementById("fechaEvento"));

    /** @type {HTMLInputElement | null} */
    const tituloEventoInput =     /** @type {HTMLInputElement | null} */
    (document.getElementById("tituloEvento"));

    /** @type {HTMLButtonElement | null} */
    const agregarEventoBtn =     /** @type {HTMLButtonElement | null} */
    (document.getElementById("agregarEvento"));

    /** @type {HTMLUListElement | null} */
    const listaEventos =     /** @type {HTMLUListElement | null} */
    (document.getElementById("listaEventos"));

    let fecha = new Date();

    /** @type {Array<{ fecha: string, titulo: string }>} */
    let eventos = JSON.parse(localStorage.getItem("eventos") || "[]");

    // 🔄 Renderizar el calendario
    function renderizarCalendario() {
        if (!calendarioBody || !mesActual) return;

        const año = fecha.getFullYear();
        const mes = fecha.getMonth();
        const primerDia = new Date(año, mes, 1).getDay();
        const ultimoDia = new Date(año, mes + 1, 0).getDate();

        mesActual.innerText = new Intl.DateTimeFormat("es-ES", { month: "long", year: "numeric" }).format(fecha);

        calendarioBody.innerHTML = ""; // Limpiar el calendario

        // Espacios en blanco antes del primer día del mes
        for (let i = 0; i < primerDia; i++) {
            const espacioVacio = document.createElement("div");
            espacioVacio.classList.add("vacio");
            calendarioBody.appendChild(espacioVacio);
        }

        // Días del mes
        for (let dia = 1; dia <= ultimoDia; dia++) {
            const diaElemento = document.createElement("div");
            diaElemento.classList.add("dia");
            diaElemento.innerText = String(dia);

            // Comprobar si hay eventos en este día
            const fechaStr = `${año}-${(mes + 1).toString().padStart(2, "0")}-${dia.toString().padStart(2, "0")}`;
            if (eventos.some(evento => evento.fecha === fechaStr)) {
                diaElemento.classList.add("con-evento");
            }

            // Evento click en día
            diaElemento.addEventListener("click", () => seleccionarFecha(fechaStr));
            calendarioBody.appendChild(diaElemento);
        }
    }

    // 📅 Cambiar de mes
    prevMonthBtn?.addEventListener("click", () => {
        fecha.setMonth(fecha.getMonth() - 1);
        renderizarCalendario();
    });

    nextMonthBtn?.addEventListener("click", () => {
        fecha.setMonth(fecha.getMonth() + 1);
        renderizarCalendario();
    });

    // 📌 Seleccionar una fecha al hacer clic en un día del calendario
    function seleccionarFecha(fechaSeleccionada) {
        if (fechaEventoInput) {
            fechaEventoInput.value = fechaSeleccionada;
        }
    }

    // ➕ Agregar un evento
    agregarEventoBtn?.addEventListener("click", () => {
        if (!fechaEventoInput || !tituloEventoInput) return;

        const fechaEvento = fechaEventoInput.value.trim();
        const tituloEvento = tituloEventoInput.value.trim();

        if (fechaEvento === "" || tituloEvento === "") {
            alert("⚠️ Debes completar todos los campos.");
            return;
        }

        eventos.push({ fecha: fechaEvento, titulo: tituloEvento });
        localStorage.setItem("eventos", JSON.stringify(eventos));
        actualizarEventosProgramados();

        tituloEventoInput.value = "";
        renderizarCalendario();
        mostrarEventos();
    });
    function actualizarEventosProgramados() {
        localStorage.setItem("eventosProgramados", JSON.stringify(eventos.length));
    
        console.log("✅ Eventos programados actualizados en localStorage:", eventos.length);
    }

    // 📋 Mostrar eventos en la lista
    function mostrarEventos() {
        if (!listaEventos) return;
        listaEventos.innerHTML = "";

        eventos.forEach((evento, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${evento.fecha}</strong>: ${evento.titulo} 
                <button class="eliminar-evento" data-index="${index}">❌</button>
            `;
            listaEventos.appendChild(li);
        });

        // Agregar evento de eliminación con `data-index`
        document.querySelectorAll(".eliminar-evento").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const target = /** @type {HTMLElement} */ (e.target);
                const index = Number(target.dataset.index);
                if (!isNaN(index)) eliminarEvento(index);
            });
        });
    }

    // 🗑️ Eliminar evento de la lista y actualizar `localStorage`
    function eliminarEvento(index) {
        eventos.splice(index, 1);
        localStorage.setItem("eventos", JSON.stringify(eventos));
        renderizarCalendario();
        mostrarEventos();
    }

    // 🚀 Inicializar
    renderizarCalendario();
    mostrarEventos();
});
