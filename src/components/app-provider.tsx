"use client";
import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useAuthStore } from "@/store/Auth";
import { decodeJwt, getCookieUser } from "@/utils/utils";
type Props = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: Props) => {
  const { setAuthenticate, setUser } = useAuthStore();

  useEffect(() => {
    const token = getCookieUser();
    if (token) {
      setAuthenticate(true);
      const decoded = decodeJwt(token);
      if (decoded) setUser(decoded);
    } else {
      setAuthenticate(false);
      setUser(null);
    }
  }, [setAuthenticate, setUser]);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default AppProvider;
