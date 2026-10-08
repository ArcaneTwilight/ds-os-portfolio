import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const posthogKey = import.meta.env.VITE_POSTHOG_KEY;
const root = createRoot(document.getElementById('root')!);

if (posthogKey) {
  const {PostHogProvider} = await import('@posthog/react');
  root.render(
    <PostHogProvider
      apiKey={posthogKey}
      options={{
        api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com',
      }}
    >
      <App />
    </PostHogProvider>
  );
} else {
  root.render(<App />);
}
