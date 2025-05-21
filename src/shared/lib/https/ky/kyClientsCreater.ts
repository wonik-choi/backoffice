import ky, { Options as KyOptions, KyInstance, Hooks } from 'ky';

interface ClientConfig extends Partial<KyOptions> {
  hooks?: Hooks;
}

export const createKyClient = (config: ClientConfig): KyInstance => {
  return ky.create({
    headers: { 'Content-Type': 'application/json', ...config.headers },
    retry: { limit: 3, methods: ['get'] },
    ...config,
  });
};
