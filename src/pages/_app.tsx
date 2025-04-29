import { AuthProvider } from '@/contexts/AuthProvider';
import { OverlayProvider } from '@/contexts/OverlayProvider';
import '@/styles/globals.scss';
import { MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    mutationCache: new MutationCache({
      onError: (error) => {
        console.log(error.message);
      },
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <OverlayProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </OverlayProvider>
    </QueryClientProvider>
  );
}
