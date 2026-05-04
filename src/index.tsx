import { createRoot } from 'react-dom/client';

import App from './App';
import './styles/global.scss';

const container = document.getElementById('root');
if (!container) {
  throw new Error('No se encontró el elemento #root en el HTML');
}

createRoot(container).render(<App />);
