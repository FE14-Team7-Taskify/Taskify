import AuthLayout from '@/components/layout/Layout';
import { AuthProvider } from '@/contexts/AuthProvider';
import { OverlayProvider } from '@/contexts/OverlayProvider';
import '@/styles/globals.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <OverlayProvider>
          <AuthLayout>
            <Component {...pageProps} />
          </AuthLayout>
        </OverlayProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
