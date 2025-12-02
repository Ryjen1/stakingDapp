import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { ApolloProvider } from '@apollo/client';
import { config } from '../lib/wagmi';
import { graphqlClient } from '../graphql/client';
import { appkit } from '../lib/appkit';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <ApolloProvider client={graphqlClient}>
          {children}
        </ApolloProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}
