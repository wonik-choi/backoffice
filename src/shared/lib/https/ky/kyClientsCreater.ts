import ky, { Options as KyOptions, KyInstance, Hooks } from 'ky-universal';

interface ClientConfig extends Partial<KyOptions> {
  hooks?: Hooks;
}

export const createKyClient = (config: ClientConfig): KyInstance => {
  return ky.create({
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      ...config.headers,
    },
    retry: { limit: 3, methods: ['get'] },
    ...config,
  });
};
