// @ts-check

document.addEventListener("DOMContentLoaded", () => {
    /** @type {HTMLUListElement | null} */
    const listaRecomendaciones = /** @type {HTMLUListElement | null} */ (document.getElementById("listaRecomendaciones"));
    
    /** @type {HTMLInputElement | null} */
    const inputRecomendacion = /** @type {HTMLInputElement | null} */ (document.getElementById("nuevaRecomendacion"));
    
    /** @type {HTMLButtonElement | null} */
    const botonAgregar = /** @type {HTMLButtonElement | null} */ (document.getElementById("agregarRecomendacion"));

    if (!listaRecomendaciones) {
        console.error("❌ Error: No se encontró #listaRecomendaciones en el DOM. Asegúrate de que existe en el HTML.");
    } else {
        obtenerRecomendaciones();
    }
    
    if (botonAgregar && inputRecomendacion) {
        botonAgregar.addEventListener("click", () => {
            agregarRecomendacion();
        });
    }

    obtenerRecomendaciones();

 
    /**
     * 📌 Obtener todas las recomendaciones desde la API
     */
    async function obtenerRecomendaciones() {
        try {
            const respuesta = await fetch("http://localhost:5000/api/recommendations");
            if (!respuesta.ok) throw new Error("Error al obtener recomendaciones");

            const recomendaciones = await respuesta.json();
            console.log("📢 Recomendaciones obtenidas:", recomendaciones); // ✅ Verificar si llegan datos
            renderizarRecomendaciones(recomendaciones);
        } catch (error) {
            console.error("❌ Error:", error.message);
        }
    }

    /**
     * 📌 Agregar una nueva recomendación
     */
    async function agregarRecomendacion() {
        if (!inputRecomendacion) return; // ✅ Si no existe, salir

        const recomendacionTexto = inputRecomendacion.value.trim();
        if (recomendacionTexto === "") {
            alert("Por favor, escribe una recomendación.");
            return;
        }

        const usuarioId = "USER_ID_DEMO"; // 🔴 Esto debe obtenerse desde la sesión del usuario
        const nuevaRecomendacion = { usuario: usuarioId, recomendacion: recomendacionTexto };

        try {
            const respuesta = await fetch("http://localhost:5000/api/recommendations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevaRecomendacion),
            });

            if (!respuesta.ok) throw new Error("Error al agregar la recomendación");

            inputRecomendacion.value = ""; // ✅ Ahora sí podemos acceder a `value`
            obtenerRecomendaciones();
        } catch (error) {
            console.error("❌ Error:", error.message);
        }
    }

    /**
     * 📌 Eliminar una recomendación
     * @param {string} id - ID de la recomendación a eliminar
     */
    async function eliminarRecomendacion(id) {
        try {
            const respuesta = await fetch(`http://localhost:5000/api/recommendations/${id}`, {
                method: "DELETE",
            });

            if (!respuesta.ok) throw new Error("Error al eliminar la recomendación");

            obtenerRecomendaciones();
        } catch (error) {
            console.error("❌ Error:", error.message);
        }
    }

    /**
     * 📌 Renderizar recomendaciones en la lista
     * @param {Array<{_id: string, recomendacion: string}>} recomendaciones - Lista de recomendaciones
     */
    function renderizarRecomendaciones(recomendaciones) {
        if (!listaRecomendaciones) {
            console.error("⚠️ Error: No se encontró #listaRecomendaciones en el DOM");
            return;
        }

        console.log("📢 Renderizando recomendaciones en:", listaRecomendaciones); // ✅ Verificar si el `ul` existe

        listaRecomendaciones.innerHTML = "";

        recomendaciones.forEach((recomendacion) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${recomendacion.recomendacion}</span>
                <button class="eliminar" data-id="${recomendacion._id}">❌</button>
            `;
            listaRecomendaciones.appendChild(li);
        });

        // 📌 Agregar eventos de eliminación a los botones
        document.querySelectorAll(".eliminar").forEach((btn) => {
            btn.addEventListener("click", (event) => {
                const target = /** @type {HTMLElement} */ (event.target);
                const id = target.getAttribute("data-id");
                if (id) eliminarRecomendacion(id);
            });
        });
    }
});
