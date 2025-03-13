// @ts-check

// 📌 Elementos del DOM
const inputTarea = /** @type {HTMLInputElement | null} */ (document.getElementById("nuevaTarea"));
const listaTareas = /** @type {HTMLUListElement | null} */ (document.getElementById("listaTareas"));
const filtros = /** @type {NodeListOf<HTMLButtonElement>} */ (document.querySelectorAll(".filtros button"));

// 📌 Verificar existencia de elementos antes de continuar
if (!inputTarea || !listaTareas || filtros.length === 0) {
    console.error("Error: No se encontraron algunos elementos en el DOM.");
} else {
    document.addEventListener("DOMContentLoaded", () => {
        renderizarTareas();
    });

    inputTarea.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            agregarTarea();
        }
    });

    // 📌 Función para agregar tareas
    function agregarTarea() {
        if (!inputTarea) return;
        const textoTarea = inputTarea.value.trim();

        if (textoTarea === "") {
            alert("Por favor, escribe una tarea.");
            return;
        }

        const tarea = {
            id: Date.now(),
            texto: textoTarea,
            completada: false,
        };

        const tareas = obtenerTareas();
        tareas.push(tarea);
        guardarTareas(tareas);

        renderizarTareas();
        inputTarea.value = "";
    }

    // 📌 Función para eliminar tarea
    function eliminarTarea(id) {
        const tareas = obtenerTareas().filter((tarea) => tarea.id !== id);
        guardarTareas(tareas);
        renderizarTareas();
    }

    // 📌 Función para marcar como completada
    function completarTarea(id) {
        const tareas = obtenerTareas().map((tarea) => ({
            ...tarea,
            completada: tarea.id === id ? !tarea.completada : tarea.completada,
        }));
        guardarTareas(tareas);
        actualizarEstadisticas();
        renderizarTareas();
    }
    function actualizarEstadisticas() {
        const tareas = obtenerTareas();
        const tareasCompletadas = tareas.filter((tarea) => tarea.completada).length;
    
        localStorage.setItem("tareasCompletadas", JSON.stringify(tareasCompletadas));
    
        console.log("✅ Estadísticas actualizadas en localStorage:", { tareasCompletadas });
    }

    // 📌 Función para filtrar tareas
    function filtrarTareas(filtro) {
        renderizarTareas(filtro);
    }

    // 📌 Función para obtener tareas desde localStorage
    function obtenerTareas() {
        const tareasGuardadas = localStorage.getItem("tareas");
        return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
    }

    // 📌 Función para guardar tareas en localStorage
    function guardarTareas(tareas) {
        localStorage.setItem("tareas", JSON.stringify(tareas));
    }

    // 📌 Función para renderizar tareas
    function renderizarTareas(filtro = "todas") {
        if (!listaTareas) return;
        listaTareas.innerHTML = "";
        const tareas = obtenerTareas();

        tareas
            .filter((tarea) => {
                if (filtro === "pendientes") return !tarea.completada;
                if (filtro === "completadas") return tarea.completada;
                return true;
            })
            .forEach((tarea) => {
                const li = document.createElement("li");
                li.classList.add("tarea");
                if (tarea.completada) {
                    li.classList.add("completada");
                }

                li.innerHTML = `
                    <span class="tarea-texto">${tarea.texto}</span>
                    <div class="acciones">
                        <button class="boton-completar" data-id="${tarea.id}">✅</button>
                        <button class="boton-eliminar" data-id="${tarea.id}">❌</button>
                    </div>
                `;

                listaTareas.appendChild(li);
            });

        // 📌 Agregar eventos a los botones después de renderizar
        document.querySelectorAll(".boton-completar").forEach((btn) => {
            btn.addEventListener("click", (event) => {
                const target = event.target;
                if (!(target instanceof HTMLElement)) return;
                const id = Number(target.getAttribute("data-id"));
                if (!isNaN(id)) completarTarea(id);
            });
        });

        document.querySelectorAll(".boton-eliminar").forEach((btn) => {
            btn.addEventListener("click", (event) => {
                const target = event.target;
                if (!(target instanceof HTMLElement)) return;
                const id = Number(target.getAttribute("data-id"));
                if (!isNaN(id)) eliminarTarea(id);
            });
        });
    }

    // 📌 Asignar eventos a los botones de filtros
    filtros.forEach((boton) => {
        boton.addEventListener("click", () => {
            filtrarTareas(boton.innerHTML.toLowerCase());
        });
    });
}
