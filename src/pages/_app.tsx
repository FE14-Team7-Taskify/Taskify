import Header from '@/components/header/Header';
import SideBar from '@/components/sidebar/SideBar';
import { AuthProvider } from '@/contexts/AuthProvider';
import { OverlayProvider } from '@/contexts/OverlayProvider';
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
          <SideBar>
            <Header />
            <Component {...pageProps} />
          </SideBar>
        </OverlayProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
