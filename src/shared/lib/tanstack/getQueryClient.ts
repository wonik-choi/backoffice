import { isServer, QueryClient } from '@tanstack/react-query';
import { createQueryClient, createQueryServer } from './client';

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) return createQueryServer();
  if (!browserQueryClient) browserQueryClient = createQueryClient();
  return browserQueryClient;
}
