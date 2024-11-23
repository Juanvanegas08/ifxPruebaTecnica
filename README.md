# Entities Management App

Este proyecto es una aplicación de gestión de empleados y entidades, desarrollada con **React** para el frontend, **.NET 9.0** para el backend, y **MongoDB** como base de datos.

---

## Tecnologías utilizadas

- **Frontend**: React (Node.js v20.16.0, npm 10.8.1)
- **Backend**: .NET 9.0
- **Base de Datos**: MongoDB (Atlas)

---

## Requisitos previos

Asegúrate de tener las siguientes herramientas instaladas en tu máquina:

1. **Node.js**: Versión 20.16.0 (o superior)
2. **npm**: Versión 10.8.1 (o superior)
3. **.NET SDK**: Versión 9.0
4. **MongoDB**: Base de datos configurada (puedes usar MongoDB Atlas o una instancia local).

---

## Estructura del proyecto

```bash
/
├── backend/EntitiesManagementAPI/
│   ├── Controllers/
│   ├── Models/
│   ├── Services/
│   ├── appsettings.json
│   ├── Program.cs
│   └── EntitiesManagementAPI.sln
├── public/
├── src/
│   ├── components/
│   ├── services/
│   ├── App.js
│   ├── index.js
│   └── ...
├── package.json
└── README.md

```
## 1. Configurar la base de datos MongoDB

Crea una base de datos en MongoDB Atlas o configura una instancia local.

Descargar jsonPruebaTecnica

Actualiza el archivo appsettings.json en el backend con la cadena de conexión de MongoDB:


```bash

{
    "ConnectionStrings": {
        "MongoDbConnection": "mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/<nombre_de_la_bd>?retryWrites=true&w=majority"
    }
}
```
## 2. Ejecutar el backend (.NET API)
Abre una terminal y navega al directorio del backend:

```bash
cd backend/EntitiesManagementAPI
```

Restaura las dependencias:

```bash
dotnet restore
```

Compila el proyecto:

```bash
dotnet build
```

Ejecuta la API:

```bash
dotnet run
```

La API estará disponible en **http://localhost:5026** (o el puerto configurado).

## 3. Ejecutar el frontend (React)
Abre una nueva terminal y navega al directorio raíz del proyecto (donde está el archivo package.json):

cd <directorio_raíz>

Instala las dependencias de React:

```bash
npm install
```


Inicia el servidor de desarrollo:

```bash
npm start
```
La aplicación estará disponible en tu navegador en http://localhost:3000.

## 4. Probar la integración
Asegúrate de que tanto el backend como el frontend están corriendo y configurados correctamente para interactuar con MongoDB.