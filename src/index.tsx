import { createRoot } from 'react-dom/client';
import './styles/index.scss';
import { StrictMode } from 'react';

import App from './App';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
