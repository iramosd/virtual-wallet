# Client Module

Este módulo proporciona operaciones CRUD completas para la gestión de clientes en el sistema de billetera virtual.

## Endpoints Disponibles

### 1. Crear Cliente
- **POST** `/api/client`
- **Descripción**: Crea un nuevo cliente
- **Body**:
  ```json
  {
    "document": "12345678",
    "fullName": "Juan Pérez",
    "email": "juan.perez@example.com"
  }
  ```
- **Respuesta**: Cliente creado con ID y timestamps

### 2. Obtener Todos los Clientes
- **GET** `/api/client`
- **Descripción**: Obtiene la lista de todos los clientes
- **Respuesta**: Array de clientes ordenados por fecha de creación (más recientes primero)

### 3. Obtener Cliente por ID
- **GET** `/api/client/:id`
- **Descripción**: Obtiene un cliente específico por su ID
- **Parámetros**: `id` (UUID del cliente)

### 4. Obtener Cliente por Documento
- **GET** `/api/client/document/:document`
- **Descripción**: Obtiene un cliente específico por su número de documento
- **Parámetros**: `document` (número de documento único)

### 5. Obtener Cliente por Email
- **GET** `/api/client/email/:email`
- **Descripción**: Obtiene un cliente específico por su email
- **Parámetros**: `email` (dirección de email única)

### 6. Actualizar Cliente
- **PATCH** `/api/client/:id`
- **Descripción**: Actualiza un cliente existente
- **Parámetros**: `id` (UUID del cliente)
- **Body**: Cualquier combinación de campos actualizables
  ```json
  {
    "fullName": "Juan Carlos Pérez",
    "email": "juan.carlos@example.com"
  }
  ```

### 7. Eliminar Cliente
- **DELETE** `/api/client/:id`
- **Descripción**: Elimina un cliente
- **Parámetros**: `id` (UUID del cliente)
- **Respuesta**: Status 204 (No Content)

## Validaciones

- **document**: Requerido, debe ser string único
- **fullName**: Requerido, debe ser string no vacío
- **email**: Requerido, debe ser formato de email válido y único

## Códigos de Error

- **400**: Datos de entrada inválidos
- **404**: Cliente no encontrado
- **409**: Conflicto (documento o email ya existe)
- **500**: Error interno del servidor

## Estructura de Respuesta del Cliente

```json
{
  "id": "uuid",
  "document": "string",
  "fullName": "string",
  "email": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```
