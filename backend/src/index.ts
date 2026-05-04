import 'dotenv/config';
import { buildApp } from './app';

const PORT = parseInt(process.env.PORT || '4000', 10);

const app = buildApp();

app.listen(PORT, () => {
  console.log(`\n  OrionTek API corriendo en http://localhost:${PORT}`);
  console.log(`  Swagger UI: http://localhost:${PORT}/api-docs\n`);
});
