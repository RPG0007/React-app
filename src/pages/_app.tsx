import { store } from '@/store/store';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import  ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary> 
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
    </ErrorBoundary>
  );
}
