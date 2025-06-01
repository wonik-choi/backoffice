import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const AuthenticationQueryKeys = createQueryKeyStore({
  login: null,
  logout: null,
});
