import '@/styles/globals.css';
import { useEffect } from 'react';
import { useStore } from '@/store/useStore';

export default function App({ Component, pageProps }) {
  const { darkMode } = useStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return <Component {...pageProps} />;
}
