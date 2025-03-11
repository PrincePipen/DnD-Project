import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AudioProvider } from './context/AudioContext';
import { ThemeProvider } from './context/ThemeContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AudioProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AudioProvider>
  </StrictMode>
);