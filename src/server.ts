import app from './app';
import { sequelize } from './models/index';
import { Role } from './models/Role';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida.');

    await sequelize.sync();

    // Insert initial roles
    await initializeRoles();

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error);
  }
}

async function initializeRoles() {
  const roleNames = ['admin', 'dentist', 'receptionist'];

  for (const name of roleNames) {
    await Role.findOrCreate({
      where: { name },
      defaults: { name },
    });
  }

  console.log('✅ Roles iniciales creados');
}

startServer();