# 🦷 Dental Clinic Management System – Backend (TypeScript)

A robust and scalable backend system for managing a dental clinic using:

- **TypeScript**
- **Express.js**
- **PostgreSQL**
- **Sequelize ORM (with TypeScript support)**
- **Clean, modular architecture**

Ideal for managing patients, appointments, treatments, inventory, and users in a dental clinic environment.

## 🧱 Project Goal

Build a solid backend system to manage typical operations of a dental clinic, including:

- User registration and authentication
- Patient management
- Appointment scheduling and tracking
- Treatment history
- Inventory control
- Invoicing

## 🗂️ Main Entities

| Entity              | Description |\
| `User`              | System users: admin, dentist, receptionist |\
| `Patient`           | Personal data of patients |\
| `Appointment`       | Scheduled medical appointments |\
| `Treatment`         | Available dental treatment types |\
| `PatientTreatment`  | History of treatments performed per patient |\
| `ConsultingRoom`    | Rooms or offices where appointments are held |\
| `Invoice`           | Invoices generated from treatments |\
| `Product`           | Medical supplies used |\
| `InventoryMovement` | Record of inventory entries and exits |\

## 🔧 Technologies Used

- **Backend**: Node.js + Express
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: sequelize-typescript
- **Authentication**: JWT
- **Utilities**: cors, morgan, dotenv, bcryptjs

## 🚀 How to Run the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/franklinbl/api-dental-system.git
   cd api-dental-system
   npm install
2. Create .env file based on .env.example:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_NAME=dental-system
   JWT_SECRET=mysecretpassword
   PORT=3000
3. Start the server in development mode:
   ```bash
   npm run dev
4. Visit **http://localhost:3000** to verify that the server is running.