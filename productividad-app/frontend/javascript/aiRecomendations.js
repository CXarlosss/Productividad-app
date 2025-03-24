// @ts-nocheck

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
 /*    async function obtenerRecomendaciones() {
        try {
            const API_PORT = location.port ? `:${location.port}` : "";

            const respuesta = await fetch(`${location.protocol}//${location.hostname}${API_PORT}/api/recommendations`);
            if (!respuesta.ok) throw new Error("Error al obtener recomendaciones");

            const recomendaciones = await respuesta.json();
            console.log("📢 Recomendaciones obtenidas:", recomendaciones); // ✅ Verificar si llegan datos
            renderizarRecomendaciones(recomendaciones);
        } catch (error) {
            console.error("❌ Error:", error.message);
        }
    } */ 
   function obtenerRecomendaciones() {
        const guardadas = localStorage.getItem("recomendaciones");
        const recomendaciones = guardadas ? JSON.parse(guardadas) : [];
        renderizarRecomendaciones(recomendaciones);
      }
    

    /**
     * 📌 Agregar una nueva recomendación
     */
   /*  async function agregarRecomendacion() {
        if (!inputRecomendacion) return; // ✅ Si no existe, salir

        const recomendacionTexto = inputRecomendacion.value.trim();
        if (recomendacionTexto === "") {
            alert("Por favor, escribe una recomendación.");
            return;
        }

        const usuarioId = "USER_ID_DEMO"; // 🔴 Esto debe obtenerse desde la sesión del usuario
        const nuevaRecomendacion = { usuario: usuarioId, recomendacion: recomendacionTexto };

        try {
            const API_PORT = location.port ? `:${location.port}` : "";

             const respuesta = await fetch(`${location.protocol}//${location.hostname}${API_PORT}/api/recommendations`, {
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
    } */
    function agregarRecomendacion() {
        if (!inputRecomendacion) return;
    
        const texto = inputRecomendacion.value.trim();
        if (!texto) {
          alert("Por favor, escribe una recomendación.");
          return;
        }
    
        const nuevas = obtenerDesdeStorage();
        const nuevaRecomendacion = {
          id: crypto.randomUUID(),
          recomendacion: texto
        };
    
        nuevas.push(nuevaRecomendacion);
        localStorage.setItem("recomendaciones", JSON.stringify(nuevas));
        inputRecomendacion.value = "";
        renderizarRecomendaciones(nuevas);
      }

    /**
     * 📌 Eliminar una recomendación
     * @param {string} id - ID de la recomendación a eliminar
     *//* 
    async function eliminarRecomendacion(id) {
        try {
            const API_PORT = location.port ? `:${location.port}` : "";
             const respuesta = await fetch(`${location.protocol}//${location.hostname}${API_PORT}/api/recommendations/${id}`, {
                method: "DELETE",
            });

            if (!respuesta.ok) throw new Error("Error al eliminar la recomendación");

            obtenerRecomendaciones();
        } catch (error) {
            console.error("❌ Error:", error.message);
        }
    } *//**
   * 📌 Eliminar una recomendación por ID
   * @param {string} id
   */
  function eliminarRecomendacion(id) {
    const actuales = obtenerDesdeStorage();
    const filtradas = actuales.filter((r) => r.id !== id);
    localStorage.setItem("recomendaciones", JSON.stringify(filtradas));
    renderizarRecomendaciones(filtradas);
  }

 /*    /**
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
 /**
   * 📌 Renderizar recomendaciones en la lista
   * @param {Array<{id: string, recomendacion: string}>} recomendaciones
   */
 function renderizarRecomendaciones(recomendaciones) {
    if (!listaRecomendaciones) return;

    listaRecomendaciones.innerHTML = "";

    recomendaciones.forEach((rec) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${rec.recomendacion}</span>
        <button class="eliminar" data-id="${rec.id}">❌</button>
      `;
      listaRecomendaciones.appendChild(li);
    });

    document.querySelectorAll(".eliminar").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = /** @type {HTMLElement} */ (e.target).getAttribute("data-id");
        if (id) eliminarRecomendacion(id);
      });
    });
  }
 /** 
   * 📌 Obtener recomendaciones como array desde localStorage
   * @returns {Array<{id: string, recomendacion: string}>}
   */
 function obtenerDesdeStorage() {
    const datos = localStorage.getItem("recomendaciones");
    return datos ? JSON.parse(datos) : [];
  }

