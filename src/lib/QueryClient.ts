import { QueryClient } from '@tanstack/react-query';

const getQueryClient = (() => {
  let queryClient: QueryClient | null = null;

  return () => {
    if (!queryClient) {
      queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      });
    }
    return queryClient;
  };
})();

export default getQueryClient;
