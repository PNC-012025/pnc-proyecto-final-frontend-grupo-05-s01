# Mercaduca — Sistema Web de Gestión Emprendedora UCA

## Descripción general

**Mercaduca** es el primer local emprendedor dentro del campus de la **Universidad Centroamericana (UCA)**.  
Este sistema web busca digitalizar y optimizar la gestión del local, facilitando la inscripción, seguimiento y visibilidad de los emprendimientos estudiantiles.

---

## Deployment

- **Frontend todo público (Next.js):** https://pnc-proyecto-final-frontend-grupo-0-two.vercel.app/
-  **Frontend usuarios (Next.js):** https://pnc-proyecto-final-frontend-grupo-0-indol.vercel.app/

---

## Usuario para Testing (Emprendedor)

- User: 00117222@uca.edu.sv
- Password: dc1f99b4

## Usuario para Testing (Administrador)

- User: admin@mercaduca.com
- Password: superSegura123!

## Objetivos del sistema

- Solicitud de puestos para estudiantes emprendedores.
- Gestión y renovación de contratos trimestrales.
- Publicación de productos aprobados en un catálogo digital.
- Visualización de talonario digital para seguimiento de pagos.

---

## Tecnologías utilizadas

| Capa         | Tecnología                       |
|--------------|----------------------------------|
| Frontend     | Next + Tailwind CSS + SweetAlert2|
| Deploy       | Vercel (frontend)                |

---

## Roles y funcionalidades

### Estudiante / Emprendedor

- Enviar solicitud de puesto.
- Ver estado de solicitud.
- Subir productos para aprobación.
- Ver contrato y fecha de vencimiento (solicitar renovación en caso de finalizado).
- Consultar su talonario de pagos y estado de cuenta.
- Mostrar su catálogo públicamente (solo lectura).

### Administrador (COP)

- Aprobar o rechazar solicitudes.
- Gestionar contratos y renovaciones.
- Validar productos y fichas de stock.
- Aprobar publicaciones del catálogo.
- Actualizar estados de pago.
- Ver estado de emprendimientos.

---

## Recursos gestionados

- Solicitudes de puesto
- Contratos
- Talonario de pagos
- Catálogo de productos
- Fichas de stock
- Usuarios (emprendedores y administradores)

---

## Instrucciones de compilación

Este proyecto incluye dos interfaces separadas:
- `nextadminjs-demo`: Panel para **usuarios y administradores**
- `nextuserjs-demo`: Interfaz para **emprendedores/estudiantes**

> Nota: **Requiere que el backend esté ejecutándose**. Este se puede encontrar aquí:  https://github.com/PNC-012025/pnc-proyecto-final-grupo-05-s01.git

Cómo ejecutar este proyecto localmente:
### 1. Clonar el repositorio
### 2. Instalar dependencias
Se debe ingresar a cada carpeta por separado (nextadminjs-demo y/o nextuserjs-demo) y ejecutar npm install.
### 3. Crea el archivo .env.local
Dentro de cada carpeta (nextadminjs-demo y/o nextuserjs-demo) crear un archivo .env.local con la siguiente variable: **NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api**

Asegúrarse de que el backend esté corriendo en ese puerto (8080).
### 4. Ejecutar la aplicación
Asegúrarse de estar dentro de una de las carpetas (nextadminjs-demo o nextuserjs-demo) y ejecutar: **npm run dev** 

Después de eso, en la terminal aparecerá una dirección similar a: **http://localhost:3000** . 

Presionar Ctrl + clic izquierdo sobre ese enlace para abrirlo en el navegador.

> Nota: **Es importante realizar los pasos anteriores en ambas carpetas para poder acceder a todas las funcionalidades de la página web**



