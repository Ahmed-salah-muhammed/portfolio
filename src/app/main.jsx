import './polyfills.js';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import '@/index.css';

// Dev-only: surface any project that breaks the blueprint before it reaches the UI.
if (import.meta.env.DEV) {
  import('@/data/projectSchema.js').then(({ validateProjects }) => validateProjects());
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
