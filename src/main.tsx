import React from 'react';
import ReactDOM from 'react-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import App from './App';
import { ThemeProvider } from './contexts/ThemeProvider';
import { GlobalStyles } from './styles/globalStyles';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <ThemeProvider>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </DndProvider>
  </React.StrictMode>,
)
