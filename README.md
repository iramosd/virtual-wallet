# Virtual Wallet 🪙

Este proyecto está compuesto por varios servicios que se levantan con **Docker Compose**.  
Al ejecutarlo, se crearán cuatro contenedores:  

1. **Base de Datos (MySQL)**  
   - Puerto: **3306**  
   - Almacena la información persistente del proyecto.  

2. **Servicio de Acceso a Datos**  
   - Puerto: **8001**  
   - Gestiona la comunicación directa con la base de datos.  

3. **Servicio Consumidor de la Capa de Datos**  
   - Puerto: **8002**  
   - Interactúa con el servicio de acceso a datos y provee lógica de negocio.  

4. **Frontend (React + Next.js)**  
   - Puerto: **3000**  
   - Interfaz web de la aplicación.  

---

## 🚀 Pasos para correr el proyecto

### 1. Clonar el repositorio
git clone https://github.com/iramosd/virtual-wallet
cd virtual-wallet

### 2. Correr contenedores
Renombrar archivos .env.example en la raiz de cada proyecto

### 3. Correr contenedores
docker compose up -d

### 4. Correr contenedores
Detener contenedores