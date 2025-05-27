import { QueryClient } from "@tanstack/react-query";

export const RETRYABLE_STATUS_CODES = [409, 499, 500, 503];

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: (failureCount: number, error: Error): boolean => {
        console.log("ERR", error, failureCount);
        // const errorStatus = error?.status;
        // if (errorStatus && RETRYABLE_STATUS_CODES.includes(errorStatus)) {
        //   return failureCount < 3;
        // }
        // return false;
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
    },
  },
});

export default queryClient;
