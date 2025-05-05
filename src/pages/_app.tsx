import AuthLayout from '@/components/layout/Layout';
import { AuthProvider } from '@/contexts/AuthProvider';
import { OverlayProvider } from '@/contexts/OverlayProvider';
import '@/styles/globals.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <OverlayProvider>
          <AuthLayout>
            <Component {...pageProps} />
            <Toaster position="top-center" reverseOrder={false} />
          </AuthLayout>
        </OverlayProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
