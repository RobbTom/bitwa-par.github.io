import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Note: StrictMode intentionally double-mounts components in dev mode to catch
// side-effect bugs, which causes visible flicker in Framer Motion mount
// animations (the photo cards). Removed so the animations play cleanly.
createRoot(document.getElementById('root')!).render(<App />);
