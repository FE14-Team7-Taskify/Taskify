import Header from '@/components/header/Header';
import SideBar from '@/components/sidebar/SideBar';
import { AuthProvider } from '@/contexts/AuthProvider';
import '@/styles/globals.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SideBar>
          <Header />
          <Component {...pageProps} />
        </SideBar>
      </AuthProvider>
    </QueryClientProvider>
  );
}
