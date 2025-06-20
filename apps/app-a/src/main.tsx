import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

// eslint-disable-next-line no-restricted-imports
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
