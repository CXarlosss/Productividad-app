#  Productividad-App

##  Descripción
**Productividad-App** es una plataforma diseñada para ayudar a los usuarios a medir su productividad mediante la asignación de tareas y un calendario interactivo donde pueden visualizar sus eventos y organizar mejor su tiempo.

## 🛠️ Tecnologías Utilizadas
- **Backend:** Node.js, Express, Mongoose
- **Base de datos:** MongoDB
- **Frontend:** (Por definir, si aplica)
- **Herramientas adicionales:**
  - Cors (Manejo de políticas de acceso)
  - Dotenv (Manejo de variables de entorno)
  - Morgan (Logger para peticiones HTTP)
  - TypeScript (Tipado estático para mayor robustez)
  - ESLint (Linter para mantener calidad del código)

##  Estructura del Proyecto
```
productividad-app/
│── src/
│   ├── controllers/       # Controladores de lógica de negocio
│   ├── models/            # Modelos de MongoDB
│   ├── routes/            # Rutas de la API
│   ├── middlewares/       # Middlewares de Express
│   ├── services/          # Servicios para la lógica de negocio
│   ├── utils/             # Funciones utilitarias
│   ├── index.js           # Archivo principal del servidor
│
│── dist/                  # Código compilado de TypeScript
│── package.json           # Configuración del proyecto y dependencias
│── .env                   # Variables de entorno
│── README.md              # Documentación del proyecto
```

##  Instalación y Uso
### 🔹 1. Clonar el repositorio
```sh
git clone https://github.com/CXarlosss/Productividad-app.git
cd Productividad-app
```

### 🔹 2. Instalar dependencias
```sh
npm install
```

### 🔹 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```
PORT=5000
MONGO_URI=mongodb+srv://tu_usuario:tu_password@cluster.mongodb.net/productividad
```

### 🔹 4. Ejecutar en modo desarrollo
```sh
npm run dev
```

### 🔹 5. Compilar TypeScript y ejecutar
```sh
npm run build
npm start
```

##  Funcionalidades
✅ Creación, edición y eliminación de tareas.  
✅ Calendario interactivo para gestionar eventos.  
✅ Organización visual de tareas por fecha y prioridad.  
✅ API REST para gestionar tareas y eventos.

##  Reporte de Errores
Si encuentras algún problema, por favor, crea un [issue aquí](https://github.com/CXarlosss/Productividad-app/issues).

##  Licencia
Este proyecto está bajo la licencia ISC.

---

 **Contribuciones bienvenidas** ¡Cualquier mejora o idea nueva es bienvenida! 🚀
