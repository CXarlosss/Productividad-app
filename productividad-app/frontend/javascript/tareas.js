// @ts-nocheck

// 📌 Elementos del DOM
const inputTarea = /** @type {HTMLInputElement | null} */ (document.getElementById("nuevaTarea"));
const listaTareas = /** @type {HTMLUListElement | null} */ (document.getElementById("listaTareas"));
const filtros = /** @type {NodeListOf<HTMLButtonElement>} */ (document.querySelectorAll(".filtros button"));

if (!inputTarea || !listaTareas || filtros.length === 0) {
    console.error("❌ Error: No se encontraron algunos elementos en el DOM.");
} else {
    document.addEventListener("DOMContentLoaded", () => {
        obtenerTareas();
        window.agregarTarea = agregarTarea; // Hacerla global si se usa desde onclick
    });

    inputTarea.addEventListener("keypress", (event) => {
        if (event.key === "Enter") agregarTarea();
    });

    filtros.forEach((boton) => {
        boton.addEventListener("click", () => {
            const filtro = boton.innerHTML.toLowerCase();
            filtrarTareas(filtro);
        });
    });

   /*  // 📌 Función para obtener tareas desde el servidor
    async function obtenerTareas() {
        try {
            const API_PORT = location.port ? `:${location.port}` : "";

            const respuesta = await fetch(`${location.protocol}//${location.hostname}${API_PORT}/api/tareas`);
            if (!respuesta.ok) throw new Error("Error al obtener las tareas");
            const tareas = await respuesta.json();
            renderizarTareas(tareas);
        } catch (error) {
            console.error("❌ Error:", error.message);
        }
    }

    // 📌 Función para agregar tarea
    async function agregarTarea() {
        if (!inputTarea) return;
        const textoTarea = inputTarea.value.trim();

        if (textoTarea === "") {
            alert("Por favor, escribe una tarea.");
            return;
        }

        const nuevaTarea = { texto: textoTarea, completada: false };

        try {
            const API_PORT = location.port ? `:${location.port}` : "";

            const respuesta = await fetch(`${location.protocol}//${location.hostname}${API_PORT}/api/tareas`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevaTarea),
            });

            if (!respuesta.ok) throw new Error("Error al agregar la tarea");

            inputTarea.value = "";
            obtenerTareas();
        } catch (error) {
            console.error("❌ Error:", error.message);
        }
    }

    // 📌 Función para eliminar tarea
    async function eliminarTarea(id) {
        try {
            const API_PORT = location.port ? `:${location.port}` : "";

            const respuesta = await fetch(`${location.protocol}//${location.hostname}${API_PORT}/api/tareas/${id}`, {
                method: "DELETE",
            });

            if (!respuesta.ok) throw new Error("Error al eliminar la tarea");

            obtenerTareas();
        } catch (error) {
            console.error("❌ Error:", error.message);
        }
    }

    // 📌 Función para marcar tarea como completada
    async function completarTarea(id, estadoActual) {
        try {
            const API_PORT = location.port ? `:${location.port}` : "";
             const respuesta = await fetch(`${location.protocol}//${location.hostname}${API_PORT}api/tareas/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ completada: !estadoActual }),
            });

            if (!respuesta.ok) throw new Error("Error al actualizar la tarea");

            obtenerTareas();
            actualizarEstadisticas();
        } catch (error) {
            console.error("❌ Error:", error.message);
        }
    }

    // 📌 Función para actualizar estadísticas
    async function actualizarEstadisticas() {
        try {
            const API_PORT = location.port ? `:${location.port}` : "";
             const respuesta = await fetch(`${location.protocol}//${location.hostname}${API_PORT}api/tareas`);
            if (!respuesta.ok) throw new Error("Error al obtener estadísticas");

            const tareas = await respuesta.json();
            const tareasCompletadas = tareas.filter(tarea => tarea.completada).length;

            localStorage.setItem("tareasCompletadas", JSON.stringify(tareasCompletadas));
            console.log("✅ Estadísticas actualizadas:", { tareasCompletadas });
        } catch (error) {
            console.error("❌ Error al actualizar estadísticas:", error.message);
        }
    }

    // 📌 Función para renderizar tareas
    function renderizarTareas(tareas) {
        if (!listaTareas) return;
        listaTareas.innerHTML = "";

        tareas.forEach((tarea) => {
            if (!tarea._id) {
                console.error("❌ Error: Tarea sin _id encontrada en la base de datos.");
                return;
            }

            const li = document.createElement("li");
            li.classList.add("tarea");
            if (tarea.completada) li.classList.add("completada");

            li.innerHTML = `
                <span class="tarea-texto">${tarea.texto}</span>
                <div class="acciones">
                    <button class="boton-completar" data-id="${tarea._id}" data-completada="${tarea.completada}">✅</button>
                    <button class="boton-eliminar" data-id="${tarea._id}">❌</button>
                </div>
            `;

            listaTareas.appendChild(li);
        });

        // 📌 Agregar eventos a los botones
        document.querySelectorAll(".boton-completar").forEach((btn) => {
            btn.addEventListener("click", (event) => {
                const target = event.target;
                if (!(target instanceof HTMLElement)) return;
                const id = target.getAttribute("data-id");
                const estadoActual = target.getAttribute("data-completada") === "true";
                if (id) completarTarea(id, estadoActual);
            });
        });

        document.querySelectorAll(".boton-eliminar").forEach((btn) => {
            btn.addEventListener("click", (event) => {
                const target = event.target;
                if (!(target instanceof HTMLElement)) return;
                const id = target.getAttribute("data-id");
                if (id) eliminarTarea(id);
            });
        });
    }

    // 📌 Asignar eventos a los botones de filtros
    filtros.forEach((boton) => {
        boton.addEventListener("click", () => {
            const filtro = boton.innerHTML.toLowerCase();
            filtrarTareas(filtro);
        });
    }); */

    // 📌 Función para filtrar tareas sin afectar la API
    async function filtrarTareas(filtro) {
        try {
            const API_PORT = location.port ? `:${location.port}` : "";
             const respuesta = await fetch(`${location.protocol}//${location.hostname}${API_PORT}/api/tareas`);
            if (!respuesta.ok) throw new Error("Error al filtrar tareas");

            let tareas = await respuesta.json();
            if (filtro === "pendientes") {
                tareas = tareas.filter((tarea) => !tarea.completada);
            } else if (filtro === "completadas") {
                tareas = tareas.filter((tarea) => tarea.completada);
            }

            renderizarTareas(tareas);
        } catch (error) {
            console.error("❌ Error al filtrar tareas:", error.message);
        }
    }
    function obtenerTareas() {
        const tareas = leerDesdeStorage();
        renderizarTareas(tareas);
        actualizarEstadisticas();
    }

    // 📌 Agregar una nueva tarea
    function agregarTarea() {
        const texto = inputTarea?.value.trim();
        if (!texto) {
            alert("Por favor, escribe una tarea.");
            return;
        }

        const tareas = leerDesdeStorage();
        const nueva = {
            id: crypto.randomUUID(),
            texto,
            completada: false
        };

        tareas.push(nueva);
        guardarEnStorage(tareas);
        inputTarea.value = "";
        renderizarTareas(tareas);
        actualizarEstadisticas();
    }

    // 📌 Eliminar tarea
    function eliminarTarea(id) {
        const tareas = leerDesdeStorage().filter((t) => t.id !== id);
        guardarEnStorage(tareas);
        renderizarTareas(tareas);
        actualizarEstadisticas();
    }

    // 📌 Completar tarea
    function completarTarea(id, estadoActual) {
        const tareas = leerDesdeStorage().map((t) => {
            if (t.id === id) {
                return { ...t, completada: !estadoActual };
            }
            return t;
        });

        guardarEnStorage(tareas);
        renderizarTareas(tareas);
        actualizarEstadisticas();
    }

    // 📌 Actualizar estadísticas
    function actualizarEstadisticas() {
        const tareas = leerDesdeStorage();
        const completadas = tareas.filter(t => t.completada).length;
        localStorage.setItem("tareasCompletadas", JSON.stringify(completadas));
        console.log("✅ Estadísticas actualizadas:", { completadas });
    }

    // 📌 Renderizar tareas
    function renderizarTareas(tareas) {
        listaTareas.innerHTML = "";

        tareas.forEach((tarea) => {
            const li = document.createElement("li");
            li.classList.add("tarea");
            if (tarea.completada) li.classList.add("completada");

            li.innerHTML = `
                <span class="tarea-texto">${tarea.texto}</span>
                <div class="acciones">
                    <button class="boton-completar" data-id="${tarea.id}" data-completada="${tarea.completada}">✅</button>
                    <button class="boton-eliminar" data-id="${tarea.id}">❌</button>
                </div>
            `;

            listaTareas.appendChild(li);
        });

        document.querySelectorAll(".boton-completar").forEach((btn) => {
            btn.addEventListener("click", (event) => {
                const target = event.target;
                const id = target?.getAttribute("data-id");
                const estado = target?.getAttribute("data-completada") === "true";
                if (id) completarTarea(id, estado);
            });
        });

        document.querySelectorAll(".boton-eliminar").forEach((btn) => {
            btn.addEventListener("click", (event) => {
                const target = event.target;
                const id = target?.getAttribute("data-id");
                if (id) eliminarTarea(id);
            });
        });
    }

    // 📌 Filtrar tareas (todas, pendientes, completadas)
    function filtrarTareas(filtro) {
        let tareas = leerDesdeStorage();
        if (filtro === "pendientes") {
            tareas = tareas.filter(t => !t.completada);
        } else if (filtro === "completadas") {
            tareas = tareas.filter(t => t.completada);
        }
        renderizarTareas(tareas);
    }

    // 📌 Helpers: leer y guardar en localStorage
    function leerDesdeStorage() {
        return JSON.parse(localStorage.getItem("tareas") || "[]");
    }

    function guardarEnStorage(tareas) {
        localStorage.setItem("tareas", JSON.stringify(tareas));
    }
}
