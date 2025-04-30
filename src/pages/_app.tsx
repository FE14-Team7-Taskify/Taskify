import { AuthProvider } from '@/contexts/AuthProvider';
import '@/styles/globals.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { OverlayProvider } from '@toss/use-overlay';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <OverlayProvider>
          <Component {...pageProps} />
        </OverlayProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
